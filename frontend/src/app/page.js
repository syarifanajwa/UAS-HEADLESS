"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: "#FFF8F0", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(255, 248, 240, 0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(232, 93, 4, 0.3)"
            }}>
              <span style={{ fontSize: "24px" }}>🍽️</span>
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold", color: "#E85D04" }}>Dapoerku</span>
          </div>
          
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <a href="#beranda" style={{ color: "#6B5B4F", fontWeight: "500", textDecoration: "none" }}>Beranda</a>
            <a href="#fitur" style={{ color: "#6B5B4F", fontWeight: "500", textDecoration: "none" }}>Fitur</a>
            <a href="#tentang" style={{ color: "#6B5B4F", fontWeight: "500", textDecoration: "none" }}>Tentang</a>
          </nav>

          <Link href="/login" style={{
            background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(232, 93, 4, 0.3)"
          }}>
            Masuk Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "linear-gradient(180deg, #FFF8F0 0%, #FFFFFF 100%)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center"
        }}>
          {/* Hero Content */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "100px",
              background: "#FFE4CC",
              color: "#D35400",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "24px"
            }}>
              🌟 Restoran Tradisional Modern
            </div>
            
            <h1 style={{
              fontSize: "48px",
              fontWeight: "bold",
              lineHeight: "1.2",
              color: "#2D1810",
              marginBottom: "24px"
            }}>
              Selamat Datang di{" "}
              <span style={{ color: "#E85D04" }}>Dapoerku</span>
            </h1>
            
            <p style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#6B5B4F",
              marginBottom: "32px"
            }}>
              Nikmati kemudahan mengelola restoran Anda dengan dashboard modern. 
              Kelola menu, pantau statistik, dan tingkatkan efisiensi operasional.
            </p>
            
            <div style={{ display: "flex", gap: "16px" }}>
              <Link href="/login" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
                color: "white",
                padding: "16px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(232, 93, 4, 0.3)"
              }}>
                🚀 Masuk Dashboard
              </Link>
              <a href="#fitur" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                color: "#E85D04",
                padding: "16px 32px",
                borderRadius: "12px",
                fontWeight: "600",
                fontSize: "16px",
                textDecoration: "none",
                border: "2px solid #E85D04"
              }}>
                Lihat Fitur
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(232, 93, 4, 0.1)"
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(244, 162, 97, 0.15)"
            }}></div>
            
            <div style={{
              position: "relative",
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "100px", marginBottom: "16px" }}>🍲</div>
              <h3 style={{ fontSize: "24px", fontWeight: "bold", color: "#2D1810", marginBottom: "8px" }}>
                Masakan Nusantara
              </h3>
              <p style={{ color: "#6B5B4F" }}>Dibuat dengan cinta dan bahan terbaik</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" style={{ padding: "80px 0", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#2D1810", marginBottom: "16px" }}>
              Fitur Dashboard
            </h2>
            <p style={{ fontSize: "18px", color: "#6B5B4F", maxWidth: "600px", margin: "0 auto" }}>
              Kelola restoran Anda dengan mudah menggunakan fitur-fitur canggih kami
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px"
          }}>
            {/* Feature 1 */}
            <div style={{
              background: "#FFF8F0",
              borderRadius: "20px",
              padding: "32px",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 8px 20px rgba(232, 93, 4, 0.3)"
              }}>
                <span style={{ fontSize: "28px" }}>📋</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#2D1810", marginBottom: "12px" }}>
                Kelola Menu
              </h3>
              <p style={{ color: "#6B5B4F", lineHeight: "1.6" }}>
                Tambah, edit, dan hapus menu dengan mudah. Atur harga, kategori, dan ketersediaan menu.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: "#FFF8F0",
              borderRadius: "20px",
              padding: "32px"
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #F4A261 0%, #E85D04 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 8px 20px rgba(244, 162, 97, 0.3)"
              }}>
                <span style={{ fontSize: "28px" }}>📊</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#2D1810", marginBottom: "12px" }}>
                Dashboard Statistik
              </h3>
              <p style={{ color: "#6B5B4F", lineHeight: "1.6" }}>
                Pantau performa restoran dengan statistik real-time dan laporan komprehensif.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: "#FFF8F0",
              borderRadius: "20px",
              padding: "32px"
            }}>
              <div style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #6B4423 0%, #4A2F18 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
                boxShadow: "0 8px 20px rgba(107, 68, 35, 0.3)"
              }}>
                <span style={{ fontSize: "28px" }}>🔐</span>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#2D1810", marginBottom: "12px" }}>
                Keamanan Terjamin
              </h3>
              <p style={{ color: "#6B5B4F", lineHeight: "1.6" }}>
                Sistem login yang aman untuk melindungi data restoran Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" style={{ padding: "80px 0", background: "#FFF8F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center"
          }}>
            <div>
              <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "#2D1810", marginBottom: "24px" }}>
                Tentang Dapoerku
              </h2>
              <p style={{ fontSize: "16px", color: "#6B5B4F", lineHeight: "1.8", marginBottom: "16px" }}>
                Dapoerku adalah sistem manajemen restoran modern yang dirancang khusus untuk membantu 
                pemilik restoran Indonesia mengelola bisnis mereka dengan lebih efisien.
              </p>
              <p style={{ fontSize: "16px", color: "#6B5B4F", lineHeight: "1.8", marginBottom: "32px" }}>
                Dengan antarmuka yang intuitif dan fitur lengkap, Anda dapat fokus pada hal yang 
                paling penting - menyajikan makanan lezat untuk pelanggan Anda.
              </p>
              <Link href="/login" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
                color: "white",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(232, 93, 4, 0.3)"
              }}>
                Mulai Sekarang →
              </Link>
            </div>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px"
            }}>
              {[
                { value: "50+", label: "Menu Tersedia", color: "#E85D04" },
                { value: "1000+", label: "Pelanggan Puas", color: "#27AE60" },
                { value: "5⭐", label: "Rating", color: "#F39C12" },
                { value: "24/7", label: "Support", color: "#3498DB" }
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "white",
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ fontSize: "32px", fontWeight: "bold", color: stat.color, marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <p style={{ color: "#6B5B4F", fontSize: "14px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#2D1810", padding: "32px 0" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "#E85D04",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "18px" }}>🍽️</span>
            </div>
            <span style={{ fontWeight: "bold", color: "white" }}>Dapoerku</span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
            © 2026 Dapoerku. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
