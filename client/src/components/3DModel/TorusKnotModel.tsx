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
  accentColor = "#3b82f6", 
  speed = 0.3
}: TorusKnotModelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup with enhanced visuals
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Primary TorusKnot geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 32, 3, 4);
    
    // Create a more interesting material with gradient effect
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor),
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 1.0,
      transmission: 0.2,
    });
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    // Create main mesh
    const mainMesh = new THREE.Mesh(geometry, mainMaterial);
    scene.add(mainMesh);
    
    // Create wireframe mesh (slightly larger)
    const wireframeGeometry = new THREE.TorusKnotGeometry(1.01, 0.31, 200, 32, 3, 4);
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Add orbiting particles
    const particlesCount = 300;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particlesPositions = new Float32Array(particlesCount * 3);
    const particlesSpeeds: number[] = [];
    const particlesDistances: number[] = [];
    const particlesGroup = new THREE.Group();
    
    // Distribute particles in a sphere
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      // Random spherical position
      const radius = 2 + Math.random() * 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      particlesPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlesPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlesPositions[i3 + 2] = radius * Math.cos(phi);
      
      particlesSpeeds.push(0.02 + Math.random() * 0.05);
      particlesDistances.push(radius);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesGroup.add(particles);
    scene.add(particlesGroup);

    // Add smaller decorative objects orbiting around
    const smallObjectsGroup = new THREE.Group();
    
    // Small torus
    const torusGeometry = new THREE.TorusGeometry(0.3, 0.08, 16, 32);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor).offsetHSL(0.1, 0, 0),
      metalness: 0.7,
      roughness: 0.3,
      transmission: 0.1,
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.position.set(1.7, 0, 0);
    smallObjectsGroup.add(torusMesh);
    
    // Small sphere
    const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor).offsetHSL(-0.1, 0, 0),
      metalness: 0.8,
      roughness: 0.2,
      transmission: 0.1,
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(-1.5, 1, 0);
    smallObjectsGroup.add(sphereMesh);
    
    // Small icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.2, 0);
    const icoMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(accentColor).offsetHSL(0.2, 0, 0),
      metalness: 0.7,
      roughness: 0.3,
      transmission: 0.1,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(0, -1.6, 0);
    smallObjectsGroup.add(icoMesh);

    scene.add(smallObjectsGroup);

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, 2);
    pointLight2.position.set(-5, -5, 2);
    pointLight2.castShadow = true;
    scene.add(pointLight2);

    // Add a subtle spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 0, 8);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation values
    const clock = new THREE.Clock();
    let elapsedTime = 0;

    // Animation loop
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      elapsedTime = clock.getElapsedTime();
      
      // Main knot rotation
      mainMesh.rotation.x = elapsedTime * 0.1 * speed;
      mainMesh.rotation.y = elapsedTime * 0.15 * speed;
      
      wireframeMesh.rotation.x = elapsedTime * 0.1 * speed;
      wireframeMesh.rotation.y = elapsedTime * 0.15 * speed;
      
      // Add subtle movement based on mouse position
      mainMesh.rotation.x += mouseY * 0.02 * speed;
      mainMesh.rotation.y += mouseX * 0.02 * speed;
      
      wireframeMesh.rotation.x += mouseY * 0.02 * speed;
      wireframeMesh.rotation.y += mouseX * 0.02 * speed;

      // Animate particles
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Calculate new position in a circular orbit
        const distance = particlesDistances[i];
        const particleSpeed = particlesSpeeds[i] * (speed + 0.5);
        
        // Calculate angle for rotation
        const angle = elapsedTime * particleSpeed;
        
        // Rotate around Y axis
        const newX = Math.cos(angle) * x - Math.sin(angle) * z;
        const newZ = Math.sin(angle) * x + Math.cos(angle) * z;
        
        positions[i3] = newX;
        positions[i3 + 2] = newZ;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Rotate particles group
      particlesGroup.rotation.y = elapsedTime * 0.05 * speed;
      
      // Animate small objects
      smallObjectsGroup.rotation.y = elapsedTime * 0.2 * speed;
      smallObjectsGroup.rotation.x = elapsedTime * 0.1 * speed;
      
      // Individual animations for the small objects
      torusMesh.rotation.x = elapsedTime * 0.5;
      torusMesh.rotation.y = elapsedTime * 0.2;
      
      sphereMesh.position.y = 1 + Math.sin(elapsedTime * 1.5) * 0.3;
      
      icoMesh.rotation.x = elapsedTime * 0.6;
      icoMesh.rotation.z = elapsedTime * 0.6;
      
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
      
      // Dispose resources
      geometry.dispose();
      wireframeGeometry.dispose();
      torusGeometry.dispose();
      sphereGeometry.dispose();
      icoGeometry.dispose();
      particlesGeometry.dispose();
      
      mainMaterial.dispose();
      wireframeMaterial.dispose();
      torusMaterial.dispose();
      sphereMaterial.dispose();
      icoMaterial.dispose();
      particlesMaterial.dispose();
      
      renderer.dispose();
      
      // Remove all objects from scene
      scene.remove(mainMesh, wireframeMesh, particlesGroup, smallObjectsGroup);
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