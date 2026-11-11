export type Language = 'bn' | 'en';

export type UnitType = 'কেজি' | 'লিটার' | 'ডজন' | 'হালি' | 'পিস' | 'গ্রাম' | 'kg' | 'liter' | 'dozen' | 'piece';

export interface Division {
  id: string;
  name_en: string;
  name_bn: string;
}

export interface District {
  id: string;
  division_id: string;
  name_en: string;
  name_bn: string;
}

export interface Market {
  id: string;
  district_id: string;
  division_id: string;
  name_en: string;
  name_bn: string;
  location: string;
  is_active: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name_en: string;
  name_bn: string;
  icon_name: string;
  image_url: string;
  item_count?: number;
  order_index: number;
}

export interface DataSource {
  id: string;
  name_en: string;
  name_bn: string;
  code: 'DAM' | 'TCB' | 'ADMIN' | 'COMMUNITY' | 'SAMPLE';
  url: string;
  reliability: 'official' | 'verified' | 'sample';
}

export interface Product {
  id: string;
  category_id: string;
  name_en: string;
  name_bn: string;
  description_bn?: string;
  description_en?: string;
  image_url: string;
  default_unit: UnitType;
  is_active: boolean;
  created_at: string;
}

export interface MarketPrice {
  id: string;
  product_id: string;
  market_id: string;
  price: number;
  previous_price: number;
  min_price: number;
  max_price: number;
  unit: UnitType;
  source_id: string;
  verification_status: 'verified' | 'government' | 'pending' | 'sample';
  recorded_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  min_price?: number;
  max_price?: number;
  market_name?: string;
}

export interface CommodityDisplayItem {
  id: string;
  product_id: string;
  name_bn: string;
  name_en: string;
  category_id: string;
  category_name_bn: string;
  category_name_en: string;
  image_url: string;
  unit: UnitType;
  market_id: string;
  market_name_bn: string;
  market_name_en: string;
  district_name_bn: string;
  current_price: number;
  previous_price: number;
  min_price: number;
  max_price: number;
  price_change: number;
  price_change_percent: number;
  verification_status: 'verified' | 'government' | 'pending' | 'sample';
  source_code: string;
  source_name: string;
  updated_at: string;
}

export interface ApiIntegration {
  id: string;
  name: string;
  endpoint_url: string;
  sync_interval_hours: number;
  status: 'active' | 'inactive' | 'error';
  last_sync_at: string | null;
  last_sync_status: 'success' | 'failed' | null;
  records_synced: number;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  admin_user: string;
}

export interface PriceAlert {
  id: string;
  product_id: string;
  target_price: number;
  direction: 'below' | 'above';
  created_at: string;
  is_notified: boolean;
}
