"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SideItems from "../constants/index";
import { cn } from "../lib/utils";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const Sidebar = ({ user }: SideProps) => {
  const path_name = usePathname();
  return (
    <section className="sidebar">
      <>
        <nav className="flex flex-col gap-3">
          <Link
            href="/"
            className="flex mb-12 cursor-pointer items-center gap-2"
          >
            <Image
              alt="Logo"
              width={42}
              height={42}
              src="/icons/logo.svg"
              className="size-[42px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">
              fuse
            </h1>
          </Link>
          {SideItems.map(item => {
            const isActive =
              path_name === item.route ||
              path_name.startsWith(
                `${item.route}/`
              );
            const sideBarLabelColor =
              "bg-slate-800";
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn("sidebar-link", {
                  "bg-slate-800": isActive,
                })}
              >
                <div className="relative size-6">
                  <Image
                    src={item.img_url}
                    alt={item.label}
                    fill
                    className={cn({
                      "bg-slate-800": isActive,
                    })}
                  />
                </div>
                <p
                  className={cn(
                    "sidebar-label",
                    {
                      "bg-slate-800": isActive,
                    }
                  )}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
          USER
        </nav>
        <Footer type="mobile" user={user} />
      </>
    </section>
  );
};
export default Sidebar;
