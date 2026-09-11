import React, { useEffect } from 'react';
import { Globe, HelpCircle, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onSelectOption: (index: number) => void;
  disabled: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const OPTION_THEMES = [
  {
    bg: 'from-blue-500/20 to-indigo-600/20 hover:from-blue-500/30 hover:to-indigo-600/30 border-blue-400/40 text-blue-100',
    badge: 'bg-blue-500 text-white',
  },
  {
    bg: 'from-emerald-500/20 to-teal-600/20 hover:from-emerald-500/30 hover:to-teal-600/30 border-emerald-400/40 text-emerald-100',
    badge: 'bg-emerald-500 text-white',
  },
  {
    bg: 'from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border-amber-400/40 text-amber-100',
    badge: 'bg-amber-500 text-white',
  },
  {
    bg: 'from-purple-500/20 to-fuchsia-600/20 hover:from-purple-500/30 hover:to-fuchsia-600/30 border-purple-400/40 text-purple-100',
    badge: 'bg-purple-500 text-white',
  },
];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
  disabled,
}) => {
  // Add keyboard shortcuts (1, 2, 3, 4 or A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') onSelectOption(0);
      else if (key === 'B' || key === '2') onSelectOption(1);
      else if (key === 'C' || key === '3') onSelectOption(2);
      else if (key === 'D' || key === '4') onSelectOption(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, onSelectOption]);

  return (
    <motion.main
      id="quiz-question-card"
      key={question.id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border-2 border-indigo-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-indigo-950/60 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Decorative top orbit line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400" />

      {/* Header Info */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-black">
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            Tantangan {currentIndex + 1} dari {totalQuestions}
          </span>

          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-black shadow-sm ${question.planetBadgeColor}`}
          >
            <Globe className="w-3.5 h-3.5" />
            Topik: {question.planetName}
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>Pilihlah satu jawaban yang paling tepat</span>
        </div>
      </div>

      {/* Question Text Box */}
      <div className="bg-slate-950/70 border border-slate-700/60 rounded-2xl p-4 sm:p-6 shadow-inner">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white leading-snug sm:leading-relaxed tracking-wide text-center sm:text-left">
          {question.question}
        </h2>
      </div>

      {/* 4 Multiple Choice Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {question.options.map((option, idx) => {
          const theme = OPTION_THEMES[idx % OPTION_THEMES.length];
          const letter = OPTION_LETTERS[idx];

          return (
            <motion.button
              key={idx}
              id={`option-button-${idx}`}
              onClick={() => onSelectOption(idx)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
              whileTap={!disabled ? { scale: 0.97 } : {}}
              className={`group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 bg-gradient-to-r text-left transition-all duration-200 shadow-md ${
                theme.bg
              } ${
                disabled
                  ? 'opacity-60 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-lg hover:border-white/50'
              }`}
            >
              {/* Option Letter Badge */}
              <div
                className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-black text-base shadow-sm transition-transform group-hover:scale-110 ${theme.badge}`}
              >
                {letter}
              </div>

              {/* Option Text */}
              <span className="font-extrabold text-sm sm:text-base text-slate-100 group-hover:text-white leading-normal flex-1">
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Keyboard guide tip */}
      <p className="text-center text-xs text-slate-400 font-medium hidden sm:block">
        💡 Tips: Kamu juga bisa menekan tombol keyboard <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] border border-slate-700">A</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] border border-slate-700">B</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] border border-slate-700">C</kbd>, atau <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-mono text-[11px] border border-slate-700">D</kbd>!
      </p>
    </motion.main>
  );
};
