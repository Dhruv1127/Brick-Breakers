import { useEffect } from "react";
import { useAudio } from "../lib/stores/useAudio";

export default function AudioManager() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize audio files
    const backgroundMusic = new Audio("/sounds/background.mp3");
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");

    // Configure background music
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;

    // Configure sound effects
    hitSound.volume = 0.5;
    successSound.volume = 0.7;

    // Set in store
    setBackgroundMusic(backgroundMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);

    // Cleanup
    return () => {
      backgroundMusic.pause();
      hitSound.pause();
      successSound.pause();
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return null;
}