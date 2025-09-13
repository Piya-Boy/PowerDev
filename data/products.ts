import { Product } from '@/lib/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Laptop',
    description: 'High-performance laptop with the latest processor and graphics',
    price: 1299.99,
    image: '/images/products/laptop.jpg',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound quality',
    price: 299.99,
    image: '/images/products/headphones.jpg',
    category: 'Audio',
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring and notifications',
    price: 199.99,
    image: '/images/products/smartwatch.jpg',
    category: 'Wearables',
  }
];