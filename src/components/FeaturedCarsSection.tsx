import React, { useState } from 'react';
import { ArrowRight, Zap, Users, Gauge, Info, Fuel, Sparkles, CheckCircle2 } from 'lucide-react';
import { Car, CarCategory } from '../types';
import { formatRupiah } from '../services/storage';

interface FeaturedCarsSectionProps {
  cars: Car[];
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
  selectedCategory: CarCategory | 'All';
  onCategoryChange: (category: CarCategory | 'All') => void;
}

export const FeaturedCarsSection: React.FC<FeaturedCarsSectionProps> = ({
  cars,
  onSelectCar,
  onBookCar,
  selectedCategory,
  onCategoryChange
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high'>('recommended');

  const filterTabs: Array<{ label: string; value: CarCategory | 'All' }> = [
    { label: 'Semua Mobil', value: 'All' },
    { label: '⚡ Mobil EV', value: 'EV' },
    { label: 'SUV', value: 'SUV' },
    { label: 'MPV', value: 'MPV' },
    { label: 'Sedan', value: 'Sedan' },
    { label: 'Premium', value: 'Premium' }
  ];

  // Filtering & Sorting
  const filteredCars = cars.filter((car) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'EV'
        ? car.isEv || car.category === 'EV'
        : car.category === selectedCategory;

    const matchesKeyword =
      car.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      car.category.toLowerCase().includes(searchKeyword.toLowerCase());

    return matchesCategory && matchesKeyword;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
    if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <section id="mobil-pilihan" className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-[#075BEA] rounded-full mt-0.5" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071B49] tracking-tight">
              Mobil Pilihan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Koleksi mobil terbaru dengan performa terbaik dan jaminan kepuasan
            </p>
          </div>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => onCategoryChange(tab.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === tab.value
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-[#075BEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Search & Sort Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari tipe mobil (cth: bZ4X, Avanza)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#075BEA]/20 focus:border-[#075BEA]"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-600">
          <span className="font-semibold text-slate-500">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Paling Rekomendasi</option>
            <option value="price-low">Harga Terendah</option>
            <option value="price-high">Harga Tertinggi</option>
          </select>
          <span className="text-slate-400">|</span>
          <span className="font-bold text-slate-700">{filteredCars.length} Unit</span>
        </div>
      </div>

      {/* Cars Grid matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCars.map((car) => {
          return (
            <div
              key={car.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image & Badge Container */}
              <div className="relative w-full h-36 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden flex items-center justify-center p-2">
                {/* EV Badge */}
                {car.isEv && (
                  <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold shadow-sm">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                    <span>EV</span>
                  </div>
                )}

                {/* Available Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-semibold text-slate-700 shadow-2xs">
                  <span className={`w-1.5 h-1.5 rounded-full ${car.isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>{car.isAvailable ? 'Tersedia' : 'Tersewa'}</span>
                </div>

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-106"
                />
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Name & Info icon */}
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-extrabold text-sm text-[#071B49] truncate group-hover:text-[#075BEA] transition-colors">
                      {car.name}
                    </h3>
                    <button
                      onClick={() => onSelectCar(car)}
                      title="Lihat Detail Spesifikasi"
                      className="text-slate-400 hover:text-[#075BEA] transition-colors p-0.5"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtitle tag: e.g. SUV • Listrik */}
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {car.category} • {car.fuelType}
                  </p>

                  {/* Key specs icons */}
                  <div className="grid grid-cols-3 gap-1 my-2.5 py-1.5 px-2 bg-slate-50 rounded-lg text-[10px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1" title={`${car.seats} Kursi Penumpang`}>
                      <Users className="w-3 h-3 text-slate-400" />
                      <span>{car.seats} Seat</span>
                    </div>
                    <div className="flex items-center gap-1" title={car.transmission}>
                      <Gauge className="w-3 h-3 text-slate-400" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1" title={car.fuelType}>
                      {car.isEv ? (
                        <Zap className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Fuel className="w-3 h-3 text-slate-400" />
                      )}
                      <span className="truncate">{car.isEv ? `${car.specs.rangeKm}km` : 'Bensin'}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-1">
                    <span className="text-base font-extrabold text-[#075BEA]">
                      {formatRupiah(car.pricePerDay)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium"> /hari</span>
                  </div>
                </div>

                {/* Buttons: Detail & Sewa Sekarang */}
                <div className="mt-3 flex flex-col gap-1.5">
                  <button
                    onClick={() => onBookCar(car)}
                    className="w-full flex items-center justify-center gap-1.5 bg-[#075BEA] hover:bg-blue-700 text-white py-2 px-3 rounded-full font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <span>Sewa Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectCar(car)}
                    className="w-full text-center text-[11px] font-semibold text-slate-500 hover:text-[#075BEA] transition-colors py-1"
                  >
                    Detail Lengkap
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
            🚗
          </div>
          <h3 className="font-bold text-slate-800 text-base">Tidak ada mobil yang sesuai filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Coba pilih kategori lain atau hapus kata kunci pencarian.
          </p>
          <button
            onClick={() => {
              onCategoryChange('All');
              setSearchKeyword('');
            }}
            className="px-4 py-2 bg-[#075BEA] text-white text-xs font-bold rounded-full shadow-sm"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </section>
  );
};
