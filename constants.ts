import { Category, Product, Order } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'tea', 
    name: 'Herbal Teas', 
    icon: 'Leaf', 
    color: 'bg-green-100 text-green-700',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 'supplements', 
    name: 'Supplements & Vitamins', 
    icon: 'Pill', 
    color: 'bg-blue-100 text-blue-700',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'cosmetics', 
    name: 'Natural Cosmetics', 
    icon: 'Sparkles', 
    color: 'bg-pink-100 text-pink-700',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'food', 
    name: 'Super Foods', 
    icon: 'Apple', 
    color: 'bg-orange-100 text-orange-700',
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80'
  }
];

export const PRODUCTS: Product[] = [
  // --- TEAS ---
  {
    id: 'tea-1',
    name: 'Organic Chamomile Whole Flower',
    description: 'Premium whole flower chamomile for deep relaxation and digestive calm.',
    price: 7.50,
    category: 'tea',
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Sleep aid', 'Digestive health', 'Calming'],
    ingredients: '100% Organic Matricaria chamomilla flowers'
  },
  {
    id: 'tea-2',
    name: 'Sleepy Time Valerian Blend',
    description: 'A potent nighttime blend featuring Valerian root, Lemon Balm, and Lavender.',
    price: 8.00,
    category: 'tea',
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Deep sleep', 'Anxiety relief', 'Muscle relaxation'],
    ingredients: 'Valerian Root, Lemon Balm, Lavender, Passionflower'
  },
  {
    id: 'tea-3',
    name: 'Japanese Ceremonial Matcha',
    description: 'First harvest stone-ground green tea powder rich in antioxidants.',
    price: 8.00,
    category: 'tea',
    rating: 5.0,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Energy boost', 'Focus', 'Metabolism support'],
    ingredients: '100% Organic Green Tea Powder'
  },
  {
    id: 'tea-6',
    name: 'Hibiscus Rose Glow Tea',
    description: 'Vitamin C rich blend that supports skin health from within.',
    price: 6.95,
    category: 'tea',
    rating: 4.7,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Skin health', 'Antioxidant', 'Hydration'],
    ingredients: 'Hibiscus petals, Rosehips, Rose petals'
  },

  // --- SUPPLEMENTS ---
  {
    id: 'supp-2',
    name: 'Vitamin D3 + K2 Liquid',
    description: 'High potency drops for bone health and immune system support.',
    price: 18.50,
    category: 'supplements',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&w=800&q=80',
    isOrganic: false,
    benefits: ['Bone health', 'Immunity', 'Mood support'],
    ingredients: 'Vitamin D3 (Lichen), Vitamin K2 (MK-7)'
  },
  {
    id: 'supp-3',
    name: 'Magnesium Glycinate',
    description: 'Highly bioavailable magnesium for sleep and muscle recovery.',
    price: 22.00,
    category: 'supplements',
    rating: 4.7,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80',
    isOrganic: false,
    benefits: ['Sleep', 'Muscle recovery', 'Nervous system'],
    ingredients: 'Magnesium Bisglycinate Chelate'
  },
  {
    id: 'supp-4',
    name: 'Lion\'s Mane Capsules',
    description: 'Nootropic mushroom extract for memory, focus, and clarity.',
    price: 29.99,
    category: 'supplements',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Brain function', 'Focus', 'Nerve support'],
    ingredients: 'Organic Lion\'s Mane Fruit Body'
  },
  {
    id: 'supp-5',
    name: 'Wild Caught Fish Oil',
    description: 'High EPA/DHA Omega-3s for heart and brain health.',
    price: 26.50,
    category: 'supplements',
    rating: 4.6,
    reviews: 201,
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80',
    isOrganic: false,
    benefits: ['Heart health', 'Brain health', 'Joint mobility'],
    ingredients: 'Purified Deep Sea Fish Oil'
  },

  // --- COSMETICS ---
  {
    id: 'cos-1',
    name: 'Rosehip Seed Oil',
    description: 'Cold-pressed regenerative oil for scars, fine lines, and sun damage.',
    price: 19.50,
    category: 'cosmetics',
    rating: 4.8,
    reviews: 140,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Anti-aging', 'Scar fading', 'Hydration'],
    ingredients: '100% Organic Rosa Canina Seed Oil'
  },
  {
    id: 'cos-2',
    name: 'Lavender Facial Mist',
    description: 'Hydrating toner water distilled from fresh lavender flowers.',
    price: 16.00,
    category: 'cosmetics',
    rating: 4.6,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1600054800747-be294a6a0d26?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Toning', 'Soothing', 'Refreshing'],
    ingredients: 'Lavandula Angustifolia Distillate'
  },
  {
    id: 'cos-4',
    name: 'Charcoal Detox Mask',
    description: 'Activated charcoal mask to draw out impurities and minimize pores.',
    price: 22.50,
    category: 'cosmetics',
    rating: 4.5,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=800&q=80',
    isOrganic: false,
    benefits: ['Detoxifying', 'Pore cleansing', 'Oil control'],
    ingredients: 'Activated Charcoal, Kaolin Clay'
  },
  {
    id: 'cos-6',
    name: 'Coffee Eye Serum',
    description: 'Caffeine-infused oil roller to reduce puffiness and dark circles.',
    price: 21.00,
    category: 'cosmetics',
    rating: 4.7,
    reviews: 125,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Depuffing', 'Brightening', 'Firming'],
    ingredients: 'Coffee Bean Oil, Almond Oil'
  },

  // --- SUPER FOODS ---
  {
    id: 'food-1',
    name: 'Artisanal Raw A2 Milk',
    description: 'Fresh, unprocessed A2 milk from pasture-raised heritage cows. Rich in enzymes.',
    price: 12.00,
    category: 'food',
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Digestive health', 'Probiotic', 'Calcium'],
    ingredients: '100% Raw Whole A2 Milk'
  },
  {
    id: 'food-2',
    name: 'Wildflower Raw Honey',
    description: 'Unfiltered, unpasteurized honey straight from the hive. Loaded with local pollen.',
    price: 18.50,
    category: 'food',
    rating: 5.0,
    reviews: 428,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Immunity', 'Allergy support', 'Natural energy'],
    ingredients: 'Raw Wildflower Honey'
  },
  {
    id: 'food-3',
    name: 'Grass-Fed Beef Liver',
    description: 'Nutrient-dense liver. Nature\'s multivitamin.',
    price: 32.00,
    category: 'food',
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1607335614551-3467cebe9f4d?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Iron rich', 'Vitamin B12', 'Energy'],
    ingredients: '100% Grass-Fed Beef Liver'
  },
  {
    id: 'food-4',
    name: 'Organic Turmeric Root',
    description: 'Fresh whole turmeric roots for tea, cooking, or juicing. Anti-inflammatory powerhouse.',
    price: 9.50,
    category: 'food',
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Anti-inflammatory', 'Joint pain', 'Detox'],
    ingredients: 'Fresh Organic Turmeric Root'
  },
  {
    id: 'food-6',
    name: 'Bone Marrow Extract',
    description: 'Rich, savory bone marrow concentrate. Essential for gut and bone health.',
    price: 35.00,
    category: 'food',
    rating: 4.8,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1612871689353-cccf581d667b?auto=format&fit=crop&w=800&q=80',
    isOrganic: true,
    benefits: ['Gut repair', 'Collagen', 'Stem cells'],
    ingredients: 'Grass-Fed Beef Bone Marrow'
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-2023-001', date: '2023-10-15', status: 'Delivered', total: 45.50, items: 3 },
  { id: '#ORD-2023-042', date: '2023-11-02', status: 'Delivered', total: 12.99, items: 1 },
  { id: '#ORD-2023-089', date: '2023-11-20', status: 'Processing', total: 68.00, items: 4 },
];