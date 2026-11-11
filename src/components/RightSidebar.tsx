import React from 'react';
import {
  TrendingDown,
  TrendingUp,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CommodityDisplayItem, Language } from '../types';

interface RightSidebarProps {
  commodities: CommodityDisplayItem[];
  favorites: Set<string>;
  onSelectCommodity: (commodity: CommodityDisplayItem) => void;
  language: Language;
  onOpenComparison: () => void;
  onOpenReport: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  commodities,
  favorites,
  onSelectCommodity,
  language,
  onOpenComparison,
  onOpenReport,
}) => {
  // Sort for top increases & decreases
  const topDecreased = [...commodities]
    .filter(c => c.price_change < 0)
    .sort((a, b) => a.price_change_percent - b.price_change_percent)
    .slice(0, 4);

  const topIncreased = [...commodities]
    .filter(c => c.price_change > 0)
    .sort((a, b) => b.price_change_percent - a.price_change_percent)
    .slice(0, 4);

  // Watchlist items
  const watchlistItems = commodities.filter(c => favorites.has(c.product_id)).slice(0, 4);
  const totalToday = watchlistItems.reduce((acc, c) => acc + c.current_price, 0);
  const totalPrev = watchlistItems.reduce((acc, c) => acc + c.previous_price, 0);
  const totalSavings = totalPrev - totalToday;

  return (
    <aside className="w-80 shrink-0 space-y-4 hidden xl:block my-4 mr-4">
      
      {/* 1. Watchlist Basket (FreshCart "Your Cart" style) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#087443] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'বাজারের থলে (ওয়াচলিস্ট)' : 'My Price Watchlist'}
              </h3>
              <span className="text-[10px] text-slate-400">
                {watchlistItems.length} {language === 'bn' ? 'টি নির্বাচিত পণ্য' : 'items'}
              </span>
            </div>
          </div>
          <button
            onClick={onOpenReport}
            className="text-xs font-semibold text-[#087443] hover:underline"
          >
            {language === 'bn' ? 'রিপোর্ট' : 'Report'}
          </button>
        </div>

        {/* Watchlist Item Rows */}
        <div className="divide-y divide-slate-100 mb-4 max-h-48 overflow-y-auto">
          {watchlistItems.length > 0 ? (
            watchlistItems.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectCommodity(item)}
                className="py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-50 px-1 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.image_url} alt={item.name_bn} className="w-full h-full object-cover" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-800 group-hover:text-[#087443] transition-colors truncate">
                      {language === 'bn' ? item.name_bn : item.name_en}
                    </div>
                    <div className="text-[10px] text-slate-400">১ {item.unit}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900 tabular-nums">
                    ৳{item.current_price}
                  </div>
                  {item.previous_price !== item.current_price && (
                    <div className="text-[10px] text-slate-400 line-through tabular-nums">
                      ৳{item.previous_price}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              {language === 'bn' ? 'পছন্দের তালিকায় পণ্য যুক্ত করুন' : 'Add commodities to track prices'}
            </div>
          )}
        </div>

        {/* Total Calculation */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span>{language === 'bn' ? 'আজকের মোট মূল্য:' : "Today's Subtotal:"}</span>
            <span className="font-bold text-slate-900 text-sm tabular-nums">৳{totalToday}</span>
          </div>
          {totalSavings !== 0 && (
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-700 font-medium">
                {language === 'bn' ? 'গতকাল থেকে সাশ্রয়:' : 'Savings vs Yesterday:'}
              </span>
              <span className={`font-bold tabular-nums ${totalSavings > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {totalSavings > 0 ? `৳${totalSavings} কম` : `৳${Math.abs(totalSavings)} বেশি`}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onOpenComparison}
          className="w-full mt-3 py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>{language === 'bn' ? 'বাজারভিত্তিক তুলনা করুন' : 'Compare Between Markets'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Top Price Drops (সবুজ ব্যাজ) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              {language === 'bn' ? 'শীর্ষ মূল্য হ্রাস (স্বস্তি)' : 'Biggest Price Drops'}
            </h4>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">
            আজকে
          </span>
        </div>

        <div className="space-y-2.5">
          {topDecreased.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectCommodity(item)}
              className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.image_url} alt={item.name_bn} className="w-full h-full object-cover" />
                </div>
                <div className="truncate max-w-[120px]">
                  <div className="font-semibold text-slate-800 truncate">
                    {language === 'bn' ? item.name_bn : item.name_en}
                  </div>
                  <div className="text-[10px] text-slate-400">৳{item.current_price}/{item.unit}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md tabular-nums">
                <TrendingDown className="w-3 h-3" />
                {Math.abs(item.price_change_percent).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Top Price Spikes (লাল ব্যাজ) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-800 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              {language === 'bn' ? 'মূল্য বৃদ্ধি পেয়েছে' : 'Price Increases'}
            </h4>
          </div>
          <span className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-semibold">
            সতর্কতা
          </span>
        </div>

        <div className="space-y-2.5">
          {topIncreased.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectCommodity(item)}
              className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.image_url} alt={item.name_bn} className="w-full h-full object-cover" />
                </div>
                <div className="truncate max-w-[120px]">
                  <div className="font-semibold text-slate-800 truncate">
                    {language === 'bn' ? item.name_bn : item.name_en}
                  </div>
                  <div className="text-[10px] text-slate-400">৳{item.current_price}/{item.unit}</div>
                </div>
              </div>

              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md tabular-nums">
                <TrendingUp className="w-3 h-3" />
                +{item.price_change_percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. FreshCart-inspired "Why Trust BazarBD" Trust Box */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          {language === 'bn' ? 'বাজারবিডি কেন বিশ্বস্ত?' : 'Why Trust BazarBD?'}
        </h4>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#087443] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
            </div>
            <div>
              <div className="font-semibold text-slate-800">
                {language === 'bn' ? 'সরকারি তথ্যসূত্র' : 'Official Government Data'}
              </div>
              <div className="text-[11px] text-slate-500">
                {language === 'bn' ? 'ডিএএম ও টিসিবির দৈনিক তথ্য সরাসরি সংযুক্ত।' : 'Directly synced with DAM and TCB published rates.'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#087443] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
            </div>
            <div>
              <div className="font-semibold text-slate-800">
                {language === 'bn' ? 'বাজার পরিদর্শক দ্বারা যাচাইকৃত' : 'Field Inspector Verified'}
              </div>
              <div className="text-[11px] text-slate-500">
                {language === 'bn' ? 'সরাসরি কারওয়ান বাজার ও পাইকারি আড়ত থেকে যাচাই।' : 'Verified on-ground by dedicated market agents.'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#087443] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-3 h-3" />
            </div>
            <div>
              <div className="font-semibold text-slate-800">
                {language === 'bn' ? 'রিয়েলটাইম ডাটাবেজ' : 'Supabase Realtime Sync'}
              </div>
              <div className="text-[11px] text-slate-500">
                {language === 'bn' ? 'প্রতিদিন ভোর থেকে সার্বক্ষণিক আপডেট।' : 'Updated continuously throughout the market hours.'}
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Links */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <a
            href="https://dam.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#087443] transition-colors"
          >
            <span>dam.gov.bd</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://tcb.gov.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#087443] transition-colors"
          >
            <span>tcb.gov.bd</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </aside>
  );
};
