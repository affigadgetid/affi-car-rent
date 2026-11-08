import React from 'react';
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, ShieldCheck } from 'lucide-react';
import { AffiLogo } from './AffiLogo';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'ev' | 'about' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#071B49] text-white pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Logo & Description */}
          <div className="md:col-span-4 space-y-3">
            <div className="cursor-pointer" onClick={() => onNavigate('home')}>
              <AffiLogo variant="white" size="lg" />
            </div>
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
              Solusi rental mobil modern, praktis, dan terpercaya di Indonesia. Menyediakan berbagai kategori kendaraan terbaik termasuk mobil listrik (EV) dengan standar kebersihan dan servis tinggi.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Unit Terjamin 100% Asuransi & Bebas Khawatir</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home / Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors"
                >
                  Explore Cars (Katalog Lengkap)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ev')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Mobil Listrik (EV)</span>
                  <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                    HOT
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Tentang Affi Car Rent
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Lokasi Cabang & Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Cabang Operasional */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Kantor Cabang & Pool Unit
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Jakarta Hub</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Bandara Soekarno-Hatta T3 & Jl. Jendral Sudirman Kav. 52
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Bali Hub</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Bandara Ngurah Rai & Sunset Road, Kuta, Bali
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Surabaya Hub</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Bandara Juanda & Jl. Basuki Rahmat No. 88
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Bandung Hub</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Jl. Dr. Djunjunan (Pasteur) No. 120
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip matching screenshot: Phone, Email, Socials, Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="tel:081234567890"
              className="flex items-center gap-2 text-white font-medium hover:text-sky-300 transition-colors"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>0812 3456 7890</span>
            </a>

            <a
              href="mailto:hello@afficarrent.id"
              className="flex items-center gap-2 text-white font-medium hover:text-sky-300 transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>hello@afficarrent.id</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-300">
            <a href="#youtube" className="hover:text-white transition-colors" title="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#instagram" className="hover:text-white transition-colors" title="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#tiktok" className="hover:text-white transition-colors font-bold text-sm" title="TikTok">
              TikTok
            </a>
            <a href="#facebook" className="hover:text-white transition-colors" title="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div>
            <p>© 2026 Affi Car Rent. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
