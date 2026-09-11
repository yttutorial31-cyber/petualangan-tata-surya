import React from 'react';
import { Rocket, Play, Heart, Clock, Award, BookOpen, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';
import { motion } from 'motion/react';

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
  onOpenEncyclopedia: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  highScore,
  onOpenEncyclopedia,
  isMuted,
  onToggleMute,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center px-4 py-6 sm:py-10">
      {/* Top audio & settings pill */}
      <div className="w-full flex justify-end mb-2">
        <button
          onClick={onToggleMute}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
            isMuted
              ? 'bg-slate-800/80 border-slate-700 text-slate-400'
              : 'bg-indigo-600/40 border-indigo-400/50 text-amber-300 hover:bg-indigo-600/60'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isMuted ? 'Suara Mati' : 'Efek Suara Aktif'}</span>
        </button>
      </div>

      {/* Hero Cartoon Spaceship Artwork */}
      <motion.div
        className="relative mb-6"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-[0_0_50px_rgba(168,85,247,0.5)] flex items-center justify-center relative">
          {/* Inner ring */}
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-950/60" />
            <Rocket className="w-20 h-20 sm:w-24 sm:h-24 text-amber-400 -rotate-45 fill-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
          </div>

          {/* Decorative floating mini stars */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shadow-lg animate-bounce text-xs">
            ⭐
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-cyan-400 text-slate-950 font-black flex items-center justify-center shadow-lg text-xs">
            🪐
          </div>
        </div>
      </motion.div>

      {/* Main Title Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 border border-amber-300/40 text-amber-300 font-extrabold text-xs sm:text-sm mb-3">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        Game Edukasi IPA SD Kelas 6
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wide uppercase drop-shadow-md leading-tight mb-2">
        Petualangan <br className="sm:hidden" />
        <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          Tata Surya
        </span>
      </h1>

      <p className="text-sm sm:text-base text-indigo-100 font-medium max-w-xl mb-6">
        Jelajahi keajaiban 8 planet, jawab 10 soal tantangan antariksa, pertahankan 3 nyawa hatimu, dan raih 3 Bintang Emas!
      </p>

      {/* High Score Pill (if present) */}
      {highScore > 0 && (
        <div className="mb-6 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-sm flex items-center gap-2 shadow-inner">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Skor Tertinggi Kamu: {highScore.toLocaleString('id-ID')} Poin</span>
        </div>
      )}

      {/* Rules / Game Features Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl mb-8 text-left">
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-rose-500/30 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Modal Awal</span>
            <strong className="text-xs sm:text-sm text-white font-extrabold">3 Nyawa Hati</strong>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Clock className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Misi</span>
            <strong className="text-xs sm:text-sm text-white font-extrabold">15 Detik / Soal</strong>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Tingkat Kesulitan</span>
            <strong className="text-xs sm:text-sm text-white font-extrabold">3 Level Orbit</strong>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/30 flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Award className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Hadiah Misi</span>
            <strong className="text-xs sm:text-sm text-white font-extrabold">3 Bintang Emas</strong>
          </div>
        </div>
      </div>

      {/* Big Start Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <motion.button
          id="start-game-button"
          onClick={onStart}
          whileHover={{ scale: 1.05, translateY: -3 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 font-black text-lg sm:text-xl shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center justify-center gap-3 cursor-pointer transition-all border-2 border-yellow-200"
        >
          <Play className="w-6 h-6 fill-slate-950" />
          <span>MULAI PETUALANGAN!</span>
        </motion.button>

        <button
          id="open-guide-button"
          onClick={onOpenEncyclopedia}
          className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-indigo-200 hover:text-white font-extrabold text-sm border border-indigo-400/30 flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer whitespace-nowrap shadow-md"
        >
          <BookOpen className="w-4 h-4 text-cyan-300" />
          <span>Buku Panduan Planet</span>
        </button>
      </div>

      {/* Target curriculum note */}
      <div className="mt-8 text-center text-xs text-indigo-200/70 font-semibold">
        Sesuai Kurikulum IPA SD: Sistem Tata Surya, Ciri-ciri Planet, & Gerak Orbit.
      </div>
    </div>
  );
};
