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

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    // TorusKnot geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    
    // Material with gradient and wireframe
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      wireframe: false,
      metalness: 0.2,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
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
    const wireframeGeometry = new THREE.TorusKnotGeometry(1.01, 0.31, 100, 16);
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, 1);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

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
      
      mainMesh.rotation.x += 0.005 * speed;
      mainMesh.rotation.y += 0.01 * speed;
      
      wireframeMesh.rotation.x += 0.005 * speed;
      wireframeMesh.rotation.y += 0.01 * speed;
      
      // Add subtle movement based on mouse position
      mainMesh.rotation.x += mouseY * 0.01 * speed;
      mainMesh.rotation.y += mouseX * 0.01 * speed;
      
      wireframeMesh.rotation.x += mouseY * 0.01 * speed;
      wireframeMesh.rotation.y += mouseX * 0.01 * speed;
      
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
      mainMaterial.dispose();
      wireframeMaterial.dispose();
      renderer.dispose();
      
      scene.remove(mainMesh);
      scene.remove(wireframeMesh);
    };
  }, [backgroundColor, accentColor, speed]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default TorusKnotModel;