import React from "react";

type product = {
  id: string;
  name: string;
  pid: string;
  price: number;
  description: string;
  baseunit: string;
  status: string;
  batches: {
    id: string;
    batchNumber: string;
  }[];
};

type ProductCardProps = {
  product: product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isStatusActive = product.status?.toLowerCase() === "active";
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between overflow-hidden">
        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Top Meta: PID + Status Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
              {product.pid}
            </span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider ${
                isStatusActive
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {product.status}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Price & Unit Meta */}
          <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
            <span className="text-xl font-bold text-amber-600">
              ${Number(product.price).toFixed(2)}
            </span>
            <span className="text-xs font-medium text-gray-500">
              Per {product.baseunit}
            </span>
          </div>

          {/* Batches Pill List */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
              <span>Batches</span>
              <span className="text-gray-400 font-normal">
                ({product.batches?.length || 0})
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {product.batches && product.batches.length > 0 ? (
                product.batches.map((batch) => (
                  <span
                    key={batch.id}
                    className="text-[11px] bg-amber-50 text-amber-700 border border-amber-200 font-mono px-2 py-0.5 rounded"
                  >
                    {batch.batchNumber}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No active batches
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Action Footer */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-right">
          <button className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </>
  );
}
