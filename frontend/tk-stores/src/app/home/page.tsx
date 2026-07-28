import React from "react";
import ProductCard from "../_components/ProductCard";
import api from "@/lib/axios";

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

export default async function Homepage() {
  const response = await api.get("/products/viewall");
  const products: product[] = await response.data.data;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              All Available Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Browse through active inventory items and batch details.
            </p>
          </div>
          <span className="text-sm font-semibold bg-amber-100 text-amber-800 py-1 px-3 rounded-full">
            {products.length} Products
          </span>
        </div>

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
