"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import MenuForm from "@/components/MenuForm";
import {
  menuAPI,
  formatRupiah,
  getCategoryLabel,
  getCategoryColor,
} from "@/lib/api";

export default function MenuPage() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      setLoading(true);
      const data = await menuAPI.getAll();
      setMenus(data);
    } catch (error) {
      console.error("Error loading menus:", error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredMenus = menus.filter((menu) => {
    const matchesSearch =
      menu.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || menu.kategori === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreate = async (formData) => {
    try {
      setFormLoading(true);
      await menuAPI.create(formData);
      showNotification("Menu berhasil ditambahkan! 🎉");
      setShowCreateModal(false);
      loadMenus();
    } catch (error) {
      showNotification(error.message || "Gagal menambahkan menu", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setShowEditModal(true);
  };

  const handleUpdate = async (formData) => {
    try {
      setFormLoading(true);
      await menuAPI.update(selectedMenu.id, formData);
      showNotification("Menu berhasil diperbarui! ✨");
      setShowEditModal(false);
      setSelectedMenu(null);
      loadMenus();
    } catch (error) {
      showNotification(error.message || "Gagal memperbarui menu", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteClick = (menu) => {
    setSelectedMenu(menu);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      setFormLoading(true);
      await menuAPI.delete(selectedMenu.id);
      showNotification("Menu berhasil dihapus! 🗑️");
      setShowDeleteModal(false);
      setSelectedMenu(null);
      loadMenus();
    } catch (error) {
      showNotification(error.message || "Gagal menghapus menu", "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleAvailability = async (menu) => {
    try {
      await menuAPI.update(menu.id, { tersedia: !menu.tersedia });
      showNotification(`Menu ${menu.tersedia ? "dinonaktifkan" : "diaktifkan"}!`);
      loadMenus();
    } catch (error) {
      showNotification("Gagal mengubah status menu", "error");
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🍽️</div>
          <p style={{ color: "#6B5B4F" }}>Memuat data menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F0" }}>
      <Header title="Kelola Menu" />

      <div style={{ padding: "24px 32px" }}>
        {/* Notification */}
        {notification && (
          <div style={{
            position: "fixed",
            top: "100px",
            right: "32px",
            zIndex: 100,
            padding: "16px 24px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            background: notification.type === "error" ? "#E74C3C" : "#27AE60",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "500"
          }}>
            <span>{notification.type === "error" ? "❌" : "✅"}</span>
            {notification.message}
          </div>
        )}

        {/* Search and Actions */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "24px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", gap: "12px", flex: 1, minWidth: "300px" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{ 
                position: "absolute", 
                left: "16px", 
                top: "50%", 
                transform: "translateY(-50%)",
                fontSize: "18px"
              }}>🔍</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari menu..."
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 48px",
                  borderRadius: "12px",
                  border: "2px solid #E5E5E5",
                  fontSize: "14px",
                  background: "#FAFAFA",
                  outline: "none"
                }}
              />
            </div>

            {/* Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: "14px 20px",
                borderRadius: "12px",
                border: "2px solid #E5E5E5",
                fontSize: "14px",
                background: "#FAFAFA",
                cursor: "pointer",
                outline: "none",
                minWidth: "160px"
              }}
            >
              <option value="all">Semua Kategori</option>
              <option value="makanan">🍛 Makanan</option>
              <option value="minuman">🥤 Minuman</option>
              <option value="dessert">🍰 Dessert</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(232, 93, 4, 0.3)"
            }}
          >
            <span>➕</span>
            Tambah Menu
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {[
            { label: "Total Menu", value: menus.length, color: "#E85D04" },
            { label: "Tersedia", value: menus.filter((m) => m.tersedia).length, color: "#27AE60" },
            { label: "Makanan", value: menus.filter((m) => m.kategori === "makanan").length, color: "#F39C12" },
            { label: "Minuman", value: menus.filter((m) => m.kategori === "minuman").length, color: "#3498DB" },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: "white",
              borderRadius: "14px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
            }}>
              <p style={{ 
                fontSize: "32px", 
                fontWeight: "bold", 
                color: stat.color,
                margin: 0
              }}>
                {stat.value}
              </p>
              <p style={{ 
                fontSize: "13px", 
                color: "#9C8B7E",
                margin: "4px 0 0 0"
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Menu Grid */}
        {filteredMenus.length === 0 ? (
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🍽️</div>
            <p style={{ 
              fontSize: "18px", 
              fontWeight: "600", 
              color: "#2D1810",
              marginBottom: "8px"
            }}>
              {searchTerm || filterCategory !== "all"
                ? "Tidak ada menu yang sesuai dengan filter"
                : "Belum ada menu"}
            </p>
            <p style={{ color: "#9C8B7E" }}>
              Klik tombol 'Tambah Menu' untuk menambahkan menu pertama Anda!
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {filteredMenus.map((menu) => {
              const categoryColor = getCategoryColor(menu.kategori);
              return (
                <div
                  key={menu.id}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "14px",
                      background: categoryColor.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: "28px" }}>
                        {menu.kategori === "makanan" ? "🍛" : menu.kategori === "minuman" ? "🥤" : "🍰"}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#2D1810",
                        margin: "0 0 6px 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {menu.nama}
                      </h3>
                      <span style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: categoryColor.bg,
                        color: categoryColor.text
                      }}>
                        {getCategoryLabel(menu.kategori)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: "14px",
                    color: "#6B5B4F",
                    margin: "0 0 16px 0",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {menu.deskripsi}
                  </p>

                  {/* Price and Status */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #F0F0F0"
                  }}>
                    <p style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#E85D04",
                      margin: 0
                    }}>
                      {formatRupiah(menu.harga)}
                    </p>
                    <button
                      onClick={() => handleToggleAvailability(menu)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        background: menu.tersedia ? "rgba(39, 174, 96, 0.15)" : "rgba(231, 76, 60, 0.15)",
                        color: menu.tersedia ? "#27AE60" : "#E74C3C"
                      }}
                    >
                      {menu.tersedia ? "✓ Tersedia" : "✕ Habis"}
                    </button>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={() => handleEdit(menu)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "rgba(52, 152, 219, 0.1)",
                        color: "#3498DB",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(menu)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        background: "rgba(231, 76, 60, 0.1)",
                        color: "#E74C3C",
                        fontWeight: "600",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="➕ Tambah Menu Baru">
        <MenuForm onSubmit={handleCreate} onCancel={() => setShowCreateModal(false)} loading={formLoading} />
      </Modal>

      <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setSelectedMenu(null); }} title="✏️ Edit Menu">
        <MenuForm menu={selectedMenu} onSubmit={handleUpdate} onCancel={() => { setShowEditModal(false); setSelectedMenu(null); }} loading={formLoading} />
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setSelectedMenu(null); }} title="🗑️ Hapus Menu" size="sm">
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(231, 76, 60, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}>
            <span style={{ fontSize: "40px" }}>⚠️</span>
          </div>
          <p style={{ fontSize: "16px", color: "#2D1810", marginBottom: "8px" }}>
            Hapus menu ini?
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#E85D04", marginBottom: "8px" }}>
            {selectedMenu?.nama}
          </p>
          <p style={{ fontSize: "14px", color: "#9C8B7E", marginBottom: "24px" }}>
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => { setShowDeleteModal(false); setSelectedMenu(null); }}
              disabled={formLoading}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "2px solid #E5E5E5",
                background: "white",
                color: "#2D1810",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Batal
            </button>
            <button
              onClick={handleDelete}
              disabled={formLoading}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#E74C3C",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                opacity: formLoading ? 0.7 : 1
              }}
            >
              {formLoading ? "⏳ Menghapus..." : "🗑️ Ya, Hapus"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
