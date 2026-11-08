import React, { useState, useEffect } from 'react';
import {
  Search,
  User as UserIcon,
  Menu,
  X,
  Zap,
  ChevronDown,
  Shield,
  LogOut,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { AffiLogo } from './AffiLogo';
import { User, CarCategory } from '../types';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (view: 'home' | 'catalog' | 'ev' | 'dashboard' | 'admin' | 'about' | 'contact') => void;
  currentView: string;
  onSelectCategory?: (category: CarCategory | 'All') => void;
  onOpenQuickBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onNavigate,
  currentView,
  onSelectCategory,
  onOpenQuickBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (cat: CarCategory | 'All') => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    onNavigate('catalog');
    setExploreDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <AffiLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentView === 'home'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/25'
                  : 'text-slate-700 hover:text-[#075BEA] hover:bg-blue-50/60'
              }`}
            >
              Home
            </button>

            {/* Explore Cars with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                onMouseEnter={() => setExploreDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  currentView === 'catalog'
                    ? 'text-[#075BEA] bg-blue-50/70 font-bold'
                    : 'text-slate-700 hover:text-[#075BEA] hover:bg-blue-50/60'
                }`}
              >
                <span>Explore Cars</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${exploreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {exploreDropdownOpen && (
                <div
                  onMouseLeave={() => setExploreDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    onClick={() => handleCategoryClick('All')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] font-medium flex items-center justify-between"
                  >
                    <span>Semua Kategori</span>
                    <span className="text-xs text-slate-400">12 Unit</span>
                  </button>
                  <div className="h-px bg-slate-100 my-1" />
                  <button
                    onClick={() => handleCategoryClick('EV')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Mobil Listrik (EV)</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('SUV')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>SUV & Crossover</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('MPV')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>MPV Keluarga (7-Seat)</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Sedan')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Sedan Sport & Eksekutif</span>
                  </button>
                  <button
                    onClick={() => handleCategoryClick('Premium')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>VIP & Premium Luxury</span>
                  </button>
                </div>
              )}
            </div>

            {/* EV Cars Link with Highlight Badge */}
            <button
              onClick={() => onNavigate('ev')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentView === 'ev'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/50'
              }`}
            >
              <span>EV Cars</span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white leading-none">
                <Zap className="w-2.5 h-2.5 fill-current" />
                EV
              </span>
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentView === 'about'
                  ? 'text-[#075BEA] bg-blue-50/70 font-bold'
                  : 'text-slate-700 hover:text-[#075BEA] hover:bg-blue-50/60'
              }`}
            >
              About
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentView === 'contact'
                  ? 'text-[#075BEA] bg-blue-50/70 font-bold'
                  : 'text-slate-700 hover:text-[#075BEA] hover:bg-blue-50/60'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => onNavigate('catalog')}
              title="Cari Mobil"
              className="p-2.5 text-slate-600 hover:text-[#075BEA] hover:bg-blue-50 rounded-full transition-colors hidden sm:flex"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Demo Mode Badge / Switcher */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => onNavigate(currentView === 'admin' ? 'home' : 'admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  currentView === 'admin'
                    ? 'bg-[#071B49] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Buka Panel Admin Fleet"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin View</span>
              </button>
            </div>

            {/* User Auth or Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-blue-50 border border-blue-200 hover:bg-blue-100/70 transition-all text-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
                  />
                  <span className="font-semibold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userMenuOpen && (
                  <div
                    onMouseLeave={() => setUserMenuOpen(false)}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Masuk sebagai</p>
                      <p className="font-bold text-sm text-slate-800 truncate">{currentUser.name}</p>
                      <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-[#075BEA] uppercase tracking-wider">
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] flex items-center gap-2.5 font-medium"
                    >
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Dashboard & Riwayat</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#075BEA] flex items-center gap-2.5 font-medium"
                    >
                      <Shield className="w-4 h-4 text-indigo-500" />
                      <span>Admin Management</span>
                    </button>

                    <div className="h-px bg-slate-100 my-1" />

                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#075BEA] text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
              >
                <UserIcon className="w-4 h-4" />
                <span>Login / Daftar</span>
              </button>
            )}

            {/* Booking CTA Button (from screenshot) */}
            <button
              onClick={onOpenQuickBooking}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#071B49] text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Sewa Cepat</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 pb-4 space-y-2 animate-in fade-in duration-200">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'home' ? 'bg-[#075BEA] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'catalog' ? 'bg-[#075BEA] text-white' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>Explore All Cars</span>
              <Layers className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                onNavigate('ev');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                currentView === 'ev' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50/70'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Mobil Listrik (EV)</span>
              </span>
              <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold">Kini Tersedia</span>
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              About Affi Car Rent
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Contact Us & Cabang
            </button>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-blue-50 text-[#075BEA] flex items-center gap-2 justify-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Dashboard Pelanggan</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-[#071B49] text-white flex items-center gap-2 justify-center"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Fleet Management</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
