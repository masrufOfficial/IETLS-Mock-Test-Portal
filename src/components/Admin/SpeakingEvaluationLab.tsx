'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Award,
  Clock,
  User,
  School,
  FileText,
  Search,
  Sparkles,
  Download,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Candidate, TestAttempt } from '@/types';
import { updateAttemptEvaluation } from '@/lib/storage';
import { generateCandidateTRFPdf } from '@/lib/pdf-generator';

interface SpeakingEvaluationLabProps {
  candidates: Candidate[];
  attempts: TestAttempt[];
  onDataUpdated: () => void;
}

export const SpeakingEvaluationLab: React.FC<SpeakingEvaluationLabProps> = ({
  candidates,
  attempts,
  onDataUpdated,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'evaluated'>('all');
  const [selectedAttemptId, setSelectedAttemptId] = useState<string>(
    attempts.length > 0 ? attempts[0].id : ''
  );

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePart, setActivePart] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioProgress, setAudioProgress] = useState<number>(24); // simulated progress %

  // Examiner Criteria Scores
  const selectedAttempt = attempts.find((a) => a.id === selectedAttemptId) || attempts[0];
  const selectedCandidate = selectedAttempt
    ? candidates.find((c) => c.id === selectedAttempt.candidateId)
    : null;

  const [fcScore, setFcScore] = useState<number>(
    selectedAttempt?.scores.speaking.fcScore || 7.0
  );
  const [lrScore, setLrScore] = useState<number>(
    selectedAttempt?.scores.speaking.lrScore || 7.0
  );
  const [graScore, setGraScore] = useState<number>(
    selectedAttempt?.scores.speaking.graScore || 7.0
  );
  const [prScore, setPrScore] = useState<number>(
    selectedAttempt?.scores.speaking.prScore || 7.0
  );
  const [examinerNotes, setExaminerNotes] = useState<string>(
    selectedAttempt?.scores.speaking.feedback ||
      'Candidate demonstrated fluent self-expression with spontaneous response handling across Part 2 cue card.'
  );

  const [saveSuccess, setSaveSuccess] = useState(false);

  // When candidate selection changes
  const handleSelectAttempt = (attempt: TestAttempt) => {
    setSelectedAttemptId(attempt.id);
    setFcScore(attempt.scores.speaking.fcScore || 7.0);
    setLrScore(attempt.scores.speaking.lrScore || 7.0);
    setGraScore(attempt.scores.speaking.graScore || 7.0);
    setPrScore(attempt.scores.speaking.prScore || 7.0);
    setExaminerNotes(
      attempt.scores.speaking.feedback ||
        'Candidate speech captured during examination session. Ready for Cambridge rubric scoring.'
    );
    setIsPlaying(false);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getActiveAudioUrl = () => {
    const recordings = selectedAttempt?.scores?.speaking?.recordings;
    if (!recordings) return null;
    if (activePart === 'part1') return recordings.part1AudioUrl;
    if (activePart === 'part2') return recordings.part2AudioUrl;
    if (activePart === 'part3') return recordings.part3AudioUrl;
    return null;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setAudioProgress(0);
  }, [activePart, selectedAttemptId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleTogglePlay = () => {
    const audioUrl = getActiveAudioUrl();

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (audioUrl && audioUrl.startsWith('data:audio')) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      } else {
        audioRef.current.src = audioUrl;
      }

      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current && audioRef.current.duration) {
          setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setAudioProgress(100);
      };

      audioRef.current.play().catch((err) => {
        console.warn('Audio playback error:', err);
      });
      setIsPlaying(true);
    } else {
      // SpeechSynthesis narration fallback
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const candName = selectedCandidate ? selectedCandidate.name : 'Candidate';
        let sampleText = '';
        if (activePart === 'part1') {
          sampleText = `Candidate response for Part 1 by ${candName}. I am enrolled at BUBT, and preparing for the IELTS examination has enhanced my academic English fluency, particularly in seminar presentations and formal discussions.`;
        } else if (activePart === 'part2') {
          sampleText = `Candidate response for Part 2 cue card by ${candName}. A significant academic challenge I encountered was managing a major research software project under tight deadlines. I coordinated with team members, delegated technical modules, and successfully delivered the prototype on schedule.`;
        } else {
          sampleText = `Candidate response for Part 3 two-way discussion by ${candName}. In my view, higher education institutions must balance theoretical foundations with hands-on problem solving to best equip graduates for international careers.`;
        }

        const utterance = new SpeechSynthesisUtterance(sampleText);
        utterance.rate = playbackSpeed;
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioProgress(100);
        };
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      setAudioProgress(0);
      handleTogglePlay();
    }
  };

  // Real-time Cambridge Band rounding calculation
  const rawAvg = (fcScore + lrScore + graScore + prScore) / 4;
  const decimal = rawAvg - Math.floor(rawAvg);
  let computedSpeakingBand: number;
  if (decimal < 0.25) {
    computedSpeakingBand = Math.floor(rawAvg);
  } else if (decimal < 0.75) {
    computedSpeakingBand = Math.floor(rawAvg) + 0.5;
  } else {
    computedSpeakingBand = Math.floor(rawAvg) + 1.0;
  }

  const handleSaveEvaluation = () => {
    if (!selectedAttempt) return;

    updateAttemptEvaluation(selectedAttempt.id, {
      speakingBand: computedSpeakingBand,
      speakingFeedback: examinerNotes,
      fcScore: fcScore,
      lrScore: lrScore,
      graScore: graScore,
      prScore: prScore,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
    onDataUpdated();
  };

  const filteredAttempts = attempts.filter((att) => {
    const cand = candidates.find((c) => c.id === att.candidateId);
    const matchesSearch =
      att.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cand && cand.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cand && cand.university.toLowerCase().includes(searchTerm.toLowerCase()));

    const isEval = att.scores.speaking.bandScore && att.scores.speaking.bandScore > 0;
    if (filterMode === 'pending') return matchesSearch && !isEval;
    if (filterMode === 'evaluated') return matchesSearch && isEval;
    return matchesSearch;
  });

  const quickSnippets = [
    '✨ Fluent discourse with minimal hesitation; idiomatic precision across Part 2 & 3.',
    '⚡ Good conversational tempo; occasional grammatical slip under complex sentence formation.',
    '🎯 Excellent pronunciation clarity and intonation; robust vocabulary in academic discourse.',
    '📌 Minor repetition in Part 1; recovered well in Cue Card with cohesive connectors.',
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b2860] via-slate-900 to-[#df5647] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              BUBT TAFE Speaking Evaluation Suite
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Examiner Viva & Audio Scoring Lab
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium">
            Review candidate voice recordings, assess across the 4 Cambridge assessment criteria (FC, LR, GRA, PR), and moderate official speaking band scores for Room 307 TRF issuance.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0">
          <div className="text-[11px] text-slate-200 font-bold uppercase tracking-wider">
            Current Speaking Submissions
          </div>
          <div className="text-3xl font-black text-white mt-0.5">
            {attempts.length}
          </div>
          <div className="text-[10px] text-amber-300 font-medium">
            Room 307 Certified Evaluation
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Queue, Right Evaluation Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Candidate Submissions Queue (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[750px]">
          {/* Search & Filter */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] text-slate-900"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => setFilterMode('all')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                All ({attempts.length})
              </button>
              <button
                onClick={() => setFilterMode('pending')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'pending'
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterMode('evaluated')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'evaluated'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Evaluated
              </button>
            </div>
          </div>

          {/* Candidate List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
            {filteredAttempts.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No speaking submissions found matching criteria.
              </div>
            ) : (
              filteredAttempts.map((att) => {
                const cand = candidates.find((c) => c.id === att.candidateId);
                const isSelected = att.id === selectedAttemptId;
                const spBand = att.scores.speaking.bandScore;

                return (
                  <button
                    key={att.id}
                    onClick={() => handleSelectAttempt(att)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 border-2 border-[#0b2860] shadow-sm'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#0b2860] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {cand ? cand.name.charAt(0) : 'C'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {cand ? cand.name : att.candidateId}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          ID: {att.candidateId}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {cand ? cand.university : 'BUBT TAFE'}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                          spBand >= 7.0
                            ? 'bg-emerald-100 text-emerald-800'
                            : spBand > 0
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {spBand > 0 ? `Band ${spBand.toFixed(1)}` : 'Pending'}
                      </span>
                      <div className="text-[9px] text-slate-400 mt-1">
                        {new Date(att.startedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Speaking Evaluation Studio (col-span-8) */}
        {selectedAttempt && selectedCandidate ? (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Candidate Dossier Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b2860] to-blue-800 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">
                      {selectedCandidate.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      {selectedCandidate.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedCandidate.university} &bull; Target Band: <strong>{selectedCandidate.targetBand || 7.5}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => generateCandidateTRFPdf(selectedCandidate, selectedAttempt)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print TRF</span>
                </button>
              </div>
            </div>

            {/* AUDIO REVIEW CONSOLE */}
            <div className="bg-[#fbf9f5] rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#df5647]" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Candidate Audio Speech Review
                  </span>
                </div>

                {/* Part Switcher */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-2xs">
                  <button
                    onClick={() => setActivePart('part1')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activePart === 'part1'
                        ? 'bg-[#0b2860] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Part 1: Interview
                  </button>
                  <button
                    onClick={() => setActivePart('part2')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activePart === 'part2'
                        ? 'bg-[#0b2860] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Part 2: Cue Card
                  </button>
                  <button
                    onClick={() => setActivePart('part3')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      activePart === 'part3'
                        ? 'bg-[#0b2860] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Part 3: Discussion
                  </button>
                </div>
              </div>

              {/* Player Waveform & Controls */}
              <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>
                    Track: {activePart.toUpperCase()} &bull; Captured Audio Stream
                  </span>
                  <span>02:14 / 04:30</span>
                </div>

                {/* Simulated Audio Waveform Visualizer */}
                <div className="h-10 bg-slate-50 rounded-lg flex items-center justify-center gap-1 px-3 border border-slate-100 overflow-hidden">
                  {[20, 45, 75, 30, 85, 95, 60, 40, 70, 80, 50, 65, 90, 35, 60, 80, 45, 70, 95, 60, 40, 80, 55, 35, 75, 90, 65, 45, 80, 70, 40, 60, 85, 50, 75, 90, 60, 40, 30].map(
                    (height, i) => (
                      <span
                        key={i}
                        style={{ height: `${height}%` }}
                        className={`w-1 rounded-full transition-all ${
                          i < (audioProgress / 100) * 39
                            ? 'bg-[#df5647]'
                            : 'bg-slate-200'
                        }`}
                      />
                    )
                  )}
                </div>

                {/* Playback Button & Speed Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="w-10 h-10 rounded-xl bg-[#df5647] hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-all active:scale-95"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleReplay}
                      className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-semibold text-slate-600 pl-2">
                      {isPlaying ? 'Playing candidate voice audio...' : 'Paused'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-400 font-medium">Speed:</span>
                    {[1, 1.25, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2 py-0.5 rounded-md font-bold ${
                          playbackSpeed === spd
                            ? 'bg-[#0b2860] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cue Card Prompt for Active Part */}
              <div className="text-xs bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 text-amber-950 space-y-1">
                <span className="font-bold block">
                  Examiner Question Context ({activePart === 'part1' ? 'Part 1' : activePart === 'part2' ? 'Part 2 Cue Card' : 'Part 3 Discussion'}):
                </span>
                <p className="text-[11px] text-slate-700">
                  {activePart === 'part1' &&
                    '"Could you describe your field of study at BUBT and how technology has changed your learning environment?"'}
                  {activePart === 'part2' &&
                    '"Describe a significant academic or personal challenge you encountered and successfully overcame. You should say what the challenge was, how you approached it, and what you learned."'}
                  {activePart === 'part3' &&
                    '"Do you think modern educational institutions focus sufficiently on resilience and problem-solving, or is the emphasis still largely on memorization?"'}
                </p>
              </div>
            </div>

            {/* CAMBRIDGE 4-CRITERIA SCORING MATRIX */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="font-black text-sm text-slate-900 uppercase tracking-wider">
                  Cambridge 4-Criterion Evaluation Console
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Calculated Speaking Band:
                  </span>
                  <span className="text-base font-black px-3 py-0.5 rounded-lg bg-[#df5647] text-white shadow-xs">
                    Band {computedSpeakingBand.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Fluency & Coherence */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        1. Fluency & Coherence (FC)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Speech rate, hesitation, connectors
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0b2860]">
                      {fcScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setFcScore(score)}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md border transition-all ${
                          fcScore === score
                            ? 'bg-[#0b2860] text-white border-[#0b2860]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Lexical Resource */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        2. Lexical Resource (LR)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Vocabulary range, idioms, collocations
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0b2860]">
                      {lrScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setLrScore(score)}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md border transition-all ${
                          lrScore === score
                            ? 'bg-[#0b2860] text-white border-[#0b2860]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Grammatical Range & Accuracy */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        3. Grammatical Range (GRA)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Complex clauses, error density, tenses
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0b2860]">
                      {graScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setGraScore(score)}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md border transition-all ${
                          graScore === score
                            ? 'bg-[#0b2860] text-white border-[#0b2860]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Pronunciation */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">
                        4. Pronunciation (PR)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Intonation, stress, intelligibility
                      </span>
                    </div>
                    <span className="font-mono font-black text-sm px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0b2860]">
                      {prScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setPrScore(score)}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md border transition-all ${
                          prScore === score
                            ? 'bg-[#0b2860] text-white border-[#0b2860]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* EXAMINER QUALITATIVE COMMENTARY */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Official Examiner Commentary & Observation
              </label>
              <textarea
                rows={3}
                value={examinerNotes}
                onChange={(e) => setExaminerNotes(e.target.value)}
                placeholder="Enter qualitative assessment of candidate's speaking proficiency..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] text-slate-900 font-medium leading-relaxed"
              />

              {/* Quick-insert snippets */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Quick Comments:
                </span>
                {quickSnippets.map((snip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setExaminerNotes(snip)}
                    className="text-[10px] text-slate-600 hover:text-[#0b2860] bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded transition-colors"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS & NOTIFICATIONS */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                {saveSuccess ? (
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Speaking Band {computedSpeakingBand.toFixed(1)} Saved & Moderated!
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">
                    Updates candidate's official TRF score in Room 307 archive.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveEvaluation}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#0b2860] hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/10 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Authorize & Save Speaking Band ({computedSpeakingBand.toFixed(1)})</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
            Select a candidate from the queue to open their Speaking Evaluation Studio.
          </div>
        )}

      </div>
    </div>
  );
};
