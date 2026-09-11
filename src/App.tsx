/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QUESTIONS_DATA } from './data/questions';
import { GameStatus, PlayerAnswerLog } from './types';
import { soundManager } from './utils/audio';
import { StarBackground } from './components/StarBackground';
import { GameHUD } from './components/GameHUD';
import { RocketProgress } from './components/RocketProgress';
import { QuestionCard } from './components/QuestionCard';
import { FeedbackModal } from './components/FeedbackModal';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { EncyclopediaModal } from './components/EncyclopediaModal';

const QUESTION_TIMER_SECONDS = 15;
const MAX_LIVES = 3;

export default function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIMER_SECONDS);
  const [highScore, setHighScore] = useState<number>(0);
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState<boolean>(false);

  // Feedback dialog states
  const [feedbackData, setFeedbackData] = useState<{
    isOpen: boolean;
    isCorrect: boolean;
    isTimeout: boolean;
    selectedOptionIndex: number | null;
    pointsEarned: number;
    timeBonus: number;
  }>({
    isOpen: false,
    isCorrect: false,
    isTimeout: false,
    selectedOptionIndex: null,
    pointsEarned: 0,
    timeBonus: 0,
  });

  // Answer tracking logs
  const [answerLogs, setAnswerLogs] = useState<PlayerAnswerLog[]>([]);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load High Score on initial mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('space_game_high_score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10) || 0);
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    const newMuted = soundManager.toggleMute();
    setIsMuted(newMuted);
  }, []);

  // Handle timeout (when time runs out on question)
  const handleTimeout = useCallback(() => {
    soundManager.playWrong();
    soundManager.playHeartLost();

    const currentQ = QUESTIONS_DATA[currentQuestionIndex];
    const newLives = lives - 1;
    setLives(newLives);
    setStreak(0);

    const log: PlayerAnswerLog = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      chosenIndex: -1,
      correctIndex: currentQ.correctIndex,
      isCorrect: false,
      timeSpent: QUESTION_TIMER_SECONDS,
      pointsEarned: 0,
    };
    setAnswerLogs((prev) => [...prev, log]);

    setFeedbackData({
      isOpen: true,
      isCorrect: false,
      isTimeout: true,
      selectedOptionIndex: null,
      pointsEarned: 0,
      timeBonus: 0,
    });
    setGameStatus('feedback');
  }, [currentQuestionIndex, lives]);

  // Main countdown timer effect
  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleTimeout();
            return 0;
          }
          if (prev <= 5) {
            soundManager.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStatus, handleTimeout]);

  // Start new game session
  const handleStartGame = () => {
    soundManager.playRocketLaunch();
    setCurrentQuestionIndex(0);
    setLives(MAX_LIVES);
    setScore(0);
    setStreak(0);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setAnswerLogs([]);
    setIsNewHighScore(false);
    setFeedbackData({
      isOpen: false,
      isCorrect: false,
      isTimeout: false,
      selectedOptionIndex: null,
      pointsEarned: 0,
      timeBonus: 0,
    });
    setGameStatus('playing');
  };

  // Option selection handler
  const handleSelectOption = (chosenIndex: number) => {
    if (gameStatus !== 'playing') return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const currentQ = QUESTIONS_DATA[currentQuestionIndex];
    const isCorrect = chosenIndex === currentQ.correctIndex;
    const timeSpent = QUESTION_TIMER_SECONDS - timeLeft;

    let pointsThisTurn = 0;
    let timeBonus = 0;

    if (isCorrect) {
      soundManager.playCorrect();
      timeBonus = timeLeft * 10;
      const streakMultiplierBonus = (streak + 1) * 20;
      pointsThisTurn = 100 + timeBonus + streakMultiplierBonus;

      const newScore = score + pointsThisTurn;
      setScore(newScore);
      setStreak((prev) => prev + 1);

      // Check high score
      if (newScore > highScore) {
        setHighScore(newScore);
        setIsNewHighScore(true);
        localStorage.setItem('space_game_high_score', newScore.toString());
      }
    } else {
      soundManager.playWrong();
      soundManager.playHeartLost();
      setLives((prev) => prev - 1);
      setStreak(0);
    }

    const log: PlayerAnswerLog = {
      questionId: currentQ.id,
      questionText: currentQ.question,
      chosenIndex,
      correctIndex: currentQ.correctIndex,
      isCorrect,
      timeSpent,
      pointsEarned: pointsThisTurn,
    };
    setAnswerLogs((prev) => [...prev, log]);

    setFeedbackData({
      isOpen: true,
      isCorrect,
      isTimeout: false,
      selectedOptionIndex: chosenIndex,
      pointsEarned: pointsThisTurn,
      timeBonus,
    });
    setGameStatus('feedback');
  };

  // Move from feedback modal to next question or end screen
  const handleProceedNext = () => {
    soundManager.playClick();
    setFeedbackData((prev) => ({ ...prev, isOpen: false }));

    // Check if player died (lives reached 0)
    if (lives <= 0) {
      soundManager.playGameOver();
      setGameStatus('gameover');
      return;
    }

    // Check if finished last question
    if (currentQuestionIndex + 1 >= QUESTIONS_DATA.length) {
      soundManager.playVictory();
      setGameStatus('completed');
      return;
    }

    // Advance to next question
    setCurrentQuestionIndex((prev) => prev + 1);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setGameStatus('playing');
  };

  const currentQuestion = QUESTIONS_DATA[currentQuestionIndex] || QUESTIONS_DATA[0];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between text-slate-100 relative font-sans antialiased">
      {/* Dynamic starfield background with twinkling stars */}
      <StarBackground />

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 flex flex-col justify-center items-center relative z-10">
        {gameStatus === 'idle' && (
          <StartScreen
            onStart={handleStartGame}
            highScore={highScore}
            onOpenEncyclopedia={() => setIsEncyclopediaOpen(true)}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {(gameStatus === 'playing' || gameStatus === 'feedback') && (
          <div className="w-full flex flex-col gap-4 sm:gap-5 my-auto">
            {/* Top HUD: Lives, Score, Level, 15s Timer, Sound toggle */}
            <GameHUD
              lives={lives}
              maxLives={MAX_LIVES}
              score={score}
              streak={streak}
              timeLeft={timeLeft}
              totalTime={QUESTION_TIMER_SECONDS}
              level={currentQuestion.level}
              levelName={currentQuestion.levelName}
              difficulty={currentQuestion.difficulty}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onOpenEncyclopedia={() => setIsEncyclopediaOpen(true)}
            />

            {/* Interactive Rocket Route Progress Bar */}
            <RocketProgress
              questions={QUESTIONS_DATA}
              currentIndex={currentQuestionIndex}
            />

            {/* Current Question Multiple Choice Card */}
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              totalQuestions={QUESTIONS_DATA.length}
              onSelectOption={handleSelectOption}
              disabled={gameStatus === 'feedback'}
            />
          </div>
        )}

        {(gameStatus === 'gameover' || gameStatus === 'completed') && (
          <EndScreen
            score={score}
            highScore={highScore}
            isNewHighScore={isNewHighScore}
            livesRemaining={lives}
            answerLogs={answerLogs}
            allQuestions={QUESTIONS_DATA}
            onRestart={handleStartGame}
            onOpenEncyclopedia={() => setIsEncyclopediaOpen(true)}
          />
        )}
      </div>

      {/* Immediate Educational Feedback Popup */}
      <FeedbackModal
        isOpen={feedbackData.isOpen}
        isCorrect={feedbackData.isCorrect}
        isTimeout={feedbackData.isTimeout}
        selectedOptionIndex={feedbackData.selectedOptionIndex}
        question={currentQuestion}
        pointsEarned={feedbackData.pointsEarned}
        timeBonus={feedbackData.timeBonus}
        streak={streak}
        livesRemaining={lives}
        isLastQuestion={currentQuestionIndex === QUESTIONS_DATA.length - 1}
        isGameOver={lives <= 0}
        onNext={handleProceedNext}
      />

      {/* Astronaut Guide Encyclopedia Modal */}
      <EncyclopediaModal
        isOpen={isEncyclopediaOpen}
        onClose={() => setIsEncyclopediaOpen(false)}
      />

      {/* Subtle footer */}
      <footer className="w-full py-2.5 text-center text-xs text-indigo-300/60 z-10">
        Petualangan Tata Surya • Game Edukasi IPA SD Kelas 6
      </footer>
    </div>
  );
}
