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

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = create<{
  user: AuthUser | null;
  isLoggedIn: boolean;
  /** Called after a successful POST /api/auth/login with the resolved user + token. */
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
}>((set) => ({
  user: typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null,
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem('user') : false,

  login: (user: AuthUser, token?: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    if (token) localStorage.setItem('authToken', token);
    set({ user, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    set({ user: null, isLoggedIn: false });
  },
}));

/**
 * ============================================================================
 * Global API error dialog
 * ============================================================================
 * One dialog, mounted once in the locale layout, shared by every `/api/**`
 * call. `lib/api/client-services.ts` calls `show()` whenever a request comes
 * back with a 5xx status or throws (network/timeout) — genuine backend/
 * infra failures — so any endpoint reports the same popup instead of each
 * form growing its own "something broke" UI. Expected, per-field failures
 * (400/401 validation, wrong credentials, etc.) are still handled locally by
 * the form that made the call, since those are user-actionable, not outages.
 */
export const useApiErrorStore = create<{
  isOpen: boolean;
  detail?: string;
  show: (detail?: string) => void;
  hide: () => void;
}>((set) => ({
  isOpen: false,
  detail: undefined,
  show: (detail) => set({ isOpen: true, detail }),
  hide: () => set({ isOpen: false, detail: undefined }),
}));
