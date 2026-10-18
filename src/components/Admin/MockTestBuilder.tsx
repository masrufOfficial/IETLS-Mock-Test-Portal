'use client';

import React, { useState } from 'react';
import {
  PlusCircle,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Save,
  Trash2,
  CheckCircle2,
  Sparkles,
  FileText,
  Clock,
  Layers,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Edit,
  Volume2,
} from 'lucide-react';
import { MockTest, QuestionItem, ReadingPassage, WritingTasks, SpeakingSections } from '@/types';
import { saveMockTest, getMockTests, deleteMockTest } from '@/lib/storage';
import {
  LISTENING_QUESTIONS,
  READING_PASSAGES,
  WRITING_TASKS,
  SPEAKING_PROMPTS,
  LISTENING_AUDIO_SCRIPTS,
} from '@/lib/mock-data';

interface MockTestBuilderProps {
  onTestPublished: () => void;
}

export const MockTestBuilder: React.FC<MockTestBuilderProps> = ({ onTestPublished }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listening' | 'reading' | 'writing' | 'speaking' | 'manage'>('overview');
  
  // General Info
  const [testTitle, setTestTitle] = useState('BUBT TAFE Academic Mock 02 — Special Intake');
  const [testType, setTestType] = useState<'academic' | 'general'>('academic');
  const [badge, setBadge] = useState('Official Cambridge 2026');
  const [duration, setDuration] = useState('2h 45m');
  const [description, setDescription] = useState(
    'Complete computer-delivered IELTS simulation for Listening, Reading, Writing, and Speaking with certified Cambridge scoring.'
  );

  // Listening: 40 questions
  const [listeningQuestions, setListeningQuestions] = useState<QuestionItem[]>(LISTENING_QUESTIONS);
  const [activeListeningSection, setActiveListeningSection] = useState<1 | 2 | 3 | 4>(1);
  const [listeningAudioScripts, setListeningAudioScripts] = useState<Record<number, string>>(LISTENING_AUDIO_SCRIPTS);

  // Reading: 3 passages, 40 questions
  const [readingPassages, setReadingPassages] = useState<ReadingPassage[]>(READING_PASSAGES);
  const [activePassageIndex, setActivePassageIndex] = useState<number>(0);

  // Writing
  const [writingTasks, setWritingTasks] = useState<WritingTasks>(WRITING_TASKS);

  // Speaking
  const [speakingSections, setSpeakingSections] = useState<SpeakingSections>(SPEAKING_PROMPTS);

  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [allTests, setAllTests] = useState<MockTest[]>(getMockTests());

  const handlePreviewSpeech = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const sample = text.slice(0, 320);
      const utterance = new SpeechSynthesisUtterance(sample);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Browser speech synthesis is not supported.');
    }
  };

  const handleLoadPreset = () => {
    setTestTitle(`BUBT TAFE Academic Mock 0${allTests.length + 1} — Full Battery`);
    setBadge('Cambridge Authentic 2026');
    setListeningQuestions(LISTENING_QUESTIONS);
    setListeningAudioScripts(LISTENING_AUDIO_SCRIPTS);
    setReadingPassages(READING_PASSAGES);
    setWritingTasks(WRITING_TASKS);
    setSpeakingSections(SPEAKING_PROMPTS);
    alert('Loaded full Cambridge 40-question Listening & Reading preset with Writing & Speaking prompts!');
  };

  const handlePublishTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) {
      alert('Please enter a mock test title.');
      return;
    }

    const newId = `mock-${Date.now()}`;
    const newTest: MockTest = {
      id: newId,
      title: testTitle.trim(),
      badge: badge.trim() || 'BUBT TAFE Standard',
      duration: duration.trim() || '2h 45m',
      sectionsCount: 4,
      type: testType,
      description: description.trim(),
      createdAt: new Date().toISOString(),
      listeningQuestions: listeningQuestions,
      listeningAudioScripts: listeningAudioScripts,
      readingPassages: readingPassages,
      writingTasks: writingTasks,
      speakingSections: speakingSections,
    };

    saveMockTest(newTest);
    setAllTests(getMockTests());
    setPublishedSuccess(true);
    setTimeout(() => setPublishedSuccess(false), 3000);
    onTestPublished();
  };

  const handleDeleteTest = (id: string) => {
    if (confirm('Are you sure you want to delete this mock test from the portal?')) {
      deleteMockTest(id);
      setAllTests(getMockTests());
      onTestPublished();
    }
  };

  // Filter listening questions for current section
  const sectionQuestions = listeningQuestions.filter((q) => {
    if (activeListeningSection === 1) return q.questionNumber >= 1 && q.questionNumber <= 10;
    if (activeListeningSection === 2) return q.questionNumber >= 11 && q.questionNumber <= 20;
    if (activeListeningSection === 3) return q.questionNumber >= 21 && q.questionNumber <= 30;
    return q.questionNumber >= 31 && q.questionNumber <= 40;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0b2860] via-slate-900 to-[#df5647] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Exam Authoring & Question Management
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            IELTS Mock Test Question Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-medium">
            Create and configure full 4-module computer-delivered mock tests with authentic Cambridge question batteries. Tests published here appear live on the candidate portal immediately.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleLoadPreset}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/30 backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Load 40-Q Cambridge Preset</span>
          </button>
        </div>
      </div>

      {/* Main Authoring Canvas with LEFT SUB-SECTIONS and RIGHT EDITOR */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[720px]">
        
        {/* LEFT SUB-SECTIONS PANEL */}
        <aside className="w-full md:w-64 lg:w-72 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-1.5">
                Authoring Sub-Sections
              </span>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'overview'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>1. Test Overview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('listening')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'listening'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <Headphones className="w-4 h-4 text-[#df5647]" />
                  <span>2. Listening (40 Qs)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('reading')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'reading'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-[#df5647]" />
                  <span>3. Reading (3 Passages)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('writing')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'writing'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <PenTool className="w-4 h-4 text-[#df5647]" />
                  <span>4. Writing (Tasks 1 & 2)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('speaking')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'speaking'
                      ? 'bg-[#0b2860] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <Mic className="w-4 h-4 text-[#df5647]" />
                  <span>5. Speaking Prompts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    activeTab === 'manage'
                      ? 'bg-[#df5647] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white hover:text-slate-950'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Active Test Bank ({allTests.length})</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block px-1">
                Quick Template
              </span>
              <button
                type="button"
                onClick={handleLoadPreset}
                className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Load 40-Q Cambridge Preset</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT / MAIN AUTHORING FORM */}
        <form onSubmit={handlePublishTest} className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Mock Test Identity & Parameters
                </h3>
                <p className="text-xs text-slate-500">
                  Configure the primary title, difficulty badge, and candidate instructions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Test Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="e.g. BUBT TAFE Academic Mock 02"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Badge / Tag <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Official Cambridge 2026"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Examination Stream
                  </label>
                  <select
                    value={testType}
                    onChange={(e) => setTestType(e.target.value as 'academic' | 'general')}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-medium text-slate-900"
                  >
                    <option value="academic">IELTS Academic (University Degree / Higher Education)</option>
                    <option value="general">IELTS General Training (Migration / Work Visa)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Total Duration
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="2h 45m"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Test Description / Candidate Briefing
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-medium text-slate-900 leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: LISTENING (40 Questions) */}
          {activeTab === 'listening' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Listening Module Questions (40 Total)
                  </h3>
                  <p className="text-xs text-slate-500">
                    4 sections with answer keys used by the automatic scoring engine.
                  </p>
                </div>

                {/* Section Filter Pills */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {([1, 2, 3, 4] as const).map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setActiveListeningSection(sec)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeListeningSection === sec
                          ? 'bg-[#0b2860] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Section {sec} (Q{sec === 1 ? '1-10' : sec === 2 ? '11-20' : sec === 3 ? '21-30' : '31-40'})
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Narration Audio Script */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/90 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#0b2860]" />
                    <span className="text-xs font-black text-[#0b2860]">
                      Section {activeListeningSection} Narration Audio Dialogue
                    </span>
                    <span className="text-[10px] bg-white border border-blue-200 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                      Drives Exam Audio Voice
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePreviewSpeech(listeningAudioScripts[activeListeningSection] || '')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0b2860] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs w-fit"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>🔊 Test Voice Narration</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  This conversation transcript is spoken aloud to candidates with British/Cambridge examination pacing during their Listening test.
                </p>

                <textarea
                  rows={4}
                  value={listeningAudioScripts[activeListeningSection] || ''}
                  onChange={(e) => {
                    setListeningAudioScripts({
                      ...listeningAudioScripts,
                      [activeListeningSection]: e.target.value,
                    });
                  }}
                  placeholder="Enter the conversational dialogue and examiner instructions for this section..."
                  className="w-full p-3 text-xs bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] font-sans text-slate-800 leading-relaxed"
                />
              </div>

              {/* Question list for active section */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {sectionQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 rounded-lg bg-[#0b2860] text-white font-black text-xs flex items-center justify-center">
                        Q{q.questionNumber}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {q.type}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Question Prompt
                      </label>
                      <input
                        type="text"
                        value={q.prompt}
                        onChange={(e) => {
                          const updated = [...listeningQuestions];
                          const targetIdx = updated.findIndex((item) => item.id === q.id);
                          if (targetIdx >= 0) {
                            updated[targetIdx] = { ...updated[targetIdx], prompt: e.target.value };
                            setListeningQuestions(updated);
                          }
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 font-medium"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] font-bold text-emerald-700 mb-1">
                          Correct Answer (Auto-graded key)
                        </label>
                        <input
                          type="text"
                          value={q.correctAnswer}
                          onChange={(e) => {
                            const updated = [...listeningQuestions];
                            const targetIdx = updated.findIndex((item) => item.id === q.id);
                            if (targetIdx >= 0) {
                              updated[targetIdx] = { ...updated[targetIdx], correctAnswer: e.target.value };
                              setListeningQuestions(updated);
                            }
                          }}
                          className="w-full px-3 py-1.5 text-xs bg-emerald-50/60 border border-emerald-200 rounded-lg text-emerald-950 font-bold font-mono"
                        />
                      </div>

                      {q.options && q.options.length > 0 && (
                        <div className="flex-1">
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">
                            MCQ Options (Separated by |)
                          </label>
                          <input
                            type="text"
                            value={q.options.join(' | ')}
                            onChange={(e) => {
                              const updated = [...listeningQuestions];
                              const targetIdx = updated.findIndex((item) => item.id === q.id);
                              if (targetIdx >= 0) {
                                updated[targetIdx] = {
                                  ...updated[targetIdx],
                                  options: e.target.value.split('|').map((s) => s.trim()),
                                };
                                setListeningQuestions(updated);
                              }
                            }}
                            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: READING (3 Passages) */}
          {activeTab === 'reading' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Academic Reading Passages (3 Passages, 40 Qs)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete reading texts and split-screen interactive highlighter prompts.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {readingPassages.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePassageIndex(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activePassageIndex === idx
                          ? 'bg-[#0b2860] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Passage {idx + 1} ({p.questions.length} Qs)
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Passage Editor */}
              {readingPassages[activePassageIndex] && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Passage {activePassageIndex + 1} Title
                    </label>
                    <input
                      type="text"
                      value={readingPassages[activePassageIndex].title}
                      onChange={(e) => {
                        const updated = [...readingPassages];
                        updated[activePassageIndex].title = e.target.value;
                        setReadingPassages(updated);
                      }}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Passage Text (Candidates read & highlight this)
                    </label>
                    <textarea
                      rows={8}
                      value={readingPassages[activePassageIndex].content}
                      onChange={(e) => {
                        const updated = [...readingPassages];
                        updated[activePassageIndex].content = e.target.value;
                        setReadingPassages(updated);
                      }}
                      className="w-full p-3 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-800 leading-relaxed font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Passage {activePassageIndex + 1} Questions ({readingPassages[activePassageIndex].questions.length})
                    </label>

                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                      {readingPassages[activePassageIndex].questions.map((q) => (
                        <div
                          key={q.id}
                          className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <span className="w-6 h-6 rounded bg-[#0b2860] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              Q{q.questionNumber}
                            </span>
                            <span className="text-slate-800 font-medium truncate">
                              {q.prompt}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-slate-400">Answer:</span>
                            <input
                              type="text"
                              value={q.correctAnswer}
                              onChange={(e) => {
                                const updated = [...readingPassages];
                                const qIdx = updated[activePassageIndex].questions.findIndex(
                                  (item) => item.id === q.id
                                );
                                if (qIdx >= 0) {
                                  updated[activePassageIndex].questions[qIdx].correctAnswer = e.target.value;
                                  setReadingPassages(updated);
                                }
                              }}
                              className="w-28 px-2 py-1 text-xs bg-emerald-50 border border-emerald-300 rounded text-emerald-950 font-bold font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: WRITING */}
          {activeTab === 'writing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Writing Tasks 1 & 2 Prompts
                </h3>
                <p className="text-xs text-slate-500">
                  Configure Task 1 visual report instructions and Task 2 discursive essay topics.
                </p>
              </div>

              {/* Task 1 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#0b2860] bg-blue-100/70 px-2.5 py-0.5 rounded">
                    Task 1 (Visual / Academic Report &bull; 150 Words)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Recommended: 20 Mins</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Task 1 Prompt Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={writingTasks.task1.instructions}
                    onChange={(e) =>
                      setWritingTasks({
                        ...writingTasks,
                        task1: { ...writingTasks.task1, instructions: e.target.value },
                      })
                    }
                    className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Task 2 */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#df5647] bg-red-100/70 px-2.5 py-0.5 rounded">
                    Task 2 (Discursive Essay &bull; 250 Words)
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Recommended: 40 Mins</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Task 2 Essay Debate Question
                  </label>
                  <textarea
                    rows={4}
                    value={writingTasks.task2.instructions}
                    onChange={(e) =>
                      setWritingTasks({
                        ...writingTasks,
                        task2: { ...writingTasks.task2, instructions: e.target.value },
                      })
                    }
                    className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SPEAKING PROMPTS */}
          {activeTab === 'speaking' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Speaking Module Prompts & Cue Card
                </h3>
                <p className="text-xs text-slate-500">
                  Prompts presented to candidates during in-portal audio recording or examiner interview.
                </p>
              </div>

              {/* Part 1 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-[#0b2860] uppercase block">
                  Part 1: Introduction & Interview
                </span>
                <textarea
                  rows={3}
                  value={speakingSections.part1.questions.join('\n')}
                  onChange={(e) =>
                    setSpeakingSections({
                      ...speakingSections,
                      part1: {
                        ...speakingSections.part1,
                        questions: e.target.value.split('\n').filter(Boolean),
                      },
                    })
                  }
                  placeholder="One question per line..."
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>

              {/* Part 2 Cue Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-[#df5647] uppercase block">
                  Part 2: Cue Card Challenge Topic
                </span>
                <input
                  type="text"
                  value={speakingSections.part2.cueCard.topic}
                  onChange={(e) =>
                    setSpeakingSections({
                      ...speakingSections,
                      part2: {
                        ...speakingSections.part2,
                        cueCard: {
                          ...speakingSections.part2.cueCard,
                          topic: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-bold"
                />

                <label className="block text-[11px] font-bold text-slate-500 mt-2">
                  Bullet Prompts (One per line)
                </label>
                <textarea
                  rows={3}
                  value={speakingSections.part2.cueCard.bulletPoints.join('\n')}
                  onChange={(e) =>
                    setSpeakingSections({
                      ...speakingSections,
                      part2: {
                        ...speakingSections.part2,
                        cueCard: {
                          ...speakingSections.part2.cueCard,
                          bulletPoints: e.target.value.split('\n').filter(Boolean),
                        },
                      },
                    })
                  }
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>

              {/* Part 3 */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-[#0b2860] uppercase block">
                  Part 3: Two-Way Analytical Discussion Prompts
                </span>
                <textarea
                  rows={3}
                  value={speakingSections.part3.questions.join('\n')}
                  onChange={(e) =>
                    setSpeakingSections({
                      ...speakingSections,
                      part3: {
                        ...speakingSections.part3,
                        questions: e.target.value.split('\n').filter(Boolean),
                      },
                    })
                  }
                  placeholder="One question per line..."
                  className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 font-medium"
                />
              </div>
            </div>
          )}

          {/* TAB 6: MANAGE PUBLISHED TESTS */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Currently Active Mock Tests ({allTests.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tests published here are live in the candidate examination portal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#df5647] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded">
                          {t.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {t.duration}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-2">
                        {t.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {t.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400">
                        {t.createdAt ? `Published: ${new Date(t.createdAt).toLocaleDateString()}` : 'Default Suite'}
                      </span>
                      {allTests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteTest(t.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Mock Test"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Submit Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">
              {publishedSuccess ? (
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Mock Test Published Live to BUBT TAFE Portal!
                </span>
              ) : (
                <span className="text-slate-400 text-[11px]">
                  All questions and answer keys will be immediately available to registered candidates.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#df5647] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Publish Full Mock Test to Student Portal</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
