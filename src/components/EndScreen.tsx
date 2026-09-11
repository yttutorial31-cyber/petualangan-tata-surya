import React, { useEffect, useState } from 'react';
import { Star, RotateCcw, Award, CheckCircle2, XCircle, Clock, BookOpen, ChevronDown, ChevronUp, Share2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { PlayerAnswerLog, Question } from '../types';

interface EndScreenProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  livesRemaining: number;
  answerLogs: PlayerAnswerLog[];
  allQuestions: Question[];
  onRestart: () => void;
  onOpenEncyclopedia: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  score,
  highScore,
  isNewHighScore,
  livesRemaining,
  answerLogs,
  allQuestions,
  onRestart,
  onOpenEncyclopedia,
}) => {
  const [showReview, setShowReview] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const correctCount = answerLogs.filter((log) => log.isCorrect).length;
  const totalQuestions = allQuestions.length;
  const isMissionSuccess = livesRemaining > 0 && answerLogs.length === totalQuestions;

  // Star Rating calculation:
  // 3 Stars: 9-10 correct answers (or score >= 1200)
  // 2 Stars: 6-8 correct answers (or score >= 700)
  // 1 Star: 3-5 correct answers
  // 0 Stars: < 3 correct answers or eliminated very early
  let stars = 0;
  let rankTitle = 'Calon Astronot 🚀';
  let badgeColor = 'text-slate-300';

  if (correctCount >= 9) {
    stars = 3;
    rankTitle = 'Komandan Tata Surya Agung! 🏆';
    badgeColor = 'text-amber-400';
  } else if (correctCount >= 6) {
    stars = 2;
    rankTitle = 'Penjelajah Galaksi Hebat! 🌟';
    badgeColor = 'text-amber-300';
  } else if (correctCount >= 3) {
    stars = 1;
    rankTitle = 'Astronot Muda Berbakat! ⭐';
    badgeColor = 'text-amber-200';
  } else {
    stars = 0;
    rankTitle = 'Pelatihan Ulang Astronot 🪐';
    badgeColor = 'text-slate-400';
  }

  // Trigger celebration confetti
  useEffect(() => {
    if (stars >= 2 || isMissionSuccess) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#fbbf24'],
        });
      } catch {
        // ignore if iframe blocks
      }
    }
  }, [stars, isMissionSuccess]);

  const handleShare = () => {
    const text = `🚀 Saya baru saja menyelesaikan Game Petualangan Tata Surya (IPA SD Kelas 6)!\n⭐ Bintang: ${stars}/3\n🏆 Skor: ${score} Poin\n🎯 Benar: ${correctCount}/${totalQuestions} Soal!\nAyo uji pengetahuan Tata Surya kalian juga!`;
    navigator.clipboard?.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center px-4 py-6">
      <motion.div
        id="end-screen-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full bg-slate-900/90 border-2 border-indigo-400/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Top Glow Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400" />

        {/* Header Title */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-indigo-300 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 mb-2">
            {isMissionSuccess ? 'Misi Selesai dengan Gemilang!' : 'Misi Antariksa Terhenti'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {isMissionSuccess ? 'Laporan Hasil Penjelajahan 🚀' : 'Jangan Patah Semangat! 🛡️'}
          </h2>
          <p className={`text-base sm:text-lg font-black mt-1 ${badgeColor}`}>
            {rankTitle}
          </p>
        </div>

        {/* 3 Stars Visual Display */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-4">
          {[1, 2, 3].map((starIndex) => {
            const isEarned = starIndex <= stars;
            return (
              <motion.div
                key={starIndex}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15 * starIndex, type: 'spring', stiffness: 260 }}
                className="relative"
              >
                <Star
                  className={`w-14 h-14 sm:w-16 sm:h-16 transition-all duration-500 ${
                    isEarned
                      ? 'fill-amber-400 text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.9)] animate-pulse'
                      : 'fill-slate-800 text-slate-700'
                  }`}
                />
                {isEarned && (
                  <Sparkles className="w-4 h-4 text-white absolute -top-1 -right-1 animate-spin" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Total Score Box */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-pink-500/20 border border-amber-400/30 flex flex-col items-center">
          <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
            Total Skor Akhir
          </span>
          <span className="text-3xl sm:text-5xl font-black text-amber-300 tracking-tight my-1">
            {score.toLocaleString('id-ID')}
          </span>

          {isNewHighScore && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md mt-1 animate-bounce">
              <Award className="w-3.5 h-3.5" />
              REKOR SKOR TERTINGGI BARU!
            </span>
          )}
          {!isNewHighScore && highScore > 0 && (
            <span className="text-xs text-amber-200/70 font-semibold mt-1">
              Rekor Terbaik Kamu: {highScore.toLocaleString('id-ID')} Poin
            </span>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-left">
          <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Jawaban Benar</span>
              <strong className="text-sm font-black text-emerald-300">
                {correctCount} / {totalQuestions} Soal
              </strong>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-rose-500/30 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Jawaban Salah</span>
              <strong className="text-sm font-black text-rose-300">
                {answerLogs.length - correctCount} Soal
              </strong>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/70 border border-cyan-500/30 col-span-2 sm:col-span-1 flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Tingkat Akurasi</span>
              <strong className="text-sm font-black text-cyan-300">
                {answerLogs.length > 0 ? Math.round((correctCount / answerLogs.length) * 100) : 0}%
              </strong>
            </div>
          </div>
        </div>

        {/* Action Buttons: Main Lagi & Ensiklopedia */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <motion.button
            id="restart-game-btn"
            onClick={onRestart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Petualangan Lagi</span>
          </motion.button>

          <button
            onClick={onOpenEncyclopedia}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-indigo-200 font-bold text-sm border border-indigo-400/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>Buku Planet</span>
          </button>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 font-bold text-sm border border-indigo-400/40 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>{copiedShare ? 'Tersalin!' : 'Salin Skor'}</span>
          </button>
        </div>

        {/* Toggle Answer Review Drawer */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <button
            id="toggle-review-button"
            onClick={() => setShowReview(!showReview)}
            className="text-xs sm:text-sm font-extrabold text-indigo-300 hover:text-white flex items-center justify-center gap-1.5 mx-auto py-1 cursor-pointer transition-colors"
          >
            <span>{showReview ? 'Sembunyikan Pembahasan Soal' : 'Lihat Ulasan & Pembahasan 10 Soal'}</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showReview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex flex-col gap-3 text-left max-h-80 overflow-y-auto pr-1"
            >
              {allQuestions.map((q, idx) => {
                const log = answerLogs.find((l) => l.questionId === q.id);
                const isAnswered = !!log;
                const isCorrect = log?.isCorrect;

                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-2xl border text-xs ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : isAnswered
                        ? 'bg-rose-950/30 border-rose-500/40'
                        : 'bg-slate-950/50 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="text-slate-300">
                        Soal {idx + 1}: {q.planetName} ({q.levelName})
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Benar (+{log?.pointsEarned} Poin)
                        </span>
                      ) : isAnswered ? (
                        <span className="text-rose-400 font-extrabold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Salah
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold">Belum Dijawab</span>
                      )}
                    </div>

                    <p className="text-white font-medium mb-1.5">{q.question}</p>

                    <div className="text-[11px] text-emerald-300 font-bold bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                      Jawaban Benar: {q.options[q.correctIndex]}
                    </div>
                    <p className="text-[11px] text-indigo-200 mt-1.5 font-medium">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
