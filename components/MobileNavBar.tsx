"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";

import SideItems from "../constants/index";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const MobileNavBar = ({
  user,
}: NavBarProps) => {
  const path_name = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            alt="nav open"
            src="icons/menu.svg"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-none bg-inherit"
        >
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex  cursor-pointer items-center gap-3 px-3 "
            >
              <Image
                alt="Logo"
                width={42}
                height={42}
                src="/icons/logo.svg"
              />
              <h1 className="text-white text-[28px] font-bold">
                fuse
              </h1>
            </Link>
            <div className="mobilenav-sheet">
              <SheetClose asChild>
                <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                  {SideItems.map(item => {
                    const isActive =
                      path_name ===
                        item.route ||
                      path_name.startsWith(
                        `${item.route}/`
                      );
                    const sideBarLabelColor =
                      "bg-slate-800";
                    return (
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "mobile_sheet_close w-full",
                          {
                            "bg-slate-800":
                              isActive,
                          }
                        )}
                      >
                        <div className="relative size-6">
                          <Image
                            src={item.img_url}
                            alt={item.label}
                            fill
                            className={cn({
                              "bg-slate-800":
                                isActive,
                            })}
                          />
                        </div>
                        <p
                          className={cn(
                            "text-white, font-semibold, text-[16px]",
                            {
                              "bg-slate-800":
                                isActive,
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
              </SheetClose>
              FOOTER
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;
