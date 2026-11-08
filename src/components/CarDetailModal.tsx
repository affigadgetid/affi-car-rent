import React, { useState } from 'react';
import {
  X,
  Zap,
  Users,
  Gauge,
  Fuel,
  Shield,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { Car } from '../types';
import { formatRupiah } from '../services/storage';

interface CarDetailModalProps {
  car: Car | null;
  onClose: () => void;
  onBookNow: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onBookNow
}) => {
  if (!car) return null;

  const [activeImage, setActiveImage] = useState(car.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto">
          {/* Left Column: Gallery & Highlights (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 bg-slate-50 border-r border-slate-100 flex flex-col justify-between">
            <div>
              {/* Main Image Display */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200/80 mb-3 flex items-center justify-center">
                {car.isEv && (
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-md">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Electric Vehicle (EV)</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-xs font-bold text-slate-800 shadow-xs">
                  {car.year} Model
                </div>

                <img
                  src={activeImage}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {car.gallery && car.gallery.length > 1 && (
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                  {[car.image, ...car.gallery.filter(g => g !== car.image)].map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImage === imgUrl ? 'border-[#075BEA] ring-2 ring-blue-500/20' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Deskripsi Kendaraan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Key Features & Facilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Fasilitas & Keunggulan Termasuk
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {car.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Syarat & Ketentuan Ringkas */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">Persyaratan Sewa:</p>
              <p>• Lepas Kunci: KTP Asli + SIM A aktif + Akun media sosial / deposit.</p>
              <p>• Termasuk: Layanan darurat 24 jam dan unit bersih terdesinfeksi.</p>
            </div>
          </div>

          {/* Right Column: Technical Specs & Booking Trigger (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#075BEA] bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {car.category}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-500">
                    {car.fuelType}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-[#071B49]">{car.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{car.location || 'Semua Cabang Utama'}</span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="my-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Spesifikasi Teknis
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Kapasitas Penumpang</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-[#075BEA]" />
                      {car.seats} Orang Dewasa
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Transmisi</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Gauge className="w-3.5 h-3.5 text-[#075BEA]" />
                      {car.transmission}
                    </span>
                  </div>

                  {car.isEv ? (
                    <>
                      <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-[10px] text-emerald-700 block font-semibold">Jarak Tempuh (NEDC)</span>
                        <span className="font-extrabold text-emerald-900 flex items-center gap-1 mt-0.5">
                          <Zap className="w-3.5 h-3.5 text-emerald-600" />
                          {car.specs.rangeKm} KM / Full Charge
                        </span>
                      </div>

                      <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                        <span className="text-[10px] text-emerald-700 block font-semibold">Kapasitas Baterai</span>
                        <span className="font-extrabold text-emerald-900 flex items-center gap-1 mt-0.5">
                          ⚡ {car.specs.batteryKwh} kWh
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Kapasitas Mesin</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Fuel className="w-3.5 h-3.5 text-[#075BEA]" />
                          {car.specs.engineCc || 'Mesin Terawat'}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Bahan Bakar</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                          {car.fuelType}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Tenaga Maksimal</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {car.specs.powerHp} Horsepower
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Ruang Bagasi</span>
                    <span className="font-bold text-slate-800 mt-0.5 block">
                      {car.specs.luggageCapacity || 'Lapang (3-4 Koper)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Ketersediaan */}
              <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${car.isAvailable ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                  <span className="text-xs font-bold text-slate-800">
                    {car.isAvailable ? 'Unit Tersedia untuk Booking Sekarang' : 'Unit Sedang Tersewa (Pre-order)'}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#075BEA] bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  Ready to Go
                </span>
              </div>
            </div>

            {/* Pricing & CTA */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-[11px] text-slate-400 block">Tarif Sewa Harian:</span>
                  <span className="text-2xl font-black text-[#075BEA]">
                    {formatRupiah(car.pricePerDay)}
                  </span>
                  <span className="text-xs text-slate-500"> /24 Jam</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full block">
                    Bisa Lepas Kunci
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookNow(car);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Sewa Mobil Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
