import {
  Product,
  MarketPrice,
  Category,
  Market,
  Division,
  District,
  DataSource,
  ApiIntegration,
  CommodityDisplayItem,
  PriceHistoryPoint,
  AdminActivityLog,
  PriceAlert
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_DATA_SOURCES,
  INITIAL_DISTRICTS,
  INITIAL_DIVISIONS,
  INITIAL_MARKETS,
  INITIAL_PRICES,
  INITIAL_PRODUCTS,
  INITIAL_API_INTEGRATIONS
} from '../data/initialData';

const STORAGE_KEYS = {
  PRODUCTS: 'bazarbd_products_v1',
  PRICES: 'bazarbd_prices_v1',
  MARKETS: 'bazarbd_markets_v1',
  CATEGORIES: 'bazarbd_categories_v1',
  INTEGRATIONS: 'bazarbd_integrations_v1',
  FAVORITES: 'bazarbd_favorites_v1',
  ALERTS: 'bazarbd_alerts_v1',
  ACTIVITY_LOGS: 'bazarbd_activity_v1',
  SUPABASE_CONFIG: 'bazarbd_supabase_config_v1',
};

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
}

// Event dispatcher for real-time reactivity simulation
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function emitChange() {
  listeners.forEach(l => {
    try {
      l();
    } catch (e) {
      console.error(e);
    }
  });
}

class BazarStore {
  private products: Product[] = [];
  private prices: MarketPrice[] = [];
  private markets: Market[] = [];
  private categories: Category[] = [];
  private integrations: ApiIntegration[] = [];
  private favorites: Set<string> = new Set();
  private alerts: PriceAlert[] = [];
  private activityLogs: AdminActivityLog[] = [];
  private supabaseConfig: SupabaseConfig = {
    supabaseUrl: '',
    supabaseAnonKey: '',
    isConnected: false,
  };

  constructor() {
    this.loadInitial();
  }

  private loadInitial() {
    try {
      const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      this.products = storedProds ? JSON.parse(storedProds) : INITIAL_PRODUCTS;

      const storedPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
      this.prices = storedPrices ? JSON.parse(storedPrices) : INITIAL_PRICES;

      const storedMkts = localStorage.getItem(STORAGE_KEYS.MARKETS);
      this.markets = storedMkts ? JSON.parse(storedMkts) : INITIAL_MARKETS;

      const storedCats = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      this.categories = storedCats ? JSON.parse(storedCats) : INITIAL_CATEGORIES;

      const storedIntegrations = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
      this.integrations = storedIntegrations ? JSON.parse(storedIntegrations) : INITIAL_API_INTEGRATIONS;

      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      this.favorites = storedFavs ? new Set(JSON.parse(storedFavs)) : new Set(['prod-veg-1', 'prod-veg-2', 'prod-rice-1', 'prod-fish-3', 'prod-meat-1']);

      const storedAlerts = localStorage.getItem(STORAGE_KEYS.ALERTS);
      this.alerts = storedAlerts ? JSON.parse(storedAlerts) : [
        { id: 'alt-1', product_id: 'prod-veg-2', target_price: 70, direction: 'below', created_at: '2026-03-08', is_notified: false },
        { id: 'alt-2', product_id: 'prod-egg-1', target_price: 130, direction: 'below', created_at: '2026-03-08', is_notified: true },
      ];

      const storedLogs = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
      this.activityLogs = storedLogs ? JSON.parse(storedLogs) : [
        { id: 'log-1', action: 'PRICE_UPDATE', details: 'Updated Local Onion price from ৳85 to ৳75 at Karwan Bazar', timestamp: 'Today 08:30 AM', admin_user: 'DAM Market Officer' },
        { id: 'log-2', action: 'API_SYNC', details: 'Automated DAM daily agricultural feed synchronised 142 records', timestamp: 'Today 07:45 AM', admin_user: 'System Bot' },
        { id: 'log-3', action: 'PRODUCT_ADD', details: 'Verified Padma Hilsa commodity specification', timestamp: 'Yesterday 04:15 PM', admin_user: 'Super Admin' },
      ];

      const storedSupa = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (storedSupa) {
        this.supabaseConfig = JSON.parse(storedSupa);
      }
    } catch {
      this.products = INITIAL_PRODUCTS;
      this.prices = INITIAL_PRICES;
      this.markets = INITIAL_MARKETS;
      this.categories = INITIAL_CATEGORIES;
      this.integrations = INITIAL_API_INTEGRATIONS;
    }
  }

  private persist(key: string, data: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage persistence failed', e);
    }
    emitChange();
  }

  // Getters
  public getProducts(): Product[] {
    return [...this.products];
  }

  public getPrices(): MarketPrice[] {
    return [...this.prices];
  }

  public getMarkets(): Market[] {
    return [...this.markets];
  }

  public getDivisions(): Division[] {
    return INITIAL_DIVISIONS;
  }

  public getDistricts(): District[] {
    return INITIAL_DISTRICTS;
  }

  public getCategories(): Category[] {
    return [...this.categories];
  }

  public getDataSources(): DataSource[] {
    return INITIAL_DATA_SOURCES;
  }

  public getIntegrations(): ApiIntegration[] {
    return [...this.integrations];
  }

  public getFavorites(): Set<string> {
    return new Set(this.favorites);
  }

  public getAlerts(): PriceAlert[] {
    return [...this.alerts];
  }

  public getActivityLogs(): AdminActivityLog[] {
    return [...this.activityLogs];
  }

  public getSupabaseConfig(): SupabaseConfig {
    return { ...this.supabaseConfig };
  }

  public saveSupabaseConfig(config: SupabaseConfig) {
    this.supabaseConfig = config;
    this.persist(STORAGE_KEYS.SUPABASE_CONFIG, config);
  }

  public subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  // Favorites toggle
  public toggleFavorite(productId: string) {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
    } else {
      this.favorites.add(productId);
    }
    this.persist(STORAGE_KEYS.FAVORITES, Array.from(this.favorites));
  }

  // Price Alert
  public addAlert(productId: string, targetPrice: number, direction: 'below' | 'above') {
    const newAlert: PriceAlert = {
      id: `alt-${Date.now()}`,
      product_id: productId,
      target_price: targetPrice,
      direction,
      created_at: new Date().toISOString().split('T')[0],
      is_notified: false,
    };
    this.alerts.unshift(newAlert);
    this.persist(STORAGE_KEYS.ALERTS, this.alerts);
    return newAlert;
  }

  public removeAlert(id: string) {
    this.alerts = this.alerts.filter(a => a.id !== id);
    this.persist(STORAGE_KEYS.ALERTS, this.alerts);
  }

  // Price CRUD
  public updatePrice(
    productId: string,
    marketId: string,
    newPrice: number,
    previousPrice?: number,
    minPrice?: number,
    maxPrice?: number,
    sourceId: string = 'src-adm'
  ) {
    const existingIndex = this.prices.findIndex(
      p => p.product_id === productId && p.market_id === marketId
    );

    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const product = this.products.find(p => p.id === productId);

    if (existingIndex >= 0) {
      const old = this.prices[existingIndex];
      const prev = previousPrice !== undefined ? previousPrice : old.price;
      const min = minPrice !== undefined ? minPrice : Math.min(newPrice, old.min_price);
      const max = maxPrice !== undefined ? maxPrice : Math.max(newPrice, old.max_price);

      this.prices[existingIndex] = {
        ...old,
        price: newPrice,
        previous_price: prev,
        min_price: min,
        max_price: max,
        source_id: sourceId,
        verification_status: 'verified',
        updated_at: `Today ${nowStr}`,
      };
    } else {
      const newPriceRecord: MarketPrice = {
        id: `prc-${Date.now()}`,
        product_id: productId,
        market_id: marketId,
        price: newPrice,
        previous_price: previousPrice || newPrice,
        min_price: minPrice || Math.round(newPrice * 0.92),
        max_price: maxPrice || Math.round(newPrice * 1.08),
        unit: product?.default_unit || 'কেজি',
        source_id: sourceId,
        verification_status: 'verified',
        recorded_at: new Date().toISOString().split('T')[0],
        updated_at: `Today ${nowStr}`,
      };
      this.prices.unshift(newPriceRecord);
    }

    // Log Activity
    this.logActivity('PRICE_UPDATE', `Updated ${product?.name_bn || productId} price to ৳${newPrice}`, 'Admin');

    this.persist(STORAGE_KEYS.PRICES, this.prices);
  }

  // Product CRUD
  public addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0],
    };
    this.products.unshift(newProduct);
    this.logActivity('PRODUCT_ADD', `Added product: ${newProduct.name_bn} (${newProduct.name_en})`, 'Admin');
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>) {
    this.products = this.products.map(p => (p.id === id ? { ...p, ...updates } : p));
    this.logActivity('PRODUCT_EDIT', `Updated product ID: ${id}`, 'Admin');
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
  }

  public deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);
    this.prices = this.prices.filter(pr => pr.product_id !== id);
    this.logActivity('PRODUCT_DELETE', `Deleted product ID: ${id}`, 'Admin');
    this.persist(STORAGE_KEYS.PRODUCTS, this.products);
    this.persist(STORAGE_KEYS.PRICES, this.prices);
  }

  // Market CRUD
  public addMarket(market: Omit<Market, 'id'>) {
    const newMarket: Market = {
      ...market,
      id: `mkt-${Date.now()}`,
    };
    this.markets.push(newMarket);
    this.logActivity('MARKET_ADD', `Added market: ${newMarket.name_bn}`, 'Admin');
    this.persist(STORAGE_KEYS.MARKETS, this.markets);
    return newMarket;
  }

  // Activity Logger
  private logActivity(action: string, details: string, admin_user: string) {
    const log: AdminActivityLog = {
      id: `log-${Date.now()}`,
      action,
      details,
      timestamp: `Today ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
      admin_user,
    };
    this.activityLogs.unshift(log);
    if (this.activityLogs.length > 50) this.activityLogs.pop();
    this.persist(STORAGE_KEYS.ACTIVITY_LOGS, this.activityLogs);
  }

  // API Sync Trigger
  public triggerApiSync(apiId: string): { success: boolean; message: string; count: number } {
    const target = this.integrations.find(i => i.id === apiId);
    if (!target) return { success: false, message: 'API Integration not found', count: 0 };

    const syncCount = Math.floor(Math.random() * 25) + 15;
    target.last_sync_at = `Today ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    target.last_sync_status = 'success';
    target.records_synced += syncCount;

    // Simulate minor fluctuations in 3 random prices
    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * this.prices.length);
      const pr = this.prices[idx];
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
      pr.previous_price = pr.price;
      pr.price = Math.max(10, pr.price + delta);
      pr.updated_at = `Today ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
      pr.verification_status = 'government';
    }

    this.logActivity('API_SYNC', `Sync completed for ${target.name}. Updated ${syncCount} commodity feeds.`, 'System Sync');
    this.persist(STORAGE_KEYS.INTEGRATIONS, this.integrations);
    this.persist(STORAGE_KEYS.PRICES, this.prices);

    return {
      success: true,
      message: `Successfully synchronized ${syncCount} commodities from ${target.name}`,
      count: syncCount,
    };
  }

  // Bulk CSV Import
  public importFromCsv(csvText: string): { imported: number; errors: string[] } {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return { imported: 0, errors: ['CSV file is empty or missing headers'] };

    let count = 0;
    const errors: string[] = [];

    // format: product_id_or_name,market_id_or_name,price,previous_price,min_price,max_price
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      if (parts.length < 3) {
        errors.push(`Row ${i + 1}: Invalid format`);
        continue;
      }

      const [prodRef, mktRef, priceStr, prevStr, minStr, maxStr] = parts;
      const price = parseFloat(priceStr);
      if (isNaN(price)) {
        errors.push(`Row ${i + 1}: Invalid price "${priceStr}"`);
        continue;
      }

      // Find product
      const product = this.products.find(
        p => p.id === prodRef || p.name_en.toLowerCase() === prodRef.toLowerCase() || p.name_bn === prodRef
      );
      if (!product) {
        errors.push(`Row ${i + 1}: Product not found "${prodRef}"`);
        continue;
      }

      // Find market
      const market = this.markets.find(
        m => m.id === mktRef || m.name_en.toLowerCase() === mktRef.toLowerCase() || m.name_bn === mktRef
      ) || this.markets[0];

      const prev = prevStr ? parseFloat(prevStr) : price;
      const min = minStr ? parseFloat(minStr) : Math.round(price * 0.9);
      const max = maxStr ? parseFloat(maxStr) : Math.round(price * 1.1);

      this.updatePrice(product.id, market.id, price, prev, min, max, 'src-adm');
      count++;
    }

    this.logActivity('CSV_IMPORT', `Bulk imported ${count} market commodity prices from CSV file`, 'Admin');
    return { imported: count, errors };
  }

  // CSV Export
  public exportToCsv(): string {
    const commodities = this.getDisplayCommodities();
    const headers = ['Product ID', 'Product Bangla', 'Product English', 'Category', 'Market', 'Current Price (BDT)', 'Previous Price', 'Min Price', 'Max Price', 'Unit', 'Change %', 'Source', 'Last Updated'];
    const rows = commodities.map(c => [
      c.product_id,
      `"${c.name_bn}"`,
      `"${c.name_en}"`,
      `"${c.category_name_bn}"`,
      `"${c.market_name_bn}"`,
      c.current_price,
      c.previous_price,
      c.min_price,
      c.max_price,
      `"${c.unit}"`,
      `${c.price_change_percent.toFixed(1)}%`,
      `"${c.source_name}"`,
      `"${c.updated_at}"`,
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // Joined display commodities for high-speed UI render
  public getDisplayCommodities(filterMarketId?: string): CommodityDisplayItem[] {
    const marketMap = new Map(this.markets.map(m => [m.id, m]));
    const catMap = new Map(this.categories.map(c => [c.id, c]));
    const sourceMap = new Map(INITIAL_DATA_SOURCES.map(s => [s.id, s]));
    const districtMap = new Map(INITIAL_DISTRICTS.map(d => [d.id, d]));

    const defaultMarketId = filterMarketId || this.markets[0]?.id || 'mkt-1';

    return this.products
      .filter(p => p.is_active)
      .map(product => {
        // Find price in selected market or default market, or fallback to first found
        let priceRec = this.prices.find(
          pr => pr.product_id === product.id && pr.market_id === defaultMarketId
        );
        if (!priceRec) {
          priceRec = this.prices.find(pr => pr.product_id === product.id);
        }

        const category = catMap.get(product.category_id);
        const market = marketMap.get(priceRec?.market_id || defaultMarketId);
        const district = market ? districtMap.get(market.district_id) : undefined;
        const source = sourceMap.get(priceRec?.source_id || 'src-dam');

        const currentPrice = priceRec ? priceRec.price : 50;
        const previousPrice = priceRec ? priceRec.previous_price : 50;
        const minPrice = priceRec ? priceRec.min_price : Math.round(currentPrice * 0.9);
        const maxPrice = priceRec ? priceRec.max_price : Math.round(currentPrice * 1.1);

        const diff = currentPrice - previousPrice;
        const percent = previousPrice > 0 ? (diff / previousPrice) * 100 : 0;

        return {
          id: priceRec?.id || `disp-${product.id}`,
          product_id: product.id,
          name_bn: product.name_bn,
          name_en: product.name_en,
          category_id: product.category_id,
          category_name_bn: category?.name_bn || 'নিত্যপ্রয়োজনীয়',
          category_name_en: category?.name_en || 'Essentials',
          image_url: product.image_url,
          unit: priceRec?.unit || product.default_unit,
          market_id: market?.id || defaultMarketId,
          market_name_bn: market?.name_bn || 'কারওয়ান বাজার',
          market_name_en: market?.name_en || 'Karwan Bazar',
          district_name_bn: district?.name_bn || 'ঢাকা',
          current_price: currentPrice,
          previous_price: previousPrice,
          min_price: minPrice,
          max_price: maxPrice,
          price_change: diff,
          price_change_percent: percent,
          verification_status: priceRec?.verification_status || 'verified',
          source_code: source?.code || 'DAM',
          source_name: source?.name_bn || 'কৃষি বিপণন অধিদপ্তর',
          updated_at: priceRec?.updated_at || 'আজ সকাল ৮:৩০',
        };
      });
  }

  // Generate historical chart points for product
  public getPriceHistory(productId: string, marketId: string, days: number = 30): PriceHistoryPoint[] {
    const product = this.products.find(p => p.id === productId);
    const priceRec = this.prices.find(p => p.product_id === productId && p.market_id === marketId) ||
                     this.prices.find(p => p.product_id === productId);

    const basePrice = priceRec ? priceRec.price : 60;
    const history: PriceHistoryPoint[] = [];

    // Stable pseudo-random seed based on product id
    let seed = 0;
    for (let i = 0; i < productId.length; i++) seed += productId.charCodeAt(i);

    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' });

      // Generate a realistic gentle wave around basePrice
      const wave = Math.sin((i + seed) / 3.5) * (basePrice * 0.08);
      const noise = (((seed * (i + 1)) % 10) - 5) * 0.8;
      const p = Math.max(10, Math.round(basePrice + wave + noise));

      history.push({
        date: dateStr,
        price: p,
        min_price: Math.round(p * 0.93),
        max_price: Math.round(p * 1.07),
        market_name: 'কারওয়ান বাজার',
      });
    }

    // Ensure last point matches current price exactly
    if (history.length > 0 && priceRec) {
      history[history.length - 1].price = priceRec.price;
      history[history.length - 1].min_price = priceRec.min_price;
      history[history.length - 1].max_price = priceRec.max_price;
    }

    return history;
  }

  // Reset to default seeds
  public resetToDefault() {
    this.products = INITIAL_PRODUCTS;
    this.prices = INITIAL_PRICES;
    this.markets = INITIAL_MARKETS;
    this.categories = INITIAL_CATEGORIES;
    this.integrations = INITIAL_API_INTEGRATIONS;
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.PRICES);
    localStorage.removeItem(STORAGE_KEYS.MARKETS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.INTEGRATIONS);
    emitChange();
  }
}

export const bazarStore = new BazarStore();
