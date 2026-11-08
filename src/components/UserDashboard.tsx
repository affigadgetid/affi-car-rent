import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Car,
  CreditCard,
  FileText,
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download,
  Edit2,
  Check,
  Tag,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';
import { Booking, User } from '../types';
import { StorageService, formatRupiah } from '../services/storage';

interface UserDashboardProps {
  currentUser: User;
  bookings: Booking[];
  onOpenBooking: () => void;
  onExploreCars: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  bookings,
  onOpenBooking,
  onExploreCars
}) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'history' | 'profile'>('bookings');
  const [selectedVoucher, setSelectedVoucher] = useState<Booking | null>(null);

  // Edit profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editKtp, setEditKtp] = useState(currentUser.ktpNumber || '3171012345678901');
  const [editSim, setEditSim] = useState(currentUser.simNumber || '920112345678');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter bookings for current user (or show all demo bookings)
  const myBookings = bookings.filter(
    (b) => b.userId === currentUser.id || b.userEmail === currentUser.email || currentUser.role === 'customer'
  );

  const activeRentals = myBookings.filter(
    (b) => b.rentalStatus === 'Dikonfirmasi' || b.rentalStatus === 'Sedang Berjalan' || b.rentalStatus === 'Menunggu Konfirmasi'
  );

  const pastRentals = myBookings.filter(
    (b) => b.rentalStatus === 'Selesai' || b.rentalStatus === 'Dibatalkan'
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateUserProfile({
      name: editName,
      phone: editPhone,
      ktpNumber: editKtp,
      simNumber: editSim
    });
    setSaveSuccess(true);
    setIsEditingProfile(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner with Profile Header */}
      <div className="bg-gradient-to-r from-[#071B49] via-[#0D2D73] to-[#075BEA] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/60 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-sky-200 font-bold uppercase tracking-wider">
                  Member Terverifikasi
                </span>
                <span className="text-xs text-blue-200">Bergabung {currentUser.joinedDate}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-1 text-white">{currentUser.name}</h1>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-2 mt-0.5">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreCars}
              className="px-5 py-2.5 rounded-xl bg-white text-[#071B49] font-extrabold text-xs shadow-md hover:bg-slate-100 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Car className="w-4 h-4 text-[#075BEA]" />
              <span>Sewa Mobil Baru</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-slate-300">Total Rental</p>
            <p className="text-xl font-black text-white">{myBookings.length} Kali</p>
          </div>
          <div>
            <p className="text-slate-300">Booking Aktif</p>
            <p className="text-xl font-black text-amber-300">{activeRentals.length} Unit</p>
          </div>
          <div>
            <p className="text-slate-300">Poin Loyalty</p>
            <p className="text-xl font-black text-emerald-400">1.250 Poin</p>
          </div>
          <div>
            <p className="text-slate-300">Tier Keanggotaan</p>
            <p className="text-xl font-black text-sky-300">Affi Gold VIP</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-[#075BEA] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Sewa Aktif & Mendatang ({activeRentals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-[#075BEA] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Riwayat Sewa ({pastRentals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#075BEA] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Profil & Verifikasi KTP/SIM</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profil dan dokumen identitas Anda berhasil diperbarui!</span>
        </div>
      )}

      {/* TAB 1: ACTIVE BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {activeRentals.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-50 text-[#075BEA] rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">
                🚗
              </div>
              <h3 className="text-lg font-bold text-slate-800">Tidak ada jadwal rental aktif saat ini</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Pilih armada terbaru atau coba mobil listrik kami untuk perjalanan nyaman Anda berikutnya.
              </p>
              <button
                onClick={onExploreCars}
                className="px-5 py-2.5 bg-[#075BEA] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all cursor-pointer"
              >
                Jelajahi Armada Sekarang
              </button>
            </div>
          ) : (
            activeRentals.map((bk) => (
              <div
                key={bk.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6 hover:border-blue-200 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <img
                      src={bk.carImage}
                      alt={bk.carName}
                      className="w-20 h-16 sm:w-28 sm:h-20 rounded-2xl object-cover bg-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black text-[#075BEA] bg-blue-50 px-2.5 py-0.5 rounded-full">
                          {bk.bookingCode}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-medium">{bk.carCategory}</span>
                      </div>
                      <h3 className="text-lg font-black text-[#071B49] mt-0.5">{bk.carName}</h3>
                      <p className="text-xs text-slate-500">
                        Pengambilan: <strong className="text-slate-700">{bk.startDate}</strong> s/d{' '}
                        <strong className="text-slate-700">{bk.endDate}</strong> ({bk.durationDays} Hari)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                        bk.rentalStatus === 'Dikonfirmasi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : bk.rentalStatus === 'Sedang Berjalan'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {bk.rentalStatus}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        Status Pembayaran: <strong className="text-emerald-600">{bk.paymentStatus}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedVoucher(bk)}
                      className="p-2.5 bg-blue-50 hover:bg-blue-100 text-[#075BEA] rounded-xl transition-colors cursor-pointer"
                      title="Lihat E-Voucher Digital"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
                  <div className="space-y-0.5">
                    <p className="text-slate-400 font-semibold">LOKASI PENJEMPUTAN</p>
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{bk.pickupLocation}</span>
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-slate-400 font-semibold">OPSI PENGEMUDI</p>
                    <p className="font-bold text-slate-800 uppercase">
                      {bk.driverOption === 'dengan-supir' ? 'DENGAN SUPIR' : 'LEPAS KUNCI (SELF DRIVE)'}
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-slate-400 font-semibold">TOTAL BIAYA</p>
                    <p className="text-sm font-black text-[#075BEA]">
                      {formatRupiah(bk.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {pastRentals.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-100 text-center text-xs text-slate-500">
              Belum ada riwayat rental yang selesai.
            </div>
          ) : (
            pastRentals.map((bk) => (
              <div
                key={bk.id}
                className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={bk.carImage}
                    alt={bk.carName}
                    className="w-16 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#071B49]">{bk.carName}</h4>
                    <p className="text-xs text-slate-500">{bk.startDate} - {bk.endDate} • {bk.durationDays} Hari</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="font-bold text-slate-800">{formatRupiah(bk.totalAmount)}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                    {bk.rentalStatus}
                  </span>
                  <button
                    onClick={() => setSelectedVoucher(bk)}
                    className="text-[#075BEA] font-bold hover:underline"
                  >
                    Invoice
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-black text-lg text-[#071B49]">Profil & Dokumen Identitas</h3>
              <p className="text-xs text-slate-500">Data verifikasi untuk kemudahan sewa lepas kunci</p>
            </div>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Ubah Profil</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                disabled={!isEditingProfile}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium disabled:opacity-75 focus:outline-none focus:border-[#075BEA]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  disabled={!isEditingProfile}
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium disabled:opacity-75 focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Alamat Email</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nomor NIK KTP</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={editKtp}
                  onChange={(e) => setEditKtp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium disabled:opacity-75 focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nomor SIM A</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={editSim}
                  onChange={(e) => setEditSim(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium disabled:opacity-75 focus:outline-none focus:border-[#075BEA]"
                />
              </div>
            </div>

            {isEditingProfile && (
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-[#075BEA] text-white font-bold hover:bg-blue-700"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* E-VOUCHER MODAL */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full p-6 text-left relative overflow-hidden">
            <button
              onClick={() => setSelectedVoucher(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center pb-4 border-b border-slate-100">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#075BEA] bg-blue-50 px-2.5 py-0.5 rounded-full">
                OFFICIAL E-VOUCHER AFFI CAR RENT
              </span>
              <h3 className="text-xl font-black text-[#071B49] mt-1">{selectedVoucher.bookingCode}</h3>
              <p className="text-xs text-slate-400">Diterbitkan pada {selectedVoucher.createdAt}</p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Nama Penyewa</span>
                <span className="font-bold text-slate-800">{selectedVoucher.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kendaraan</span>
                <span className="font-bold text-slate-800">{selectedVoucher.carName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Periode Sewa</span>
                <span className="font-bold text-slate-800">{selectedVoucher.startDate} s/d {selectedVoucher.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lokasi Penjemputan</span>
                <span className="font-bold text-slate-800">{selectedVoucher.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status Pembayaran</span>
                <span className="font-black text-emerald-600">{selectedVoucher.paymentStatus}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-800">Total Biaya</span>
                <span className="text-base font-black text-[#075BEA]">{formatRupiah(selectedVoucher.totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#075BEA] text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
