'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Globe, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const StudentFooter: React.FC = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: BUBT TAFE Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#0b2860] text-white flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-[#0b2860]">BUBT TAFE</span>
                <span className="text-lg font-black tracking-tight text-red-600 ml-1">IELTS Academy</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Official Computer-Delivered IELTS Mock Testing & Diagnostic Assessment Center. Administered in collaboration with the BUBT TAFE Division to deliver authentic Cambridge & British Council standard preparation for university students.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Office Room 307, Building 01, BUBT Campus, Mirpur-2, Dhaka
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                01827459921
              </span>
            </div>
          </div>

          {/* Col 2: Exam Modules */}
          <div>
            <h4 className="text-xs font-bold text-[#0b2860] uppercase tracking-wider mb-3">
              Examination Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="hover:text-red-600 transition-colors">Listening Test (40 Questions)</li>
              <li className="hover:text-red-600 transition-colors">Academic Reading (3 Passages)</li>
              <li className="hover:text-red-600 transition-colors">Academic Writing (Task 1 & 2)</li>
              <li className="hover:text-red-600 transition-colors">Speaking Audio Simulation</li>
              <li className="hover:text-red-600 transition-colors">Physical TRF Office Collection</li>
            </ul>
          </div>

          {/* Col 3: Developer & Product Attribution */}
          <div>
            <h4 className="text-xs font-bold text-[#0b2860] uppercase tracking-wider mb-3">
              Product & Engineering
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-semibold text-slate-700 mb-1">
                Product of <span className="text-[#0b2860] font-black">BUBT TAFE</span>
              </p>
              <p className="text-[11px] text-slate-600 mb-2">
                Designed & Developed by <strong className="text-slate-900">Masruf Rahman</strong>
              </p>
              <a
                href="https://www.masrufrahman.info"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                www.masrufrahman.info
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 BUBT TAFE IELTS Academy. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <span>
              Crafted by{' '}
              <a
                href="https://www.masrufrahman.info"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#0b2860] hover:text-red-600 transition-colors"
              >
                Masruf Rahman
              </a>
            </span>
            <span className="text-slate-300">|</span>
            <Link
              href="/admin"
              className="text-[11px] text-slate-400 hover:text-[#0b2860] flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-slate-400" />
              Staff Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
