"use client";

import { useState, useEffect } from "react";

export default function MenuForm({ menu, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    kategori: "makanan",
    tersedia: true,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (menu) {
      setFormData({
        nama: menu.nama || "",
        deskripsi: menu.deskripsi || "",
        harga: menu.harga?.toString() || "",
        kategori: menu.kategori || "makanan",
        tersedia: menu.tersedia ?? true,
      });
    }
  }, [menu]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama menu wajib diisi";
    }

    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = "Deskripsi wajib diisi";
    }

    if (!formData.harga) {
      newErrors.harga = "Harga wajib diisi";
    } else if (isNaN(formData.harga) || Number(formData.harga) <= 0) {
      newErrors.harga = "Harga harus berupa angka positif";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        harga: Number(formData.harga),
      });
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg border-2 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all";
  const getBorderColor = (error) => error ? "border-red-500 bg-red-50" : "border-gray-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Nama Menu */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nama" className="text-sm font-bold text-gray-700">
          Nama Menu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className={`${inputClasses} ${getBorderColor(errors.nama)}`}
          placeholder="Contoh: Nasi Goreng Spesial"
        />
        {errors.nama && (
          <p className="text-xs font-medium text-red-500 flex items-center gap-1">
            ⚠️ {errors.nama}
          </p>
        )}
      </div>

      {/* Deskripsi */}
      <div className="flex flex-col gap-2">
        <label htmlFor="deskripsi" className="text-sm font-bold text-gray-700">
          Deskripsi <span className="text-red-500">*</span>
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          rows={3}
          className={`${inputClasses} resize-none ${getBorderColor(errors.deskripsi)}`}
          placeholder="Deskripsi singkat menu..."
        />
        {errors.deskripsi && (
          <p className="text-xs font-medium text-red-500 flex items-center gap-1">
            ⚠️ {errors.deskripsi}
          </p>
        )}
      </div>

      {/* Harga dan Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Harga */}
        <div className="flex flex-col gap-2">
          <label htmlFor="harga" className="text-sm font-bold text-gray-700">
            Harga (Rp) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className={`${inputClasses} ${getBorderColor(errors.harga)}`}
            placeholder="25000"
            min="0"
          />
          {errors.harga && (
            <p className="text-xs font-medium text-red-500 flex items-center gap-1">
              ⚠️ {errors.harga}
            </p>
          )}
        </div>

        {/* Kategori */}
        <div className="flex flex-col gap-2">
          <label htmlFor="kategori" className="text-sm font-bold text-gray-700">
            Kategori
          </label>
          <div className="relative">
            <select
              id="kategori"
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer pr-10`}
            >
              <option value="makanan">🍛 Makanan</option>
              <option value="minuman">🥤 Minuman</option>
              <option value="dessert">🍰 Dessert</option>
            </select>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Ketersediaan */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 transition-colors hover:bg-white hover:border-gray-200 hover:shadow-sm">
        <div className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="tersedia"
            id="tersedia"
            checked={formData.tersedia}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
        </div>
        <label htmlFor="tersedia" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
          Menu tersedia untuk dijual
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-100 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          disabled={loading}
        >
          Batal
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-light)] hover:to-[var(--primary)] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </span>
          ) : (
            <span>{menu ? "Simpan Perubahan" : "Tambah Menu"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
