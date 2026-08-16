"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_REPORTS } from "@/data/mock";
import { ReportCard } from "@/components/ReportCard";
import { CATEGORIES, CITIES, ReportType } from "@/lib/types";
import { cn } from "@/lib/utils";

type TypeFilter = "ALL" | ReportType;

export function SearchPageClient() {
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [type, setType] = useState<TypeFilter>(
    (searchParams.get("type") as TypeFilter) ?? "ALL"
  );
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [city, setCity] = useState(searchParams.get("city") ?? "");

  const results = useMemo(() => {
    return MOCK_REPORTS.filter((r) => r.status === "PUBLISHED")
      .filter((r) => (type === "ALL" ? true : r.type === type))
      .filter((r) => (category ? r.category === category : true))
      .filter((r) => (city ? r.city === city : true))
      .filter((r) => {
        if (!q.trim()) return true;
        const needle = q.trim().toLowerCase();
        return (
          r.title.toLowerCase().includes(needle) ||
          r.description.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [q, type, category, city]);

  function resetFilters() {
    setQ("");
    setType("ALL");
    setCategory("");
    setCity("");
  }

  return (
    <div className="container-app py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
          البحث في البلاغات
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          استخدم الفلاتر أدناه لتضييق نتائج البحث والعثور على ما تبحث عنه
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="card sticky top-20 h-fit space-y-5 p-5">
          <div>
            <label className="label-base">كلمة البحث</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث بالعنوان أو الوصف..."
              className="input-base"
            />
          </div>

          <div>
            <span className="label-base">نوع البلاغ</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "ALL", label: "الكل" },
                { value: "LOST", label: "مفقود" },
                { value: "FOUND", label: "موجود" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setType(opt.value as TypeFilter)}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-xs font-semibold transition",
                    type === opt.value
                      ? "border-primary-500 bg-primary-500 text-white"
                      : "border-primary-100 bg-white text-gray-600 hover:bg-primary-50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="f-category" className="label-base">الفئة</label>
            <select
              id="f-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-base"
            >
              <option value="">كل الفئات</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="f-city" className="label-base">المدينة</label>
            <select
              id="f-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-base"
            >
              <option value="">كل المدن</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={resetFilters} className="btn-secondary w-full">
            إعادة تعيين الفلاتر
          </button>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-4 text-sm text-gray-500">
            {results.length} نتيجة مطابقة
          </p>

          {results.length === 0 ? (
            <div className="card flex flex-col items-center gap-3 p-12 text-center">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-gray-700">لا توجد نتائج مطابقة</h3>
              <p className="max-w-sm text-sm text-gray-500">
                جرّب تعديل كلمات البحث أو إزالة بعض الفلاتر لعرض نتائج أكثر
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
