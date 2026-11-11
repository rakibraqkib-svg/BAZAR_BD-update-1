import React from 'react';
import { Sparkles, TrendingDown, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';

interface HeroBannerProps {
  language: Language;
  onOpenAi: () => void;
  onOpenComparison: () => void;
  totalProductsCount: number;
  totalMarketsCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onOpenAi,
  onOpenComparison,
  totalProductsCount,
  totalMarketsCount,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#087443] via-[#0b643c] to-[#075330] text-white shadow-md shadow-emerald-950/10 mb-6">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-[#55B76A]/10 blur-2xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[290px] relative z-10">
        
        {/* Left Content Area */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            
            {/* Live Tag & Timestamp */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-emerald-100 backdrop-blur-md border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                {language === 'bn' ? 'সরকারি তথ্যসূত্র ও ভেরিফাইড দর' : 'Government Verified Data'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-200/90 font-mono">
                <Clock className="w-3 h-3 text-emerald-300" />
                {language === 'bn' ? 'আপডেট: আজ সকাল ৮:৩০' : 'Updated: Today 8:30 AM'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
              {language === 'bn' ? (
                <>
                  প্রতিদিনের বাজারদর, <span className="text-emerald-300">হাতের মুঠোয়</span>
                </>
              ) : (
                <>
                  Bangladesh Daily Essential <span className="text-emerald-300">Price Tracker</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl font-normal leading-relaxed mb-6">
              {language === 'bn'
                ? 'কারওয়ান বাজারসহ সারা দেশের চাল, ডাল, তেল, ডিম, মাছ, মাংস ও শাকসবজির খুচরা এবং পাইকারি দামের রিয়েল-টাইম তথ্য ও মূল্য বিশ্লেষণ।'
                : 'Real-time retail and wholesale prices of daily staples across Karwan Bazar and national markets with verified historical price trends.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenComparison}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#087443] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <TrendingDown className="w-4 h-4 text-[#087443]" />
              <span>{language === 'bn' ? 'বাজার তুলনা দেখুন' : 'Compare Markets'}</span>
              <ArrowRight className="w-4 h-4 text-[#087443]" />
            </button>

            <button
              onClick={onOpenAi}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'bn' ? 'এআই দিয়ে দাম জানুন' : 'Ask AI Price Bot'}</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-5 mt-4 border-t border-white/10 text-xs">
            <div>
              <div className="text-lg font-bold text-white tabular-nums">{totalProductsCount}+</div>
              <div className="text-emerald-200/80 text-[11px]">{language === 'bn' ? 'নিত্যপ্রয়োজনীয় পণ্য' : 'Commodities'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">{totalMarketsCount}</div>
              <div className="text-emerald-200/80 text-[11px]">{language === 'bn' ? 'প্রধান বাজার' : 'Major Markets'}</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white tabular-nums">DAM · TCB</div>
              <div className="text-emerald-200/80 text-[11px]">{language === 'bn' ? 'সরকারি ডাটাফিড' : 'Official Sources'}</div>
            </div>
          </div>
        </div>

        {/* Right Photo Area */}
        <div className="lg:col-span-5 relative hidden lg:block overflow-hidden">
          <img
            src="/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg"
            alt="Bangladesh Fresh Produce Market"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#087443] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-white/90">
            {language === 'bn' ? 'কারওয়ান বাজার ঢাকা' : 'Karwan Bazar, Dhaka'}
          </div>
        </div>

      </div>
    </div>
  );
};
