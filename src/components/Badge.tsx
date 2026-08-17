import { cn } from "@/lib/utils";
import { ReportStatus, ReportType } from "@/lib/types";

export function TypeBadge({ type }: { type: ReportType }) {
  const isLost = type === "LOST";
  return (
    <span
      className={cn(
        "badge",
        isLost ? "bg-accent-100 text-accent-700" : "bg-primary-100 text-primary-700"
      )}
    >
      {isLost ? "🔍 مفقود" : "✅ موجود"}
    </span>
  );
}

const STATUS_MAP: Record<ReportStatus, { label: string; className: string }> = {
  PENDING: { label: "قيد المراجعة", className: "bg-yellow-100 text-yellow-700" },
  PUBLISHED: { label: "منشور", className: "bg-primary-100 text-primary-700" },
  RESOLVED: { label: "تم الحل", className: "bg-blue-100 text-blue-700" },
  REJECTED: { label: "مرفوض", className: "bg-red-100 text-red-700" },
};

export function StatusBadge({ status }: { status: ReportStatus }) {
  const s = STATUS_MAP[status];
  return <span className={cn("badge", s.className)}>{s.label}</span>;
}
