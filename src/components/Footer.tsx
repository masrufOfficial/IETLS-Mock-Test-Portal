import React from 'react';
import { Award, Globe, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Academy Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-red-700 text-white flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-slate-900">BUBT TAFE</span>
                <span className="text-lg font-black tracking-tight text-red-700 ml-1">IELTS Academy</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              Official Computer-Delivered IELTS Mock Testing, Diagnostic Diagnostics, and Automated TRF Certification Portal. Built to provide authentic testing conditions for university students aiming for global higher education and professional immigration.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                BUBT Campus, Rupnagar, Mirpur-2, Dhaka
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-600" />
                01827459921
              </span>
            </div>
          </div>

          {/* Col 2: Test Modules */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              IELTS Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="hover:text-red-700 transition-colors">Listening Test (4 Sections, 40 Qs)</li>
              <li className="hover:text-red-700 transition-colors">Academic Reading (3 Passages, 40 Qs)</li>
              <li className="hover:text-red-700 transition-colors">Writing Task 1 & Task 2</li>
              <li className="hover:text-red-700 transition-colors">Interactive Speaking Simulation</li>
              <li className="hover:text-red-700 transition-colors">Automated TRF Verification</li>
            </ul>
          </div>

          {/* Col 3: Developer & Credit */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Product & Engineering
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="text-[11px] font-semibold text-slate-700 mb-1">
                Product of <span className="text-red-700 font-bold">BUBT TAFE</span>
              </p>
              <p className="text-[11px] text-slate-600 mb-2">
                Designed & Developed by <strong className="text-slate-900">Masruf Rahman</strong>
              </p>
              <a
                href="https://www.masrufrahman.info"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-800 hover:underline"
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
          <div className="flex items-center gap-1 text-slate-600">
            <span>Crafted with precision by</span>
            <a
              href="https://www.masrufrahman.info"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-900 hover:text-red-700 transition-colors"
            >
              Masruf Rahman
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
