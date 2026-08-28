"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { UserDTO } from "../models/User";
import { usePathname } from "next/navigation";

type HeaderNavProps = {
  authUser: UserDTO | null;
};

const HeaderNav = ({ authUser }: HeaderNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const links = [
    { href: "/#hem", label: "HEM" },
    { href: "/#helgen", label: "HELGEN" },
    { href: "/#osa", label: "OSA" },
    { href: "/#logistik", label: "LOGISTIK" },
    { href: "/#toast", label: "TOAST" },
    { href: "/#gifts", label: "GÅVOR" },
  ];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!menuOpen) {
        return;
      }

      const target = event.target;

      if (
        target instanceof Node &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 opacity-94 shadow px-4 md:px-12 bg-bg-primary">
      <div className="container mx-auto py-4 md:py-6">
        <div ref={mobileMenuRef} className="md:hidden">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-xl text-text-black"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? "Stäng" : "Meny"}
            </button>
          </div>
          {menuOpen && (
            <div
              id="mobile-nav"
              className={`mt-4 origin-top border-t border-text-black/20 pt-4 overflow-hidden transition-all duration-200 ease-out max-h-128  translate-y-0`}
            >
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded px-2 py-2 text-text-black hover:underline ${pathname === link.href ? "underline" : ""} `}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {authUser && (
                  <Link
                    href="/guests"
                    className={`rounded px-2 py-2 text-text-black hover:underline ${pathname === "#guests" ? "underline" : ""} `}
                    onClick={() => setMenuOpen(false)}
                  >
                    GÄSTLISTAN
                  </Link>
                )}
              </nav>

              <div className="testClass mt-4 border-t border-text-black/20 pt-4">
                {authUser ? (
                  <span className="block px-2 py-2 text-text-black">
                    Inloggad som: {authUser.username}
                  </span>
                ) : (
                  <Link
                    href="/login"
                    className="block py-2 text-text-black hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Logga in
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex md:items-center md:justify-center">
          <nav className="flex items-center grow-2 justify-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded p-3 mx-2 text-text-black hover:underline ${pathname === link.href ? "underline" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            {authUser && (
              <Link
                href="/guests"
                className={`rounded p-3 mx-2 text-text-black hover:underline ${pathname === "#guests" ? "underline" : ""}`}
              >
                GÄSTLISTAN
              </Link>
            )}
          </nav>

          {authUser ? (
            <span className="p-1 mx-1 text-text-black">
              Inloggad som: {authUser.username}
            </span>
          ) : (
            <Link
              href="/login"
              className="text-sm ml-auto text-text-black hover:underline"
            >
              Logga in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
