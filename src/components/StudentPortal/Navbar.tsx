'use client';

import React from 'react';
import { Award, GraduationCap, Phone, MapPin, Mail, UserCheck, ShieldCheck, User } from 'lucide-react';
import { Candidate } from '@/types';

interface StudentNavbarProps {
  currentCandidate: Candidate | null;
  onOpenRegister: () => void;
  onScrollToTests: () => void;
  onScrollToNotice: () => void;
}

export const StudentNavbar: React.FC<StudentNavbarProps> = ({
  currentCandidate,
  onOpenRegister,
  onScrollToTests,
  onScrollToNotice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top institution bar (BUBT Royal Blue) */}
      <div className="bg-[#0b2860] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              BUBT TAFE IELTS Academy
            </span>
            <span className="hidden md:inline-block text-blue-300/40">|</span>
            <span className="flex items-center gap-1.5 text-blue-100">
              <Phone className="w-3 h-3 text-red-400" />
              01827459921
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-blue-100">
              <Mail className="w-3 h-3 text-red-400" />
              ielts@bubt.edu.bd
            </span>
            <span className="hidden xl:flex items-center gap-1.5 text-blue-200/80">
              <MapPin className="w-3 h-3 text-red-400" />
              Room 307, Building 01, Mirpur-2, Dhaka
            </span>
          </div>

          <div className="text-[11px] text-blue-200 hidden sm:block">
            Developer: <strong className="text-white font-medium">Masruf Rahman</strong> (<a href="https://www.masrufrahman.info" target="_blank" rel="noreferrer" className="text-red-300 hover:underline">masrufrahman.info</a>)
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#0b2860] text-white flex items-center justify-center shadow-md shadow-blue-900/20">
            <Award className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-[#0b2860]">BUBT TAFE</span>
              <span className="text-xl font-black tracking-tight text-red-600">IELTS</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Computer-Delivered Examination Portal
            </p>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <button
            onClick={onScrollToTests}
            className="hover:text-[#0b2860] transition-colors"
          >
            Mock Tests
          </button>
          <button
            onClick={onScrollToNotice}
            className="hover:text-[#0b2860] transition-colors"
          >
            TRF Collection Protocol
          </button>
          <a
            href="https://bubt.edu.bd"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#0b2860] transition-colors"
          >
            About BUBT
          </a>
        </nav>

        {/* Right candidate indicator & register CTA */}
        <div className="flex items-center gap-3">
          {currentCandidate ? (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-[#0b2860] text-white flex items-center justify-center font-bold text-xs">
                {currentCandidate.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-[#0b2860] leading-none">
                  {currentCandidate.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                  {currentCandidate.id}
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenRegister}
              className="flex items-center gap-1.5 bg-[#0b2860] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-950/20 transition-all active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Register Candidate</span>
            </button>
          )}

          <button
            onClick={onScrollToTests}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-95"
          >
            <span>Take Test</span>
          </button>
        </div>
      </div>
    </header>
  );
};
