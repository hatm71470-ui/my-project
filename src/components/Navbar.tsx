"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/search?type=LOST", label: "المفقودات" },
  { href: "/search?type=FOUND", label: "الموجودات" },
  { href: "/search", label: "البحث" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-lg text-white shadow-soft">
            🧭
          </span>
          <span className="text-lg font-extrabold text-primary-800">لُقية</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-primary-50 hover:text-primary-700",
                pathname === link.href.split("?")[0] && "bg-primary-50 text-primary-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/report/lost/new" className="btn-outline">
            + الإبلاغ عن مفقود
          </Link>
          <Link href="/report/found/new" className="btn-accent">
            + الإبلاغ عن موجود
          </Link>
          <Link href="/login" className="btn-secondary">
            تسجيل الدخول
          </Link>
        </div>

        <button
          aria-label="فتح القائمة"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary-100 text-primary-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary-100 bg-white px-4 pb-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-primary-100 pt-3">
              <Link href="/report/lost/new" className="btn-outline w-full" onClick={() => setOpen(false)}>
                + الإبلاغ عن مفقود
              </Link>
              <Link href="/report/found/new" className="btn-accent w-full" onClick={() => setOpen(false)}>
                + الإبلاغ عن موجود
              </Link>
              <Link href="/login" className="btn-secondary w-full" onClick={() => setOpen(false)}>
                تسجيل الدخول
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
