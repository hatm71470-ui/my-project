import { ReportForm } from "@/components/ReportForm";

export default function NewFoundReportPage() {
  return (
    <div className="container-app py-10">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="badge bg-primary-100 text-primary-700">✅ بلاغ موجود</span>
        <h1 className="mt-3 text-2xl font-extrabold text-gray-800 sm:text-3xl">
          الإبلاغ عن شيء تم العثور عليه
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          شكرًا لأمانتك! ساعد صاحب الغرض في العثور عليه بإضافة تفاصيل دقيقة
        </p>
      </div>
      <ReportForm type="FOUND" />
    </div>
  );
}
