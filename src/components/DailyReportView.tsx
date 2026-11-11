import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { CommodityDisplayItem, Market, Language } from '../types';
import { bazarStore } from '../services/store';

interface DailyReportViewProps {
  commodities: CommodityDisplayItem[];
  markets: Market[];
  language: Language;
}

export const DailyReportView: React.FC<DailyReportViewProps> = ({
  commodities,
  markets,
  language,
}) => {
  const [filterMarketId, setFilterMarketId] = useState<string>('all');
  const [filterCategoryId, setFilterCategoryId] = useState<string>('all');

  const categories = bazarStore.getCategories();

  const filteredCommodities = commodities.filter(c => {
    if (filterMarketId !== 'all' && c.market_id !== filterMarketId) return false;
    if (filterCategoryId !== 'all' && c.category_id !== filterCategoryId) return false;
    return true;
  });

  const handleDownloadCsv = () => {
    const csvContent = bazarStore.exportToCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BazarBD_Market_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Action Header (Hidden in Print) */}
      <div className="no-print bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#087443] border border-emerald-200/60 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'দৈনিক বাজার প্রতিবেদন' : 'Daily Commodity Price Bulletin'}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {language === 'bn' ? 'আজকের বাজারদর ও মূল্য বিবরণী' : 'Official Daily Price Bulletin'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'bn'
              ? 'মুদ্রণযোগ্য অফিসিয়াল ফরম্যাট এবং সিএসভি (CSV) স্প্রেডশিট ডাউনলোড করুন।'
              : 'Official print-ready format and downloadable CSV dataset for research and market monitoring.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Market Filter */}
          <select
            value={filterMarketId}
            onChange={(e) => setFilterMarketId(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none"
          >
            <option value="all">{language === 'bn' ? 'সকল বাজার' : 'All Markets'}</option>
            {markets.map(m => (
              <option key={m.id} value={m.id}>
                {language === 'bn' ? m.name_bn : m.name_en}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none"
          >
            <option value="all">{language === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {language === 'bn' ? c.name_bn : c.name_en}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <button
            onClick={handleDownloadCsv}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{language === 'bn' ? 'CSV ডাউনলোড' : 'Export CSV'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'bn' ? 'প্রিন্ট রিপোর্ট' : 'Print Bulletin'}</span>
          </button>
        </div>
      </div>

      {/* Official Printable Bulletin Sheet */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
        
        {/* Printable Bulletin Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
          <div className="inline-block px-3 py-1 bg-emerald-100 text-[#087443] text-xs font-bold rounded-md mb-2">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত ডাটাফিড ও বাজারবিডি মনিটরিং
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            দৈনিক নিত্যপ্রয়োজনীয় পণ্যের বাজারদর বুলেটিন
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            BazarBD – Bangladesh Daily Essential Commodity Price Monitoring Service
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100 font-medium">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>তারিখ: {todayStr}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>তথ্যকেন্দ্র: কারওয়ান বাজার ও জাতীয় পাইকারি কেন্দ্রসমূহ</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>উৎস: DAM ও TCB অনুমোদিত রেকর্ড</span>
            </span>
          </div>
        </div>

        {/* Report Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="text-[11px] text-slate-500">{language === 'bn' ? 'মোট পণ্যের সংখ্যা' : 'Total Items'}</div>
            <div className="text-xl font-bold text-slate-900 tabular-nums">{filteredCommodities.length} টি</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <div className="text-[11px] text-emerald-800">{language === 'bn' ? 'দর হ্রাস প্রাপ্ত পণ্য' : 'Price Drops'}</div>
            <div className="text-xl font-bold text-emerald-700 tabular-nums">
              {filteredCommodities.filter(c => c.price_change < 0).length} টি
            </div>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
            <div className="text-[11px] text-rose-800">{language === 'bn' ? 'দর বৃদ্ধি প্রাপ্ত পণ্য' : 'Price Increases'}</div>
            <div className="text-xl font-bold text-rose-700 tabular-nums">
              {filteredCommodities.filter(c => c.price_change > 0).length} টি
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <div className="text-[11px] text-slate-500">{language === 'bn' ? 'অপরিবর্তিত দর' : 'Unchanged'}</div>
            <div className="text-xl font-bold text-slate-700 tabular-nums">
              {filteredCommodities.filter(c => c.price_change === 0).length} টি
            </div>
          </div>
        </div>

        {/* Commodity Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
              <tr>
                <th className="p-3 border-r border-slate-200">ক্রমিক</th>
                <th className="p-3 border-r border-slate-200">পণ্যের বিবরণ (বাংলা / ইংরেজি)</th>
                <th className="p-3 border-r border-slate-200">ক্যাটাগরি</th>
                <th className="p-3 border-r border-slate-200">বাজার</th>
                <th className="p-3 border-r border-slate-200 text-right">আজকের দর (৳)</th>
                <th className="p-3 border-r border-slate-200 text-right">পূর্বের দর (৳)</th>
                <th className="p-3 border-r border-slate-200 text-right">পরিবর্তন</th>
                <th className="p-3 border-r border-slate-200 text-right">বাজার সীমা</th>
                <th className="p-3 text-center">তথ্যসূত্র</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCommodities.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                  <td className="p-3 border-r border-slate-200 font-medium text-slate-500 text-center tabular-nums">
                    {idx + 1}
                  </td>
                  <td className="p-3 border-r border-slate-200 font-bold text-slate-900">
                    {item.name_bn}{' '}
                    <span className="text-[11px] font-normal text-slate-500 block">
                      {item.name_en}
                    </span>
                  </td>
                  <td className="p-3 border-r border-slate-200 text-slate-600 font-medium">
                    {item.category_name_bn}
                  </td>
                  <td className="p-3 border-r border-slate-200 text-slate-600">
                    {item.market_name_bn}
                  </td>
                  <td className="p-3 border-r border-slate-200 text-right font-bold text-slate-900 tabular-nums">
                    ৳{item.current_price} /{item.unit}
                  </td>
                  <td className="p-3 border-r border-slate-200 text-right text-slate-500 tabular-nums">
                    ৳{item.previous_price}
                  </td>
                  <td className="p-3 border-r border-slate-200 text-right font-semibold tabular-nums">
                    {item.price_change < 0 ? (
                      <span className="text-emerald-700">-৳{Math.abs(item.price_change)} ({Math.abs(item.price_change_percent).toFixed(1)}%)</span>
                    ) : item.price_change > 0 ? (
                      <span className="text-rose-700">+৳{item.price_change} ({item.price_change_percent.toFixed(1)}%)</span>
                    ) : (
                      <span className="text-slate-400">০.০%</span>
                    )}
                  </td>
                  <td className="p-3 border-r border-slate-200 text-right text-slate-600 tabular-nums">
                    ৳{item.min_price} – ৳{item.max_price}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {item.source_code}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Sign-off and Disclaimer for Printout */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <div className="font-semibold text-slate-800">বাজারবিডি প্রাইস মনিটরিং সেল</div>
            <div>প্রতিবেদন প্রস্তুতকারক: বাজার পরিদর্শক দল · কৃষি বিপণন অধিদপ্তর ফিড</div>
          </div>
          <div className="text-center sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0">
            <div className="w-36 border-b border-slate-400 mx-auto sm:ml-auto mb-1"></div>
            <div className="text-[11px] text-slate-600 font-medium">যাচাইকারী কর্মকর্তার স্বাক্ষর</div>
          </div>
        </div>

      </div>

    </div>
  );
};
