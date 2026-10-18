'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Unlock,
  Download,
  FileSpreadsheet,
  PlusCircle,
  Search,
  Edit3,
  Award,
  User,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Mic,
  PenTool,
  X,
  Volume2,
  ArrowLeft,
  KeyRound,
  LogOut,
  Building2,
  BookOpen,
  Trash2,
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  BarChart3,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import { Candidate, TestAttempt } from '@/types';
import {
  getCandidates,
  getTestAttempts,
  updateAttemptEvaluation,
  deleteCandidate,
  clearAllDatabase,
  loadSampleDemoData,
} from '@/lib/storage';
import { generateCandidateTRFPdf, generateBatchSummaryPdf, exportBatchSummaryCsv } from '@/lib/pdf-generator';
import { SpeakingEvaluationLab } from '@/components/Admin/SpeakingEvaluationLab';
import { MockTestBuilder } from '@/components/Admin/MockTestBuilder';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'evaluated' | 'pending' | 'high'>('all');
  const [adminSection, setAdminSection] = useState<'candidates' | 'speaking' | 'builder'>('candidates');

  // Evaluation modal state
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttempt | null>(null);
  const [editingWritingBand, setEditingWritingBand] = useState<number>(7.0);
  const [editingWritingFeedback, setEditingWritingFeedback] = useState<string>('');
  const [editingSpeakingBand, setEditingSpeakingBand] = useState<number>(7.0);
  const [editingSpeakingFeedback, setEditingSpeakingFeedback] = useState<string>('');
  const [fcScore, setFcScore] = useState<number>(7.0);
  const [lrScore, setLrScore] = useState<number>(7.0);
  const [graScore, setGraScore] = useState<number>(7.0);
  const [prScore, setPrScore] = useState<number>(7.0);

  // Check existing session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('bubt_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
    loadData();
  }, []);

  const loadData = () => {
    let loadedCandidates = getCandidates();
    let loadedAttempts = getTestAttempts();

    // Auto seed if storage is empty and user has not explicitly wiped it
    if (
      loadedCandidates.length === 0 &&
      typeof window !== 'undefined' &&
      sessionStorage.getItem('bubt_db_explicitly_cleared') !== 'true'
    ) {
      loadSampleDemoData();
      loadedCandidates = getCandidates();
      loadedAttempts = getTestAttempts();
    }

    setCandidates(loadedCandidates);
    setAttempts(loadedAttempts);
  };

  const handleDeleteCandidate = (candidateId: string) => {
    if (confirm(`Are you sure you want to remove candidate ${candidateId} and all their test records?`)) {
      deleteCandidate(candidateId);
      loadData();
    }
  };

  const handleClearDatabase = () => {
    if (
      confirm(
        '⚠️ Are you sure you want to reset the database?\n\nThis will remove all candidate profiles, test submissions, and active sessions so you can test fresh registration from the landing page.'
      )
    ) {
      clearAllDatabase();
      loadData();
      alert('✓ Database reset successfully. The candidate roster is now empty and ready for fresh registrations.');
    }
  };

  const handleLoadDemoData = () => {
    if (confirm('Load sample Cambridge candidate records and mock test attempts for demonstration?')) {
      loadSampleDemoData();
      loadData();
      alert('✓ Sample demo data loaded successfully.');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for BUBT TAFE admin: bubt2026 or admin123
    if (passcode === 'bubt2026' || passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('bubt_admin_auth', 'true');
      }
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('bubt_admin_auth');
    }
  };

  const handleOpenEvaluation = (attempt: TestAttempt) => {
    setSelectedAttempt(attempt);
    setEditingWritingBand(attempt.scores.writing.bandScore || 7.0);
    setEditingWritingFeedback(attempt.scores.writing.feedback || '');
    setEditingSpeakingBand(attempt.scores.speaking.bandScore || 7.0);
    setEditingSpeakingFeedback(attempt.scores.speaking.feedback || '');
    setFcScore(attempt.scores.speaking.fcScore || 7.0);
    setLrScore(attempt.scores.speaking.lrScore || 7.0);
    setGraScore(attempt.scores.speaking.graScore || 7.0);
    setPrScore(attempt.scores.speaking.prScore || 7.0);
  };

  const handleSaveEvaluation = () => {
    if (!selectedAttempt) return;

    updateAttemptEvaluation(selectedAttempt.id, {
      writingBand: editingWritingBand,
      writingFeedback: editingWritingFeedback,
      speakingBand: editingSpeakingBand,
      speakingFeedback: editingSpeakingFeedback,
      fcScore: fcScore,
      lrScore: lrScore,
      graScore: graScore,
      prScore: prScore,
    });

    setSelectedAttempt(null);
    loadData();
  };

  // Filter candidates
  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.mobile.includes(searchTerm);

    const attempt = attempts.find((a) => a.candidateId === c.id);
    if (statusFilter === 'evaluated') return matchesSearch && attempt && attempt.overallBandScore > 0;
    if (statusFilter === 'pending') return matchesSearch && (!attempt || attempt.overallBandScore === 0);
    if (statusFilter === 'high') return matchesSearch && attempt && attempt.overallBandScore >= 7.0;
    return matchesSearch;
  });

  const totalCount = candidates.length;
  const attemptsWithScores = attempts.filter((a) => a.overallBandScore > 0);
  const avgOverall =
    attemptsWithScores.length > 0
      ? (attemptsWithScores.reduce((acc, curr) => acc + curr.overallBandScore, 0) / attemptsWithScores.length).toFixed(1)
      : '0.0';
  const highScorers = attemptsWithScores.filter((a) => a.overallBandScore >= 7.0).length;

  // --- 1. Passcode Gate Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white bg-grid-pattern">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl shadow-blue-950/10 space-y-6 relative overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-[#0b2860] via-blue-700 to-red-600 absolute top-0 left-0" />

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#0b2860] text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-xl font-black text-[#0b2860]">BUBT TAFE IELTS Academy</h1>
            <p className="text-xs text-slate-500">Authorized Faculty & Admin Examination Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Passcode / PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter admin passcode (e.g. bubt2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
              {authError && (
                <p className="text-xs font-semibold text-red-600 mt-1.5">
                  Invalid passcode. Try <code className="bg-red-50 px-1 py-0.5 rounded">bubt2026</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0b2860] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-950/20 transition-all active:scale-98 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="flex items-center gap-1.5 text-slate-600 hover:text-[#0b2860]">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Student Landing Portal</span>
            </Link>
            <span className="text-[11px] font-mono text-slate-400">v2.4 Production</span>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. Authenticated Admin Dashboard ---
  return (
    <div className="min-h-screen flex flex-col bg-white bg-grid-pattern">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="bg-[#0b2860] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-[1780px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                BUBT TAFE Examination Administration Hub
              </span>
              <span className="text-blue-300/40">|</span>
              <span className="text-blue-100 text-[11px]">Room 307, Building 01</span>
            </div>

            <div className="text-[11px] text-blue-200 flex items-center gap-2">
              <span>Developer: <strong className="text-white">Masruf Rahman</strong> (<a href="https://www.masrufrahman.info" target="_blank" rel="noreferrer" className="underline hover:text-white">masrufrahman.info</a>)</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1780px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5 text-xs font-bold" title="Back to Public Portal">
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Student Portal</span>
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-[#0b2860]">BUBT TAFE</span>
                <span className="text-lg font-black text-red-600">IELTS Admin Hub</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Evaluation, Score Moderation & TRF Print Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-Time Student Roster Stream</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-600 hover:text-red-600 text-xs font-bold transition-colors"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Session</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Top Navigation & Operations Bar (Visible only on < lg) */}
      <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 sticky top-[73px] z-30 shadow-xs space-y-2">
        {/* Mobile Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setAdminSection('candidates')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              adminSection === 'candidates'
                ? 'bg-[#0b2860] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Dossiers</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                adminSection === 'candidates' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {candidates.length}
            </span>
          </button>

          <button
            onClick={() => setAdminSection('speaking')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              adminSection === 'speaking'
                ? 'bg-[#df5647] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Speaking Lab</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                adminSection === 'speaking' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
              }`}
            >
              {attempts.length}
            </span>
          </button>

          <button
            onClick={() => setAdminSection('builder')}
            className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              adminSection === 'builder'
                ? 'bg-[#0b2860] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Builder</span>
          </button>
        </div>

        {/* Mobile Quick Actions Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          <button
            onClick={handleLoadDemoData}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-[#0b2860] font-bold rounded-xl active:scale-95 shadow-2xs"
            title="Load 8 sample students and voice recordings"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Load Demo Data</span>
          </button>
          <button
            onClick={() => generateBatchSummaryPdf(candidates, attempts)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white font-bold rounded-xl shadow-2xs active:scale-95"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Batch PDF</span>
          </button>
          <button
            onClick={() => exportBatchSummaryCsv(candidates, attempts)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 shadow-2xs"
            title="Export CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClearDatabase}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 font-bold rounded-xl active:scale-95 shadow-2xs"
            title="Reset candidate database"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset DB</span>
          </button>
        </div>
      </div>

      {/* Main Admin Workspace Container with 3-Zone Architecture */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">

          {/* =========================================================================
              LEFT COLUMN: SUB-SECTIONS (Only when in Candidate Dossiers, hidden on mobile)
              Note: Speaking Lab & Mock Test Builder embed their own Left Sub-sections!
          ========================================================================= */}
          {adminSection === 'candidates' && (
            <aside className="hidden lg:block lg:w-72 shrink-0 space-y-4">
              {/* Filter Sub-sections Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#0b2860]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Roster Filters
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {filteredCandidates.length} Shown
                  </span>
                </div>

                <nav className="space-y-1.5">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === 'all'
                        ? 'bg-[#0b2860] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5" />
                      <span>All Candidates</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      statusFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {candidates.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('evaluated')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === 'evaluated'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ready at Room 307</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      statusFilter === 'evaluated' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {attemptsWithScores.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === 'pending'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>Pending Evaluation</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      statusFilter === 'pending' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {candidates.length - attemptsWithScores.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('high')}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      statusFilter === 'high'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>High Scorers (7.0+)</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      statusFilter === 'high' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
                    }`}>
                      {highScorers}
                    </span>
                  </button>
                </nav>
              </div>

              {/* Student Registration Influx Info Card */}
              <div className="bg-gradient-to-br from-[#0b2860] to-blue-900 rounded-3xl p-5 text-white shadow-sm space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Student Influx Stream</span>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed font-medium">
                  Candidates register on the Student Portal (<code className="text-amber-200">/</code>). Records automatically stream into this roster without manual entry.
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200">
                  <span>Sync Status</span>
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Connected
                  </span>
                </div>
              </div>

              {/* Room 307 Handover Protocol */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#0b2860] font-bold">
                  <Building2 className="w-4 h-4 text-red-600" />
                  <span>Room 307 Protocol</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Official Test Report Forms (TRF) are issued only in Room 307, Building 01 upon presentation of the physical registration verification slip. Zero scores are displayed to students online.
                </p>
              </div>
            </aside>
          )}

          {/* =========================================================================
              CENTER COLUMN: MAIN WORKSPACE (flex-1)
          ========================================================================= */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* TAB 1: CANDIDATES DOSSIERS */}
            {adminSection === 'candidates' && (
              <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 truncate">
                  Registered Candidates
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#0b2860]">{totalCount}</div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1 block truncate">Logged in academy</span>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 truncate">
                  TRF Printed & Evaluated
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">{attemptsWithScores.length}</div>
                <span className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 block truncate">Ready for Room 307</span>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 truncate">
                  Average Overall Band
                </span>
                <div className="text-2xl sm:text-3xl font-black text-red-600">{avgOverall}</div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1 block truncate">Cambridge scale</span>
              </div>

              <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1 truncate">
                  High Band Scorers (7.0+)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#0b2860]">{highScorers}</div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1 block truncate">C1 Advanced / C2</span>
              </div>
            </div>

            {/* Empty State Banner if no candidates */}
            {candidates.length === 0 && (
              <div className="bg-gradient-to-r from-blue-50 via-white to-amber-50 border-2 border-dashed border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b2860] text-amber-300 flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-xs">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      Candidate Roster is Currently Empty
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Load 8 sample student dossiers with mock test attempts, essays, and speaking voice recordings for testing.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLoadDemoData}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-5 py-3 bg-[#0b2860] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-amber-300" />
                  <span>Load Sample Demo Data</span>
                </button>
              </div>
            )}

            {/* Master Candidates Table Container */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Table Search & Filter Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                <div className="relative w-full lg:w-80">
                  <input
                    type="text"
                    placeholder="Search candidate name, ID, or university..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] text-slate-900"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    All ({candidates.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('evaluated')}
                    className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === 'evaluated' ? 'bg-white text-emerald-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Ready at 307 ({attemptsWithScores.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === 'pending' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Pending ({candidates.length - attemptsWithScores.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('high')}
                    className={`shrink-0 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      statusFilter === 'high' ? 'bg-white text-red-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    7.0+ High ({highScorers})
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4 whitespace-nowrap">Candidate ID</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">Name & University</th>
                      <th className="py-3.5 px-3 text-center whitespace-nowrap">L</th>
                      <th className="py-3.5 px-3 text-center whitespace-nowrap">R</th>
                      <th className="py-3.5 px-3 text-center whitespace-nowrap">W</th>
                      <th className="py-3.5 px-3 text-center whitespace-nowrap">S</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">Overall</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">Office Status</th>
                      <th className="py-3.5 px-4 text-right whitespace-nowrap sticky right-0 bg-slate-50 border-l border-slate-200 z-10 shadow-[-6px_0_10px_rgba(0,0,0,0.03)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-14 px-4 text-center">
                          <div className="max-w-md mx-auto space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 border border-blue-200 text-[#0b2860] flex items-center justify-center shadow-xs">
                              <User className="w-8 h-8 text-[#0b2860]" />
                            </div>
                            <div>
                              <h4 className="text-base font-black text-slate-900">
                                {candidates.length === 0 ? 'Candidate Roster is Empty' : 'No Matching Candidates'}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                                {candidates.length === 0
                                  ? 'No candidates are registered in the portal yet. Load sample Cambridge candidate dossiers with audio recordings for instant review.'
                                  : 'Try adjusting your search keywords or switching back to the "All Candidates" filter.'}
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                              {candidates.length === 0 ? (
                                <>
                                  <button
                                    onClick={handleLoadDemoData}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0b2860] hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                                  >
                                    <Sparkles className="w-4 h-4 text-amber-300" />
                                    <span>Load 8 Sample Students & Audio</span>
                                  </button>
                                  <Link
                                    href="/"
                                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                                    <span>Register New Student</span>
                                  </Link>
                                </>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                  }}
                                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                                >
                                  Clear Filters & Search
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredCandidates.map((candidate) => {
                        const attempt = attempts.find((a) => a.candidateId === candidate.id);
                      const hasScore = attempt && attempt.overallBandScore > 0;

                      return (
                        <tr key={candidate.id} className="hover:bg-slate-50/70 transition-colors group">
                          {/* Candidate ID */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-[#0b2860] border border-slate-200 font-mono font-bold text-xs rounded-lg shadow-2xs">
                              {candidate.id}
                            </span>
                          </td>

                          {/* Name & University */}
                          <td className="py-3 px-4 min-w-[200px]">
                            <div className="font-bold text-slate-900 whitespace-nowrap">{candidate.name}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">
                              {candidate.university} • <span className="font-mono">{candidate.mobile}</span>
                            </div>
                          </td>

                          {/* Module Scores */}
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                            {hasScore ? attempt.scores.listening.bandScore.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                            {hasScore ? attempt.scores.reading.bandScore.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                            {hasScore ? attempt.scores.writing.bandScore.toFixed(1) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center font-mono font-bold text-slate-700 whitespace-nowrap">
                            {hasScore ? attempt.scores.speaking.bandScore.toFixed(1) : '-'}
                          </td>

                          {/* Overall Band */}
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            {hasScore ? (
                              <span className="inline-block px-2.5 py-1 bg-red-100 text-red-800 font-extrabold rounded-lg shadow-2xs">
                                {attempt.overallBandScore.toFixed(1)}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-medium">Pending</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            {hasScore ? (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full whitespace-nowrap">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ready at Room 307
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full whitespace-nowrap">
                                <Clock className="w-3.5 h-3.5 text-amber-600" /> Under Review
                              </span>
                            )}
                          </td>

                          {/* Actions (Sticky Right Column) */}
                          <td className="py-3 px-4 text-right whitespace-nowrap sticky right-0 bg-white/95 group-hover:bg-slate-50/95 backdrop-blur-xs border-l border-slate-100 z-10 shadow-[-6px_0_10px_rgba(0,0,0,0.03)]">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Print/Download Candidate Official TRF PDF */}
                              {hasScore && (
                                <button
                                  onClick={() => generateCandidateTRFPdf(candidate, attempt)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-red-300 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-colors shadow-2xs"
                                  title="Print Official TRF for Office Handover"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span className="text-[11px] font-bold">Print TRF</span>
                                </button>
                              )}

                              {/* Review & Grade Modal */}
                              {attempt && (
                                <button
                                  onClick={() => handleOpenEvaluation(attempt)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0b2860] hover:bg-blue-900 text-white text-[11px] font-bold transition-all shadow-2xs"
                                  title="Faculty Grading & Audio Playback"
                                >
                                  <Edit3 className="w-3 h-3 text-amber-300" />
                                  <span>Grade</span>
                                </button>
                              )}

                              {/* Delete Candidate */}
                              <button
                                onClick={() => handleDeleteCandidate(candidate.id)}
                                className="p-1.5 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                title="Remove Candidate Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                  </tbody>
                </table>
              </div>
            </div>

        {/* Evaluation & Grading Modal */}
        {selectedAttempt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0b2860] text-white flex items-center justify-center font-bold">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Faculty Evaluation & Scoring Panel</h3>
                    <p className="text-[11px] text-slate-500">Attempt ID: {selectedAttempt.id}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-800">
                {/* Listening & Reading */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-500 font-bold block mb-1">Listening Module (Auto-Graded)</span>
                    <div className="text-lg font-black text-[#0b2860]">
                      Band {selectedAttempt.scores.listening.bandScore.toFixed(1)}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        ({selectedAttempt.scores.listening.rawScore}/40 raw)
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block mb-1">Reading Module (Auto-Graded)</span>
                    <div className="text-lg font-black text-[#0b2860]">
                      Band {selectedAttempt.scores.reading.bandScore.toFixed(1)}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        ({selectedAttempt.scores.reading.rawScore}/40 raw)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Writing Evaluation */}
                <div className="space-y-3 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-red-600" />
                      <h4 className="font-bold text-slate-900 text-sm">Writing Module Assessment</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-600">Assign Band:</span>
                      <select
                        value={editingWritingBand}
                        onChange={(e) => setEditingWritingBand(parseFloat(e.target.value))}
                        className="px-2.5 py-1 font-bold rounded-lg border border-slate-300 bg-white"
                      >
                        {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                          <option key={b} value={b}>
                            Band {b.toFixed(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-slate-600">
                    <div className="flex justify-between font-semibold">
                      <span>Task 1 Word Count: {selectedAttempt.scores.writing.task1WordCount} words</span>
                      <span>Task 2 Word Count: {selectedAttempt.scores.writing.task2WordCount} words</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Examiner Writing Feedback:</label>
                    <textarea
                      rows={2}
                      value={editingWritingFeedback}
                      onChange={(e) => setEditingWritingFeedback(e.target.value)}
                      placeholder="Enter rubric remarks on Task Achievement, Coherence, Lexical Resource..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>

                {/* Speaking Evaluation */}
                <div className="space-y-3 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-red-600" />
                      <h4 className="font-bold text-slate-900 text-sm">Speaking Module Assessment</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-600">Assign Band:</span>
                      <select
                        value={editingSpeakingBand}
                        onChange={(e) => setEditingSpeakingBand(parseFloat(e.target.value))}
                        className="px-2.5 py-1 font-bold rounded-lg border border-slate-300 bg-white text-red-600"
                      >
                        {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                          <option key={b} value={b}>
                            Band {b.toFixed(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Sub criteria */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Fluency & Coherence</span>
                      <strong className="text-slate-900">{fcScore.toFixed(1)}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Lexical Resource</span>
                      <strong className="text-slate-900">{lrScore.toFixed(1)}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Grammatical Range</span>
                      <strong className="text-slate-900">{graScore.toFixed(1)}</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <span className="text-[10px] text-slate-500 font-semibold block">Pronunciation</span>
                      <strong className="text-slate-900">{prScore.toFixed(1)}</strong>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Examiner Speaking Remarks:</label>
                    <textarea
                      rows={2}
                      value={editingSpeakingFeedback}
                      onChange={(e) => setEditingSpeakingFeedback(e.target.value)}
                      placeholder="Enter comments on acoustic delivery, intonation, lexical range..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
                <button
                  onClick={() => setSelectedAttempt(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvaluation}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md shadow-red-600/20"
                >
                  Save & Update Official TRF
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
        )}

        {/* TAB 2: SPEAKING EVALUATION LAB */}
        {adminSection === 'speaking' && (
          <SpeakingEvaluationLab
            candidates={candidates}
            attempts={attempts}
            onDataUpdated={loadData}
          />
        )}

        {/* TAB 3: MOCK TEST QUESTION BUILDER */}
        {adminSection === 'builder' && (
          <MockTestBuilder onTestPublished={loadData} />
        )}
      </div>

      {/* =========================================================================
          RIGHT COLUMN: PRIMARY MENUBAR (hidden on mobile, lg:w-80 shrink-0)
      ========================================================================= */}
      <aside className="hidden lg:block lg:w-80 shrink-0 space-y-5 lg:sticky lg:top-24">
        {/* Primary Menubar Navigation Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#0b2860] block">
                Admin Menubar
              </span>
              <span className="text-[10px] text-slate-400">Navigation & Operations Rail</span>
            </div>
            <div className="w-8 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
              307
            </div>
          </div>

          {/* Main Nav Items */}
          <div className="space-y-2">
            <button
              onClick={() => setAdminSection('candidates')}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                adminSection === 'candidates'
                  ? 'bg-[#0b2860] text-white border-[#0b2860] shadow-md shadow-blue-950/15'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  adminSection === 'candidates' ? 'bg-white/15 text-white' : 'bg-blue-50 text-[#0b2860]'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Candidate Dossiers</div>
                  <div className={`text-[10px] ${adminSection === 'candidates' ? 'text-blue-200' : 'text-slate-400'}`}>
                    Roster & TRF Dispatch
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                adminSection === 'candidates' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {candidates.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSection('speaking')}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                adminSection === 'speaking'
                  ? 'bg-[#df5647] text-white border-[#df5647] shadow-md shadow-red-600/15'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  adminSection === 'speaking' ? 'bg-white/15 text-white' : 'bg-red-50 text-[#df5647]'
                }`}>
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Speaking Evaluation Lab</div>
                  <div className={`text-[10px] ${adminSection === 'speaking' ? 'text-red-100' : 'text-slate-400'}`}>
                    Examiner Viva & Audio
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                adminSection === 'speaking' ? 'bg-white/20 text-white' : 'bg-red-50 text-[#df5647]'
              }`}>
                {attempts.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSection('builder')}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                adminSection === 'builder'
                  ? 'bg-[#0b2860] text-white border-[#0b2860] shadow-md shadow-blue-950/15'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  adminSection === 'builder' ? 'bg-white/15 text-white' : 'bg-blue-50 text-blue-700'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">Mock Test Builder</div>
                  <div className={`text-[10px] ${adminSection === 'builder' ? 'text-blue-200' : 'text-slate-400'}`}>
                    4-Module Exam Authoring
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                adminSection === 'builder' ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'
              }`}>
                Live
              </span>
            </button>
          </div>

          {/* Master Documents & Batch Exports */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
              Master Official Exports
            </span>

            <button
              onClick={() => generateBatchSummaryPdf(candidates, attempts)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all active:scale-98"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Master Batch PDF</span>
            </button>

            <button
              onClick={() => exportBatchSummaryCsv(candidates, attempts)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export Batch Summary CSV</span>
            </button>
          </div>

          {/* Database & Test Operations */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
              Testing & Database Control
            </span>

            <button
              onClick={handleClearDatabase}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-all"
              title="Clears all candidates and attempts to allow fresh student registration testing"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Clear Database (Fresh Start)</span>
            </button>

            <button
              onClick={handleLoadDemoData}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all"
              title="Load demo candidates for quick review"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>Load Sample Demo Data</span>
            </button>
          </div>

          {/* Navigation to Public Portal & Session Lock */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <Link
              href="/"
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                <span>Public Student Portal</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 text-xs font-bold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Faculty Session</span>
            </button>
          </div>
        </div>

        {/* Institutional Seal & Developer Card */}
        <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-2 text-center">
          <div className="font-bold text-[#0b2860] uppercase tracking-wider">
            BUBT TAFE IELTS Academy
          </div>
          <div>Faculty & Administration Hub • Room 307, Building 01</div>
          <div className="pt-2 border-t border-slate-200 text-slate-400">
            Developed by{' '}
            <a
              href="https://www.masrufrahman.info"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 font-bold hover:underline"
            >
              Masruf Rahman
            </a>
          </div>
        </div>
      </aside>
    </div>
  </main>

      {/* Footer */}
      <footer className="mt-auto py-5 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <p>BUBT TAFE IELTS Academy Staff Portal • Product of BUBT TAFE & Developed by Masruf Rahman ([www.masrufrahman.info](https://www.masrufrahman.info))</p>
      </footer>
    </div>
  );
}
