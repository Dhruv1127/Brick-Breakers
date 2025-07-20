import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PaddleProps {
  position: THREE.Vector3;
  width: number;
  height: number;
}

export default function Paddle({ position, width, height }: PaddleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle glow animation
      const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    if (glowRef.current) {
      // Glow effect scaling
      const scale = 1.1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <boxGeometry args={[width * 1.2, height * 2, 0.1]} />
        <meshStandardMaterial 
          color="#00ff88"
          transparent
          opacity={0.3}
          emissive="#00ff88"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Main paddle */}
      <mesh ref={meshRef}>
        <boxGeometry args={[width, height, 0.3]} />
        <meshStandardMaterial 
          color="#00ff88" 
          emissive="#004400"
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      
      {/* Top highlight */}
      <mesh position={[0, height * 0.3, 0.1]}>
        <boxGeometry args={[width * 0.9, height * 0.2, 0.05]} />
        <meshStandardMaterial 
          color="#88ffaa"
          emissive="#88ffaa"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}