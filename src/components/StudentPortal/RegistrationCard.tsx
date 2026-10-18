'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, School, MapPin, Target, CheckCircle2, Award, ArrowRight, UserPlus, LogOut, RotateCcw } from 'lucide-react';
import { Candidate } from '@/types';
import { saveCandidate, setCurrentCandidate as persistCurrentCandidate } from '@/lib/storage';

interface RegistrationCardProps {
  currentCandidate: Candidate | null;
  onRegistered: (candidate: Candidate) => void;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  currentCandidate,
  onRegistered,
}) => {
  const [isRegisteringNew, setIsRegisteringNew] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [university, setUniversity] = useState('BUBT (Bangladesh University of Business and Technology)');
  const [address, setAddress] = useState('');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      alert('Please fill out all required fields.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const candidateId = `BUBT-2026-${randomSuffix}`;

    const newCandidate: Candidate = {
      id: candidateId,
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      university: university.trim() || 'BUBT',
      address: address.trim() || 'Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka',
      targetBand: targetBand,
      registeredAt: new Date().toISOString(),
    };

    saveCandidate(newCandidate);
    setGeneratedId(candidateId);
    setIsSuccess(true);
    setIsRegisteringNew(false);

    setTimeout(() => {
      onRegistered(newCandidate);
      setIsSuccess(false);
    }, 1200);
  };

  const handleClearSession = () => {
    if (confirm('Clear current candidate session and start fresh registration?')) {
      persistCurrentCandidate(null);
      setName('');
      setEmail('');
      setMobile('');
      setAddress('');
      setIsRegisteringNew(true);
      onRegistered(null as any);
    }
  };

  return (
    <div id="register-section" className="scroll-mt-24">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-blue-950/5 relative overflow-hidden">
        {/* Top brand accent bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#0b2860] via-blue-700 to-red-600 absolute top-0 left-0" />

        {currentCandidate && !isRegisteringNew && !isSuccess ? (
          /* Already registered banner with New Registration CTA */
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0b2860] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                  {currentCandidate.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Active Candidate Profile
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0b2860] bg-white border border-blue-200 px-2 py-0.5 rounded">
                      ID: {currentCandidate.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0b2860] mt-1">{currentCandidate.name}</h3>
                  <p className="text-xs text-slate-600">
                    {currentCandidate.university} &bull; Mobile: {currentCandidate.mobile}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    const testEl = document.getElementById('tests-section');
                    if (testEl) testEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 bg-[#0b2860] hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Take Mock Exam</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setEmail('');
                    setMobile('');
                    setAddress('');
                    setIsRegisteringNew(true);
                  }}
                  className="px-4 py-2.5 bg-[#df5647] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20 flex items-center gap-1.5"
                  title="Register another candidate"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register New Candidate</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearSession}
                  className="p-2.5 bg-white hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-200 rounded-xl text-xs transition-colors"
                  title="Clear Active Profile"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : isSuccess ? (
          /* Registration success animation */
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#0b2860]">Candidate Registration Confirmed!</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Assigned Candidate ID: <strong className="text-red-600 font-mono text-base">{generatedId}</strong>
            </p>
            <p className="text-xs text-slate-400">Loading your examination session...</p>
          </div>
        ) : (
          /* Registration Form */
          <div>
            {currentCandidate && isRegisteringNew && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    Currently active as <strong>{currentCandidate.name}</strong> ({currentCandidate.id}). Registering below creates a new candidate profile.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegisteringNew(false)}
                  className="px-3 py-1 bg-white border border-amber-300 text-amber-900 rounded-lg font-bold hover:bg-amber-100 transition-colors shrink-0"
                >
                  Cancel & Keep {currentCandidate.name.split(' ')[0]}
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 mb-6 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  <h3 className="text-xl font-black text-[#0b2860]">Student Registration Form</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Register with your details to access the full computer-delivered mock test battery.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setName('Masruf Rahman');
                    setEmail('masruf@bubt.edu.bd');
                    setMobile('01827459921');
                    setUniversity('BUBT (Dept of CSE)');
                    setAddress('Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka');
                    setTargetBand(8.0);
                  }}
                  className="text-[11px] font-bold text-slate-500 hover:text-[#df5647] bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors"
                >
                  ⚡ Quick Demo Fill
                </button>
                <span className="text-xs font-bold text-[#0b2860] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
                  Step 1 of 2: Registration
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Masruf Rahman"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-medium"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="01827459921"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-medium"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {/* University Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    University / College / Institute <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. BUBT (CSE Department)"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-medium"
                    />
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Present Address / Campus Hall Details <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rupnagar, Mirpur-2, Dhaka-1216"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b2860] focus:bg-white text-slate-900 font-medium"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Target Band Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target IELTS Band Score
                </label>
                <div className="flex items-center gap-2">
                  {[6.5, 7.0, 7.5, 8.0, 8.5].map((band) => (
                    <button
                      key={band}
                      type="button"
                      onClick={() => setTargetBand(band)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        targetBand === band
                          ? 'bg-[#0b2860] text-white border-[#0b2860] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {band.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#df5647] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Register & Proceed to Examination Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
