import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    slug: 'how-to-buy',
    question: {
      th: 'วิธีการซื้อสินค้าบน NIKA',
      en: 'How to buy products on NIKA',
    },
    answer: {
      th: `
1. ค้นหาสินค้าที่คุณต้องการ
2. คลิกเพื่อดูรายละเอียดสินค้า
3. เลือกจำนวนที่ต้องการ
4. คลิกปุ่ม "เพิ่มลงตะกร้า" หรือ "ซื้อเลย"
5. ตรวจสอบรายการสินค้าในตะกร้า
6. ดำเนินการชำระเงิน (Checkout)
7. เลือกวิธีการชำระเงินและที่อยู่การจัดส่ง
8. ยืนยันการสั่งซื้อ
      `,
      en: `
1. Search for the product you want
2. Click to view product details
3. Select the quantity you need
4. Click "Add to Cart" or "Buy Now"
5. Review items in your cart
6. Proceed to checkout
7. Select payment method and delivery address
8. Confirm your order
      `,
    },
  },
  {
    id: '2',
    slug: 'how-long-delivery',
    question: {
      th: 'ระยะเวลาการจัดส่งสินค้านานแค่ไหน',
      en: 'How long does delivery take',
    },
    answer: {
      th: `
- การจัดส่งภายในกรุงเทพ: 1-2 วันทำการ
- การจัดส่งต่างจังหวัด: 2-5 วันทำการ
- การจัดส่งพื้นที่ห่างไกล: 5-7 วันทำการ

โปรดทราบว่า: เวลาจัดส่งมิรวมวันจันทร์ที่สถานีตรวจสอบสินค้า และวันทำการจริงจะขึ้นอยู่กับพื้นที่จัดส่ง
      `,
      en: `
- Bangkok delivery: 1-2 business days
- Provincial delivery: 2-5 business days
- Remote area delivery: 5-7 business days

Note: Delivery time excludes inspection days and actual business days depending on delivery area.
      `,
    },
  },
  {
    id: '3',
    slug: 'how-to-track-order',
    question: {
      th: 'วิธีติดตามสถานะการสั่งซื้อ',
      en: 'How to track my order',
    },
    answer: {
      th: `
1. ไปที่หน้า "โปรไฟล์" ของคุณ
2. คลิกที่ "คำสั่งซื้อ"
3. เลือกสั่งซื้อที่ต้องการติดตาม
4. คลิก "ติดตามสถานะ" เพื่อดูรายละเอียด
5. คุณจะเห็นขั้นตอนการจัดส่งแต่ละระยะ

หรือคุณสามารถตรวจสอบอีเมลที่ได้รับการยืนยันการสั่งซื้อ ซึ่งจะมีหมายเลขติดตาม (Tracking Number)
      `,
      en: `
1. Go to your "Profile" page
2. Click on "Orders"
3. Select the order you want to track
4. Click "Track Status" to view details
5. You'll see each delivery step

Or check your confirmation email which includes a Tracking Number for the shipment.
      `,
    },
  },
  {
    id: '4',
    slug: 'return-policy',
    question: {
      th: 'นโยบายการคืนสินค้า',
      en: 'What is the return policy',
    },
    answer: {
      th: `
NIKA มีนโยบายการคืนสินค้าได้ภายใน 30 วัน:

1. สินค้าต้องอยู่ในสภาพดีที่สุด
2. มีใบเสร็จการซื้อต้นฉบับหรือสำเนา
3. สินค้าต้องไม่เสีย ไม่เปียก ไม่เปลี่ยนแปลง
4. สินค้าที่มี defect สามารถเปลี่ยน/คืนได้ 100%
5. ค่าจัดส่งกลับต้องผู้ซื้อ

วิธีการคืน:
1. ติดต่อ NIKA Customer Service
2. ขออนุมัติการคืน
3. ส่งสินค้ากลับให้กับเรา (ค่าส่งแบกรับเอง)
4. ตรวจสอบและคืนเงิน
      `,
      en: `
NIKA has a 30-day return policy:

1. Product must be in excellent condition
2. Must have original or copy of receipt
3. Product must not be damaged or altered
4. Defective products can be replaced/refunded 100%
5. Return shipping is paid by customer

How to return:
1. Contact NIKA Customer Service
2. Request return approval
3. Send product back (prepaid shipping)
4. Inspection and refund processing
      `,
    },
  },
  {
    id: '5',
    slug: 'payment-methods',
    question: {
      th: 'วิธีการชำระเงินมีอะไรบ้าง',
      en: 'What payment methods are available',
    },
    answer: {
      th: `
NIKA รับชำระเงินหลายวิธี:

1. บัตรเครดิต/เดบิต (Visa, Mastercard, AmEx)
2. โอนเงินผ่านธนาคาร
3. สกุลเงิน QR Code / PromptPay
4. บัตร บิล (Bill Payment)
5. เงินสดปลายทาง (COD)

เลือกวิธีการชำระเงินที่เหมาะสมตามความต้องการของคุณ ทุกวิธีปลอดภัยและยืนยันการชำระเงินแบบทันที
      `,
      en: `
NIKA accepts multiple payment methods:

1. Credit/Debit Cards (Visa, Mastercard, AmEx)
2. Bank Transfer
3. QR Code / PromptPay
4. Bill Payment (Biller)
5. Cash on Delivery (COD)

Choose the payment method that suits your needs. All methods are secure with instant confirmation.
      `,
    },
  },
  {
    id: '6',
    slug: 'guarantee',
    question: {
      th: 'สินค้า NIKA มีประกัน',
      en: 'What warranty does NIKA offer',
    },
    answer: {
      th: `
ทุกสินค้า NIKA มีประกันตามชนิดของสินค้า:

1. อิเล็กโทรนิกส์: 1-2 ปี
2. แฟชั่น: 3-6 เดือน
3. บ้านและการใช้ชีวิต: 6-12 เดือน
4. ความสวย: 12 เดือน

การใช้ประกัน:
1. หากสินค้ามีปัญหา ติดต่อ NIKA ภายในช่วงเวลาที่กำหนด
2. ส่งสินค้าให้เรา (NIKA รับค่าจัดส่ง)
3. เราจะตรวจสอบ ซ่อม หรือเปลี่ยนสินค้า
4. ส่งกลับให้คุณ

ประกันไม่ครอบคลุม: ความเสียหายจากการใช้ไม่เหมาะสม
      `,
      en: `
All NIKA products include warranty:

1. Electronics: 1-2 years
2. Fashion: 3-6 months
3. Home & Living: 6-12 months
4. Beauty: 12 months

How to claim warranty:
1. Contact NIKA if product has issues within warranty period
2. Send product to us (NIKA covers shipping)
3. We'll inspect, repair, or replace
4. Ship back to you

Warranty doesn't cover: Damage from improper use
      `,
    },
  },
];
