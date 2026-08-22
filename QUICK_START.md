# NIKA E-Commerce - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Step 1: Navigate to Project
```bash
cd C:\Users\amonr\projects\nika-ecommerce
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
- Go to `http://localhost:3000`
- You'll be automatically redirected to `/en` (English version)
- Visit `/th` for Thai version

## 🧪 Testing Checklist

### Homepage
- [ ] See banner carousel (auto-rotating images)
- [ ] See 5 category cards
- [ ] See 8 top-selling products
- [ ] See 3 promotional banners
- [ ] Language switcher works (TH/EN)

### Navigation
- [ ] Logo links back to home
- [ ] Search bar works (try searching "bag" or "phone")
- [ ] Cart icon shows item count
- [ ] Profile dropdown shows login option
- [ ] Mobile menu appears on small screens (< 768px)

### Products
- [ ] Click on any product to view details
- [ ] See product images and gallery
- [ ] See price, discount, and rating
- [ ] See product specifications
- [ ] See customer reviews
- [ ] Adjust quantity with +/- buttons
- [ ] Add to cart button works
- [ ] See related products at bottom

### Categories
- [ ] Click on any category from home
- [ ] See filtered products
- [ ] Pagination works (when more than 12 products)
- [ ] Breadcrumb navigation shows
- [ ] Search within category works

### Shopping Cart
- [ ] Add multiple items to cart
- [ ] Cart count updates in navbar
- [ ] Click cart icon goes to `/cart`
- [ ] See all items with prices
- [ ] Adjust quantities
- [ ] Remove items works
- [ ] Price calculation is correct
- [ ] Subtotal, discount, shipping shown
- [ ] Total price updates in real-time

### Login
- [ ] Click profile icon → click "Login"
- [ ] Try demo credentials:
  - Email: `user@example.com`
  - Password: `password123`
- [ ] After login, profile shows user name
- [ ] Logout works
- [ ] Redirects back to home

### Language Switching
- [ ] Click TH/EN in navbar
- [ ] All text changes language
- [ ] URL changes to `/th/...` or `/en/...`
- [ ] Category pages show correct language
- [ ] Product details in correct language

### FAQ
- [ ] Click FAQ link in footer
- [ ] See FAQ questions
- [ ] Click on FAQ item to view answer
- [ ] Related FAQs shown on side

### Search
- [ ] Use search bar to search products
- [ ] Search for "bag", "phone", "shirt"
- [ ] Results display correctly
- [ ] Can click on product to view details

### Mobile View
- [ ] Resize browser to < 768px
- [ ] Hamburger menu appears
- [ ] Menu opens/closes
- [ ] Product grid shows 2 columns
- [ ] All components responsive

## 📋 Demo Scenarios

### Scenario 1: Browse and Add to Cart
1. Go to home page
2. Click on "Electronics" category
3. Select a product
4. Change quantity to 3
5. Click "Add to Cart"
6. See cart updated in navbar
7. Go to cart
8. Verify 3 items show

### Scenario 2: Switch Languages
1. Go to any product page
2. Click "EN" or "ไทย" in navbar
3. See all text change
4. URL updates (e.g., `/en/products/1` ↔ `/th/products/1`)
5. Data stays the same, only language changes

### Scenario 3: Search Products
1. Type "bag" in search bar
2. See filtered results
3. Click on one product
4. Add to cart
5. Change to Thai
6. See product page in Thai

### Scenario 4: Mock Checkout
1. Add items to cart
2. See discount (5%) applied
3. See shipping fee added
4. Click "Checkout" button
5. (In real app, would go to payment)

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Kill existing processes
lsof -ti :3000 | xargs kill -9

# Try again
npm run dev
```

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### TypeScript errors
```bash
# Check types
npm run type-check

# Rebuild
npm run build
```

### Components not showing
- Check browser console for errors (F12)
- Clear cache (Ctrl+Shift+Delete)
- Restart dev server

## 📱 Responsive Test Sizes

Use browser dev tools to test:
- **Mobile**: 375x812 (iPhone SE)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1280x800 (Desktop)

All layouts should look good and no horizontal scrolling!

## 🎨 Theme Colors

Main color used throughout: **Red** (#dc2626)
- Primary buttons: Red background
- Links: Red on hover
- Active states: Red
- Accent elements: Red

## 📦 Build for Production

```bash
# Build optimized production version
npm run build

# Test production build locally
npm start
```

## 🔗 Key Routes

### English Routes (`/en`)
- `/en` - Home
- `/en/products/1` - Product detail
- `/en/categories/electronics` - Category
- `/en/cart` - Shopping cart
- `/en/login` - Login page
- `/en/faq/how-to-buy` - FAQ
- `/en/search?q=bag` - Search results

### Thai Routes (`/th`)
Same structure with `/th` prefix instead of `/en`

## 💡 Tips

1. **Mock Data**: Change prices/products in `/data/products.ts`
2. **Add Products**: Edit `/data/products.ts` to add more
3. **Change Colors**: Edit `tailwind.config.ts` for colors
4. **Add Pages**: Create new folder in `app/[locale]/`
5. **Translations**: Add to `/translations/th.json` and `/translations/en.json`

## ✅ Everything Ready!

- ✅ 15 mock products
- ✅ 5 categories
- ✅ 10 reviews
- ✅ 6 FAQ items
- ✅ 3 promotions
- ✅ Full TH/EN support
- ✅ Responsive design
- ✅ Shopping cart
- ✅ Mock login
- ✅ Search functionality

Now start the dev server and enjoy! 🚀
