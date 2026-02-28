import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell py-20">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
        <p className="font-[family-name:var(--font-serif)] text-sm uppercase tracking-[0.3em] text-[var(--accent-strong)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          The page you requested was not found
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          Use the product catalog or wholesale inquiry page to continue.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d141b]"
          >
            View Products
          </Link>
          <Link
            href="/wholesale"
            className="rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
          >
            Wholesale Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
