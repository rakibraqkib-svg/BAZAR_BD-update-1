import React from 'react';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenAdmin: () => void;
  onOpenReport: () => void;
  onOpenAi: () => void;
  onOpenComparison: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenAdmin,
  onOpenReport,
  onOpenAi,
  onOpenComparison,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 text-slate-600 text-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#087443] flex items-center justify-center text-white font-bold text-base">
                ৳
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Bazar<span className="text-[#087443]">BD</span>
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'বাজারবিডি একটি অলাভজনক ও নিরপেক্ষ ডিজিটাল বাজারদর ট্র্যাকিং প্ল্যাটফর্ম। বাংলাদেশের সাধারণ নাগরিক ও খুচরা ক্রেতাদের ন্যায্যমূল্যে পণ্য কেনাকাটায় সচেতন করতে প্রতিদিনের দর সংগ্রহ ও বিশ্লেষণ করা হয়।'
                : 'BazarBD is an independent daily commodity price tracking and monitoring initiative across Bangladesh, aggregating prices from wholesale and retail hubs to empower consumers.'}
            </p>

            <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-[#087443] shrink-0" />
              <span className="text-[11px] font-semibold">
                {language === 'bn' ? 'প্রতিদিনের বাজারদর, হাতের মুঠোয়' : 'Daily Market Prices, Right in Your Hands'}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              {language === 'bn' ? 'প্ল্যাটফর্ম ফিচার' : 'Quick Features'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenComparison} className="hover:text-[#087443] transition-colors">
                  {language === 'bn' ? 'বাজার তুলনা' : 'Market Comparison'}
                </button>
              </li>
              <li>
                <button onClick={onOpenReport} className="hover:text-[#087443] transition-colors">
                  {language === 'bn' ? 'দৈনিক বুলেটিন ও প্রিন্ট' : 'Daily Price Bulletin'}
                </button>
              </li>
              <li>
                <button onClick={onOpenAi} className="hover:text-[#087443] transition-colors">
                  {language === 'bn' ? 'এআই বাজার সহকারী' : 'AI Price Assistant'}
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-[#087443] transition-colors">
                  {language === 'bn' ? 'অ্যাডমিন কন্ট্রোল সেন্টার' : 'Admin Control Center'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Data Sources */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              {language === 'bn' ? 'সরকারি তথ্যসূত্র' : 'Official Data Sources'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://dam.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#087443] transition-colors"
                >
                  <span>কৃষি বিপণন অধিদপ্তর (DAM)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://tcb.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#087443] transition-colors"
                >
                  <span>ট্রেডিং কর্পোরেশন অব বাংলাদেশ (TCB)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#087443] transition-colors"
                >
                  <span>বাংলাদেশ উন্মুক্ত তথ্য বাতায়ন</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://bangladesh.gov.bd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-[#087443] transition-colors"
                >
                  <span>জাতীয় তথ্য বাতায়ন</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency & Policy */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              {language === 'bn' ? 'স্বচ্ছতা ও শর্তাবলী' : 'Transparency & Policy'}
            </h4>
            <ul className="space-y-2">
              <li className="text-slate-500">
                {language === 'bn'
                  ? 'বাজারদর স্থানীয় আড়ত ও সরকারি তথ্যের ভিত্তিতে নিয়মিত হালনাগাদ করা হয়।'
                  : 'Prices are synchronized regularly with agricultural bulletins.'}
              </li>
              <li className="text-slate-500">
                {language === 'bn'
                  ? 'এটি কোনো ই-কমার্স সাইট নয়; মূল্য যাচাইকরণ ও সচেতনতামূলক সেবা।'
                  : 'Informational price monitoring platform only, not an ecommerce checkout.'}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} BazarBD. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1">
            <span>{language === 'bn' ? 'বাংলাদেশের সচেতন নাগরিকদের জন্য নির্মিত' : 'Built for the conscious citizens of Bangladesh'}</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
};
