/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingDown,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Sparkles,
  RefreshCw,
  Scale,
  FileText
} from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RightSidebar } from './components/RightSidebar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { PriceHistoryModal } from './components/PriceHistoryModal';
import { MarketComparisonView } from './components/MarketComparisonView';
import { DailyReportView } from './components/DailyReportView';
import { PriceTrendsView } from './components/PriceTrendsView';
import { SupabaseSchemaView } from './components/SupabaseSchemaView';
import { AdminDashboard } from './components/AdminDashboard';
import { AiAssistantModal } from './components/AiAssistantModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { LiveSupabaseModal } from './components/LiveSupabaseModal';
import { Footer } from './components/Footer';
import { bazarStore } from './services/store';
import { CommodityDisplayItem, Language } from './types';

type SortOption = 'featured' | 'drop' | 'rise' | 'price-asc' | 'price-desc';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('mkt-1');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'comparison' | 'trends' | 'report' | 'database'>('home');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Modals
  const [selectedHistoryCommodity, setSelectedHistoryCommodity] = useState<CommodityDisplayItem | null>(null);
  const [alertTargetCommodity, setAlertTargetCommodity] = useState<CommodityDisplayItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Store data
  const [commodities, setCommodities] = useState<CommodityDisplayItem[]>(() =>
    bazarStore.getDisplayCommodities(selectedMarketId)
  );
  const [favorites, setFavorites] = useState<Set<string>>(() => bazarStore.getFavorites());
  const [markets] = useState(() => bazarStore.getMarkets());
  const [divisions] = useState(() => bazarStore.getDivisions());
  const [categories] = useState(() => bazarStore.getCategories());
  const [products] = useState(() => bazarStore.getProducts());
  const [alerts, setAlerts] = useState(() => bazarStore.getAlerts());

  // Subscribe to real-time store updates
  useEffect(() => {
    const unsubscribe = bazarStore.subscribe(() => {
      setCommodities(bazarStore.getDisplayCommodities(selectedMarketId));
      setFavorites(bazarStore.getFavorites());
      setAlerts(bazarStore.getAlerts());
    });
    return unsubscribe;
  }, [selectedMarketId]);

  // Refresh commodities when market changes
  useEffect(() => {
    setCommodities(bazarStore.getDisplayCommodities(selectedMarketId));
  }, [selectedMarketId]);

  // Filter & Sort Commodities
  const displayedCommodities = useMemo(() => {
    let list = [...commodities];

    // Filter by Category
    if (selectedCategory) {
      list = list.filter(c => c.category_id === selectedCategory);
    }

    // Sort
    switch (sortOption) {
      case 'drop':
        list.sort((a, b) => a.price_change_percent - b.price_change_percent);
        break;
      case 'rise':
        list.sort((a, b) => b.price_change_percent - a.price_change_percent);
        break;
      case 'price-asc':
        list.sort((a, b) => a.current_price - b.current_price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.current_price - a.current_price);
        break;
      default:
        // Featured / default order
        break;
    }

    return list;
  }, [commodities, selectedCategory, sortOption]);

  const handleToggleFavorite = (productId: string) => {
    bazarStore.toggleFavorite(productId);
    setFavorites(bazarStore.getFavorites());
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5] flex flex-col font-sans text-slate-900">
      
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        markets={markets}
        divisions={divisions}
        selectedMarketId={selectedMarketId}
        onSelectMarket={setSelectedMarketId}
        commodities={commodities}
        onSelectCommodity={(c) => setSelectedHistoryCommodity(c)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenReport={() => setActiveView('report')}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        unreadAlertsCount={alerts.filter(a => !a.is_notified).length}
      />

      {/* Main Container: Left Sidebar + Central Feed + Right Sidebar */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex items-start">
        
        {/* Left Sidebar (FreshCart Inspired) */}
        <Sidebar
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeView={activeView}
          setActiveView={setActiveView}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenAi={() => setIsAiOpen(true)}
          categories={categories}
        />

        {/* Central Dashboard Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-6">
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950" role="note" aria-label={language === 'bn' ? 'ডেমো ডেটা সতর্কতা' : 'Demo data notice'}>
            <span className="mt-0.5 text-lg" aria-hidden="true">ⓘ</span>
            <div className="min-w-0">
              <p className="text-sm font-bold">{language === 'bn' ? 'ডেমো ডেটা — সরকারি লাইভ দর নয়' : 'Demo data — not verified live government prices'}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-amber-900">
                {language === 'bn'
                  ? 'এই সাইটে বর্তমানে নমুনা/লোকাল ডেটা দেখানো হতে পারে। প্রশাসক কর্তৃক নির্ভরযোগ্য উৎস থেকে যাচাই করে দাম প্রকাশ না করা পর্যন্ত কেনাকাটার সিদ্ধান্তে এই দাম ব্যবহার করবেন না।'
                  : 'This site may currently show sample or locally stored data. Do not rely on these prices for purchasing decisions until an administrator verifies and publishes them from a trusted source.'}
              </p>
            </div>
          </div>

          {/* VIEW 1: HOME DASHBOARD */}
          {activeView === 'home' && (
            <div className="space-y-6">
              
              {/* Hero Banner */}
              <HeroBanner
                language={language}
                onOpenAi={() => setIsAiOpen(true)}
                onOpenComparison={() => setActiveView('comparison')}
                totalProductsCount={commodities.length}
                totalMarketsCount={markets.length}
              />

              {/* Category Navigation Pills */}
              <CategoryNav
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                language={language}
              />

              {/* Filter & Sort Bar */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {language === 'bn' ? 'আজকের প্রয়োজনীয় পণ্যসমূহ' : "Today's Essential Commodities"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {displayedCommodities.length} {language === 'bn' ? 'টি পণ্য প্রদর্শিত' : 'items'}
                  </span>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সাজান:' : 'Sort By:'}</span>
                  </span>

                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#087443]/30"
                  >
                    <option value="featured">{language === 'bn' ? 'প্রস্তাবিত ক্রম' : 'Featured'}</option>
                    <option value="drop">{language === 'bn' ? 'সর্বোচ্চ দর পতন (স্বস্তি)' : 'Biggest Price Drop'}</option>
                    <option value="rise">{language === 'bn' ? 'সর্বোচ্চ দর বৃদ্ধি' : 'Biggest Price Rise'}</option>
                    <option value="price-asc">{language === 'bn' ? 'কম দাম থেকে বেশি' : 'Price: Low to High'}</option>
                    <option value="price-desc">{language === 'bn' ? 'বেশি দাম থেকে কম' : 'Price: High to Low'}</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {displayedCommodities.map((item) => (
                  <ProductCard
                    key={item.id}
                    commodity={item}
                    language={language}
                    onOpenHistory={(c) => setSelectedHistoryCommodity(c)}
                    isFavorite={favorites.has(item.product_id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSetAlert={(c) => setAlertTargetCommodity(c)}
                  />
                ))}
              </div>

            </div>
          )}

          {/* VIEW 2: MARKET COMPARISON */}
          {activeView === 'comparison' && (
            <MarketComparisonView
              products={products}
              markets={markets}
              language={language}
            />
          )}

          {/* VIEW 3: PRICE TRENDS */}
          {activeView === 'trends' && (
            <PriceTrendsView
              products={products}
              markets={markets}
              language={language}
            />
          )}

          {/* VIEW 4: DAILY REPORT */}
          {activeView === 'report' && (
            <DailyReportView
              commodities={commodities}
              markets={markets}
              language={language}
            />
          )}

          {/* VIEW 5: SUPABASE DATABASE ARCHITECTURE */}
          {activeView === 'database' && (
            <SupabaseSchemaView language={language} />
          )}

        </main>

        {/* Right Sidebar (FreshCart "Your Cart & Market Summary" Inspired) */}
        <RightSidebar
          commodities={commodities}
          favorites={favorites}
          onSelectCommodity={(c) => setSelectedHistoryCommodity(c)}
          language={language}
          onOpenComparison={() => setActiveView('comparison')}
          onOpenReport={() => setActiveView('report')}
        />

      </div>

      {/* Footer */}
      <Footer
        language={language}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenReport={() => setActiveView('report')}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenComparison={() => setActiveView('comparison')}
      />

      {/* Interactive Price History Modal */}
      {selectedHistoryCommodity && (
        <PriceHistoryModal
          commodity={selectedHistoryCommodity}
          onClose={() => setSelectedHistoryCommodity(null)}
          markets={markets}
          language={language}
        />
      )}

      {/* Price Alert Modal */}
      {alertTargetCommodity && (
        <PriceAlertModal
          commodity={alertTargetCommodity}
          onClose={() => setAlertTargetCommodity(null)}
          language={language}
        />
      )}

      {/* Admin Dashboard Control Panel */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          language={language}
        />
      )}

      {/* AI Assistant Modal */}
      {isAiOpen && (
        <AiAssistantModal
          onClose={() => setIsAiOpen(false)}
          language={language}
        />
      )}

      {/* Supabase Live Modal */}
      {isSupabaseModalOpen && (
        <LiveSupabaseModal
          onClose={() => setIsSupabaseModalOpen(false)}
          language={language}
        />
      )}

    </div>
  );
}
