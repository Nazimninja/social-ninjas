import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Workout, WorkoutExercise, WorkoutSet } from './FitNinjaContext';
import { useFitNinja } from './FitNinjaContext';
import {
  soundSynth,
  updateLockScreenMediaSession,
  sendRestFinishedNotification,
  requestNotificationPermission,
  setMediaSessionCallbacks,
} from '../services/liveActivitySync';
import { pipIsland } from '../services/pictureInPictureIsland';

export interface ActiveRestTimer {
  active: boolean;
  totalSeconds: number;
  remainingSeconds: number;
  endTimestamp: number;
  currentExerciseName: string;
  currentSetIndex: number;
  totalSetsInExercise: number;
  nextExerciseName: string;
  nextExerciseTarget: string;
  nextMuscleGroup: string;
}

interface WorkoutSessionContextType {
  isActive: boolean;
  workoutName: string;
  exercises: (WorkoutExercise & { restSeconds?: number })[];
  elapsedSeconds: number;
  restTimer: ActiveRestTimer | null;
  startWorkout: (name: string, initialExercises: (WorkoutExercise & { restSeconds?: number })[], planDayIndex?: number) => void;
  updateSet: (exId: string, setIdx: number, field: keyof WorkoutSet, val: any) => void;
  completeSet: (exId: string, setIdx: number, completed: boolean, restSecs?: number) => void;
  addSet: (exId: string) => void;
  addExercise: (exercise: WorkoutExercise & { restSeconds?: number }) => void;
  deleteExercise: (exId: string) => void;
  skipRest: () => void;
  addRestSeconds: (delta: number) => void;
  finishWorkout: () => Workout | null;
  cancelWorkout: () => void;
  togglePiPIsland: () => Promise<boolean>;
  isPiPSupported: boolean;
}

const WorkoutSessionContext = createContext<WorkoutSessionContextType | null>(null);

export function WorkoutSessionProvider({ children }: { children: React.ReactNode }) {
  const { dispatch } = useFitNinja();

  const [isActive, setIsActive] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [planDayIndex, setPlanDayIndex] = useState<number | undefined>(undefined);
  const [exercises, setExercises] = useState<(WorkoutExercise & { restSeconds?: number })[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [restTimer, setRestTimer] = useState<ActiveRestTimer | null>(null);

  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restTimerRef = useRef<ActiveRestTimer | null>(null);
  restTimerRef.current = restTimer;

  // Prompt notification permissions when first starting a session
  const promptNotifications = useCallback(() => {
    requestNotificationPermission().catch(() => {});
  }, []);

  const wakeLockRef = useRef<any>(null);

  // Keep phone screen awake during active workout (supported on iOS 16.4+ PWA & Android)
  const requestWakeLock = useCallback(async () => {
    if (typeof window !== 'undefined' && 'wakeLock' in navigator) {
      try {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
      } catch {
        // Ignored if device is low battery or wake lock unavailable
      }
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release().catch(() => {});
      wakeLockRef.current = null;
    }
  }, []);

  // Re-acquire wake lock if user switches back to the app
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isActive, requestWakeLock]);

  // 1. Elapsed Workout Time & Rest Countdown Master Loop
  useEffect(() => {
    if (!isActive) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      updateLockScreenMediaSession(null);
      releaseWakeLock();
      return;
    }

    requestWakeLock();

    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);

      // Handle Rest Timer Countdown
      const currentRest = restTimerRef.current;
      if (currentRest && currentRest.active) {
        const msRemaining = currentRest.endTimestamp - Date.now();
        const secsRemaining = Math.max(0, Math.ceil(msRemaining / 1000));

        // Subtle acoustic countdown ticks at 5, 4, 3, 2, 1 seconds
        if (secsRemaining <= 5 && secsRemaining >= 1) {
          soundSynth.playCountdownTick(secsRemaining);
        }

        if (secsRemaining <= 0) {
          // Timer finished!
          soundSynth.playRestFinished();
          sendRestFinishedNotification(currentRest.nextExerciseName, currentRest.nextExerciseTarget);
          setRestTimer(null);
          pipIsland.updateState({
            isResting: false,
            currentExercise: currentRest.nextExerciseName || currentRest.currentExerciseName,
            workoutTitle: workoutName || 'Workout',
          });
          updateLockScreenMediaSession({
            workoutName: workoutName || 'Workout',
            currentExercise: currentRest.nextExerciseName || currentRest.currentExerciseName,
            isResting: false,
          });
        } else {
          // Update remaining seconds
          setRestTimer(prev => prev ? { ...prev, remainingSeconds: secsRemaining } : null);
          pipIsland.updateState({
            isResting: true,
            remainingSeconds: secsRemaining,
            totalSeconds: currentRest.totalSeconds,
            currentExercise: currentRest.currentExerciseName,
            nextExercise: currentRest.nextExerciseName,
            nextTarget: currentRest.nextExerciseTarget,
            nextMuscle: currentRest.nextMuscleGroup,
            workoutTitle: workoutName || 'Workout',
          });
          updateLockScreenMediaSession({
            workoutName: workoutName || 'Workout',
            currentExercise: currentRest.currentExerciseName,
            nextExercise: currentRest.nextExerciseName,
            remainingRestSeconds: secsRemaining,
            isResting: true,
          });
        }
      } else {
        pipIsland.updateState({
          isResting: false,
          workoutTitle: workoutName || 'Workout',
        });
      }
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, workoutName]);

  // Start a new workout
  const startWorkout = useCallback((
    name: string,
    initialExercises: (WorkoutExercise & { restSeconds?: number })[],
    dayIdx?: number
  ) => {
    setIsActive(true);
    setWorkoutName(name);
    setPlanDayIndex(dayIdx);
    setExercises(initialExercises);
    setElapsedSeconds(0);
    setRestTimer(null);
    promptNotifications();
    soundSynth.playWorkoutStarted();

    const firstExercise = initialExercises[0]?.name || 'Warm-up';
    updateLockScreenMediaSession({
      workoutName: name,
      currentExercise: firstExercise,
      isResting: false,
    });
  }, [promptNotifications]);

  // Update a specific set's reps or weight
  const updateSet = useCallback((exId: string, setIdx: number, field: keyof WorkoutSet, val: any) => {
    setExercises(prev =>
      prev.map(ex => {
        if (ex.id !== exId) return ex;
        const newSets = [...ex.sets];
        newSets[setIdx] = { ...newSets[setIdx], [field]: val };
        return { ...ex, sets: newSets };
      })
    );
  }, []);

  // Add set to exercise
  const addSet = useCallback((exId: string) => {
    soundSynth.playTap();
    setExercises(prev =>
      prev.map(ex => {
        if (ex.id !== exId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: WorkoutSet = {
          id: Math.random().toString(36).slice(2, 10),
          reps: lastSet ? lastSet.reps : 10,
          weightKg: lastSet ? lastSet.weightKg : 20,
          completed: false,
        };
        return { ...ex, sets: [...ex.sets, newSet] };
      })
    );
  }, []);

  // Add exercise to workout
  const addExercise = useCallback((exercise: WorkoutExercise & { restSeconds?: number }) => {
    soundSynth.playTap();
    setExercises(prev => [...prev, exercise]);
  }, []);

  // Delete exercise
  const deleteExercise = useCallback((exId: string) => {
    setExercises(prev => prev.filter(e => e.id !== exId));
  }, []);

  // Complete a set and auto-trigger Dynamic Island rest timer + next exercise detection
  const completeSet = useCallback((exId: string, setIdx: number, completed: boolean, restSecs = 90) => {
    let currentExName = '';
    let nextExName = '';
    let nextTarget = '';
    let nextMuscle = '';
    let totalSetsInCurrentEx = 1;

    setExercises(prev => {
      const updated = prev.map(ex => {
        if (ex.id !== exId) return ex;
        const newSets = [...ex.sets];
        newSets[setIdx] = { ...newSets[setIdx], completed };
        return { ...ex, sets: newSets };
      });

      // Find current and next exercise
      const currentExIndex = updated.findIndex(e => e.id === exId);
      if (currentExIndex !== -1) {
        const currentEx = updated[currentExIndex];
        currentExName = currentEx.name;
        totalSetsInCurrentEx = currentEx.sets.length;

        // Check if there are more sets in this exercise
        const hasMoreSets = setIdx < currentEx.sets.length - 1;
        if (hasMoreSets) {
          const nextSet = currentEx.sets[setIdx + 1];
          nextExName = currentEx.name;
          nextTarget = `Set ${setIdx + 2} of ${totalSetsInCurrentEx} • ${nextSet.reps} reps @ ${nextSet.weightKg}kg`;
          nextMuscle = currentEx.muscleGroup;
        } else {
          // Look for next exercise in routine
          const nextEx = updated[currentExIndex + 1];
          if (nextEx) {
            const firstSet = nextEx.sets[0];
            nextExName = nextEx.name;
            nextTarget = `${nextEx.sets.length} sets • ${firstSet ? `${firstSet.reps} reps @ ${firstSet.weightKg}kg` : ''}`;
            nextMuscle = nextEx.muscleGroup;
          } else {
            nextExName = 'Final Set Complete!';
            nextTarget = 'You finished all planned exercises';
            nextMuscle = 'Cooldown';
          }
        }
      }
      return updated;
    });

    if (completed) {
      soundSynth.playSetCompleted();
      const now = Date.now();
      const duration = restSecs || 90;
      setRestTimer({
        active: true,
        totalSeconds: duration,
        remainingSeconds: duration,
        endTimestamp: now + duration * 1000,
        currentExerciseName: currentExName,
        currentSetIndex: setIdx + 1,
        totalSetsInExercise: totalSetsInCurrentEx,
        nextExerciseName: nextExName,
        nextExerciseTarget: nextTarget,
        nextMuscleGroup: nextMuscle,
      });

      // Haptic bump
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(60);
      }
    } else {
      // If unchecked, cancel rest timer if it matches this set
      setRestTimer(null);
    }
  }, []);

  // Skip rest early
  const skipRest = useCallback(() => {
    setRestTimer(null);
    updateLockScreenMediaSession({
      workoutName: workoutName || 'Workout',
      currentExercise: exercises[0]?.name || 'Exercise',
      isResting: false,
    });
  }, [workoutName, exercises]);

  // Add more time (+30s or +60s)
  const addRestSeconds = useCallback((delta: number) => {
    setRestTimer(prev => {
      if (!prev) return null;
      const newTotal = prev.totalSeconds + delta;
      const newEnd = prev.endTimestamp + delta * 1000;
      const newRemaining = Math.max(0, Math.ceil((newEnd - Date.now()) / 1000));
      return {
        ...prev,
        totalSeconds: newTotal,
        endTimestamp: newEnd,
        remainingSeconds: newRemaining,
      };
    });
  }, []);

  // Finish Workout
  const finishWorkout = useCallback((): Workout | null => {
    if (!exercises.length) return null;

    let totalVolume = 0;
    exercises.forEach(ex => {
      ex.sets.forEach(st => {
        if (st.completed) {
          totalVolume += (st.weightKg || 0) * (st.reps || 0);
        }
      });
    });

    const completedSets = exercises.reduce(
      (acc, ex) => acc + ex.sets.filter(s => s.completed).length,
      0
    );
    const pointsEarned = 50 + completedSets * 5 + Math.round(totalVolume * 0.01);

    const savedWorkout: Workout = {
      id: Math.random().toString(36).slice(2, 10),
      name: workoutName || 'Workout Routine',
      date: new Date().toISOString(),
      durationSeconds: elapsedSeconds,
      exercises,
      totalVolumeKg: totalVolume,
      pointsEarned,
      planDayIndex,
    };

    dispatch({ type: 'ADD_WORKOUT', payload: savedWorkout });
    dispatch({ type: 'ADD_POINTS', payload: pointsEarned });

    // Reset session
    setIsActive(false);
    setExercises([]);
    setElapsedSeconds(0);
    setRestTimer(null);
    updateLockScreenMediaSession(null);
    pipIsland.closePiP().catch(() => {});

    soundSynth.playWorkoutCompleted();
    return savedWorkout;
  }, [exercises, workoutName, elapsedSeconds, planDayIndex, dispatch]);

  // Cancel Workout
  const cancelWorkout = useCallback(() => {
    setIsActive(false);
    setExercises([]);
    setElapsedSeconds(0);
    setRestTimer(null);
    updateLockScreenMediaSession(null);
    pipIsland.closePiP().catch(() => {});
  }, []);

  // Register Lock Screen MediaSession action buttons (+30s / Skip)
  useEffect(() => {
    setMediaSessionCallbacks({
      onAddRest: addRestSeconds,
      onSkipRest: skipRest,
    });
  }, [addRestSeconds, skipRest]);

  // Toggle Picture-in-Picture Mini Island HUD
  const togglePiPIsland = useCallback(async () => {
    const curRest = restTimerRef.current;
    return await pipIsland.togglePiP({
      isResting: !!(curRest && curRest.active),
      remainingSeconds: curRest?.remainingSeconds || 0,
      totalSeconds: curRest?.totalSeconds || 90,
      currentExercise: curRest?.currentExerciseName || exercises[0]?.name || 'Workout',
      nextExercise: curRest?.nextExerciseName || 'Next Set',
      nextTarget: curRest?.nextExerciseTarget || '',
      nextMuscle: curRest?.nextMuscleGroup || '',
      workoutTitle: workoutName || 'Workout Routine',
      elapsedSeconds,
    });
  }, [workoutName, exercises, elapsedSeconds]);

  return (
    <WorkoutSessionContext.Provider
      value={{
        isActive,
        workoutName,
        exercises,
        elapsedSeconds,
        restTimer,
        startWorkout,
        updateSet,
        completeSet,
        addSet,
        addExercise,
        deleteExercise,
        skipRest,
        addRestSeconds,
        finishWorkout,
        cancelWorkout,
        togglePiPIsland,
        isPiPSupported: pipIsland.isSupported(),
      }}
    >
      {children}
    </WorkoutSessionContext.Provider>
  );
}

export function useWorkoutSession() {
  const ctx = useContext(WorkoutSessionContext);
  if (!ctx) {
    throw new Error('useWorkoutSession must be used within a WorkoutSessionProvider');
  }
  return ctx;
}
