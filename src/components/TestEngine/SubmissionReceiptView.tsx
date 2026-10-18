'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Building2,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { Candidate, TestAttempt } from '@/types';
import { generateCandidateSubmissionSlipPdf } from '@/lib/pdf-generator';

interface SubmissionReceiptViewProps {
  candidate: Candidate;
  attempt: TestAttempt;
  onReturnHome: () => void;
}

export const SubmissionReceiptView: React.FC<SubmissionReceiptViewProps> = ({
  candidate,
  attempt,
  onReturnHome,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0b2860', '#dc2626', '#10b981', '#3b82f6'],
      });
    } catch {
      // SSR fallback
    }
  }, []);

  const handleDownloadSlip = () => {
    generateCandidateSubmissionSlipPdf(candidate, attempt);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-200 text-[#0b2860] rounded-full text-xs font-bold">
          Examination Received & Logged
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0b2860] tracking-tight">
          Mock Examination Successfully Submitted!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Your answers across all modules have been stored and transmitted to the BUBT TAFE Academic Committee for official evaluation.
        </p>
      </div>

      {/* Main Submission Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-blue-950/5 space-y-6 relative overflow-hidden">
        {/* Brand Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#0b2860] via-blue-700 to-red-600 absolute top-0 left-0" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0b2860] text-white flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0b2860]">Examination Submission Slip</h3>
              <p className="text-xs text-slate-500">
                Candidate Token: <strong className="font-mono text-red-600">{candidate.id}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleDownloadSlip}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Submission Slip (PDF)</span>
          </button>
        </div>

        {/* Submission Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700">
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">Candidate Name:</span>
            <strong className="text-slate-900 text-sm">{candidate.name}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">Candidate ID:</span>
            <strong className="text-red-600 font-mono text-sm">{candidate.id}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">University / Dept:</span>
            <strong className="text-slate-900 truncate block">{candidate.university}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">Contact Mobile:</span>
            <strong className="text-slate-900">{candidate.mobile}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">Exam Taken:</span>
            <strong className="text-slate-900">{attempt.testTitle}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-0.5">Submission Timestamp:</span>
            <strong className="text-slate-900 font-mono">
              {attempt.completedAt ? attempt.completedAt.replace('T', ' ').slice(0, 19) : 'Just now'}
            </strong>
          </div>
        </div>

        {/* CRITICAL OFFICE COLLECTION NOTICE BANNER */}
        <div className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-3">
          <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-red-600" />
            <span>Important: Official TRF Collection Protocol</span>
          </div>

          <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium">
            In accordance with official <strong>BUBT TAFE IELTS Academy</strong> examination regulations, scores are sealed and not displayed on screen. Faculty members will evaluate your Writing Task 1 & 2 essays and Speaking recordings.
          </p>

          <div className="p-3.5 bg-white rounded-xl border border-red-200 text-xs text-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">Collection Venue:</span>
              <strong className="text-[#0b2860]">BUBT TAFE Office, Room 307, Building 01</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">Collection Requirement:</span>
              <strong className="text-red-600">Present Candidate ID: {candidate.id}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500">Processing Time:</span>
              <strong className="text-slate-900">24 to 48 Hours</strong>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onReturnHome}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0b2860] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            Return to Academy Home
          </button>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            <span>Product of BUBT TAFE & Developed by </span>
            <a
              href="https://www.masrufrahman.info"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-[#0b2860] hover:text-red-600 underline"
            >
              Masruf Rahman
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
