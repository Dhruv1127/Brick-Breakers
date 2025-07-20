import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BallProps {
  position: THREE.Vector3;
  size: number;
}

export default function Ball({ position, size }: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [currentColor, setCurrentColor] = useState('#ffffff');

  // Ultra vibrant color palette that changes every second
  const colors = [
    '#ff0080', // Hot Pink
    '#00ff80', // Electric Green
    '#8000ff', // Electric Purple
    '#ff8000', // Electric Orange
    '#0080ff', // Electric Blue
    '#ff0040', // Neon Red
    '#40ff00', // Lime Green
    '#ff4000', // Bright Orange
    '#0040ff', // Bright Blue
    '#ff00c0', // Magenta
    '#00ffc0', // Cyan
    '#c000ff', // Purple
    '#ffff00', // Yellow
    '#00ffff', // Cyan
    '#ff6600', // Orange Red
    '#6600ff'  // Blue Violet
  ];

  // Change color every second
  useEffect(() => {
    const interval = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(randomColor);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Add rotation animation based on movement
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.02;
      
      // Ultra dynamic pulsing emission with color changes
      const intensity = 0.6 + Math.sin(state.clock.elapsedTime * 5) * 0.4;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      
      // Update ball color
      (meshRef.current.material as THREE.MeshStandardMaterial).color.setHex(parseInt(currentColor.replace('#', '0x')));
      (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(parseInt(currentColor.replace('#', '0x')));
    }
    
    if (glowRef.current) {
      // Ultra dynamic glow pulsing
      const scale = 1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.5;
      glowRef.current.scale.setScalar(scale);
      
      const opacity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
      
      // Update glow color
      (glowRef.current.material as THREE.MeshStandardMaterial).color.setHex(parseInt(currentColor.replace('#', '0x')));
      (glowRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(parseInt(currentColor.replace('#', '0x')));
    }

    if (coreRef.current) {
      // Ultra bright core pulsing
      const intensity = 0.8 + Math.sin(state.clock.elapsedTime * 6) * 0.2;
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      
      // Update core color
      (coreRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(parseInt(currentColor.replace('#', '0x')));
    }
  });

  return (
    <group position={position}>
      {/* Ultra outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshStandardMaterial 
          color={currentColor}
          transparent
          opacity={0.3}
          emissive={currentColor}
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Main ball with dynamic color */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={currentColor}
          emissive={currentColor}
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.1}
        />
      </mesh>
      
      {/* Ultra bright inner core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[size * 0.6, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive={currentColor}
          emissiveIntensity={0.9}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Energy rings around ball */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh 
          key={i}
          rotation={[Math.PI / 2, 0, i * Math.PI / 3]}
          position={[0, 0, 0]}
        >
          <ringGeometry args={[size * (1.2 + i * 0.3), size * (1.3 + i * 0.3), 16]} />
          <meshStandardMaterial 
            color={currentColor}
            emissive={currentColor}
            emissiveIntensity={0.4 - i * 0.1}
            transparent
            opacity={0.6 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}