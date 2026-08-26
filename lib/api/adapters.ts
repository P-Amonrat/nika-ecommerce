import { Product, LocalizedText } from '@/types';
import { ApiProductImage } from './types';

/**
 * ============================================================================
 * API → display adapter
 * ============================================================================
 * `/api/Products/**` returns a flat, single-language shape. The product UI
 * (`components/product/**`, `components/common/ProductCard.tsx`) was built
 * against the richer, localized `Product` type in `@/types` — this is the
 * one place that bridges the two, so every caller maps the data the same way.
 *
 * A few fields the UI needs aren't in the backend response at all yet — they
 * fall back to a placeholder here until the API adds them:
 *   - `rating` (average review score — the API only exposes `reviewCount`)
 *   - `stock`  (inventory count — not returned at all)
 * `name`/`detail` are single-language in the API, so both `th` and `en` get
 * the same text rather than being translated.
 */

// TODO(backend): replace once /api/Products exposes a real rating/stock field.
const MOCK_RATING = 4.5;
const MOCK_STOCK = 999;

/** The subset of fields both /api/Products/:id and /api/Products/category/:id share. */
export interface ApiProductLike {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  images: ApiProductImage[];
  brand?: string;
  soldCount?: number;
  reviewCount?: number;
  description?: string;
  categoryName?: string;
  warrantyMonths?: number;
  weight?: number;
  weightUnit?: string;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnit?: string;
  shipsFromCountry?: string;
  preOrderDays?: number;
  saleEndAt?: string;
}

function toLocalized(text: string | undefined): LocalizedText {
  return { th: text ?? '', en: text ?? '' };
}

export function apiProductToDisplayProduct(p: ApiProductLike, categoryId: string): Product {
  const images = [...p.images]
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((img) => img.imageUri);

  // Existing convention (see app/api/products/category/[id] usage): `salePrice`
  // is the discounted price, shown in place of `price`, when it's lower.
  const hasSale = p.salePrice != null && p.salePrice > 0 && p.salePrice < p.price;
  const finalPrice = hasSale ? (p.salePrice as number) : p.price;
  const discount = hasSale ? Math.round(((p.price - (p.salePrice as number)) / p.price) * 100) : 0;

  return {
    id: String(p.id),
    name: toLocalized(p.name),
    categoryId,
    brand: p.brand ?? '',
    images,
    price: finalPrice,
    originalPrice: p.price,
    discount,
    rating: MOCK_RATING,
    sold: p.soldCount ?? 0,
    stock: MOCK_STOCK,
    preOrder: (p.preOrderDays ?? 0) > 0,
    saleEndsAt: p.saleEndAt,
    specifications: {
      category: p.categoryName ?? '',
      brand: p.brand ?? '',
      warrantyDuration:
        p.warrantyMonths != null ? `${p.warrantyMonths} month${p.warrantyMonths === 1 ? '' : 's'}` : '-',
      weight: p.weight != null ? `${p.weight} ${p.weightUnit ?? ''}`.trim() : '-',
      dimension:
        p.length != null && p.width != null && p.height != null
          ? `${p.length} × ${p.width} × ${p.height} ${p.dimensionUnit ?? ''}`.trim()
          : '-',
      shipsFrom: p.shipsFromCountry ?? '-',
    },
    detail: toLocalized(p.description),
  };
}
