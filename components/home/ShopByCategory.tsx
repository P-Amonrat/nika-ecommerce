'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categoryClientService } from '@/lib/api/client-services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategorySkeletonLoader, SkeletonHeader } from '@/components/common/SkeletonLoader';
import { Locale } from '@/types';

interface Category {
  id: number;
  name: string;
  description: string;
  parentCategoryId: number;
  isActive: boolean;
  createdAt: string;
}

interface CategoriesResponse {
  items: Category[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ShopByCategoryProps {
  locale: Locale;
}

// Mock images array - cycle through these
const MOCK_IMAGES = [
  'https://img.magnific.com/3d-models/v2/Y/H/4/V/W/7/6/YH4VW76N/pet-bowl-icon-poster-1.png',
  'https://i.etsystatic.com/59447045/r/il/2ef0f6/8195058942/il_fullxfull.8195058942_jf7v.jpg',
  'https://makerworld.bblmw.com/makerworld/model/USe5f92907e0b6c4/design/2024-10-22_2fd33c01b1d5.jpg',
  'https://makerworld.bblmw.com/makerworld/model/USd7fc69cead26b7/design/2024-10-20_b41addc814a0d.jpg',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518611505868-48510c8d32b5?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop',
];

export default function ShopByCategory({ locale }: ShopByCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 5;

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryClientService.getAll({
          pageNumber: 1,
          pageSize: 50, // Fetch more items for pagination
        });

        if (response.success && response.data) {
          const data = response.data as CategoriesResponse;
          setAllCategories(data.items);
          setTotalCount(data.totalCount);
          setCategories(data.items.slice(0, ITEMS_PER_PAGE));
          setCurrentIndex(0);
        } else {
          setError(response.message || 'Failed to fetch categories');
        }
      } catch (err) {
        setError('Error fetching categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle next button
  const handleNext = () => {
    const nextIndex = currentIndex + ITEMS_PER_PAGE;
    if (nextIndex < allCategories.length) {
      setCurrentIndex(nextIndex);
      setCategories(
        allCategories.slice(nextIndex, nextIndex + ITEMS_PER_PAGE)
      );
      // Auto scroll to left
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    const prevIndex = Math.max(0, currentIndex - ITEMS_PER_PAGE);
    setCurrentIndex(prevIndex);
    setCategories(
      allCategories.slice(prevIndex, prevIndex + ITEMS_PER_PAGE)
    );
    // Auto scroll to left
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  // Get mock image for category
  const getMockImage = (index: number) => {
    return MOCK_IMAGES[index % MOCK_IMAGES.length];
  };

  // Check if there are more items to show
  const hasNext = currentIndex + ITEMS_PER_PAGE < allCategories.length;
  const hasPrevious = currentIndex > 0;

  if (loading) {
    return (
      <section className="py-10 md:py-12 bg-white">
        <div className="container-custom">
          <SkeletonHeader />
          <CategorySkeletonLoader />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 md:py-12 bg-white">
        <div className="container-custom">
          <div className="flex justify-center items-center h-40">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#18181B]">
            {locale === 'th' ? 'ซื้อตามหมวดหมู่' : 'Shop by Category'}
          </h2>

          {/* Navigation Buttons */}
          {(hasNext || hasPrevious) && (
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={!hasPrevious}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  hasPrevious
                    ? 'border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-500 cursor-pointer'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`p-2 rounded-full border transition-all duration-300 ${
                  hasNext
                    ? 'border-gray-300 hover:border-red-500 hover:bg-red-50 text-gray-600 hover:text-red-500 cursor-pointer'
                    : 'border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Categories Grid - Responsive (2 mobile, 3 tablet, 4 md, 5 lg+) */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {categories.map((category, index) => (
            <Link
              key={`${category.id}-${currentIndex}`}
              href={`/${locale}/categories/${category.id}`}
            >
              <div className="group text-center cursor-pointer flex flex-col items-center">
                {/* Category Image - Responsive size (larger) */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-2 sm:mb-3 rounded-full overflow-hidden ring-1 ring-gray-200 group-hover:ring-2 group-hover:ring-red-400 transition-all duration-300">
                  <Image
                    src={getMockImage(currentIndex + index)}
                    alt={category.name}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    sizes="96px"
                  />
                </div>

                {/* Category Name Only - Responsive text */}
                <h3 className="font-semibold text-[#18181B] text-xs sm:text-sm md:text-base group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
