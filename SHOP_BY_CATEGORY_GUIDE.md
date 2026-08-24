# Shop by Category - Implementation Guide

## 📋 Overview

I've created a complete "Shop by Category" section that:
- ✅ Fetches categories from your external API at `https://localhost:7230/api/Categories`
- ✅ Displays 5 categories per page with pagination
- ✅ Shows mock images for each category
- ✅ Supports next/previous navigation
- ✅ Handles loading and error states
- ✅ Supports both Thai (th) and English (en) locales

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
│  ShopByCategory Component ('use client')                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    fetch('/api/categories')
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js API Route (Server)                      │
│         /app/api/categories/route.ts                         │
│  - Handles CORS (no cross-origin issues)                    │
│  - Makes server-to-server call to external API             │
└──────────────────────────┬──────────────────────────────────┘
                           │
           fetch('https://localhost:7230/api/Categories')
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│           External API Server (Port 7230)                    │
│     https://localhost:7230/api/Categories                   │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Files Created/Modified

### New Files:
1. **`lib/api/client-services.ts`** - Client-side services using Next.js API routes
2. **`app/api/categories/route.ts`** - Next.js API route (proxy to external API)
3. **`components/home/ShopByCategory.tsx`** - Main component with pagination
4. **`lib/api/services.ts`** - Updated with categoryService
5. **`.env.local`** - Configuration file

### Modified Files:
1. **`app/[locale]/page.tsx`** - Updated to use ShopByCategory instead of CategoriesSection

## 🚀 Setup Instructions

### 1. Make sure your external API is running

```bash
# Your external API should be running at:
https://localhost:7230

# It should respond to:
https://localhost:7230/api/Categories?pageNumber=1&pageSize=50
```

**Response format should be:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Pets",
      "description": "Products for pets...",
      "parentCategoryId": 0,
      "isActive": true,
      "createdAt": "2026-08-23T08:22:53.9019031"
    }
  ],
  "pageNumber": 1,
  "pageSize": 10,
  "totalCount": 3,
  "totalPages": 1
}
```

### 2. Environment Variables

The `.env.local` file is already configured:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7230
NODE_TLS_REJECT_UNAUTHORIZED=0  # Allow self-signed certificates in development
```

### 3. Start the Next.js dev server

```bash
npm run dev
# Server will run at http://localhost:3000
```

### 4. Visit the home page

```
http://localhost:3000/en
# or
http://localhost:3000/th
```

## 🎯 How It Works

### Component Flow:

1. **Load Phase:**
   - `ShopByCategory` component mounts
   - Calls `categoryClientService.getAll()` with `pageSize: 50`
   - Shows loading spinner

2. **Display Phase:**
   - Receives all categories from API
   - Shows 5 items per page in a grid
   - Displays pagination info

3. **Navigation Phase:**
   - User clicks Next/Previous button
   - Component updates `currentIndex` and displays next/previous 5 items
   - No additional API call needed (client-side pagination)

4. **Error Handling:**
   - If API fails, displays error message
   - Shows empty state if no categories

## 📊 Component Features

### Pagination
- Shows 5 categories per page
- Next/Previous buttons for navigation
- Disabled state when at start/end
- Pagination info shows "Showing 1-5 of 15 categories"

### Display
- Category name
- Category description (hidden on mobile)
- Mock images (8 different images cycling)
- Hover effects with zoom and color change
- Responsive grid (2 cols mobile, 3 cols tablet, 5 cols desktop)

### Localization
- Thai (th) and English (en) support
- All text is localized
- Locale passed from parent page

## 🔌 API Endpoints

### Next.js API Route (No CORS issues)
```
GET /api/categories?pageNumber=1&pageSize=50
```

This route:
- Proxies to `https://localhost:7230/api/Categories`
- Handles SSL/TLS certificate issues
- Returns unified response format

## 💡 Usage Example

```typescript
// In a client component
'use client';

import { categoryClientService } from '@/lib/api/client-services';

export default function MyComponent() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await categoryClientService.getAll({
        pageNumber: 1,
        pageSize: 10,
      });

      if (response.success) {
        setCategories(response.data.items);
      }
    };

    fetchCats();
  }, []);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
}
```

## 🐛 Troubleshooting

### Issue: "Error fetching categories"
**Cause:** External API at https://localhost:7230 is not running or not accessible

**Solution:**
1. Check if your C# API server is running on port 7230
2. Test API manually: `https://localhost:7230/api/Categories?pageNumber=1&pageSize=10`
3. Check browser console for CORS errors
4. Ensure SSL certificate is valid or use `NODE_TLS_REJECT_UNAUTHORIZED=0`

### Issue: SSL Certificate Error
**Cause:** Self-signed certificate on localhost:7230

**Solution:**
1. The `.env.local` already has `NODE_TLS_REJECT_UNAUTHORIZED=0`
2. Restart your Next.js dev server
3. Clear browser cache

### Issue: CORS Error in browser console
**Cause:** Client-side code trying to call external API directly

**Solution:**
- ✅ This is already fixed by using the Next.js API route proxy
- All requests go through `/api/categories` which is same-origin
- No CORS issues

### Issue: Categories not showing
**Steps:**
1. Check if Next.js server is running: `http://localhost:3000`
2. Check browser console for errors
3. Check network tab - look for `/api/categories` request
4. Verify external API response format matches expected schema

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pageNumber": 1,
    "pageSize": 50,
    "totalCount": 15,
    "totalPages": 1
  },
  "statusCode": 200,
  "message": "Categories fetched successfully"
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 500,
  "error": "Error message",
  "message": "Failed to fetch categories"
}
```

## 🎨 Customization

### Change items per page:
Edit `ShopByCategory.tsx`:
```typescript
const ITEMS_PER_PAGE = 5; // Change this number
```

### Change mock images:
Edit `ShopByCategory.tsx`:
```typescript
const MOCK_IMAGES = [
  'https://your-image-url.jpg',
  // Add more image URLs
];
```

### Styling:
All classes use Tailwind CSS. Modify the component directly for custom styling.

## 🔗 Related Files

- Component: `components/home/ShopByCategory.tsx`
- Client Service: `lib/api/client-services.ts`
- API Route: `app/api/categories/route.ts`
- Server Service: `lib/api/services.ts`
- Config: `.env.local`
- Home Page: `app/[locale]/page.tsx`

## ✅ Testing Checklist

- [ ] External API is running on https://localhost:7230
- [ ] Next.js dev server is running
- [ ] Visit http://localhost:3000/en
- [ ] See "Shop by Category" section loading
- [ ] See 5 categories displayed
- [ ] Next button is enabled (if more than 5 categories)
- [ ] Previous button is disabled (on first page)
- [ ] Click Next button to see more categories
- [ ] Pagination info updates correctly
- [ ] Hover effects work on category cards
- [ ] Category links work (click to navigate)
- [ ] Try `/th` locale for Thai version

## 🚨 Notes

1. **Mock Images:** Currently using Unsplash URLs for demo. Replace with your own images when ready.

2. **Production:** Remove `NODE_TLS_REJECT_UNAUTHORIZED=0` before deploying to production.

3. **Client vs Server Services:**
   - `categoryClientService` (in `client-services.ts`) - for use in 'use client' components
   - `categoryService` (in `services.ts`) - for use in server components or API routes

4. **Pagination:** Currently done client-side (load all items once, paginate in browser). For large datasets, implement server-side pagination by calling the API with different `pageNumber` values.

## 📞 Need Help?

Check the logs:
```bash
# Terminal running Next.js dev server will show logs
# Look for "Fetching from external API:" messages
```

Check browser DevTools:
1. Open F12 → Network tab
2. Look for `/api/categories` requests
3. Check response status and body
4. Check Console tab for errors

---

Created with ❤️ for NIKA e-commerce
