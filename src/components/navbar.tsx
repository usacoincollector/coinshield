"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(215,209,197,0.8)] bg-[rgba(248,246,241,0.9)] backdrop-blur-xl">
      <div className="container-shell py-4">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[rgba(184,135,28,0.18)] bg-white">
              <Image
                src="/logo.png"
                alt="Coin Shield logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Coin Shield</p>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                Manufacturer
              </p>
            </div>
          </Link>
        </div>

        <nav className="mt-4 flex flex-wrap items-center gap-3 border-t border-[rgba(215,209,197,0.7)] pt-4 md:mt-0 md:border-0 md:pt-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                  ? "page"
                  : undefined
              }
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`))
                  ? "bg-[rgba(184,135,28,0.12)] text-[var(--accent-strong)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
