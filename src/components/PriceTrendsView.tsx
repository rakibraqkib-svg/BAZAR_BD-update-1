import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  TrendingDown,
  TrendingUp,
  Calendar,
  Building2,
  Filter,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Product, Market, Language } from '../types';
import { bazarStore } from '../services/store';

interface PriceTrendsViewProps {
  products: Product[];
  markets: Market[];
  language: Language;
}

export const PriceTrendsView: React.FC<PriceTrendsViewProps> = ({
  products,
  markets,
  language,
}) => {
  const [selectedMarketId, setSelectedMarketId] = useState<string>(markets[0]?.id || 'mkt-1');
  const [timeSpan, setTimeSpan] = useState<7 | 30 | 90>(30);
  const [activeCommodity1, setActiveCommodity1] = useState<string>('prod-veg-1'); // Potato
  const [activeCommodity2, setActiveCommodity2] = useState<string>('prod-veg-2'); // Onion
  const [activeCommodity3, setActiveCommodity3] = useState<string>('prod-rice-1'); // Miniket

  const prod1 = products.find(p => p.id === activeCommodity1);
  const prod2 = products.find(p => p.id === activeCommodity2);
  const prod3 = products.find(p => p.id === activeCommodity3);

  // Combine history of 3 commodities for multi-line trend chart
  const multiTrendData = useMemo(() => {
    const h1 = bazarStore.getPriceHistory(activeCommodity1, selectedMarketId, timeSpan);
    const h2 = bazarStore.getPriceHistory(activeCommodity2, selectedMarketId, timeSpan);
    const h3 = bazarStore.getPriceHistory(activeCommodity3, selectedMarketId, timeSpan);

    return h1.map((item, idx) => ({
      date: item.date,
      [prod1?.name_bn || 'পণ্য ১']: item.price,
      [prod2?.name_bn || 'পণ্য ২']: h2[idx]?.price || 0,
      [prod3?.name_bn || 'পণ্য ৩']: h3[idx]?.price || 0,
    }));
  }, [activeCommodity1, activeCommodity2, activeCommodity3, selectedMarketId, timeSpan, prod1, prod2, prod3]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Filter Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#087443] border border-emerald-200/60 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'নিত্যপণ্যের মূল্য প্রবণতা' : 'Commodity Price Trends'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {language === 'bn' ? 'সাপ্তাহিক ও মাসিক বাজারদর গতিবিধি' : 'Weekly & Monthly Price Volatility'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'একই চার্টে একাধিক নিত্যপণ্যের দামের উত্থান-পতন ও বাজারের সামগ্রিক গতিধারা লক্ষ্য করুন।'
                : 'Monitor multi-commodity price fluctuations simultaneously across past weeks and months.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Market Picker */}
            <select
              value={selectedMarketId}
              onChange={(e) => setSelectedMarketId(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none"
            >
              {markets.map(m => (
                <option key={m.id} value={m.id}>
                  {language === 'bn' ? m.name_bn : m.name_en}
                </option>
              ))}
            </select>

            {/* Time Span Picker */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { label: language === 'bn' ? '৭ দিন' : '7 Days', val: 7 },
                { label: language === 'bn' ? '৩০ দিন' : '30 Days', val: 30 },
                { label: language === 'bn' ? '৩ মাস' : '3 Months', val: 90 },
              ].map(item => (
                <button
                  key={item.val}
                  onClick={() => setTimeSpan(item.val as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    timeSpan === item.val
                      ? 'bg-white text-[#087443] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Commodity Pickers Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div>
            <label className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-1">
              {language === 'bn' ? 'পণ্য ১ (সবুজ রেখা)' : 'Item 1 (Green Line)'}
            </label>
            <select
              value={activeCommodity1}
              onChange={(e) => setActiveCommodity1(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5 focus:outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{language === 'bn' ? p.name_bn : p.name_en}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-rose-800 uppercase tracking-wide block mb-1">
              {language === 'bn' ? 'পণ্য ২ (লাল রেখা)' : 'Item 2 (Red Line)'}
            </label>
            <select
              value={activeCommodity2}
              onChange={(e) => setActiveCommodity2(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-rose-50/50 border border-rose-200 rounded-xl p-2.5 focus:outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{language === 'bn' ? p.name_bn : p.name_en}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-amber-800 uppercase tracking-wide block mb-1">
              {language === 'bn' ? 'পণ্য ৩ (হলুদ রেখা)' : 'Item 3 (Amber Line)'}
            </label>
            <select
              value={activeCommodity3}
              onChange={(e) => setActiveCommodity3(e.target.value)}
              className="w-full text-xs font-semibold text-slate-800 bg-amber-50/50 border border-amber-200 rounded-xl p-2.5 focus:outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{language === 'bn' ? p.name_bn : p.name_en}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Multi-Line Trend Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={multiTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(val) => `৳${val}`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl text-xs space-y-1.5">
                        <div className="font-bold text-slate-300 pb-1 border-b border-slate-800">{label}</div>
                        {payload.map((entry, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4">
                            <span style={{ color: entry.color }} className="font-medium">
                              {entry.name}:
                            </span>
                            <span className="font-bold tabular-nums">৳{entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={prod1?.name_bn || 'পণ্য ১'}
                stroke="#087443"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={prod2?.name_bn || 'পণ্য ২'}
                stroke="#e11d48"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey={prod3?.name_bn || 'পণ্য ৩'}
                stroke="#d97706"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
