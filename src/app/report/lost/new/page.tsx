import { ReportForm } from "@/components/ReportForm";

export default function NewLostReportPage() {
  return (
    <div className="container-app py-10">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="badge bg-accent-100 text-accent-700">🔍 بلاغ مفقود</span>
        <h1 className="mt-3 text-2xl font-extrabold text-gray-800 sm:text-3xl">
          الإبلاغ عن شيء مفقود
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          أدخل تفاصيل دقيقة عن الغرض الذي فقدته لزيادة فرص العثور عليه بسرعة
        </p>
      </div>
      <ReportForm type="LOST" />
    </div>
  );
}
