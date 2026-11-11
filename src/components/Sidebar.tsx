import React from 'react';
import {
  Home,
  TrendingDown,
  Carrot,
  Wheat,
  Fish,
  Egg,
  Droplets,
  CircleDot,
  Apple,
  Flame,
  BarChart3,
  Scale,
  FileText,
  Database,
  ShieldCheck,
  Sparkles,
  Info
} from 'lucide-react';
import { Category, Language } from '../types';

interface SidebarProps {
  language: Language;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  activeView: 'home' | 'comparison' | 'trends' | 'report' | 'database';
  setActiveView: (view: 'home' | 'comparison' | 'trends' | 'report' | 'database') => void;
  onOpenAdmin: () => void;
  onOpenAi: () => void;
  categories: Category[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  language,
  selectedCategory,
  onSelectCategory,
  activeView,
  setActiveView,
  onOpenAdmin,
  onOpenAi,
  categories,
}) => {

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Carrot': return <Carrot className="w-4 h-4" />;
      case 'Wheat': return <Wheat className="w-4 h-4" />;
      case 'Fish': return <Fish className="w-4 h-4" />;
      case 'Egg': return <Egg className="w-4 h-4" />;
      case 'Droplets': return <Droplets className="w-4 h-4" />;
      case 'CircleDot': return <CircleDot className="w-4 h-4" />;
      case 'Apple': return <Apple className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      default: return <Carrot className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-64 bg-[#087443] text-white shrink-0 flex flex-col justify-between hidden lg:flex rounded-2xl shadow-sm border border-emerald-900/20 overflow-hidden my-4 ml-4">
      {/* Scrollable Nav Area */}
      <div className="p-4 overflow-y-auto max-h-[calc(100vh-140px)] space-y-6">
        
        {/* Main Dashboard Links */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-emerald-200/70 font-semibold px-3 mb-2">
            {language === 'bn' ? 'প্রধান মেন্যু' : 'Main Menu'}
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => {
                setActiveView('home');
                onSelectCategory(null);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'home' && selectedCategory === null
                  ? 'bg-white text-[#087443] shadow-sm'
                  : 'text-emerald-50 hover:bg-emerald-800/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{language === 'bn' ? 'হোম পেজ' : 'Home'}</span>
            </button>

            <button
              onClick={() => {
                setActiveView('home');
                onSelectCategory(null);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-emerald-50 hover:bg-emerald-800/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <TrendingDown className="w-4 h-4 text-emerald-300" />
                <span>{language === 'bn' ? 'আজকের বাজারদর' : "Today's Prices"}</span>
              </div>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-100 px-2 py-0.5 rounded-full font-bold">
                লাইভ
              </span>
            </button>

            <button
              onClick={() => setActiveView('comparison')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'comparison'
                  ? 'bg-white text-[#087443] shadow-sm'
                  : 'text-emerald-50 hover:bg-emerald-800/60'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{language === 'bn' ? 'বাজার তুলনা' : 'Market Comparison'}</span>
            </button>

            <button
              onClick={() => setActiveView('trends')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'trends'
                  ? 'bg-white text-[#087443] shadow-sm'
                  : 'text-emerald-50 hover:bg-emerald-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{language === 'bn' ? 'মূল্যের ইতিহাস ও চার্ট' : 'Price History & Trends'}</span>
            </button>

            <button
              onClick={() => setActiveView('report')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'report'
                  ? 'bg-white text-[#087443] shadow-sm'
                  : 'text-emerald-50 hover:bg-emerald-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'bn' ? 'দৈনিক বাজার প্রতিবেদন' : 'Daily Market Reports'}</span>
            </button>

            <button
              onClick={onOpenAi}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-100 hover:bg-emerald-800/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? 'এআই বাজার সহকারী' : 'AI Market Assistant'}</span>
              </div>
              <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded font-bold">
                AI
              </span>
            </button>
          </nav>
        </div>

        {/* Commodity Categories */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-emerald-200/70 font-semibold px-3 mb-2">
            {language === 'bn' ? 'পণ্যের ক্যাটাগরি' : 'Commodity Categories'}
          </div>
          <nav className="space-y-1">
            {categories.map((cat) => {
              const isSelected = activeView === 'home' && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveView('home');
                    onSelectCategory(isSelected ? null : cat.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white text-[#087443] shadow-sm font-semibold'
                      : 'text-emerald-100 hover:bg-emerald-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isSelected ? 'text-[#087443]' : 'text-emerald-200'}>
                      {getCategoryIcon(cat.icon_name)}
                    </span>
                    <span className="truncate">
                      {language === 'bn' ? cat.name_bn : cat.name_en}
                    </span>
                  </div>
                  {cat.item_count && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-emerald-100 text-[#087443] font-bold' : 'text-emerald-200/80 bg-emerald-900/40'
                    }`}>
                      {cat.item_count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Developer & Database Architecture */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-emerald-200/70 font-semibold px-3 mb-2">
            {language === 'bn' ? 'সিস্টেম ও ডাটাবেজ' : 'System & Architecture'}
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveView('database')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'database'
                  ? 'bg-white text-[#087443] shadow-sm'
                  : 'text-emerald-50 hover:bg-emerald-800/60'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'সুপাবেজ এসকিউএল স্কিমা' : 'Supabase SQL Schema'}</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-100 hover:bg-emerald-800/60 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{language === 'bn' ? 'অ্যাডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}</span>
            </button>
          </nav>
        </div>

      </div>

      {/* FreshCart-inspired Bottom Awareness Card */}
      <div className="p-4 border-t border-emerald-800/60 bg-[#065e36]/70">
        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold mb-1">
            <Info className="w-4 h-4 text-emerald-300" />
            <span>{language === 'bn' ? 'সচেতন ক্রেতা হোন' : 'Shop Smart, Know Rates'}</span>
          </div>
          <p className="text-[11px] text-emerald-100/90 leading-relaxed mb-2">
            {language === 'bn'
              ? 'কৃষি বিপণন অধিদপ্তর ও টিসিবির ন্যায্যমূল্য তালিকা নিয়মিত যাচাই করে বাজার করুন।'
              : 'Cross-check government verified wholesale & retail price caps before buying.'}
          </p>
          <button
            onClick={() => setActiveView('report')}
            className="w-full py-1.5 text-center text-xs font-bold bg-white text-[#087443] hover:bg-emerald-50 rounded-lg transition-colors"
          >
            {language === 'bn' ? 'আজকের চার্ট দেখুন' : 'View Today Rates'}
          </button>
        </div>
      </div>
    </aside>
  );
};
