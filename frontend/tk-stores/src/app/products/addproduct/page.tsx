"use client";
import React, { useState } from "react";
import { z } from "zod";
import api from "@/lib/axios";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  baseunit: z.enum(
    [
      "KG",
      "G",
      "LITER",
      "MILILITER",
      "METERS",
      "CENTIMETERS",
      "PIECE",
      "BOX",
      "PACKETS",
    ],
    {
      message:
        "Base unit must be one of the following: KG, G, LITER, MILILITER, METERS, CENTIMETERS, PIECE, BOX, PACKETS",
    },
  ),
});

export type ProductFormData = z.infer<typeof productSchema>;

export default function Page() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    baseunit: "KG",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validatedData = productSchema.safeParse(formData);
      if (!validatedData.success) {
        throw new Error("Invalid product data");
      }
      await api.post("/products/add", validatedData.data);
      window.alert("Product added successfully: ");
      setFormData({
        name: "",
        description: "",
        price: 0,
        baseunit: "KG",
      });
    } catch (error) {
      console.error("Error adding product. Please try again: " + error);
      window.alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };
  return (
    <div className="max-w-lg mx-auto m-6 p-6 border rounded-lg shadow-sm bg-white">
      {!loading && (
        <>
          <h1 className="text-xl font-bold mb-4">Product Add form</h1>
          <form onSubmit={addProduct} className="space-y-4">
            <table className="w-full border-collapse mb-4">
              <tbody>
                <tr>
                  <th className="py-2 pr-4 text-left font-medium text-gray-700">
                    Name
                  </th>
                  <td className="py-2">
                    <input
                      name="name"
                      type="text"
                      value={formData.name}
                        onChange={handleInputChange}
                      placeholder="e.g. Organic Apples"
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>

                <tr>
                  <th className="py-2 pr-4 text-left font-medium text-gray-700 align-top pt-3">
                    Description
                  </th>
                  <td className="py-2">
                    <textarea
                      name="description"
                      rows={2}
                      value={formData.description}
                        onChange={handleInputChange}
                      placeholder="Brief details..."
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </td>
                </tr>

                <tr>
                  <th className="py-2 pr-4 text-left font-medium text-gray-700">
                    Price
                  </th>
                  <td className="py-2">
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                        onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>

                <tr>
                  <th className="py-2 pr-4 text-left font-medium text-gray-700">
                    Base Unit
                  </th>
                  <td className="py-2">
                    <select
                      name="baseunit"
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.baseunit}
                        onChange={handleInputChange}
                    >
                      <option value="KG">KG</option>
                      <option value="G">G</option>
                      <option value="LITER">LITER</option>
                      <option value="MILILITER">MILILITER</option>
                      <option value="METERS">METERS</option>
                      <option value="CENTIMETERS">CENTIMETERS</option>
                      <option value="PIECE">PIECE</option>
                      <option value="BOX">BOX</option>
                      <option value="PACKETS">PACKETS</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Add Product
            </button>
          </form>
        </>
      )}

      {loading && (
        <p className="text-center text-gray-500">Adding product...</p>
      )}
    </div>
  );
}
