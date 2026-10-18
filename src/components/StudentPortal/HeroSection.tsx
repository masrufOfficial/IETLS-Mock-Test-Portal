'use client';

import React from 'react';
import {
  Award,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreTestsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreTestsClick,
}) => {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 border-b border-slate-100">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0b2860] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>BUBT TAFE Academic Testing Center</span>
              <span className="text-slate-300">•</span>
              <span className="text-red-600 font-extrabold">Official Cambridge Standard</span>
            </div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-5xl font-black text-[#0b2860] tracking-tight leading-[1.15]">
              Computer-Delivered <br />
              <span className="text-red-600">IELTS Mock Examination</span> <br />
              & Evaluation Portal
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Experience authentic exam conditions for all 4 modules—<strong>Listening, Reading, Writing, and Speaking</strong>. Your test responses are evaluated under official Cambridge criteria, and your verified physical Test Report Form (TRF) is issued directly from the BUBT TAFE Office.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onRegisterClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/25 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Register for Mock Test</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreTestsClick}
                className="flex items-center gap-2 px-6 py-3.5 bg-[#0b2860] hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <span>Select & Start Exam</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#0b2860]">4 Modules</div>
                <div className="text-[11px] text-slate-500 font-medium">Standard IELTS Battery</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-red-600">2h 45m</div>
                <div className="text-[11px] text-slate-500 font-medium">Timed Computer Exam</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-[#0b2860]">Room 307</div>
                <div className="text-[11px] text-slate-500 font-medium">Building 01 Collection</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Academic Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl shadow-blue-950/5 relative">
              {/* Top card header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#0b2860] text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0b2860]">IELTS Exam Structure</h3>
                    <p className="text-[11px] text-slate-500">Official Cambridge Assessment Grid</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-red-50 text-red-700 font-extrabold text-[10px] rounded-md uppercase tracking-wider">
                  Full Mock
                </span>
              </div>

              {/* 4 Modules breakdown list */}
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0b2860] flex items-center justify-center font-bold shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900">Listening Module</h4>
                      <span className="text-[11px] text-slate-500 font-mono">30 Mins</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">4 Recorded Sections • 40 Questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0b2860] flex items-center justify-center font-bold shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900">Academic Reading</h4>
                      <span className="text-[11px] text-slate-500 font-mono">60 Mins</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">3 Complex Passages • 40 Questions</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0b2860] flex items-center justify-center font-bold shrink-0">
                    <PenTool className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900">Academic Writing</h4>
                      <span className="text-[11px] text-slate-500 font-mono">60 Mins</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">Task 1 (Report) & Task 2 (Discursive Essay)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-red-50/70 border border-red-100 hover:border-red-200 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-red-900">Speaking Simulation</h4>
                      <span className="text-[11px] text-red-700 font-mono font-bold">11-14 Mins</span>
                    </div>
                    <p className="text-[11px] text-red-700/80 truncate">Audio Recording or BUBT Campus Interview</p>
                  </div>
                </div>
              </div>

              {/* Notice note */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Building2 className="w-4 h-4 text-[#0b2860]" />
                <span>Verified physical TRF issued at Room 307, Building 01.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
