'use client';

import React, { useState } from 'react';
import { X, User, Mail, Phone, School, MapPin, Target, CheckCircle2, Award } from 'lucide-react';
import { Candidate } from '@/types';
import { saveCandidate } from '@/lib/storage';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistered: (newCandidate: Candidate) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegistered,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [university, setUniversity] = useState('BUBT (Bangladesh University of Business and Technology)');
  const [address, setAddress] = useState('');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');

  if (!isOpen) return null;

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
      address: address.trim() || 'Dhaka, Bangladesh',
      targetBand: targetBand,
      registeredAt: new Date().toISOString(),
    };

    saveCandidate(newCandidate);
    setGeneratedId(candidateId);
    setIsSuccess(true);

    setTimeout(() => {
      onRegistered(newCandidate);
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header decoration */}
        <div className="h-2 bg-gradient-to-r from-red-800 via-red-600 to-red-700" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Candidate Registration</h3>
              <p className="text-xs text-slate-500">BUBT TAFE IELTS Academy Mock Test Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Success State */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Registration Successful!</h4>
            <p className="text-sm text-slate-600">
              Assigned Candidate ID: <strong className="text-red-700 font-mono text-base">{generatedId}</strong>
            </p>
            <p className="text-xs text-slate-400">Loading candidate portal session...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-slate-900"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Email & Mobile 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-slate-900"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

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
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-slate-900"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* University */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                University / Institution Name <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. BUBT (Department of CSE)"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-slate-900"
                />
                <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Address / Campus Details <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Rupnagar, Mirpur-2, Dhaka-1216"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-slate-900"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Target Band */}
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
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      targetBand === band
                        ? 'bg-red-700 text-white border-red-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {band.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-sm rounded-xl shadow-md shadow-red-700/20 transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Complete Registration & Activate Candidate
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
