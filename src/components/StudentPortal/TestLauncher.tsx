'use client';

import React from 'react';
import {
  Clock,
  Layers,
  Play,
  Award,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  ShieldAlert,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Candidate, MockTest } from '@/types';
import { INITIAL_MOCK_TESTS } from '@/lib/mock-data';

interface TestLauncherProps {
  currentCandidate: Candidate | null;
  onStartTest: (test: MockTest) => void;
  onRequireRegistration: () => void;
}

export const TestLauncher: React.FC<TestLauncherProps> = ({
  currentCandidate,
  onStartTest,
  onRequireRegistration,
}) => {
  const handleTestClick = (test: MockTest) => {
    if (!currentCandidate) {
      alert('Please complete the Student Registration above before starting your mock examination.');
      onRequireRegistration();
      return;
    }
    onStartTest(test);
  };

  return (
    <div id="tests-section" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            Computer-Delivered Examination Battery
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b2860] tracking-tight">
            Available IELTS Mock Tests
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose a full 4-module academic examination or diagnostic assessment
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-2xs w-fit">
          BUBT Campus Examination Room 307 Collection
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_MOCK_TESTS.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md shadow-blue-950/5 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top decorative stripe */}
            <div className="h-1.5 w-full bg-[#0b2860] group-hover:bg-red-600 transition-colors absolute top-0 left-0" />

            <div>
              {/* Badge & Duration */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">
                  {test.badge}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-[#0b2860]" />
                  <span>{test.duration}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-black text-lg text-[#0b2860] leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                {test.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                {test.description}
              </p>

              {/* Module badges */}
              <div className="space-y-2 mb-6 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included Evaluation Modules:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-[#0b2860] rounded-lg text-[11px] font-bold">
                    <Headphones className="w-3 h-3 text-red-600" /> Listening
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-[#0b2860] rounded-lg text-[11px] font-bold">
                    <BookOpen className="w-3 h-3 text-red-600" /> Reading
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-100 text-[#0b2860] rounded-lg text-[11px] font-bold">
                    <PenTool className="w-3 h-3 text-red-600" /> Writing
                  </span>
                  {test.sectionsCount >= 4 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[11px] font-bold">
                      <Mic className="w-3 h-3 text-red-600" /> Speaking
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={() => handleTestClick(test)}
              className="w-full py-3 bg-[#0b2860] hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-950/15 group-hover:shadow-red-600/20 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Computer-Delivered Exam</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
