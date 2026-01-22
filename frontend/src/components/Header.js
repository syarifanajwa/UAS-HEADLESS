"use client";

import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

export default function Header({ title }) {
  const router = useRouter();

  const handleLogout = () => {
    authAPI.logout();
    router.push("/login");
  };

  const user = authAPI.getUser();
  
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "rgba(255, 248, 240, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "16px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      {/* Page Title */}
      <div>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#2D1810",
          margin: 0
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: "13px",
          color: "#9C8B7E",
          margin: "4px 0 0 0"
        }}>
          {today}
        </p>
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Notifications */}
        <button style={{
          position: "relative",
          padding: "10px",
          borderRadius: "12px",
          border: "none",
          background: "transparent",
          cursor: "pointer"
        }}>
          <span style={{ fontSize: "20px" }}>🔔</span>
          <span style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#E74C3C",
            border: "2px solid white"
          }}></span>
        </button>

        {/* Divider */}
        <div style={{
          height: "32px",
          width: "1px",
          background: "rgba(0,0,0,0.1)"
        }}></div>

        {/* User Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #E85D04 0%, #D35400 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(232, 93, 4, 0.3)"
          }}>
            <span style={{ fontSize: "18px" }}>👤</span>
          </div>
          <div>
            <p style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#2D1810",
              margin: 0
            }}>
              {user?.username || "Admin Dapoerku"}
            </p>
            <p style={{
              fontSize: "12px",
              color: "#9C8B7E",
              margin: 0
            }}>
              {user?.email || "admin@dapoerku.com"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: "rgba(231, 76, 60, 0.1)",
              cursor: "pointer",
              marginLeft: "8px"
            }}
            title="Logout"
          >
            <span style={{ fontSize: "18px" }}>🚪</span>
          </button>
        </div>
      </div>
    </header>
  );
}
