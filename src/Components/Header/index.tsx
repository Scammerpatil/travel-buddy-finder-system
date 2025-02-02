"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import SignIn from "../Dialogs/SignIn";
import { IconCamper } from "@tabler/icons-react";

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // Submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "fixed z-[9999] bg-base-200 !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative mt-2 mx-10 flex items-center justify-between">
            <div className="max-w-full px-4">
              <Link
                href="/"
                className={`w-72 flex flex-row items-center justify-center gap-3 ${
                  sticky ? "py-5 lg:py-2" : "py-2"
                } `}
              >
                <IconCamper size={50} className="text-primary" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-baseline gap-[2px]">
                    <span className="text-primary font-extrabold text-xl">
                      Travel
                    </span>
                    <span className="text-accent font-semibold text-xl">
                      Buddy
                    </span>
                  </div>
                  <hr className="w-full border border-base-content" />
                  <span className="text-sm text-base-content/70 italic">
                    Find Your Perfect Travel Buddy
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex w-full items-center justify-end gap-14 px-4">
              <div className="lg:hidden">
                <ThemeToggler />
              </div>
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-base-content transition-all duration-300 ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-base-content transition-all duration-300 ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-base-content transition-all duration-300 ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar flex flex-col absolute right-0 z-30 w-[250px] bg-base-300 px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              usePathName === menuItem.path
                                ? "text-primary"
                                : "text-base-content hover:text-primary"
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu &&
                                menuItem.submenu.map((submenuItem, index) => (
                                  <Link
                                    href={submenuItem.path || "/"}
                                    key={index}
                                    className="block rounded py-2.5 text-sm text-dark hover:text-primary  lg:px-3"
                                  >
                                    {submenuItem.title}
                                  </Link>
                                ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Sign In and Sign Up Buttons for Mobile */}
                  <span className="flex flex-col items-center mt-4 lg:hidden">
                    <button
                      className="px-7 py-3 text-accent-content bg-accent font-medium hover:opacity-70"
                      onClick={() => {
                        (
                          document.getElementById("login") as HTMLDialogElement
                        ).showModal();
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        (
                          document.getElementById("signup") as HTMLDialogElement
                        ).showModal();
                      }}
                      className="mt-2 rounded-sm bg-primary px-7 py-3 font-medium text-primary-content shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover"
                    >
                      Sign Up
                    </button>
                  </span>
                </nav>
              </div>
              <div className="gap-5 pr-16 lg:pr-0 hidden lg:flex lg:items-center justify-end">
                {/* Sign In and Sign Up Buttons for Desktop */}
                <span className="flex gap-5">
                  <button
                    className="px-7 py-3 text-accent-content bg-accent font-medium hover:opacity-70"
                    onClick={() => {
                      (
                        document.getElementById("login") as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      (
                        document.getElementById("signup") as HTMLDialogElement
                      ).showModal();
                    }}
                    className="rounded-sm bg-primary px-7 py-3 font-medium text-primary-content shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover"
                  >
                    Sign Up
                  </button>
                </span>
                <div>
                  <ThemeToggler />
                  <SignIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
