'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  Home,
  BookOpen,
  Bookmark,
  Calendar,
  Users,
  Search,
  ArrowRight,
  Headphones,
  PenTool,
  Mic,
  Clock,
  Building2,
  Award,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Play,
  Compass,
  MessageSquare,
  Layers,
} from 'lucide-react';
import { Candidate, MockTest } from '@/types';
import { INITIAL_MOCK_TESTS } from '@/lib/mock-data';
import { getMockTests } from '@/lib/storage';
import { RegistrationCard } from './RegistrationCard';
import { OfficeNoticeBanner } from './OfficeNoticeBanner';

interface DribbbleCanvasProps {
  currentCandidate: Candidate | null;
  onStartExam: (test: MockTest) => void;
  onRegistered: (candidate: Candidate) => void;
  onOpenRegisterModal: () => void;
}

export const DribbbleCanvas: React.FC<DribbbleCanvasProps> = ({
  currentCandidate,
  onStartExam,
  onRegistered,
  onOpenRegisterModal,
}) => {
  const [activeNav, setActiveNav] = useState<'home' | 'tests' | 'register' | 'notice'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [mockTests, setMockTests] = useState<MockTest[]>(INITIAL_MOCK_TESTS);

  React.useEffect(() => {
    setMockTests(getMockTests());
  }, []);

  const scrollTo = (id: string, navKey: 'home' | 'tests' | 'register' | 'notice') => {
    setActiveNav(navKey);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredTests = mockTests.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    /* Outer Frame Container matching Dribbble reference */
    <div className="min-h-screen bg-[#df5647] p-2.5 sm:p-5 lg:p-7 flex items-center justify-center font-sans">
      {/* Inner Rounded Canvas */}
      <div className="w-full max-w-[1520px] bg-[#fbf9f5] rounded-2xl sm:rounded-3xl lg:rounded-[36px] shadow-2xl overflow-hidden border border-amber-900/10 flex flex-col lg:flex-row min-h-[92vh]">
        
        {/* =========================================================================
            LEFT VERTICAL SIDEBAR (Matches State Library Dribbble Reference)
        ========================================================================= */}
        <aside className="w-full lg:w-64 bg-[#fbf9f5] border-b lg:border-b-0 lg:border-r border-slate-200/80 p-6 flex flex-col justify-between shrink-0">
          <div className="space-y-8">
            {/* Top Logo Section with BUBT TAFE emblem */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/bubt-tafe-logo.png"
                  alt="BUBT TAFE Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div className="font-black text-sm tracking-tight text-[#0b2860] uppercase">
                  BUBT TAFE
                </div>
                <div className="text-[11px] font-black tracking-widest text-[#df5647] uppercase">
                  IELTS ACADEMY
                </div>
              </div>
            </div>

            {/* Profile / Candidate Status Pill (Matches reference "Profile [Sign in]") */}
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#0b2860] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentCandidate ? currentCandidate.name.charAt(0) : <User className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-slate-800 truncate block">
                    {currentCandidate ? currentCandidate.name.split(' ')[0] : 'Profile'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">
                    {currentCandidate ? currentCandidate.id : 'Guest'}
                  </span>
                </div>
              </div>

              {currentCandidate ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active
                </span>
              ) : (
                <button
                  onClick={() => scrollTo('register-section', 'register')}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors"
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="space-y-1 text-xs font-semibold text-slate-600">
              <button
                onClick={() => scrollTo('hero-section', 'home')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'home'
                    ? 'text-slate-950 font-black bg-white shadow-xs'
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Home</span>
              </button>

              <button
                onClick={() => scrollTo('tests-section', 'tests')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'tests'
                    ? 'text-slate-950 font-black bg-white shadow-xs'
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>Mock Tests</span>
              </button>

              <button
                onClick={() => scrollTo('register-section', 'register')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'register'
                    ? 'text-slate-950 font-black bg-white shadow-xs'
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <Bookmark className="w-4 h-4 text-slate-400" />
                <span>Registration</span>
              </button>

              <button
                onClick={() => scrollTo('notice-section', 'notice')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeNav === 'notice'
                    ? 'text-slate-950 font-black bg-white shadow-xs'
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Room 307 Notice</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sidebar Info & Masruf Rahman Credit */}
          <div className="pt-6 border-t border-slate-200/80 space-y-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#df5647]" />
              <span>01827459921</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Room 307, Building 01, BUBT Campus
            </div>

            <div className="pt-2 text-[10px] text-slate-400">
              Dev: <a href="https://www.masrufrahman.info" target="_blank" rel="noreferrer" className="text-slate-800 font-bold hover:text-[#df5647]">Masruf Rahman</a>
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-800 transition-colors pt-1"
            >
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              <span>Staff Login</span>
            </Link>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT MAIN CANVAS (Hero Banner, Big Stats, Editorial Text, Test Launcher)
        ========================================================================= */}
        <main className="flex-1 p-5 sm:p-8 lg:p-12 overflow-y-auto space-y-12">
          
          {/* HERO BANNER (Matches State Library Dribbble Reference: Dark Library Image + Big Bold All-Caps Heading + Search Bar) */}
          <section id="hero-section" className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-10 shadow-2xl bg-slate-950">
            {/* Background Image with Dark Contrast Overlay — z-0 guarantees visibility */}
            <div className="absolute inset-0 z-0">
              <img
                src="/hero-library.jpg"
                alt="IELTS Academic Library"
                className="w-full h-full object-cover brightness-[0.35] contrast-[1.25] saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/35" />
            </div>

            {/* Top Micro Tag — relative z-10 */}
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#df5647] animate-ping" />
                BUBT TAFE Examination Center
              </span>

              <span className="text-white/85 text-xs font-semibold tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 hidden sm:inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Computer-Delivered Standard
              </span>
            </div>

            {/* Big Bold Headline (Matches Dribbble: "EXPLORE THE VAST WORLD OF BOOKS") */}
            <div className="relative z-10 my-auto py-6 sm:py-8 text-center space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] uppercase drop-shadow-2xl">
                EXPLORE <br />
                THE VAST WORLD OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-red-300">
                  IELTS
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium drop-shadow">
                Official computer-delivered mock testing battery for BUBT students & faculty.
              </p>
            </div>

            {/* Floating Search / Filter Bar (Matches Dribbble Input Pill with Red Action Button) */}
            <div className="relative z-10 max-w-2xl w-full mx-auto">
              <div className="flex items-center bg-white/95 hover:bg-white focus-within:bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl border border-white/40 backdrop-blur-md transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 ml-3 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search IELTS mock tests, Cambridge modules, or reading passages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2 py-2 text-xs sm:text-sm bg-transparent border-0 focus:outline-none text-slate-900 placeholder:text-slate-400 font-medium"
                />
                <button
                  onClick={() => scrollTo('tests-section', 'tests')}
                  className="px-4 sm:px-6 py-2.5 rounded-xl bg-[#df5647] hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md transition-all active:scale-95"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick tags */}
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap text-[11px] text-white/80 font-medium">
                <span className="text-white/50">Quick:</span>
                <button onClick={() => setSearchQuery('Academic')} className="hover:text-white underline decoration-white/30">#Academic Mock 1</button>
                <span>•</span>
                <button onClick={() => setSearchQuery('Reading')} className="hover:text-white underline decoration-white/30">#Reading Passages</button>
                <span>•</span>
                <button onClick={() => scrollTo('notice-section', 'notice')} className="hover:text-white underline decoration-white/30 text-red-200">#Room 307 Collection</button>
              </div>
            </div>
          </section>

          {/* =========================================================================
              LUXURY BENTO METRICS SUITE (Another Style: Self-Contained Bento Cards)
              Eliminates any possibility of overlapping across all viewport sizes
          ========================================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 py-4">
            {/* Card 1: 4 Exam Modules */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#df5647]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#df5647] flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  All 4 Skills
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                  4
                </div>
                <div className="text-sm font-bold text-[#df5647]">
                  Exam Modules
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Listening, Reading, Writing & Speaking
                </p>
              </div>
            </div>

            {/* Card 2: 2h 45m Timed Exam */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0b2860]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0b2860] flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  Standard Duration
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                  2h 45m
                </div>
                <div className="text-sm font-bold text-[#0b2860]">
                  Timed Delivery
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Authentic computer simulation battery
                </p>
              </div>
            </div>

            {/* Card 3: Band 9.0 Cambridge Scale */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                  Cambridge Rubric
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
                  Band 9.0
                </div>
                <div className="text-sm font-bold text-emerald-700">
                  Certified Scale
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Official half-band rounding algorithm
                </p>
              </div>
            </div>

            {/* Card 4: Room 307 TRF Handover (Distinct Institutional Hero Bento Card) */}
            <div className="bg-gradient-to-br from-[#0b2860] via-slate-950 to-[#0b2860] rounded-3xl p-5 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#df5647]/20 rounded-full blur-2xl" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center font-black border border-white/20 group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-300/30">
                  TRF Handover
                </span>
              </div>
              <div className="space-y-1 relative z-10">
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                  Room 307
                </div>
                <div className="text-sm font-bold text-amber-300">
                  Building 01
                </div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Collect verified signed paper TRF in-person
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              EDITORIAL DIVIDER & NARRATIVE (Matches Dribbble: "Discover New Realms: Immerse Yourself")
          ========================================================================= */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-6 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#df5647] tracking-tight whitespace-nowrap">
                  Discover Academic Excellence: Immerse Yourself
                </h2>
                <div className="hidden md:block h-px bg-slate-200 flex-1" />
              </div>
              <button
                onClick={() => scrollTo('tests-section', 'tests')}
                className="px-6 py-2.5 bg-[#df5647] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-95 shrink-0 w-fit"
              >
                See Mock Tests
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-medium">
              Lose yourself in the joy of learning with our seamless and elegant computer-delivered IELTS testing interface. Tailored for BUBT TAFE candidates, featuring authentic Academic Reading with selectable highlighters, synchronized Listening streams, timed Task 1 & 2 essay editors with live word counters, and audio-recorded Speaking evaluation.
            </p>
          </section>

          {/* =========================================================================
              STUDENT REGISTRATION SECTION
          ========================================================================= */}
          <section id="register-section" className="scroll-mt-8">
            <RegistrationCard
              currentCandidate={currentCandidate}
              onRegistered={onRegistered}
            />
          </section>

          {/* =========================================================================
              MOCK TEST SELECTION CARDS
          ========================================================================= */}
          <section id="tests-section" className="space-y-6 scroll-mt-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Available IELTS Mock Tests
                </h3>
                <p className="text-xs text-slate-500">
                  Select a test below to begin your computer-delivered session
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                {filteredTests.length} Tests Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <div
                  key={test.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#df5647] bg-red-50 border border-red-100 px-2.5 py-1 rounded-md">
                        {test.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-[#0b2860]" />
                        <span>{test.duration}</span>
                      </div>
                    </div>

                    <h4 className="font-black text-lg text-slate-900 leading-snug group-hover:text-[#0b2860] transition-colors">
                      {test.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold">
                        <Headphones className="w-3 h-3 text-[#df5647]" /> Listening
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold">
                        <BookOpen className="w-3 h-3 text-[#df5647]" /> Reading
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-semibold">
                        <PenTool className="w-3 h-3 text-[#df5647]" /> Writing
                      </span>
                      {test.sectionsCount >= 4 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[10px] font-bold">
                          <Mic className="w-3 h-3 text-red-600" /> Speaking
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onStartExam(test)}
                      className="w-full py-3 bg-[#0b2860] hover:bg-[#df5647] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Computer-Delivered Exam</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              ROOM 307 OFFICIAL NOTICE BANNER
          ========================================================================= */}
          <section id="notice-section" className="scroll-mt-8">
            <OfficeNoticeBanner />
          </section>

          {/* =========================================================================
              PRODUCT ATTRIBUTION & FOOTER CREDIT
          ========================================================================= */}
          <footer className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">
                Product of BUBT TAFE & Developed by Masruf Rahman (<a href="https://www.masrufrahman.info" target="_blank" rel="noreferrer" className="text-[#df5647] hover:underline">www.masrufrahman.info</a>)
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                © 2026 BUBT TAFE IELTS Academy. Room 307, Building 01, Mirpur-2, Dhaka.
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-600">
              <button
                onClick={() => scrollTo('hero-section', 'home')}
                className="hover:text-slate-900 transition-colors font-medium"
              >
                Back to Top ↑
              </button>
              <span className="text-slate-300">|</span>
              <Link href="/admin" className="text-slate-400 hover:text-slate-700">
                Staff Portal
              </Link>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
};
