import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingSearchWidget } from './components/BookingSearchWidget';
import { CategorySection } from './components/CategorySection';
import { FeaturedCarsSection } from './components/FeaturedCarsSection';
import { EvSpecialSection } from './components/EvSpecialSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorksAndReviews } from './components/HowItWorksAndReviews';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { VideoModal } from './components/VideoModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { StorageService, subscribeStorage } from './services/storage';
import { Car, Booking, CarCategory, User } from './types';

export default function App() {
  // Global State
  const [cars, setCars] = useState<Car[]>(() => StorageService.getCars());
  const [bookings, setBookings] = useState<Booking[]>(() => StorageService.getBookings());
  const [promotions, setPromotions] = useState(() => StorageService.getPromotions());
  const [reviews, setReviews] = useState(() => StorageService.getReviews());
  const [currentUser, setCurrentUser] = useState<User | null>(() => StorageService.getCurrentUser());

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'ev' | 'dashboard' | 'admin' | 'about' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CarCategory | 'All'>('All');

  // Modal States
  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<Car | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Search parameters from Hero widget
  const [searchParams, setSearchParams] = useState<{
    location: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Subscribe to storage changes
  useEffect(() => {
    const unsubscribe = subscribeStorage(() => {
      setCars(StorageService.getCars());
      setBookings(StorageService.getBookings());
      setPromotions(StorageService.getPromotions());
      setCurrentUser(StorageService.getCurrentUser());
      setReviews(StorageService.getReviews());
    });
    return () => unsubscribe();
  }, []);

  // Quick Action Handlers
  const handleStartRent = () => {
    // Open first featured car or scroll to choices
    const targetCar = cars.find(c => c.isAvailable) || cars[0];
    if (targetCar) {
      setSelectedCarForBooking(targetCar);
    }
  };

  const handleSearchSubmit = (params: {
    location: string;
    startDate: string;
    endDate: string;
    category: CarCategory | 'All';
  }) => {
    setSearchParams({
      location: params.location,
      startDate: params.startDate,
      endDate: params.endDate
    });
    setSelectedCategory(params.category);
    // Smooth scroll to featured cars section
    const el = document.getElementById('mobil-pilihan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Mencari mobil di ${params.location.split('-')[0]}...`, 'info');
  };

  const handleBookingSuccess = (booking: Booking) => {
    showToast(`🎉 Reservasi berhasil dikonfirmasi! Kode Booking: ${booking.bookingCode}`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-[#071B49] selection:bg-[#075BEA] selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[#071B49] text-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-400/30 flex items-center gap-3 text-xs sm:text-sm font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Conditional Header: standard Navbar except in Admin dashboard */}
      {currentView !== 'admin' && (
        <Navbar
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={() => {
            StorageService.setCurrentUser(null);
            showToast('Anda telah berhasil keluar (logout)', 'info');
          }}
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentView={currentView}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenQuickBooking={handleStartRent}
        />
      )}

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME LANDING PAGE */}
        {currentView === 'home' && (
          <>
            <Hero
              onPesanSekarang={handleStartRent}
              onExploreCars={() => {
                const el = document.getElementById('mobil-pilihan');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenVideo={() => setIsVideoModalOpen(true)}
              onExploreEv={() => {
                setCurrentView('ev');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <BookingSearchWidget
              onSearch={handleSearchSubmit}
              defaultCategory={selectedCategory}
            />

            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                const el = document.getElementById('mobil-pilihan');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <FeaturedCarsSection
              cars={cars}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              onSelectCar={(car) => setSelectedCarForDetail(car)}
              onBookCar={(car) => setSelectedCarForBooking(car)}
            />

            <EvSpecialSection
              evCars={cars.filter(c => c.isEv || c.category === 'EV')}
              onSelectCar={(car) => setSelectedCarForDetail(car)}
              onBookCar={(car) => setSelectedCarForBooking(car)}
            />

            <WhyChooseUs
              onPromoClick={handleStartRent}
            />

            <HowItWorksAndReviews
              reviews={reviews}
              onStartRent={handleStartRent}
            />
          </>
        )}

        {/* VIEW 2: EXPLORE CARS (CATALOG) */}
        {currentView === 'catalog' && (
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#075BEA] bg-blue-50 px-3 py-1 rounded-full">
                  Katalog Lengkap
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071B49] mt-2">
                  Temukan Kendaraan Sempurna untuk Setiap Perjalanan
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilih dari {cars.length} unit mobil terawat mulai dari city car irit, MPV keluarga lapang, SUV tangguh, hingga mobil listrik (EV) masa depan.
                </p>
              </div>
            </div>

            <FeaturedCarsSection
              cars={cars}
              selectedCategory={selectedCategory}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              onSelectCar={(car) => setSelectedCarForDetail(car)}
              onBookCar={(car) => setSelectedCarForBooking(car)}
            />

            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />
          </div>
        )}

        {/* VIEW 3: DEDICATED EV SECTION */}
        {currentView === 'ev' && (
          <div className="py-2">
            <EvSpecialSection
              evCars={cars.filter(c => c.isEv || c.category === 'EV')}
              onSelectCar={(car) => setSelectedCarForDetail(car)}
              onBookCar={(car) => setSelectedCarForBooking(car)}
            />

            <div className="py-10">
              <FeaturedCarsSection
                cars={cars.filter(c => c.isEv || c.category === 'EV')}
                selectedCategory="EV"
                onCategoryChange={() => {}}
                onSelectCar={(car) => setSelectedCarForDetail(car)}
                onBookCar={(car) => setSelectedCarForBooking(car)}
              />
            </div>
          </div>
        )}

        {/* VIEW 4: USER DASHBOARD */}
        {currentView === 'dashboard' && currentUser && (
          <UserDashboard
            currentUser={currentUser}
            bookings={bookings}
            onOpenBooking={handleStartRent}
            onExploreCars={() => setCurrentView('catalog')}
          />
        )}

        {/* VIEW 5: ADMIN FLEET MANAGEMENT */}
        {currentView === 'admin' && (
          <AdminDashboard
            cars={cars}
            bookings={bookings}
            promotions={promotions}
            currentUser={currentUser || {
              id: 'admin',
              name: 'Fleet Manager',
              email: 'admin@afficarrent.id',
              phone: '081198765432',
              role: 'admin',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
              joinedDate: 'Oktober 2023'
            }}
            onExitAdmin={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 6: ABOUT US */}
        {currentView === 'about' && (
          <AboutSection
            onBackToHome={() => setCurrentView('home')}
            onExploreCars={() => setCurrentView('catalog')}
          />
        )}

        {/* VIEW 7: CONTACT US */}
        {currentView === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer (when not in full admin mode) */}
      {currentView !== 'admin' && (
        <Footer
          onNavigate={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* MODAL 1: CAR DETAIL VIEW */}
      <CarDetailModal
        car={selectedCarForDetail}
        onClose={() => setSelectedCarForDetail(null)}
        onBookNow={(car) => {
          setSelectedCarForDetail(null);
          setSelectedCarForBooking(car);
        }}
      />

      {/* MODAL 2: INTERACTIVE BOOKING WIZARD */}
      <BookingModal
        car={selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
        onSuccess={handleBookingSuccess}
        initialStartDate={searchParams?.startDate}
        initialEndDate={searchParams?.endDate}
        initialLocation={searchParams?.location}
      />

      {/* MODAL 3: AUTHENTICATION (LOGIN / REGISTER) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Selamat datang kembali, ${user.name}!`);
        }}
      />

      {/* MODAL 4: CINEMATIC SHOWCASE VIDEO */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onRentNow={() => {
          setIsVideoModalOpen(false);
          handleStartRent();
        }}
      />
    </div>
  );
}
