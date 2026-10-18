'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Play,
  Square,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
  Volume2,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { SpeakingSections } from '@/types';
import { SPEAKING_PROMPTS } from '@/lib/mock-data';

interface SpeakingSectionProps {
  prompts?: SpeakingSections;
  onCompleteTest: (speakingData: {
    mode: 'audio_record' | 'examiner_interview';
    recordings?: { part1AudioUrl?: string; part2AudioUrl?: string; part3AudioUrl?: string };
    bandScore?: number;
    feedback?: string;
  }) => void;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({ prompts = SPEAKING_PROMPTS, onCompleteTest }) => {
  const [speakingMode, setSpeakingMode] = useState<'audio_record' | 'examiner_interview'>('audio_record');
  const [activePart, setActivePart] = useState<'part1' | 'part2' | 'part3'>('part1');

  const allPrompts = prompts || SPEAKING_PROMPTS;

  // Real MediaRecorder & Audio states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudios, setRecordedAudios] = useState<{ part1?: string; part2?: string; part3?: string }>({});
  const [micError, setMicError] = useState<string | null>(null);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Cue Card Prep Timer
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number>(60);
  const [isPrepping, setIsPrepping] = useState<boolean>(false);
  const [candidateNotes, setCandidateNotes] = useState<string>('');

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Prep timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPrepping && prepSecondsLeft > 0) {
      interval = setInterval(() => {
        setPrepSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsPrepping(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPrepping, prepSecondsLeft]);

  // Stop tracks on unmount
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startActualRecording = async (part: 'part1' | 'part2' | 'part3') => {
    setMicError(null);
    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone API is not supported in this browser environment.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];

      let mimeType = 'audio/webm';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          setRecordedAudios((prev) => ({
            ...prev,
            [part]: base64Data,
          }));
        };
        reader.readAsDataURL(audioBlob);

        // Stop stream tracks
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((t) => t.stop());
          mediaStreamRef.current = null;
        }
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);
      setIsFallbackMode(false);
    } catch (err: any) {
      console.warn('Microphone permission or hardware error:', err);
      setMicError(
        err.message || 'Microphone access denied. You may allow mic permissions or use simulated recording mode.'
      );
      // Fallback to simulated audio recording
      setIsRecording(true);
      setRecordingSeconds(0);
      setIsFallbackMode(true);
    }
  };

  const stopActualRecording = (part: 'part1' | 'part2' | 'part3') => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.error('Error stopping recorder:', e);
      }
    } else if (isFallbackMode) {
      // Create a lightweight simulated data URI for fallback
      const simulatedDataUri = `data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=`;
      setRecordedAudios((prev) => ({
        ...prev,
        [part]: simulatedDataUri,
      }));
    }

    setIsRecording(false);
  };

  const toggleRecording = (part: 'part1' | 'part2' | 'part3') => {
    if (isRecording) {
      stopActualRecording(part);
    } else {
      startActualRecording(part);
    }
  };

  const handleFinish = () => {
    if (speakingMode === 'examiner_interview') {
      onCompleteTest({
        mode: 'examiner_interview',
        bandScore: 7.0,
        feedback: 'Scheduled for in-person examiner interview at BUBT TAFE Academy (Room 307, Building 01).',
      });
    } else {
      onCompleteTest({
        mode: 'audio_record',
        recordings: {
          part1AudioUrl: recordedAudios.part1 || 'simulated-part1.wav',
          part2AudioUrl: recordedAudios.part2 || 'simulated-part2.wav',
          part3AudioUrl: recordedAudios.part3 || 'simulated-part3.wav',
        },
        bandScore: 7.5,
        feedback: 'Candidate audio recorded and transmitted to Room 307 examiner evaluation board for scoring.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Mode Selector */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-700">
              IELTS Speaking Module (11 – 14 Minutes)
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Audio Simulation or Scheduled Examiner Interview
            </h3>
          </div>
        </div>

        {/* Dual Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setSpeakingMode('audio_record')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              speakingMode === 'audio_record'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            In-Portal Audio Test (Recommended)
          </button>
          <button
            onClick={() => setSpeakingMode('examiner_interview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              speakingMode === 'examiner_interview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Take Separately / Offline
          </button>
        </div>
      </div>

      {speakingMode === 'examiner_interview' ? (
        /* Offline Option / Take Separately View */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center mx-auto">
            <Calendar className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Speaking Test Scheduled Separately
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As requested, you can sit your Speaking test separately with an official BUBT TAFE IELTS examiner (either face-to-face at the BUBT Campus or via a live 1-on-1 Zoom interview).
          </p>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Test Venue:</span>
              <span className="font-bold text-slate-900">BUBT TAFE Examination Room 307, Building 01</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Duration:</span>
              <span className="font-bold text-slate-900">11 to 14 Minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-slate-500">Evaluation:</span>
              <span className="font-bold text-red-700">Admin will enter speaking score in dashboard</span>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={handleFinish}
              className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md shadow-red-700/20 transition-all active:scale-95"
            >
              Submit Written Modules & Generate Initial TRF
            </button>
          </div>
        </div>
      ) : (
        /* In-Portal Audio Simulation View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 3-Part Navigation */}
          <div className="lg:col-span-4 space-y-3">
            <div
              onClick={() => setActivePart('part1')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activePart === 'part1'
                  ? 'bg-red-50/80 border-red-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-red-700">Part 1</span>
                {recordedAudios.part1 ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">4-5 mins</span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900">Introduction & Everyday Topics</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Studies, technology, daily life</p>
            </div>

            <div
              onClick={() => setActivePart('part2')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activePart === 'part2'
                  ? 'bg-red-50/80 border-red-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-red-700">Part 2</span>
                {recordedAudios.part2 ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">3-4 mins</span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900">Long Turn / Cue Card</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">1-min preparation + 2-min speech</p>
            </div>

            <div
              onClick={() => setActivePart('part3')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activePart === 'part3'
                  ? 'bg-red-50/80 border-red-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-red-700">Part 3</span>
                {recordedAudios.part3 ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Recorded
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">4-5 mins</span>
                )}
              </div>
              <h4 className="text-xs font-bold text-slate-900">Two-Way Discussion</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Abstract & thematic follow-ups</p>
            </div>

            {/* Complete Test CTA */}
            <div className="pt-3">
              <button
                onClick={handleFinish}
                className="w-full py-3 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl shadow-md shadow-red-700/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                Finish Full Mock Test & View TRF
              </button>
            </div>
          </div>

          {/* Right Column: Audio Recording Station */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            {/* Header info */}
            <div>
              <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
                {activePart === 'part1'
                  ? 'PART 1 INTERVIEW'
                  : activePart === 'part2'
                  ? 'PART 2 CUE CARD'
                  : 'PART 3 DISCUSSION'}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {activePart === 'part1'
                  ? allPrompts.part1.title
                  : activePart === 'part2'
                  ? allPrompts.part2.title
                  : allPrompts.part3.title}
              </h3>
            </div>

            {/* Content per Part */}
            {activePart === 'part1' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  Listen or read each question below and record your spoken answer:
                </p>
                <div className="space-y-2">
                  {allPrompts.part1.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePart === 'part2' && (
              <div className="space-y-4">
                {/* Cue Card Container */}
                <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-800">
                    Candidate Cue Card Topic
                  </h4>
                  <p className="text-sm font-bold text-slate-900">
                    {allPrompts.part2.cueCard.topic}
                  </p>
                  <div className="space-y-1 text-xs text-slate-700">
                    <p className="font-semibold text-slate-800">You should say:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600">
                      {allPrompts.part2.cueCard.bulletPoints.map((bp, i) => (
                        <li key={i}>{bp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 1-Minute Prep Timer & Scratchpad */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      1-Minute Preparation Countdown
                    </span>
                    <button
                      onClick={() => setIsPrepping(!isPrepping)}
                      className="px-3 py-1 bg-slate-900 text-white text-[11px] font-bold rounded-lg"
                    >
                      {isPrepping ? 'Pause Prep Timer' : 'Start 1-Min Prep'}
                    </button>
                  </div>

                  <div className="text-xl font-bold font-mono text-red-700">
                    {prepSecondsLeft > 0 ? `00:${prepSecondsLeft.toString().padStart(2, '0')}` : 'Prep Time Finished! Please Speak.'}
                  </div>

                  <textarea
                    rows={3}
                    placeholder="Candidate scratchpad: Note down bullet point keywords here..."
                    value={candidateNotes}
                    onChange={(e) => setCandidateNotes(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-700"
                  />
                </div>
              </div>
            )}

            {activePart === 'part3' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  {allPrompts.part3.description}
                </p>
                <div className="space-y-2">
                  {allPrompts.part3.questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Microphone Audio Recorder Box */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800 text-center">
              {micError && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Microphone Notice:</span>
                    <span>{micError} Fallback test response enabled so you can continue without hardware interruption.</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3">
                {isRecording ? (
                  <div className="flex items-center gap-1.5 h-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                      <span
                        key={bar}
                        className="w-1.5 bg-emerald-400 rounded-full animate-bounce"
                        style={{
                          height: `${Math.sin(bar * 0.8) * 16 + 18}px`,
                          animationDelay: `${bar * 100}ms`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <Mic className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-mono text-slate-400">
                  {isRecording
                    ? 'LIVE AUDIO RECORDING IN PROGRESS'
                    : recordedAudios[activePart]
                    ? 'ANSWER RECORDED — READY FOR REVIEW'
                    : 'READY TO RECORD SPEECH'}
                </p>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {`00:${recordingSeconds.toString().padStart(2, '0')}`}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => toggleRecording(activePart)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-md ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Stop & Save Recording' : recordedAudios[activePart] ? 'Re-record Answer' : 'Start Recording Answer'}
                </button>
              </div>

              {/* Audio Playback Review for Candidate */}
              {recordedAudios[activePart] && !isRecording && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Listen to your captured audio response:
                  </span>
                  <div className="flex justify-center">
                    <audio
                      controls
                      src={recordedAudios[activePart]}
                      className="w-full max-w-sm rounded-lg h-9 accent-red-600"
                    />
                  </div>
                </div>
              )}

              <p className="text-[10px] text-slate-400">
                Audio is stored and transmitted directly to BUBT TAFE Room 307 examiners for authentic band moderation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
