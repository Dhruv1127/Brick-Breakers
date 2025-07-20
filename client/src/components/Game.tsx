import { useRef, useState, useEffect } from "react";
import { useFrame, useKeyboardControls } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../lib/stores/useGame";
import { useAudio } from "../lib/stores/useAudio";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Bricks from "./Bricks";

enum Controls {
  left = 'left',
  right = 'right',
  start = 'start',
  restart = 'restart',
}

// Game constants
const GAME_WIDTH = 16;
const GAME_HEIGHT = 12;
const PADDLE_WIDTH = 2;
const PADDLE_HEIGHT = 0.3;
const PADDLE_SPEED = 8;
const BALL_SPEED = 6;
const BALL_SIZE = 0.2;

export interface GameData {
  score: number;
  lives: number;
  ballPosition: THREE.Vector3;
  ballVelocity: THREE.Vector3;
  paddlePosition: THREE.Vector3;
  bricks: { position: THREE.Vector3; destroyed: boolean; color: string }[];
}

export default function Game() {
  const { phase, start, restart, end } = useGame();
  const { playHit, playSuccess } = useAudio();
  
  const [, getKeys] = useKeyboardControls<Controls>();
  
  // Game state
  const [gameData, setGameData] = useState<GameData>(() => {
    const initialBricks = [];
    const rows = 5;
    const cols = 10;
    const brickWidth = (GAME_WIDTH - 1) / cols;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        initialBricks.push({
          position: new THREE.Vector3(
            -GAME_WIDTH/2 + 0.5 + col * brickWidth + brickWidth/2,
            GAME_HEIGHT/2 - 2 - row * 0.6,
            0
          ),
          destroyed: false,
          color: colors[row]
        });
      }
    }
    
    return {
      score: 0,
      lives: 3,
      ballPosition: new THREE.Vector3(0, 0, 0),
      ballVelocity: new THREE.Vector3(BALL_SPEED * 0.6, BALL_SPEED * 0.8, 0),
      paddlePosition: new THREE.Vector3(0, -GAME_HEIGHT/2 + 1, 0),
      bricks: initialBricks
    };
  });

  // Reset game
  const resetGame = () => {
    const initialBricks = [];
    const rows = 5;
    const cols = 10;
    const brickWidth = (GAME_WIDTH - 1) / cols;
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        initialBricks.push({
          position: new THREE.Vector3(
            -GAME_WIDTH/2 + 0.5 + col * brickWidth + brickWidth/2,
            GAME_HEIGHT/2 - 2 - row * 0.6,
            0
          ),
          destroyed: false,
          color: colors[row]
        });
      }
    }
    
    setGameData({
      score: 0,
      lives: 3,
      ballPosition: new THREE.Vector3(0, 0, 0),
      ballVelocity: new THREE.Vector3(BALL_SPEED * 0.6, BALL_SPEED * 0.8, 0),
      paddlePosition: new THREE.Vector3(0, -GAME_HEIGHT/2 + 1, 0),
      bricks: initialBricks
    });
  };

  useFrame((state, delta) => {
    const controls = getKeys();
    
    // Handle input
    if (controls.start && phase === "ready") {
      console.log("Starting game...");
      start();
    }
    
    if (controls.restart && phase === "ended") {
      console.log("Restarting game...");
      resetGame();
      restart();
    }

    if (phase !== "playing") return;

    setGameData(prevData => {
      const newData = { ...prevData };
      
      // Update paddle position
      if (controls.left) {
        newData.paddlePosition = new THREE.Vector3(
          Math.max(-GAME_WIDTH/2 + PADDLE_WIDTH/2, newData.paddlePosition.x - PADDLE_SPEED * delta),
          newData.paddlePosition.y,
          newData.paddlePosition.z
        );
      }
      if (controls.right) {
        newData.paddlePosition = new THREE.Vector3(
          Math.min(GAME_WIDTH/2 - PADDLE_WIDTH/2, newData.paddlePosition.x + PADDLE_SPEED * delta),
          newData.paddlePosition.y,
          newData.paddlePosition.z
        );
      }

      // Update ball position
      const newBallPos = new THREE.Vector3(
        newData.ballPosition.x + newData.ballVelocity.x * delta,
        newData.ballPosition.y + newData.ballVelocity.y * delta,
        newData.ballPosition.z
      );
      
      const newBallVel = new THREE.Vector3().copy(newData.ballVelocity);

      // Ball collision with walls
      if (newBallPos.x <= -GAME_WIDTH/2 + BALL_SIZE || newBallPos.x >= GAME_WIDTH/2 - BALL_SIZE) {
        newBallVel.x = -newBallVel.x;
        playHit();
      }
      if (newBallPos.y >= GAME_HEIGHT/2 - BALL_SIZE) {
        newBallVel.y = -newBallVel.y;
        playHit();
      }

      // Ball collision with paddle
      if (newBallPos.y <= newData.paddlePosition.y + PADDLE_HEIGHT/2 + BALL_SIZE &&
          newBallPos.y >= newData.paddlePosition.y - PADDLE_HEIGHT/2 - BALL_SIZE &&
          newBallPos.x >= newData.paddlePosition.x - PADDLE_WIDTH/2 - BALL_SIZE &&
          newBallPos.x <= newData.paddlePosition.x + PADDLE_WIDTH/2 + BALL_SIZE &&
          newBallVel.y < 0) {
        
        newBallVel.y = -newBallVel.y;
        // Add spin based on where ball hits paddle
        const hitOffset = (newBallPos.x - newData.paddlePosition.x) / (PADDLE_WIDTH/2);
        newBallVel.x += hitOffset * 2;
        
        // Normalize velocity to maintain speed
        newBallVel.normalize().multiplyScalar(BALL_SPEED);
        playHit();
      }

      // Ball collision with bricks
      const brickWidth = (GAME_WIDTH - 1) / 10;
      const brickHeight = 0.4;
      
      newData.bricks = newData.bricks.map(brick => {
        if (brick.destroyed) return brick;
        
        const brickLeft = brick.position.x - brickWidth/2;
        const brickRight = brick.position.x + brickWidth/2;
        const brickTop = brick.position.y + brickHeight/2;
        const brickBottom = brick.position.y - brickHeight/2;
        
        if (newBallPos.x + BALL_SIZE >= brickLeft &&
            newBallPos.x - BALL_SIZE <= brickRight &&
            newBallPos.y + BALL_SIZE >= brickBottom &&
            newBallPos.y - BALL_SIZE <= brickTop) {
          
          // Determine collision side
          const overlapLeft = newBallPos.x + BALL_SIZE - brickLeft;
          const overlapRight = brickRight - (newBallPos.x - BALL_SIZE);
          const overlapTop = brickTop - (newBallPos.y - BALL_SIZE);
          const overlapBottom = newBallPos.y + BALL_SIZE - brickBottom;
          
          const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
          
          if (minOverlap === overlapLeft || minOverlap === overlapRight) {
            newBallVel.x = -newBallVel.x;
          } else {
            newBallVel.y = -newBallVel.y;
          }
          
          newData.score += 10;
          playHit();
          
          return { ...brick, destroyed: true };
        }
        
        return brick;
      });

      // Check for ball falling off screen
      if (newBallPos.y < -GAME_HEIGHT/2 - 2) {
        newData.lives -= 1;
        if (newData.lives <= 0) {
          return newData; // Game will end
        } else {
          // Reset ball position
          newBallPos.set(0, 0, 0);
          newBallVel.set(BALL_SPEED * 0.6, BALL_SPEED * 0.8, 0);
        }
      }

      // Check for win condition
      const remainingBricks = newData.bricks.filter(brick => !brick.destroyed).length;
      if (remainingBricks === 0) {
        playSuccess();
        return newData; // Game will end with victory
      }

      newData.ballPosition = newBallPos;
      newData.ballVelocity = newBallVel;
      
      return newData;
    });

    // Check end conditions after state update
    if (gameData.lives <= 0 || gameData.bricks.every(brick => brick.destroyed)) {
      end();
    }
  });

  return (
    <group>
      {/* Game boundaries (invisible) */}
      <mesh position={[0, 0, -0.1]} visible={false}>
        <planeGeometry args={[GAME_WIDTH, GAME_HEIGHT]} />
        <meshBasicMaterial color="#222" />
      </mesh>

      {/* Game components */}
      <Paddle 
        position={gameData.paddlePosition} 
        width={PADDLE_WIDTH}
        height={PADDLE_HEIGHT}
      />
      
      <Ball 
        position={gameData.ballPosition}
        size={BALL_SIZE}
      />
      
      <Bricks 
        bricks={gameData.bricks}
        brickWidth={(GAME_WIDTH - 1) / 10}
        brickHeight={0.4}
      />
      
      {/* Game boundaries visualization */}
      <group>
        {/* Left wall */}
        <mesh position={[-GAME_WIDTH/2 - 0.1, 0, 0]}>
          <boxGeometry args={[0.2, GAME_HEIGHT + 1, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[GAME_WIDTH/2 + 0.1, 0, 0]}>
          <boxGeometry args={[0.2, GAME_HEIGHT + 1, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Top wall */}
        <mesh position={[0, GAME_HEIGHT/2 + 0.1, 0]}>
          <boxGeometry args={[GAME_WIDTH + 0.4, 0.2, 0.2]} />
          <meshStandardMaterial color="#444" />
        </mesh>
      </group>
    </group>
  );
}