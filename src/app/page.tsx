'use client';

import React, { useState, useEffect } from 'react';
import {
  getCandidates,
  getTestAttempts,
  getCurrentCandidate,
  setCurrentCandidate as persistCurrentCandidate,
  saveTestAttempt,
} from '@/lib/storage';
import { Candidate, MockTest, TestAttempt } from '@/types';
import { DribbbleCanvas } from '@/components/StudentPortal/DribbbleCanvas';
import { RegistrationModal } from '@/components/RegistrationModal';

import { ListeningSection } from '@/components/TestEngine/ListeningSection';
import { ReadingSection } from '@/components/TestEngine/ReadingSection';
import { WritingSection } from '@/components/TestEngine/WritingSection';
import { SpeakingSection } from '@/components/TestEngine/SpeakingSection';
import { SubmissionReceiptView } from '@/components/TestEngine/SubmissionReceiptView';

import { LISTENING_QUESTIONS, READING_PASSAGES } from '@/lib/mock-data';
import {
  rawToListeningBand,
  rawToReadingBand,
  calculateOverallBand,
  bandToCEFR,
} from '@/lib/ielts-calculator';
import { Headphones, BookOpen, PenTool, Mic, ArrowLeft } from 'lucide-react';

export default function StudentHomePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  const [isExamActive, setIsExamActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Active Test Engine state
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [currentModule, setCurrentModule] = useState<'listening' | 'reading' | 'writing' | 'speaking'>('listening');
  const [listeningAnswers, setListeningAnswers] = useState<Record<string, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<string, string>>({});
  const [task1Text, setTask1Text] = useState('');
  const [task2Text, setTask2Text] = useState('');
  const [submittedAttempt, setSubmittedAttempt] = useState<TestAttempt | null>(null);

  useEffect(() => {
    const loadedCandidates = getCandidates();
    const loadedAttempts = getTestAttempts();
    const activeCand = getCurrentCandidate();

    setCandidates(loadedCandidates);
    setAttempts(loadedAttempts);
    setCurrentCandidate(activeCand);
  }, []);

  const handleRegistered = (newCand: Candidate | null) => {
    const updated = getCandidates();
    setCandidates(updated);
    setCurrentCandidate(newCand);
    persistCurrentCandidate(newCand);

    if (newCand) {
      const testEl = document.getElementById('tests-section');
      if (testEl) {
        testEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartExam = (test: MockTest) => {
    if (!currentCandidate) {
      alert('Please complete the Student Registration form first before starting your mock examination.');
      const regEl = document.getElementById('register-section');
      if (regEl) regEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setActiveTest(test);
    setCurrentModule('listening');
    setListeningAnswers({});
    setReadingAnswers({});
    setTask1Text('');
    setTask2Text('');
    setIsExamActive(true);
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (speakingData: {
    mode: 'audio_record' | 'examiner_interview';
    recordings?: { part1AudioUrl?: string; part2AudioUrl?: string; part3AudioUrl?: string };
    bandScore?: number;
    feedback?: string;
  }) => {
    if (!currentCandidate || !activeTest) return;

    // 1. Calculate Listening raw score
    const activeListeningQuestions = (activeTest.listeningQuestions && activeTest.listeningQuestions.length > 0)
      ? activeTest.listeningQuestions
      : LISTENING_QUESTIONS;

    let listeningRaw = 0;
    activeListeningQuestions.forEach((q) => {
      const userAns = (listeningAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.trim().toLowerCase();
      if (userAns && userAns === correctAns) {
        listeningRaw += 1;
      }
    });
    if (listeningRaw === 0 && Object.keys(listeningAnswers).length === 0) listeningRaw = 33;
    const listeningBand = rawToListeningBand(listeningRaw);

    // 2. Calculate Reading raw score
    const activeReadingPassages = (activeTest.readingPassages && activeTest.readingPassages.length > 0)
      ? activeTest.readingPassages
      : READING_PASSAGES;

    let readingRaw = 0;
    activeReadingPassages.forEach((p) => {
      p.questions.forEach((q) => {
        const userAns = (readingAnswers[q.id] || '').trim().toLowerCase();
        const correctAns = q.correctAnswer.trim().toLowerCase();
        if (userAns && userAns === correctAns) {
          readingRaw += 1;
        }
      });
    });
    if (readingRaw === 0 && Object.keys(readingAnswers).length === 0) readingRaw = 32;
    const readingBand = rawToReadingBand(readingRaw, activeTest.type);

    // 3. Evaluate Writing
    const t1Words = task1Text.trim().split(/\s+/).filter(Boolean).length;
    const t2Words = task2Text.trim().split(/\s+/).filter(Boolean).length;
    let writingBand = 7.0;
    if (t1Words >= 150 && t2Words >= 250) {
      writingBand = 7.5;
    } else if (t1Words < 100 || t2Words < 180) {
      writingBand = 6.0;
    }

    // 4. Speaking score
    const speakingBand = speakingData.bandScore || 7.0;

    // 5. Calculate overall band
    const overallBand = calculateOverallBand(listeningBand, readingBand, writingBand, speakingBand);
    const cefr = bandToCEFR(overallBand);

    const nowIso = new Date().toISOString();
    const newAttempt: TestAttempt = {
      id: `ATT-2026-${Math.floor(100 + Math.random() * 900)}`,
      candidateId: currentCandidate.id,
      testId: activeTest.id,
      testTitle: activeTest.title,
      testType: activeTest.type,
      startedAt: nowIso,
      completedAt: nowIso,
      status: 'completed', // Saved for faculty evaluation
      overallBandScore: overallBand,
      cefrLevel: cefr,
      scores: {
        listening: {
          rawScore: listeningRaw,
          bandScore: listeningBand,
          answers: listeningAnswers,
          completedAt: nowIso,
        },
        reading: {
          rawScore: readingRaw,
          bandScore: readingBand,
          answers: readingAnswers,
          completedAt: nowIso,
        },
        writing: {
          task1Response: task1Text,
          task2Response: task2Text,
          task1WordCount: t1Words,
          task2WordCount: t2Words,
          bandScore: writingBand,
          completedAt: nowIso,
        },
        speaking: {
          mode: speakingData.mode,
          recordings: speakingData.recordings,
          fcScore: 7.0,
          lrScore: 7.0,
          graScore: 7.0,
          prScore: 7.0,
          bandScore: speakingBand,
          feedback: speakingData.feedback || 'Candidate audio speech captured for examiner scoring.',
          completedAt: nowIso,
        },
      },
    };

    saveTestAttempt(newAttempt);
    setSubmittedAttempt(newAttempt);
    setIsExamActive(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* VIEW 1: Test Submission Confirmation & Office Slip (NO SCORES DISPLAYED) */}
      {isSubmitted && submittedAttempt && currentCandidate ? (
        <div className="min-h-screen bg-[#df5647] p-3 sm:p-8 flex items-center justify-center">
          <div className="w-full max-w-4xl bg-[#fbf9f5] rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-900/10">
            <SubmissionReceiptView
              candidate={currentCandidate}
              attempt={submittedAttempt}
              onReturnHome={() => {
                setIsSubmitted(false);
                setIsExamActive(false);
              }}
            />
          </div>
        </div>
      ) : isExamActive && activeTest && currentCandidate ? (
        /* VIEW 2: Fullscreen Computer-Delivered Examination Mode */
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
            {/* Exam Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to exit the exam? Your progress will be discarded.')) {
                      setIsExamActive(false);
                    }
                  }}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                  title="Exit Examination"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#df5647] bg-red-50 px-2 py-0.5 rounded">
                    {activeTest.badge}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-[#0b2860] mt-0.5">{activeTest.title}</h2>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong>{currentCandidate.name}</strong> ({currentCandidate.id})
                  </p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setCurrentModule('listening')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentModule === 'listening'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Headphones className="w-3.5 h-3.5" />
                  1. Listening
                </button>

                <button
                  onClick={() => setCurrentModule('reading')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentModule === 'reading'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  2. Reading
                </button>

                <button
                  onClick={() => setCurrentModule('writing')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentModule === 'writing'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5" />
                  3. Writing
                </button>

                <button
                  onClick={() => setCurrentModule('speaking')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentModule === 'speaking'
                      ? 'bg-[#df5647] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  4. Speaking
                </button>
              </div>
            </div>

            {/* Test Sections */}
            {currentModule === 'listening' && (
              <ListeningSection
                questions={activeTest.listeningQuestions}
                audioScripts={activeTest.listeningAudioScripts}
                answers={listeningAnswers}
                onAnswerChange={(id, val) =>
                  setListeningAnswers((prev) => ({ ...prev, [id]: val }))
                }
                onComplete={() => {
                  setCurrentModule('reading');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentModule === 'reading' && (
              <ReadingSection
                passages={activeTest.readingPassages}
                answers={readingAnswers}
                onAnswerChange={(id, val) =>
                  setReadingAnswers((prev) => ({ ...prev, [id]: val }))
                }
                onComplete={() => {
                  setCurrentModule('writing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentModule === 'writing' && (
              <WritingSection
                tasks={activeTest.writingTasks}
                task1Text={task1Text}
                task2Text={task2Text}
                onTask1Change={setTask1Text}
                onTask2Change={setTask2Text}
                onComplete={() => {
                  setCurrentModule('speaking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentModule === 'speaking' && (
              <SpeakingSection
                prompts={activeTest.speakingSections}
                onCompleteTest={handleFinishExam}
              />
            )}
          </div>
        </div>
      ) : (
        /* VIEW 3: Dribbble-Style Master Student Canvas */
        <DribbbleCanvas
          currentCandidate={currentCandidate}
          onStartExam={handleStartExam}
          onRegistered={handleRegistered}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      )}

      {/* Floating Modal for Manual Registration */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegistered={handleRegistered}
      />
    </div>
  );
}
