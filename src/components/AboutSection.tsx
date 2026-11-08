import React from 'react';
import { ShieldCheck, Award, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { AffiLogo } from './AffiLogo';

interface AboutSectionProps {
  onBackToHome: () => void;
  onExploreCars: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBackToHome, onExploreCars }) => {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-black uppercase tracking-wider text-[#075BEA] bg-blue-50 px-3 py-1 rounded-full">
          Tentang Affi Car Rent
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071B49] mt-3 tracking-tight">
          Penyedia Rental Mobil Modern & Kendaraan Listrik Terdepan di Indonesia
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Didirikan dengan komitmen memberikan solusi mobilitas yang fleksibel, aman, dan berkelas. Kami menghadirkan unit kendaraan keluaran terbaru dengan proses pemesanan digital 100% transparan tanpa biaya siluman.
        </p>
      </div>

      {/* Visual Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-blue-50 text-[#075BEA] rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl">
            🏆
          </div>
          <h3 className="text-lg font-black text-[#071B49]">500+ Armada Terbaru</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Armada berusia maksimal 3 tahun, rutin diservis di bengkel resmi APM, selalu bersih dan steril sebelum serah terima.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl">
            ⚡
          </div>
          <h3 className="text-lg font-black text-[#071B49]">Pionir Rental EV</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Menyediakan line-up mobil listrik terlengkap mulai dari Toyota bZ4X, BYD Atto 3, Hyundai IONIQ 5, Tesla, hingga Wuling.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl">
            🛡️
          </div>
          <h3 className="text-lg font-black text-[#071B49]">Asuransi & Bantuan 24/7</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Dilengkapi asuransi all-risk komprehensif dan layanan roadside assistance darurat siap siaga 24 jam di seluruh kota.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gradient-to-r from-blue-700 to-[#075BEA] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-black">Misi Keberlanjutan & Kenyamanan Perjalanan</h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            Affi Car Rent terus memperluas adopsi armada kendaraan ramah lingkungan demi mendukung target nol emisi karbon di Indonesia. Setiap perjalanan bersama kami dirancang untuk menghadirkan ketenangan, efisiensi, dan kebahagiaan bagi Anda dan keluarga.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-white">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Transparansi 100%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Driver Profesional Bersertifikat</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>Antar Jemput Bandara Tepat Waktu</span>
            </span>
          </div>
        </div>

        <button
          onClick={onExploreCars}
          className="px-6 py-3.5 bg-white text-[#071B49] font-black text-xs sm:text-sm rounded-full shadow-lg hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <span>Pilih Mobil Sekarang</span>
          <ArrowRight className="w-4 h-4 text-[#075BEA]" />
        </button>
      </div>
    </div>
  );
};
