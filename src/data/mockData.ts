import { Car, Promotion, Review, User, Booking } from '../types';

export const INITIAL_CARS: Car[] = [
  {
    id: 'car-bz4x',
    name: 'Toyota bZ4X',
    brand: 'Toyota',
    category: 'EV',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 1200000,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'SUV Listrik murni pertama dari Toyota dengan platform e-TNGA. Menawarkan kabin hening, panoramic roof, sistem keselamatan Toyota Safety Sense 3.0, dan kenyamanan berkendara kelas atas.',
    features: [
      'Toyota Safety Sense 3.0',
      'Panoramic Roof Mewah',
      'Wireless Apple CarPlay & Android Auto',
      'JBL 9-Speaker Audio System',
      'Fast Charging CCS2 Supported',
      'Kamera 360 Derajat 3D'
    ],
    specs: {
      rangeKm: 500,
      batteryKwh: 71.4,
      chargingTimeMin: 30,
      powerHp: 204,
      topSpeed: 160,
      luggageCapacity: '452 Liter',
      acceleration: '0-100 km/h: 7.5s'
    },
    isFeatured: true,
    isEv: true,
    licensePlate: 'B 1234 EVX',
    location: 'Jakarta & Bandara Soekarno-Hatta'
  },
  {
    id: 'car-atto3',
    name: 'BYD Atto 3',
    brand: 'BYD',
    category: 'EV',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 1100000,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'SUV listrik cerdas bertenaga Blade Battery ultra-aman. Desain interior bernuansa gym sporty dengan layar infotainment rotatable 15.6 inci yang memukau.',
    features: [
      'BYD Blade Battery Ultra Safe',
      'Layar Putar Elektrik 15.6"',
      'Sistem Audio Dirac HD 8-Speaker',
      'Adaptive Cruise Control',
      'Vehicle-to-Load (V2L) Power Outlet',
      'Sunroof Elektrik dengan Sunshade'
    ],
    specs: {
      rangeKm: 480,
      batteryKwh: 60.48,
      chargingTimeMin: 29,
      powerHp: 201,
      topSpeed: 160,
      luggageCapacity: '440 Liter',
      acceleration: '0-100 km/h: 7.3s'
    },
    isFeatured: true,
    isEv: true,
    licensePlate: 'B 2345 BYD',
    location: 'Jakarta, Bandung, Bali'
  },
  {
    id: 'car-avanza',
    name: 'Toyota All New Avanza',
    brand: 'Toyota',
    category: 'MPV',
    year: 2024,
    seats: 7,
    transmission: 'Matic',
    fuelType: 'Bensin',
    pricePerDay: 450000,
    isAvailable: true,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'MPV keluarga terfavorit di Indonesia dengan platform penggerak roda depan (FWD) modern, kabin lapang dengan sofa mode serbaguna, dan konsumsi bensin yang sangat irit.',
    features: [
      'Kabin 7-Penumpang dengan Long Sofa Mode',
      'AC Digital Double Blower Dingin Merata',
      'Head Unit 9 Inci dengan Smartphone Mirroring',
      'Hill Start Assist & Vehicle Stability Control',
      'Dual Airbags & ISOFIX Child Seat Anchor'
    ],
    specs: {
      engineCc: '1.496 cc Dual VVT-i',
      powerHp: 106,
      topSpeed: 170,
      luggageCapacity: '498 Liter',
      acceleration: 'Irit 17-19 km/liter'
    },
    isFeatured: true,
    isEv: false,
    licensePlate: 'B 4567 AVZ',
    location: 'Semua Cabang (Jakarta, Bali, Surabaya, Bandung)'
  },
  {
    id: 'car-civic-rs',
    name: 'Honda Civic RS',
    brand: 'Honda',
    category: 'Sedan',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Bensin',
    pricePerDay: 750000,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Sedan sport premium dengan DNA performa legendaris Honda. Dilengkapi mesin 1.5L VTEC Turbo bertenaga 178 PS, Honda SENSING canggih, dan interior berbalut suede merah sport.',
    features: [
      'Honda SENSING Komplit dengan Lane Keep Assist',
      'Mesin VTEC Turbo 178 PS Agresif & Halus',
      'Bose Premium Sound System 12 Speaker',
      'Speedometer Digital 10.2 Inci Full TFT',
      'Dual Exhaust Sport Tip & Velg 18 Inci Matte Black'
    ],
    specs: {
      engineCc: '1.498 cc DOHC VTEC Turbo',
      powerHp: 178,
      topSpeed: 215,
      luggageCapacity: '497 Liter',
      acceleration: '0-100 km/h: 8.1s'
    },
    isFeatured: true,
    isEv: false,
    licensePlate: 'B 7890 CVC',
    location: 'Jakarta & Surabaya'
  },
  {
    id: 'car-pajero',
    name: 'Mitsubishi Pajero Sport Dakar',
    brand: 'Mitsubishi',
    category: 'SUV',
    year: 2024,
    seats: 7,
    transmission: 'Matic',
    fuelType: 'Diesel',
    pricePerDay: 1000000,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Big SUV tangguh dengan ground clearance tinggi, mesin 2.4L MIVEC Turbo Diesel bertenaga besar, dan kenyamanan suspensi mewah untuk menjelajah segala medan jalan.',
    features: [
      'Mesin 4N15 2.4L MIVEC Diesel Turbo 181 PS',
      'Transmisi Otomatis 8-Speed dengan Paddle Shift',
      'Sunroof Elektrik & Multi Around View Monitor',
      'Forward Collision Mitigation (FCM) & BSW',
      'Kabin 7-Kursi Lapang dan Nyaman'
    ],
    specs: {
      engineCc: '2.442 cc MIVEC Turbo Diesel',
      powerHp: 181,
      topSpeed: 180,
      luggageCapacity: '673 Liter (Kursi 3 Terlipat)',
      acceleration: 'Torsi 430 Nm Perkasa'
    },
    isFeatured: true,
    isEv: false,
    licensePlate: 'B 9999 PJR',
    location: 'Jakarta, Bandung, Surabaya, Bali'
  },
  {
    id: 'car-ioniq5',
    name: 'Hyundai IONIQ 5',
    brand: 'Hyundai',
    category: 'EV',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 1250000,
    isAvailable: true,
    rating: 4.95,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Ikon mobil listrik masa depan dengan arsitektur 800V pengisian daya ultra-cepat. Dilengkapi fitur relaksasi kursi depan (Zero Gravity) dan teknologi Hyundai SmartSense.',
    features: [
      'Arsitektur 800V Ultra-Fast Charging (10-80% 18 Menit)',
      'Relaxation Comfort Seats dengan Ottoman',
      'Vehicle-to-Load (V2L) Indoor & Outdoor hingga 3.6 kW',
      'Smart Cruise Control dengan Stop & Go',
      'Vision Roof Luas dengan Nuansa Futuristik'
    ],
    specs: {
      rangeKm: 451,
      batteryKwh: 72.6,
      chargingTimeMin: 18,
      powerHp: 217,
      topSpeed: 185,
      luggageCapacity: '527 Liter',
      acceleration: '0-100 km/h: 7.4s'
    },
    isFeatured: true,
    isEv: true,
    licensePlate: 'B 5555 ION',
    location: 'Jakarta, Bali, Surabaya'
  },
  {
    id: 'car-model3',
    name: 'Tesla Model 3 Highland',
    brand: 'Tesla',
    category: 'EV',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 1850000,
    isAvailable: true,
    rating: 5.0,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Versi terbaru Tesla Model 3 Highland dengan peredaman suara akustik 360 derajat, layar sentuh penumpang belakang, pendingin kursi, dan autopilot tercanggih di dunia.',
    features: [
      'Autopilot Driver Assistance Tingkat Lanjut',
      'Layar Belakang 8 Inci untuk Hiburan Penumpang',
      'Interior Akustik Super Hening dengan Kaca Ganda',
      'Ventilated & Heated Premium Leather Seats',
      'Akselerasi Kilat Instan Motor Listrik'
    ],
    specs: {
      rangeKm: 629,
      batteryKwh: 78.0,
      chargingTimeMin: 25,
      powerHp: 283,
      topSpeed: 201,
      luggageCapacity: '594 Liter',
      acceleration: '0-100 km/h: 6.1s'
    },
    isFeatured: true,
    isEv: true,
    licensePlate: 'B 3333 TSL',
    location: 'Jakarta & Bali'
  },
  {
    id: 'car-zenix',
    name: 'Toyota Innova Zenix Hybrid Q',
    brand: 'Toyota',
    category: 'MPV',
    year: 2024,
    seats: 7,
    transmission: 'Matic',
    fuelType: 'Hybrid',
    pricePerDay: 700000,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Kijang Innova generasi modern dengan teknologi Hybrid EV generasi ke-5, Captain Seat elektrik dengan Ottoman, Panoramic Retractable Sunroof, dan efisiensi bahan bakar superior.',
    features: [
      'Captain Seat Baris ke-2 dengan Ottoman Elektrik',
      'Panoramic Retractable Sunroof dengan Illumination Light',
      'Toyota Safety Sense (TSS) 3.0',
      'Dual Screen Rear Seat Entertainment 10"',
      'Konsumsi Bahan Bakar Sangat Irit 1:21 km/L'
    ],
    specs: {
      engineCc: '1.987 cc TNGA M20A-FXS Hybrid',
      powerHp: 186,
      topSpeed: 180,
      luggageCapacity: '550 Liter',
      acceleration: '0-100 km/h: 9.3s'
    },
    isFeatured: true,
    isEv: false,
    licensePlate: 'B 7777 ZNX',
    location: 'Semua Cabang'
  },
  {
    id: 'car-alphard',
    name: 'Toyota All New Alphard HEV',
    brand: 'Toyota',
    category: 'Premium',
    year: 2024,
    seats: 7,
    transmission: 'Matic',
    fuelType: 'Hybrid',
    pricePerDay: 2800000,
    isAvailable: true,
    rating: 5.0,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Kemewahan tanpa kompromi untuk perjalanan VIP, eksekutif bisnis, dan keluarga terhormat. Dilengkapi kursi Executive Lounge, suspensi peredam getaran ultra-halus, dan privasi maksimal.',
    features: [
      'Executive Lounge Captain Seats dengan Pemanas & Pijat',
      'Super Long Overhead Console dengan Multi-Ambient Light',
      'JBL Cinema Surround Sound 15 Speaker',
      'Noise Cancelling Glass & Suasana Kabin Kelas Satu',
      'Power Step Otomatis untuk Kemudahan Keluar Masuk'
    ],
    specs: {
      engineCc: '2.494 cc Dual VVT-i Hybrid',
      powerHp: 250,
      topSpeed: 180,
      luggageCapacity: '610 Liter',
      acceleration: 'Kenyamanan Standar VIP'
    },
    isFeatured: false,
    isEv: false,
    licensePlate: 'B 1 VIP',
    location: 'Jakarta, Bali, Surabaya'
  },
  {
    id: 'car-binguo',
    name: 'Wuling BinguoEV Long Range',
    brand: 'Wuling',
    category: 'EV',
    year: 2024,
    seats: 4,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 500000,
    isAvailable: true,
    rating: 4.75,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Mobil listrik bergaya retro klasik yang sangat lincah untuk menyusuri jalanan kota Jakarta, Bandung, dan Bali. Praktis diparkir, bebas ganjil-genap, dan hemat biaya energi.',
    features: [
      'Desain Klasik Retro Berkelas & Imut',
      'Dual Screen 10.25 Inci dengan Kamera Parkir Mundur',
      'Fast Charging DC 35 Menit',
      'Bebas Aturan Ganjil Genap di Jakarta',
      'Kabin Luas dengan Deep Luggage Space'
    ],
    specs: {
      rangeKm: 410,
      batteryKwh: 37.9,
      chargingTimeMin: 35,
      powerHp: 68,
      topSpeed: 130,
      luggageCapacity: '310 Liter',
      acceleration: '0-50 km/h: 3.9s'
    },
    isFeatured: false,
    isEv: true,
    licensePlate: 'B 410 EV',
    location: 'Jakarta, Bandung, Bali'
  },
  {
    id: 'car-bmw-i4',
    name: 'BMW i4 eDrive40 Gran Coupe',
    brand: 'BMW',
    category: 'Premium',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Listrik (EV)',
    pricePerDay: 2500000,
    isAvailable: true,
    rating: 5.0,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Gran Coupe bertenaga listrik murni dengan handling legendaris BMW. Tampilan sporty menawan, layar BMW Curved Display iDrive 8.5, dan suara akselerasi gubahan komposer Hans Zimmer.',
    features: [
      'BMW Curved Display 14.9 Inci dengan OS 8.5',
      'Harman Kardon Surround Sound System',
      'BMW IconicSounds Electric rancangan Hans Zimmer',
      'Suspensi Udara Adaptif M Sport',
      'Jangkauan jelajah hingga 590 km per pengisian'
    ],
    specs: {
      rangeKm: 590,
      batteryKwh: 83.9,
      chargingTimeMin: 31,
      powerHp: 340,
      topSpeed: 190,
      luggageCapacity: '470 Liter',
      acceleration: '0-100 km/h: 5.7s'
    },
    isFeatured: false,
    isEv: true,
    licensePlate: 'B 40 BMW',
    location: 'Jakarta & Bali'
  },
  {
    id: 'car-creta',
    name: 'Hyundai Creta Prime IVT',
    brand: 'Hyundai',
    category: 'SUV',
    year: 2024,
    seats: 5,
    transmission: 'Matic',
    fuelType: 'Bensin',
    pricePerDay: 550000,
    isAvailable: true,
    rating: 4.85,
    reviewCount: 60,
    image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Compact SUV trendi dengan Panoramic Sunroof, BOSE Premium Audio 8 speaker, pendingin kursi depan, dan remote control melalui smartphone via Hyundai Bluelink.',
    features: [
      'Panoramic Sunroof Luas',
      'BOSE Premium Sound 8 Speaker',
      'Ventilated Seats Kursi Depan Dingin',
      'Hyundai SmartSense & Blind-Spot View',
      'Hyundai Bluelink Connected Car Services'
    ],
    specs: {
      engineCc: '1.497 cc Smartstream G1.5',
      powerHp: 115,
      topSpeed: 175,
      luggageCapacity: '416 Liter',
      acceleration: '0-100 km/h: 10.4s'
    },
    isFeatured: false,
    isEv: false,
    licensePlate: 'B 8899 CRT',
    location: 'Semua Cabang'
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    code: 'AFFIEV20',
    title: 'Diskon 20% Khusus Mobil Listrik (EV)',
    discountPercent: 20,
    maxDiscount: 350000,
    minSpend: 1000000,
    validUntil: '2026-12-31',
    categoryTarget: 'EV',
    isActive: true,
    description: 'Nikmati sensasi berkendara ramah lingkungan dengan diskon hingga Rp 350.000 untuk semua armada EV.'
  },
  {
    id: 'promo-2',
    code: 'FIRSTRENT',
    title: 'Diskon 10% Pengguna Pertama',
    discountPercent: 10,
    maxDiscount: 150000,
    minSpend: 400000,
    validUntil: '2026-12-31',
    isActive: true,
    description: 'Selamat datang di Affi Car Rent! Dapatkan potongan 10% untuk pesanan rental pertama Anda.'
  },
  {
    id: 'promo-3',
    code: 'WEEKENDDEAL',
    title: 'Hemat Akhir Pekan 15%',
    discountPercent: 15,
    maxDiscount: 250000,
    minSpend: 800000,
    validUntil: '2026-12-31',
    isActive: true,
    description: 'Liburan akhir pekan makin menyenangkan dengan diskon spesial sewa mobil keluarga.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    carId: 'car-bz4x',
    carName: 'Toyota bZ4X',
    userName: 'Andi Pratama',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Pelayanan sangat baik, mobilnya bersih dan prosesnya cepat. Sewa bZ4X untuk trip Jakarta-Bandung sangat nyaman dan hemat! Recommended!',
    date: '2 Hari lalu',
    location: 'Jakarta Selatan'
  },
  {
    id: 'rev-2',
    carId: 'car-atto3',
    carName: 'BYD Atto 3',
    userName: 'Maya Santoso',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Coba BYD Atto 3 di Bali untuk keliling pantai. Baterai awet banget, unit diantar tepat waktu di Bandara Ngurah Rai. Staf Affi sangat ramah.',
    date: '1 Minggu lalu',
    location: 'Denpasar, Bali'
  },
  {
    id: 'rev-3',
    carId: 'car-zenix',
    carName: 'Toyota Innova Zenix Hybrid',
    userName: 'Budi Wijaya',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Innova Zenix Hybrid luar biasa empuk dan senyap. Disewa dengan supir yang sangat profesional dan hafal rute wisata Jawa Timur.',
    date: '2 Minggu lalu',
    location: 'Surabaya'
  },
  {
    id: 'rev-4',
    carId: 'car-civic-rs',
    carName: 'Honda Civic RS',
    userName: 'Dion Kusuma',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Civic RS kondisi prima seperti mobil baru keluar dealer. Sound system Bose-nya mantap, handling sangat responsif.',
    date: '3 Minggu lalu',
    location: 'Jakarta Barat'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-customer-1',
    name: 'Andi Pratama',
    email: 'andi@example.com',
    phone: '081234567890',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    ktpNumber: '3171012345678901',
    simNumber: '920112345678',
    joinedDate: 'Januari 2024'
  },
  {
    id: 'user-admin-1',
    name: 'Fleet Manager Affi',
    email: 'admin@afficarrent.id',
    phone: '081198765432',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    joinedDate: 'Oktober 2023'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'ACR-2026-8901',
    carId: 'car-bz4x',
    carName: 'Toyota bZ4X',
    carImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
    carPrice: 1200000,
    carCategory: 'EV',
    userId: 'user-customer-1',
    userName: 'Andi Pratama',
    userEmail: 'andi@example.com',
    userPhone: '081234567890',
    userKtp: '3171012345678901',
    userSim: '920112345678',
    pickupLocation: 'Bandara Soekarno-Hatta (CGK), Jakarta',
    returnLocation: 'Bandara Soekarno-Hatta (CGK), Jakarta',
    startDate: '2026-11-12',
    endDate: '2026-11-15',
    durationDays: 3,
    driverOption: 'lepas-kunci',
    driverFee: 0,
    addOns: {
      insurance: true,
      childSeat: false,
      eTollCard: true
    },
    addOnsFee: 150000,
    subtotal: 3600000,
    promoCodeApplied: 'AFFIEV20',
    promoDiscount: 350000,
    totalAmount: 3400000,
    paymentMethod: 'QRIS Instant Transfer',
    paymentStatus: 'Lunas',
    rentalStatus: 'Dikonfirmasi',
    createdAt: '2026-11-08 09:15',
    notes: 'Mohon baterai diisi minimal 95% saat serah terima.'
  },
  {
    id: 'bk-102',
    bookingCode: 'ACR-2026-8902',
    carId: 'car-zenix',
    carName: 'Toyota Innova Zenix Hybrid Q',
    carImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80',
    carPrice: 700000,
    carCategory: 'MPV',
    userId: 'user-customer-2',
    userName: 'Rina Sugiarto',
    userEmail: 'rina.s@example.com',
    userPhone: '081387654321',
    pickupLocation: 'Bandara Ngurah Rai (DPS), Bali',
    returnLocation: 'Hotel Area Seminyak, Bali',
    startDate: '2026-11-18',
    endDate: '2026-11-20',
    durationDays: 2,
    driverOption: 'dengan-supir',
    driverFee: 400000,
    addOns: {
      insurance: true,
      childSeat: true,
      eTollCard: false
    },
    addOnsFee: 160000,
    subtotal: 1400000,
    promoDiscount: 0,
    totalAmount: 1960000,
    paymentMethod: 'BCA Virtual Account',
    paymentStatus: 'Menunggu Verifikasi',
    rentalStatus: 'Menunggu Konfirmasi',
    createdAt: '2026-11-08 11:30'
  },
  {
    id: 'bk-103',
    bookingCode: 'ACR-2026-8890',
    carId: 'car-pajero',
    carName: 'Mitsubishi Pajero Sport Dakar',
    carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80',
    carPrice: 1000000,
    carCategory: 'SUV',
    userId: 'user-customer-3',
    userName: 'Hendro Kusuma',
    userEmail: 'hendro.k@example.com',
    userPhone: '081298887776',
    pickupLocation: 'Kantor Cabang Affi, Surabaya',
    returnLocation: 'Kantor Cabang Affi, Surabaya',
    startDate: '2026-11-01',
    endDate: '2026-11-04',
    durationDays: 3,
    driverOption: 'lepas-kunci',
    driverFee: 0,
    addOns: {
      insurance: true,
      childSeat: false,
      eTollCard: true
    },
    addOnsFee: 150000,
    subtotal: 3000000,
    promoDiscount: 0,
    totalAmount: 3150000,
    paymentMethod: 'Mandiri Virtual Account',
    paymentStatus: 'Lunas',
    rentalStatus: 'Selesai',
    createdAt: '2026-10-28 14:00'
  }
];

export const CITIES_LOCATIONS = [
  'Bandara Soekarno-Hatta (CGK), Jakarta',
  'Bandara Halim Perdanakusuma (HLP), Jakarta',
  'Jakarta Pusat - Sudirman / Thamrin',
  'Jakarta Selatan - Pondok Indah / Senopati',
  'Bandara Ngurah Rai (DPS), Bali',
  'Kuta / Seminyak / Canggu, Bali',
  'Bandara Juanda (SUB), Surabaya',
  'Surabaya Pusat - Gubeng / Tunjungan',
  'Bandung - Pasteur / Dago',
  'Bandara Kualanamu (KNO), Medan',
  'Yogyakarta - Bandara YIA / Malioboro'
];
