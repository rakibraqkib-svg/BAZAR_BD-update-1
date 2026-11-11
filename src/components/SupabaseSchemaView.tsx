import React, { useState } from 'react';
import { Database, Copy, CheckCircle2, ShieldCheck, Key, Server, Terminal, ExternalLink } from 'lucide-react';
import { BAZARBD_SUPABASE_SQL } from '../services/supabaseSchema';
import { Language } from '../types';

interface SupabaseSchemaViewProps {
  language: Language;
}

export const SupabaseSchemaView: React.FC<SupabaseSchemaViewProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BAZARBD_SUPABASE_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#087443] border border-emerald-200/60 mb-2">
              <Database className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সুপাবেজ পোস্টগ্রেস্কুয়েল ডাটাবেজ' : 'Supabase PostgreSQL Architecture'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {language === 'bn' ? 'সম্পূর্ণ ডাটাবেজ স্কিমা ও সিকিউরিটি পলিসি (RLS)' : 'Complete Production Database Schema & RLS'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {language === 'bn'
                ? '১৮টি টেবিল (পণ্য, বাজার, প্রতিদিনের দর, হিস্টোরি, সরকারি API লগ) ও রিয়েলটাইম পাবলিকেশন সংবলিত প্রডাকশন-রেডি SQL স্ক্রিপ্ট।'
                : '18 comprehensive tables including commodities, markets, daily prices, time series history, API sync logs, and Supabase Realtime replication.'}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (language === 'bn' ? 'কপি সম্পন্ন!' : 'Copied!') : (language === 'bn' ? 'সম্পূর্ণ SQL কপি করুন' : 'Copy SQL Schema')}</span>
          </button>
        </div>

        {/* Supabase 18 Tables Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mt-6 pt-6 border-t border-slate-100 text-xs">
          {[
            '1. profiles', '2. roles', '3. categories', '4. products', '5. product_images', '6. divisions',
            '7. districts', '8. upazilas', '9. markets', '10. market_prices', '11. price_history', '12. data_sources',
            '13. api_integrations', '14. api_sync_logs', '15. price_reports', '16. admin_activity_logs', '17. notifications', '18. website_settings'
          ].map(table => (
            <div key={table} className="p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 font-mono text-[11px] truncate">
              {table}
            </div>
          ))}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="bg-slate-950 text-slate-200 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>schema.sql (PostgreSQL / Supabase DDL)</span>
          </div>
          <span className="text-[11px] bg-slate-800 text-emerald-300 px-2.5 py-0.5 rounded-md font-mono">
            PostgreSQL 15+
          </span>
        </div>

        <div className="mt-4 font-mono text-xs overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed text-slate-300">
          <pre>{BAZARBD_SUPABASE_SQL}</pre>
        </div>
      </div>

    </div>
  );
};
