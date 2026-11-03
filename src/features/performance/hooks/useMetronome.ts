import { createMetronome } from '@/features/performance/utils/metronome';
import { useEffect, useRef, useState } from 'react';

export function useMetronome(bpm: number, beatsPerBar = 4) {
  const engineRef = useRef<ReturnType<typeof createMetronome> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keeping the engine in sync with props without restarting it
  useEffect(() => engineRef.current?.setBpm(bpm), [bpm]);
  useEffect(
    () => engineRef.current?.setBeatsPerBar(beatsPerBar),
    [beatsPerBar],
  );

  // Stop on unmount
  useEffect(() => () => engineRef.current?.stop(), []);

  const start = async () => {
    // Creating lazily inside the click handler, which satisfies the autoplay policy
    engineRef.current ??= createMetronome(new AudioContext());
    engineRef.current.setBpm(bpm);
    engineRef.current.setBeatsPerBar(beatsPerBar);
    await engineRef.current.start();
    setIsPlaying(true);
  };

  const stop = () => {
    engineRef.current?.stop();
    setIsPlaying(false);
  };

  return { isPlaying, start, stop };
}
