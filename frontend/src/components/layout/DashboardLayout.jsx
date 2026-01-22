import Header from "./Header";
import React from "react";
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
