import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, Car as CarIcon, Search } from 'lucide-react';
import { CITIES_LOCATIONS } from '../data/mockData';
import { CarCategory } from '../types';

interface SearchWidgetProps {
  onSearch: (params: {
    location: string;
    startDate: string;
    endDate: string;
    category: CarCategory | 'All';
  }) => void;
  defaultCategory?: CarCategory | 'All';
}

export const BookingSearchWidget: React.FC<SearchWidgetProps> = ({
  onSearch,
  defaultCategory = 'All'
}) => {
  // Set default dates: tomorrow and 3 days later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(threeDaysLater.getDate() + 4);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];

  const [location, setLocation] = useState(CITIES_LOCATIONS[0]);
  const [startDate, setStartDate] = useState(formatDateStr(tomorrow));
  const [endDate, setEndDate] = useState(formatDateStr(threeDaysLater));
  const [category, setCategory] = useState<CarCategory | 'All'>(defaultCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      startDate,
      endDate,
      category
    });
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 p-4 sm:p-6 lg:p-7">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
          {/* Lokasi Pengambilan */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#075BEA]" />
              <span>Lokasi Pengambilan</span>
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075BEA]/20 focus:border-[#075BEA] transition-all cursor-pointer"
              >
                {CITIES_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </div>
            </div>
          </div>

          {/* Tanggal Ambil */}
          <div className="lg:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#075BEA]" />
              <span>Tanggal Ambil</span>
            </label>
            <input
              type="date"
              value={startDate}
              min={formatDateStr(today)}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075BEA]/20 focus:border-[#075BEA] transition-all cursor-pointer"
            />
          </div>

          {/* Tanggal Kembali */}
          <div className="lg:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-[#075BEA]" />
              <span>Tanggal Kembali</span>
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate || formatDateStr(tomorrow)}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075BEA]/20 focus:border-[#075BEA] transition-all cursor-pointer"
            />
          </div>

          {/* Jenis Mobil */}
          <div className="lg:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <CarIcon className="w-4 h-4 text-[#075BEA]" />
              <span>Jenis Mobil</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CarCategory | 'All')}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075BEA]/20 focus:border-[#075BEA] transition-all cursor-pointer"
              >
                <option value="All">Semua Kategori Mobil</option>
                <option value="EV">⚡ Mobil Listrik (EV)</option>
                <option value="SUV">SUV & Crossover</option>
                <option value="MPV">MPV Keluarga (7-Seat)</option>
                <option value="Sedan">Sedan Premium</option>
                <option value="Premium">VIP & Luxury</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </div>
            </div>
          </div>

          {/* Tombol Cari Mobil */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#075BEA] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Cari Mobil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
