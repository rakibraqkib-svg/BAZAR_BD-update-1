import React, { useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Carrot,
  Wheat,
  Fish,
  Egg,
  Droplets,
  CircleDot,
  Apple,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { Category, Language } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  language: Language;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Carrot': return <Carrot className="w-5 h-5" />;
      case 'Wheat': return <Wheat className="w-5 h-5" />;
      case 'Fish': return <Fish className="w-5 h-5" />;
      case 'Egg': return <Egg className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5" />;
      case 'Apple': return <Apple className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      default: return <Carrot className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'নিত্যপ্রয়োজনীয় পণ্যের ক্যাটাগরি' : 'Commodity Categories'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'bn' ? 'ক্যাটাগরি নির্বাচন করে সংশ্লিষ্ট পণ্যের দর যাচাই করুন' : 'Browse commodities by staple food groups'}
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Row */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none scroll-smooth"
      >
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl shrink-0 transition-all border ${
            selectedCategory === null
              ? 'bg-[#087443] text-white border-[#087443] shadow-sm shadow-emerald-900/10 font-bold'
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
          }`}
        >
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            selectedCategory === null ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            <LayoutGrid className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {language === 'bn' ? 'সকল পণ্য' : 'All Items'}
          </span>
        </button>

        {/* Category Items */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl shrink-0 transition-all border ${
                isSelected
                  ? 'bg-[#087443] text-white border-[#087443] shadow-sm shadow-emerald-900/10 font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-[#087443]'
              }`}>
                {getCategoryIcon(cat.icon_name)}
              </div>
              <div className="text-left">
                <div className="text-xs sm:text-sm whitespace-nowrap font-medium">
                  {language === 'bn' ? cat.name_bn : cat.name_en}
                </div>
                {cat.item_count && (
                  <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {cat.item_count} {language === 'bn' ? 'টি পণ্য' : 'items'}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
