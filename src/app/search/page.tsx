import { Suspense } from "react";
import { SearchPageClient } from "@/components/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-app py-20 text-center text-gray-400">جاري التحميل...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
