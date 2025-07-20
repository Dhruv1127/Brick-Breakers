import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BallProps {
  position: THREE.Vector3;
  size: number;
}

export default function Ball({ position, size }: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (meshRef.current) {
      // Add rotation animation based on movement
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.02;
      
      // Pulsing emission
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    
    if (glowRef.current) {
      // Glow pulsing
      const scale = 1.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
      glowRef.current.scale.setScalar(scale);
      
      const opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
    }
  });

  return (
    <group position={position}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 1.8, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.2}
          emissive="#aaffff"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Main ball */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#aaffff"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
      
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[size * 0.6, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}