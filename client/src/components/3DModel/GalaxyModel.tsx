import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './TorusKnotModel.module.css';

interface GalaxyModelProps {
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  rotationSpeed?: number;
}

const GalaxyModel = ({ 
  backgroundColor = "hsl(var(--background))",
  primaryColor = "#8b5cf6",
  secondaryColor = "#ec4899",
  rotationSpeed = 0.2
}: GalaxyModelProps) => {
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
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    
    // Colors
    const color1 = new THREE.Color(primaryColor);
    const color2 = new THREE.Color(secondaryColor);
    
    // Core sphere
    const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: color1,
      emissive: color1,
      emissiveIntensity: 0.5,
      metalness: 0.3,
      roughness: 0.4,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);
    
    // First galaxy spiral
    const galaxyGroup1 = new THREE.Group();
    scene.add(galaxyGroup1);
    
    // Create galaxy particles
    const particleCount = 2000;
    const galaxyGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    const innerRadius = 0.8;
    const outerRadius = 3.5;
    const branches = 3;
    const spin = 1.5;
    const randomness = 0.2;
    const randomnessPower = 3;
    
    const colorInside = new THREE.Color(primaryColor);
    const colorOutside = new THREE.Color(secondaryColor);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position
      const radius = Math.random() * (outerRadius - innerRadius) + innerRadius;
      const spinAngle = radius * spin;
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      // Color
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / outerRadius);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
      
      // Scale
      scales[i] = Math.random() * 0.2;
    }
    
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    
    // Material with custom shader
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: generateStarTexture()
    });
    
    // Generate star texture
    function generateStarTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const context = canvas.getContext('2d');
      if (!context) return new THREE.Texture();
      
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
    
    // Points
    const particles = new THREE.Points(galaxyGeometry, particleMaterial);
    galaxyGroup1.add(particles);
    
    // Second galaxy disk with different orientation
    const galaxyGroup2 = galaxyGroup1.clone();
    galaxyGroup2.rotation.x = Math.PI / 4;
    galaxyGroup2.rotation.y = Math.PI / 6;
    scene.add(galaxyGroup2);
    
    // Ambient stars
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      
      // Random position in a sphere
      const radius = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      sizeAttenuation: true,
      alphaMap: generateStarTexture(),
      transparent: true,
      alphaTest: 0.01
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    // Point lights
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(new THREE.Color(primaryColor).getHex(), 1);
    pointLight2.position.set(-2, -1, -1);
    scene.add(pointLight2);
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Clock for animation
    const clock = new THREE.Clock();
    
    // Animation
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate galaxy
      galaxyGroup1.rotation.y = elapsedTime * 0.05 * rotationSpeed;
      galaxyGroup1.rotation.z = elapsedTime * 0.03 * rotationSpeed;
      
      galaxyGroup2.rotation.y = -elapsedTime * 0.05 * rotationSpeed;
      galaxyGroup2.rotation.x = elapsedTime * 0.04 * rotationSpeed;
      
      // Pulsate core
      const pulseFactor = 1 + Math.sin(elapsedTime) * 0.1;
      core.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Update core color
      const lerpedColor = new THREE.Color(primaryColor).lerp(
        new THREE.Color(secondaryColor),
        Math.sin(elapsedTime * 0.5) * 0.5 + 0.5
      );
      
      if (coreMaterial.emissive) {
        coreMaterial.emissive.set(lerpedColor);
      }
      
      // Mouse interaction
      galaxyGroup1.rotation.y += mouseX * 0.001;
      galaxyGroup1.rotation.x += mouseY * 0.001;
      
      galaxyGroup2.rotation.y += mouseX * 0.001;
      galaxyGroup2.rotation.x += mouseY * 0.001;
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handling
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
      coreGeometry.dispose();
      galaxyGeometry.dispose();
      starGeometry.dispose();
      
      // Dispose materials
      coreMaterial.dispose();
      particleMaterial.dispose();
      starMaterial.dispose();
      
      // Dispose textures
      if (particleMaterial.alphaMap) particleMaterial.alphaMap.dispose();
      if (starMaterial.alphaMap) starMaterial.alphaMap.dispose();
      
      // Remove objects
      scene.remove(core, galaxyGroup1, galaxyGroup2, stars);
      renderer.dispose();
    };
  }, [backgroundColor, primaryColor, secondaryColor, rotationSpeed]);

  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.modelOverlay}></div>
    </div>
  );
};

export default GalaxyModel;