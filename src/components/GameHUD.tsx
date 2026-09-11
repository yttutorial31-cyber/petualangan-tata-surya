import React from 'react';
import { Heart, Volume2, VolumeX, BookOpen, Flame, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Difficulty } from '../types';

interface GameHUDProps {
  lives: number;
  maxLives: number;
  score: number;
  streak: number;
  timeLeft: number;
  totalTime: number;
  level: number;
  levelName: string;
  difficulty: Difficulty;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenEncyclopedia: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  lives,
  maxLives,
  score,
  streak,
  timeLeft,
  totalTime,
  level,
  levelName,
  difficulty,
  isMuted,
  onToggleMute,
  onOpenEncyclopedia,
}) => {
  // Timer calculations
  const timerPercentage = Math.max(0, (timeLeft / totalTime) * 100);
  const isUrgent = timeLeft <= 5;

  const difficultyBadge = {
    mudah: { bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', text: 'Tingkat Mudah' },
    sedang: { bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', text: 'Tingkat Sedang' },
    sulit: { bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', text: 'Tingkat Menantang' },
  }[difficulty];

  return (
    <header id="game-hud" className="w-full max-w-4xl mx-auto flex flex-col gap-3">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {/* Lives Counter (3 Hati) */}
        <div
          id="hud-lives-container"
          className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-rose-500/30 backdrop-blur-md shadow-md"
        >
          <span className="text-xs font-bold text-rose-200 mr-1 hidden sm:inline">Nyawa:</span>
          {Array.from({ length: maxLives }).map((_, idx) => {
            const hasLife = idx < lives;
            return (
              <motion.div
                key={idx}
                animate={hasLife ? { scale: [1, 1.15, 1] } : { scale: 0.9 }}
                transition={{ repeat: hasLife ? Infinity : 0, duration: 2, delay: idx * 0.3 }}
              >
                <Heart
                  className={`w-6 h-6 transition-all duration-300 ${
                    hasLife
                      ? 'fill-rose-500 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                      : 'fill-slate-700 text-slate-600 opacity-40'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Level and Difficulty Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-400/30 text-indigo-200 text-xs font-extrabold shadow-sm">
            <Shield className="w-4 h-4 text-cyan-300" />
            <span className="hidden sm:inline">{levelName}</span>
            <span className="sm:hidden">Lvl {level}</span>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${difficultyBadge.bg}`}
          >
            {difficultyBadge.text}
          </span>
        </div>

        {/* Action buttons (Mute & Encyclopedia) */}
        <div className="flex items-center gap-2">
          <button
            id="hud-encyclopedia-btn"
            onClick={onOpenEncyclopedia}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-bold transition-transform active:scale-95 shadow-sm cursor-pointer"
            title="Buka Buku Panduan Planet"
          >
            <BookOpen className="w-4 h-4 text-sky-300" />
            <span className="hidden md:inline">Buku Planet</span>
          </button>

          <button
            id="hud-mute-btn"
            onClick={onToggleMute}
            className={`p-2 rounded-full border transition-transform active:scale-90 cursor-pointer ${
              isMuted
                ? 'bg-slate-800 border-slate-700 text-slate-400'
                : 'bg-indigo-600/40 border-indigo-400/40 text-amber-300 hover:bg-indigo-600/60'
            }`}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Middle Status Row: Score & Timer Display */}
      <div className="grid grid-cols-2 gap-3 items-center">
        {/* Score & Combo Widget */}
        <div
          id="hud-score-display"
          className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-400/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
              <Zap className="w-5 h-5 fill-amber-400 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
                Total Skor
              </span>
              <span className="text-xl font-black text-amber-300 tracking-wide">
                {score.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {streak > 1 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="flex items-center gap-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg shadow-rose-500/30"
              >
                <Flame className="w-3.5 h-3.5 fill-white text-rose-200 animate-bounce" />
                <span>Combo x{streak}!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 15-Second Countdown Timer Bar */}
        <div
          id="hud-timer-container"
          className={`flex flex-col justify-center px-4 py-2 rounded-2xl border backdrop-blur-md transition-all ${
            isUrgent
              ? 'bg-rose-950/40 border-rose-500/50 ring-2 ring-rose-500/30'
              : 'bg-slate-900/70 border-cyan-400/30'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1 font-bold">
            <span className={isUrgent ? 'text-rose-300 animate-pulse flex items-center gap-1' : 'text-cyan-200'}>
              ⏱️ Waktu Menjawab
            </span>
            <span
              className={`font-black text-sm font-mono ${
                isUrgent ? 'text-rose-400 animate-pulse text-base' : 'text-cyan-300'
              }`}
            >
              {timeLeft}s
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              className={`h-full rounded-full transition-all duration-300 ${
                timeLeft > 8
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                  : timeLeft > 4
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                  : 'bg-gradient-to-r from-rose-500 to-red-600 animate-pulse'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
