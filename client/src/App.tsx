import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";

// Import our game components
import Game from "./components/Game";
import GameUI from "./components/GameUI";
import AudioManager from "./components/AudioManager";

// Define control keys for the game
enum Controls {
  left = 'left',
  right = 'right',
  start = 'start',
  restart = 'restart',
}

const controls = [
  { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
  { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
  { name: Controls.start, keys: ["Space"] },
  { name: Controls.restart, keys: ["KeyR"] },
];

// Main App component
function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <KeyboardControls map={controls}>
        <Canvas
          camera={{
            position: [0, 0, 10],
            fov: 50,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={["#000011"]} />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />

          <Suspense fallback={null}>
            <Game />
          </Suspense>
        </Canvas>
        
        <GameUI />
        <AudioManager />
      </KeyboardControls>
    </div>
  );
}

export default App;
