import { Division, District, Market, Category, DataSource, Product, MarketPrice, ApiIntegration } from '../types';

export const INITIAL_DIVISIONS: Division[] = [
  { id: 'div-1', name_en: 'Dhaka', name_bn: 'ঢাকা' },
  { id: 'div-2', name_en: 'Chattogram', name_bn: 'চট্টগ্রাম' },
  { id: 'div-3', name_en: 'Rajshahi', name_bn: 'রাজশাহী' },
  { id: 'div-4', name_en: 'Khulna', name_bn: 'খুলনা' },
  { id: 'div-5', name_en: 'Barishal', name_bn: 'বরিশাল' },
  { id: 'div-6', name_en: 'Sylhet', name_bn: 'সিলেট' },
  { id: 'div-7', name_en: 'Rangpur', name_bn: 'রংপুর' },
  { id: 'div-8', name_en: 'Mymensingh', name_bn: 'ময়মনসিংহ' },
];

export const INITIAL_DISTRICTS: District[] = [
  { id: 'dist-1', division_id: 'div-1', name_en: 'Dhaka', name_bn: 'ঢাকা' },
  { id: 'dist-2', division_id: 'div-1', name_en: 'Gazipur', name_bn: 'গাজীপুর' },
  { id: 'dist-3', division_id: 'div-2', name_en: 'Chattogram', name_bn: 'চট্টগ্রাম' },
  { id: 'dist-4', division_id: 'div-3', name_en: 'Rajshahi', name_bn: 'রাজশাহী' },
  { id: 'dist-5', division_id: 'div-4', name_en: 'Khulna', name_bn: 'খুলনা' },
  { id: 'dist-6', division_id: 'div-5', name_en: 'Barishal', name_bn: 'বরিশাল' },
  { id: 'dist-7', division_id: 'div-6', name_en: 'Sylhet', name_bn: 'সিলেট' },
  { id: 'dist-8', division_id: 'div-7', name_en: 'Rangpur', name_bn: 'রংপুর' },
  { id: 'dist-9', division_id: 'div-8', name_en: 'Mymensingh', name_bn: 'ময়মনসিংহ' },
];

export const INITIAL_MARKETS: Market[] = [
  { id: 'mkt-1', district_id: 'dist-1', division_id: 'div-1', name_en: 'Karwan Bazar', name_bn: 'কারওয়ান বাজার', location: 'Tejgaon, Dhaka', is_active: true },
  { id: 'mkt-2', district_id: 'dist-1', division_id: 'div-1', name_en: 'Mohammadpur Krishi Market', name_bn: 'মোহাম্মদপুর কৃষি মার্কেট', location: 'Mohammadpur, Dhaka', is_active: true },
  { id: 'mkt-3', district_id: 'dist-1', division_id: 'div-1', name_en: 'Mirpur-1 Bazar', name_bn: 'মিরপুর ১ নম্বর কাঁচাবাজার', location: 'Mirpur, Dhaka', is_active: true },
  { id: 'mkt-4', district_id: 'dist-1', division_id: 'div-1', name_en: 'Jatrabari Market', name_bn: 'যাত্রাবাড়ী আড়ত', location: 'Jatrabari, Dhaka', is_active: true },
  { id: 'mkt-5', district_id: 'dist-3', division_id: 'div-2', name_en: 'Reazuddin Bazar', name_bn: 'রিয়াজউদ্দিন বাজার', location: 'Kotwali, Chattogram', is_active: true },
  { id: 'mkt-6', district_id: 'dist-4', division_id: 'div-3', name_en: 'Shaheb Bazar', name_bn: 'সাহেব বাজার', location: 'Boalia, Rajshahi', is_active: true },
  { id: 'mkt-7', district_id: 'dist-5', division_id: 'div-4', name_en: 'Sandhya Bazar', name_bn: 'সন্ধ্যা বাজার', location: 'Khulna Sadar', is_active: true },
  { id: 'mkt-8', district_id: 'dist-7', division_id: 'div-6', name_en: 'Bandarbazar', name_bn: 'বন্দরবাজার', location: 'Sylhet Sadar', is_active: true },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-veg', slug: 'vegetables', name_en: 'Vegetables', name_bn: 'শাকসবজি', icon_name: 'Carrot', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', item_count: 11, order_index: 1 },
  { id: 'cat-rice', slug: 'rice-grains', name_en: 'Rice & Grains', name_bn: 'চাল ও খাদ্যশস্য', icon_name: 'Wheat', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', item_count: 6, order_index: 2 },
  { id: 'cat-fish', slug: 'fish-seafood', name_en: 'Fish & Seafood', name_bn: 'মাছ ও সামুদ্রিক', icon_name: 'Fish', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', item_count: 7, order_index: 3 },
  { id: 'cat-meat', slug: 'meat-poultry', name_en: 'Meat & Poultry', name_bn: 'মাংস ও মুরগি', icon_name: 'Drumstick', image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&auto=format&fit=crop&q=80', item_count: 5, order_index: 4 },
  { id: 'cat-dairy', slug: 'eggs-dairy', name_en: 'Eggs & Dairy', name_bn: 'ডিম ও দুগ্ধজাত', icon_name: 'Egg', image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80', item_count: 4, order_index: 5 },
  { id: 'cat-oil', slug: 'cooking-oil', name_en: 'Cooking Oil', name_bn: 'ভোজ্যতেল', icon_name: 'Droplets', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', item_count: 3, order_index: 6 },
  { id: 'cat-pulses', slug: 'pulses', name_en: 'Pulses & Lentils', name_bn: 'ডাল ও ডালজাতীয়', icon_name: 'CircleDot', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', item_count: 4, order_index: 7 },
  { id: 'cat-fruits', slug: 'fruits', name_en: 'Fresh Fruits', name_bn: 'তাজা ফলমূল', icon_name: 'Apple', image_url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&auto=format&fit=crop&q=80', item_count: 7, order_index: 8 },
  { id: 'cat-spices', slug: 'spices', name_en: 'Spices', name_bn: 'নিত্য মসলাপাতি', icon_name: 'Flame', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80', item_count: 4, order_index: 9 },
];

export const INITIAL_DATA_SOURCES: DataSource[] = [
  { id: 'src-dam', name_en: 'Department of Agricultural Marketing (DAM)', name_bn: 'কৃষি বিপণন অধিদপ্তর (ডিএএম)', code: 'DAM', url: 'https://dam.gov.bd/', reliability: 'official' },
  { id: 'src-tcb', name_en: 'Trading Corporation of Bangladesh (TCB)', name_bn: 'ট্রেডিং কর্পোরেশন অব বাংলাদেশ (টিসিবি)', code: 'TCB', url: 'https://tcb.gov.bd/', reliability: 'official' },
  { id: 'src-adm', name_en: 'BazarBD Market Inspector Verified', name_bn: 'বাজারবিডি বাজার পরিদর্শক ভেরিফাইড', code: 'ADMIN', url: 'https://bazarbd.gov.bd', reliability: 'verified' },
  { id: 'src-smp', name_en: 'Market Sample Benchmark', name_bn: 'নমুনা বাজারদর বিশ্লেষণ', code: 'SAMPLE', url: 'https://data.gov.bd/', reliability: 'sample' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Vegetables
  { id: 'prod-veg-1', category_id: 'cat-veg', name_en: 'Potato (Diamond/Regular)', name_bn: 'আলু (ডায়মন্ড/দেশি)', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-2', category_id: 'cat-veg', name_en: 'Local Red Onion', name_bn: 'দেশি পেঁয়াজ', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-3', category_id: 'cat-veg', name_en: 'Ripe Tomato', name_bn: 'পাকা টমেটো', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-4', category_id: 'cat-veg', name_en: 'Eggplant (Brinjal)', name_bn: 'গোল বেগুন', image_url: '/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-5', category_id: 'cat-veg', name_en: 'Cucumber', name_bn: 'শসা (দেশি)', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-6', category_id: 'cat-veg', name_en: 'Green Chili', name_bn: 'কাঁচা মরিচ', image_url: '/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-7', category_id: 'cat-veg', name_en: 'Carrot', name_bn: 'তাজা গাজর', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-8', category_id: 'cat-veg', name_en: 'Cabbage', name_bn: 'বাঁধাকপি', image_url: '/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg', default_unit: 'পিস', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-9', category_id: 'cat-veg', name_en: 'Cauliflower', name_bn: 'ফুলকপি', image_url: '/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg', default_unit: 'পিস', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-10', category_id: 'cat-veg', name_en: 'Local Garlic', name_bn: 'দেশি রসুন', image_url: '/src/assets/images/category_fresh_vegetables_1794390357177.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-veg-11', category_id: 'cat-veg', name_en: 'Ginger', name_bn: 'আদা (আমদানিকৃত/দেশি)', image_url: '/src/assets/images/hero_bazar_fresh_produce_1794390355761.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 2. Rice & Grains
  { id: 'prod-rice-1', category_id: 'cat-rice', name_en: 'Miniket Rice (Standard)', name_bn: 'মিনিকেট চাল (স্ট্যান্ডার্ড)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-rice-2', category_id: 'cat-rice', name_en: 'Nazirshail Rice (Premium)', name_bn: 'নাজিরশাইল চাল (প্রিমিয়াম)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-rice-3', category_id: 'cat-rice', name_en: 'Atap Rice', name_bn: 'আতপ চাল (পোলাও/খিচুড়ি)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-rice-4', category_id: 'cat-rice', name_en: 'Coarse Rice (Guti Swarna)', name_bn: 'মোটা চাল (স্বর্ণা/ইরি)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-rice-5', category_id: 'cat-rice', name_en: 'Wheat (Whole Grain)', name_bn: 'গম (দানা)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-rice-6', category_id: 'cat-rice', name_en: 'Wheat Flour (Atta)', name_bn: 'খোলা আটা (প্যাকেট/লুজ)', image_url: '/src/assets/images/category_rice_grains_1794390357388.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 3. Fish & Seafood
  { id: 'prod-fish-1', category_id: 'cat-fish', name_en: 'Rui Fish (1.5 - 2kg size)', name_bn: 'রুই মাছ (বড় সাইজ)', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-2', category_id: 'cat-fish', name_en: 'Katla Fish', name_bn: 'কাতলা মাছ', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-3', category_id: 'cat-fish', name_en: 'Padma Hilsa (1kg+)', name_bn: 'পদ্মার তাজা ইলিশ (১ কেজি+)', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-4', category_id: 'cat-fish', name_en: 'Tilapia Fish', name_bn: 'তেলাপিয়া মাছ', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-5', category_id: 'cat-fish', name_en: 'Pangas Fish', name_bn: 'পাঙ্গাশ মাছ', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-6', category_id: 'cat-fish', name_en: 'Freshwater Prawn (Golda)', name_bn: 'গলদা চিংড়ি', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-fish-7', category_id: 'cat-fish', name_en: 'Tiger Shrimp (Bagda)', name_bn: 'বাগদা চিংড়ি', image_url: '/src/assets/images/category_fish_hilsa_rui_1794390357649.jpg', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 4. Meat & Poultry
  { id: 'prod-meat-1', category_id: 'cat-meat', name_en: 'Beef (Bone-in / Regular)', name_bn: 'গরুর মাংস (হাড়সহ)', image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-meat-2', category_id: 'cat-meat', name_en: 'Mutton (Khasi)', name_bn: 'খাসির মাংস', image_url: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-meat-3', category_id: 'cat-meat', name_en: 'Broiler Chicken', name_bn: 'ব্রয়লার মুরগি (জীবন্ত)', image_url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-meat-4', category_id: 'cat-meat', name_en: 'Sonali Chicken', name_bn: 'সোনালী মুরগি', image_url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-meat-5', category_id: 'cat-meat', name_en: 'Deshi Native Chicken', name_bn: 'দেশি মুরগি (ফার্মমুক্ত)', image_url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 5. Eggs & Dairy
  { id: 'prod-egg-1', category_id: 'cat-dairy', name_en: 'Farm Chicken Eggs (Brown)', name_bn: 'ফার্মের লাল ডিম (ডজন)', image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80', default_unit: 'ডজন', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-egg-2', category_id: 'cat-dairy', name_en: 'Fresh Cow Milk (Pasteurized)', name_bn: 'তরল দুধ (পাস্তুরিত প্যাকেট)', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80', default_unit: 'লিটার', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-egg-3', category_id: 'cat-dairy', name_en: 'Full Cream Milk Powder', name_bn: 'ফুল ক্রিম গুঁড়ো দুধ', image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-egg-4', category_id: 'cat-dairy', name_en: 'Pure Dairy Butter', name_bn: 'খাঁটি মাখন (বাটার)', image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 6. Cooking Oil
  { id: 'prod-oil-1', category_id: 'cat-oil', name_en: 'Bottled Soybean Oil (1L)', name_bn: 'বোতলজাত সয়াবিন তেল (১ লিটার)', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', default_unit: 'লিটার', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-oil-2', category_id: 'cat-oil', name_en: 'Pure Mustard Oil', name_bn: 'খাঁটি সরিষার তেল', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', default_unit: 'লিটার', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-oil-3', category_id: 'cat-oil', name_en: 'Refined Palm Oil', name_bn: 'পাম তেল (লুজ/খোলা)', image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80', default_unit: 'লিটার', is_active: true, created_at: '2026-03-01' },

  // 7. Pulses
  { id: 'prod-pls-1', category_id: 'cat-pulses', name_en: 'Red Lentils (Deshi Mosur)', name_bn: 'দেশি মসুর ডাল (চিকন)', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-pls-2', category_id: 'cat-pulses', name_en: 'Chickpeas (Chhola Boot)', name_bn: 'ছোলা বুট', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-pls-3', category_id: 'cat-pulses', name_en: 'Green Gram (Moog Dal)', name_bn: 'ভাজা মুগ ডাল', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-pls-4', category_id: 'cat-pulses', name_en: 'Yellow Split Peas (Motor Dal)', name_bn: 'মটর ডাল', image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },

  // 8. Fruits
  { id: 'prod-frt-1', category_id: 'cat-fruits', name_en: 'Sagor Banana', name_bn: 'সাগর কলা (ডজন)', image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80', default_unit: 'ডজন', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-2', category_id: 'cat-fruits', name_en: 'Fuji Apple (Imported)', name_bn: 'ফুজি আপেল', image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-3', category_id: 'cat-fruits', name_en: 'Malta / Sweet Orange', name_bn: 'মাল্টা / কমলা', image_url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-4', category_id: 'cat-fruits', name_en: 'Ripe Papaya', name_bn: 'পাকা পেঁপে', image_url: 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-5', category_id: 'cat-fruits', name_en: 'Sweet Mango (Seasonal)', name_bn: 'হিমসাগর/ল্যাংড়া আম', image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-6', category_id: 'cat-fruits', name_en: 'Watermelon', name_bn: 'লাল তরমুজ', image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-frt-7', category_id: 'cat-fruits', name_en: 'Green Lemon (Kagzi Lebu)', name_bn: 'কাগজি লেবু (হালি)', image_url: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80', default_unit: 'হালি', is_active: true, created_at: '2026-03-01' },

  // 9. Spices
  { id: 'prod-spc-1', category_id: 'cat-spices', name_en: 'Turmeric Powder (Pure)', name_bn: 'খাঁটি হলুদ গুঁড়া', image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-spc-2', category_id: 'cat-spices', name_en: 'Dry Red Chili', name_bn: 'শুকনা মরিচ', image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-spc-3', category_id: 'cat-spices', name_en: 'Coriander Powder', name_bn: 'ধনিয়া গুঁড়া', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
  { id: 'prod-spc-4', category_id: 'cat-spices', name_en: 'Whole Cumin Seed (Jeera)', name_bn: 'আস্ত জিরা', image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80', default_unit: 'কেজি', is_active: true, created_at: '2026-03-01' },
];

// Initial Market Prices for Karwan Bazar (mkt-1) and other representative markets
export const INITIAL_PRICES: MarketPrice[] = [
  // Karwan Bazar Prices
  { id: 'prc-1', product_id: 'prod-veg-1', market_id: 'mkt-1', price: 42, previous_price: 45, min_price: 38, max_price: 45, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-2', product_id: 'prod-veg-2', market_id: 'mkt-1', price: 75, previous_price: 85, min_price: 70, max_price: 80, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-3', product_id: 'prod-veg-3', market_id: 'mkt-1', price: 60, previous_price: 55, min_price: 50, max_price: 65, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-4', product_id: 'prod-veg-4', market_id: 'mkt-1', price: 65, previous_price: 70, min_price: 55, max_price: 75, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-5', product_id: 'prod-veg-5', market_id: 'mkt-1', price: 50, previous_price: 50, min_price: 45, max_price: 55, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-6', product_id: 'prod-veg-6', market_id: 'mkt-1', price: 120, previous_price: 150, min_price: 110, max_price: 130, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-7', product_id: 'prod-veg-7', market_id: 'mkt-1', price: 55, previous_price: 60, min_price: 50, max_price: 60, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-8', product_id: 'prod-veg-8', market_id: 'mkt-1', price: 35, previous_price: 40, min_price: 30, max_price: 40, unit: 'পিস', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-9', product_id: 'prod-veg-9', market_id: 'mkt-1', price: 40, previous_price: 45, min_price: 35, max_price: 45, unit: 'পিস', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-10', product_id: 'prod-veg-10', market_id: 'mkt-1', price: 190, previous_price: 180, min_price: 180, max_price: 200, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-11', product_id: 'prod-veg-11', market_id: 'mkt-1', price: 220, previous_price: 240, min_price: 200, max_price: 230, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Rice
  { id: 'prc-12', product_id: 'prod-rice-1', market_id: 'mkt-1', price: 72, previous_price: 74, min_price: 68, max_price: 75, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-13', product_id: 'prod-rice-2', market_id: 'mkt-1', price: 85, previous_price: 85, min_price: 80, max_price: 90, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-14', product_id: 'prod-rice-3', market_id: 'mkt-1', price: 120, previous_price: 125, min_price: 110, max_price: 130, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-15', product_id: 'prod-rice-4', market_id: 'mkt-1', price: 52, previous_price: 54, min_price: 50, max_price: 55, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-16', product_id: 'prod-rice-5', market_id: 'mkt-1', price: 44, previous_price: 45, min_price: 42, max_price: 46, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-17', product_id: 'prod-rice-6', market_id: 'mkt-1', price: 55, previous_price: 55, min_price: 52, max_price: 58, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Fish
  { id: 'prc-18', product_id: 'prod-fish-1', market_id: 'mkt-1', price: 340, previous_price: 360, min_price: 320, max_price: 380, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-19', product_id: 'prod-fish-2', market_id: 'mkt-1', price: 380, previous_price: 400, min_price: 350, max_price: 420, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-20', product_id: 'prod-fish-3', market_id: 'mkt-1', price: 1450, previous_price: 1550, min_price: 1300, max_price: 1600, unit: 'কেজি', source_id: 'src-adm', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-21', product_id: 'prod-fish-4', market_id: 'mkt-1', price: 210, previous_price: 220, min_price: 190, max_price: 230, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-22', product_id: 'prod-fish-5', market_id: 'mkt-1', price: 180, previous_price: 180, min_price: 170, max_price: 190, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-23', product_id: 'prod-fish-6', market_id: 'mkt-1', price: 850, previous_price: 880, min_price: 800, max_price: 950, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-24', product_id: 'prod-fish-7', market_id: 'mkt-1', price: 720, previous_price: 750, min_price: 680, max_price: 780, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Meat
  { id: 'prc-25', product_id: 'prod-meat-1', market_id: 'mkt-1', price: 750, previous_price: 780, min_price: 720, max_price: 780, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-26', product_id: 'prod-meat-2', market_id: 'mkt-1', price: 1100, previous_price: 1100, min_price: 1050, max_price: 1150, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-27', product_id: 'prod-meat-3', market_id: 'mkt-1', price: 175, previous_price: 190, min_price: 165, max_price: 185, unit: 'কেজি', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-28', product_id: 'prod-meat-4', market_id: 'mkt-1', price: 290, previous_price: 310, min_price: 280, max_price: 320, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-29', product_id: 'prod-meat-5', market_id: 'mkt-1', price: 540, previous_price: 560, min_price: 500, max_price: 580, unit: 'কেজি', source_id: 'src-adm', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Eggs & Dairy
  { id: 'prc-30', product_id: 'prod-egg-1', market_id: 'mkt-1', price: 135, previous_price: 145, min_price: 130, max_price: 145, unit: 'ডজন', source_id: 'src-dam', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-31', product_id: 'prod-egg-2', market_id: 'mkt-1', price: 90, previous_price: 90, min_price: 85, max_price: 95, unit: 'লিটার', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-32', product_id: 'prod-egg-3', market_id: 'mkt-1', price: 820, previous_price: 830, min_price: 800, max_price: 850, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-33', product_id: 'prod-egg-4', market_id: 'mkt-1', price: 950, previous_price: 950, min_price: 900, max_price: 1000, unit: 'কেজি', source_id: 'src-adm', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Cooking Oil
  { id: 'prc-34', product_id: 'prod-oil-1', market_id: 'mkt-1', price: 167, previous_price: 169, min_price: 165, max_price: 172, unit: 'লিটার', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-35', product_id: 'prod-oil-2', market_id: 'mkt-1', price: 230, previous_price: 235, min_price: 220, max_price: 245, unit: 'লিটার', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-36', product_id: 'prod-oil-3', market_id: 'mkt-1', price: 148, previous_price: 152, min_price: 144, max_price: 152, unit: 'লিটার', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Pulses
  { id: 'prc-37', product_id: 'prod-pls-1', market_id: 'mkt-1', price: 135, previous_price: 140, min_price: 130, max_price: 145, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-38', product_id: 'prod-pls-2', market_id: 'mkt-1', price: 105, previous_price: 100, min_price: 95, max_price: 110, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-39', product_id: 'prod-pls-3', market_id: 'mkt-1', price: 160, previous_price: 165, min_price: 150, max_price: 170, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-40', product_id: 'prod-pls-4', market_id: 'mkt-1', price: 95, previous_price: 98, min_price: 90, max_price: 100, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Fruits
  { id: 'prc-41', product_id: 'prod-frt-1', market_id: 'mkt-1', price: 110, previous_price: 120, min_price: 100, max_price: 130, unit: 'ডজন', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-42', product_id: 'prod-frt-2', market_id: 'mkt-1', price: 280, previous_price: 290, min_price: 260, max_price: 310, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-43', product_id: 'prod-frt-3', market_id: 'mkt-1', price: 240, previous_price: 250, min_price: 220, max_price: 260, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-44', product_id: 'prod-frt-4', market_id: 'mkt-1', price: 70, previous_price: 75, min_price: 60, max_price: 80, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-45', product_id: 'prod-frt-5', market_id: 'mkt-1', price: 160, previous_price: 175, min_price: 140, max_price: 180, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-46', product_id: 'prod-frt-6', market_id: 'mkt-1', price: 45, previous_price: 50, min_price: 40, max_price: 55, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-47', product_id: 'prod-frt-7', market_id: 'mkt-1', price: 35, previous_price: 40, min_price: 30, max_price: 45, unit: 'হালি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Spices
  { id: 'prc-48', product_id: 'prod-spc-1', market_id: 'mkt-1', price: 340, previous_price: 340, min_price: 320, max_price: 360, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-49', product_id: 'prod-spc-2', market_id: 'mkt-1', price: 420, previous_price: 450, min_price: 400, max_price: 460, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-50', product_id: 'prod-spc-3', market_id: 'mkt-1', price: 260, previous_price: 260, min_price: 240, max_price: 280, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-51', product_id: 'prod-spc-4', market_id: 'mkt-1', price: 820, previous_price: 850, min_price: 780, max_price: 880, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Comparative Prices for Mohammadpur Krishi Market (mkt-2)
  { id: 'prc-m2-1', product_id: 'prod-veg-1', market_id: 'mkt-2', price: 44, previous_price: 45, min_price: 40, max_price: 46, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m2-2', product_id: 'prod-veg-2', market_id: 'mkt-2', price: 78, previous_price: 88, min_price: 72, max_price: 82, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m2-3', product_id: 'prod-rice-1', market_id: 'mkt-2', price: 74, previous_price: 75, min_price: 70, max_price: 76, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m2-4', product_id: 'prod-fish-3', market_id: 'mkt-2', price: 1500, previous_price: 1600, min_price: 1350, max_price: 1650, unit: 'কেজি', source_id: 'src-adm', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m2-5', product_id: 'prod-meat-1', market_id: 'mkt-2', price: 760, previous_price: 780, min_price: 740, max_price: 780, unit: 'কেজি', source_id: 'src-tcb', verification_status: 'government', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },

  // Comparative Prices for Reazuddin Bazar, Chattogram (mkt-5)
  { id: 'prc-m5-1', product_id: 'prod-veg-1', market_id: 'mkt-5', price: 46, previous_price: 48, min_price: 42, max_price: 48, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m5-2', product_id: 'prod-veg-2', market_id: 'mkt-5', price: 80, previous_price: 90, min_price: 75, max_price: 85, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m5-3', product_id: 'prod-fish-3', market_id: 'mkt-5', price: 1380, previous_price: 1450, min_price: 1250, max_price: 1500, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
  { id: 'prc-m5-4', product_id: 'prod-meat-1', market_id: 'mkt-5', price: 780, previous_price: 800, min_price: 750, max_price: 800, unit: 'কেজি', source_id: 'src-dam', verification_status: 'verified', recorded_at: '2026-03-09', updated_at: '2026-03-09 08:30:00' },
];

export const INITIAL_API_INTEGRATIONS: ApiIntegration[] = [
  { id: 'api-1', name: 'DAM (Department of Agricultural Marketing)', endpoint_url: 'https://dam.gov.bd/api/v1/daily-rates', sync_interval_hours: 6, status: 'active', last_sync_at: '2026-03-09 07:45 AM', last_sync_status: 'success', records_synced: 142 },
  { id: 'api-2', name: 'TCB (Trading Corporation of Bangladesh)', endpoint_url: 'https://tcb.gov.bd/data/essential-commodity.json', sync_interval_hours: 12, status: 'active', last_sync_at: '2026-03-09 06:15 AM', last_sync_status: 'success', records_synced: 38 },
  { id: 'api-3', name: 'Bangladesh Open Data Portal', endpoint_url: 'https://data.gov.bd/api/3/action/package_search?q=commodity_price', sync_interval_hours: 24, status: 'active', last_sync_at: '2026-03-08 11:00 PM', last_sync_status: 'success', records_synced: 89 },
];
