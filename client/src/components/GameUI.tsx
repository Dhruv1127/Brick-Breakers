import { useGame } from "../lib/stores/useGame";
import { useAudio } from "../lib/stores/useAudio";
import { useEffect, useState } from "react";
import { currentGameData } from "./Game";

export default function GameUI() {
  const { phase } = useGame();
  const { isMuted, toggleMute } = useAudio();
  const [gameData, setGameData] = useState({ score: 0, lives: 3 });

  // Update game data for UI
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentGameData) {
        setGameData({
          score: currentGameData.score,
          lives: currentGameData.lives
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 pointer-events-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/20"
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      {/* Game start screen */}
      {phase === "ready" && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-95">
            {/* Floating geometric shapes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                <div className={`w-3 h-3 bg-gradient-to-r ${
                  ['from-red-400 to-pink-400', 'from-blue-400 to-cyan-400', 'from-green-400 to-emerald-400', 'from-yellow-400 to-orange-400'][i % 4]
                } rounded-full opacity-60 shadow-lg`} />
              </div>
            ))}
            
            {/* Moving lines */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
                  style={{
                    width: '200%',
                    top: `${20 + i * 15}%`,
                    left: '-50%',
                    animationDelay: `${i * 0.5}s`,
                    transform: `rotate(${-45 + i * 20}deg)`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center text-white z-10 relative">
            <div className="mb-8 animate-pulse">
              <h1 className="text-7xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-bounce">
                BRICK BREAKER
              </h1>
              <div className="h-1 w-64 mx-auto bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-pulse" />
            </div>
            
            <p className="text-2xl mb-12 text-cyan-200 animate-pulse">Break all the bricks to win!</p>
            
            <div className="space-y-4 mb-8">
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 inline-block">
                <p className="text-xl mb-2">Press <kbd className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-lg shadow-lg font-bold text-white">SPACE</kbd> to start</p>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 inline-block">
                <p className="text-lg">Use <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-lg font-bold text-white">←</kbd> <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-lg font-bold text-white">→</kbd> or <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-lg font-bold text-white">A</kbd> <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-lg font-bold text-white">D</kbd> to move</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game over screen */}
      {phase === "ended" && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-purple-900 to-black opacity-95">
            {/* Cracking effect animation */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-red-400 opacity-30 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${20 + Math.random() * 40}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
          
          <div className="text-center text-white z-10 relative">
            <h2 className="text-6xl font-bold mb-6 text-red-400 animate-pulse drop-shadow-2xl">
              GAME OVER
            </h2>
            <p className="text-2xl mb-8 text-red-200">Better luck next time!</p>
            <div className="bg-black/40 backdrop-blur-sm border border-red-500/30 rounded-xl px-8 py-4 inline-block">
              <p className="text-xl">Press <kbd className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-lg shadow-lg font-bold text-white">R</kbd> to restart</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced In-game HUD */}
      {phase === "playing" && (
        <div className="fixed top-6 left-6 text-white z-30">
          <div className="bg-black/40 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-2xl">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-cyan-300 uppercase tracking-wide font-semibold">Score</p>
                <p className="text-2xl font-bold text-cyan-400">{gameData.score.toLocaleString()}</p>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <p className="text-sm text-pink-300 uppercase tracking-wide font-semibold">Lives</p>
                <div className="flex space-x-1 justify-center mt-1">
                  {Array.from({ length: Math.max(0, gameData.lives) }).map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-xl">
            <p className="text-sm text-gray-300">← → or A D to move</p>
          </div>
        </div>
      )}
    </div>
  );
}