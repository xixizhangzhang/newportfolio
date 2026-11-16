/** A quiet two-tone reader chirp, played only after an explicit badge activation. */
export async function playBadgeSound(): Promise<void> {
  if (typeof window.AudioContext !== "function") return;
  const context = new window.AudioContext();
  try {
    if (context.state === "suspended") await context.resume();
    const start = context.currentTime;
    for (const [offset, frequency] of [[0, 1046.5], [0.085, 1396.9]]) {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(0, start + offset);
      volume.gain.linearRampToValueAtTime(0.075, start + offset + 0.008);
      volume.gain.exponentialRampToValueAtTime(0.001, start + offset + 0.11);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + 0.12);
      if (offset > 0) oscillator.onended = () => { void context.close().catch(() => undefined); };
    }
  } catch {
    // Audio restrictions must never prevent the access dialog opening.
    await context.close().catch(() => undefined);
  }
}