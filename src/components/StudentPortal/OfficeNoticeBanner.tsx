'use client';

import React from 'react';
import { Building2, ShieldCheck, Award, FileText, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

export const OfficeNoticeBanner: React.FC = () => {
  return (
    <div id="notice-section" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden scroll-mt-24">
      {/* Decorative top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#df5647] via-[#0b2860] to-[#df5647]" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0b2860] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
            <Building2 className="w-7 h-7 text-[#df5647]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#df5647] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
                Institutional TRF Protocol
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                BUBT-ACAD-2026
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Official TRF Collection &mdash; Room 307, Building 01
            </h3>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-bold shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#df5647]" />
          <span>Scores Released Strictly In-Person</span>
        </div>
      </div>

      <div className="py-6 space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          In strict compliance with <strong>BUBT TAFE Academic Examination Standards</strong>, scorecards are not displayed on public student screens immediately after submission. All candidate test attempts, essays, and voice recordings are directly submitted to the <strong>Academic Faculty Evaluation Board</strong> for official band moderation.
        </p>

        {/* 3 Step Card Process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#fbf9f5] p-5 rounded-2xl border border-slate-200/80 space-y-2 hover:border-[#df5647]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#0b2860] text-white font-black text-xs flex items-center justify-center">1</span>
              <FileText className="w-4 h-4 text-[#df5647]" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Finish Online Test</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Complete your Listening, Reading, Writing, and Speaking modules and download your Examination Slip.
            </p>
          </div>

          <div className="bg-[#fbf9f5] p-5 rounded-2xl border border-slate-200/80 space-y-2 hover:border-[#df5647]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#0b2860] text-white font-black text-xs flex items-center justify-center">2</span>
              <Clock className="w-4 h-4 text-[#df5647]" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Faculty Evaluation</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Certified examiners grade your essays and speaking audio within 24–48 hours and stamp your official TRF.
            </p>
          </div>

          <div className="bg-[#fbf9f5] p-5 rounded-2xl border border-slate-200/80 space-y-2 hover:border-[#df5647]/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-[#df5647] text-white font-black text-xs flex items-center justify-center">3</span>
              <MapPin className="w-4 h-4 text-[#df5647]" />
            </div>
            <h4 className="font-bold text-sm text-slate-900">Room&nbsp;307 Collection</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Visit <strong>Office Room 307 (Building 01)</strong> with your Candidate ID to collect your signed physical TRF.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#df5647]" />
          <span>BUBT Permanent Campus, Plot #77-78, Main Road, Rupnagar, Mirpur-2, Dhaka-1216</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Faculty Hours: Sun &ndash; Thu (9:00 AM &ndash; 5:00 PM)
        </div>
      </div>
    </div>
  );
};
