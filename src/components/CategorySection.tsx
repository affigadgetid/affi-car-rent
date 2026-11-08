import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { CarCategory } from '../types';

interface CategoryItem {
  id: CarCategory | 'Terbaru';
  name: string;
  count: string;
  image: string;
  isEv?: boolean;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'EV',
    name: 'Mobil EV',
    count: '6 Pilihan',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80',
    isEv: true
  },
  {
    id: 'SUV',
    name: 'SUV',
    count: '8 Pilihan',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'MPV',
    name: 'MPV',
    count: '7 Pilihan',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Sedan',
    name: 'Sedan',
    count: '5 Pilihan',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Premium',
    name: 'Premium',
    count: '4 Pilihan',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Terbaru',
    name: 'Mobil Terbaru',
    count: '10 Pilihan',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80'
  }
];

interface CategorySectionProps {
  onSelectCategory: (category: CarCategory | 'All') => void;
  selectedCategory?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  selectedCategory
}) => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-8 bg-[#075BEA] rounded-full mt-0.5" />
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071B49] tracking-tight">
              Kategori Mobil
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih kategori sesuai kebutuhan perjalanan Anda
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectCategory('All')}
          className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#075BEA] hover:text-blue-800 transition-colors"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id === 'Terbaru' ? 'All' : (cat.id as CarCategory))}
              className={`group relative bg-white rounded-2xl p-3 border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                isSelected
                  ? 'border-[#075BEA] ring-2 ring-blue-500/20 shadow-md shadow-blue-500/10'
                  : 'border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50'
              }`}
            >
              {/* Optional EV badge */}
              {cat.isEv && (
                <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-xs">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  <span>EV</span>
                </div>
              )}

              {/* Car Image Preview */}
              <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 bg-slate-50 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-108"
                />
              </div>

              {/* Category Title */}
              <h3 className="font-bold text-sm text-[#071B49] group-hover:text-[#075BEA] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {cat.count}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
