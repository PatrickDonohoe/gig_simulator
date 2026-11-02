const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

export function createMetronome(ctx: AudioContext) {
  // Default Values
  let bpm = 120;
  let beatsPerBar = 4;
  let beat = 0;
  let nextNoteTime = 0;
  let timerId: number | undefined;
  let isRunning = false;

  function scheduleClick(time: number, isBeatOne: boolean) {
    const osc = ctx.createOscillator(); // creates a constant tone
    const gain = ctx.createGain(); // establishes volume for the drone(osc)
    // sets the pitch to 1000hz on beat 1 and 800hz on any subsequent beats.
    osc.frequency.value = isBeatOne ? 1000 : 800;

    // Sets volume at the beginning of the click
    gain.gain.setValueAtTime(1, time);
    // Quickly diminishes volume to almost nothing over the duration of the click
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain).connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  // Advances the beat count until the number of beats per measure is reached and schedules the next beat click
  function scheduler() {
    while (nextNoteTime < ctx.currentTime + SCHEDULE_AHEAD_S) {
      scheduleClick(nextNoteTime, beat === 0);
      nextNoteTime += 60 / bpm; // calculates next click in seconds
      beat = (beat + 1) % beatsPerBar; // increments the beat count
    }
  }

  return {
    async start() {
      if (isRunning) return; // if it is already playing, let it play
      isRunning = true; // if not, start it

      await ctx.resume(); // awake the web audio api
      if (!isRunning) return; // if it was stopped while waking the api, stop

      beat = 0; // metronome started, beat count is 0
      // count 0 will happen 50 miliseconds from now
      nextNoteTime = ctx.currentTime + 0.05;
      scheduler();
      timerId = window.setInterval(scheduler, LOOKAHEAD_MS);
    },
    stop() {
      isRunning = false;
      clearInterval(timerId);
      timerId = undefined;
    },
    setBpm(next: number) {
      bpm = next; // takes effect on the next scheduled beat
    },
    setBeatsPerBar(next: number) {
      beatsPerBar = next;
    },
  };
}
