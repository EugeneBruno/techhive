const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Smartphones",
    price: 1500000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A premium titanium smartphone with a powerful processor, advanced cameras, and an exceptional display.",
  },

  {
    id: 2,
    name: "iPhone 15",
    category: "Smartphones",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A balanced iPhone with a bright display, strong performance, and a versatile dual-camera system.",
  },

  {
    id: 3,
    name: "iPhone 16",
    category: "Smartphones",
    price: 1650000,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A modern iPhone built for fast everyday performance, photography, communication, and entertainment.",
  },

  {
    id: 4,
    name: "iPhone 16 Pro",
    category: "Smartphones",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A professional smartphone with a premium build, advanced camera system, and high-performance hardware.",
  },

  {
    id: 5,
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    price: 1350000,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A flagship Android smartphone with a vibrant display, capable cameras, and fast performance.",
  },

  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    price: 1950000,
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A premium Galaxy smartphone featuring a large display, advanced cameras, and S Pen support.",
  },

  {
    id: 7,
    name: "Samsung Galaxy S23",
    category: "Smartphones",
    price: 1050000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A compact flagship smartphone with strong performance, an excellent display, and versatile cameras.",
  },

  {
    id: 8,
    name: "Google Pixel 8",
    category: "Smartphones",
    price: 950000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A clean Android smartphone with intelligent software features and a capable camera system.",
  },

  {
    id: 9,
    name: "Google Pixel 8 Pro",
    category: "Smartphones",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A premium Pixel phone combining advanced photography, smooth performance, and a refined display.",
  },

  {
    id: 10,
    name: "OnePlus 12",
    category: "Smartphones",
    price: 1100000,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A high-performance smartphone with fast charging, a smooth display, and powerful hardware.",
  },

  {
    id: 11,
    name: "OnePlus 12R",
    category: "Smartphones",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A performance-focused smartphone offering a smooth display and strong battery life.",
  },

  {
    id: 12,
    name: "Xiaomi 14",
    category: "Smartphones",
    price: 900000,
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A compact flagship smartphone with premium construction, fast performance, and advanced cameras.",
  },

  {
    id: 13,
    name: "Xiaomi 14 Ultra",
    category: "Smartphones",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A premium Xiaomi flagship designed around high-end photography and powerful performance.",
  },

  {
    id: 14,
    name: "Redmi Note 13 Pro",
    category: "Smartphones",
    price: 550000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A value-focused smartphone with a sharp display, capable cameras, and dependable battery life.",
  },

  {
    id: 15,
    name: "Nothing Phone 2",
    category: "Smartphones",
    price: 800000,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A distinctive smartphone with a clean interface, unique design, and smooth everyday performance.",
  },

  {
    id: 16,
    name: "Sony Xperia 1 V",
    category: "Smartphones",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A premium Sony smartphone designed for multimedia, photography, and creative users.",
  },

  {
    id: 17,
    name: "Motorola Edge 50 Pro",
    category: "Smartphones",
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A stylish Android smartphone with a smooth display, capable cameras, and fast charging.",
  },

  {
    id: 18,
    name: "Tecno Camon 30 Pro",
    category: "Smartphones",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A camera-focused smartphone offering strong everyday performance and a high-refresh-rate display.",
  },

  {
    id: 19,
    name: "Infinix Zero 40",
    category: "Smartphones",
    price: 430000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A stylish mid-range smartphone with a large display, capable cameras, and long battery life.",
  },

  {
    id: 20,
    name: "Samsung Galaxy A55",
    category: "Smartphones",
    price: 720000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A well-rounded Samsung smartphone with a premium-feeling design and dependable performance.",
  },

  {
    id: 21,
    name: "Samsung Galaxy A35",
    category: "Smartphones",
    price: 570000,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A practical Samsung smartphone with a bright display, reliable cameras, and strong battery life.",
  },

  {
    id: 22,
    name: "Google Pixel 7a",
    category: "Smartphones",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A compact Pixel smartphone offering excellent software and dependable camera performance.",
  },

  {
    id: 23,
    name: "Oppo Reno 12",
    category: "Smartphones",
    price: 600000,
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A slim smartphone designed for smooth everyday use, photography, and entertainment.",
  },

  {
    id: 24,
    name: "Vivo V30",
    category: "Smartphones",
    price: 610000,
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A stylish smartphone with a vibrant display, strong cameras, and reliable battery performance.",
  },

  {
    id: 25,
    name: "Honor 200",
    category: "Smartphones",
    price: 680000,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A modern Android smartphone with a bright display and photography-focused hardware.",
  },

  {
    id: 26,
    name: "Asus Zenfone 11 Ultra",
    category: "Smartphones",
    price: 1250000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A powerful Android phone with a large display, flagship hardware, and long battery life.",
  },

  {
    id: 27,
    name: "Nokia X30",
    category: "Smartphones",
    price: 420000,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A clean and durable Android smartphone designed for dependable everyday use.",
  },

  {
    id: 28,
    name: "MacBook Air M3",
    category: "Laptops",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A lightweight MacBook powered by the M3 chip, designed for work, study, and creative tasks.",
  },

  {
    id: 29,
    name: "MacBook Air M2",
    category: "Laptops",
    price: 1750000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A slim and efficient MacBook offering strong performance, excellent battery life, and a premium display.",
  },

  {
    id: 30,
    name: "MacBook Pro 14 M3",
    category: "Laptops",
    price: 3200000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A professional laptop with powerful Apple silicon performance and a high-quality display.",
  },

  {
    id: 31,
    name: "MacBook Pro 16 M3 Pro",
    category: "Laptops",
    price: 4800000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A high-performance professional laptop built for demanding creative and development workloads.",
  },

  {
    id: 32,
    name: "Dell XPS 13",
    category: "Laptops",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact premium Windows laptop with a sharp display and portable design.",
  },

  {
    id: 33,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 2600000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A powerful Windows laptop suitable for development, creative work, and productivity.",
  },

  {
    id: 34,
    name: "Dell Inspiron 15",
    category: "Laptops",
    price: 1050000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A practical everyday laptop for school, office work, browsing, and entertainment.",
  },

  {
    id: 35,
    name: "HP Spectre x360",
    category: "Laptops",
    price: 1900000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A premium convertible laptop combining a flexible design with strong productivity performance.",
  },

  {
    id: 36,
    name: "HP Pavilion 15",
    category: "Laptops",
    price: 950000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A versatile everyday laptop suitable for students, office work, and general computing.",
  },

  {
    id: 37,
    name: "HP Envy 14",
    category: "Laptops",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A premium compact laptop designed for productivity, portability, and creative tasks.",
  },

  {
    id: 38,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    price: 2100000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A business-focused laptop known for portability, productivity, and a professional design.",
  },

  {
    id: 39,
    name: "Lenovo IdeaPad Slim 5",
    category: "Laptops",
    price: 1050000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A practical slim laptop for students, office work, browsing, and everyday productivity.",
  },

  {
    id: 40,
    name: "Lenovo Legion 5",
    category: "Laptops",
    price: 2200000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A gaming and performance laptop with powerful hardware and a high-refresh-rate display.",
  },

  {
    id: 41,
    name: "Asus ROG Zephyrus G14",
    category: "Laptops",
    price: 2500000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact performance laptop designed for gaming, development, and demanding workloads.",
  },

  {
    id: 42,
    name: "Asus VivoBook 15",
    category: "Laptops",
    price: 900000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "An affordable everyday laptop with a comfortable design for work and study.",
  },

  {
    id: 43,
    name: "Acer Swift Go 14",
    category: "Laptops",
    price: 1150000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A lightweight laptop designed for mobile productivity, study, and everyday computing.",
  },

  {
    id: 44,
    name: "Acer Aspire 5",
    category: "Laptops",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A dependable everyday laptop for students, home users, and office productivity.",
  },

  {
    id: 45,
    name: "Microsoft Surface Laptop 5",
    category: "Laptops",
    price: 1750000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A premium Windows laptop with a clean design, sharp display, and strong productivity performance.",
  },

  {
    id: 46,
    name: "Microsoft Surface Pro 9",
    category: "Laptops",
    price: 1850000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A flexible 2-in-1 Windows device designed for portability, study, and professional work.",
  },

  {
    id: 47,
    name: "Razer Blade 15",
    category: "Laptops",
    price: 2900000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A premium performance laptop built for gaming, content creation, and demanding applications.",
  },

  {
    id: 48,
    name: "MSI Modern 14",
    category: "Laptops",
    price: 900000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A slim productivity laptop designed for students and everyday professional work.",
  },

  {
    id: 49,
    name: "MSI Katana 15",
    category: "Laptops",
    price: 1800000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A performance-focused gaming laptop with powerful hardware and a fast display.",
  },

  {
    id: 50,
    name: "Samsung Galaxy Book4",
    category: "Laptops",
    price: 1650000,
    image:
      "https://images.unsplash.com/photo-1504707748692-419802cf939d?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A slim Windows laptop designed for productivity, portability, and connected Samsung users.",
  },

  {
    id: 51,
    name: "LG Gram 16",
    category: "Laptops",
    price: 1900000,
    image:
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A lightweight large-screen laptop designed for mobile productivity and multitasking.",
  },

  {
    id: 52,
    name: "Huawei MateBook D16",
    category: "Laptops",
    price: 1200000,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A large-screen productivity laptop suitable for study, office work, and entertainment.",
  },

  {
    id: 53,
    name: "Framework Laptop 13",
    category: "Laptops",
    price: 1600000,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A modular laptop designed around repairability, customization, and long-term ownership.",
  },

  {
    id: 54,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 650000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Premium wireless headphones with advanced noise cancellation, rich sound, and all-day comfort.",
  },

  {
    id: 55,
    name: "Sony WH-1000XM4",
    category: "Audio",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Wireless noise-cancelling headphones designed for travel, work, and everyday listening.",
  },

  {
    id: 56,
    name: "Apple AirPods Pro 2",
    category: "Audio",
    price: 420000,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Premium wireless earbuds with active noise cancellation, transparency mode, and a compact charging case.",
  },

  {
    id: 57,
    name: "Apple AirPods 3",
    category: "Audio",
    price: 300000,
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Comfortable wireless earbuds with clear sound and seamless integration with Apple devices.",
  },

  {
    id: 58,
    name: "Apple AirPods Max",
    category: "Audio",
    price: 850000,
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Premium over-ear headphones combining immersive sound, active noise cancellation, and a distinctive design.",
  },

  {
    id: 59,
    name: "Samsung Galaxy Buds3 Pro",
    category: "Audio",
    price: 380000,
    image:
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Premium wireless earbuds designed for clear audio, noise cancellation, and Galaxy device integration.",
  },

  {
    id: 60,
    name: "Samsung Galaxy Buds2 Pro",
    category: "Audio",
    price: 300000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Compact premium earbuds with active noise cancellation and detailed sound.",
  },

  {
    id: 61,
    name: "Bose QuietComfort Ultra",
    category: "Audio",
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Premium noise-cancelling headphones designed for immersive listening and comfortable long sessions.",
  },

  {
    id: 62,
    name: "Bose QuietComfort 45",
    category: "Audio",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Comfort-focused wireless headphones with strong noise cancellation and dependable battery life.",
  },

  {
    id: 63,
    name: "JBL Live 660NC",
    category: "Audio",
    price: 280000,
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Wireless over-ear headphones with adaptive noise cancellation and powerful everyday sound.",
  },

  {
    id: 64,
    name: "JBL Tune 770NC",
    category: "Audio",
    price: 220000,
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Affordable wireless noise-cancelling headphones with long battery life and a comfortable fit.",
  },

  {
    id: 65,
    name: "JBL Flip 6",
    category: "Audio",
    price: 190000,
    image:
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Portable Bluetooth speaker delivering clear, powerful sound in a durable compact design.",
  },

  {
    id: 66,
    name: "JBL Charge 5",
    category: "Audio",
    price: 260000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Portable waterproof Bluetooth speaker with strong sound and extended battery life.",
  },

  {
    id: 67,
    name: "Bose SoundLink Flex",
    category: "Audio",
    price: 260000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Portable Bluetooth speaker designed for clear sound, durability, and outdoor listening.",
  },

  {
    id: 68,
    name: "Marshall Major V",
    category: "Audio",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Stylish wireless headphones combining classic Marshall design with modern Bluetooth audio.",
  },

  {
    id: 69,
    name: "Marshall Emberton II",
    category: "Audio",
    price: 330000,
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Compact portable speaker with distinctive styling, strong sound, and long battery life.",
  },

  {
    id: 70,
    name: "Anker Soundcore Space Q45",
    category: "Audio",
    price: 250000,
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Wireless headphones with adaptive noise cancellation, long battery life, and detailed sound.",
  },

  {
    id: 71,
    name: "Nothing Ear",
    category: "Audio",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "Distinctive wireless earbuds offering clear sound, noise cancellation, and a minimalist design.",
  },

  {
    id: 72,
    name: "Sennheiser Momentum 4",
    category: "Audio",
    price: 620000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Premium wireless headphones with detailed sound, adaptive noise cancellation, and excellent battery life.",
  },

  {
    id: 73,
    name: "Sennheiser HD 450BT",
    category: "Audio",
    price: 250000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "Wireless over-ear headphones with noise cancellation and a comfortable everyday design.",
  },

  {
    id: 74,
    name: "Beats Studio Pro",
    category: "Audio",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Wireless over-ear headphones designed for immersive listening, calls, and everyday use.",
  },

  {
    id: 75,
    name: "Beats Fit Pro",
    category: "Audio",
    price: 320000,
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "Secure-fitting wireless earbuds designed for workouts, active use, and everyday listening.",
  },

  {
    id: 76,
    name: "Skullcandy Crusher Evo",
    category: "Audio",
    price: 300000,
    image:
      "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "Wireless headphones featuring powerful bass and a comfortable over-ear design.",
  },

  {
    id: 77,
    name: "Audio-Technica ATH-M50x",
    category: "Audio",
    price: 280000,
    image:
      "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Professional-style wired headphones known for detailed monitoring and studio-oriented sound.",
  },

  {
    id: 78,
    name: "Logitech G Pro X 2 Lightspeed",
    category: "Audio",
    price: 520000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A wireless gaming headset designed for competitive gaming, communication, and long sessions.",
  },

  {
    id: 79,
    name: "SteelSeries Arctis Nova 7",
    category: "Audio",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "Versatile wireless gaming headphones with clear communication and multi-platform support.",
  },

  {
    id: 80,
    name: "Apple Watch Series 9",
    category: "Accessories",
    price: 750000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A smart watch designed for fitness tracking, notifications, communication, and everyday convenience.",
  },

  {
    id: 81,
    name: "Apple Watch SE",
    category: "Accessories",
    price: 500000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A practical Apple Watch offering essential fitness, safety, and smart features.",
  },

  {
    id: 82,
    name: "Samsung Galaxy Watch6",
    category: "Accessories",
    price: 480000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A versatile smartwatch with health tracking, notifications, and a bright display.",
  },

  {
    id: 83,
    name: "Samsung Galaxy Watch6 Classic",
    category: "Accessories",
    price: 600000,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A premium smartwatch with a classic-inspired design and advanced health and fitness features.",
  },

  {
    id: 84,
    name: "Garmin Venu 3",
    category: "Accessories",
    price: 700000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A fitness-focused smartwatch with health tracking, workout tools, and long battery life.",
  },

  {
    id: 85,
    name: "Anker 737 Power Bank",
    category: "Accessories",
    price: 220000,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A high-capacity portable charger designed for fast charging laptops, tablets, and smartphones.",
  },

  {
    id: 86,
    name: "Anker 20W USB-C Charger",
    category: "Accessories",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A compact fast charger for compatible smartphones, tablets, and other USB-C devices.",
  },

  {
    id: 87,
    name: "Anker 65W GaN Charger",
    category: "Accessories",
    price: 90000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact multi-device charger capable of powering laptops, phones, tablets, and accessories.",
  },

  {
    id: 88,
    name: "Apple MagSafe Charger",
    category: "Accessories",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A magnetic wireless charger designed for compatible Apple devices.",
  },

  {
    id: 89,
    name: "Apple MagSafe Battery Pack",
    category: "Accessories",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A compact magnetic battery accessory designed to provide additional power to compatible iPhones.",
  },

  {
    id: 90,
    name: "Samsung Wireless Charger Duo",
    category: "Accessories",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A convenient wireless charging station for compatible Samsung phones, watches, and earbuds.",
  },

  {
    id: 91,
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A premium wireless mouse designed for productivity, precision, and comfortable long-term use.",
  },

  {
    id: 92,
    name: "Logitech MX Anywhere 3S",
    category: "Accessories",
    price: 140000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact wireless productivity mouse designed for use across multiple surfaces and devices.",
  },

  {
    id: 93,
    name: "Logitech K380 Keyboard",
    category: "Accessories",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A compact Bluetooth keyboard designed for multi-device productivity.",
  },

  {
    id: 94,
    name: "Logitech MX Keys Mini",
    category: "Accessories",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact wireless keyboard with a clean layout designed for productivity.",
  },

  {
    id: 95,
    name: "Apple Magic Mouse",
    category: "Accessories",
    price: 140000,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A slim wireless mouse with a multi-touch surface designed for Mac users.",
  },

  {
    id: 96,
    name: "Apple Magic Keyboard",
    category: "Accessories",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A slim wireless keyboard designed for comfortable typing and Apple device integration.",
  },

  {
    id: 97,
    name: "Samsung T7 Portable SSD 1TB",
    category: "Accessories",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A compact external SSD providing fast portable storage for computers and mobile devices.",
  },

  {
    id: 98,
    name: "SanDisk Extreme Portable SSD 1TB",
    category: "Accessories",
    price: 190000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A durable portable SSD designed for fast file transfers, backups, and creative workflows.",
  },

  {
    id: 99,
    name: "Kingston DataTraveler 128GB",
    category: "Accessories",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A compact USB flash drive for convenient file storage and transfer.",
  },

  {
    id: 100,
    name: "Baseus USB-C Hub",
    category: "Accessories",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A multi-port USB-C hub that expands connectivity for compatible laptops and tablets.",
  },

  {
    id: 101,
    name: "Belkin 3-in-1 Wireless Charger",
    category: "Accessories",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A multi-device wireless charging station designed for compatible phones, watches, and earbuds.",
  },

  {
    id: 102,
    name: "UGREEN USB-C Cable",
    category: "Accessories",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    description:
      "A durable USB-C cable suitable for charging and data transfer with compatible devices.",
  },

  {
    id: 103,
    name: "UGREEN 100W GaN Charger",
    category: "Accessories",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1585386959984-a41552231693?auto=format&fit=crop&w=800&q=80",
    badge: "New",
    description:
      "A compact high-power charger designed for laptops, tablets, smartphones, and other USB-C devices.",
  },

  {
    id: 104,
    name: "ESR MagSafe Phone Stand",
    category: "Accessories",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80",
    badge: null,
    description:
      "A convenient magnetic phone stand designed for compatible smartphones and desk setups.",
  },

  {
    id: 105,
    name: "Spigen Phone Case",
    category: "Accessories",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    description:
      "A protective smartphone case designed to provide everyday protection while maintaining a slim profile.",
  },
];

export default products;