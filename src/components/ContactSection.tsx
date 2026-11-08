import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-wider text-[#075BEA] bg-blue-50 px-3 py-1 rounded-full">
          Hubungi Kami
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#071B49] mt-3">
          Kami Siap Membantu Perjalanan Anda 24/7
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-2">
          Butuh konsultasi sewa jangka panjang, sewa korporat, atau bantuan darurat di jalan? Hubungi customer support kami segera.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information & Hubs (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#071B49]">Layanan Bantuan Pelanggan</h3>

            <div className="space-y-3 text-xs">
              <a
                href="tel:081234567890"
                className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/60 transition-colors text-slate-800"
              >
                <div className="w-9 h-9 rounded-xl bg-[#075BEA] text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#071B49]">Call Center 24 Jam</p>
                  <p className="text-slate-600 font-medium">0812 3456 7890 / (021) 5088-9999</p>
                </div>
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/60 transition-colors text-slate-800"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-emerald-900">WhatsApp Booking Cepat</p>
                  <p className="text-slate-600 font-medium">+62 812-3456-7890 (Respon &lt; 2 menit)</p>
                </div>
              </a>

              <a
                href="mailto:hello@afficarrent.id"
                className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/60 transition-colors text-slate-800"
              >
                <div className="w-9 h-9 rounded-xl bg-[#071B49] text-white flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#071B49]">Email Dukungan Resmi</p>
                  <p className="text-slate-600 font-medium">hello@afficarrent.id</p>
                </div>
              </a>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-sm">Jam Operasional Layanan</h4>
            </div>
            <p className="text-xs text-slate-300">
              Penjemputan & Serah Terima Unit: <strong>24 Jam Setiap Hari</strong> (Termasuk Hari Libur Nasional & Lebaran / Tahun Baru).
            </p>
          </div>
        </div>

        {/* Right Side: Message Form (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h3 className="font-black text-lg text-[#071B49] mb-1">Kirim Pesan / Permintaan Kerjasama</h3>
          <p className="text-xs text-slate-500 mb-6">
            Tim representatif kami akan menghubungi Anda kembali dalam kurun waktu 15 menit.
          </p>

          {sent ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-emerald-900">Pesan Berhasil Terkirim!</h4>
              <p className="text-xs text-emerald-700">Terima kasih telah menghubungi Affi Car Rent. Tim kami akan segera merespon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Anda *</label>
                <input
                  type="text"
                  required
                  placeholder="Andi Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alamat Email / WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="email@domain.com atau 0812xxxx"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Pesan / Pertanyaan Anda *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan kebutuhan rental mobil Anda (tipe unit, durasi sewa, kota tujuan)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
