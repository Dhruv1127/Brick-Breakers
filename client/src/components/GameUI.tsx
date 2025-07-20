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

      {/* Ultra HD Game start screen */}
      {phase === "ready" && (
        <div className="fixed inset-0 flex items-center justify-center z-40 overflow-hidden">
          {/* Ultra HD Realistic Starfield Background */}
          <div className="absolute inset-0">
            {/* Deep space background with nebula effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-black">
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/40 via-transparent to-blue-900/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/20 via-transparent to-cyan-900/20"></div>
              
              {/* Nebula clouds */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`nebula-${i}`}
                  className="absolute rounded-full opacity-20 animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${100 + Math.random() * 200}px`,
                    height: `${80 + Math.random() * 150}px`,
                    background: `radial-gradient(ellipse, ${
                      ['#4c1d95', '#7c2d12', '#0f766e', '#1e293b', '#581c87'][Math.floor(Math.random() * 5)]
                    }40, transparent)`,
                    filter: `blur(${20 + Math.random() * 30}px)`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${8 + Math.random() * 12}s`
                  }}
                />
              ))}
            </div>
            
            {/* Ultra HD Realistic Stars */}
            {Array.from({ length: 400 }).map((_, i) => {
              const size = Math.random();
              const twinkleSpeed = 2 + Math.random() * 4;
              const brightness = 0.3 + Math.random() * 0.7;
              
              return (
                <div
                  key={`star-${i}`}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: size < 0.1 ? '1px' : size < 0.3 ? '2px' : size < 0.7 ? '3px' : '4px',
                    height: size < 0.1 ? '1px' : size < 0.3 ? '2px' : size < 0.7 ? '3px' : '4px',
                    background: size > 0.8 ? '#ffffff' : size > 0.6 ? '#e0e7ff' : size > 0.4 ? '#ddd6fe' : '#f3e8ff',
                    borderRadius: '50%',
                    opacity: brightness,
                    animation: `twinkle ${twinkleSpeed}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                    boxShadow: size > 0.7 ? `0 0 ${4 + Math.random() * 6}px currentColor` : 'none',
                    filter: size > 0.8 ? 'brightness(1.5)' : 'none'
                  }}
                />
              );
            })}
            
            {/* Shooting stars */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`shooting-star-${i}`}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 50}%`,
                  width: '2px',
                  height: '2px',
                  background: '#ffffff',
                  borderRadius: '50%',
                  animation: `shootingStar ${8 + Math.random() * 12}s linear infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                  boxShadow: '0 0 6px #ffffff, 0 0 12px #ffffff, 0 0 18px #ffffff'
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-transparent opacity-80" style={{
                  width: '40px',
                  height: '1px',
                  transform: 'rotate(45deg) translateX(-20px)'
                }} />
              </div>
            ))}
            
            {/* Ultra HD Floating particles with realistic physics */}
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  background: `radial-gradient(circle, ${
                    ['#00f5ff', '#ff6b9d', '#00ff88', '#ffeb3b', '#9c27b0', '#ff4081', '#ffffff'][Math.floor(Math.random() * 7)]
                  }, transparent)`,
                  animation: `particleDrift ${15 + Math.random() * 20}s linear infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                  opacity: 0.4 + Math.random() * 0.6,
                  boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`
                }}
              />
            ))}
            
            {/* Advanced geometric shapes */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`shape-${i}`}
                className="absolute animate-spin"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 20}s`
                }}
              >
                <div 
                  className={`${i % 3 === 0 ? 'rotate-45' : i % 3 === 1 ? 'rounded-full' : ''}`}
                  style={{
                    width: `${8 + Math.random() * 16}px`,
                    height: `${8 + Math.random() * 16}px`,
                    background: `linear-gradient(${Math.random() * 360}deg, ${
                      ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'][Math.floor(Math.random() * 5)]
                    }, transparent)`,
                    opacity: 0.6,
                    filter: `blur(${Math.random() * 2}px)`,
                    boxShadow: `0 0 20px ${
                      ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'][Math.floor(Math.random() * 5)]
                    }60`
                  }}
                />
              </div>
            ))}
            
            {/* Ultra HD Moving energy beams */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`beam-${i}`}
                  className="absolute opacity-20 animate-pulse"
                  style={{
                    width: '200%',
                    height: '2px',
                    top: `${10 + i * 12}%`,
                    left: '-50%',
                    background: `linear-gradient(90deg, transparent, ${
                      ['#00f5ff', '#ff6b9d', '#00ff88', '#ffeb3b'][i % 4]
                    }, transparent)`,
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: `${4 + Math.random() * 2}s`,
                    transform: `rotate(${-60 + i * 15}deg)`,
                    filter: `blur(1px)`,
                    boxShadow: `0 0 20px ${
                      ['#00f5ff', '#ff6b9d', '#00ff88', '#ffeb3b'][i % 4]
                    }80`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center text-white z-20 relative max-w-6xl mx-auto px-8">
            {/* Ultra HD Title */}
            <div className="mb-16 relative">
              <h1 
                className="text-8xl md:text-9xl font-black mb-6 tracking-wider relative"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff 0%, #ff6b9d 25%, #00ff88 50%, #ffeb3b 75%, #9c27b0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 3s ease-in-out infinite alternate',
                  filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))'
                }}
              >
                BRICK BREAKER
              </h1>
              
              {/* Ultra HD Animated underline */}
              <div className="relative">
                <div 
                  className="h-2 mx-auto rounded-full"
                  style={{
                    width: '600px',
                    background: 'linear-gradient(90deg, #00f5ff, #ff6b9d, #00ff88, #ffeb3b, #9c27b0)',
                    backgroundSize: '200% 100%',
                    animation: 'gradientFlow 2s linear infinite',
                    boxShadow: '0 0 40px rgba(255, 255, 255, 0.8)'
                  }}
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full opacity-60"
                  style={{
                    width: '600px',
                    background: 'linear-gradient(90deg, transparent, white, transparent)',
                    animation: 'shimmer 2s linear infinite'
                  }}
                />
              </div>
            </div>
            
            {/* Level Selection Grid */}
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                SELECT LEVEL
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { level: 1, name: "Tutorial", difficulty: "Easy", color: "from-green-400 to-emerald-600" },
                  { level: 2, name: "Rookie", difficulty: "Normal", color: "from-blue-400 to-cyan-600" },
                  { level: 3, name: "Expert", difficulty: "Hard", color: "from-orange-400 to-red-600" },
                  { level: 4, name: "Master", difficulty: "Extreme", color: "from-purple-400 to-pink-600" }
                ].map((levelData) => (
                  <div
                    key={levelData.level}
                    className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-1`}
                    style={{
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${levelData.level * 0.2}s`
                    }}
                  >
                    <div className={`bg-gradient-to-br ${levelData.color} p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden`}>
                      {/* Ultra HD Background pattern */}
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          />
                        ))}
                      </div>
                      
                      <div className="relative z-10">
                        <div className="text-3xl font-black mb-2">{levelData.level}</div>
                        <div className="text-lg font-bold mb-1">{levelData.name}</div>
                        <div className="text-sm opacity-80">{levelData.difficulty}</div>
                      </div>
                      
                      {/* Ultra HD Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Ultra HD Shadow glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${levelData.color} rounded-2xl blur-xl opacity-30 -z-10 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ultra HD Controls */}
            <div className="space-y-6">
              <div className="relative group">
                <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/30 rounded-2xl px-8 py-6 inline-block shadow-2xl">
                  <p className="text-2xl font-semibold mb-3">
                    Press{" "}
                    <kbd className="bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 rounded-xl shadow-2xl font-black text-white text-xl border border-white/30 mx-2 inline-block transform transition-transform hover:scale-110">
                      SPACE
                    </kbd>{" "}
                    to start
                  </p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/30 rounded-2xl px-8 py-6 inline-block shadow-2xl">
                  <p className="text-xl font-medium">
                    Move with{" "}
                    {[["←", "→"], ["A", "D"]].map((pair, pairIndex) => (
                      <span key={pairIndex} className="inline-block mx-2">
                        {pair.map((key, keyIndex) => (
                          <kbd
                            key={key}
                            className="bg-gradient-to-r from-blue-400 to-purple-400 px-4 py-2 rounded-lg shadow-xl font-bold text-white border border-white/30 mx-1 inline-block transform transition-transform hover:scale-110"
                          >
                            {key}
                          </kbd>
                        ))}
                        {pairIndex === 0 && <span className="text-white/60 mx-2">or</span>}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ultra HD Corner decorations */}
          <div className="absolute top-8 left-8 w-24 h-24 border-l-4 border-t-4 border-cyan-400 opacity-60 rounded-tl-3xl"></div>
          <div className="absolute top-8 right-8 w-24 h-24 border-r-4 border-t-4 border-pink-400 opacity-60 rounded-tr-3xl"></div>
          <div className="absolute bottom-8 left-8 w-24 h-24 border-l-4 border-b-4 border-emerald-400 opacity-60 rounded-bl-3xl"></div>
          <div className="absolute bottom-8 right-8 w-24 h-24 border-r-4 border-b-4 border-purple-400 opacity-60 rounded-br-3xl"></div>
        </div>
      )}

      {/* Ultra HD Game over screen */}
      {phase === "ended" && (
        <div className="fixed inset-0 flex items-center justify-center z-40 overflow-hidden">
          <div className="absolute inset-0">
            {/* Ultra HD Destruction background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-purple-900">
              <div className="absolute inset-0 bg-gradient-to-tl from-red-800/50 via-transparent to-orange-800/30"></div>
            </div>
            
            {/* Ultra HD Cracking effect */}
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={`crack-${i}`}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 4}px`,
                  height: `${10 + Math.random() * 60}px`,
                  background: `linear-gradient(${Math.random() * 360}deg, #ff4444, #ff8888, transparent)`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.7,
                  filter: 'blur(0.5px)',
                  boxShadow: '0 0 10px #ff444460'
                }}
              />
            ))}
            
            {/* Ultra HD Fire particles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`fire-${i}`}
                className="absolute rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${80 + Math.random() * 20}%`,
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  background: `radial-gradient(circle, ${
                    ['#ff4444', '#ff8800', '#ffaa00', '#ff6600'][Math.floor(Math.random() * 4)]
                  }, transparent)`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  filter: 'blur(1px)',
                  boxShadow: `0 0 15px ${
                    ['#ff4444', '#ff8800', '#ffaa00', '#ff6600'][Math.floor(Math.random() * 4)]
                  }80`
                }}
              />
            ))}
          </div>
          
          <div className="text-center text-white z-20 relative max-w-4xl mx-auto px-8">
            {/* Ultra HD Game Over title */}
            <div className="mb-12 relative">
              <h2 
                className="text-8xl md:text-9xl font-black mb-6 tracking-wider relative"
                style={{
                  background: 'linear-gradient(135deg, #ff4444 0%, #ff8800 25%, #ff0066 50%, #cc0000 75%, #990000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '300% 300%',
                  animation: 'dramaticPulse 2s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 40px rgba(255, 68, 68, 0.8))'
                }}
              >
                GAME OVER
              </h2>
              
              {/* Dramatic underline */}
              <div 
                className="h-2 mx-auto rounded-full"
                style={{
                  width: '500px',
                  background: 'linear-gradient(90deg, #ff4444, #ff8800, #ff0066)',
                  backgroundSize: '200% 100%',
                  animation: 'dramaticGlow 1.5s ease-in-out infinite alternate',
                  boxShadow: '0 0 50px rgba(255, 68, 68, 0.9)'
                }}
              />
            </div>
            
            <div className="mb-16">
              {gameData.score > 0 && (
                <div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-red-400/30 rounded-2xl px-8 py-6 mb-8 shadow-2xl">
                  <p className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Final Score: {gameData.score.toLocaleString()}
                  </p>
                </div>
              )}
              
              <p className="text-3xl font-semibold mb-12 text-red-200 animate-pulse">
                Better luck next time!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="relative group">
                <div className="bg-gradient-to-r from-red-500/20 via-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-red-400/30 rounded-2xl px-8 py-6 inline-block shadow-2xl">
                  <p className="text-2xl font-semibold">
                    Press{" "}
                    <kbd className="bg-gradient-to-r from-red-400 to-pink-400 px-6 py-3 rounded-xl shadow-2xl font-black text-white text-xl border border-white/30 mx-2 inline-block transform transition-transform hover:scale-110">
                      R
                    </kbd>{" "}
                    to restart
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dramatic corner flames */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-500/30 to-transparent rounded-br-full animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/30 to-transparent rounded-bl-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-red-500/30 to-transparent rounded-tr-full animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/30 to-transparent rounded-tl-full animate-pulse"></div>
        </div>
      )}

      {/* Ultra HD Enhanced In-game HUD */}
      {phase === "playing" && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {/* Ultra HD HUD Panel */}
          <div className="absolute top-8 left-8">
            <div className="relative">
              {/* Main HUD container with ultra effects */}
              <div 
                className="bg-gradient-to-br from-black/50 via-gray-900/40 to-black/50 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(30,30,60,0.4) 50%, rgba(0,0,0,0.6) 100%)',
                  boxShadow: '0 0 60px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Ultra HD animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: '2px',
                        height: '2px',
                        background: '#00ffff',
                        borderRadius: '50%',
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-8 relative z-10">
                  {/* Ultra HD Score Section */}
                  <div className="text-center relative">
                    <div className="relative">
                      <p className="text-sm text-cyan-300 uppercase tracking-[3px] font-bold mb-2 relative">
                        <span className="relative z-10">SCORE</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-sm rounded"></div>
                      </p>
                      <div className="relative">
                        <p 
                          className="text-4xl font-black text-transparent bg-clip-text relative"
                          style={{
                            background: 'linear-gradient(135deg, #00f5ff 0%, #00d4ff 50%, #0099ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.6))'
                          }}
                        >
                          {gameData.score.toLocaleString()}
                        </p>
                        {/* Animated underline */}
                        <div 
                          className="h-1 mx-auto rounded-full mt-2"
                          style={{
                            width: '80px',
                            background: 'linear-gradient(90deg, #00f5ff, #0099ff)',
                            animation: 'pulse 2s ease-in-out infinite alternate',
                            boxShadow: '0 0 15px rgba(0, 245, 255, 0.8)'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ultra HD Divider */}
                  <div 
                    className="w-0.5 h-20 rounded-full relative"
                    style={{
                      background: 'linear-gradient(180deg, transparent, #ffffff60, transparent)',
                      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                    }}
                  />

                  {/* Ultra HD Lives Section */}
                  <div className="text-center relative">
                    <div className="relative">
                      <p className="text-sm text-pink-300 uppercase tracking-[3px] font-bold mb-3 relative">
                        <span className="relative z-10">LIVES</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-red-400/20 blur-sm rounded"></div>
                      </p>
                      
                      {/* Ultra HD Lives display */}
                      <div className="flex space-x-2 justify-center">
                        {Array.from({ length: Math.max(0, gameData.lives) }).map((_, i) => (
                          <div
                            key={i}
                            className="relative group"
                            style={{
                              animation: `heartbeat 1.5s ease-in-out infinite`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          >
                            <div 
                              className="w-5 h-5 rounded-full relative"
                              style={{
                                background: 'linear-gradient(135deg, #ff4081 0%, #ff6b9d 50%, #e91e63 100%)',
                                boxShadow: '0 0 20px rgba(255, 64, 129, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)'
                              }}
                            >
                              {/* Inner glow */}
                              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
                            </div>
                            
                            {/* Outer glow ring */}
                            <div 
                              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: 'radial-gradient(circle, transparent 60%, rgba(255, 64, 129, 0.4))',
                                transform: 'scale(1.8)'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ultra HD Border glow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-40"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.3), transparent, rgba(255, 64, 129, 0.3), transparent)',
                    backgroundSize: '400% 400%',
                    animation: 'borderGlow 4s ease-in-out infinite'
                  }}
                />
              </div>

              {/* Ultra HD Shadow/Reflection */}
              <div 
                className="absolute inset-0 rounded-3xl blur-2xl opacity-20 -z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,255,0.3) 0%, rgba(255,64,129,0.3) 100%)',
                  transform: 'scale(1.1)'
                }}
              />
            </div>
          </div>

          {/* Ultra HD Controls hint */}
          <div className="absolute bottom-8 left-8">
            <div 
              className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-xl border border-blue-400/30 rounded-2xl px-6 py-4 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              {/* Background particles */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
              
              <p className="text-blue-200 text-sm font-medium relative z-10">
                <span className="opacity-70">Use</span>{" "}
                <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded text-white font-bold text-xs shadow-lg">←</kbd>
                <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded text-white font-bold text-xs shadow-lg ml-1">→</kbd>
                <span className="opacity-70 mx-2">or</span>
                <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded text-white font-bold text-xs shadow-lg">A</kbd>
                <kbd className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 rounded text-white font-bold text-xs shadow-lg ml-1">D</kbd>
                <span className="opacity-70 ml-2">to move</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}