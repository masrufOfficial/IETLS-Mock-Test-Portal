'use client';

import React from 'react';
import { Award, BookOpen, GraduationCap, Phone, MapPin, Mail, UserCheck, ShieldCheck, PlusCircle } from 'lucide-react';
import { Candidate } from '@/types';

interface NavbarProps {
  currentCandidate: Candidate | null;
  activeTab: 'catalog' | 'test' | 'admin' | 'results';
  setActiveTab: (tab: 'catalog' | 'test' | 'admin' | 'results') => void;
  onOpenRegister: () => void;
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCandidate,
  activeTab,
  setActiveTab,
  onOpenRegister,
  candidates,
  onSelectCandidate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top institution bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <GraduationCap className="w-3.5 h-3.5 text-red-500" />
              BUBT TAFE IELTS Academy
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-red-400" />
              01827459921
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3 h-3 text-red-400" />
              ielts@bubt.edu.bd
            </span>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3 h-3 text-red-400" />
              Rupnagar, Mirpur-2, Dhaka-1216
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Developer: <strong className="text-slate-200 font-medium">Masruf Rahman</strong> (<a href="https://www.masrufrahman.info" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">masrufrahman.info</a>)
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand logo */}
        <div
          onClick={() => setActiveTab('catalog')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-red-800 to-red-600 flex items-center justify-center text-white shadow-md shadow-red-700/20 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">BUBT TAFE</span>
              <span className="text-xl font-black tracking-tight text-red-700">IELTS</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Mock Test Portal & TRF Certification
            </p>
          </div>
        </div>

        {/* Center navigation pills */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              activeTab === 'catalog'
                ? 'bg-white text-red-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              activeTab === 'results'
                ? 'bg-white text-red-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Results & TRF
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${
              activeTab === 'admin'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>
        </nav>

        {/* Right candidate selector & register CTA */}
        <div className="flex items-center gap-2.5">
          {/* Candidate selector */}
          <div className="relative hidden sm:block">
            <select
              value={currentCandidate?.id || ''}
              onChange={(e) => {
                const found = candidates.find((c) => c.id === e.target.value);
                if (found) onSelectCandidate(found);
              }}
              className="appearance-none bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
            <UserCheck className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Register new candidate button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Register Candidate</span>
            <span className="sm:hidden">Register</span>
          </button>

          {/* Admin toggle for mobile */}
          <button
            onClick={() => setActiveTab(activeTab === 'admin' ? 'catalog' : 'admin')}
            className="md:hidden p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
            title="Toggle Admin View"
          >
            <ShieldCheck className="w-4 h-4 text-red-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
