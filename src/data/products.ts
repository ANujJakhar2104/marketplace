import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'apple-iphone-15',
    brand: 'Apple Premium Reseller',
    name: 'iPhone 15',
    categoryId: 'electronics',
    icon: { family: 'ionicons', name: 'phone-portrait-outline' },
    rating: 4.7,
    reviewCount: 2318,
    variantAttribute: 'Storage',
    description:
      'A14 Bionic-class performance, Dynamic Island and a 48MP main camera in Apple\u2019s all-glass and aluminium design.',
    highlights: [
      '6.1" Super Retina XDR display',
      '48MP main camera with 2x optical zoom',
      'USB-C, up to 20 hours video playback',
      '1 year Apple India warranty',
    ],
    variants: [
      { id: 'iphone-128', label: '128 GB', price: 69900, mrp: 74900, inStock: true },
      { id: 'iphone-256', label: '256 GB', price: 79900, mrp: 84900, inStock: true },
      { id: 'iphone-512', label: '512 GB', price: 99900, mrp: 104900, inStock: false },
    ],
  },
  {
    id: 'apple-macbook-air-m2',
    brand: 'Apple Premium Reseller',
    name: 'MacBook Air M2',
    categoryId: 'electronics',
    icon: { family: 'ionicons', name: 'laptop-outline' },
    rating: 4.8,
    reviewCount: 1142,
    variantAttribute: 'Storage',
    description:
      'The Apple M2 chip in a fanless design that stays silent and cool, with up to 18 hours of battery life.',
    highlights: [
      '13.6" Liquid Retina display',
      'M2 chip with 8-core CPU / 8-core GPU',
      '1080p FaceTime HD camera',
      'Up to 18 hours battery life',
    ],
    variants: [
      { id: 'mba-256', label: '256 GB', price: 114900, mrp: 119900, inStock: true },
      { id: 'mba-512', label: '512 GB', price: 134900, mrp: 139900, inStock: true },
    ],
  },
  {
    id: 'royal-enfield-classic-350',
    brand: 'Royal Enfield',
    name: 'Classic 350',
    categoryId: 'mobility',
    icon: { family: 'material-community', name: 'motorbike' },
    rating: 4.5,
    reviewCount: 864,
    variantAttribute: 'Colour',
    description:
      'The definitive retro motorcycle, now with the J-series platform for a smoother, more refined ride.',
    highlights: [
      '349cc single-cylinder, air/oil cooled engine',
      '20.2 bhp @ 6100 rpm',
      'Dual-channel ABS standard',
      'On-road price, ex-showroom Delhi',
    ],
    variants: [
      { id: 'classic-stealth-black', label: 'Stealth Black', price: 205000, mrp: 205000, inStock: true },
      { id: 'classic-chrome-bronze', label: 'Chrome Bronze', price: 218000, mrp: 218000, inStock: true },
      { id: 'classic-teal', label: 'Teal', price: 212000, mrp: 212000, inStock: true },
    ],
  },
  {
    id: 'giva-silver-necklace',
    brand: 'Giva',
    name: 'Sterling Silver Solitaire Necklace',
    categoryId: 'jewellery',
    icon: { family: 'material-community', name: 'necklace' },
    rating: 4.6,
    reviewCount: 3021,
    variantAttribute: 'Size',
    description:
      '92.5 sterling silver necklace with a lab-grown solitaire, BIS hallmarked and rhodium plated for daily wear.',
    highlights: [
      '925 sterling silver, BIS hallmarked',
      'Rhodium plated \u2014 tarnish resistant',
      'Certificate of authenticity included',
      'Free 30-day exchange',
    ],
    variants: [
      { id: 'giva-16in', label: '16 inch', price: 4499, mrp: 5999, inStock: true },
      { id: 'giva-18in', label: '18 inch', price: 4799, mrp: 6299, inStock: true },
    ],
  },
  {
    id: 'helios-chronograph',
    brand: 'Helios',
    name: 'Chronograph Watch',
    categoryId: 'watches',
    icon: { family: 'ionicons', name: 'watch-outline' },
    rating: 4.4,
    reviewCount: 512,
    variantAttribute: 'Strap',
    description:
      'A multifunction chronograph with a sapphire-coated crystal and 100m water resistance for everyday wear.',
    highlights: [
      'Japanese quartz chronograph movement',
      'Sapphire-coated mineral crystal',
      '100m water resistance',
      '2 year international warranty',
    ],
    variants: [
      { id: 'helios-leather', label: 'Leather Strap', price: 8995, mrp: 12995, inStock: true },
      { id: 'helios-steel', label: 'Steel Bracelet', price: 10995, mrp: 14995, inStock: true },
    ],
  },
  {
    id: 'air-india-flight-voucher',
    brand: 'Air India',
    name: 'Domestic Flight Voucher',
    categoryId: 'travel',
    icon: { family: 'ionicons', name: 'airplane-outline' },
    rating: 4.2,
    reviewCount: 233,
    variantAttribute: 'Cabin Class',
    description:
      'A prepaid flight voucher redeemable across Air India\u2019s domestic network for 12 months from purchase.',
    highlights: [
      'Valid on all domestic Air India routes',
      '12 months validity from date of purchase',
      'One free date change included',
      'Redeemable in parts across bookings',
    ],
    variants: [
      { id: 'ai-economy', label: 'Economy', price: 15000, mrp: 15000, inStock: true },
      { id: 'ai-premium-economy', label: 'Premium Economy', price: 25000, mrp: 25000, inStock: true },
      { id: 'ai-business', label: 'Business', price: 45000, mrp: 45000, inStock: true },
    ],
  },
  {
    id: 'goibibo-hotel-package',
    brand: 'Goibibo',
    name: 'Hotel Getaway Package',
    categoryId: 'travel',
    icon: { family: 'ionicons', name: 'bed-outline' },
    rating: 4.3,
    reviewCount: 671,
    variantAttribute: 'Package Tier',
    description:
      'A curated 3-night hotel package across Goibibo\u2019s partner properties, bookable any time within a year.',
    highlights: [
      '3 nights across 4\u2013star partner hotels',
      'Free cancellation up to 48 hours prior',
      'Breakfast included on select properties',
      '12 months validity',
    ],
    variants: [
      { id: 'goibibo-classic', label: 'Classic', price: 18000, mrp: 21000, inStock: true },
      { id: 'goibibo-premium', label: 'Premium', price: 32000, mrp: 37000, inStock: true },
    ],
  },
  {
    id: 'samsung-crystal-4k-tv',
    brand: 'Samsung',
    name: 'Crystal 4K Smart TV 55"',
    categoryId: 'appliances',
    icon: { family: 'ionicons', name: 'tv-outline' },
    rating: 4.5,
    reviewCount: 1904,
    variantAttribute: 'Screen Size',
    description:
      'Crystal Processor 4K upscaling with a wide colour gamut, built-in Alexa and a slim, bezel-less design.',
    highlights: [
      '4K UHD Crystal display with HDR',
      'Built-in Alexa & Bixby voice control',
      '3 HDMI, 1 USB, dual-band Wi-Fi',
      '1 year comprehensive warranty',
    ],
    variants: [
      { id: 'tv-50', label: '50 inch', price: 42990, mrp: 54990, inStock: true },
      { id: 'tv-55', label: '55 inch', price: 47990, mrp: 61990, inStock: true },
      { id: 'tv-65', label: '65 inch', price: 68990, mrp: 84990, inStock: true },
    ],
  },
  {
    id: 'lg-double-door-fridge',
    brand: 'LG',
    name: 'Double Door Refrigerator',
    categoryId: 'appliances',
    icon: { family: 'material-community', name: 'fridge-outline' },
    rating: 4.6,
    reviewCount: 2287,
    variantAttribute: 'Capacity',
    description:
      'Convertible, frost-free double door refrigerator with a 10-year compressor warranty and smart inverter cooling.',
    highlights: [
      'Smart inverter compressor, 10 year warranty',
      'Convertible fridge \u2014 6 modes',
      'Door cooling+ for even temperature',
      'Energy rating: 3 star',
    ],
    variants: [
      { id: 'fridge-260l', label: '260 L', price: 27990, mrp: 33990, inStock: true },
      { id: 'fridge-340l', label: '340 L', price: 33990, mrp: 40990, inStock: true },
      { id: 'fridge-420l', label: '420 L', price: 41990, mrp: 49990, inStock: false },
    ],
  },
];

export const productById = (id: string): Product | undefined =>
  products.find((product) => product.id === id);
