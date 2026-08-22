export type Locale = 'th' | 'en';

export interface LocalizedText {
  th: string;
  en: string;
}

export interface Product {
  id: string;
  name: LocalizedText;
  categoryId: string;
  brand: string;
  images: string[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  sold: number;
  stock: number;
  preOrder: boolean;
  saleEndsAt?: string;
  specifications: {
    category: string;
    brand: string;
    warrantyDuration: string;
    weight: string;
    dimension: string;
    shipsFrom: string;
  };
  detail: LocalizedText;
}

export interface Category {
  id: string;
  name: LocalizedText;
  image: string;
  description?: LocalizedText;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Promotion {
  id: string;
  image: string;
  title: LocalizedText;
  link?: string;
}

export interface FAQ {
  id: string;
  slug: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface WishlistStore {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
