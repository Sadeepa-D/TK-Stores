"use client";

import { useMemo, useState } from "react";
import { Search, X, PackageSearch } from "lucide-react";
import ProductCard, { type Product } from "@/components/ProductCard";

// ── Mock data — remove once your API is ready (see integration notes below) ─
const MOCK_PRODUCTS: Product[] = [
  {
    pid: "GR-1001",
    name: "Basmati Rice",
    price: 420,
    baseUnit: "kg",
    description: "Long-grain imported basmati rice, 5kg pack.",
    status: "ACTIVE",
    batches: [{ id: "b1", quantity: 84 }],
  },
  {
    pid: "GR-1002",
    name: "Red Lentils (Dhal)",
    price: 310,
    baseUnit: "kg",
    description: "Locally sourced red lentils.",
    status: "ACTIVE",
    batches: [{ id: "b2", quantity: 6 }],
  },
  {
    pid: "GR-1003",
    name: "Coconut Oil",
    price: 980,
    baseUnit: "l",
    description: "Cold-pressed pure coconut oil, 1L bottle.",
    status: "ACTIVE",
    batches: [{ id: "b3", quantity: 22, expiryDate: "2026-08-01" }],
  },
  {
    pid: "GR-1004",
    name: "Full Cream Milk Powder",
    price: 1250,
    baseUnit: "pcs",
    description: "400g tin, imported.",
    status: "OUT_OF_STOCK",
    batches: [],
  },
  {
    pid: "GR-1005",
    name: "Wheat Flour",
    price: 260,
    baseUnit: "kg",
    description: "All-purpose wheat flour, 1kg pack.",
    status: "ACTIVE",
    batches: [{ id: "b5", quantity: 140 }],
  },
  {
    pid: "GR-1006",
    name: "White Sugar",
    price: 220,
    baseUnit: "kg",
    description: "Refined white sugar, 1kg pack.",
    status: "ACTIVE",
    batches: [{ id: "b6", quantity: 58 }],
  },
  {
    pid: "GR-1007",
    name: "Ceylon Tea",
    price: 540,
    baseUnit: "pcs",
    description: "200g pack, premium black tea.",
    status: "ACTIVE",
    batches: [{ id: "b7", quantity: 9, expiryDate: "2026-07-29" }],
  },
  {
    pid: "GR-1008",
    name: "Instant Noodles",
    price: 95,
    baseUnit: "pcs",
    description: "Chicken flavour, single pack.",
    status: "INACTIVE",
    batches: [{ id: "b8", quantity: 0 }],
  },
  {
    pid: "GR-1009",
    name: "Cooking Salt",
    price: 60,
    baseUnit: "kg",
    description: "Iodized cooking salt, 1kg pack.",
    status: "ACTIVE",
    batches: [{ id: "b9", quantity: 200 }],
  },
  {
    pid: "GR-1010",
    name: "Dish Washing Liquid",
    price: 340,
    baseUnit: "pcs",
    description: "500ml bottle.",
    status: "ACTIVE",
    batches: [{ id: "b10", quantity: 31 }],
  },
];

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "ACTIVE", label: "Active" },
  { key: "LOW_STOCK", label: "Low stock" },
  { key: "OUT_OF_STOCK", label: "Out of stock" },
] as const;

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");

  // TODO: replace MOCK_PRODUCTS with your real fetch, e.g.:
  //
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  // const { token } = useAuth();
  //
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data.products))
  //     .finally(() => setLoading(false));
  // }, [token]);
  const products = MOCK_PRODUCTS;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.pid.toLowerCase().includes(query.toLowerCase());

      if (!matchesQuery) return false;

      const totalStock = p.batches.reduce((sum, b) => sum + b.quantity, 0);

      switch (filter) {
        case "ACTIVE":
          return p.status === "ACTIVE";
        case "LOW_STOCK":
          return totalStock > 0 && totalStock <= 10;
        case "OUT_OF_STOCK":
          return p.status === "OUT_OF_STOCK" || totalStock === 0;
        default:
          return true;
      }
    });
  }, [products, query, filter]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF7F0" }}>
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-semibold font-display sm:text-3xl"
            style={{ color: "#22302A" }}
          >
            Products
          </h1>
          <p className="mt-1.5 text-sm font-body" style={{ color: "#6B7A72" }}>
            Browse and manage everything currently stocked in the shop.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "#96A69C" }}
              strokeWidth={2}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or product ID…"
              className="w-full rounded-lg py-2.5 pl-10 pr-9 text-sm font-body outline-none transition-colors"
              style={{
                color: "#22302A",
                border: "1px solid #DDD6C6",
                backgroundColor: "#FFFFFF",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#16302B";
                e.target.style.boxShadow = "0 0 0 3px rgba(22,48,43,0.10)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#DDD6C6";
                e.target.style.boxShadow = "none";
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "#96A69C" }}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-medium font-body transition-colors"
                  style={{
                    backgroundColor: active ? "#16302B" : "#FFFFFF",
                    color: active ? "#F7F3E8" : "#6B7A72",
                    border: `1px solid ${active ? "#16302B" : "#DDD6C6"}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        <p className="mb-4 text-xs font-mono" style={{ color: "#96A69C" }}>
          Showing {filtered.length} of {products.length} products
        </p>

        {/* Grid — 1 col mobile up to 5 cols on xl screens */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.pid}
                product={product}
                onView={(pid) => console.log("view", pid)}
                onEdit={(pid) => console.log("edit", pid)}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
            style={{ border: "1px dashed #DDD6C6" }}
          >
            <PackageSearch
              className="h-9 w-9"
              style={{ color: "#B4AF9E" }}
              strokeWidth={1.5}
            />
            <p
              className="mt-3 text-sm font-medium font-body"
              style={{ color: "#22302A" }}
            >
              No products match your search
            </p>
            <p className="mt-1 text-xs font-body" style={{ color: "#96A69C" }}>
              Try a different name, ID, or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
