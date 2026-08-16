"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-primary-50 text-6xl text-primary-200 sm:h-96">
        📦
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-primary-50 sm:h-96">
        <Image src={images[active]} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition",
                active === i ? "border-primary-500" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt={`${title} ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
