'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Download,
  CheckCircle2,
  Share2,
  RotateCcw,
  ShieldCheck,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  QrCode,
  School,
  User,
  Calendar,
} from 'lucide-react';
import { Candidate, TestAttempt } from '@/types';
import { generateCandidateTRFPdf } from '@/lib/pdf-generator';
import { getBandDescription } from '@/lib/ielts-calculator';

interface TestResultViewProps {
  candidate: Candidate;
  attempt: TestAttempt;
  onBackToCatalog: () => void;
  onOpenAdmin: () => void;
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  candidate,
  attempt,
  onBackToCatalog,
  onOpenAdmin,
}) => {
  useEffect(() => {
    // Trigger celebratory confetti on test completion
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#991b1b', '#0f172a', '#10b981', '#f59e0b'],
      });
    } catch {
      // In case canvas-confetti is SSR
    }
  }, []);

  const handleDownloadPdf = () => {
    generateCandidateTRFPdf(candidate, attempt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {/* Top Completion Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Test Successfully Completed & Graded
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          BUBT TAFE IELTS Mock Test Results
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Official Candidate Test Report Form (TRF) Summary
        </p>
      </div>

      {/* Main Score Certificate Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl relative overflow-hidden">
        {/* Top brand header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-800 to-red-600 text-white flex items-center justify-center font-bold shadow-md shadow-red-700/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">BUBT TAFE</span>
                <span className="text-lg font-black tracking-tight text-red-700">IELTS Academy</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500">
                Official TRF Record: <strong className="font-mono text-slate-800">{attempt.id}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md shadow-red-700/20 transition-all active:scale-95 ml-auto sm:ml-0"
          >
            <Download className="w-4 h-4" />
            Download Official TRF (PDF)
          </button>
        </div>

        {/* Candidate Bio Details Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-5 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Candidate Name:</span>
            <strong className="text-slate-900 text-sm">{candidate.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Candidate ID:</span>
            <strong className="text-red-700 font-mono text-sm">{candidate.id}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Institution:</span>
            <strong className="text-slate-900 truncate block">{candidate.university}</strong>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Test Date:</span>
            <strong className="text-slate-900">
              {attempt.completedAt ? attempt.completedAt.slice(0, 10) : '2026-10-18'}
            </strong>
          </div>
        </div>

        {/* Main Score Highlights */}
        <div className="py-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 items-stretch">
            {/* Listening */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                <Headphones className="w-3.5 h-3.5 text-red-600" />
                Listening
              </div>
              <div className="text-2xl font-black text-slate-900 my-1">
                {attempt.scores.listening.bandScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Raw: {attempt.scores.listening.rawScore}/40
              </span>
            </div>

            {/* Reading */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-red-600" />
                Reading
              </div>
              <div className="text-2xl font-black text-slate-900 my-1">
                {attempt.scores.reading.bandScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Raw: {attempt.scores.reading.rawScore}/40
              </span>
            </div>

            {/* Writing */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                <PenTool className="w-3.5 h-3.5 text-red-600" />
                Writing
              </div>
              <div className="text-2xl font-black text-slate-900 my-1">
                {attempt.scores.writing.bandScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Task 1 & Task 2
              </span>
            </div>

            {/* Speaking */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col justify-between">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
                <Mic className="w-3.5 h-3.5 text-red-600" />
                Speaking
              </div>
              <div className="text-2xl font-black text-slate-900 my-1">
                {attempt.scores.speaking.bandScore.toFixed(1)}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                {attempt.scores.speaking.mode === 'audio_record' ? 'Audio Evaluated' : 'Examiner'}
              </span>
            </div>

            {/* Overall Band Box (Highlight) */}
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-red-700 text-white text-center flex flex-col justify-between shadow-lg shadow-red-700/20">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-red-200 mb-1">
                Overall Band
              </div>
              <div className="text-3xl font-black text-white my-1">
                {attempt.overallBandScore.toFixed(1)}
              </div>
              <span className="text-[10px] font-bold text-red-100 bg-red-800/80 px-2 py-0.5 rounded-full inline-block mx-auto">
                {attempt.cefrLevel || 'C1 Advanced'}
              </span>
            </div>
          </div>
        </div>

        {/* Competence & Examiner Notes */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <h4 className="font-bold text-red-700 uppercase tracking-wider text-[11px]">
            Official Band Competence Descriptor
          </h4>
          <p className="text-slate-700 leading-relaxed">
            {getBandDescription(attempt.overallBandScore)}
          </p>
        </div>

        {/* Action Footers */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToCatalog}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Back to Mock Test Catalog
            </button>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Open Admin Dashboard
            </button>
          </div>

          <div className="text-[11px] text-slate-400 text-right">
            <span>Product of BUBT TAFE & Developed by </span>
            <a
              href="https://www.masrufrahman.info"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-700 hover:text-red-700 underline"
            >
              Masruf Rahman
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
