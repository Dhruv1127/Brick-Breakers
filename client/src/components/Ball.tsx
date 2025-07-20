import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BallProps {
  position: THREE.Vector3;
  size: number;
}

export default function Ball({ position, size }: BallProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle rotation animation
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color="#ffffff" 
        emissive="#444444"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}