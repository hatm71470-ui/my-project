import Link from "next/link";
import Image from "next/image";
import { Report, categoryLabel } from "@/lib/types";
import { TypeBadge } from "@/components/Badge";
import { formatArabicDate } from "@/lib/utils";

export function ReportCard({ report }: { report: Report }) {
  const image = report.images[0];

  return (
    <Link
      href={`/report/${report.id}`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative h-44 w-full overflow-hidden bg-primary-50">
        {image ? (
          <Image
            src={image}
            alt={report.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-primary-200">
            📦
          </div>
        )}
        <div className="absolute right-3 top-3">
          <TypeBadge type={report.type} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-bold text-gray-800">
          {report.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {report.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-xs text-gray-400">
          <span>🏷️ {categoryLabel(report.category)}</span>
          <span>📍 {report.city}</span>
          <span>📅 {formatArabicDate(report.eventDate)}</span>
        </div>
      </div>
    </Link>
  );
}
