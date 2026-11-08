import React, { useState } from 'react';
import { Calendar, CreditCard, Car, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { Review } from '../types';

interface HowItWorksAndReviewsProps {
  reviews: Review[];
  onStartRent: () => void;
}

export const HowItWorksAndReviews: React.FC<HowItWorksAndReviewsProps> = ({
  reviews,
  onStartRent
}) => {
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  const prevReview = () => {
    setCurrentReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[currentReviewIdx] || reviews[0];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Cara Rental di Affi Car Rent (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-3 mb-2">
              <div className="w-1.5 h-6 bg-[#075BEA] rounded-full mt-0.5" />
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#071B49]">
                  Cara Rental di Affi Car Rent
                </h3>
                <p className="text-xs font-semibold text-[#075BEA]">
                  Mudah, cepat dan praktis!
                </p>
              </div>
            </div>

            {/* 3 Step Flow matching screenshot */}
            <div className="grid grid-cols-3 gap-2 items-center my-6 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-2xl bg-blue-50 text-[#075BEA] flex items-center justify-center mb-2 shadow-xs border border-blue-100">
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#075BEA] text-white text-[10px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Pilih Mobil & Tanggal
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-slate-300">
                <ArrowRight className="w-5 h-5 text-blue-400" />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="relative w-12 h-12 rounded-2xl bg-blue-50 text-[#075BEA] flex items-center justify-center mb-2 shadow-xs border border-blue-100">
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#075BEA] text-white text-[10px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <CreditCard className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Lakukan Pembayaran
                </p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-slate-300 col-span-3 my-1 sm:hidden">
                <ArrowRight className="w-5 h-5 text-blue-400 rotate-90" />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center col-span-3 sm:col-span-1 mt-2 sm:mt-0">
                <div className="relative w-12 h-12 rounded-2xl bg-blue-50 text-[#075BEA] flex items-center justify-center mb-2 shadow-xs border border-blue-100">
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#075BEA] text-white text-[10px] font-bold flex items-center justify-center">
                    3
                  </span>
                  <Car className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  Mobil Siap Digunakan
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onStartRent}
              className="w-full py-2.5 px-4 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-[#075BEA] transition-colors"
            >
              Mulai Reservasi Sekarang
            </button>
          </div>
        </div>

        {/* Right Side: Apa Kata Pelanggan? + Scenic Banner (lg:col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Review Card (md:col-span-7) */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-1.5 h-6 bg-[#075BEA] rounded-full mt-0.5" />
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#071B49]">
                    Apa Kata Pelanggan?
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Kepuasan Anda adalah prioritas kami
                  </p>
                </div>
              </div>

              {/* Review Quote Body */}
              <div className="my-4">
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{currentReview.comment}"
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={currentReview.userAvatar}
                    alt={currentReview.userName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">
                      {currentReview.userName}
                    </h5>
                    <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                      {[...Array(currentReview.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-[10px] text-slate-400 font-semibold ml-1">
                        {currentReview.carName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-medium">
                {currentReviewIdx + 1} dari {reviews.length} Ulasan
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevReview}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextReview}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Coastal Scenic Road Drive Card matching screenshot (md:col-span-5) */}
          <div className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[180px] shadow-sm group">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
              alt="Coastal Drive Affi Car Rent"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
                  Affi Journey
                </span>
              </div>
              <p className="text-xs font-extrabold leading-snug">
                Jelajahi keindahan Indonesia tanpa batas dengan kenyamanan maksimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
