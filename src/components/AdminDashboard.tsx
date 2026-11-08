import React, { useState } from 'react';
import {
  LayoutDashboard,
  Car as CarIcon,
  CalendarCheck,
  Users,
  Tag,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Clock,
  Zap,
  Check,
  X,
  RefreshCw,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Car, Booking, Promotion, User, CarCategory, FuelType, Transmission } from '../types';
import { StorageService, formatRupiah } from '../services/storage';

interface AdminDashboardProps {
  cars: Car[];
  bookings: Booking[];
  promotions: Promotion[];
  currentUser: User;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  bookings,
  promotions,
  currentUser,
  onExitAdmin
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'cars' | 'bookings' | 'promos' | 'customers' | 'reports'>('overview');

  // Car Management States
  const [carSearch, setCarSearch] = useState('');
  const [isCarModalOpen, setIsCarModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // New/Edit Car Form
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('Toyota');
  const [formCategory, setFormCategory] = useState<CarCategory>('SUV');
  const [formPrice, setFormPrice] = useState('1000000');
  const [formSeats, setFormSeats] = useState('5');
  const [formTrans, setFormTrans] = useState<Transmission>('Matic');
  const [formFuel, setFormFuel] = useState<FuelType>('Listrik (EV)');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80');
  const [formRange, setFormRange] = useState('450');
  const [formBattery, setFormBattery] = useState('65');
  const [formPower, setFormPower] = useState('200');
  const [formDesc, setFormDesc] = useState('');

  // Booking Management Filter
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'confirmed' | 'active' | 'completed'>('all');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<Booking | null>(null);

  // Promo Management States
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoTitle, setNewPromoTitle] = useState('');
  const [newPromoPercent, setNewPromoPercent] = useState('15');
  const [newPromoMax, setNewPromoMax] = useState('250000');
  const [newPromoMin, setNewPromoMin] = useState('500000');

  // Statistics Calculation
  const totalVehicles = cars.length;
  const totalBookingsCount = bookings.length;
  const pendingBookings = bookings.filter(b => b.rentalStatus === 'Menunggu Konfirmasi');
  const activeRentals = bookings.filter(b => b.rentalStatus === 'Sedang Berjalan' || b.rentalStatus === 'Dikonfirmasi');
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'Lunas')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  // Open Edit Car
  const handleOpenEditCar = (car: Car) => {
    setEditingCar(car);
    setFormName(car.name);
    setFormBrand(car.brand);
    setFormCategory(car.category);
    setFormPrice(car.pricePerDay.toString());
    setFormSeats(car.seats.toString());
    setFormTrans(car.transmission);
    setFormFuel(car.fuelType);
    setFormImage(car.image);
    setFormRange(car.specs.rangeKm ? car.specs.rangeKm.toString() : '');
    setFormBattery(car.specs.batteryKwh ? car.specs.batteryKwh.toString() : '');
    setFormPower(car.specs.powerHp ? car.specs.powerHp.toString() : '150');
    setFormDesc(car.description);
    setIsCarModalOpen(true);
  };

  // Open Add Car
  const handleOpenAddCar = () => {
    setEditingCar(null);
    setFormName('');
    setFormBrand('Toyota');
    setFormCategory('SUV');
    setFormPrice('850000');
    setFormSeats('5');
    setFormTrans('Matic');
    setFormFuel('Listrik (EV)');
    setFormImage('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80');
    setFormRange('480');
    setFormBattery('60');
    setFormPower('180');
    setFormDesc('Armada prima dengan servis teratur.');
    setIsCarModalOpen(true);
  };

  // Save Car
  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    const isEv = formFuel === 'Listrik (EV)' || formCategory === 'EV';

    if (editingCar) {
      StorageService.updateCar(editingCar.id, {
        name: formName,
        brand: formBrand,
        category: formCategory,
        pricePerDay: Number(formPrice),
        seats: Number(formSeats),
        transmission: formTrans,
        fuelType: formFuel,
        image: formImage,
        isEv,
        description: formDesc,
        specs: {
          ...editingCar.specs,
          rangeKm: isEv ? Number(formRange) : undefined,
          batteryKwh: isEv ? Number(formBattery) : undefined,
          powerHp: Number(formPower)
        }
      });
    } else {
      StorageService.addCar({
        name: formName,
        brand: formBrand,
        category: formCategory,
        year: 2024,
        seats: Number(formSeats),
        transmission: formTrans,
        fuelType: formFuel,
        pricePerDay: Number(formPrice),
        isAvailable: true,
        rating: 5.0,
        reviewCount: 1,
        image: formImage,
        gallery: [formImage],
        description: formDesc,
        features: ['AC Dingin Sejuk', 'Audio Bluetooth', 'Asuransi', 'Servis Resmi Berkala'],
        specs: {
          rangeKm: isEv ? Number(formRange) : undefined,
          batteryKwh: isEv ? Number(formBattery) : undefined,
          powerHp: Number(formPower)
        },
        isFeatured: false,
        isEv
      });
    }
    setIsCarModalOpen(false);
  };

  // Delete Car
  const handleDeleteCar = (id: string, name: string) => {
    if (confirm(`Hapus mobil ${name} dari daftar armada?`)) {
      StorageService.deleteCar(id);
    }
  };

  // Toggle Car Availability
  const handleToggleCarAvailability = (car: Car) => {
    StorageService.updateCar(car.id, { isAvailable: !car.isAvailable });
  };

  // Update Booking Status
  const handleUpdateBookingStatus = (
    bookingId: string,
    rentalStatus?: Booking['rentalStatus'],
    paymentStatus?: Booking['paymentStatus']
  ) => {
    StorageService.updateBookingStatus(bookingId, { rentalStatus, paymentStatus });
    if (selectedBookingDetail && selectedBookingDetail.id === bookingId) {
      setSelectedBookingDetail((prev) => prev ? {
        ...prev,
        rentalStatus: rentalStatus || prev.rentalStatus,
        paymentStatus: paymentStatus || prev.paymentStatus
      } : null);
    }
  };

  // Create Promo
  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    StorageService.addPromotion({
      code: newPromoCode.trim().toUpperCase(),
      title: newPromoTitle.trim() || `Diskon ${newPromoPercent}%`,
      discountPercent: Number(newPromoPercent),
      maxDiscount: Number(newPromoMax),
      minSpend: Number(newPromoMin),
      validUntil: '2026-12-31',
      isActive: true,
      description: 'Potongan harga spesial rental Affi Car Rent.'
    });

    setIsPromoModalOpen(false);
    setNewPromoCode('');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-16">
      {/* Top Admin Header Bar */}
      <div className="bg-[#071B49] text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-sky-400 flex items-center justify-center font-black">
            ⚙️
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              <span>Affi Fleet Management System</span>
              <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded font-mono uppercase">v2.6 PRO</span>
            </h1>
            <p className="text-xs text-blue-200">Panel Kendali Rental Mobil & Kendaraan Listrik</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (confirm('Kembalikan semua data demo awal (reset armada & booking)?')) {
                StorageService.resetToDefault();
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors cursor-pointer text-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data Demo</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="px-4 py-2 rounded-xl bg-[#075BEA] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Buka Tampilan Pengguna</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Admin Sidebar Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200/80 p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'overview'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Dashboard</span>
            </button>

            <button
              onClick={() => setActiveSection('cars')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'cars'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <CarIcon className="w-4 h-4" />
                <span>Manajemen Mobil (CRUD)</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeSection === 'cars' ? 'bg-white/20' : 'bg-slate-100 text-slate-700'}`}>
                {cars.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'bookings'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Data Reservasi / Booking</span>
              </div>
              {pendingBookings.length > 0 && (
                <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full">
                  {pendingBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveSection('promos')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'promos'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Voucher & Promo</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeSection === 'promos' ? 'bg-white/20' : 'bg-slate-100 text-slate-700'}`}>
                {promotions.length}
              </span>
            </button>

            <button
              onClick={() => setActiveSection('customers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'customers'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Data Pelanggan</span>
            </button>

            <button
              onClick={() => setActiveSection('reports')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeSection === 'reports'
                  ? 'bg-[#075BEA] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Laporan & Pendapatan</span>
            </button>
          </div>

          {/* Admin Main Content (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6">
            {/* SECTION 1: OVERVIEW */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* 6 Metric Cards from Master Prompt */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Total Kendaraan</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">{totalVehicles} Unit</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Tersedia {cars.filter(c => c.isAvailable).length} Unit</span>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Total Booking</p>
                    <p className="text-2xl font-black text-[#075BEA] mt-1">{totalBookingsCount} Transaksi</p>
                    <span className="text-[10px] text-slate-500 font-semibold">Semua Periode</span>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Menunggu Konfirmasi</p>
                    <p className="text-2xl font-black text-amber-500 mt-1">{pendingBookings.length} Pesanan</p>
                    <span className="text-[10px] text-amber-600 font-semibold">Perlu Tindakan Cepat</span>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Booking Aktif / Jalan</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">{activeRentals.length} Armada</p>
                    <span className="text-[10px] text-slate-500 font-semibold">Sedang di Pelanggan</span>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Total Pelanggan</p>
                    <p className="text-2xl font-black text-slate-800 mt-1">428 User</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">+18% Bulan Ini</span>
                  </div>

                  <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Total Pendapatan</p>
                    <p className="text-xl sm:text-2xl font-black text-[#071B49] mt-1">{formatRupiah(totalRevenue)}</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">Pembayaran Terverifikasi</span>
                  </div>
                </div>

                {/* Revenue & Booking Trends Visual Chart */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-[#071B49]">Grafik Booking & Pendapatan Bulanan</h3>
                      <p className="text-xs text-slate-500">Performa transaksi armada Affi Car Rent semester terakhir</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                      Tumbuh +24.5% YoY
                    </span>
                  </div>

                  {/* Simulated Clean Chart Bars */}
                  <div className="grid grid-cols-6 gap-3 items-end h-40 pt-4">
                    {[
                      { month: 'Jun', bookings: 42, rev: 'Rp 68 Jt', h: '60%' },
                      { month: 'Jul', bookings: 58, rev: 'Rp 89 Jt', h: '75%' },
                      { month: 'Agt', bookings: 51, rev: 'Rp 78 Jt', h: '68%' },
                      { month: 'Sep', bookings: 64, rev: 'Rp 96 Jt', h: '82%' },
                      { month: 'Okt', bookings: 78, rev: 'Rp 118 Jt', h: '92%' },
                      { month: 'Nov', bookings: 86, rev: 'Rp 134 Jt', h: '100%' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-[#075BEA] hidden sm:block">{item.rev}</span>
                        <div className="w-full max-w-[42px] bg-slate-100 rounded-xl overflow-hidden h-28 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-[#071B49] to-[#075BEA] rounded-xl transition-all duration-500"
                            style={{ height: item.h }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Bookings Queue */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-base text-[#071B49]">Reservasi Terbaru Masuk</h3>
                    <button
                      onClick={() => setActiveSection('bookings')}
                      className="text-xs font-bold text-[#075BEA] hover:underline"
                    >
                      Kelola Semua Booking ➔
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((bk) => (
                      <div
                        key={bk.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img src={bk.carImage} alt={bk.carName} className="w-14 h-11 rounded-xl object-cover" />
                          <div>
                            <p className="font-extrabold text-xs text-slate-900">{bk.bookingCode} • {bk.carName}</p>
                            <p className="text-[11px] text-slate-500">Penyewa: <strong className="text-slate-700">{bk.userName}</strong> ({bk.userPhone})</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-black text-xs text-[#075BEA] block">{formatRupiah(bk.totalAmount)}</span>
                            <span className="text-[10px] font-bold text-slate-600">{bk.paymentStatus}</span>
                          </div>

                          <div className="flex gap-1.5">
                            {bk.rentalStatus === 'Menunggu Konfirmasi' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(bk.id, 'Dikonfirmasi', 'Lunas')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs"
                              >
                                Konfirmasi
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedBookingDetail(bk);
                                setActiveSection('bookings');
                              }}
                              className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
                            >
                              Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: CARS CRUD MANAGEMENT */}
            {activeSection === 'cars' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-lg text-[#071B49]">Manajemen Armada Mobil (CRUD)</h3>
                    <p className="text-xs text-slate-500">Kelola unit, harga harian, spesifikasi EV, dan status ketersediaan</p>
                  </div>

                  <button
                    onClick={handleOpenAddCar}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#075BEA] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mobil Baru</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari armada berdasarkan nama atau kategori..."
                    value={carSearch}
                    onChange={(e) => setCarSearch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                {/* Cars Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-3">Armada Mobil</th>
                        <th className="py-3 px-3">Kategori</th>
                        <th className="py-3 px-3">Bahan Bakar</th>
                        <th className="py-3 px-3">Tarif / Hari</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cars
                        .filter(c => c.name.toLowerCase().includes(carSearch.toLowerCase()) || c.category.toLowerCase().includes(carSearch.toLowerCase()))
                        .map((car) => (
                          <tr key={car.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <img src={car.image} alt={car.name} className="w-14 h-10 rounded-xl object-cover bg-slate-100" />
                                <div>
                                  <p className="font-extrabold text-slate-900">{car.name}</p>
                                  <p className="text-[10px] text-slate-400">{car.brand} • {car.year} • {car.seats} Seats</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-700">{car.category}</span>
                            </td>
                            <td className="py-3 px-3">
                              {car.isEv ? (
                                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                  <Zap className="w-3 h-3 fill-current" />
                                  <span>EV ({car.specs.rangeKm}km)</span>
                                </span>
                              ) : (
                                <span className="text-slate-600">{car.fuelType}</span>
                              )}
                            </td>
                            <td className="py-3 px-3 font-extrabold text-[#075BEA]">
                              {formatRupiah(car.pricePerDay)}
                            </td>
                            <td className="py-3 px-3">
                              <button
                                onClick={() => handleToggleCarAvailability(car)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                                  car.isAvailable
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                }`}
                              >
                                {car.isAvailable ? '● Tersedia' : '○ Tersewa / Booked'}
                              </button>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditCar(car)}
                                  className="p-1.5 rounded-lg text-slate-600 hover:text-[#075BEA] hover:bg-blue-50"
                                  title="Edit Mobil"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCar(car.id, car.name)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                                  title="Hapus Mobil"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECTION 3: BOOKINGS MANAGEMENT */}
            {activeSection === 'bookings' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-lg text-[#071B49]">Manajemen Reservasi & Booking</h3>
                    <p className="text-xs text-slate-500">Konfirmasi booking penyewa, atur status rental, dan monitor pembayaran</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {(['all', 'pending', 'confirmed', 'active', 'completed'] as const).map((filterKey) => (
                      <button
                        key={filterKey}
                        onClick={() => setBookingFilter(filterKey)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          bookingFilter === filterKey
                            ? 'bg-[#075BEA] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {filterKey === 'all' && 'Semua'}
                        {filterKey === 'pending' && 'Menunggu'}
                        {filterKey === 'confirmed' && 'Dikonfirmasi'}
                        {filterKey === 'active' && 'Berjalan'}
                        {filterKey === 'completed' && 'Selesai'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bookings List */}
                <div className="space-y-3">
                  {bookings
                    .filter((bk) => {
                      if (bookingFilter === 'pending') return bk.rentalStatus === 'Menunggu Konfirmasi';
                      if (bookingFilter === 'confirmed') return bk.rentalStatus === 'Dikonfirmasi';
                      if (bookingFilter === 'active') return bk.rentalStatus === 'Sedang Berjalan';
                      if (bookingFilter === 'completed') return bk.rentalStatus === 'Selesai';
                      return true;
                    })
                    .map((bk) => (
                      <div
                        key={bk.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img src={bk.carImage} alt={bk.carName} className="w-20 h-16 rounded-xl object-cover" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xs text-[#075BEA] bg-blue-50 px-2 py-0.5 rounded">
                                {bk.bookingCode}
                              </span>
                              <span className="text-xs font-bold text-slate-800">{bk.carName}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1">
                              Penyewa: <strong className="text-slate-900">{bk.userName}</strong> • {bk.userPhone}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Jadwal: {bk.startDate} s/d {bk.endDate} ({bk.durationDays} Hari) • {bk.pickupLocation}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <div className="text-right sm:text-right">
                            <p className="font-black text-sm text-[#075BEA]">{formatRupiah(bk.totalAmount)}</p>
                            <span className="text-[11px] font-bold text-slate-600 block">
                              Bayar: {bk.paymentStatus}
                            </span>
                            <span className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              bk.rentalStatus === 'Dikonfirmasi'
                                ? 'bg-emerald-100 text-emerald-800'
                                : bk.rentalStatus === 'Menunggu Konfirmasi'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {bk.rentalStatus}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-wrap">
                            {bk.rentalStatus === 'Menunggu Konfirmasi' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(bk.id, 'Dikonfirmasi', 'Lunas')}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-2xs"
                              >
                                Setujui
                              </button>
                            )}

                            {bk.rentalStatus === 'Dikonfirmasi' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(bk.id, 'Sedang Berjalan')}
                                className="px-3 py-1.5 bg-[#075BEA] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs"
                              >
                                Mulai Sewa
                              </button>
                            )}

                            {bk.rentalStatus === 'Sedang Berjalan' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(bk.id, 'Selesai')}
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-2xs"
                              >
                                Selesaikan
                              </button>
                            )}

                            {bk.rentalStatus !== 'Dibatalkan' && bk.rentalStatus !== 'Selesai' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(bk.id, 'Dibatalkan')}
                                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl"
                              >
                                Tolak
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* SECTION 4: PROMOTIONS */}
            {activeSection === 'promos' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-[#071B49]">Manajemen Kupon & Promo</h3>
                    <p className="text-xs text-slate-500">Buat kode diskon baru untuk menarik lebih banyak penyewa</p>
                  </div>

                  <button
                    onClick={() => setIsPromoModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#075BEA] text-white font-bold text-xs shadow-xs hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Buat Promo Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {promotions.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono font-black text-sm text-[#075BEA] bg-blue-100 px-2.5 py-1 rounded-lg">
                            {p.code}
                          </span>
                          <button
                            onClick={() => StorageService.togglePromotionStatus(p.id)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {p.isActive ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </div>
                        <h4 className="font-bold text-xs text-slate-800">{p.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{p.description}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Diskon {p.discountPercent}%</span>
                        <button
                          onClick={() => StorageService.deletePromotion(p.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: CUSTOMERS DATA */}
            {activeSection === 'customers' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-[#071B49]">Data Pelanggan Terdaftar</h3>
                    <p className="text-xs text-slate-500">Daftar pengguna dan riwayat transaksi rental</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Data</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {[
                    { name: 'Andi Pratama', email: 'andi@example.com', phone: '081234567890', rentals: 3, totalSpend: 'Rp 6.800.000' },
                    { name: 'Rina Sugiarto', email: 'rina.s@example.com', phone: '081387654321', rentals: 2, totalSpend: 'Rp 3.450.000' },
                    { name: 'Hendro Kusuma', email: 'hendro.k@example.com', phone: '081298887776', rentals: 4, totalSpend: 'Rp 9.200.000' },
                    { name: 'Maya Santoso', email: 'maya.s@example.com', phone: '081190001122', rentals: 1, totalSpend: 'Rp 2.200.000' }
                  ].map((cust, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{cust.name}</p>
                        <p className="text-slate-500">{cust.email} • {cust.phone}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-[#075BEA] block">{cust.totalSpend}</span>
                        <span className="text-[10px] text-slate-400">{cust.rentals} Kali Sewa</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 6: REPORTS */}
            {activeSection === 'reports' && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-[#071B49]">Laporan Keuangan & Operasional Fleet</h3>
                    <p className="text-xs text-slate-500">Laporan transaksi bersih dan utilisasi armada sewa</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#075BEA] text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Export / Cetak Laporan</span>
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Periode Laporan</span>
                    <span>Bulan Berjalan (November 2026)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Gross Booking Value</span>
                    <span className="font-black text-slate-900">{formatRupiah(totalRevenue + 12500000)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Total Potongan Promo & Diskon</span>
                    <span className="text-red-600 font-bold">-Rp 2.450.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Biaya Bahan Bakar & Perawatan Rutin</span>
                    <span className="text-slate-600">-Rp 3.800.000</span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-black text-[#071B49]">
                    <span>Net Profit Operasional</span>
                    <span className="text-[#075BEA]">{formatRupiah(totalRevenue + 6250000)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: ADD / EDIT CAR */}
      {isCarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 text-left my-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-black text-lg text-[#071B49]">
                {editingCar ? 'Edit Data Mobil' : 'Tambah Mobil Baru ke Armada'}
              </h3>
              <button
                onClick={() => setIsCarModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Mobil *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Hyundai IONIQ 6"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Brand / Merk</label>
                  <input
                    type="text"
                    required
                    placeholder="Toyota / BYD / Hyundai"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CarCategory)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="EV">Electric Vehicle (EV)</option>
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tarif Sewa / Hari (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kapasitas Kursi</label>
                  <input
                    type="number"
                    value={formSeats}
                    onChange={(e) => setFormSeats(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#075BEA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Transmisi</label>
                  <select
                    value={formTrans}
                    onChange={(e) => setFormTrans(e.target.value as Transmission)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="Matic">Matic (Otomatis)</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jenis Bahan Bakar</label>
                  <select
                    value={formFuel}
                    onChange={(e) => setFormFuel(e.target.value as FuelType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                  >
                    <option value="Listrik (EV)">Listrik (EV)</option>
                    <option value="Bensin">Bensin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">URL Gambar Mobil</label>
                <input
                  type="url"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              {(formFuel === 'Listrik (EV)' || formCategory === 'EV') && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="space-y-1">
                    <label className="font-bold text-emerald-900">Jarak Tempuh (KM)</label>
                    <input
                      type="number"
                      value={formRange}
                      onChange={(e) => setFormRange(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-emerald-900">Baterai (kWh)</label>
                    <input
                      type="number"
                      value={formBattery}
                      onChange={(e) => setFormBattery(e.target.value)}
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-1.5 font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCarModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#075BEA] text-white font-bold hover:bg-blue-700 shadow-xs"
                >
                  {editingCar ? 'Simpan Perubahan' : 'Tambahkan ke Armada'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PROMO */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full p-6 text-left">
            <h3 className="font-black text-lg text-[#071B49] mb-3">Buat Kupon Promo Baru</h3>
            <form onSubmit={handleCreatePromo} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700">Kode Promo (KAPITAL) *</label>
                <input
                  type="text"
                  required
                  placeholder="LIBURAN25"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold uppercase focus:outline-none focus:border-[#075BEA]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">Judul Promo</label>
                <input
                  type="text"
                  placeholder="Diskon Akhir Tahun"
                  value={newPromoTitle}
                  onChange={(e) => setNewPromoTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700">Diskon (%)</label>
                  <input
                    type="number"
                    value={newPromoPercent}
                    onChange={(e) => setNewPromoPercent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Maks. Potongan (Rp)</label>
                  <input
                    type="number"
                    value={newPromoMax}
                    onChange={(e) => setNewPromoMax(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#075BEA] text-white font-bold hover:bg-blue-700"
                >
                  Simpan Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
