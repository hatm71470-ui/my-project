import Link from "next/link";
import { MOCK_REPORTS } from "@/data/mock";
import { ReportCard } from "@/components/ReportCard";
import { StatCard } from "@/components/StatCard";
import { CATEGORIES } from "@/lib/types";

export default function HomePage() {
  const published = MOCK_REPORTS.filter((r) => r.status === "PUBLISHED");
  const latest = published.slice(0, 6);
  const lostCount = MOCK_REPORTS.filter((r) => r.type === "LOST").length;
  const foundCount = MOCK_REPORTS.filter((r) => r.type === "FOUND").length;
  const resolvedCount = MOCK_REPORTS.filter((r) => r.status === "RESOLVED").length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="container-app grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="badge bg-primary-100 text-primary-700">
              🤝 منصة مجتمعية آمنة
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              فقدت شيئًا؟ وجدت شيئًا؟
              <br />
              <span className="text-primary-600">لُقية</span> تجمع بينكما
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-gray-500">
              سجّل بلاغك في دقائق، وابحث بين مئات البلاغات القريبة منك.
              نساعدك على التواصل بأمان مع من وجد ما فقدته أو من يبحث عمّا
              وجدته.
            </p>

            <form
              action="/search"
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-primary-100 bg-white p-2 shadow-card sm:flex-row"
            >
              <input
                name="q"
                type="text"
                placeholder="ابحث عن غرض، مثال: محفظة، جوال، مفاتيح..."
                className="input-base border-0 shadow-none focus:ring-0 sm:flex-1"
              />
              <button type="submit" className="btn-primary sm:w-auto">
                🔍 بحث
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/report/lost/new" className="btn-outline">
                📝 الإبلاغ عن مفقود
              </Link>
              <Link href="/report/found/new" className="btn-accent">
                📦 الإبلاغ عن موجود
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard icon="🔍" value={`${lostCount}+`} label="بلاغ مفقودات" />
            <StatCard icon="✅" value={`${foundCount}+`} label="بلاغ موجودات" />
            <StatCard icon="🤝" value={`${resolvedCount}+`} label="حالة تم حلها" />
            <StatCard icon="🏙️" value="14" label="مدينة مغطاة" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-app py-12">
        <h2 className="mb-6 text-xl font-extrabold text-gray-800">تصفح حسب الفئة</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/search?category=${c.id}`}
              className="card flex flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-medium text-gray-700">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest reports */}
      <section className="container-app py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-800">أحدث البلاغات</h2>
          <Link href="/search" className="text-sm font-semibold text-primary-700 hover:underline">
            عرض الكل ←
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-primary-950 py-16 text-white">
        <div className="container-app">
          <h2 className="mb-10 text-center text-2xl font-extrabold">كيف تعمل المنصة؟</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📝",
                title: "سجّل بلاغك",
                desc: "أضف وصفًا للشيء المفقود أو الموجود مع الصور والموقع والتاريخ.",
              },
              {
                icon: "🔎",
                title: "ابحث وطابق",
                desc: "استخدم البحث والفلاتر لإيجاد بلاغات مطابقة قد تخص غرضك.",
              },
              {
                icon: "🤝",
                title: "تواصل بأمان",
                desc: "تواصل مع صاحب البلاغ عبر بيانات التواصل المتاحة وأكمل التسليم.",
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl bg-white/5 p-6 text-center backdrop-blur">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/20 text-3xl">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-6 text-primary-100/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-16 text-center">
        <h2 className="text-2xl font-extrabold text-gray-800">
          ساهم في إعادة الأشياء المفقودة إلى أصحابها
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          كل بلاغ تنشره قد يكون سببًا في سعادة شخص استعاد شيئًا يعنيه له. ابدأ الآن.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/report/lost/new" className="btn-outline">
            الإبلاغ عن مفقود
          </Link>
          <Link href="/report/found/new" className="btn-accent">
            الإبلاغ عن موجود
          </Link>
        </div>
      </section>
    </div>
  );
}
