"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { authAPI } from "@/lib/api";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!authAPI.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh",
      background: "#FFF8F0"
    }}>
      {/* Sidebar - Fixed position */}
      <Sidebar />
      
      {/* Main Content - With left margin for sidebar */}
      <main style={{ 
        flex: 1,
        marginLeft: "260px",
        minHeight: "100vh"
      }}>
        {children}
      </main>
    </div>
  );
}
