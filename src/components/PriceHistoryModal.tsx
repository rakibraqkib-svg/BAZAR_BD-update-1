import React, { useState, useMemo } from 'react';
import {
  X,
  TrendingDown,
  TrendingUp,
  Minus,
  Calendar,
  Building2,
  CheckCircle2,
  Share2,
  Printer
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { CommodityDisplayItem, Market, Language } from '../types';
import { bazarStore } from '../services/store';

interface PriceHistoryModalProps {
  commodity: CommodityDisplayItem | null;
  onClose: () => void;
  markets: Market[];
  language: Language;
}

type TimeRange = '7d' | '30d' | '3m' | '6m' | '1y';

export const PriceHistoryModal: React.FC<PriceHistoryModalProps> = ({
  commodity,
  onClose,
  markets,
  language,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [compareMarketId, setCompareMarketId] = useState<string>(commodity?.market_id || 'mkt-1');
  const [copied, setCopied] = useState(false);

  // Compute days count based on time range
  const days = useMemo(() => {
    switch (timeRange) {
      case '7d': return 7;
      case '30d': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      default: return 30;
    }
  }, [timeRange]);

  // Fetch chart points
  const chartData = useMemo(() => {
    if (!commodity) return [];
    return bazarStore.getPriceHistory(commodity.product_id, compareMarketId, days);
  }, [commodity, compareMarketId, days]);

  // Metrics
  const pricesArray = chartData.map(d => d.price);
  const minHistoricalPrice = pricesArray.length ? Math.min(...pricesArray) : 0;
  const maxHistoricalPrice = pricesArray.length ? Math.max(...pricesArray) : 0;
  const avgHistoricalPrice = pricesArray.length
    ? Math.round(pricesArray.reduce((a, b) => a + b, 0) / pricesArray.length)
    : 0;

  if (!commodity) return null;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(`${commodity.name_bn} আজকের বাজারদর ৳${commodity.current_price}/${commodity.unit} (${commodity.market_name_bn}) - দেখুন BazarBD তে: ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
              <img src={commodity.image_url} alt={commodity.name_bn} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#087443] bg-emerald-50 px-2 py-0.5 rounded-md">
                  {commodity.category_name_bn}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 font-medium">{commodity.market_name_bn}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'bn' ? commodity.name_bn : commodity.name_en}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Share Price"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                {language === 'bn' ? 'আজকের বর্তমান দর' : "Today's Price"}
              </div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                ৳{commodity.current_price}
                <span className="text-xs font-normal text-slate-500 ml-1">/{commodity.unit}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                {commodity.price_change < 0 ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" />
                    ৳{Math.abs(commodity.price_change)} কমেছে
                  </span>
                ) : commodity.price_change > 0 ? (
                  <span className="text-rose-600 font-semibold flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    ৳{commodity.price_change} বেড়েছে
                  </span>
                ) : (
                  <span className="text-slate-500 flex items-center gap-0.5">
                    <Minus className="w-3 h-3" />
                    অপরিবর্তিত
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                {language === 'bn' ? 'সর্বনিম্ন দর' : 'Lowest Price'}
              </div>
              <div className="text-2xl font-bold text-emerald-700 tabular-nums">
                ৳{minHistoricalPrice}
                <span className="text-xs font-normal text-slate-500 ml-1">/{commodity.unit}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">নির্বাচিত সময়সীমায়</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                {language === 'bn' ? 'সর্বোচ্চ দর' : 'Highest Price'}
              </div>
              <div className="text-2xl font-bold text-rose-700 tabular-nums">
                ৳{maxHistoricalPrice}
                <span className="text-xs font-normal text-slate-500 ml-1">/{commodity.unit}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">নির্বাচিত সময়সীমায়</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                {language === 'bn' ? 'গড় বাজারদর' : 'Average Rate'}
              </div>
              <div className="text-2xl font-bold text-slate-800 tabular-nums">
                ৳{avgHistoricalPrice}
                <span className="text-xs font-normal text-slate-500 ml-1">/{commodity.unit}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">গড় স্থিতিশীলতা</div>
            </div>
          </div>

          {/* Chart Controls & Market Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            
            {/* Market Comparison Selector */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-600">
                {language === 'bn' ? 'বাজারের চার্ট:' : 'Market Chart:'}
              </span>
              <select
                value={compareMarketId}
                onChange={(e) => setCompareMarketId(e.target.value)}
                className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087443]/30"
              >
                {markets.map(m => (
                  <option key={m.id} value={m.id}>
                    {language === 'bn' ? m.name_bn : m.name_en}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Range Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['7d', '30d', '3m', '6m', '1y'] as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-white text-[#087443] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {range === '7d' && (language === 'bn' ? '৭ দিন' : '7 Days')}
                  {range === '30d' && (language === 'bn' ? '৩০ দিন' : '30 Days')}
                  {range === '3m' && (language === 'bn' ? '৩ মাস' : '3 Months')}
                  {range === '6m' && (language === 'bn' ? '৬ মাস' : '6 Months')}
                  {range === '1y' && (language === 'bn' ? '১ বছর' : '1 Year')}
                </button>
              ))}
            </div>

          </div>

          {/* Interactive Recharts Graph */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#087443" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#087443" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickFormatter={(val) => `৳${val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <div className="font-semibold text-slate-300">{label}</div>
                          <div className="text-base font-bold text-emerald-400 tabular-nums">
                            ৳{data.price} <span className="text-xs text-slate-300">/{commodity.unit}</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            সীমা: ৳{data.min_price} – ৳{data.max_price}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#087443"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Data Source & Verification Footer */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#087443]" />
              <span>
                {language === 'bn'
                  ? `তথ্যসূত্র: ${commodity.source_name} (${commodity.source_code}) · সরকার নির্দেশিত ন্যায্যমূল্য`
                  : `Source: ${commodity.source_name} (${commodity.source_code}) · Verified Fair Rate`}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700">
              সর্বশেষ ডেটাবেজ রেকর্ড: {commodity.updated_at}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
