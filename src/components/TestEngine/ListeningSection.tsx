'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  FileText,
  Sliders,
  BellRing,
} from 'lucide-react';
import { QuestionItem } from '@/types';
import { LISTENING_QUESTIONS, LISTENING_AUDIO_SCRIPTS } from '@/lib/mock-data';

interface ListeningSectionProps {
  questions?: QuestionItem[];
  audioScripts?: Record<number, string>;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, val: string) => void;
  onComplete: () => void;
}

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  questions = LISTENING_QUESTIONS,
  audioScripts = LISTENING_AUDIO_SCRIPTS,
  answers,
  onAnswerChange,
  onComplete,
}) => {
  const [currentPart, setCurrentPart] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [soundChecked, setSoundChecked] = useState<boolean>(false);

  const totalDuration = 1800; // 30 minutes in seconds
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize SpeechSynthesis reference
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Play examination chime tone via Web Audio API
  const playChime = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // AudioContext fallback
    }
  };

  // Sound Check test
  const handleSoundCheck = () => {
    playChime();
    setSoundChecked(true);

    if (synthRef.current) {
      synthRef.current.cancel();
      const text = 'Audio check passed. BUBT TAFE IELTS Listening audio stream is loud and clear.';
      const testUtterance = new SpeechSynthesisUtterance(text);
      testUtterance.rate = 1.0;
      testUtterance.volume = isMuted ? 0 : volume;

      const voices = synthRef.current.getVoices();
      const engVoice = voices.find((v) => v.lang.startsWith('en-GB') || v.lang.startsWith('en-US')) || voices[0];
      if (engVoice) testUtterance.voice = engVoice;

      synthRef.current.speak(testUtterance);
    }
  };

  // Start reading the active section audio script
  const startSectionAudio = () => {
    if (!synthRef.current) {
      alert('Speech synthesis audio is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    synthRef.current.cancel();
    playChime();

    const script = audioScripts[currentPart] || LISTENING_AUDIO_SCRIPTS[currentPart] || '';
    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    utterance.rate = playbackSpeed;
    utterance.volume = isMuted ? 0 : volume;

    const voices = synthRef.current.getVoices();
    const britishVoice = voices.find((v) => v.lang.includes('en-GB') || v.name.includes('British') || v.name.includes('UK'));
    const englishVoice = voices.find((v) => v.lang.startsWith('en-')) || voices[0];
    utterance.voice = britishVoice || englishVoice || null;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current.paused) {
        synthRef.current.resume();
        setIsPlaying(true);
      } else {
        startSectionAudio();
      }
    }
  };

  const handleRestartAudio = () => {
    startSectionAudio();
  };

  // Switch part -> update audio
  const handlePartChange = (partNumber: number) => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentPart(partNumber);
  };

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Filter questions for current part
  const partQuestions = questions.filter((q) => {
    if (currentPart === 1) return q.questionNumber >= 1 && q.questionNumber <= 10;
    if (currentPart === 2) return q.questionNumber >= 11 && q.questionNumber <= 20;
    if (currentPart === 3) return q.questionNumber >= 21 && q.questionNumber <= 30;
    return q.questionNumber >= 31 && q.questionNumber <= 40;
  });

  const totalAnswered = Object.keys(answers).filter((k) => k.startsWith('l') && answers[k]?.trim().length > 0).length;

  return (
    <div className="space-y-6">
      {/* Listening Audio Control Header Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-[#0b2860] to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Audio status & Info */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-all ${
              isPlaying ? 'bg-[#df5647] text-white animate-pulse' : 'bg-white/10 text-white'
            }`}>
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#df5647] bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/60">
                  {isPlaying ? 'Audio Actively Playing' : 'Audio Paused / Ready'}
                </span>
                {isPlaying && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Narrating Section {currentPart}
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-1">
                BUBT TAFE Cambridge Listening Stream — Section {currentPart}
              </h2>
            </div>
          </div>

          {/* Quick Sound Check and Play Controls */}
          <div className="flex items-center flex-wrap gap-2.5 w-full lg:w-auto justify-start lg:justify-end">
            <button
              type="button"
              onClick={handleSoundCheck}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                soundChecked
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
              title="Test speaker or headphone output"
            >
              <BellRing className="w-3.5 h-3.5 text-amber-300" />
              <span>{soundChecked ? 'Sound Verified ✓' : '🔊 Test Speaker'}</span>
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black rounded-xl transition-all shadow-md active:scale-95 ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-[#df5647] hover:bg-red-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause Audio' : `Play Section ${currentPart} Audio`}</span>
            </button>

            <button
              type="button"
              onClick={handleRestartAudio}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              title="Restart Section Audio from Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-xl text-xs font-mono text-slate-300 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(playbackTime)}</span>
              <span className="text-slate-600">/</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>
        </div>

        {/* Audio Toolbar: Volume, Speed, Waveform & Transcript Button */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          {/* Animated Waveform Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Acoustic Signal:</span>
            <div className="flex items-end gap-1 h-5">
              {[40, 70, 90, 50, 80, 100, 60, 85, 45, 95, 65, 75].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying ? 'bg-[#df5647] animate-pulse' : 'bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying ? `${(h * (volume || 1)) / 100 * 20}px` : '4px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Volume & Speed Controls */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Speed Toggle */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/10">
              {[0.9, 1.0, 1.15].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setPlaybackSpeed(s);
                    if (isPlaying) startSectionAudio();
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                    playbackSpeed === s ? 'bg-[#df5647] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-300 hover:text-white"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#df5647]"
              />
            </div>

            {/* View Transcript Toggle */}
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>{showTranscript ? 'Hide Audio Script' : 'View Audio Script'}</span>
            </button>
          </div>
        </div>

        {/* Audio Script Transcript View (Collapsible) */}
        {showTranscript && (
          <div className="mt-3 p-4 rounded-2xl bg-black/60 border border-white/10 text-xs text-slate-200 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold text-amber-300 border-b border-white/10 pb-1.5">
              <span>Section {currentPart} Official Dialogue / Narration Script:</span>
              <span className="text-[10px] text-slate-400">Authentic Cambridge IELTS Dialogue</span>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-slate-300 font-serif text-[13px]">
              {audioScripts[currentPart] || LISTENING_AUDIO_SCRIPTS[currentPart]}
            </p>
          </div>
        )}
      </div>

      {/* Section Navigation Tabs & Progress */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((part) => (
            <button
              key={part}
              type="button"
              onClick={() => handlePartChange(part)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                currentPart === part
                  ? 'bg-[#0b2860] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Section {part}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                currentPart === part ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                Qs {part * 10 - 9}-{part * 10}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold">
            {totalAnswered}/40 Answered
          </div>

          <button
            type="button"
            onClick={() => {
              if (synthRef.current) synthRef.current.cancel();
              onComplete();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#df5647] hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Proceed to Reading Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Part Header & Instructions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-slate-900 text-lg">
              Section {currentPart} — Questions {currentPart * 10 - 9} to {currentPart * 10}
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Listen to the audio track above and write <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> for each answer.
            </p>
          </div>
          <span className="text-xs font-bold text-[#0b2860] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Cambridge 40-Q Battery
          </span>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {partQuestions.map((q) => {
            const currentVal = answers[q.id] || '';
            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#0b2860]/40 transition-all shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0b2860] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {q.questionNumber}
                  </span>

                  <div className="flex-1 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {q.prompt}
                    </p>

                    {q.type === 'multiple_choice' && q.options ? (
                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              currentVal === opt
                                ? 'bg-red-50/80 border-[#df5647] text-slate-950 font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={opt}
                              checked={currentVal === opt}
                              onChange={(e) => onAnswerChange(q.id, e.target.value)}
                              className="text-[#df5647] focus:ring-[#df5647]"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder="Type your answer here..."
                          value={currentVal}
                          onChange={(e) => onAnswerChange(q.id, e.target.value)}
                          className="w-full max-w-md px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] text-slate-900 font-semibold"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
