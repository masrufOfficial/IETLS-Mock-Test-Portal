'use client';

import { Candidate, TestAttempt, MockTest } from '@/types';
import { INITIAL_CANDIDATES, INITIAL_TEST_ATTEMPTS, INITIAL_MOCK_TESTS } from './mock-data';
import { calculateOverallBand, bandToCEFR } from './ielts-calculator';

const CANDIDATES_KEY = 'bubt_ielts_candidates';
const ATTEMPTS_KEY = 'bubt_ielts_attempts';
const CURRENT_CANDIDATE_KEY = 'bubt_ielts_current_candidate';
const MOCK_TESTS_KEY = 'bubt_ielts_mock_tests';

export function getCandidates(): Candidate[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CANDIDATES_KEY);
  if (!stored) {
    localStorage.setItem(CANDIDATES_KEY, JSON.stringify(INITIAL_CANDIDATES));
    return INITIAL_CANDIDATES;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveCandidate(candidate: Candidate): void {
  if (typeof window === 'undefined') return;
  const candidates = getCandidates();
  const existingIdx = candidates.findIndex((c) => c.id === candidate.id);
  if (existingIdx >= 0) {
    candidates[existingIdx] = candidate;
  } else {
    candidates.unshift(candidate);
  }
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates));
  setCurrentCandidate(candidate);
}

export function deleteCandidate(candidateId: string): void {
  if (typeof window === 'undefined') return;
  const candidates = getCandidates().filter((c) => c.id !== candidateId);
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(candidates));
  const attempts = getTestAttempts().filter((a) => a.candidateId !== candidateId);
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getTestAttempts(): TestAttempt[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(ATTEMPTS_KEY);
  if (!stored) {
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(INITIAL_TEST_ATTEMPTS));
    return INITIAL_TEST_ATTEMPTS;
  }
  try {
    const attempts: TestAttempt[] = JSON.parse(stored);
    // Enrich matching initial sample attempts with recordings if missing
    INITIAL_TEST_ATTEMPTS.forEach((initAttempt) => {
      const match = attempts.find((a) => a.id === initAttempt.id);
      if (match && (!match.scores?.speaking?.recordings || !match.scores.speaking.recordings.part1AudioUrl)) {
        if (!match.scores) match.scores = initAttempt.scores;
        if (!match.scores.speaking) match.scores.speaking = initAttempt.scores.speaking;
        match.scores.speaking.recordings = initAttempt.scores.speaking.recordings;
      }
    });
    return attempts;
  } catch {
    return INITIAL_TEST_ATTEMPTS;
  }
}

export function saveTestAttempt(attempt: TestAttempt): void {
  if (typeof window === 'undefined') return;
  const attempts = getTestAttempts();
  const existingIdx = attempts.findIndex((a) => a.id === attempt.id);
  if (existingIdx >= 0) {
    attempts[existingIdx] = attempt;
  } else {
    attempts.unshift(attempt);
  }
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getCurrentCandidate(): Candidate | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CURRENT_CANDIDATE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearAllDatabase(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify([]));
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify([]));
  localStorage.removeItem(CURRENT_CANDIDATE_KEY);
}

export function loadSampleDemoData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CANDIDATES_KEY, JSON.stringify(INITIAL_CANDIDATES));
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(INITIAL_TEST_ATTEMPTS));
  localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(INITIAL_MOCK_TESTS));
  if (INITIAL_CANDIDATES.length > 0) {
    localStorage.setItem(CURRENT_CANDIDATE_KEY, JSON.stringify(INITIAL_CANDIDATES[0]));
  }
}

export function setCurrentCandidate(candidate: Candidate | null): void {
  if (typeof window === 'undefined') return;
  if (!candidate) {
    localStorage.removeItem(CURRENT_CANDIDATE_KEY);
  } else {
    localStorage.setItem(CURRENT_CANDIDATE_KEY, JSON.stringify(candidate));
  }
}

export function updateAttemptEvaluation(
  attemptId: string,
  updates: {
    writingBand?: number;
    writingFeedback?: string;
    speakingBand?: number;
    speakingFeedback?: string;
    fcScore?: number;
    lrScore?: number;
    graScore?: number;
    prScore?: number;
  }
): TestAttempt | null {
  const attempts = getTestAttempts();
  const target = attempts.find((a) => a.id === attemptId);
  if (!target) return null;

  if (updates.writingBand !== undefined) {
    target.scores.writing.bandScore = updates.writingBand;
  }
  if (updates.writingFeedback !== undefined) {
    target.scores.writing.feedback = updates.writingFeedback;
  }

  if (updates.speakingBand !== undefined) {
    target.scores.speaking.bandScore = updates.speakingBand;
  }
  if (updates.speakingFeedback !== undefined) {
    target.scores.speaking.feedback = updates.speakingFeedback;
  }
  if (updates.fcScore !== undefined) target.scores.speaking.fcScore = updates.fcScore;
  if (updates.lrScore !== undefined) target.scores.speaking.lrScore = updates.lrScore;
  if (updates.graScore !== undefined) target.scores.speaking.graScore = updates.graScore;
  if (updates.prScore !== undefined) target.scores.speaking.prScore = updates.prScore;

  // Recalculate overall band using official IELTS rounding
  target.overallBandScore = calculateOverallBand(
    target.scores.listening.bandScore,
    target.scores.reading.bandScore,
    target.scores.writing.bandScore,
    target.scores.speaking.bandScore
  );
  target.cefrLevel = bandToCEFR(target.overallBandScore);
  target.status = 'evaluated';

  saveTestAttempt(target);
  return target;
}

export function getMockTests(): MockTest[] {
  if (typeof window === 'undefined') return INITIAL_MOCK_TESTS;
  const stored = localStorage.getItem(MOCK_TESTS_KEY);
  if (!stored) {
    localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(INITIAL_MOCK_TESTS));
    return INITIAL_MOCK_TESTS;
  }
  try {
    const parsed: MockTest[] = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      parsed.forEach((t) => {
        if (!t.listeningQuestions || t.listeningQuestions.length === 0) {
          t.listeningQuestions = INITIAL_MOCK_TESTS[0]?.listeningQuestions;
        }
        if (!t.readingPassages || t.readingPassages.length === 0) {
          t.readingPassages = INITIAL_MOCK_TESTS[0]?.readingPassages;
        }
        if (!t.writingTasks) {
          t.writingTasks = INITIAL_MOCK_TESTS[0]?.writingTasks;
        }
        if (!t.speakingSections) {
          t.speakingSections = INITIAL_MOCK_TESTS[0]?.speakingSections;
        }
        if (!t.listeningAudioScripts) {
          t.listeningAudioScripts = INITIAL_MOCK_TESTS[0]?.listeningAudioScripts;
        }
      });
      return parsed;
    }
    return INITIAL_MOCK_TESTS;
  } catch {
    return INITIAL_MOCK_TESTS;
  }
}

export function saveMockTest(newTest: MockTest): void {
  if (typeof window === 'undefined') return;
  const tests = getMockTests();
  const existingIdx = tests.findIndex((t) => t.id === newTest.id);
  if (existingIdx >= 0) {
    tests[existingIdx] = newTest;
  } else {
    tests.unshift(newTest);
  }
  localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(tests));
}

export function deleteMockTest(testId: string): void {
  if (typeof window === 'undefined') return;
  const tests = getMockTests().filter((t) => t.id !== testId);
  localStorage.setItem(MOCK_TESTS_KEY, JSON.stringify(tests));
}
