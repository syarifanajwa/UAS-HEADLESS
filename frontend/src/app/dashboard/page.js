"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { menuAPI, formatRupiah, authAPI } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMenu: 0,
    menuAktif: 0,
    kategoriMakanan: 0,
    kategoriMinuman: 0,
  });
  const [recentMenus, setRecentMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const menus = await menuAPI.getAll();
      
      setStats({
        totalMenu: menus.length,
        menuAktif: menus.filter((m) => m.tersedia).length,
        kategoriMakanan: menus.filter((m) => m.kategori === "makanan").length,
        kategoriMinuman: menus.filter((m) => m.kategori === "minuman").length,
      });

      setRecentMenus(menus.slice(0, 5));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const user = authAPI.getUser();

  const statCards = [
    { title: "Total Menu", value: stats.totalMenu, icon: "📋", color: "#E85D04" },
    { title: "Menu Aktif", value: stats.menuAktif, icon: "✅", color: "#27AE60" },
    { title: "Makanan", value: stats.kategoriMakanan, icon: "🍛", color: "#F39C12" },
    { title: "Minuman", value: stats.kategoriMinuman, icon: "🥤", color: "#3498DB" },
  ];

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "#FFF8F0"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🍽️</div>
          <p style={{ color: "#6B5B4F" }}>Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F0" }}>
      <Header title="Dashboard" />
      
      <div style={{ padding: "24px 32px" }}>
        {/* Welcome Section */}
        <div style={{
          background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
          borderRadius: "20px",
          padding: "32px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(232, 93, 4, 0.25)"
        }}>
          {/* Background decoration */}
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)"
          }}></div>
          
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h2 style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "white",
                margin: "0 0 8px 0"
              }}>
                Selamat Datang, {user?.username || "Admin"}! 👋
              </h2>
              <p style={{
                fontSize: "15px",
                color: "rgba(255,255,255,0.85)",
                margin: 0
              }}>
                Kelola restoran Dapoerku dengan mudah melalui dashboard ini.
              </p>
            </div>
            <div style={{ fontSize: "80px", opacity: 0.8 }}>🍲</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "24px"
        }}>
          {statCards.map((stat) => (
            <div key={stat.title} style={{
              background: "white",
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: `${stat.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <span style={{ fontSize: "28px" }}>{stat.icon}</span>
              </div>
              <div>
                <p style={{ 
                  fontSize: "13px", 
                  color: "#9C8B7E", 
                  margin: "0 0 4px 0" 
                }}>
                  {stat.title}
                </p>
                <p style={{ 
                  fontSize: "32px", 
                  fontWeight: "bold", 
                  color: stat.color, 
                  margin: 0 
                }}>
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px"
        }}>
          {/* Recent Menus */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px"
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#2D1810", margin: 0 }}>
                Menu Terbaru
              </h3>
              <Link href="/dashboard/menu" style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#E85D04",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "rgba(232, 93, 4, 0.1)"
              }}>
                Lihat Semua →
              </Link>
            </div>

            {recentMenus.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
                <p style={{ color: "#9C8B7E", marginBottom: "16px" }}>Belum ada menu</p>
                <Link href="/dashboard/menu" style={{
                  display: "inline-block",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
                  color: "white",
                  fontWeight: "600",
                  textDecoration: "none"
                }}>
                  Tambah Menu Pertama
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentMenus.map((menu) => (
                  <div key={menu.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#FAFAFA"
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: menu.kategori === "makanan" ? "rgba(243, 156, 18, 0.15)"
                        : menu.kategori === "minuman" ? "rgba(52, 152, 219, 0.15)"
                        : "rgba(219, 39, 119, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "24px" }}>
                        {menu.kategori === "makanan" ? "🍛" : menu.kategori === "minuman" ? "🥤" : "🍰"}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: "600",
                        color: "#2D1810",
                        margin: "0 0 2px 0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {menu.nama}
                      </p>
                      <p style={{
                        fontSize: "13px",
                        color: "#9C8B7E",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {menu.deskripsi}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: "bold", color: "#E85D04", margin: "0 0 4px 0" }}>
                        {formatRupiah(menu.harga)}
                      </p>
                      <span style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontWeight: "600",
                        background: menu.tersedia ? "rgba(39, 174, 96, 0.15)" : "rgba(231, 76, 60, 0.15)",
                        color: menu.tersedia ? "#27AE60" : "#E74C3C"
                      }}>
                        {menu.tersedia ? "Tersedia" : "Habis"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#2D1810", margin: "0 0 20px 0" }}>
              Aksi Cepat
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/dashboard/menu" style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(232, 93, 4, 0.1)",
                textDecoration: "none"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(232, 93, 4, 0.3)"
                }}>
                  <span style={{ fontSize: "20px" }}>➕</span>
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#2D1810", margin: "0 0 2px 0" }}>Tambah Menu</p>
                  <p style={{ fontSize: "13px", color: "#9C8B7E", margin: 0 }}>Buat menu baru</p>
                </div>
              </Link>

              <Link href="/dashboard/menu" style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(39, 174, 96, 0.1)",
                textDecoration: "none"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #27AE60 0%, #1E8449 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)"
                }}>
                  <span style={{ fontSize: "20px" }}>📋</span>
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#2D1810", margin: "0 0 2px 0" }}>Kelola Menu</p>
                  <p style={{ fontSize: "13px", color: "#9C8B7E", margin: 0 }}>Edit atau hapus menu</p>
                </div>
              </Link>

              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px",
                borderRadius: "12px",
                background: "rgba(52, 152, 219, 0.1)",
                opacity: 0.6
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3498DB 0%, #2874A6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <span style={{ fontSize: "20px" }}>📊</span>
                </div>
                <div>
                  <p style={{ fontWeight: "600", color: "#2D1810", margin: "0 0 2px 0" }}>Laporan</p>
                  <p style={{ fontSize: "13px", color: "#9C8B7E", margin: 0 }}>Segera hadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
