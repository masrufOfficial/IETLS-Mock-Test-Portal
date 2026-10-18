'use client';

import React, { useState } from 'react';
import {
  Clock,
  Layers,
  Play,
  Award,
  CheckCircle,
  FileText,
  User,
  LogOut,
  ChevronRight,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Candidate, MockTest } from '@/types';
import { INITIAL_MOCK_TESTS } from '@/lib/mock-data';

interface MockTestCatalogProps {
  currentCandidate: Candidate | null;
  onStartTest: (test: MockTest) => void;
  onViewResults: () => void;
  onOpenAdmin: () => void;
  onOpenRegister: () => void;
}

export const MockTestCatalog: React.FC<MockTestCatalogProps> = ({
  currentCandidate,
  onStartTest,
  onViewResults,
  onOpenAdmin,
  onOpenRegister,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTabs = [
    { label: 'All', count: 650 },
    { label: 'Full Test', count: 14 },
    { label: 'Writing', count: 225 },
    { label: 'Listening', count: 81 },
    { label: 'Reading', count: 168 },
    { label: 'Speaking', count: 162 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-5">
          {/* Candidate Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-800 to-red-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {currentCandidate ? currentCandidate.name.charAt(0) : 'M'}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-900 text-sm truncate">
                  {currentCandidate?.name || 'Masruf Rahman'}
                </h3>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentCandidate?.email || 'mmrhridoy99@gmail.com'}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-red-50 text-red-700 font-mono text-[10px] font-bold rounded-md">
                  {currentCandidate?.id || 'BUBT-2026-1042'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Institution:</div>
              <div className="text-xs font-semibold text-slate-800 truncate">
                {currentCandidate?.university || 'BUBT'}
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="mt-5 space-y-1">
              <button
                onClick={() => {}}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-red-700 bg-red-50/80 rounded-xl"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4" />
                  Mock Tests
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onViewResults}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-slate-400" />
                  Results & TRF
                </div>
              </button>

              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-400" />
                  Admin Evaluation Hub
                </div>
              </button>

              <button
                onClick={onOpenRegister}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-slate-400" />
                  Switch Candidate
                </div>
              </button>
            </div>
          </div>

          {/* Quick Notice Card */}
          <div className="bg-gradient-to-br from-red-900 to-slate-900 text-white p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Full Mock Test Battery
            </div>
            <h4 className="text-sm font-bold leading-snug">
              Official Computer-Delivered IELTS Simulation
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Experience all 4 modules (Listening, Reading, Writing, Speaking) in authentic exam conditions with real-time scoring and instant TRF certificate generation.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Header Title & Subtitle */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Mock Tests
              </h1>
              <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                BUBT TAFE Academic Center
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Practice with full-length authentic IELTS mock tests under official Cambridge exam criteria
            </p>
          </div>

          {/* Filter Pills Bar (matching screenshot) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-red-900/60 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section: Full Mock Tests */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <h2 className="text-base font-bold text-slate-900">Full Mock Tests</h2>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-extrabold uppercase rounded-md tracking-wider">
                ONE SITTING
              </span>
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {INITIAL_MOCK_TESTS.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-lg hover:border-red-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Icon & Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-red-700 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Layers className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
                        {test.badge}
                      </span>
                    </div>

                    {/* Test Title */}
                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-red-700 transition-colors">
                      {test.title}
                    </h3>

                    {/* Metadata: Duration & Sections */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {test.duration}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        {test.sectionsCount} sections
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {test.description}
                    </p>

                    {/* Included module badges */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-semibold">
                        <Headphones className="w-2.5 h-2.5 text-red-600" /> Listening
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-semibold">
                        <BookOpen className="w-2.5 h-2.5 text-red-600" /> Reading
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-semibold">
                        <PenTool className="w-2.5 h-2.5 text-red-600" /> Writing
                      </span>
                      {test.sectionsCount >= 4 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 rounded text-[10px] font-bold">
                          <Mic className="w-2.5 h-2.5 text-red-700" /> Speaking
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Start Test Button */}
                  <button
                    onClick={() => onStartTest(test)}
                    className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md shadow-red-700/20 flex items-center justify-center gap-2 transition-all active:scale-98 group-hover:bg-red-800"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Start Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
