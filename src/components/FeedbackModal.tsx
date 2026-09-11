import React from 'react';
import { CheckCircle2, XCircle, Clock, Sparkles, ArrowRight, Lightbulb, Heart, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { Question } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  isTimeout: boolean;
  selectedOptionIndex: number | null;
  question: Question;
  pointsEarned: number;
  timeBonus: number;
  streak: number;
  livesRemaining: number;
  isLastQuestion: boolean;
  isGameOver: boolean;
  onNext: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  isTimeout,
  selectedOptionIndex,
  question,
  pointsEarned,
  timeBonus,
  streak,
  livesRemaining,
  isLastQuestion,
  isGameOver,
  onNext,
}) => {
  if (!isOpen) return null;

  const correctOptionText = question.options[question.correctIndex];
  const selectedOptionText = selectedOptionIndex !== null ? question.options[selectedOptionIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <motion.div
        id="feedback-dialog"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        className="w-full max-w-lg bg-slate-900 border-2 rounded-3xl overflow-hidden shadow-2xl relative"
        style={{
          borderColor: isCorrect ? '#10b981' : isTimeout ? '#f59e0b' : '#ef4444',
          boxShadow: isCorrect
            ? '0 0 40px rgba(16, 185, 129, 0.3)'
            : isTimeout
            ? '0 0 40px rgba(245, 158, 11, 0.3)'
            : '0 0 40px rgba(239, 68, 68, 0.3)',
        }}
      >
        {/* Banner header */}
        <div
          className={`p-5 text-center flex flex-col items-center justify-center gap-2 ${
            isCorrect
              ? 'bg-gradient-to-b from-emerald-600 to-emerald-800 text-white'
              : isTimeout
              ? 'bg-gradient-to-b from-amber-600 to-amber-800 text-white'
              : 'bg-gradient-to-b from-rose-600 to-rose-800 text-white'
          }`}
        >
          <motion.div
            animate={{ rotate: isCorrect ? [0, -10, 10, 0] : [0, -5, 5, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg"
          >
            {isCorrect ? (
              <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
            ) : isTimeout ? (
              <Clock className="w-10 h-10 text-white stroke-[2.5]" />
            ) : (
              <XCircle className="w-10 h-10 text-white stroke-[2.5]" />
            )}
          </motion.div>

          <h3 className="text-2xl font-black tracking-wide">
            {isCorrect
              ? 'Luar Biasa, Jawabanmu Benar! 🌟'
              : isTimeout
              ? 'Waktu Habis! ⏱️'
              : 'Ups, Masih Kurang Tepat! 🚀'}
          </h3>

          {/* Points badge or Lives remaining */}
          {isCorrect ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-emerald-950/60 border border-emerald-300/40 text-emerald-200 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                +{pointsEarned} Poin (Termasuk Bonus Cepat +{timeBonus})
              </span>
              {streak > 1 && (
                <span className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-full text-xs animate-bounce">
                  Combo x{streak}!
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-1 bg-black/40 px-3 py-1 rounded-full text-xs font-bold text-rose-200 border border-rose-400/30">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
              <span>
                {livesRemaining > 0
                  ? `Sisa Nyawa: ${livesRemaining} Hati`
                  : 'Nyawa Habis! Misi Berakhir'}
              </span>
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 text-slate-200 max-h-[60vh] overflow-y-auto">
          {/* If wrong or timeout, display what is the correct answer */}
          {!isCorrect && (
            <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
              {selectedOptionText && !isTimeout && (
                <div className="text-xs text-rose-300 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  Jawaban kamu: <span className="text-slate-300 font-bold">{selectedOptionText}</span> (Salah)
                </div>
              )}
              <div className="text-sm font-extrabold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Jawaban yang benar: <span className="underline decoration-emerald-400 underline-offset-2">{correctOptionText}</span>
                </span>
              </div>
            </div>
          )}

          {/* Explanation from Curriculum */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col gap-1.5">
            <span className="text-xs font-extrabold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Penjelasan Materi:
            </span>
            <p className="text-sm font-medium text-slate-100 leading-relaxed">
              {question.explanation}
            </p>
          </div>

          {/* Fun Fact / Tahukah Kamu */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-2.5">
            <span className="text-lg">🪐</span>
            <div className="text-xs text-amber-200/90 leading-normal">
              <strong className="text-amber-300 font-bold block mb-0.5">Tahukah Kamu?</strong>
              {question.funFact}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex justify-end">
          <button
            id="feedback-next-button"
            onClick={onNext}
            className={`w-full py-3.5 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
              isGameOver
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:opacity-95'
                : 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 hover:brightness-110'
            }`}
          >
            {isGameOver ? (
              <>
                <RotateCcw className="w-5 h-5" />
                <span>Lihat Hasil Misi (Game Over)</span>
              </>
            ) : isLastQuestion ? (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Selesaikan Misi & Lihat Skor Akhir!</span>
              </>
            ) : (
              <>
                <span>Lanjut ke Soal Berikutnya</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
