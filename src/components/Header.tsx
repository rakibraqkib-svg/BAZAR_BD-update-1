import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  Bell,
  Globe,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  ChevronDown,
  X,
  Download,
  Database
} from 'lucide-react';
import { CommodityDisplayItem, Market, Division, Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  markets: Market[];
  divisions: Division[];
  selectedMarketId: string;
  onSelectMarket: (marketId: string) => void;
  commodities: CommodityDisplayItem[];
  onSelectCommodity: (commodity: CommodityDisplayItem) => void;
  onOpenAdmin: () => void;
  onOpenAi: () => void;
  onOpenReport: () => void;
  onOpenSupabaseModal: () => void;
  unreadAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  markets,
  selectedMarketId,
  onSelectMarket,
  commodities,
  onSelectCommodity,
  onOpenAdmin,
  onOpenAi,
  onOpenReport,
  onOpenSupabaseModal,
  unreadAlertsCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const selectedMarket = markets.find(m => m.id === selectedMarketId) || markets[0];

  // Filter search results
  const searchResults = searchQuery.trim() === ''
    ? []
    : commodities.filter(c =>
        c.name_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category_name_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category_name_en.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#087443] to-[#55B76A] flex items-center justify-center text-white shadow-sm shadow-emerald-900/10">
            <span className="text-xl font-bold font-serif tracking-tight">৳</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Bazar<span className="text-[#087443]">BD</span>
              </span>
              <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 hidden sm:inline-block">
                লাইভ বাজারদর
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              {language === 'bn' ? 'প্রতিদিনের নিত্যপণ্যের সঠিক বাজারদর' : 'Daily Essential Commodity Price Tracker'}
            </p>
          </div>
        </div>

        {/* Global Product Search with Autocomplete */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={language === 'bn' ? 'পণ্যের নাম দিয়ে দাম খুঁজুন (যেমন: আলু, পেঁয়াজ, ইলিশ...)' : 'Search commodity price (e.g. Potato, Onion, Rice...)'}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087443]/30 focus:border-[#087443] transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider bg-slate-50">
                {language === 'bn' ? 'পণ্যসমূহ ও বর্তমান দাম' : 'Commodities & Today Rates'}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCommodity(c);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-emerald-50/60 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={c.image_url} alt={c.name_bn} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-[#087443] transition-colors">
                          {language === 'bn' ? c.name_bn : c.name_en}
                        </div>
                        <div className="text-xs text-slate-500">
                          {c.category_name_bn} · {c.market_name_bn}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900 tabular-nums">
                        ৳{c.current_price} <span className="text-xs font-normal text-slate-500">/{c.unit}</span>
                      </div>
                      <div className={`text-[11px] font-medium ${c.price_change < 0 ? 'text-emerald-600' : c.price_change > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                        {c.price_change < 0 ? `৳${Math.abs(c.price_change)} কমেছে` : c.price_change > 0 ? `৳${c.price_change} বেড়েছে` : 'অপরিবর্তিত'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Market Selector */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Market Dropdown Picker */}
          <div className="relative">
            <button
              onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-xs font-medium text-slate-800 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#087443] shrink-0" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-400 uppercase leading-none font-semibold">
                  {language === 'bn' ? 'বাজার' : 'Market'}
                </div>
                <div className="font-semibold text-slate-900 truncate max-w-[140px] leading-tight">
                  {language === 'bn' ? selectedMarket?.name_bn : selectedMarket?.name_en}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {isMarketDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-100">
                <div className="p-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-700">
                  {language === 'bn' ? 'বাংলাদেশের বাজারসমূহ' : 'Select Bangladesh Market'}
                </div>
                <div className="max-h-60 overflow-y-auto py-1">
                  {markets.map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectMarket(m.id);
                        setIsMarketDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${
                        m.id === selectedMarketId ? 'bg-emerald-50/80 font-bold text-[#087443]' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div>{language === 'bn' ? m.name_bn : m.name_en}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{m.location}</div>
                      </div>
                      {m.id === selectedMarketId && (
                        <span className="w-2 h-2 rounded-full bg-[#087443]"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Download Project ZIP */}
          <a
            href="/bazarbd-project.zip"
            download="bazarbd-project.zip"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#087443] text-xs font-bold border border-emerald-200 transition-colors"
            title="Download Full Project ZIP"
          >
            <Download className="w-4 h-4 text-[#087443]" />
            <span>{language === 'bn' ? 'জিপ ডাউনলোড' : 'Download ZIP'}</span>
          </a>

          {/* Supabase Live Button */}
          <button
            onClick={onOpenSupabaseModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-bold shadow-xs transition-colors"
            title="Connect Supabase"
          >
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">
              {language === 'bn' ? 'সুপাবেজ লাইভ' : 'Supabase Live'}
            </span>
          </button>

          {/* AI Price Assistant Button */}
          <button
            onClick={onOpenAi}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-[#087443] hover:bg-emerald-100/80 border border-emerald-200 text-xs font-semibold transition-colors"
            title="AI Price Assistant"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">
              {language === 'bn' ? 'এআই সহকারী' : 'Ask AI'}
            </span>
          </button>

          {/* Daily Report Generator Button */}
          <button
            onClick={onOpenReport}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span>{language === 'bn' ? 'আজকের রিপোর্ট' : 'Report'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'bn' ? 'en' : 'bn')}
            className="px-2.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center gap-1"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadAlertsCount}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'bn' ? 'বাজারদর অ্যালার্ট' : 'Price Alerts'}
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    সক্রিয়
                  </span>
                </div>
                <div className="p-3 divide-y divide-slate-100 text-xs">
                  <div className="py-2 flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">পেঁয়াজের দর হ্রাস পেয়েছে</div>
                      <div className="text-[11px] text-slate-500">কারওয়ান বাজারে দেশি পেঁয়াজ এখন ৳৭৫/কেজি (আগে ছিল ৳৮৫)</div>
                      <div className="text-[10px] text-slate-400 mt-1">আজ সকাল ৮:৩০</div>
                    </div>
                  </div>
                  <div className="py-2 flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">ডিমের দাম কমেছে</div>
                      <div className="text-[11px] text-slate-500">ফার্মের ডিম প্রতি ডজন ৳১৩৫ (পূর্বমূল্য ৳১৪৫)</div>
                      <div className="text-[10px] text-slate-400 mt-1">আজ সকাল ৭:০০</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin Dashboard Access */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#087443] hover:bg-[#065e36] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">
              {language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
