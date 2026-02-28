import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" }
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(215,209,197,0.8)] bg-[rgba(255,255,255,0.72)]">
      <div className="container-shell flex flex-col gap-6 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-[var(--foreground)]">Coin Shield</p>
          <p className="mt-1">
            Premium coin storage and protection supplies for wholesale buyers.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--foreground)]">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-[rgba(215,209,197,0.6)] py-4 text-center text-xs text-[var(--muted)]">
        Copyright © {new Date().getFullYear()} Coin Shield. All rights reserved.
      </div>
    </footer>
  );
}
