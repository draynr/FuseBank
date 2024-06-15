import React from "react";
import Sidebar from "../../../components/Sidebar";
import Image from "next/image";
import MobileNavBar from "../../../components/MobileNavBar";
import { getLoggedInUser } from "../../../lib/actions/actions";
import { Router } from "lucide-react";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logged_in = await getLoggedInUser();

  if (!logged_in) {
    redirect("/login");
  }

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
