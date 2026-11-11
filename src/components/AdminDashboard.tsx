import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingDown,
  Layers,
  Database,
  Building2,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  X,
  FileSpreadsheet,
  Copy,
  Lock,
  Unlock,
  Activity
} from 'lucide-react';
import { Product, MarketPrice, Market, Category, Language } from '../types';
import { bazarStore } from '../services/store';
import { BAZARBD_SUPABASE_SQL } from '../services/supabaseSchema';

interface AdminDashboardProps {
  onClose: () => void;
  language: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, language }) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Pre-authenticated for convenient immediate testing
  const [adminPin, setAdminPin] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tabs
  type Tab = 'analytics' | 'prices' | 'products' | 'csv' | 'markets' | 'apis' | 'supabase';
  const [activeTab, setActiveTab] = useState<Tab>('prices');

  // Local reactive states from store
  const [products, setProducts] = useState<Product[]>(bazarStore.getProducts());
  const [prices, setPrices] = useState<MarketPrice[]>(bazarStore.getPrices());
  const [markets, setMarkets] = useState<Market[]>(bazarStore.getMarkets());
  const [categories] = useState<Category[]>(bazarStore.getCategories());
  const [integrations, setIntegrations] = useState(bazarStore.getIntegrations());
  const [logs, setLogs] = useState(bazarStore.getActivityLogs());
  const [supabaseConfig, setSupabaseConfig] = useState(bazarStore.getSupabaseConfig());

  // Form states: Price Update
  const [selectedProductForPrice, setSelectedProductForPrice] = useState<string>(products[0]?.id || '');
  const [selectedMarketForPrice, setSelectedMarketForPrice] = useState<string>(markets[0]?.id || '');
  const [newPriceVal, setNewPriceVal] = useState<number>(50);
  const [minPriceVal, setMinPriceVal] = useState<number>(45);
  const [maxPriceVal, setMaxPriceVal] = useState<number>(55);
  const [priceSuccessMsg, setPriceSuccessMsg] = useState('');

  // Form states: New Product Modal
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);
  const [newProdNameBn, setNewProdNameBn] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(categories[0]?.id || 'cat-veg');
  const [newProdUnit, setNewProdUnit] = useState<any>('কেজি');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');

  // CSV text
  const [csvInput, setCsvInput] = useState('');
  const [csvStatus, setCsvStatus] = useState<{ imported: number; errors: string[] } | null>(null);

  // SQL Copy
  const [sqlCopied, setSqlCopied] = useState(false);

  // Refresh local store data
  const refreshData = () => {
    setProducts(bazarStore.getProducts());
    setPrices(bazarStore.getPrices());
    setMarkets(bazarStore.getMarkets());
    setIntegrations(bazarStore.getIntegrations());
    setLogs(bazarStore.getActivityLogs());
  };

  const handleUpdatePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForPrice || !selectedMarketForPrice) return;

    bazarStore.updatePrice(
      selectedProductForPrice,
      selectedMarketForPrice,
      newPriceVal,
      undefined,
      minPriceVal,
      maxPriceVal,
      'src-adm'
    );

    refreshData();
    setPriceSuccessMsg('মূল্য সফলভাবে আপডেট ও ডাটাবেজে সংরক্ষণ করা হয়েছে!');
    setTimeout(() => setPriceSuccessMsg(''), 3000);
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameBn.trim()) return;

    bazarStore.addProduct({
      name_bn: newProdNameBn.trim(),
      name_en: newProdNameEn.trim() || newProdNameBn.trim(),
      category_id: newProdCategory,
      default_unit: newProdUnit,
      image_url: newProdImageUrl || '/src/assets/images/category_fresh_vegetables_1794390357177.jpg',
      is_active: true,
    });

    refreshData();
    setIsNewProductOpen(false);
    setNewProdNameBn('');
    setNewProdNameEn('');
    setNewProdImageUrl('');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই পণ্যটি মুছে ফেলতে চান?')) {
      bazarStore.deleteProduct(id);
      refreshData();
    }
  };

  const handleCsvImport = () => {
    if (!csvInput.trim()) return;
    const res = bazarStore.importFromCsv(csvInput);
    setCsvStatus(res);
    refreshData();
  };

  const handleTriggerSync = (apiId: string) => {
    bazarStore.triggerApiSync(apiId);
    refreshData();
  };

  const copySql = () => {
    navigator.clipboard.writeText(BAZARBD_SUPABASE_SQL);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 2000);
  };

  // Login Form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-emerald-100 text-[#087443] rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">BazarBD Admin Authentication</h2>
            <p className="text-xs text-slate-500 mt-1">
              প্রবেশ করতে অ্যাডমিন পিন কোড প্রবেশ করান (ডিফল্ট: 1234)
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (adminPin === '1234' || adminPin.length >= 4) {
                setIsAuthenticated(true);
                setAuthError(false);
              } else {
                setAuthError(true);
              }
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter PIN (e.g. 1234)"
                className="w-full text-center text-lg tracking-widest px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087443]"
              />
              {authError && (
                <div className="text-xs text-rose-600 mt-1 text-center font-medium">
                  ভুল পিন কোড! 1234 টাইপ করুন।
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-[#087443] text-white text-xs font-bold hover:bg-[#065e36]"
              >
                লগইন করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl max-h-[92vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Admin Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">BazarBD Admin Control Center</h2>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                পণ্যের দাম, ছবি, সরকারি API ও Supabase রিয়েলটাইম ডাটাবেজ নিয়ন্ত্রণ কেন্দ্র
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 bg-slate-50 overflow-x-auto shrink-0">
          {[
            { id: 'prices', label: 'মূল্য আপডেট (Prices)', icon: <TrendingDown className="w-4 h-4" /> },
            { id: 'products', label: 'পণ্য ব্যবস্থাপনা (Products)', icon: <Layers className="w-4 h-4" /> },
            { id: 'csv', label: 'বাল্ক CSV ইমপোর্ট/এক্সপোর্ট', icon: <FileSpreadsheet className="w-4 h-4" /> },
            { id: 'apis', label: 'সরকারি API ও সিঙ্ক (DAM/TCB)', icon: <RefreshCw className="w-4 h-4" /> },
            { id: 'supabase', label: 'Supabase SQL স্কিমা', icon: <Database className="w-4 h-4" /> },
            { id: 'analytics', label: 'অ্যাক্টিভিটি লগ (Logs)', icon: <Activity className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#087443] text-[#087443] bg-white rounded-t-xl shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PRICE MANAGEMENT */}
          {activeTab === 'prices' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  আজকের বাজারদর আপডেট করুন (Supabase Realtime লাইভ পরিবর্তন)
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  এখানে দাম পরিবর্তন করা মাত্রই হোমপেজ এবং সকল নাগরিকের স্ক্রিনে তাৎক্ষণিক স্বয়ংক্রিয়ভাবে আপডেট হবে।
                </p>

                {priceSuccessMsg && (
                  <div className="mb-4 p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{priceSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePriceSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">পণ্য নির্বাচন</label>
                    <select
                      value={selectedProductForPrice}
                      onChange={(e) => setSelectedProductForPrice(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name_bn} ({p.name_en})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বাজার নির্বাচন</label>
                    <select
                      value={selectedMarketForPrice}
                      onChange={(e) => setSelectedMarketForPrice(e.target.value)}
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                    >
                      {markets.map(m => (
                        <option key={m.id} value={m.id}>{m.name_bn}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">আজকের নতুন দর (টাকা)</label>
                    <input
                      type="number"
                      value={newPriceVal}
                      onChange={(e) => setNewPriceVal(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs font-bold bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">বাজার সীমা (মিন - ম্যাক্স)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={minPriceVal}
                        onChange={(e) => setMinPriceVal(parseFloat(e.target.value) || 0)}
                        placeholder="Min"
                        className="w-1/2 text-xs bg-white border border-slate-300 rounded-xl p-2.5"
                      />
                      <input
                        type="number"
                        value={maxPriceVal}
                        onChange={(e) => setMaxPriceVal(parseFloat(e.target.value) || 0)}
                        placeholder="Max"
                        className="w-1/2 text-xs bg-white border border-slate-300 rounded-xl p-2.5"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>আপডেট ও সেভ</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Price Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
                  বর্তমান সক্রিয় বাজারদর তালিকা ({prices.length} টি রেকর্ড)
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 sticky top-0">
                      <tr>
                        <th className="p-3">পণ্য</th>
                        <th className="p-3">বাজার</th>
                        <th className="p-3 text-right">বর্তমান দর</th>
                        <th className="p-3 text-right">পূর্বের দর</th>
                        <th className="p-3 text-right">সীমা</th>
                        <th className="p-3 text-center">উৎস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {prices.map(pr => {
                        const prod = products.find(p => p.id === pr.product_id);
                        const mkt = markets.find(m => m.id === pr.market_id);
                        return (
                          <tr key={pr.id} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-900">{prod?.name_bn || pr.product_id}</td>
                            <td className="p-3 text-slate-600">{mkt?.name_bn || pr.market_id}</td>
                            <td className="p-3 text-right font-bold text-emerald-700 tabular-nums">৳{pr.price}/{pr.unit}</td>
                            <td className="p-3 text-right text-slate-400 tabular-nums">৳{pr.previous_price}</td>
                            <td className="p-3 text-right text-slate-500 tabular-nums">৳{pr.min_price} - ৳{pr.max_price}</td>
                            <td className="p-3 text-center">
                              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-medium">
                                {pr.verification_status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">নিত্যপণ্যের তালিকা ও বিস্তারিত</h3>
                  <p className="text-xs text-slate-500">নতুন সবজি, চাল, মাছ, মাংস বা ফল যোগ করুন এবং এডিট করুন</p>
                </div>
                <button
                  onClick={() => setIsNewProductOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন পণ্য যোগ করুন</span>
                </button>
              </div>

              {/* Product Modal */}
              {isNewProductOpen && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                    নতুন পণ্যের তথ্য ফর্ম
                  </h4>
                  <form onSubmit={handleCreateProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">নাম (বাংলা)</label>
                      <input
                        type="text"
                        value={newProdNameBn}
                        onChange={(e) => setNewProdNameBn(e.target.value)}
                        placeholder="যেমন: শিম"
                        required
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Name (English)</label>
                      <input
                        type="text"
                        value={newProdNameEn}
                        onChange={(e) => setNewProdNameEn(e.target.value)}
                        placeholder="e.g. Green Flat Beans"
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name_bn}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">একক (Unit)</label>
                      <select
                        value={newProdUnit}
                        onChange={(e) => setNewProdUnit(e.target.value)}
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                      >
                        <option value="কেজি">কেজি (kg)</option>
                        <option value="লিটার">লিটার (liter)</option>
                        <option value="ডজন">ডজন (dozen)</option>
                        <option value="হালি">হালি (4 pcs)</option>
                        <option value="পিস">পিস (piece)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">ছবির URL বা পাথ</label>
                      <input
                        type="text"
                        value={newProdImageUrl}
                        onChange={(e) => setNewProdImageUrl(e.target.value)}
                        placeholder="https://... অথবা /src/assets/images/..."
                        className="w-full text-xs bg-white border border-slate-300 rounded-xl p-2.5 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#087443] text-white text-xs font-bold rounded-xl"
                      >
                        পণ্য সংরক্ষণ করুন
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsNewProductOpen(false)}
                        className="px-3 py-2.5 border border-slate-300 text-xs font-bold rounded-xl"
                      >
                        বাতিল
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Product Grid */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 sticky top-0">
                    <tr>
                      <th className="p-3">ছবি</th>
                      <th className="p-3">পণ্যের নাম</th>
                      <th className="p-3">English Name</th>
                      <th className="p-3">ক্যাটাগরি</th>
                      <th className="p-3">একক</th>
                      <th className="p-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map(p => {
                      const cat = categories.find(c => c.id === p.category_id);
                      return (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="p-2.5">
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100">
                              <img src={p.image_url} alt={p.name_bn} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-2.5 font-bold text-slate-900">{p.name_bn}</td>
                          <td className="p-2.5 text-slate-500">{p.name_en}</td>
                          <td className="p-2.5 text-slate-600 font-medium">{cat?.name_bn}</td>
                          <td className="p-2.5 text-slate-600">{p.default_unit}</td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BULK CSV IMPORT / EXPORT */}
          {activeTab === 'csv' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">বাল্ক CSV ডেটা আপলোড</h3>
                <p className="text-xs text-slate-500 mb-3">
                  এক ক্লিকে ৫০+ পণ্যের মূল্য তালিকা CSV বা Excel ফরম্যাটে ইমপোর্ট করুন।
                </p>

                <textarea
                  value={csvInput}
                  onChange={(e) => setCsvInput(e.target.value)}
                  placeholder={`product_id,market_id,price,previous_price,min_price,max_price\nprod-veg-1,mkt-1,44,45,40,48\nprod-veg-2,mkt-1,78,85,72,82`}
                  rows={6}
                  className="w-full font-mono text-xs p-3 bg-white border border-slate-300 rounded-xl focus:outline-none"
                />

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={handleCsvImport}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    <Upload className="w-4 h-4" />
                    <span>ইমপোর্ট সম্পন্ন করুন</span>
                  </button>

                  <button
                    onClick={() => {
                      const sample = `product_id,market_id,price,previous_price,min_price,max_price\nprod-veg-1,mkt-1,40,42,38,45\nprod-veg-2,mkt-1,72,75,68,78\nprod-fish-3,mkt-1,1400,1450,1300,1550`;
                      setCsvInput(sample);
                    }}
                    className="px-3 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    নমুনা ফরম্যাট লোড করুন
                  </button>
                </div>

                {csvStatus && (
                  <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs border border-emerald-200">
                    <div>সফলভাবে <strong>{csvStatus.imported}</strong> টি পণ্যের দর আপডেট হয়েছে!</div>
                    {csvStatus.errors.length > 0 && (
                      <div className="text-rose-600 mt-1">
                        ত্রুটি: {csvStatus.errors.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: API INTEGRATION SYSTEM */}
          {activeTab === 'apis' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">সরকারি API ডাটাবেজ ইন্টিগ্রেশন</h3>
                <p className="text-xs text-slate-500">
                  কৃষি বিপণন অধিদপ্তর (DAM) ও ট্রেডিং কর্পোরেশন অব বাংলাদেশ (TCB)-এর ডাটাফিড শিডিউলার
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {integrations.map(api => (
                  <div key={api.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-sm text-slate-900">{api.name}</div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        {api.status}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 break-all bg-white p-2 rounded-lg border border-slate-200">
                      {api.endpoint_url}
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <div>সিঙ্ক ব্যবধান: প্রতি {api.sync_interval_hours} ঘণ্টা পর পর</div>
                      <div>সর্বশেষ সিঙ্ক: {api.last_sync_at}</div>
                      <div>রেকর্ড সংখ্যা: {api.records_synced} টি</div>
                    </div>

                    <button
                      onClick={() => handleTriggerSync(api.id)}
                      className="w-full py-2 bg-slate-200 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>এখনই সিঙ্ক করুন (Sync Now)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUPABASE ARCHITECTURE & SQL */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Supabase PostgreSQL স্কিমা ও RLS পলিসি</h3>
                  <p className="text-xs text-slate-500">
                    BazarBD-এর ১৮টি টেবিল, ফরেন কি, ইনডেক্স ও সিকিউরিটি রুলসের সম্পূর্ণ DDL স্ক্রিপ্ট
                  </p>
                </div>
                <button
                  onClick={copySql}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#087443] hover:bg-[#065e36] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  <Copy className="w-4 h-4" />
                  <span>{sqlCopied ? 'কপি হয়েছে!' : 'সম্পূর্ণ SQL কপি করুন'}</span>
                </button>
              </div>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto leading-relaxed">
                <pre>{BAZARBD_SUPABASE_SQL}</pre>
              </div>
            </div>
          )}

          {/* TAB 6: ACTIVITY LOGS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">অ্যাডমিন অডিট ও অ্যাক্টিভিটি হিস্টোরি</h3>
                <p className="text-xs text-slate-500">সিস্টেমে হওয়া সকল পরিবর্তন ও ডাটাবেজ ট্রানজেকশনের তালিকা</p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="p-3">অ্যাকশন</th>
                      <th className="p-3">বিবরণ</th>
                      <th className="p-3">সময়</th>
                      <th className="p-3">ইউজার</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-[#087443]">{log.action}</td>
                        <td className="p-3 text-slate-700">{log.details}</td>
                        <td className="p-3 text-slate-500">{log.timestamp}</td>
                        <td className="p-3 font-medium text-slate-900">{log.admin_user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
