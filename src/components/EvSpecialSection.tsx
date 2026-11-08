import React, { useState } from 'react';
import { Zap, BatteryCharging, Leaf, Shield, ArrowRight, Gauge, MapPin } from 'lucide-react';
import { Car } from '../types';
import { formatRupiah } from '../services/storage';

interface EvSpecialSectionProps {
  evCars: Car[];
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
}

export const EvSpecialSection: React.FC<EvSpecialSectionProps> = ({
  evCars,
  onSelectCar,
  onBookCar
}) => {
  const [selectedCityTrip, setSelectedCityTrip] = useState<'bandung' | 'semarang' | 'cirebon'>('bandung');

  const tripStats = {
    bandung: { distance: 155, stops: '0 Kali Isi Ulang', savings: 'Hemat Rp 210.000 vs Bensin' },
    cirebon: { distance: 220, stops: '0 Kali Isi Ulang', savings: 'Hemat Rp 320.000 vs Bensin' },
    semarang: { distance: 440, stops: '1 Kali Rest Area Fast Charging (20m)', savings: 'Hemat Rp 580.000 vs Bensin' }
  };

  return (
    <section className="py-14 bg-gradient-to-br from-[#071B49] via-[#0A2666] to-[#075BEA] text-white relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Affi Green Mobility • 100% Zero Emission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Era Baru Berkendara dengan <span className="text-sky-300">Mobil Listrik (EV)</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Rasakan akselerasi instan tanpa getaran mesin, kabin super hening, teknologi otonom, dan bebas aturan ganjil-genap di seluruh ruas jalan protokol Jakarta.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <p className="text-xs text-sky-200">Bebas Pajak & BBM</p>
              <p className="text-xl font-black text-white">Hemat 70%</p>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <p className="text-xs text-emerald-300">Emisi Karbon</p>
              <p className="text-xl font-black text-emerald-400">0 Gram</p>
            </div>
          </div>
        </div>

        {/* 4 Key EV Advantages Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-1">Bebas Ganjil Genap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Berkendara bebas aturan plat nomor di Rasuna Said, Sudirman, Thamrin, dan Gatot Subroto kapan saja.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-3">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-1">Ultra-Fast Charging</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dukungan SPKLU DC Fast Charging hingga 800V. Cukup 20-30 menit untuk menambah jarak tempuh 300+ km.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-sky-300 flex items-center justify-center mb-3">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-1">Torsi Instan & Hening</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sensasi akselerasi responsif tanpa jeda perpindahan gigi dan kabin kedap suara berkualitas studio audio.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base mb-1">Garansi Unit 100% Siap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Baterai selalu diserahterimakan dengan kondisi minimal 90% beserta kabel portable charger cadangan.
            </p>
          </div>
        </div>

        {/* EV Range Trip Simulator */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/15 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-sky-200 font-bold">Simulasi Jarak Tempuh EV</p>
              <h3 className="text-lg font-bold">Berapa jauh Anda bisa bepergian dari Jakarta dengan sekali cas?</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCityTrip('bandung')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCityTrip === 'bandung' ? 'bg-sky-400 text-[#071B49]' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Jakarta ➔ Bandung
              </button>
              <button
                onClick={() => setSelectedCityTrip('cirebon')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCityTrip === 'cirebon' ? 'bg-sky-400 text-[#071B49]' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Jakarta ➔ Cirebon
              </button>
              <button
                onClick={() => setSelectedCityTrip('semarang')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCityTrip === 'semarang' ? 'bg-sky-400 text-[#071B49]' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Jakarta ➔ Semarang
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <div className="p-3 rounded-2xl bg-white/5">
              <p className="text-xs text-slate-300">Jarak Tempuh</p>
              <p className="text-2xl font-black text-sky-300">{tripStats[selectedCityTrip].distance} KM</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5">
              <p className="text-xs text-slate-300">Kebutuhan Pengisian Ulang</p>
              <p className="text-base font-bold text-emerald-400 mt-1">{tripStats[selectedCityTrip].stops}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5">
              <p className="text-xs text-slate-300">Efisiensi Biaya Energi</p>
              <p className="text-base font-bold text-amber-300 mt-1">{tripStats[selectedCityTrip].savings}</p>
            </div>
          </div>
        </div>

        {/* Featured EV Cards Row */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Armada Mobil Listrik Unggulan Affi Car Rent</span>
            </h3>
            <span className="text-xs text-sky-200">Unit Terlaris</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {evCars.slice(0, 4).map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-2xl text-slate-900 overflow-hidden shadow-xl border border-white/20 flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <div className="absolute top-2.5 right-2.5 z-10 bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>{car.specs.rangeKm} KM</span>
                  </div>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-106"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-base text-[#071B49] truncate">{car.name}</h4>
                    <p className="text-xs text-slate-500">{car.brand} • Baterai {car.specs.batteryKwh} kWh</p>

                    <div className="grid grid-cols-2 gap-2 mt-3 py-2 px-2.5 bg-slate-50 rounded-xl text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400">Fast Charging</p>
                        <p className="font-bold text-slate-700">{car.specs.chargingTimeMin} Menit</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Tenaga Mesin</p>
                        <p className="font-bold text-slate-700">{car.specs.powerHp} HP</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-lg font-black text-[#075BEA]">{formatRupiah(car.pricePerDay)}</p>
                      <p className="text-[10px] text-slate-400">Per 24 Jam • Promo Kode: AFFIEV20</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => onSelectCar(car)}
                      className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => onBookCar(car)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Sewa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
