import { useGame } from "../lib/stores/useGame";
import { useAudio } from "../lib/stores/useAudio";

export default function GameUI() {
  const { phase } = useGame();
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Mute button */}
      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 pointer-events-auto bg-black/70 text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
      >
        {isMuted ? "🔇 Unmute" : "🔊 Mute"}
      </button>

      {/* Game start screen */}
      {phase === "ready" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-4 text-blue-400">
              BRICK BREAKER
            </h1>
            <p className="text-xl mb-8">Break all the bricks to win!</p>
            <div className="space-y-2">
              <p className="text-lg">Press <kbd className="bg-gray-700 px-2 py-1 rounded">SPACE</kbd> to start</p>
              <p className="text-sm">Use <kbd className="bg-gray-700 px-1 rounded">←</kbd> <kbd className="bg-gray-700 px-1 rounded">→</kbd> arrows or <kbd className="bg-gray-700 px-1 rounded">A</kbd> <kbd className="bg-gray-700 px-1 rounded">D</kbd> to move</p>
            </div>
          </div>
        </div>
      )}

      {/* Game over screen */}
      {phase === "ended" && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4 text-red-400">
              GAME OVER
            </h2>
            <p className="text-xl mb-8">Better luck next time!</p>
            <p className="text-lg">Press <kbd className="bg-gray-700 px-2 py-1 rounded">R</kbd> to restart</p>
          </div>
        </div>
      )}

      {/* In-game HUD */}
      {phase === "playing" && (
        <div className="fixed top-4 left-4 text-white z-30">
          <div className="bg-black/50 px-4 py-2 rounded-lg">
            <p className="text-lg">Score: <span className="font-bold">0</span></p>
            <p className="text-lg">Lives: <span className="font-bold">3</span></p>
          </div>
          <div className="mt-4 text-sm opacity-70">
            <p>← → or A D to move</p>
          </div>
        </div>
      )}
    </div>
  );
}