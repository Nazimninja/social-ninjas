/**
 * Ultra-Premium Live Activity & Background Sync Service for Fit Ninja
 * 
 * Delivers an Apple-grade, high-end experience across all devices:
 * 1. Studio-grade Acoustic Chimes: Warm harmonic tones designed like luxury watch haptics.
 * 2. Dynamic Lock Screen Artwork: Renders an OLED Live Activity visual directly onto
 *    the phone's Lock Screen and Control Center player.
 * 3. Interactive Lock Screen Controls: Action buttons for [+30s] and [Skip Rest] right on Lock Screen.
 * 4. Micro-Haptic Pulses: Tactile feedback on rest completion.
 */

// Acoustic synthesizer producing warm, luxury gym chimes (no harsh electronic buzzers)
class AcousticSynth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Resonant countdown ping at 3, 2, 1 seconds.
   * Dual-harmonic sine with gentle exponential fade (sounds like a luxury acoustic bell).
   */
  playWarningPing(pitch: number = 880) {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Fundamental frequency
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(pitch, now);
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      // Warm octave harmonic
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch * 2, now);
      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.19);
      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Rest completion fanfare: Apple Watch-style A-Major resonant chord (A5 - C#6 - E6 - A6)
   */
  playRestFinished() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const chord = [
        { freq: 880.00, delay: 0.00, vol: 0.16 }, // A5
        { freq: 1108.73, delay: 0.06, vol: 0.16 }, // C#6
        { freq: 1318.51, delay: 0.12, vol: 0.18 }, // E6
        { freq: 1760.00, delay: 0.18, vol: 0.22 }, // A6
      ];

      chord.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + note.delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.freq, startTime);

        gain.gain.setValueAtTime(note.vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.46);
      });
    } catch {
      // Ignore audio policy errors
    }
  }
}

export const soundSynth = new AcousticSynth();

// ── Dynamic Lock Screen Artwork Generator ──────────────────────────────────
let artworkCache: { key: string; dataUrl: string } | null = null;

function generateLockScreenArtwork(exerciseName: string, nextName?: string): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') return '/apple-touch-icon.png';

  const key = `${exerciseName}_${nextName || ''}`;
  if (artworkCache && artworkCache.key === key) {
    return artworkCache.dataUrl;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '/apple-touch-icon.png';

    // Deep luxury OLED background with subtle radial glow
    const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 320);
    grad.addColorStop(0, '#0c162d');
    grad.addColorStop(1, '#05070c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Glowing border ring
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1F4B99';
    ctx.strokeRect(16, 16, 480, 480);

    // Fit Ninja brand header
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('FIT NINJA LIVE', 256, 75);

    // Subtle divider
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 100);
    ctx.lineTo(432, 100);
    ctx.stroke();

    // Active Exercise
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('CURRENT INTERVAL', 256, 150);

    ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = '#ffffff';
    const exDisplay = exerciseName.length > 20 ? exerciseName.slice(0, 18) + '…' : exerciseName;
    ctx.fillText(exDisplay, 256, 195);

    // Up Next Card Box
    if (nextName) {
      ctx.fillStyle = 'rgba(31, 75, 153, 0.25)';
      ctx.beginPath();
      ctx.roundRect(56, 260, 400, 180, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('⚡ UP NEXT', 256, 305);

      ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#ffffff';
      const nextDisplay = nextName.length > 22 ? nextName.slice(0, 20) + '…' : nextName;
      ctx.fillText(nextDisplay, 256, 360);

      ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Ready for next set', 256, 405);
    }

    const dataUrl = canvas.toDataURL('image/png');
    artworkCache = { key, dataUrl };
    return dataUrl;
  } catch {
    return '/apple-touch-icon.png';
  }
}

// ── MediaSession Lock Screen Sync ──────────────────────────────────────────
export interface MediaSessionWorkoutInfo {
  workoutName: string;
  currentExercise: string;
  nextExercise?: string;
  remainingRestSeconds?: number;
  isResting: boolean;
}

export interface MediaSessionActionCallbacks {
  onAddRest?: (seconds: number) => void;
  onSkipRest?: () => void;
}

let silentAudioElement: HTMLAudioElement | null = null;
let registeredCallbacks: MediaSessionActionCallbacks = {};

export function setMediaSessionCallbacks(cbs: MediaSessionActionCallbacks) {
  registeredCallbacks = cbs;
}

// Ensure a continuous audio stream keeps MediaSession active on mobile lock screens
function initSilentAudio() {
  if (typeof window === 'undefined' || silentAudioElement) return;

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime); // Inaudible carrier
      const dest = ctx.createMediaStreamDestination();
      osc.connect(gain);
      gain.connect(dest);
      osc.start();

      silentAudioElement = document.createElement('audio');
      silentAudioElement.srcObject = dest.stream;
      silentAudioElement.setAttribute('playsinline', 'true');
      silentAudioElement.setAttribute('autoplay', 'true');
      silentAudioElement.style.display = 'none';
      document.body.appendChild(silentAudioElement);
      silentAudioElement.play().catch(() => {});
      return;
    }
  } catch {
    // Fallback below
  }

  // 1-second valid silent PCM WAV fallback
  const silentWav = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
  silentAudioElement = new Audio(silentWav);
  silentAudioElement.loop = true;
}

export function updateLockScreenMediaSession(info: MediaSessionWorkoutInfo | null) {
  if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

  if (!info) {
    if (silentAudioElement) {
      silentAudioElement.pause();
    }
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
    return;
  }

  initSilentAudio();
  if (silentAudioElement && silentAudioElement.paused) {
    silentAudioElement.play().catch(() => {});
  }

  const mins = Math.floor((info.remainingRestSeconds || 0) / 60);
  const secs = (info.remainingRestSeconds || 0) % 60;
  const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  const title = info.isResting
    ? `⏳ Rest: ${timeStr} left`
    : `💪 Doing: ${info.currentExercise}`;

  const artist = info.nextExercise
    ? `Next: ${info.nextExercise}`
    : `Workout: ${info.workoutName}`;

  const artworkSrc = generateLockScreenArtwork(info.currentExercise, info.nextExercise);

  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist,
      album: 'Fit Ninja Live',
      artwork: [
        {
          src: artworkSrc,
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    });
    navigator.mediaSession.playbackState = 'playing';

    // Interactive Action buttons on Android & iPhone Lock Screen!
    try {
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (registeredCallbacks.onAddRest) {
          registeredCallbacks.onAddRest(30);
        }
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (registeredCallbacks.onSkipRest) {
          registeredCallbacks.onSkipRest();
        }
      });
      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (registeredCallbacks.onAddRest) {
          registeredCallbacks.onAddRest(30);
        }
      });
    } catch {
      // Some browsers restrict action handlers
    }
  } catch {
    // Fallback
  }
}

// ── System Notifications ──────────────────────────────────────────────────
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const result = await Notification.requestPermission();
    return result === 'granted';
  }
  return false;
}

export function sendRestFinishedNotification(nextExerciseName?: string, targetInfo?: string) {
  // Mobile vibration pattern: 2 crisp bursts
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate([120, 80, 240]);
  }

  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  try {
    const body = nextExerciseName
      ? `Time to lift! Up next: ${nextExerciseName}${targetInfo ? ` (${targetInfo})` : ''}.`
      : 'Rest period complete! Get ready for your next set.';

    new Notification('⚡ Fit Ninja: Rest Complete!', {
      body,
      icon: '/apple-touch-icon.png',
      badge: '/apple-touch-icon.png',
      tag: 'fit-ninja-rest',
      silent: false
    });
  } catch {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        title: '⚡ Fit Ninja: Rest Complete!',
        body: nextExerciseName ? `Up next: ${nextExerciseName}` : 'Rest complete!'
      });
    }
  }
}
