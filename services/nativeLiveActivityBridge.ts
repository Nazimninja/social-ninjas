/**
 * Native Live Activity Bridge for iOS (Capacitor / Swift)
 * 
 * When running inside a native iOS app (via Capacitor), this service invokes
 * the native ActivityKit plugin to spin up real Dynamic Island and Lock Screen
 * Live Activities on iPhone 14 Pro, 15, 16+.
 * 
 * In standard web/PWA mode, it gracefully delegates to the Web Audio + MediaSession
 * background sync engine.
 */

import {
  updateLockScreenMediaSession,
  soundSynth,
  sendRestFinishedNotification
} from './liveActivitySync';

export interface LiveActivityRestPayload {
  workoutTitle: string;
  currentExercise: string;
  currentSetIndex: number;
  totalSets: number;
  nextExercise: string;
  nextExerciseTarget: string;
  nextMuscleGroup: string;
  restDurationSeconds: number;
  restEndTime: number; // Unix timestamp in ms
}

declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean;
      Plugins?: {
        FitNinjaLiveActivity?: {
          startRestActivity?: (options: LiveActivityRestPayload) => Promise<{ activityId?: string }>;
          updateRestActivity?: (options: Partial<LiveActivityRestPayload>) => Promise<void>;
          endRestActivity?: () => Promise<void>;
        };
      };
    };
  }
}

export class NativeLiveActivityBridge {
  private currentActivityId: string | null = null;

  public isNativeIOS(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      window.Capacitor &&
      window.Capacitor.isNativePlatform &&
      window.Capacitor.isNativePlatform()
    );
  }

  /**
   * Start or replace a Live Activity when a user finishes a set and starts rest
   */
  public async startRestActivity(payload: LiveActivityRestPayload): Promise<void> {
    // 1. Web Fallback (MediaSession + Synthesizer Audio)
    updateLockScreenMediaSession({
      workoutName: payload.workoutTitle,
      currentExercise: payload.currentExercise,
      nextExercise: payload.nextExercise,
      remainingRestSeconds: payload.restDurationSeconds,
      isResting: true,
    });

    // 2. Native iOS ActivityKit Bridge (if running inside iOS app)
    if (this.isNativeIOS()) {
      try {
        const plugin = window.Capacitor?.Plugins?.FitNinjaLiveActivity;
        if (plugin?.startRestActivity) {
          const res = await plugin.startRestActivity(payload);
          this.currentActivityId = res.activityId || null;
        }
      } catch (err) {
        console.warn('[FitNinja] Native Live Activity start failed:', err);
      }
    }
  }

  /**
   * Extend rest time (+30s) or update state
   */
  public async extendRestActivity(newRemainingSeconds: number, newEndTime: number): Promise<void> {
    if (this.isNativeIOS()) {
      try {
        const plugin = window.Capacitor?.Plugins?.FitNinjaLiveActivity;
        if (plugin?.updateRestActivity) {
          await plugin.updateRestActivity({
            restDurationSeconds: newRemainingSeconds,
            restEndTime: newEndTime,
          });
        }
      } catch (err) {
        console.warn('[FitNinja] Native Live Activity update failed:', err);
      }
    }
  }

  /**
   * Dismiss the Dynamic Island / Live Activity when rest finishes or is skipped
   */
  public async endRestActivity(): Promise<void> {
    if (this.isNativeIOS()) {
      try {
        const plugin = window.Capacitor?.Plugins?.FitNinjaLiveActivity;
        if (plugin?.endRestActivity) {
          await plugin.endRestActivity();
        }
      } catch (err) {
        console.warn('[FitNinja] Native Live Activity end failed:', err);
      }
    }
    this.currentActivityId = null;
  }
}

export const nativeLiveActivity = new NativeLiveActivityBridge();
