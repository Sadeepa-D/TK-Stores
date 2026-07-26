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
  return (
    <>
      <div className="border rounded-lg p-4">
        <div>Product Name: {product.name}</div>
        <div>Product ID: {product.pid}</div>
        <div>Product Price: {product.price}</div>
        <div>Product Description: {product.description}</div>
        <div> Base unit: {product.baseunit}</div>
        <div>Status: {product.status}</div>
        <div>
          Batches:
          {product.batches.map((batch) => (
            <div key={batch.id}>{batch.batchNumber}</div>
          ))}
        </div>
      </div>
    </>
  );
}
