'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      const radius = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 5;

      // Color gradient from white to cyan/emerald
      const colorMix = Math.random();
      if (colorMix > 0.7) {
        // Emerald/cyan stars
        colors[i3] = 0.2 + Math.random() * 0.3;
        colors[i3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i3 + 2] = 0.6 + Math.random() * 0.4;
      } else {
        // White/light gray stars
        const brightness = 0.7 + Math.random() * 0.3;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness;
      }

      // Random sizes
      sizes[i] = Math.random() * 3 + 1;

      // Small random velocities for floating effect
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for better particle rendering
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mousePosition;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Pulse effect
          float pulse = sin(time * 2.0 + position.x * 0.5) * 0.5 + 0.5;
          
          // Distance from mouse
          vec2 screenPos = (projectionMatrix * mvPosition).xy;
          float dist = length(screenPos - mousePosition);
          float mouseEffect = smoothstep(2.0, 0.0, dist) * 0.5;
          
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + pulse * 0.3 + mouseEffect);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          // Circular particle shape
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft glow effect
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add ambient connections (lines between nearby particles)
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });
    const maxConnections = 200;
    const connectionPositions = new Float32Array(maxConnections * 6); // 2 points per line
    connectionGeometry.setAttribute('position', new THREE.BufferAttribute(connectionPositions, 3));
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Smooth mouse following
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update shader uniforms
      if (material.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.mousePosition.value.set(mouseRef.current.x, mouseRef.current.y);
      }

      // Animate particles with floating motion and mouse interaction
      const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Apply velocity for floating effect
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Mouse interaction - particles move away from mouse
        const px = posArray[i3];
        const py = posArray[i3 + 1];
        const pz = posArray[i3 + 2];
        
        const projected = new THREE.Vector3(px, py, pz).project(camera);
        const dx = projected.x - mouseRef.current.x;
        const dy = projected.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 0.5) {
          const force = (0.5 - dist) * 0.02;
          posArray[i3] += dx * force;
          posArray[i3 + 1] += dy * force;
        }

        // Boundary check - keep particles in view
        const maxDist = 12;
        const currentDist = Math.sqrt(px * px + py * py + (pz + 5) * (pz + 5));
        if (currentDist > maxDist) {
          const scale = maxDist / currentDist;
          posArray[i3] *= scale;
          posArray[i3 + 1] *= scale;
          posArray[i3 + 2] = (posArray[i3 + 2] + 5) * scale - 5;
        }
      }
      
      positionAttribute.needsUpdate = true;

      // Update connections between nearby particles
      let connectionIndex = 0;
      const connectionThreshold = 1.5;
      const connectionPositionAttr = connectionGeometry.getAttribute('position') as THREE.BufferAttribute;
      const connArray = connectionPositionAttr.array as Float32Array;

      for (let i = 0; i < particleCount && connectionIndex < maxConnections * 2; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < particleCount && connectionIndex < maxConnections * 2; j++) {
          const j3 = j * 3;
          
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < connectionThreshold) {
            const idx = connectionIndex * 3;
            connArray[idx] = posArray[i3];
            connArray[idx + 1] = posArray[i3 + 1];
            connArray[idx + 2] = posArray[i3 + 2];
            
            connArray[idx + 3] = posArray[j3];
            connArray[idx + 4] = posArray[j3 + 1];
            connArray[idx + 5] = posArray[j3 + 2];
            
            connectionIndex += 2;
          }
        }
      }
      
      connectionGeometry.setDrawRange(0, connectionIndex);
      connectionPositionAttr.needsUpdate = true;

      // Rotate scene slightly
      particles.rotation.y = time * 0.05;
      connections.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      connectionGeometry.dispose();
      connectionMaterial.dispose();
      renderer.dispose();
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(to bottom right, #0a0a0a 0%, #1a1a1a 50%, #0f1a1a 100%)',
      }}
    />
  );
}

