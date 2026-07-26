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
      <div className="text-2xl font-bold mb-4">All Available Products</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
