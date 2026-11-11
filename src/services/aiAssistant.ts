import { GoogleGenAI } from '@google/genai';
import { bazarStore } from './store';

export async function askBazarAi(userQuestion: string, userLanguage: 'bn' | 'en' = 'bn'): Promise<string> {
  const commodities = bazarStore.getDisplayCommodities();
  const markets = bazarStore.getMarkets();

  // Prepare database grounding text
  const contextRows = commodities.slice(0, 30).map(c => 
    `- ${c.name_bn} (${c.name_en}): ৳${c.current_price}/${c.unit} (পূর্বমূল্য: ৳${c.previous_price}, পরিবর্তন: ${c.price_change_percent > 0 ? '+' : ''}${c.price_change_percent.toFixed(1)}%, রেঞ্জ: ৳${c.min_price}-৳${c.max_price}, বাজার: ${c.market_name_bn}, উৎস: ${c.source_name})`
  ).join('\n');

  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) || '';

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
You are the official AI Market Analyst for "BazarBD – Bangladesh Daily Essential Commodity Price Tracker" (বাজারবিডি).
You must answer questions strictly based on the following verified database prices.
RULES:
1. NEVER invent, guess, or hallucinate commodity prices.
2. If an item is in the provided data, give its exact current price, previous price, price change, unit (e.g., টাকা/কেজি, টাকা/ডজন), and market.
3. Answer naturally and respectfully in ${userLanguage === 'bn' ? 'Bangla (বাংলা)' : 'English'}.
4. Mention the verification status (e.g. কৃষি বিপণন অধিদপ্তর / টিসিবি).

DATABASE COMMODITY PRICES (TODAY):
${contextRows}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: userQuestion }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.2,
        }
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local database search engine:', err);
    }
  }

  // Deterministic local market query engine (Zero-hallucination fallback)
  const q = userQuestion.toLowerCase().trim();

  // Match specific products
  const matched = commodities.filter(c => 
    q.includes(c.name_bn.toLowerCase()) || 
    q.includes(c.name_en.toLowerCase()) ||
    (q.includes('আলু') && c.name_bn.includes('আলু')) ||
    (q.includes('পেঁয়াজ') && c.name_bn.includes('পেঁয়াজ')) ||
    (q.includes('পেঁয়াজ') && c.name_bn.includes('পেঁয়াজ')) ||
    (q.includes('ইলিশ') && c.name_bn.includes('ইলিশ')) ||
    (q.includes('ডিম') && c.name_bn.includes('ডিম')) ||
    (q.includes('মুরগি') && c.name_bn.includes('মুরগি')) ||
    (q.includes('গরু') && c.name_bn.includes('গরু')) ||
    (q.includes('চাল') && c.name_bn.includes('চাল')) ||
    (q.includes('তেল') && c.name_bn.includes('তেল'))
  );

  if (matched.length > 0) {
    const item = matched[0];
    const changeText = item.price_change < 0 
      ? `গতকাল থেকে ৳${Math.abs(item.price_change)} কমেছে (${Math.abs(item.price_change_percent).toFixed(1)}% হ্রাস)`
      : item.price_change > 0 
      ? `গতকাল থেকে ৳${item.price_change} বেড়েছে (${item.price_change_percent.toFixed(1)}% বৃদ্ধি)`
      : 'গতকালকের সমান রয়েছে (অপরিবর্তিত)';

    if (userLanguage === 'bn') {
      return `আজকের বাজারদর অনুযায়ী **${item.name_bn}**-এর দাম **৳${item.current_price} প্রতি ${item.unit}** (বাজার: ${item.market_name_bn})।\n\n- পূর্বের মূল্য: ৳${item.previous_price}\n- আজকের পরিবর্তনের হার: ${changeText}\n- সর্বনিম্ন ও সর্বোচ্চ দর: ৳${item.min_price} থেকে ৳${item.max_price}\n- তথ্যসূত্র: ${item.source_name}\n- সর্বশেষ আপডেট: ${item.updated_at}`;
    } else {
      return `According to verified market records, **${item.name_en}** is currently priced at **৳${item.current_price} per ${item.unit}** at ${item.market_name_en}.\n\n- Previous Price: ৳${item.previous_price}\n- Price Difference: ${item.price_change > 0 ? '+' : ''}৳${item.price_change} (${item.price_change_percent.toFixed(1)}%)\n- Market Range: ৳${item.min_price} - ৳${item.max_price}\n- Source: ${item.source_name} (${item.source_code})`;
    }
  }

  // Summary / Top increase / decrease query
  if (q.includes('বৃদ্ধি') || q.includes('বেড়েছে') || q.includes('increase') || q.includes('expensive')) {
    const sorted = [...commodities].sort((a, b) => b.price_change_percent - a.price_change_percent);
    const top = sorted.slice(0, 3);
    if (userLanguage === 'bn') {
      return `আজকের বাজারে সবচেয়ে বেশি দর বৃদ্ধি পাওয়া পণ্যসমূহ:\n\n` +
        top.map((t, idx) => `${idx + 1}. **${t.name_bn}**: বর্তমান মূল্য ৳${t.current_price}/${t.unit} (+${t.price_change_percent.toFixed(1)}% বেড়েছে)`).join('\n') +
        `\n\nতথ্যসূত্র: কৃষি বিপণন অধিদপ্তর (DAM) ও টিসিবি।`;
    } else {
      return `Top commodity price increases today:\n\n` +
        top.map((t, idx) => `${idx + 1}. **${t.name_en}**: ৳${t.current_price}/${t.unit} (+${t.price_change_percent.toFixed(1)}%)`).join('\n');
    }
  }

  if (q.includes('কমেছে') || q.includes('হ্রাস') || q.includes('decrease') || q.includes('cheapest')) {
    const sorted = [...commodities].sort((a, b) => a.price_change_percent - b.price_change_percent);
    const top = sorted.slice(0, 3);
    if (userLanguage === 'bn') {
      return `আজকের বাজারে সবচেয়ে বেশি দর হ্রাস পাওয়া (স্বস্তিদায়ক) পণ্যসমূহ:\n\n` +
        top.map((t, idx) => `${idx + 1}. **${t.name_bn}**: বর্তমান মূল্য ৳${t.current_price}/${t.unit} (${t.price_change_percent.toFixed(1)}% কমেছে)`).join('\n') +
        `\n\nতথ্যসূত্র: কৃষি বিপণন অধিদপ্তর (DAM) ও টিসিবি।`;
    } else {
      return `Top commodity price drops today:\n\n` +
        top.map((t, idx) => `${idx + 1}. **${t.name_en}**: ৳${t.current_price}/${t.unit} (${t.price_change_percent.toFixed(1)}%)`).join('\n');
    }
  }

  // Default helpful overview
  if (userLanguage === 'bn') {
    return `আমি বাজারবিডি এআই সহকারী। আপনি যেকোনো পণ্যের নাম লিখে দাম জানতে পারেন (যেমন: 'আজকে আলুর দাম কত?', 'ইলিশ মাছের বর্তমান দর কত?', অথবা 'কোন পণ্যের দাম বেশি বেড়েছে?')।\n\nবর্তমানে আমরা কারওয়ান বাজারসহ সারা বাংলাদেশের ৮টি বিভাগের ${markets.length}টি প্রধান বাজার এবং ${commodities.length}টি নিত্যপণ্যের সরকারি ভেরিফাইড দর ট্র্যাক করছি।`;
  } else {
    return `I am BazarBD AI Assistant. You can ask for any commodity price (e.g. "What is today's potato price?", "Current Hilsa fish rate?", or "Which commodity dropped in price?").\n\nCurrently tracking ${commodities.length} daily essentials across ${markets.length} major Bangladesh markets.`;
  }
}
