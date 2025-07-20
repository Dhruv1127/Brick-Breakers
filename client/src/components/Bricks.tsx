import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Brick {
  position: THREE.Vector3;
  destroyed: boolean;
  color: string;
}

interface BricksProps {
  bricks: Brick[];
  brickWidth: number;
  brickHeight: number;
}

function BrickComponent({ brick, width, height, index }: { brick: Brick; width: number; height: number; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [isDestroying, setIsDestroying] = useState(false);

  useEffect(() => {
    if (brick.destroyed && !isDestroying) {
      setIsDestroying(true);
    }
  }, [brick.destroyed, isDestroying]);

  useFrame((state) => {
    if (meshRef.current && !brick.destroyed) {
      // Subtle floating animation with individual timing
      const offset = index * 0.1;
      const floatY = Math.sin(state.clock.elapsedTime * 2 + offset) * 0.02;
      meshRef.current.position.y = brick.position.y + floatY;
      
      // Gentle glow pulsing
      const intensity = 0.2 + Math.sin(state.clock.elapsedTime * 1.5 + offset) * 0.1;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
    
    if (glowRef.current && !brick.destroyed) {
      // Glow animation
      const scale = 1.0 + Math.sin(state.clock.elapsedTime * 2 + index * 0.1) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }

    // Destruction animation
    if (isDestroying && meshRef.current) {
      const scale = Math.max(0, meshRef.current.scale.x - 0.1);
      meshRef.current.scale.setScalar(scale);
      meshRef.current.rotation.x += 0.2;
      meshRef.current.rotation.y += 0.3;
      
      if (scale <= 0.1) {
        meshRef.current.visible = false;
      }
    }
  });

  if (brick.destroyed && !isDestroying) return null;

  return (
    <group position={brick.position}>
      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, -0.1]}>
        <boxGeometry args={[width * 1.1, height * 1.1, 0.1]} />
        <meshStandardMaterial 
          color={brick.color}
          transparent
          opacity={0.3}
          emissive={brick.color}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Main brick */}
      <mesh ref={meshRef}>
        <boxGeometry args={[width * 0.95, height * 0.9, 0.4]} />
        <meshStandardMaterial 
          color={brick.color}
          emissive={brick.color}
          emissiveIntensity={0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Highlight edge */}
      <mesh position={[0, height * 0.3, 0.15]}>
        <boxGeometry args={[width * 0.9, height * 0.1, 0.1]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Side highlights */}
      <mesh position={[width * 0.4, 0, 0.1]}>
        <boxGeometry args={[width * 0.05, height * 0.8, 0.2]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh position={[-width * 0.4, 0, 0.1]}>
        <boxGeometry args={[width * 0.05, height * 0.8, 0.2]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

export default function Bricks({ bricks, brickWidth, brickHeight }: BricksProps) {
  return (
    <group>
      {bricks.map((brick, index) => (
        <BrickComponent
          key={index}
          brick={brick}
          width={brickWidth}
          height={brickHeight}
          index={index}
        />
      ))}
    </group>
  );
}