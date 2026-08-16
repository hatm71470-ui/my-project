import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="text-6xl">🔍</span>
      <h1 className="text-2xl font-extrabold text-gray-800">الصفحة غير موجودة</h1>
      <p className="max-w-sm text-sm text-gray-500">
        عذرًا، لم نتمكن من العثور على الصفحة أو البلاغ الذي تبحث عنه.
      </p>
      <Link href="/" className="btn-primary">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
