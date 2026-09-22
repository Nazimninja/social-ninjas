import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWorkoutSession } from '../../context/WorkoutSessionContext';
import {
  Timer,
  Dumbbell,
  ChevronRight,
  Plus,
  FastForward,
  Volume2,
  VolumeX,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function DynamicIsland() {
  const {
    isActive,
    workoutName,
    elapsedSeconds,
    restTimer,
    skipRest,
    addRestSeconds,
    togglePiPIsland,
    isPiPSupported,
  } = useWorkoutSession();

  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pipActive, setPipActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // If there's no active workout session, hide the island completely
  if (!isActive) return null;

  const isResting = !!(restTimer && restTimer.active);
  const remaining = isResting ? restTimer.remainingSeconds : 0;
  const totalRest = isResting ? restTimer.totalSeconds : 1;
  const restPercent = isResting ? Math.max(0, Math.min(100, (remaining / totalRest) * 100)) : 0;

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isWorkoutPage = location.pathname === '/app/workout';

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  const handleTogglePiP = async (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    const active = await togglePiPIsland();
    setPipActive(active);
  };

  return (
    <div className="fixed top-2.5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 480, damping: 34 }}
        onClick={() => {
          triggerHaptic();
          setIsExpanded(prev => !prev);
        }}
        className={`pointer-events-auto select-none bg-[#05070c]/95 text-white backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] cursor-pointer overflow-hidden relative border ${
          isExpanded
            ? 'w-full max-w-[370px] rounded-[32px] p-5 border-blue-500/35 ring-1 ring-blue-500/20'
            : 'rounded-full py-1.5 px-3.5 flex items-center justify-between gap-3 min-w-[200px] max-w-[260px] h-[40px] border-white/[0.14] hover:border-white/30 transition-colors'
        }`}
      >
        {/* Specular Top Edge Light (Apple Hardware Polish) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ── Compact Dynamic Island Pill ────────────────────────── */
            <motion.div
              key="compact"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex items-center justify-between w-full"
            >
              {/* Left Island Cutout: Icon & Mini Indicator */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-inner ${
                    isResting
                      ? 'bg-blue-500/25 text-blue-400 border border-blue-500/40'
                      : 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 animate-pulse'
                  }`}
                >
                  {isResting ? (
                    <Timer size={12} className="animate-spin-slow" />
                  ) : (
                    <Dumbbell size={12} />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-white/90 truncate max-w-[95px] tracking-tight">
                  {isResting ? 'Resting' : workoutName || 'Lifting'}
                </span>
              </div>

              {/* Right Island Cutout: Countdown or Elapsed */}
              <div className="flex items-center gap-2 pl-2">
                {isResting ? (
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-blue-400 tracking-tight">
                      {formatTime(remaining)}
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                  </div>
                ) : (
                  <span className="font-mono text-xs font-semibold text-white/70">
                    {formatTime(elapsedSeconds)}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            /* ── Expanded Dynamic Island Card ───────────────────────── */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border shadow-inner ${
                      isResting
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {isResting ? <Timer size={16} /> : <Dumbbell size={16} />}
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                      {isResting ? 'REST INTERVAL' : 'ACTIVE WORKOUT'}
                    </p>
                    <p className="text-xs font-bold text-white truncate max-w-[150px]">
                      {workoutName}
                    </p>
                  </div>
                </div>

                {/* Right controls: Float Mini-Island (PiP), Sound, Collapse */}
                <div className="flex items-center gap-1">
                  {isPiPSupported && (
                    <button
                      onClick={handleTogglePiP}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all border ${
                        pipActive
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30'
                          : 'bg-white/10 hover:bg-white/15 text-white/80 border-white/10'
                      }`}
                      title="Float Dynamic Island over Spotify, Instagram or Homescreen"
                    >
                      <Layers size={11} className={pipActive ? 'text-white' : 'text-blue-400'} />
                      <span>{pipActive ? 'Floating' : 'Float HUD'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      triggerHaptic();
                      setSoundEnabled(s => !s);
                    }}
                    className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    title={soundEnabled ? 'Mute chimes' : 'Unmute chimes'}
                  >
                    {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      triggerHaptic();
                      setIsExpanded(false);
                    }}
                    className="text-[11px] text-white/50 hover:text-white px-2 py-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Center Rest Countdown Ring & Stats */}
              {isResting ? (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 flex items-center gap-4 shadow-inner">
                  {/* Circular SVG Ring */}
                  <div className="relative w-16 h-16 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="3.2"
                      />
                      <motion.circle
                        cx="18"
                        cy="18"
                        r="15"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeDasharray={94.2}
                        animate={{ strokeDashoffset: 94.2 * (1 - restPercent / 100) }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[14px] font-mono font-bold text-white tracking-tight">
                        {remaining}
                      </span>
                      <span className="text-[7px] text-blue-300 uppercase tracking-widest font-black">
                        SEC
                      </span>
                    </div>
                  </div>

                  {/* Rest Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                      Finished Set {restTimer.currentSetIndex} of {restTimer.totalSetsInExercise}
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      {restTimer.currentExerciseName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-blue-400 font-bold">
                        Target: {restTimer.totalSeconds}s
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[10px] text-white/50">
                        {Math.round(restPercent)}% done
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/80 font-medium">Session Elapsed</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>
              )}

              {/* ── UP NEXT PREVIEW (Core Feature for All Phones) ───────────────────── */}
              {isResting && restTimer.nextExerciseName && (
                <div className="bg-gradient-to-r from-blue-950/40 via-blue-900/20 to-slate-900/60 border border-blue-500/30 rounded-2xl p-3.5 space-y-1.5 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
                      <Sparkles size={11} className="text-blue-300" /> UP NEXT
                    </span>
                    {restTimer.nextMuscleGroup && (
                      <span className="text-[9px] bg-blue-500/25 text-blue-200 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border border-blue-500/40 shadow-sm">
                        {restTimer.nextMuscleGroup}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-white truncate tracking-tight">
                    {restTimer.nextExerciseName}
                  </p>
                  <p className="text-xs text-white/70 font-medium">
                    {restTimer.nextExerciseTarget}
                  </p>
                </div>
              )}

              {/* Bottom Quick Controls */}
              <div className="flex items-center gap-2 pt-1">
                {isResting && (
                  <>
                    <button
                      onClick={() => {
                        triggerHaptic();
                        addRestSeconds(30);
                      }}
                      className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all border border-white/10 shadow-sm"
                    >
                      <Plus size={13} /> +30s
                    </button>
                    <button
                      onClick={() => {
                        triggerHaptic();
                        skipRest();
                      }}
                      className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-600/30"
                    >
                      <FastForward size={13} /> Skip Rest
                    </button>
                  </>
                )}

                {!isWorkoutPage && (
                  <button
                    onClick={() => {
                      triggerHaptic();
                      setIsExpanded(false);
                      navigate('/app/workout');
                    }}
                    className={`py-2 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors border border-white/10 ${
                      !isResting ? 'w-full' : ''
                    }`}
                  >
                    <span>Workout</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
