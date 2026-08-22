'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  maxQuantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Minus size={18} />
      </button>

      <input
        type="number"
        inputMode="numeric"
        value={quantity}
        onChange={handleInputChange}
        className="no-spinner w-12 px-0 py-2 text-center font-semibold border-0 focus:outline-none focus:ring-0"
        min="1"
        max={maxQuantity}
      />

      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}
