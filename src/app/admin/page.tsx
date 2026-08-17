"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MOCK_REPORTS } from "@/data/mock";
import { TypeBadge, StatusBadge } from "@/components/Badge";
import { Report, ReportStatus, categoryLabel } from "@/lib/types";
import { formatArabicDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatusFilter = "ALL" | ReportStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "الكل" },
  { value: "PENDING", label: "قيد المراجعة" },
  { value: "PUBLISHED", label: "منشور" },
  { value: "RESOLVED", label: "تم الحل" },
  { value: "REJECTED", label: "مرفوض" },
];

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return reports
      .filter((r) => (statusFilter === "ALL" ? true : r.status === statusFilter))
      .filter((r) =>
        query.trim() ? r.title.toLowerCase().includes(query.trim().toLowerCase()) : true
      )
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  }, [reports, statusFilter, query]);

  function updateStatus(id: string, status: ReportStatus) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function removeReport(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  const counts = useMemo(() => {
    return {
      total: reports.length,
      pending: reports.filter((r) => r.status === "PENDING").length,
      published: reports.filter((r) => r.status === "PUBLISHED").length,
      resolved: reports.filter((r) => r.status === "RESOLVED").length,
    };
  }, [reports]);

  return (
    <div className="container-app py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 sm:text-3xl">
            لوحة إدارة البلاغات
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            راجع البلاغات الواردة، وافق عليها أو ارفضها، وتابع الحالات المحلولة
          </p>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MiniStat label="إجمالي البلاغات" value={counts.total} icon="📊" />
        <MiniStat label="قيد المراجعة" value={counts.pending} icon="⏳" />
        <MiniStat label="منشورة" value={counts.published} icon="📢" />
        <MiniStat label="تم حلها" value={counts.resolved} icon="🤝" />
      </div>

      <div className="card p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                  statusFilter === tab.value
                    ? "bg-primary-600 text-white"
                    : "bg-primary-50 text-primary-700 hover:bg-primary-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث بعنوان البلاغ..."
            className="input-base sm:max-w-xs"
          />
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[820px] text-right text-sm">
            <thead>
              <tr className="border-b border-primary-100 text-gray-400">
                <th className="py-3 font-medium">البلاغ</th>
                <th className="py-3 font-medium">النوع</th>
                <th className="py-3 font-medium">الفئة</th>
                <th className="py-3 font-medium">المدينة</th>
                <th className="py-3 font-medium">التاريخ</th>
                <th className="py-3 font-medium">الحالة</th>
                <th className="py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-primary-50 last:border-0">
                  <td className="max-w-[220px] py-3">
                    <Link href={`/report/${r.id}`} className="line-clamp-1 font-semibold text-gray-700 hover:text-primary-700">
                      {r.title}
                    </Link>
                  </td>
                  <td className="py-3"><TypeBadge type={r.type} /></td>
                  <td className="py-3 text-gray-500">{categoryLabel(r.category)}</td>
                  <td className="py-3 text-gray-500">{r.city}</td>
                  <td className="py-3 text-gray-500">{formatArabicDate(r.eventDate)}</td>
                  <td className="py-3"><StatusBadge status={r.status} /></td>
                  <td className="py-3">
                    <RowActions report={r} onUpdateStatus={updateStatus} onDelete={removeReport} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">لا توجد بلاغات مطابقة</p>
          )}
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 lg:hidden">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-xl border border-primary-100 p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <Link href={`/report/${r.id}`} className="font-semibold text-gray-700 hover:text-primary-700">
                  {r.title}
                </Link>
                <StatusBadge status={r.status} />
              </div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                <TypeBadge type={r.type} />
                <span>🏷️ {categoryLabel(r.category)}</span>
                <span>📍 {r.city}</span>
              </div>
              <RowActions report={r} onUpdateStatus={updateStatus} onDelete={removeReport} />
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">لا توجد بلاغات مطابقة</p>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="card p-4">
      <div className="text-xl">{icon}</div>
      <div className="mt-2 text-2xl font-extrabold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function RowActions({
  report,
  onUpdateStatus,
  onDelete,
}: {
  report: Report;
  onUpdateStatus: (id: string, status: ReportStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {report.status !== "PUBLISHED" && (
        <button
          onClick={() => onUpdateStatus(report.id, "PUBLISHED")}
          className="rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100"
        >
          نشر
        </button>
      )}
      {report.status !== "RESOLVED" && (
        <button
          onClick={() => onUpdateStatus(report.id, "RESOLVED")}
          className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
        >
          تحديد كمحلول
        </button>
      )}
      {report.status !== "REJECTED" && (
        <button
          onClick={() => onUpdateStatus(report.id, "REJECTED")}
          className="rounded-lg bg-yellow-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
        >
          رفض
        </button>
      )}
      <button
        onClick={() => onDelete(report.id)}
        className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
      >
        حذف
      </button>
    </div>
  );
}
