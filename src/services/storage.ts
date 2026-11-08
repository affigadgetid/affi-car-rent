import { Car, Booking, Promotion, User, Review } from '../types';
import { INITIAL_CARS, INITIAL_PROMOTIONS, INITIAL_BOOKINGS, DEMO_USERS, INITIAL_REVIEWS } from '../data/mockData';

const STORAGE_KEYS = {
  CARS: 'affi_cars_v1',
  BOOKINGS: 'affi_bookings_v1',
  PROMOTIONS: 'affi_promotions_v1',
  CURRENT_USER: 'affi_current_user_v1',
  REVIEWS: 'affi_reviews_v1'
};

// Event emitter for multi-component reactivity without full re-render overhead
type StorageListener = () => void;
const listeners: Set<StorageListener> = new Set();

export const subscribeStorage = (listener: StorageListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notifyListeners = () => {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.error('Storage listener error:', e);
    }
  });
};

export const StorageService = {
  // Cars CRUD
  getCars(): Car[] {
    const data = localStorage.getItem(STORAGE_KEYS.CARS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
      return INITIAL_CARS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CARS;
    }
  },

  getCarById(id: string): Car | undefined {
    return this.getCars().find(c => c.id === id);
  },

  saveCars(cars: Car[]): void {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    notifyListeners();
  },

  addCar(carData: Omit<Car, 'id'>): Car {
    const cars = this.getCars();
    const newCar: Car = {
      ...carData,
      id: `car-${Date.now()}`
    };
    cars.unshift(newCar);
    this.saveCars(cars);
    return newCar;
  },

  updateCar(id: string, updates: Partial<Car>): Car | null {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === id);
    if (index === -1) return null;
    cars[index] = { ...cars[index], ...updates };
    this.saveCars(cars);
    return cars[index];
  },

  deleteCar(id: string): boolean {
    const cars = this.getCars();
    const filtered = cars.filter(c => c.id !== id);
    if (filtered.length === cars.length) return false;
    this.saveCars(filtered);
    return true;
  },

  // Bookings CRUD
  getBookings(): Booking[] {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
      return INITIAL_BOOKINGS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  saveBookings(bookings: Booking[]): void {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    notifyListeners();
  },

  addBooking(bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingCode: `ACR-2026-${randSuffix}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  },

  updateBookingStatus(
    id: string,
    updates: { rentalStatus?: Booking['rentalStatus']; paymentStatus?: Booking['paymentStatus'] }
  ): Booking | null {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;
    bookings[index] = { ...bookings[index], ...updates };
    this.saveBookings(bookings);
    return bookings[index];
  },

  // Promotions
  getPromotions(): Promotion[] {
    const data = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
      return INITIAL_PROMOTIONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PROMOTIONS;
    }
  },

  savePromotions(promos: Promotion[]): void {
    localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promos));
    notifyListeners();
  },

  addPromotion(promo: Omit<Promotion, 'id'>): Promotion {
    const promos = this.getPromotions();
    const newPromo: Promotion = {
      ...promo,
      id: `promo-${Date.now()}`,
      code: promo.code.toUpperCase().trim()
    };
    promos.unshift(newPromo);
    this.savePromotions(promos);
    return newPromo;
  },

  togglePromotionStatus(id: string): void {
    const promos = this.getPromotions();
    const index = promos.findIndex(p => p.id === id);
    if (index !== -1) {
      promos[index].isActive = !promos[index].isActive;
      this.savePromotions(promos);
    }
  },

  deletePromotion(id: string): void {
    const promos = this.getPromotions();
    const filtered = promos.filter(p => p.id !== id);
    this.savePromotions(filtered);
  },

  // Auth / Users
  getCurrentUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) {
      // Default to customer demo user for immediate seamless experience
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
      return DEMO_USERS[0];
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEMO_USERS[0];
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
    notifyListeners();
  },

  updateUserProfile(updates: Partial<User>): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    this.setCurrentUser(updated);
    return updated;
  },

  // Reviews
  getReviews(): Review[] {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_REVIEWS;
    }
  },

  // Reset demo
  resetToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(INITIAL_PROMOTIONS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEMO_USERS[0]));
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    notifyListeners();
  }
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount).replace('Rp', 'Rp ');
};
