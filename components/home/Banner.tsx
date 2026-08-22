'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/types';
import { promotions } from '@/data/promotions';
import { getLocalizedText } from '@/lib/utils';

interface BannerProps {
  locale: Locale;
}

export default function Banner({ locale }: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const mainBannerImages = [
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=500&fit=crop',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainBannerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainBannerImages.length) % mainBannerImages.length);
  };

  return (
    <section className="bg-cream-50 py-10 md:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Carousel */}
          <div className="md:col-span-2">
            <div className="relative h-56 md:h-72 bg-cream-100 rounded-2xl overflow-hidden group">
              <Image
                src={mainBannerImages[currentSlide]}
                alt="Banner"
                fill
                className="object-cover w-full h-full"
                priority
              />

              {/* Text overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
              <div className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-md">
                <h1 className="text-white text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-md mb-4">
                  {locale === 'th' ? 'ค้นหาสิ่งที่ใช่สำหรับคุณ' : 'Find something you’ll love'}
                </h1>
                <button className="btn-primary">
                  {locale === 'th' ? 'เลือกซื้อเลย' : 'Shop now'}
                </button>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#18181B] rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#18181B] rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
              >
                <ChevronRight size={22} />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 right-6 flex gap-2 z-10">
                {mainBannerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-6 h-2'
                        : 'bg-white/50 w-2 h-2 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Promotions */}
          <div className="space-y-6">
            {promotions.slice(0, 2).map((promo) => (
              <div
                key={promo.id}
                className="relative h-32 md:h-[8.25rem] rounded-2xl overflow-hidden group cursor-pointer border border-gray-100"
              >
                <Image
                  src={promo.image}
                  alt={getLocalizedText(promo.title, locale)}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-white font-bold text-base drop-shadow">
                    {getLocalizedText(promo.title, locale)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
