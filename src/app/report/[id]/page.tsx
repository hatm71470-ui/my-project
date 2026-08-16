import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_REPORTS, getReportById } from "@/data/mock";
import { TypeBadge, StatusBadge } from "@/components/Badge";
import { ContactReveal } from "@/components/ContactReveal";
import { ImageGallery } from "@/components/ImageGallery";
import { ReportCard } from "@/components/ReportCard";
import { categoryLabel } from "@/lib/types";
import { formatArabicDate, timeAgo } from "@/lib/utils";

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = getReportById(params.id);
  if (!report) notFound();

  const similar = MOCK_REPORTS.filter(
    (r) =>
      r.id !== report.id &&
      r.status === "PUBLISHED" &&
      r.category === report.category &&
      r.type !== report.type
  ).slice(0, 3);

  return (
    <div className="container-app py-10">
      <nav className="mb-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-primary-700">الرئيسية</Link>
        <span className="mx-2">/</span>
        <Link href="/search" className="hover:text-primary-700">البحث</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{report.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <ImageGallery images={report.images} title={report.title} />

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <TypeBadge type={report.type} />
            <StatusBadge status={report.status} />
            <span className="badge bg-gray-100 text-gray-600">
              🏷️ {categoryLabel(report.category)}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold text-gray-800 sm:text-3xl">
            {report.title}
          </h1>

          <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
            {report.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <InfoItem icon="📍" label="المدينة" value={report.city} />
            <InfoItem icon="📅" label="التاريخ" value={formatArabicDate(report.eventDate)} />
            {report.color && <InfoItem icon="🎨" label="اللون" value={report.color} />}
            {report.brand && <InfoItem icon="🏷️" label="العلامة" value={report.brand} />}
            {report.locationDetails && (
              <InfoItem icon="🧭" label="تفاصيل الموقع" value={report.locationDetails} />
            )}
            <InfoItem icon="🕒" label="نُشر" value={timeAgo(report.createdAt)} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-5">
            <h2 className="mb-3 text-sm font-bold text-primary-700">بيانات التواصل</h2>
            <ContactReveal
              contactName={report.contactName}
              contactPhone={report.contactPhone}
              contactEmail={report.contactEmail}
              hideContact={report.hideContact}
            />
          </div>

          <div className="card space-y-2 p-5 text-xs leading-6 text-gray-500">
            <p className="font-bold text-gray-700">⚠️ تنبيه أمان</p>
            <p>
              يُفضل التواصل والاجتماع في أماكن عامة عند تسليم أو استلام الأغراض
              المفقودة، وتجنب مشاركة بيانات مالية أو حساسة مع أي طرف.
            </p>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-xl font-extrabold text-gray-800">
            بلاغات مشابهة قد تهمك
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((r) => (
              <ReportCard key={r.id} report={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card p-3">
      <div className="text-xs text-gray-400">{icon} {label}</div>
      <div className="mt-1 text-sm font-semibold text-gray-700">{value}</div>
    </div>
  );
}
