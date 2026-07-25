"use client";

import { useState } from "react";
import {
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { icon: Package, label: "Items in stock", value: "2,480" },
  { icon: Users, label: "Active debtors", value: "96" },
  { icon: TrendingUp, label: "Recovered this month", value: "Rs. 214,500" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = () => {};

  return (
    <div
      className="min-h-screen w-full flex flex-col lg:flex-row"
      style={{ backgroundColor: "#FAF7F0" }}
    >
      {/* ============ LEFT — LEDGER PANEL ============ */}
      <div
        className="hidden lg:flex lg:w-[44%] relative flex-col justify-between p-12 xl:p-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #1F4038 0%, #16302B 60%, #122A25 100%)",
        }}
      >
        {/* ledger ruling lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 34px, #F4EFDD 34px, #F4EFDD 35px)",
          }}
        />
        {/* perforated seam against the form panel */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-[2px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #FAF7F0 2px, transparent 2.2px)",
            backgroundSize: "2px 16px",
            backgroundRepeat: "repeat-y",
          }}
        />

        {/* brand + headline */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="h-11 w-11 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#D4A24C" }}
            >
              <Store
                className="h-5 w-5"
                style={{ color: "#16302B" }}
                strokeWidth={2.25}
              />
            </div>
            <span
              className="text-[13px] tracking-[0.22em] uppercase font-mono"
              style={{ color: "#D4A24C" }}
            >
              TK Stores
            </span>
          </div>

          <h1
            className="mt-14 text-[2.5rem] xl:text-[2.9rem] leading-[1.1] font-semibold font-display"
            style={{ color: "#F7F3E8" }}
          >
            Every crate counted.
            <br />
            Every rupee tracked.
          </h1>

          <p
            className="mt-5 max-w-sm text-[15px] leading-relaxed font-body"
            style={{ color: "#A9BDB3" }}
          >
            Sign in to manage stock, settle debtor accounts, and keep the shop
            books in order — all from one ledger.
          </p>
        </div>

        {/* receipt-style stats */}
        <div className="relative z-10 mt-14 space-y-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon
                className="h-4 w-4 shrink-0"
                style={{ color: "#D4A24C" }}
                strokeWidth={2}
              />
              <span
                className="text-[13px] whitespace-nowrap font-mono"
                style={{ color: "#CFE0D8" }}
              >
                {label}
              </span>
              <span
                className="flex-1 border-b border-dotted mx-1"
                style={{ borderColor: "#3E5B51" }}
              />
              <span
                className="text-[13px] font-mono"
                style={{ color: "#F4EFDD" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <p
          className="relative z-10 mt-14 text-xs font-mono"
          style={{ color: "#5C7268" }}
        >
          © {new Date().getFullYear()} TK Stores — Store use only
        </p>
      </div>

      {/* ============ RIGHT — FORM PANEL ============ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          {/* mobile-only brand row */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#16302B" }}
            >
              <Store
                className="h-5 w-5"
                style={{ color: "#D4A24C" }}
                strokeWidth={2.25}
              />
            </div>
            <span
              className="text-[13px] tracking-[0.22em] uppercase font-mono"
              style={{ color: "#16302B" }}
            >
              TK Stores
            </span>
          </div>

          {/* card */}
          <div
            className="rounded-[20px] p-8 sm:p-10 shadow-xl shadow-black/5"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E1CD" }}
          >
            <h2
              className="text-2xl font-semibold font-display"
              style={{ color: "#22302A" }}
            >
              Welcome back
            </h2>
            <p
              className="mt-1.5 text-sm font-body"
              style={{ color: "#6B7A72" }}
            >
              Sign in to your shop dashboard
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-medium uppercase tracking-wider font-mono mb-1.5"
                  style={{ color: "#8A968D" }}
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5"
                    style={{ color: "#96A69C" }}
                    strokeWidth={2}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@tkstores.lk"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm font-body outline-none transition-colors"
                    style={{
                      color: "#22302A",
                      border: "1px solid #DDD6C6",
                      backgroundColor: "#FCFAF4",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#16302B";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(22,48,43,0.10)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DDD6C6";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-medium uppercase tracking-wider font-mono"
                    style={{ color: "#8A968D" }}
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5"
                    style={{ color: "#96A69C" }}
                    strokeWidth={2}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-lg text-sm font-body outline-none transition-colors"
                    style={{
                      color: "#22302A",
                      border: "1px solid #DDD6C6",
                      backgroundColor: "#FCFAF4",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#16302B";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(22,48,43,0.10)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DDD6C6";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "#96A69C" }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4.5 w-4.5" strokeWidth={2} />
                    ) : (
                      <Eye className="h-4.5 w-4.5" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setRemember((r) => !r)}
                  className="h-[18px] w-[18px] rounded flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    backgroundColor: remember ? "#16302B" : "transparent",
                    border: `1.5px solid ${remember ? "#16302B" : "#C9C2AE"}`,
                  }}
                  aria-pressed={remember}
                  aria-label="Remember me"
                >
                  {remember && (
                    <Check
                      className="h-3 w-3"
                      style={{ color: "#D4A24C" }}
                      strokeWidth={3}
                    />
                  )}
                </button>
                <span
                  className="text-sm font-body select-none cursor-pointer"
                  style={{ color: "#4E5D55" }}
                  onClick={() => setRemember((r) => !r)}
                >
                  Keep me signed in on this device
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-semibold text-sm font-body flex items-center justify-center gap-2 transition-all group"
                style={{
                  background:
                    "linear-gradient(135deg, #1F4038 0%, #16302B 100%)",
                  color: "#F7F3E8",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 20px -6px rgba(22,48,43,0.45)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Sign in
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                />
              </button>
            </form>
          </div>

          {/* footer note */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <ShieldCheck
              className="h-3.5 w-3.5"
              style={{ color: "#96A69C" }}
              strokeWidth={2}
            />
            <span className="text-xs font-mono" style={{ color: "#96A69C" }}>
              Developed with ❤️ by
              <a
                href="https://github.com/Sadeepa-D"
                className="underline underline-offset-2 ml-1"
                target="_blank"
              >
                Sadeepa-D
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
