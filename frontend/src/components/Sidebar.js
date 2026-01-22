"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "Menu Makanan",
    href: "/dashboard/menu",
    icon: "🍽️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      width: "260px",
      background: "linear-gradient(180deg, #2D1810 0%, #1a0f0a 100%)",
      display: "flex",
      flexDirection: "column",
      zIndex: 40,
      boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
    }}>
      {/* Logo */}
      <div style={{ padding: "24px" }}>
        <Link href="/dashboard" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          textDecoration: "none"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(232, 93, 4, 0.4)"
          }}>
            <span style={{ fontSize: "24px" }}>🍽️</span>
          </div>
          <div>
            <span style={{ 
              fontSize: "20px", 
              fontWeight: "bold", 
              color: "white",
              display: "block"
            }}>Dapoerku</span>
            <span style={{ 
              fontSize: "11px", 
              color: "rgba(255,255,255,0.5)"
            }}>Restaurant Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div style={{ 
        margin: "0 16px", 
        height: "1px", 
        background: "rgba(255,255,255,0.1)" 
      }}></div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "16px" }}>
        <p style={{ 
          fontSize: "11px", 
          fontWeight: "600", 
          color: "rgba(255,255,255,0.4)", 
          textTransform: "uppercase",
          letterSpacing: "1px",
          padding: "0 12px",
          marginBottom: "12px"
        }}>
          Menu Utama
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: isActive 
                    ? "linear-gradient(135deg, #E85D04 0%, #D35400 100%)" 
                    : "transparent",
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  boxShadow: isActive ? "0 4px 12px rgba(232, 93, 4, 0.4)" : "none"
                }}
              >
                <span style={{ fontSize: "20px" }}>{item.icon}</span>
                <span style={{ fontWeight: "500" }}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div style={{ 
        padding: "16px", 
        borderTop: "1px solid rgba(255,255,255,0.1)" 
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.05)"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ fontSize: "18px" }}>👤</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ 
              fontSize: "14px", 
              fontWeight: "600", 
              color: "white",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>Admin Dapoerku</p>
            <p style={{ 
              fontSize: "12px", 
              color: "rgba(255,255,255,0.5)",
              margin: 0
            }}>Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
