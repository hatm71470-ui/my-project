import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-primary-100 bg-white">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              🧭
            </span>
            <span className="text-base font-extrabold text-primary-800">لُقية</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            منصة تجمع بين من فقد شيئًا ومن وجده، بخطوات بسيطة وآمنة تساعد في
            إعادة الأشياء المفقودة إلى أصحابها.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary-700">الرئيسية</Link></li>
            <li><Link href="/search" className="hover:text-primary-700">البحث في البلاغات</Link></li>
            <li><Link href="/report/lost/new" className="hover:text-primary-700">إبلاغ عن مفقود</Link></li>
            <li><Link href="/report/found/new" className="hover:text-primary-700">إبلاغ عن موجود</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">الحساب</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link href="/login" className="hover:text-primary-700">تسجيل الدخول</Link></li>
            <li><Link href="/register" className="hover:text-primary-700">إنشاء حساب</Link></li>
            <li><Link href="/admin" className="hover:text-primary-700">لوحة الإدارة</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold text-gray-800">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>support@luqya.app</li>
            <li>خدمة العملاء: 920000000</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} لُقية. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
