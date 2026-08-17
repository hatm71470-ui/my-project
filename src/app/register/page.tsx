import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="container-app flex min-h-[calc(100vh-64px)] items-center justify-center py-14">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-2xl text-white shadow-soft">
            🧭
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800">
            إنشاء حساب جديد
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            انضم إلى لُقية وابدأ بنشر بلاغاتك أو البحث بينها
          </p>
        </div>

        <form className="card space-y-4 p-6">
          <div>
            <label htmlFor="name" className="label-base">
              الاسم الكامل
            </label>
            <input id="name" name="name" type="text" required placeholder="اسمك الكامل" className="input-base" />
          </div>

          <div>
            <label htmlFor="email" className="label-base">
              البريد الإلكتروني
            </label>
            <input id="email" name="email" type="email" required placeholder="example@email.com" className="input-base" />
          </div>

          <div>
            <label htmlFor="phone" className="label-base">
              رقم الجوال
            </label>
            <input id="phone" name="phone" type="tel" required placeholder="05xxxxxxxx" className="input-base" />
          </div>

          <div>
            <label htmlFor="password" className="label-base">
              كلمة المرور
            </label>
            <input id="password" name="password" type="password" required placeholder="••••••••" className="input-base" />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-500">
            <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-primary-200 text-primary-600" />
            أوافق على شروط الاستخدام وسياسة الخصوصية الخاصة بالمنصة
          </label>

          <button type="submit" className="btn-primary w-full">
            إنشاء الحساب
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          لديك حساب بالفعل؟{" "}
          <Link href="/login" className="font-semibold text-primary-700 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
