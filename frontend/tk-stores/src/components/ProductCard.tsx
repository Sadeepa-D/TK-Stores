import { Package, Eye, Pencil, Clock, AlertTriangle } from "lucide-react";

export type ProductBatch = {
  id: string;
  quantity: number;
  expiryDate?: string | null; // ISO date string
};

export type Product = {
  pid: string;
  name: string;
  price: number;
  baseUnit: string;
  description?: string | null;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK" | string;
  batches: ProductBatch[];
};

type ProductCardProps = {
  product: Product;
  onView?: (pid: string) => void;
  onEdit?: (pid: string) => void;
};

const STATUS_STYLES: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  ACTIVE: { label: "Active", bg: "#EAF3EE", text: "#1F4038", dot: "#2F6B54" },
  INACTIVE: {
    label: "Inactive",
    bg: "#F1EFE7",
    text: "#8A968D",
    dot: "#B4AF9E",
  },
  OUT_OF_STOCK: {
    label: "Out of stock",
    bg: "#FBEAE3",
    text: "#9A3A1F",
    dot: "#C1502E",
  },
};

const LOW_STOCK_THRESHOLD = 10;
const today = new Date();

export default function ProductCard({
  product,
  onView,
  onEdit,
}: ProductCardProps) {
  const totalStock = product.batches.reduce((sum, b) => sum + b.quantity, 0);
  const isOutOfStock = product.status === "OUT_OF_STOCK" || totalStock === 0;
  const isLowStock = !isOutOfStock && totalStock <= LOW_STOCK_THRESHOLD;

  const nearestExpiryDays = product.batches
    .filter((b) => b.expiryDate)
    .map((b) =>
      Math.ceil(
        (new Date(b.expiryDate as string).getTime() - today.getTime()) /
          86400000,
      ),
    )
    .filter((d) => d >= 0)
    .sort((a, b) => a - b)[0];
  const expiringSoon =
    nearestExpiryDays !== undefined && nearestExpiryDays <= 7;

  const statusStyle = STATUS_STYLES[product.status] ?? STATUS_STYLES.ACTIVE;

  return (
    <div
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg hover:shadow-black/5"
      style={{ border: "1px solid #E7E1CD" }}
    >
      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
         <div className="flex items-center justify-between">
    <span
      className="rounded-md px-2 py-1 text-[11px] font-mono"
      style={{
        backgroundColor: "#F4EFDD",
        color: "#5B6B63",
      }}
    >
      #{product.pid}
    </span>

    <span
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium font-body"
      style={{
        backgroundColor: statusStyle.bg,
        color: statusStyle.text,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: statusStyle.dot }}
      />
      {statusStyle.label}
    </span>
  </div>
        <div>
          <h3
            className="line-clamp-1 text-[15px] font-semibold font-display"
            style={{ color: "#22302A" }}
            title={product.name}
          >
            {product.name}
          </h3>
          <p
            className="mt-1 line-clamp-2 min-h-[2.5rem] text-[13px] leading-relaxed font-body"
            style={{ color: "#6B7A72" }}
          >
            {product.description || "No description added yet."}
          </p>
        </div>

        <div
          className="border-t border-dashed"
          style={{ borderColor: "#E7E1CD" }}
        />

        {/* Price + stock */}
        <div className="flex items-end justify-between">
          <div>
            <span
              className="text-lg font-semibold font-mono"
              style={{ color: "#22302A" }}
            >
              Rs. {product.price.toFixed(2)}
            </span>
            {/* <span
              className="ml-1 text-xs font-body"
              style={{ color: "#96A69C" }}
            >
              / {product.baseUnit}
            </span> */}
          </div>
          {/* <div
            className="flex items-center gap-1.5 text-xs font-mono"
            style={{
              color: isOutOfStock
                ? "#C1502E"
                : isLowStock
                  ? "#B27B2E"
                  : "#6B7A72",
            }}
          >
            <Package className="h-3.5 w-3.5" strokeWidth={2} />
            {totalStock} {product.baseUnit}
          </div> */}
        </div>

        {/* Warning chips */}
        {/* {(isLowStock || expiringSoon) && (
          <div className="flex flex-wrap gap-1.5">
            {isLowStock && (
              <span
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium font-body"
                style={{ backgroundColor: "#FCF3E3", color: "#9A6B1F" }}
              >
                <AlertTriangle className="h-3 w-3" strokeWidth={2} />
                Low stock
              </span>
            )}
            {expiringSoon && (
              <span
                className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium font-body"
                style={{ backgroundColor: "#FCF3E3", color: "#9A6B1F" }}
              >
                <Clock className="h-3 w-3" strokeWidth={2} />
                Expires in {nearestExpiryDays}d
              </span>
            )}
          </div>
        )} */}
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 p-5 pt-0">
        <button
          type="button"
          onClick={() => onView?.(product.pid)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[13px] font-medium font-body transition-colors"
          style={{ border: "1px solid #DDD6C6", color: "#22302A" }}
        >
          <Eye className="h-3.5 w-3.5" strokeWidth={2} />
          View details
        </button>
        <button
          type="button"
          onClick={() => onEdit?.(product.pid)}
          aria-label="Edit product"
          className="flex items-center justify-center rounded-lg px-3 transition-colors"
          style={{ border: "1px solid #DDD6C6", color: "#6B7A72" }}
        >
          <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
