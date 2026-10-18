'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Highlighter, Clock, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { ReadingPassage } from '@/types';
import { READING_PASSAGES } from '@/lib/mock-data';

interface ReadingSectionProps {
  passages?: ReadingPassage[];
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, val: string) => void;
  onComplete: () => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  passages = READING_PASSAGES,
  answers,
  onAnswerChange,
  onComplete,
}) => {
  const [activePassageIdx, setActivePassageIdx] = useState<number>(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(3600); // 60 mins
  const [isHighlighterActive, setIsHighlighterActive] = useState<boolean>(false);

  const allPassages = passages && passages.length > 0 ? passages : READING_PASSAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPassage = allPassages[activePassageIdx] || allPassages[0];
  const totalAnswered = Object.keys(answers).filter((k) => k.startsWith('r') && answers[k]?.trim().length > 0).length;

  return (
    <div className="space-y-4">
      {/* Top Banner with Timer and Passage Selector */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Module Title & Passage Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                Academic Reading Module
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                Split-Screen Computer Delivered Exam
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-0 sm:ml-4 bg-slate-100 p-1 rounded-xl">
            {allPassages.map((p, idx) => (
              <button
                key={p.passageNumber || idx}
                onClick={() => setActivePassageIdx(idx)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activePassageIdx === idx
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Passage {p.passageNumber} (Qs {idx === 0 ? '1-13' : idx === 1 ? '14-26' : '27-40'})
              </button>
            ))}
          </div>
        </div>

        {/* Right Tools: Highlighter & Timer & Next button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsHighlighterActive(!isHighlighterActive)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
              isHighlighterActive
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-600" />
            <span>Highlighter {isHighlighterActive ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold">
            {totalAnswered}/40 Done
          </div>

          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <span>Proceed to Writing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Split Screen Reading Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Pane: Reading Passage */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-[680px] overflow-y-auto leading-relaxed">
          <div className="mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
              READING PASSAGE {currentPassage.passageNumber}
            </span>
            <span className="text-xs text-slate-400 font-medium">Academic Text</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {currentPassage.title}
          </h2>

          <div className={`space-y-4 text-xs sm:text-sm text-slate-700 ${isHighlighterActive ? 'selection:bg-yellow-200' : ''}`}>
            {currentPassage.content.split('\n\n').map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Right Pane: Questions List */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-[680px] overflow-y-auto space-y-4">
          <div className="mb-2 pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Questions {currentPassage.questions[0].questionNumber} – {currentPassage.questions[currentPassage.questions.length - 1].questionNumber}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Read the passage carefully and choose the correct answer or type the requested word.
            </p>
          </div>

          {currentPassage.questions.map((q) => {
            const currentVal = answers[q.id] || '';

            return (
              <div
                key={q.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {q.questionNumber}
                  </span>

                  <div className="flex-1 space-y-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {q.prompt}
                    </p>

                    {/* True/False/Not Given */}
                    {q.type === 'true_false_ng' && (
                      <div className="flex items-center gap-2 pt-1">
                        {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => onAnswerChange(q.id, opt)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                              currentVal === opt
                                ? 'bg-red-700 text-white border-red-700 shadow-xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Multiple Choice */}
                    {q.type === 'multiple_choice' && q.options && (
                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                              currentVal === opt
                                ? 'bg-red-50/80 border-red-300 text-red-950 font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={currentVal === opt}
                              onChange={(e) => onAnswerChange(q.id, e.target.value)}
                              className="text-red-700 focus:ring-red-600"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* Text Input Gap Fill */}
                    {q.type === 'text_input' && (
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder="Your answer..."
                          value={currentVal}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          className="w-full max-w-sm px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700 text-slate-900 font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
