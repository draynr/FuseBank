import React from "react";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logged_in = {
    first_name: "John",
    last_name: "Doe",
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={logged_in} /> {children}
    </main>
  );
}
