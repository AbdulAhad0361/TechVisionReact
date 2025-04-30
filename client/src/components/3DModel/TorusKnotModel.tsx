import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './TorusKnotModel.module.css';

interface TorusKnotModelProps {
  backgroundColor?: string;
  accentColor?: string;
  speed?: number;
}

const TorusKnotModel = ({
  backgroundColor = "hsl(var(--background))",
  accentColor = "#8b5cf6",
  speed = 0.3
}: TorusKnotModelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    
    // Create a group to hold the knot
    const group = new THREE.Group();
    scene.add(group);
    
    // Create a metallic torus knot with fine details
    const torusKnotGeometry = new THREE.TorusKnotGeometry(
      5, // radius
      1.5, // tube radius
      128, // tubular segments
      32, // radial segments
      2, // p
      3 // q
    );
    
    // Use physical material for a more polished look
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    
    const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
    group.add(torusKnot);
    
    // Add wireframe for effect
    const wireframeGeometry = new THREE.TorusKnotGeometry(
      5.1, // slightly larger radius
      1.6, // slightly larger tube radius
      64, // fewer segments for the wireframe
      16,
      2,
      3
    );
    
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor).getHex() + 0x333333, // slightly lighter
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    group.add(wireframe);
    
    // Add particles around the knot
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    // Distribute particles in a sphere
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 7 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i3 + 2] = radius * Math.cos(phi);
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.1,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);
    
    // Add a subtle point light within the torus knot
    const pointLight = new THREE.PointLight(new THREE.Color(accentColor).getHex(), 1, 30);
    pointLight.position.set(0, 0, 0);
    group.add(pointLight);
    
    // Mouse movement for interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Animation
    const clock = new THREE.Clock();
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth rotation based on mouse position
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      
      // Continuous rotation
      group.rotation.z += delta * speed;
      
      // Slightly pulsate the torusKnot size
      const pulseFactor = 1 + Math.sin(elapsedTime * 2) * 0.03;
      torusKnot.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Counter-rotate the wireframe for effect
      wireframe.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2;
      wireframe.rotation.y = Math.cos(elapsedTime * 0.1) * 0.2;
      
      // Make particles slowly rotate in the opposite direction
      particles.rotation.y -= delta * speed * 0.2;
      particles.rotation.x -= delta * speed * 0.1;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      // Dispose geometries
      torusKnotGeometry.dispose();
      wireframeGeometry.dispose();
      particleGeometry.dispose();
      
      // Dispose materials
      material.dispose();
      wireframeMaterial.dispose();
      particleMaterial.dispose();
      
      // Remove from scene
      scene.remove(group, particles);
      renderer.dispose();
    };
  }, [backgroundColor, accentColor, speed]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.modelOverlay}></div>
    </div>
  );
};

export default TorusKnotModel;