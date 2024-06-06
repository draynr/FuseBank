import React from "react";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import MobileNavBar from "../components/MobileNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logged_in = {
    //fill in rest of the user object fields
    first_name: "John",
    last_name: "Doe",
  };
  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={logged_in} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <div>
            <MobileNavBar user={logged_in} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
