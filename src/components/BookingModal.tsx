import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Tag,
  Shield,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Download,
  Check
} from 'lucide-react';
import { Car, Booking, DriverOption, BookingAddOns, Promotion } from '../types';
import { StorageService, formatRupiah } from '../services/storage';
import { CITIES_LOCATIONS } from '../data/mockData';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  initialLocation?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  car,
  onClose,
  onSuccess,
  initialStartDate,
  initialEndDate,
  initialLocation
}) => {
  if (!car) return null;

  const today = new Date();
  const defaultStart = initialStartDate || new Date(today.getTime() + 86400000).toISOString().split('T')[0];
  const defaultEnd = initialEndDate || new Date(today.getTime() + 86400000 * 4).toISOString().split('T')[0];

  // Wizard Steps: 1: Schedule & Addons -> 2: Renter Details -> 3: Payment & Summary -> 4: Success Ticket
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Dates & Location & Addons
  const [pickupLocation, setPickupLocation] = useState(initialLocation || CITIES_LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(initialLocation || CITIES_LOCATIONS[0]);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [driverOption, setDriverOption] = useState<DriverOption>('lepas-kunci');
  const [addOns, setAddOns] = useState<BookingAddOns>({
    insurance: true,
    childSeat: false,
    eTollCard: true
  });

  // Step 2: Renter info
  const currentUser = StorageService.getCurrentUser();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [ktp, setKtp] = useState(currentUser?.ktpNumber || '3171012345678901');
  const [sim, setSim] = useState(currentUser?.simNumber || '920112345678');
  const [notes, setNotes] = useState('');

  // Step 3: Promo & Payment
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS Instant Transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Calculate Duration
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const diffTime = endD.getTime() - startD.getTime();
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Calculate Cost
  const baseRentalSubtotal = car.pricePerDay * durationDays;
  const driverFeePerDay = driverOption === 'dengan-supir' ? 200000 : 0;
  const totalDriverFee = driverFeePerDay * durationDays;

  const insuranceFee = addOns.insurance ? 50000 * durationDays : 0;
  const childSeatFee = addOns.childSeat ? 30000 * durationDays : 0;
  const eTollFee = addOns.eTollCard ? 50000 : 0;
  const totalAddOnsFee = insuranceFee + childSeatFee + eTollFee;

  const grossTotal = baseRentalSubtotal + totalDriverFee + totalAddOnsFee;

  // Promo Calculation
  let discountAmount = 0;
  if (appliedPromo) {
    const rawDiscount = (grossTotal * appliedPromo.discountPercent) / 100;
    discountAmount = Math.min(rawDiscount, appliedPromo.maxDiscount);
  }

  const finalTotal = Math.max(0, grossTotal - discountAmount);

  // Apply Promo
  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) {
      setPromoError('Masukkan kode promo terlebih dahulu');
      return;
    }
    const promos = StorageService.getPromotions();
    const found = promos.find(p => p.code === code && p.isActive);
    if (!found) {
      setPromoError('Kode promo tidak valid atau telah kadaluarsa');
      return;
    }
    if (found.categoryTarget && found.categoryTarget !== car.category && !car.isEv) {
      setPromoError(`Promo ini khusus armada ${found.categoryTarget}`);
      return;
    }
    if (grossTotal < found.minSpend) {
      setPromoError(`Minimal transaksi untuk promo ini adalah ${formatRupiah(found.minSpend)}`);
      return;
    }

    setAppliedPromo(found);
  };

  // Date validation
  const isDateInvalid = endD <= startD;

  const handleNextToRenter = () => {
    if (isDateInvalid) return;
    setStep(2);
  };

  const handleNextToPayment = () => {
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setStep(3);
  };

  const handleConfirmBooking = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = StorageService.addBooking({
        carId: car.id,
        carName: car.name,
        carImage: car.image,
        carPrice: car.pricePerDay,
        carCategory: car.category,
        userId: currentUser?.id || 'guest-user',
        userName: name,
        userEmail: email,
        userPhone: phone,
        userKtp: ktp,
        userSim: sim,
        pickupLocation,
        returnLocation,
        startDate,
        endDate,
        durationDays,
        driverOption,
        driverFee: totalDriverFee,
        addOns,
        addOnsFee: totalAddOnsFee,
        subtotal: baseRentalSubtotal,
        promoCodeApplied: appliedPromo?.code,
        promoDiscount: discountAmount,
        totalAmount: finalTotal,
        paymentMethod,
        paymentStatus: paymentMethod.includes('QRIS') ? 'Lunas' : 'Menunggu Verifikasi',
        rentalStatus: 'Dikonfirmasi',
        notes
      });

      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setStep(4);
      onSuccess(newBooking);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-700 to-[#075BEA] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                Langkah {step} dari 4
              </span>
              <span className="text-xs text-blue-100 font-medium">{car.name}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              {step === 1 && 'Jadwal & Pilihan Layanan'}
              {step === 2 && 'Data Diri Penyewa'}
              {step === 3 && 'Pembayaran & Ringkasan Biaya'}
              {step === 4 && 'Konfirmasi Reservasi Berhasil!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          <div
            className="bg-[#075BEA] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: DATES, LOCATION & ADD-ONS */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Car Banner Summary */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-16 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-extrabold text-sm text-[#071B49]">{car.name}</h4>
                  <p className="text-xs text-slate-500">{car.category} • {car.fuelType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#075BEA]">{formatRupiah(car.pricePerDay)}</p>
                  <p className="text-[10px] text-slate-400">/hari</p>
                </div>
              </div>

              {/* Dates Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Tanggal & Jam Pengambilan</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Tanggal & Jam Pengembalian</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>

              {isDateInvalid && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Tanggal pengembalian harus setelah tanggal pengambilan.</span>
                </div>
              )}

              <div className="p-3 bg-blue-50/70 rounded-xl flex items-center justify-between text-xs font-bold text-[#071B49]">
                <span>Durasi Masa Sewa:</span>
                <span className="text-[#075BEA] text-sm">{durationDays} Hari ({durationDays * 24} Jam)</span>
              </div>

              {/* Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Lokasi Penjemputan</span>
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    {CITIES_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Lokasi Pengembalian</span>
                  </label>
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none"
                  >
                    {CITIES_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Driver Option */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Pilihan Pengemudi</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setDriverOption('lepas-kunci')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      driverOption === 'lepas-kunci'
                        ? 'border-[#075BEA] bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#071B49]">Lepas Kunci (Self Drive)</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Bebas kemudi sendiri</p>
                    <p className="text-xs font-extrabold text-emerald-600 mt-2">Gratis</p>
                  </div>

                  <div
                    onClick={() => setDriverOption('dengan-supir')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      driverOption === 'dengan-supir'
                        ? 'border-[#075BEA] bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="font-bold text-xs text-[#071B49]">Dengan Supir Profesional</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Santai & bebas lelah</p>
                    <p className="text-xs font-extrabold text-[#075BEA] mt-2">+Rp 200.000 /hari</p>
                  </div>
                </div>
              </div>

              {/* Extra Addons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Layanan Tambahan (Add-ons)</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.insurance}
                        onChange={(e) => setAddOns({ ...addOns, insurance: e.target.checked })}
                        className="rounded text-[#075BEA] focus:ring-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Asuransi Proteksi Penuh (All-Risk)</p>
                        <p className="text-[10px] text-slate-500">Kompensasi lecet & kecelakaan tanpa klaim rumit</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">+Rp 50.000/hari</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.eTollCard}
                        onChange={(e) => setAddOns({ ...addOns, eTollCard: e.target.checked })}
                        className="rounded text-[#075BEA] focus:ring-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Kartu e-Toll Mandiri / BCA (Saldo Rp 50.000)</p>
                        <p className="text-[10px] text-slate-500">Siap tap tol langsung tanpa perlu beli kartu baru</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">+Rp 50.000</span>
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.childSeat}
                        onChange={(e) => setAddOns({ ...addOns, childSeat: e.target.checked })}
                        className="rounded text-[#075BEA] focus:ring-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">Baby Car Seat (ISOFIX)</p>
                        <p className="text-[10px] text-slate-500">Standar keselamatan internasional untuk balita</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-700">+Rp 30.000/hari</span>
                  </label>
                </div>
              </div>

              {/* Continue to Step 2 */}
              <button
                disabled={isDateInvalid}
                onClick={handleNextToRenter}
                className="w-full py-3 px-4 rounded-xl bg-[#075BEA] text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Lanjut: Data Penyewa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: RENTER INFORMATION */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-[#071B49] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#075BEA] flex-shrink-0" />
                <span>Data identitas Anda dijaga kerahasiaannya dengan enkripsi end-to-end.</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#075BEA]" />
                  <span>Nama Lengkap Sesuai KTP *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Andi Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Nomor WhatsApp Aktif *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#075BEA]" />
                    <span>Alamat Email Aktif *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nomor NIK KTP</label>
                  <input
                    type="text"
                    placeholder="3171xxxxxxxxxxxx"
                    value={ktp}
                    onChange={(e) => setKtp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nomor SIM A</label>
                  <input
                    type="text"
                    placeholder="9201xxxxxxxx"
                    value={sim}
                    onChange={(e) => setSim(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Catatan Khusus (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Tolong serah terima di Pintu Keberangkatan Terminal 3, jam 10 pagi..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  disabled={!name.trim() || !phone.trim() || !email.trim()}
                  onClick={handleNextToPayment}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#075BEA] text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Lanjut: Pembayaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT & ORDER SUMMARY */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Promo Code Input */}
              <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                <label className="text-xs font-bold text-[#071B49] flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#075BEA]" />
                  <span>Punya Kode Promo / Voucher Diskon?</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Contoh: AFFIEV20 atau FIRSTRENT"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 uppercase focus:outline-none focus:border-[#075BEA]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#075BEA] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>

                {/* Quick click suggestions */}
                <div className="flex items-center gap-2 pt-1 text-[11px]">
                  <span className="text-slate-500">Pilihan:</span>
                  <button
                    onClick={() => {
                      setPromoCodeInput('AFFIEV20');
                    }}
                    className="text-[#075BEA] font-bold hover:underline"
                  >
                    AFFIEV20 (-20%)
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => {
                      setPromoCodeInput('FIRSTRENT');
                    }}
                    className="text-[#075BEA] font-bold hover:underline"
                  >
                    FIRSTRENT (-10%)
                  </button>
                </div>

                {appliedPromo && (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
                    <span>🎉 Berhasil! Diskon {appliedPromo.title} aktif</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs text-red-600 font-medium">{promoError}</p>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Pilih Metode Pembayaran</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'QRIS Instant Transfer', desc: 'Scan via GoPay, OVO, BCA Mobile, ShopeePay' },
                    { id: 'BCA Virtual Account', desc: 'Otomatis terverifikasi 24 Jam' },
                    { id: 'Mandiri Virtual Account', desc: 'Transfer melalui Livin / ATM' },
                    { id: 'Kartu Kredit / Debit Visa & MC', desc: 'Cicilan 0% hingga 12 bulan' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border-2 flex items-start gap-2.5 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#075BEA] bg-blue-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-0.5 text-[#075BEA]"
                      />
                      <div>
                        <p className="font-bold text-slate-800">{method.id}</p>
                        <p className="text-[10px] text-slate-500">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <h5 className="font-extrabold text-[#071B49] text-sm mb-2 border-b border-slate-200 pb-1">
                  Rincian Biaya Transparan
                </h5>

                <div className="flex justify-between text-slate-600">
                  <span>Sewa Mobil ({car.name} x {durationDays} hari)</span>
                  <span className="font-semibold text-slate-800">{formatRupiah(baseRentalSubtotal)}</span>
                </div>

                {totalDriverFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Layanan Supir Profesional ({durationDays} hari)</span>
                    <span className="font-semibold text-slate-800">{formatRupiah(totalDriverFee)}</span>
                  </div>
                )}

                {totalAddOnsFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Layanan Tambahan (Asuransi / Add-ons)</span>
                    <span className="font-semibold text-slate-800">{formatRupiah(totalAddOnsFee)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Potongan Kode Promo ({appliedPromo?.code})</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-slate-900 block">Total Pembayaran</span>
                    <span className="text-[10px] text-slate-400">Termasuk pajak dan layanan serah terima</span>
                  </div>
                  <span className="text-xl font-black text-[#075BEA]">{formatRupiah(finalTotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali</span>
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleConfirmBooking}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-[#075BEA] text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <span>Memproses Reservasi...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Konfirmasi & Bayar Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS TICKET / RECEIPT */}
          {step === 4 && createdBooking && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-md shadow-emerald-500/20 animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-[#075BEA] font-bold text-xs tracking-wider uppercase mb-2">
                  Booking ID: {createdBooking.bookingCode}
                </span>
                <h3 className="text-2xl font-black text-[#071B49]">
                  Reservasi Anda Telah Dikonfirmasi!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
                  E-Voucher dan instruksi penjemputan unit telah dikirimkan ke WhatsApp{' '}
                  <strong className="text-slate-800">{createdBooking.userPhone}</strong>.
                </p>
              </div>

              {/* Digital E-Ticket Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-left text-xs space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl" />

                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">UNIT KENDARAAN</p>
                    <p className="font-extrabold text-sm text-[#071B49]">{createdBooking.carName}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    Status: {createdBooking.rentalStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-400">PENGAMBILAN</p>
                    <p className="font-bold text-slate-800">{createdBooking.startDate}</p>
                    <p className="text-[10px] text-slate-500 truncate">{createdBooking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">PENGEMBALIAN</p>
                    <p className="font-bold text-slate-800">{createdBooking.endDate}</p>
                    <p className="text-[10px] text-slate-500 truncate">{createdBooking.returnLocation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <p className="text-[10px] text-slate-400">METODE PEMBAYARAN</p>
                    <p className="font-bold text-slate-800">{createdBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">TOTAL BAYAR</p>
                    <p className="font-black text-[#075BEA] text-sm">{formatRupiah(createdBooking.totalAmount)}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh / Cetak Bukti Sewa</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Selesai & Buka Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
