export type CarCategory = 'EV' | 'SUV' | 'MPV' | 'Sedan' | 'Premium' | 'Terbaru';

export type FuelType = 'Listrik (EV)' | 'Bensin' | 'Diesel' | 'Hybrid';

export type Transmission = 'Matic' | 'Manual';

export interface CarSpecs {
  rangeKm?: number;
  batteryKwh?: number;
  chargingTimeMin?: number;
  powerHp?: number;
  topSpeed?: number;
  luggageCapacity?: string;
  engineCc?: string;
  acceleration?: string; // e.g. "0-100 km/h: 7.2s"
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  category: CarCategory;
  year: number;
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  pricePerDay: number;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: CarSpecs;
  isFeatured?: boolean;
  isEv?: boolean;
  licensePlate?: string;
  location?: string;
}

export type DriverOption = 'lepas-kunci' | 'dengan-supir';

export interface BookingAddOns {
  insurance: boolean;
  childSeat: boolean;
  eTollCard: boolean;
}

export type PaymentStatus = 'Belum Dibayar' | 'Lunas' | 'Menunggu Verifikasi';

export type RentalStatus = 'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Sedang Berjalan' | 'Selesai' | 'Dibatalkan';

export interface Booking {
  id: string;
  bookingCode: string;
  carId: string;
  carName: string;
  carImage: string;
  carPrice: number;
  carCategory: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userKtp?: string;
  userSim?: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  driverOption: DriverOption;
  driverFee: number;
  addOns: BookingAddOns;
  addOnsFee: number;
  subtotal: number;
  promoCodeApplied?: string;
  promoDiscount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  rentalStatus: RentalStatus;
  createdAt: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  avatar: string;
  ktpNumber?: string;
  simNumber?: string;
  joinedDate: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  discountPercent: number;
  maxDiscount: number;
  minSpend: number;
  validUntil: string;
  categoryTarget?: string;
  isActive: boolean;
  description: string;
}

export interface Review {
  id: string;
  carId: string;
  carName: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}
