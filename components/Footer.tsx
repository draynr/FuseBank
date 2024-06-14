import React from "react";
import Image from "next/image";
import { logout } from "../lib/actions/actions";
import {
  redirect,
  useRouter,
} from "next/navigation";

const Footer = ({
  user,
  type = "desktop",
}: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const response = await logout();
    if (response) {
      router.push("/login");
    }
  };
  return (
    <footer className="footer">
      <div
        className={
          type === "mobile"
            ? "footer-name-mobile"
            : "footer-name-desktop"
        }
      >
        <p className="text-xl font-bold text-white bg-transparent">
          {user.name[0]}
        </p>
      </div>
      <div
        className={
          type === "mobile"
            ? "footer-email-mobile"
            : "footer-email-desktop"
        }
      >
        <h1 className="text-[14px] truncate font-semibold text-white">
          {user.name}
        </h1>
        <p className="truncate font-normal text-gray-300 text-[12px]">
          {user.email}
        </p>
      </div>
      <div className="footer-img">
        <Image
          onClick={handleLogOut}
          src="icons/logout.svg"
          fill
          alt="logout"
        />
      </div>
    </footer>
  );
};

export default Footer;
