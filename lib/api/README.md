# API Client Middleware

A comprehensive API client middleware for Next.js with Axios, response handlers, and built-in hooks.

## 📁 Structure

```
lib/api/
├── client.ts        # Axios instance configuration and interceptors
├── middleware.ts    # Response handlers and HTTP methods
├── services.ts      # API service layer with endpoints
├── hooks.ts         # Custom React hooks for API calls
├── index.ts         # Main export file
└── README.md        # This file
```

## 🚀 Quick Start

### 1. Environment Configuration

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:7230
```

### 2. Using Services in Components

#### GET Request (useApi hook)

```typescript
'use client';

import { productService } from '@/lib/api';
import { useApi } from '@/lib/api/hooks';

export default function ProductList() {
  const { data, loading, error } = useApi(
    () => productService.getAll({ page: 1, limit: 10 }),
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

#### POST/PUT Request (useMutation hook)

```typescript
'use client';

import { productService } from '@/lib/api';
import { useMutation } from '@/lib/api/hooks';

export default function CreateProduct() {
  const { mutate, loading, error } = useMutation(productService.create);

  const handleSubmit = async (formData) => {
    try {
      const result = await mutate(formData);
      if (result.success) {
        console.log('Product created:', result.data);
      }
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      {error && <div>{error.message}</div>}
    </form>
  );
}
```

### 3. Direct API Calls

```typescript
import { productService, authService } from '@/lib/api';

// GET
const products = await productService.getAll();

// POST
const newProduct = await productService.create({ name: 'Product', price: 100 });

// PUT
const updated = await productService.update('123', { name: 'Updated' });

// DELETE
await productService.delete('123');

// Auth
await authService.login('email@example.com', 'password');
```

## 📝 API Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}
```

## 🔧 Features

### Request Interceptors
- Automatic authorization token attachment
- Default headers configuration

### Response Interceptors
- Unified response handling
- Error transformation
- HTTP status code management

### Response Handlers
- `success()` - Success response
- `error()` - Error response
- `validate()` - Response validation
- `paginate()` - Paginated response

### HTTP Methods
- `GET` - Fetch data
- `POST` - Create data
- `PUT` - Update data
- `PATCH` - Partial update
- `DELETE` - Delete data

## 🎯 Adding New Services

Create a new service object in `services.ts`:

```typescript
export const userService = {
  getProfile: async (): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.GET, '/users/profile');
      return response;
    } catch (error: any) {
      return error;
    }
  },

  updateProfile: async (data: any): Promise<ApiResponse> => {
    try {
      const response = await makeRequest(apiClient, httpMethods.PUT, '/users/profile', data);
      return response;
    } catch (error: any) {
      return error;
    }
  },
};
```

## 🔐 Authentication

The client automatically handles JWT tokens:

1. Login and receive token
2. Token is stored in localStorage
3. Token is automatically attached to all requests
4. On logout, token is cleared

```typescript
// Login
await authService.login('email@example.com', 'password');

// Token is now stored and sent with all requests

// Logout
await authService.logout();
```

## ⚠️ Error Handling

```typescript
const response = await productService.getAll();

if (!response.success) {
  console.error('Error:', response.message);
  console.error('Status:', response.statusCode);
  console.error('Details:', response.error);
}
```

## 🎨 Hooks API

### useApi (Read)

```typescript
const { data, loading, error } = useApi(apiCall, dependencies);
```

- `data` - Response data
- `loading` - Loading state
- `error` - Error response

### useMutation (Write)

```typescript
const { data, loading, error, mutate, reset } = useMutation(apiCall);
```

- `data` - Response data
- `loading` - Loading state
- `error` - Error response
- `mutate()` - Execute mutation
- `reset()` - Reset state

## 📚 Example Services

- **productService** - Product CRUD operations
- **orderService** - Order management
- **authService** - Authentication

Extend these or create new ones as needed for your API endpoints.
