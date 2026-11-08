import React from 'react';
import { ShieldCheck, Headphones, CircleDollarSign, Zap, ArrowRight, Gift } from 'lucide-react';

interface WhyChooseUsProps {
  onPromoClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onPromoClick }) => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 2-Column or Flex Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Mengapa Memilih Affi Car Rent features grid (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071B49]">
              Mengapa Memilih Affi Car Rent?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Komitmen kami memberikan kenyamanan dan keamanan terbaik di setiap kilometer perjalanan Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/60 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#075BEA] text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#071B49]">
                Mobil Terbaru & Terawat
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Unit servis rutin berkala dealer resmi
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/60 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#075BEA] text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-3">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#071B49]">
                Layanan 24/7 Siap Membantu
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Emergency call & CS responsif setiap saat
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/60 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#075BEA] text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-3">
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#071B49]">
                Harga Transparan
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Tanpa biaya tersembunyi saat pengembalian
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-blue-50/50 border border-blue-100/60 hover:bg-blue-50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#075BEA] text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#071B49]">
                Proses Booking Cepat & Mudah
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Konfirmasi instan kurang dari 5 menit
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Promo Spesial Banner matching screenshot (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-gradient-to-r from-blue-700 via-[#075BEA] to-blue-500 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-600/20">
          {/* Decorative light rings */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-black text-xs shadow-xs mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>Promo Spesial!</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Diskon hingga <span className="text-amber-300">20%</span>
            </h3>
            <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
              Gunakan kode promo <strong className="text-white underline">AFFIEV20</strong> atau <strong className="text-white underline">FIRSTRENT</strong> untuk potongan sewa langsung.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={onPromoClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 3D Gift Box visual simulation */}
            <div className="text-4xl filter drop-shadow-lg animate-bounce">
              🎁
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
