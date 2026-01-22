"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authAPI.login(formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFF8F0] relative overflow-hidden font-sans">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--accent)] opacity-10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[var(--primary)] opacity-10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Brand */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex flex-col items-center gap-4 group transition-transform hover:scale-105">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-[var(--primary)] to-[#D35400] flex items-center justify-center shadow-xl shadow-[var(--primary)]/20 rotate-3 transition-transform group-hover:rotate-0">
              <span className="text-5xl drop-shadow-md">🍽️</span>
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
                Dapoerku
              </h1>
              <p className="text-[var(--text-secondary)] font-medium text-lg">
                Dashboard Admin
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-[var(--primary)]/10 p-8 md:p-10 border border-white/50 backdrop-blur-xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Selamat Datang 👋</h2>
            <p className="text-[var(--text-secondary)] mt-2">Masuk untuk mengelola restoran Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-3 animate-pulse">
                <span className="text-lg">⚠️</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--text-primary)] ml-1">Email</label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  placeholder="admin@dapoerku.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[var(--text-primary)] ml-1">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[var(--primary)] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/10 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-[var(--primary)] to-[#D35400] hover:from-[#FF7B2E] hover:to-[var(--primary)] shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Masuk...
                </span>
              ) : (
                "Masuk Dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
              <p className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider mb-2 flex items-center gap-2">
                🔑 Akun Demo
              </p>
              <div className="space-y-1 text-sm font-mono text-[var(--secondary)]/80">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-bold select-all">admin@dapoerku.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Pass:</span>
                  <span className="font-bold select-all">admin123</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-[var(--text-muted)] font-medium">
          &copy; {new Date().getFullYear()} Dapoerku Restaurant &bull; All rights reserved.
        </p>
      </div>
    </div>
  );
}
