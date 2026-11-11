import React, { useState } from 'react';
import { BellRing, X, CheckCircle2 } from 'lucide-react';
import { CommodityDisplayItem, Language } from '../types';
import { bazarStore } from '../services/store';

interface PriceAlertModalProps {
  commodity: CommodityDisplayItem | null;
  onClose: () => void;
  language: Language;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ commodity, onClose, language }) => {
  const [targetPrice, setTargetPrice] = useState<number>(commodity ? Math.round(commodity.current_price * 0.9) : 50);
  const [direction, setDirection] = useState<'below' | 'above'>('below');
  const [isSaved, setIsSaved] = useState(false);

  if (!commodity) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    bazarStore.addAlert(commodity.product_id, targetPrice, direction);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <BellRing className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {language === 'bn' ? 'মূল্য সতর্কতা (Price Alert)' : 'Set Price Alert'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl mb-4 border border-slate-100">
          <img src={commodity.image_url} alt={commodity.name_bn} className="w-10 h-10 rounded-xl object-cover" />
          <div>
            <div className="font-bold text-xs text-slate-900">{commodity.name_bn} ({commodity.name_en})</div>
            <div className="text-[11px] text-slate-500">
              বর্তমান বাজারদর: <span className="font-bold text-emerald-700">৳{commodity.current_price}</span> /{commodity.unit}
            </div>
          </div>
        </div>

        {isSaved ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>সতর্কতা সফলভাবে সেট করা হয়েছে!</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {language === 'bn' ? 'কখন নোটিফিকেশন পেতে চান?' : 'Condition'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('below')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    direction === 'below'
                      ? 'bg-[#087443] text-white border-[#087443]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {language === 'bn' ? 'দর নিচে নামলে (হ্রাস)' : 'Price Drops Below'}
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('above')}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    direction === 'above'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {language === 'bn' ? 'দর উপরে উঠলে (বৃদ্ধি)' : 'Price Rises Above'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {language === 'bn' ? `টার্গেট মূল্য (টাকা প্রতি ${commodity.unit})` : 'Target Price (BDT)'}
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                className="w-full text-base font-bold px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#087443]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-xl bg-[#087443] text-white text-xs font-bold hover:bg-[#065e36] shadow-xs"
              >
                অ্যালার্ট সেট করুন
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
