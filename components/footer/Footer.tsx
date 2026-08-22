'use client';

import Link from 'next/link';
import { Share2, Share, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const faqLinks = [
    { id: 'how-to-buy', label: locale === 'th' ? 'วิธีการซื้อ' : 'How to Buy' },
    { id: 'how-long-delivery', label: locale === 'th' ? 'ระยะเวลาจัดส่ง' : 'Delivery Time' },
    { id: 'how-to-track-order', label: locale === 'th' ? 'วิธีติดตามสถานะ' : 'Track Order' },
  ];

  return (
    <footer className="bg-red-500 text-white mt-16">
      <div className="container-custom py-12">
        {/* Main Footer Content - 4 columns layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <span className="text-xl md:text-2xl font-bold text-white lowercase">nika</span>
            </div>
            <p className="text-white/75 text-xs md:text-sm leading-relaxed">
              {locale === 'th'
                ? 'ร้านค้าออนไลน์คุณภาพดีราคาถูก'
                : 'Quality products at affordable prices.'}
            </p>
          </div>

          {/* FAQ Section */}
          <div>
            <h4 className="text-xs md:text-sm font-bold mb-4 uppercase tracking-wide text-white">
              {locale === 'th' ? 'ช่วยเหลือ' : 'Help'}
            </h4>
            <ul className="space-y-2">
              {faqLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/${locale}/faq/${link.id}`}
                    className="text-white/75 hover:text-white transition-colors duration-200 text-xs md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-xs md:text-sm font-bold mb-4 uppercase tracking-wide text-white">
              {locale === 'th' ? 'ติดตามเรา' : 'Follow'}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white p-2 rounded-full transition-colors duration-200"
                title="Facebook"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white p-2 rounded-full transition-colors duration-200"
                title="Instagram"
              >
                <Share size={16} />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white p-2 rounded-full transition-colors duration-200"
                title="Line"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="text-xs md:text-sm font-bold mb-4 uppercase tracking-wide text-white">
              {locale === 'th' ? 'ติดต่อ' : 'Contact'}
            </h4>
            <div className="space-y-2 text-white/75 text-xs md:text-sm">
              <div className="flex items-start gap-2">
                <Phone size={14} className="text-white/75 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">+66 (0) 2-NIKA</p>
                  <p className="text-xs text-white/60">Mon-Fri 9-18</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-white/75 flex-shrink-0" />
                <span>@nikashop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6" />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs md:text-sm">
          {/* Services */}
          <div>
            <p className="text-white/75 font-semibold mb-2 text-xs">
              {locale === 'th' ? 'บริการของเรา' : 'Services'}
            </p>
            <div className="space-y-1 text-white/60">
              <p>✓ {locale === 'th' ? 'ฟรีค่าจัดส่ง (ตั้งแต่ 1,000 บาท)' : 'Free Shipping (1,000฿+)'}</p>
              <p>✓ {locale === 'th' ? 'คืนสินค้าได้ 30 วัน' : '30-Day Returns'}</p>
              <p>✓ {locale === 'th' ? 'ปลอดภัย 100%' : '100% Secure'}</p>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <p className="text-white/75 font-semibold mb-2 text-xs">
              {locale === 'th' ? 'เวลาทำการ' : 'Hours'}
            </p>
            <div className="space-y-1 text-white/60">
              <p>{locale === 'th' ? 'จ-ศ' : 'Mon-Fri'}: 09:00 - 18:00</p>
              <p>{locale === 'th' ? 'เสาร์' : 'Sat'}: 10:00 - 16:00</p>
              <p>{locale === 'th' ? 'อาทิตย์' : 'Sun'}: {locale === 'th' ? 'ปิด' : 'Closed'}</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="sm:text-right sm:flex sm:items-end sm:justify-end">
            <p className="text-white/60">
              &copy; {new Date().getFullYear()} <span className="text-white font-bold">NIKA</span> {locale === 'th' ? '- ทุกสิทธิ์สงวน' : '- All rights reserved'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
