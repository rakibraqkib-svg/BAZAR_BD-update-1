import React, { useState } from 'react';
import {
  Database,
  X,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Download,
  Terminal,
  RefreshCw,
  Server,
  Key,
  ShieldCheck
} from 'lucide-react';
import { BAZARBD_SUPABASE_SQL } from '../services/supabaseSchema';
import { getSupabaseCredentials, testSupabaseConnection } from '../services/supabaseClient';
import { bazarStore } from '../services/store';
import { Language } from '../types';

interface LiveSupabaseModalProps {
  onClose: () => void;
  language: Language;
}

export const LiveSupabaseModal: React.FC<LiveSupabaseModalProps> = ({ onClose, language }) => {
  const currentCreds = getSupabaseCredentials();
  const [supabaseUrl, setSupabaseUrl] = useState(currentCreds.url);
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(currentCreds.anonKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; tablesExist: boolean } | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestAndConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseUrl.trim() || !supabaseAnonKey.trim()) return;

    setTesting(true);
    setTestResult(null);

    const result = await testSupabaseConnection(supabaseUrl.trim(), supabaseAnonKey.trim());
    setTestResult(result);
    setTesting(false);

    if (result.success) {
      bazarStore.saveSupabaseConfig({
        supabaseUrl: supabaseUrl.trim(),
        supabaseAnonKey: supabaseAnonKey.trim(),
        isConnected: true,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(BAZARBD_SUPABASE_SQL);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#087443] to-[#065e36] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg">
                  {language === 'bn' ? 'সুপাবেজে সাইট লাইভ করুন (Live in Supabase)' : 'Connect & Go Live with Supabase'}
                </h3>
                <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  PostgreSQL
                </span>
              </div>
              <p className="text-xs text-emerald-100/90">
                {language === 'bn' ? 'আপনার নিজস্ব Supabase প্রজেক্ট লিংক করুন ও সম্পূর্ণ কোড জিপ ডাউনলোড করুন' : 'Link your custom Supabase project and download complete source zip'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Direct Download Project ZIP */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#087443]" />
                <h4 className="font-bold text-sm text-slate-900">
                  {language === 'bn' ? 'সম্পূর্ণ প্রজেক্ট জিপ ফাইল (Download Project ZIP)' : 'Download Full Source Code (.ZIP)'}
                </h4>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {language === 'bn'
                  ? 'সবগুলো কম্পোনেন্ট, Supabase স্কিমা, প্যাকেজ এবং এসেটসহ সম্পূর্ণ কার্যকর সোর্স কোড ডাউনলোড করুন।'
                  : 'Includes all React components, Supabase SQL schema, package configs, and images.'}
              </p>
            </div>

            <a
              href="/bazarbd-project.zip"
              download="bazarbd-project.zip"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold shadow-xs transition-colors shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'bn' ? 'জিপ ডাউনলোড করুন (4 MB)' : 'Download .ZIP (4 MB)'}</span>
            </a>
          </div>

          {/* Section 2: 3-Step Supabase Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'bn' ? 'Supabase-এ লাইভ করার ৩টি সহজ ধাপ' : '3 Easy Steps to Go Live on Supabase'}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#087443] font-bold flex items-center justify-center text-xs">
                  ১
                </div>
                <div className="font-bold text-slate-900">Supabase প্রজেক্ট খুলুন</div>
                <div className="text-slate-500 text-[11px] leading-relaxed">
                  <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#087443] underline font-medium inline-flex items-center gap-0.5">
                    supabase.com <ExternalLink className="w-2.5 h-2.5" />
                  </a> এ লগইন করে একটি নতুন ফ্রি প্রজেক্ট তৈরি করুন।
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#087443] font-bold flex items-center justify-center text-xs">
                  ২
                </div>
                <div className="font-bold text-slate-900">SQL স্কিমা রান করুন</div>
                <div className="text-slate-500 text-[11px] leading-relaxed">
                  Supabase Dashboard এর <strong>SQL Editor</strong>-এ গিয়ে নিচের ১৮টি টেবিলের স্ক্রিপ্ট পেস্ট করে Run দিন।
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#087443] font-bold flex items-center justify-center text-xs">
                  ৩
                </div>
                <div className="font-bold text-slate-900">API কী ও URL দিয়ে কানেক্ট করুন</div>
                <div className="text-slate-500 text-[11px] leading-relaxed">
                  Project Settings &gt; API থেকে URL এবং anon public key নিচে দিয়ে কানেক্ট বাটনে চাপ দিন।
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Live Connection Form */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'Supabase প্রজেক্ট ক্রিডেনশিয়াল' : 'Supabase Credentials'}</span>
            </h4>

            <form onSubmit={handleTestAndConnect} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Project URL (e.g. https://your-project-id.supabase.co)
                </label>
                <input
                  type="url"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  placeholder="https://xyzabcdefghijklm.supabase.co"
                  required
                  className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087443]/30 focus:border-[#087443]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Anon Public API Key (anon public key)
                </label>
                <input
                  type="password"
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  required
                  className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087443]/30 focus:border-[#087443]"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={testing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                >
                  {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Server className="w-4 h-4" />}
                  <span>{testing ? 'যাচাই করা হচ্ছে...' : 'কানেক্ট ও ভেরিফাই করুন (Connect & Go Live)'}</span>
                </button>
              </div>
            </form>

            {/* Test Result Indicator */}
            {testResult && (
              <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}>
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    {testResult.success ? 'Supabase কানেকশন সফল হয়েছে!' : 'কানেকশন ব্যর্থ হয়েছে'}
                  </div>
                  <div className="text-[11px] mt-0.5 leading-relaxed">{testResult.message}</div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: SQL Copy Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {language === 'bn' ? 'Supabase SQL স্কিমা (১৮টি টেবিল ও RLS রুলস)' : 'Supabase SQL Schema (18 Tables & RLS)'}
              </span>
              <button
                onClick={copySql}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{sqlCopied ? 'কপি হয়েছে!' : 'SQL কপি করুন'}</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl text-xs font-mono max-h-36 overflow-y-auto">
              <pre>{BAZARBD_SUPABASE_SQL.slice(0, 1000)}...\n-- Click "SQL কপি করুন" above for the full 18-table script.</pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
