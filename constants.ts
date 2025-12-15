import { Category, Product, Order } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'tea', 
    name: 'Herbal Teas', 
    icon: 'Leaf', 
    color: 'bg-green-100 text-green-700',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'supplements', 
    name: 'Supplements', 
    icon: 'Pill', 
    color: 'bg-blue-100 text-blue-700',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'cosmetics', 
    name: 'Natural Beauty', 
    icon: 'Sparkles', 
    color: 'bg-pink-100 text-pink-700',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'food', 
    name: 'Healthy Food', 
    icon: 'Apple', 
    color: 'bg-orange-100 text-orange-700',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'essential_oils', 
    name: 'Aromatherapy', 
    icon: 'Droplets', 
    color: 'bg-purple-100 text-purple-700',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Chamomile Tea',
    description: 'Premium whole flower chamomile tea for relaxation and better sleep.',
    price: 8.50,
    category: 'tea',
    rating: 4.8,
    reviews: 124,
    image: 'https://picsum.photos/seed/tea1/400/400',
    isOrganic: true,
    benefits: ['Promotes sleep', 'Reduces inflammation', 'Calms digestion'],
    ingredients: '100% Organic Matricaria chamomilla flowers'
  },
  {
    id: '2',
    name: 'Ashwagandha Root Extract',
    description: 'High potency adaptogen supplement for stress relief and energy.',
    price: 24.99,
    category: 'supplements',
    rating: 4.6,
    reviews: 89,
    image: 'https://picsum.photos/seed/supp1/400/400',
    isOrganic: true,
    benefits: ['Stress reduction', 'Boosts energy', 'Improves focus'],
    ingredients: 'Organic Ashwagandha Root Extract (KSM-66), Black Pepper Extract'
  },
  {
    id: '3',
    name: 'Lavender Facial Oil',
    description: 'Nourishing facial oil with essential lavender oil for glowing skin.',
    price: 18.00,
    category: 'cosmetics',
    rating: 4.9,
    reviews: 56,
    image: 'https://picsum.photos/seed/cos1/400/400',
    isOrganic: true,
    benefits: ['Hydrating', 'Soothing', 'Anti-aging']
  },
  {
    id: '4',
    name: 'Manuka Honey UMF 15+',
    description: 'Pure New Zealand Manuka honey with high antibacterial properties.',
    price: 45.00,
    category: 'food',
    rating: 5.0,
    reviews: 210,
    image: 'https://picsum.photos/seed/food1/400/400',
    isOrganic: false,
    benefits: ['Immune support', 'Digestive health', 'Wound healing']
  },
  {
    id: '5',
    name: 'Peppermint Essential Oil',
    description: '100% pure therapeutic grade peppermint oil.',
    price: 12.50,
    category: 'essential_oils',
    rating: 4.7,
    reviews: 78,
    image: 'https://picsum.photos/seed/oil1/400/400',
    isOrganic: true,
    benefits: ['Relieves headaches', 'Boosts energy', 'Respiratory support']
  },
  {
    id: '6',
    name: 'Green Superfood Blend',
    description: 'Daily greens powder with spirulina, chlorella, and wheatgrass.',
    price: 32.99,
    category: 'food',
    rating: 4.5,
    reviews: 145,
    image: 'https://picsum.photos/seed/food2/400/400',
    isOrganic: true,
    benefits: ['Detoxifying', 'Nutrient dense', 'Alkalyzing']
  },
  {
    id: '7',
    name: 'Turmeric Curcumin',
    description: 'Enhanced absorption turmeric complex for joint health.',
    price: 21.50,
    category: 'supplements',
    rating: 4.8,
    reviews: 300,
    image: 'https://picsum.photos/seed/supp2/400/400',
    isOrganic: true,
    benefits: ['Anti-inflammatory', 'Joint support', 'Antioxidant']
  },
  {
    id: '8',
    name: 'Sleepy Time Tea Blend',
    description: 'A calming blend of valerian, passionflower, and lemon balm.',
    price: 9.50,
    category: 'tea',
    rating: 4.7,
    reviews: 92,
    image: 'https://picsum.photos/seed/tea2/400/400',
    isOrganic: true,
    benefits: ['Deep sleep', 'Relaxation', 'Anxiety relief']
  }
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-2023-001', date: '2023-10-15', status: 'Delivered', total: 45.50, items: 3 },
  { id: '#ORD-2023-042', date: '2023-11-02', status: 'Delivered', total: 12.99, items: 1 },
  { id: '#ORD-2023-089', date: '2023-11-20', status: 'Processing', total: 68.00, items: 4 },
];