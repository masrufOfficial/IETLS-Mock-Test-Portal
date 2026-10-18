export interface Candidate {
  id: string; // e.g. BUBT-2026-1001
  name: string;
  email: string;
  mobile: string;
  university: string;
  address: string;
  targetBand?: number;
  registeredAt: string;
}

export interface ModuleScores {
  listening: {
    rawScore: number; // 0-40
    bandScore: number; // 0-9.0
    answers: Record<string, string>;
    completedAt: string;
  };
  reading: {
    rawScore: number; // 0-40
    bandScore: number; // 0-9.0
    answers: Record<string, string>;
    completedAt: string;
  };
  writing: {
    task1Response: string;
    task2Response: string;
    task1WordCount: number;
    task2WordCount: number;
    bandScore: number;
    task1Band?: number;
    task2Band?: number;
    feedback?: string;
    completedAt: string;
  };
  speaking: {
    mode: 'audio_record' | 'examiner_interview';
    recordings?: {
      part1AudioUrl?: string;
      part2AudioUrl?: string;
      part3AudioUrl?: string;
    };
    fcScore?: number; // Fluency & Coherence
    lrScore?: number; // Lexical Resource
    graScore?: number; // Grammatical Range
    prScore?: number; // Pronunciation
    bandScore: number;
    feedback?: string;
    completedAt: string;
  };
}

export interface TestAttempt {
  id: string;
  candidateId: string;
  testId: string;
  testTitle: string;
  testType: 'academic' | 'general';
  startedAt: string;
  completedAt?: string;
  scores: ModuleScores;
  overallBandScore: number;
  cefrLevel: string; // e.g. C2, C1, B2, B1
  status: 'in_progress' | 'completed' | 'evaluated' | 'pending';
}

export interface QuestionItem {
  id: string;
  questionNumber: number;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ReadingPassage {
  id?: string;
  passageNumber: number;
  title: string;
  introduction?: string;
  content: string;
  questions: QuestionItem[];
}

export interface WritingTasks {
  task1: {
    title: string;
    instructions: string;
    prompt?: string;
    chartDescription?: string;
    chartType?: string;
    minimumWords: number;
    timeMinutes: number;
  };
  task2: {
    title: string;
    topic?: string;
    prompt?: string;
    instructions: string;
    minimumWords: number;
    timeMinutes: number;
  };
}

export interface SpeakingSections {
  part1: {
    title: string;
    description: string;
    questions: string[];
  };
  part2: {
    title: string;
    prepTimeSeconds: number;
    speakingTimeSeconds: number;
    cueCard: {
      topic: string;
      bulletPoints: string[];
    };
  };
  part3: {
    title: string;
    description: string;
    questions: string[];
  };
}

export interface MockTest {
  id: string;
  title: string;
  badge: string;
  duration: string;
  sectionsCount: number;
  type: 'academic' | 'general';
  description: string;
  createdAt?: string;
  // Full question bank for tests:
  listeningQuestions?: QuestionItem[];
  listeningAudioScripts?: Record<number, string>;
  readingPassages?: ReadingPassage[];
  writingTasks?: WritingTasks;
  speakingSections?: SpeakingSections;
}
