'use client';

import { create } from 'zustand';
import { CartStore, CartItem, Product, WishlistStore } from '@/types';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addToCart: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { productId: product.id, quantity, product }],
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  productIds: [],

  toggleWishlist: (productId: string) => {
    set((state) => {
      const isWishlisted = state.productIds.includes(productId);
      return {
        productIds: isWishlisted
          ? state.productIds.filter((id) => id !== productId)
          : [...state.productIds, productId],
      };
    });
  },

  removeFromWishlist: (productId: string) => {
    set((state) => ({
      productIds: state.productIds.filter((id) => id !== productId),
    }));
  },

  isWishlisted: (productId: string) => {
    return get().productIds.includes(productId);
  },

  clearWishlist: () => {
    set({ productIds: [] });
  },

  getTotalItems: () => {
    return get().productIds.length;
  },
}));

export const useAuthStore = create<{
  user: { id: string; name: string; email: string } | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}>((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('user') : false,

  login: (email: string, password: string) => {
    const mockUser = {
      id: '1',
      name: 'NIKA User',
      email: email,
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    set({ user: mockUser, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isLoggedIn: false });
  },
}));
