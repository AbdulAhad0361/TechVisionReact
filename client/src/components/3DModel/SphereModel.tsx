import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './SphereModel.module.css';

const SphereModel = () => {
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
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 2, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create main sphere
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create particle system (orbiting small spheres)
    const particleCount = 100;
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    for (let i = 0; i < particleCount; i++) {
      // Create small sphere
      const radius = 0.05 + Math.random() * 0.05;
      const particleGeometry = new THREE.SphereGeometry(radius, 16, 16);
      
      // Randomize color
      const colors = [0x3b82f6, 0x10b981, 0x8b5cf6, 0xf59e0b, 0xef4444];
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      const particleMaterial = new THREE.MeshStandardMaterial({
        color: colors[colorIndex],
        emissive: colors[colorIndex],
        emissiveIntensity: 0.5,
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      // Position on random orbit
      const orbitRadius = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      particle.position.x = orbitRadius * Math.sin(theta) * Math.cos(phi);
      particle.position.y = orbitRadius * Math.sin(theta) * Math.sin(phi);
      particle.position.z = orbitRadius * Math.cos(theta);
      
      // Add custom properties for animation
      particle.userData = {
        orbitRadius: orbitRadius,
        orbitSpeed: 0.001 + Math.random() * 0.01,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      };
      
      particleGroup.add(particle);
    }

    // Add connecting lines between some particles
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
    });

    // Create connections between some particles
    const connectionCount = 30;
    for (let i = 0; i < connectionCount; i++) {
      const index1 = Math.floor(Math.random() * particleCount);
      const index2 = Math.floor(Math.random() * particleCount);
      
      if (index1 !== index2) {
        const particle1 = particleGroup.children[index1];
        const particle2 = particleGroup.children[index2];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          particle1.position,
          particle2.position
        ]);
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        particle1.userData.connectedTo = particle2;
        particle1.userData.connectionLine = line;
        scene.add(line);
      }
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate particles around their orbits
      particleGroup.children.forEach((particle: THREE.Object3D) => {
        particle.userData.orbitAngle += particle.userData.orbitSpeed;
        
        // Calculate new position using axis-angle rotation
        const axis = particle.userData.orbitAxis;
        const angle = particle.userData.orbitAngle;
        const radius = particle.userData.orbitRadius;
        
        // Create a quaternion for rotation
        const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
        const vector = new THREE.Vector3(radius, 0, 0);
        vector.applyQuaternion(quaternion);
        
        particle.position.copy(vector);
        
        // Update connection lines if they exist
        if (particle.userData.connectionLine && particle.userData.connectedTo) {
          const line = particle.userData.connectionLine;
          const connectedTo = particle.userData.connectedTo;
          
          const points = [particle.position, connectedTo.position];
          line.geometry.setFromPoints(points);
          line.geometry.attributes.position.needsUpdate = true;
        }
      });
      
      // Rotate sphere slowly
      sphere.rotation.y += 0.001;
      
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
      scene.traverse((obj: THREE.Object3D) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          
          if (Array.isArray(obj.material)) {
            obj.material.forEach((material: THREE.Material) => material.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        } else if (obj instanceof THREE.Line) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) obj.material.dispose();
        }
      });
      
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={styles.container}></div>;
};

export default SphereModel;