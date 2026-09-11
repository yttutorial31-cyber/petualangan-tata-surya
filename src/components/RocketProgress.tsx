import React from 'react';
import { Rocket, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Question } from '../types';

interface RocketProgressProps {
  questions: Question[];
  currentIndex: number;
}

export const RocketProgress: React.FC<RocketProgressProps> = ({
  questions,
  currentIndex,
}) => {
  return (
    <div id="rocket-progress-container" className="w-full max-w-4xl mx-auto px-2 py-3 bg-slate-900/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between text-xs font-bold text-indigo-200 mb-2 px-2">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse" />
          Rute Ekspedisi Tata Surya
        </span>
        <span className="text-amber-300 font-extrabold text-sm">
          Misi {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <div className="relative flex items-center justify-between px-2 pt-1 pb-1">
        {/* Connecting track line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentIndex / (questions.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Question Waypoint Nodes */}
        {questions.map((q, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div key={q.id} className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={isCurrent ? { scale: [1, 1.25, 1.1] } : { scale: 1 }}
                transition={isCurrent ? { repeat: Infinity, duration: 1.6 } : {}}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-md ${
                  isPassed
                    ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                    : isCurrent
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 ring-4 ring-amber-300/40 shadow-amber-500/70'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {isPassed ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 fill-slate-950 stroke-[2.5]" />
                ) : (
                  idx + 1
                )}
              </motion.div>

              {/* Floating Rocket Mascot at current station */}
              {isCurrent && (
                <motion.div
                  className="absolute -top-7 text-amber-300 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <Rocket className="w-6 h-6 rotate-45 fill-amber-400 text-rose-500" />
                </motion.div>
              )}

              {/* Stage labels for desktop / tablet */}
              <span className="hidden md:block text-[10px] font-bold mt-1 text-slate-300 truncate max-w-[58px] text-center">
                {q.planetName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
