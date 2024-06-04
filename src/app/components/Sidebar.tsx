"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SideItems from "../../../constants/index";
import { cn } from "../../../libs/utils";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }: SideProps) => {
  const path_name = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link
          href="/"
          className="mb-12 cursor-pointer items-center gap-2"
        >
          <Image
            alt="Logo"
            width={42}
            height={42}
            src="/icons/logo.svg"
            className="size-[42px] max-xl:size-14"
          />
          <h1 className="sidebar-label">
            FuseBank
          </h1>
        </Link>
        {SideItems.map(item => {
          const isActive =
            path_name === item.route ||
            path_name.startsWith(
              `${item.route}/`
            );
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient": isActive,
              })}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
