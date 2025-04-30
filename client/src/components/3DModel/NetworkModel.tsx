import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styles from './TorusKnotModel.module.css';

interface NetworkModelProps {
  backgroundColor?: string;
  nodeColor?: string;
  lineColor?: string;
  rotationSpeed?: number;
}

const NetworkModel = ({
  backgroundColor = "hsl(var(--background))",
  nodeColor = "#3b82f6",
  lineColor = "#8b5cf6",
  rotationSpeed = 0.2
}: NetworkModelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    
    // Create network container
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    
    // Node settings
    const nodeCount = 50;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMaterials: THREE.MeshPhysicalMaterial[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    
    // Line settings
    const maxDistance = 5; // Maximum distance for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: 0.6,
    });
    const connectionLines: THREE.Line[] = [];
    
    // Central sphere settings
    const centerSphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const centerSphereMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(nodeColor),
      roughness: 0.2,
      metalness: 0.8,
      transmission: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeometry, centerSphereMaterial);
    networkGroup.add(centerSphere);
    
    // Pulse rings
    const ringGroup = new THREE.Group();
    networkGroup.add(ringGroup);
    
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(1.5, 1.6, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeColor),
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.userData = { 
        initialDelay: i * 1.5,
        animating: false
      };
      ringGroup.add(ring);
    }
    
    // Create network nodes
    for (let i = 0; i < nodeCount; i++) {
      // Use spherical distribution for nodes
      const radius = 4 + Math.random() * 7;
      const polar = Math.random() * Math.PI * 2;
      const azimuthal = Math.random() * Math.PI;
      
      const x = radius * Math.sin(azimuthal) * Math.cos(polar);
      const y = radius * Math.sin(azimuthal) * Math.sin(polar);
      const z = radius * Math.cos(azimuthal);
      
      const position = new THREE.Vector3(x, y, z);
      nodePositions.push(position);
      
      // Create mesh for node
      const size = 0.05 + Math.random() * 0.15;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      
      // Different colors for visual interest
      const hue = i % 3 === 0 ? 0.6 : (i % 3 === 1 ? 0.7 : 0.55);
      const node = new THREE.Color().setHSL(hue, 0.8, 0.6);
      
      const material = new THREE.MeshPhysicalMaterial({
        color: node,
        emissive: node,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9,
        roughness: 0.3,
        metalness: 0.7,
      });
      
      nodeMaterials.push(material);
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.userData = {
        originalPosition: position.clone(),
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.1 + Math.random() * 0.2,
        speed: 0.5 + Math.random() * 0.5,
      };
      
      nodeMeshes.push(mesh);
      networkGroup.add(mesh);
    }
    
    // Draw lines between close nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j]);
        if (distance < maxDistance) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j]
          ]);
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          line.userData = {
            startIndex: i,
            endIndex: j,
            updating: true,
          };
          
          connectionLines.push(line);
          networkGroup.add(line);
        }
      }
    }
    
    // Data packets (small spheres that travel along the lines)
    const packetGroup = new THREE.Group();
    networkGroup.add(packetGroup);
    
    const packetGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const packetMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    
    // Create some initial packets
    const packetCount = 20;
    const packets: THREE.Mesh[] = [];
    
    for (let i = 0; i < packetCount; i++) {
      if (connectionLines.length === 0) continue;
      
      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      const lineIndex = Math.floor(Math.random() * connectionLines.length);
      const progress = Math.random();
      
      const line = connectionLines[lineIndex];
      const { startIndex, endIndex } = line.userData;
      
      // Interpolate position
      const startPos = nodePositions[startIndex];
      const endPos = nodePositions[endIndex];
      packet.position.lerpVectors(startPos, endPos, progress);
      
      packet.userData = {
        lineIndex,
        progress,
        speed: 0.02 + Math.random() * 0.02,
        direction: Math.random() > 0.5 ? 1 : -1,
      };
      
      packets.push(packet);
      packetGroup.add(packet);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
    pointLight2.position.set(-10, -5, 5);
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
    const clock = new THREE.Clock();
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate entire network
      networkGroup.rotation.y += delta * 0.1 * rotationSpeed;
      networkGroup.rotation.x += delta * 0.05 * rotationSpeed;
      
      // Add mouse interaction
      networkGroup.rotation.y += mouseX * 0.02 * delta;
      networkGroup.rotation.x += mouseY * 0.02 * delta;
      
      // Animate central sphere
      centerSphere.rotation.y += delta * 0.2 * rotationSpeed;
      centerSphere.rotation.z += delta * 0.1 * rotationSpeed;
      
      // Animate rings (signal pulse effect)
      ringGroup.children.forEach((ring, i) => {
        const { initialDelay, animating } = ring.userData;
        
        // Start animation with offset
        if (!animating && elapsedTime > initialDelay) {
          ring.userData.animating = true;
          ring.userData.startTime = elapsedTime;
        }
        
        if (ring.userData.animating) {
          const ringTime = elapsedTime - ring.userData.startTime;
          const ringDuration = 3; // Duration of full ring animation
          
          if (ringTime < ringDuration) {
            // Scale ring outward
            const progress = ringTime / ringDuration;
            const scale = 1 + progress * 5; // Grow to 6x size
            ring.scale.set(scale, scale, scale);
            
            // Fade opacity - peak in middle and fade at end
            const opacity = Math.sin(progress * Math.PI);
            if (ring instanceof THREE.Mesh && ring.material instanceof THREE.MeshBasicMaterial) {
              ring.material.opacity = opacity;
            }
          } else {
            // Reset animation
            ring.scale.set(1, 1, 1);
            if (ring instanceof THREE.Mesh && ring.material instanceof THREE.MeshBasicMaterial) {
              ring.material.opacity = 0;
            }
            ring.userData.animating = false;
            ring.userData.startTime = elapsedTime + Math.random() * 1; // Random offset for next pulse
          }
        }
      });
      
      // Animate nodes
      nodeMeshes.forEach((node, i) => {
        const { phase, amplitude, speed, originalPosition } = node.userData;
        
        // Subtle floating motion
        const floatY = Math.sin(elapsedTime * speed + phase) * amplitude;
        const floatX = Math.cos(elapsedTime * speed * 0.7 + phase) * amplitude * 0.3;
        
        node.position.x = originalPosition.x + floatX;
        node.position.y = originalPosition.y + floatY;
        node.position.z = originalPosition.z + floatX;
        
        // Subtle pulse effect on size
        const scalePulse = 1 + Math.sin(elapsedTime * speed * 0.5 + phase) * 0.1;
        node.scale.set(scalePulse, scalePulse, scalePulse);
        
        // Update node material
        const material = nodeMaterials[i];
        material.emissiveIntensity = 0.3 + Math.sin(elapsedTime * speed + phase) * 0.1;
      });
      
      // Update connection lines
      connectionLines.forEach((line) => {
        if (line.userData.updating) {
          const { startIndex, endIndex } = line.userData;
          const startPos = nodeMeshes[startIndex].position;
          const endPos = nodeMeshes[endIndex].position;
          
          const positions = line.geometry.attributes.position.array as Float32Array;
          positions[0] = startPos.x;
          positions[1] = startPos.y;
          positions[2] = startPos.z;
          positions[3] = endPos.x;
          positions[4] = endPos.y;
          positions[5] = endPos.z;
          
          line.geometry.attributes.position.needsUpdate = true;
        }
      });
      
      // Animate packets
      packets.forEach((packet) => {
        const { lineIndex, progress, speed, direction } = packet.userData;
        if (lineIndex >= connectionLines.length) return;
        
        const line = connectionLines[lineIndex];
        const { startIndex, endIndex } = line.userData;
        
        const startPos = nodeMeshes[startIndex].position;
        const endPos = nodeMeshes[endIndex].position;
        
        // Update progress
        let newProgress = progress + speed * direction;
        
        // Handle reaching end and restart from the other end
        if (newProgress > 1) {
          // Reached end, reassign to a new line
          packet.userData.lineIndex = Math.floor(Math.random() * connectionLines.length);
          packet.userData.progress = 0;
          packet.userData.direction = 1;
        } else if (newProgress < 0) {
          // Reached start, reassign to a new line
          packet.userData.lineIndex = Math.floor(Math.random() * connectionLines.length);
          packet.userData.progress = 1;
          packet.userData.direction = -1;
        } else {
          packet.userData.progress = newProgress;
        }
        
        // Update position
        packet.position.lerpVectors(startPos, endPos, packet.userData.progress);
      });
      
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
      
      // Dispose objects
      centerSphereGeometry.dispose();
      centerSphereMaterial.dispose();
      
      // Dispose rings
      ringGroup.children.forEach((ring) => {
        if (ring instanceof THREE.Mesh) {
          ring.geometry.dispose();
          (ring.material as THREE.Material).dispose();
        }
      });
      
      // Dispose nodes
      nodeMeshes.forEach((node) => {
        node.geometry.dispose();
      });
      
      nodeMaterials.forEach((material) => {
        material.dispose();
      });
      
      // Dispose lines
      connectionLines.forEach((line) => {
        line.geometry.dispose();
      });
      lineMaterial.dispose();
      
      // Dispose packets
      packets.forEach((packet) => {
        packet.geometry.dispose();
      });
      packetMaterial.dispose();
      
      // Remove from scene
      scene.remove(networkGroup);
      renderer.dispose();
    };
  }, [backgroundColor, nodeColor, lineColor, rotationSpeed]);
  
  return (
    <div className={styles.canvasContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.modelOverlay}></div>
    </div>
  );
};

export default NetworkModel;