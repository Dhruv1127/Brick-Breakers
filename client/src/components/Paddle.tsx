import { useRef } from "react";
import * as THREE from "three";

interface PaddleProps {
  position: THREE.Vector3;
  width: number;
  height: number;
}

export default function Paddle({ position, width, height }: PaddleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[width, height, 0.2]} />
      <meshStandardMaterial 
        color="#00ff88" 
        emissive="#002200"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}