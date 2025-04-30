import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './TorusKnotModel.module.css';

interface SimpleTorusKnotProps {
  backgroundColor?: string;
  accentColor?: string;
  rotationSpeed?: number;
}

const SimpleTorusKnot = ({ 
  backgroundColor = "hsl(var(--background))", 
  accentColor = "#3b82f6", 
  rotationSpeed = 0.3
}: SimpleTorusKnotProps) => {
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

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    
    // Primary TorusKnot geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 32, 3, 4);
    
    // Material
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.7,
      roughness: 0.2,
      emissive: new THREE.Color(accentColor).multiplyScalar(0.2),
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
    const wireframeGeometry = new THREE.TorusKnotGeometry(1.03, 0.42, 128, 32, 3, 4);
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Add smaller decorative objects
    const objectsGroup = new THREE.Group();
    
    // Add small spheres orbiting the main knot
    const orbitCount = 5;
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2;
      
      const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentColor).offsetHSL(i * 0.1, 0, 0),
        metalness: 0.8,
        roughness: 0.2,
        emissive: new THREE.Color(accentColor).offsetHSL(i * 0.1, 0, 0).multiplyScalar(0.2),
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      );
      
      // Store initial position and angle for animation
      sphere.userData = { initialAngle: angle, radius };
      
      objectsGroup.add(sphere);
    }
    scene.add(objectsGroup);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, 1.5);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Animation
    const clock = new THREE.Clock();
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation loop
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate main knot
      mainMesh.rotation.x = elapsedTime * 0.2 * rotationSpeed;
      mainMesh.rotation.y = elapsedTime * 0.3 * rotationSpeed;
      
      // Match wireframe rotation
      wireframeMesh.rotation.x = mainMesh.rotation.x;
      wireframeMesh.rotation.y = mainMesh.rotation.y;
      
      // Add mouse interaction
      mainMesh.rotation.x += mouseY * 0.01;
      mainMesh.rotation.y += mouseX * 0.01;
      wireframeMesh.rotation.x = mainMesh.rotation.x;
      wireframeMesh.rotation.y = mainMesh.rotation.y;
      
      // Animate orbiting spheres
      objectsGroup.children.forEach((sphere, i) => {
        const { initialAngle, radius } = sphere.userData;
        const orbitSpeed = 0.5 + (i * 0.1); // Different speeds
        
        const angle = initialAngle + elapsedTime * orbitSpeed * rotationSpeed;
        
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.y = Math.sin(angle) * radius;
        sphere.position.z = Math.sin(elapsedTime + i) * 0.5;
      });
      
      // Rotate the entire orbit
      objectsGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;
      objectsGroup.rotation.z = Math.cos(elapsedTime * 0.2) * 0.2;
      
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
      
      // Dispose all geometries and materials
      geometry.dispose();
      wireframeGeometry.dispose();
      mainMaterial.dispose();
      wireframeMaterial.dispose();
      
      // Dispose sphere resources
      objectsGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      
      // Clear scene
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
    };
  }, [backgroundColor, accentColor, rotationSpeed]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.modelOverlay}></div>
    </div>
  );
};

export default SimpleTorusKnot;