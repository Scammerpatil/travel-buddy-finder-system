"use client";
import Link from "next/link";
import { IconCamper, IconChevronDown } from "@tabler/icons-react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  return (
    <>
      <div className="navbar px-10 py-2 bg-base-300">
        <div className="navbar-start">
          <Link href="/" className="space-x-3 flex items-center">
            <IconCamper size={50} className="text-primary" />
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Travel
                </span>
                <span className="text-accent font-semibold text-xl">Buddy</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Find Your Perfect Travel Buddy
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-end space-x-3">
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
          <Link href="/signup" className="btn btn-accent">
            Sign Up
          </Link>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
