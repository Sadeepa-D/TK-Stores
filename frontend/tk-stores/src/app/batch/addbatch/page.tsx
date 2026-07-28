// pid, quantity, manufactureDate, expiryDate, value
"use client";
import React, { useState } from "react";
import { z } from "zod";
import api from "@/lib/axios";

const batchSchema = z.object({
  pid: z.string("Product ID is required"),
  startqty: z.number().min(1, "Quantity must be at least 1"),
  manufactureDate: z.date().refine(
    (date) => {
      const today = new Date();
      const inputDate = new Date(date);
      return inputDate <= today;
    },
    { message: "Manufacture date cannot be in the future" },
  ),
  expiryDate: z.date().refine(
    (date) => {
      const today = new Date();
      const inputDate = new Date(date);
      return inputDate > today;
    },
    { message: "Expiry date must be in the future" },
  ),
  value: z.number().min(0, "Value must be greater than or equal to 0"),
});

export type BatchFormData = z.infer<typeof batchSchema>;

export default function AddBatch() {
  const [formData, setFormData] = useState<BatchFormData>({
    pid: "",
    startqty: 0,
    manufactureDate: new Date(),
    expiryDate: new Date(),
    value: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = batchSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError =
        validationResult.error.issues[0]?.message || "Validation failed";
      window.alert(firstError);
      return;
    }
    try {
      setLoading(true);
      await api.post("/batches/add", formData);
      window.alert("Batch added successfully");
      setFormData({
        pid: "",
        startqty: 0,
        manufactureDate: new Date(),
        expiryDate: new Date(),
        value: 0,
      });
    } catch (error) {
      console.error("Error submitting batch:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "startqty" || id === "value" ? Number(value) : value,
      expiryDate: id === "expiryDate" ? new Date(value) : prevData.expiryDate,
      manufactureDate:
        id === "manufactureDate" ? new Date(value) : prevData.manufactureDate,
    }));
  };
  return (
    <>
      <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-xl shadow-md border border-gray-100">
        {loading && (
          <div className="text-center py-4">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
        {/* Header */}
        {!loading && (
          <>
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-500">
                Add Batch
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter the batch details below to register it into the system.
              </p>
            </div>
            {/* Form */}

            <form className="space-y-5" onSubmit={handlesubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Product ID */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    htmlFor="pid"
                  >
                    Product ID
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    id="pid"
                    type="text"
                    value={formData.pid}
                    onChange={handleChange}
                    placeholder="e.g. PRD-10293"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    htmlFor="startqty"
                  >
                    Quantity
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    id="startqty"
                    type="number"
                    value={formData.startqty}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>

                {/* Manufacture Date */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    htmlFor="manufactureDate"
                  >
                    Manufacture Date
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    id="manufactureDate"
                    type="date"
                    value={formData.manufactureDate.toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    htmlFor="expiryDate"
                  >
                    Expiry Date
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate.toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </div>

                {/* Value - Spans full width on sm screens */}
                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                    htmlFor="value"
                  >
                    Total Value ($)
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  type="submit"
                >
                  Add Batch
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
