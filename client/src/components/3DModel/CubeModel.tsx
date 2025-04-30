import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './CubeModel.module.css';

const CubeModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create the cube group
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Create multiple cubes with different sizes and colors
    const createCube = (size: number, color: string, position: THREE.Vector3) => {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.3,
        roughness: 0.4,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.copy(position);
      cube.castShadow = true;
      cube.receiveShadow = true;
      return cube;
    };

    // Add various cubes to the group
    cubeGroup.add(createCube(1.5, '#3b82f6', new THREE.Vector3(0, 0, 0)));
    cubeGroup.add(createCube(0.8, '#8b5cf6', new THREE.Vector3(1.5, 1.5, 0)));
    cubeGroup.add(createCube(0.6, '#10b981', new THREE.Vector3(-1.5, 1, 0.5)));
    cubeGroup.add(createCube(0.7, '#f59e0b', new THREE.Vector3(-0.5, -1.5, 0.5)));
    cubeGroup.add(createCube(0.4, '#ef4444', new THREE.Vector3(1.5, -1, -0.5)));

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the cube group
      cubeGroup.rotation.x += 0.003;
      cubeGroup.rotation.y += 0.005;
      
      // Update controls
      controls.update();
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.children.forEach((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, []);

  return <div ref={mountRef} className={styles.container}></div>;
};

export default CubeModel;