export type Difficulty = 'mudah' | 'sedang' | 'sulit';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  level: number; // Level 1 (Mudah: Soal 1-3), Level 2 (Sedang: Soal 4-7), Level 3 (Sulit: Soal 8-10)
  levelName: string;
  planetName: string;
  planetBadgeColor: string;
  explanation: string;
  funFact: string;
}

export type GameStatus = 'idle' | 'playing' | 'feedback' | 'gameover' | 'completed';

export interface PlanetGuide {
  name: string;
  alias: string;
  order: number;
  type: 'Planet Terestrial (Dalam)' | 'Planet Raksasa Gas (Luar)' | 'Planet Raksasa Es (Luar)';
  color: string;
  iconBg: string;
  summary: string;
  features: string[];
  funFact: string;
}

export interface PlayerAnswerLog {
  questionId: number;
  questionText: string;
  chosenIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
}
