'use client';

import React, { useState, useEffect } from 'react';
import { PenTool, Clock, CheckCircle2, AlertCircle, ArrowRight, BarChart2, BookOpen } from 'lucide-react';
import { WritingTasks } from '@/types';
import { WRITING_TASKS } from '@/lib/mock-data';

interface WritingSectionProps {
  tasks?: WritingTasks;
  task1Text: string;
  task2Text: string;
  onTask1Change: (val: string) => void;
  onTask2Change: (val: string) => void;
  onComplete: () => void;
}

export const WritingSection: React.FC<WritingSectionProps> = ({
  tasks = WRITING_TASKS,
  task1Text,
  task2Text,
  onTask1Change,
  onTask2Change,
  onComplete,
}) => {
  const [activeTask, setActiveTask] = useState<'task1' | 'task2'>('task1');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(3600); // 60 mins

  const allTasks = tasks || WRITING_TASKS;

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

  const countWords = (text: string) => {
    if (!text || text.trim().length === 0) return 0;
    return text.trim().split(/\s+/).length;
  };

  const task1Words = countWords(task1Text);
  const task2Words = countWords(task2Text);

  return (
    <div className="space-y-4">
      {/* Top Banner with Task Switcher & Countdown Timer */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-700 text-white flex items-center justify-center">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">
              Academic Writing Module
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Task 1 (Report) & Task 2 (Discursive Essay)
            </h3>
          </div>

          {/* Task tabs */}
          <div className="flex items-center gap-2 ml-0 sm:ml-4 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTask('task1')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTask === 'task1'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Task 1</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  task1Words >= allTasks.task1.minimumWords
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {task1Words}w
              </span>
            </button>

            <button
              onClick={() => setActiveTask('task2')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTask === 'task2'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Task 2</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  task2Words >= allTasks.task2.minimumWords
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {task2Words}w
              </span>
            </button>
          </div>
        </div>

        {/* Right Timer & Complete CTA */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <span>Proceed to Speaking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split Screen: Prompt on Left, Editor on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Task Prompt & Reference Data */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
              {activeTask === 'task1' ? 'TASK 1 (REPORT)' : 'TASK 2 (ESSAY)'}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {activeTask === 'task1' ? '20 Minutes • Min 150 Words' : '40 Minutes • Min 250 Words'}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-sm leading-snug">
            {activeTask === 'task1' ? allTasks.task1.title : allTasks.task2.title}
          </h3>

          <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            {activeTask === 'task1' ? allTasks.task1.prompt : allTasks.task2.prompt}
          </p>

          {activeTask === 'task1' && allTasks.task1.chartDescription && (
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                <BarChart2 className="w-4 h-4" />
                Chart Data Summary (2015 - 2025)
              </div>
              <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap text-slate-300">
                {allTasks.task1.chartDescription}
              </pre>
            </div>
          )}

          <div className="text-xs text-slate-500 space-y-1 pt-2">
            <p className="font-bold text-slate-700">Official Evaluation Criteria:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>Task Achievement / Response</li>
              <li>Coherence & Cohesion</li>
              <li>Lexical Resource (Academic Vocabulary)</li>
              <li>Grammatical Range & Accuracy</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Text Editor & Live Word Counter */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Candidate Response Area
            </h4>

            {/* Word count badge */}
            <div className="flex items-center gap-2">
              {activeTask === 'task1' ? (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                    task1Words >= allTasks.task1.minimumWords
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {task1Words >= allTasks.task1.minimumWords ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  {task1Words} / {allTasks.task1.minimumWords} words
                </span>
              ) : (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                    task2Words >= allTasks.task2.minimumWords
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {task2Words >= allTasks.task2.minimumWords ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  {task2Words} / {allTasks.task2.minimumWords} words
                </span>
              )}
            </div>
          </div>

          {/* Text Area */}
          {activeTask === 'task1' ? (
            <textarea
              rows={18}
              placeholder="Begin typing your Task 1 response here... (Introduction, Overview, Detailed Key Features & Comparisons)"
              value={task1Text}
              onChange={(e) => onTask1Change(e.target.value)}
              className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 focus:bg-white text-slate-900 leading-relaxed font-sans resize-y"
            />
          ) : (
            <textarea
              rows={18}
              placeholder="Begin typing your Task 2 response here... (Introduction with thesis statement, Body Paragraph 1, Body Paragraph 2, Conclusion with personal perspective)"
              value={task2Text}
              onChange={(e) => onTask2Change(e.target.value)}
              className="w-full p-4 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 focus:bg-white text-slate-900 leading-relaxed font-sans resize-y"
            />
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Automatic continuous draft autosave enabled</span>
            <span>IELTS on Computer Test Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
