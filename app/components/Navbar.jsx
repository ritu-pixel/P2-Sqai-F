"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  };

  checkAuth(); // initial check

  // Re-run check when route changes
  const handleRouteChange = () => {
    checkAuth();
  };

  router.events?.on("routeChangeComplete", handleRouteChange);
  return () => {
    router.events?.off("routeChangeComplete", handleRouteChange);
  };
}, [router]);


  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

const handleLogout = () => {
  localStorage.removeItem("auth_token"); // ✅ CORRECT
  setIsLoggedIn(false);
  router.push("/login");
  setMobileOpen(false);
};

  if (isLoggedIn === null) {
    return (
      <nav className="sticky top-0 z-50 py-4 px-6">
        <div className="text-gray-500 text-sm">Loading navbar...</div>
      </nav>
    );
  }

  const menuItems = [];

  const addItem = (href, label) => {
    menuItems.push({ href, label });
  };

  const publicPages = ["/", "/login", "/register", "/upload", "/dashboard"];
  const isTranscribePage = pathname.startsWith("/transcribe/");

  if (pathname === "/") {
    addItem("/", "Home");
    addItem("#features", "Features");
    if (isLoggedIn) {
      addItem("/upload", "Upload");
      addItem("/dashboard", "Dashboard");
    } else {
      addItem("/login", "Login");
      addItem("/register", "Register");
    }
  } else if (pathname === "/login") {
    addItem("/", "Home");
    if (isLoggedIn) {
    } else {
      addItem("/register", "Register");
    }
  } else if (pathname === "/register") {
    addItem("/", "Home");
    if (isLoggedIn) {
    } else {
      addItem("/login", "Login");
    }
  } else if (pathname === "/upload") {
    addItem("/", "Home");
    if (isLoggedIn) {
      addItem("/dashboard", "Dashboard");
    } else {
      addItem("/login", "Login");
      addItem("/register", "Register");
    }
  } else if (pathname === "/dashboard") {
    addItem("/", "Home");
    if (isLoggedIn) {
      addItem("/upload", "Upload");
    } else {
      addItem("/login", "Login");
      addItem("/register", "Register");
    }
  } else if (isTranscribePage) {
    addItem("/", "Home");
    if (isLoggedIn) {
      addItem("/upload", "Upload");
      addItem("/dashboard", "Dashboard");
    } else {
      addItem("/login", "Login");
      addItem("/register", "Register");
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 py-4 px-6 transition-all duration-300 bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000] ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.jpg" alt="Logo" className="h-8 w-auto" />
          <span
            style={{ fontFamily: "var(--font-manrope)" }}
            className="text-2xl font-bold text-white"
          >
            Meeting Summarizer
          </span>
        </Link>

        <div className="hidden md:flex mx-auto space-x-4 bg-white/10 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full overflow-hidden shadow-md backdrop-blur-sm text-sm font-medium">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{ fontFamily: "var(--font-manrope)" }}
              className={`px-6 py-2 transition rounded-full ${
                pathname === href
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "text-gray-200 hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-full transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
        style={{ fontFamily: "var(--font-manrope)" }}
          className="md:hidden text-white ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{ fontFamily: "var(--font-manrope)" }} className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 space-y-3 text-white">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === href
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                  : "hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{ fontFamily: "var(--font-manrope)" }}
              className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
