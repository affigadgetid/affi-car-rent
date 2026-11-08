import React from 'react';
import { Play, ArrowRight, Zap, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

interface HeroProps {
  onPesanSekarang: () => void;
  onExploreCars: () => void;
  onOpenVideo: () => void;
  onExploreEv: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPesanSekarang,
  onExploreCars,
  onOpenVideo,
  onExploreEv
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 lg:pb-20 bg-gradient-to-b from-[#EBF3FE] via-[#F3F8FE] to-[#F8FAFC]">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-[-100px] w-[450px] h-[450px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Pill Rating / Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-100 shadow-xs text-xs font-semibold text-slate-700">
              <span className="text-amber-400">⭐</span>
              <span>Rental Mobil Terbaik di Indonesia</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Main Headline from Master Prompt & Screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#071B49] leading-[1.12] tracking-tight">
              Perjalanan Lebih Mudah dengan{' '}
              <span className="text-[#075BEA] relative inline-block">
                Affi Car Rent
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-3 text-[#00D2FF]/40"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Sewa mobil terbaru, termasuk mobil listrik (EV), dengan harga terbaik dan layanan profesional. Bebas ribet, unit bersih terawat, dan siap antar ke bandara maupun hotel.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onPesanSekarang}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#075BEA] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 transition-all"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenVideo}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white text-[#071B49] font-bold text-sm sm:text-base border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 text-[#075BEA] flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Lihat Video</span>
              </button>
            </div>

            {/* Mini Trust Highlights Strip */}
            <div className="pt-4 border-t border-slate-200/70 grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#075BEA] flex-shrink-0" />
                <span>Unit Terawat 2024</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-[#075BEA] flex-shrink-0" />
                <span>Siap Antar 24 Jam</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tanpa Biaya Siluman</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visuals matching Screenshot Composition */}
          <div className="lg:col-span-6 relative">
            {/* Top Right Floating EV Badge */}
            <div
              onClick={onExploreEv}
              className="absolute -top-3 sm:-top-5 right-2 sm:right-6 z-20 cursor-pointer animate-float-slow group"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-[#075BEA] text-white shadow-xl shadow-blue-500/30 border border-blue-400/40">
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black tracking-wide flex items-center gap-1">
                    Mobil Listrik (EV) <span className="text-emerald-300">🍃</span>
                  </p>
                  <p className="text-[10px] text-blue-100 font-medium">Kini Tersedia di Semua Kota!</p>
                </div>
              </div>
            </div>

            {/* Dynamic Automotive Showcase Stage */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Skyline & Highway Backdrop simulation */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1a3a6b]/20 via-[#4084ee]/15 to-transparent p-4 sm:p-6 pb-2">
                {/* Visual Cars Cluster */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] flex items-end justify-center">
                  {/* Left car (Sporty Electric Blue) */}
                  <img
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80"
                    alt="BYD Electric Car"
                    className="absolute left-0 bottom-4 w-[50%] h-[68%] object-cover rounded-2xl shadow-xl transform -rotate-1 hover:scale-105 transition-all duration-300 border-2 border-white/80"
                  />

                  {/* Right car (Modern Blue SUV) */}
                  <img
                    src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=700&q=80"
                    alt="Premium Sedan"
                    className="absolute right-0 bottom-4 w-[50%] h-[68%] object-cover rounded-2xl shadow-xl transform rotate-1 hover:scale-105 transition-all duration-300 border-2 border-white/80"
                  />

                  {/* Center Star Hero Car (Toyota bZ4X Modern White SUV) */}
                  <div className="relative z-10 w-[74%] h-[82%] mb-1 group">
                    <img
                      src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
                      alt="Toyota bZ4X EV Rental"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white transform transition-transform duration-300 group-hover:scale-102"
                    />

                    {/* License Plate / Overlay Tag */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-0.5 rounded border border-white/20 uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>AFFI • EV 2026</span>
                    </div>

                    {/* High-tech glow underneath */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-blue-500/40 blur-md rounded-full" />
                  </div>
                </div>

                {/* Road surface reflection light bar */}
                <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent rounded-full opacity-60 mt-1" />
              </div>

              {/* Floating feature pills around hero car */}
              <div className="absolute bottom-2 left-2 sm:left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">500+ KM Range</p>
                  <p className="text-[9px] text-slate-500">Fast Charging 30 Menit</p>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 sm:right-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#075BEA] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-[#075BEA]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800">Diskon s/d 20%</p>
                  <p className="text-[9px] text-slate-500">Kode: AFFIEV20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
