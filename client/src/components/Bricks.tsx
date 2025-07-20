import { useRef } from "react";
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

function BrickComponent({ brick, width, height }: { brick: Brick; width: number; height: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  if (brick.destroyed) return null;

  return (
    <mesh ref={meshRef} position={brick.position}>
      <boxGeometry args={[width, height, 0.3]} />
      <meshStandardMaterial 
        color={brick.color}
        emissive={brick.color}
        emissiveIntensity={0.1}
      />
    </mesh>
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
        />
      ))}
    </group>
  );
}