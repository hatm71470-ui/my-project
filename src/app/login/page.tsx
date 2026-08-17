import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container-app flex min-h-[calc(100vh-64px)] items-center justify-center py-14">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-2xl text-white shadow-soft">
            🧭
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800">
            تسجيل الدخول
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            سجّل الدخول لإدارة بلاغاتك والتواصل بأمان
          </p>
        </div>

        <form className="card space-y-4 p-6">
          <div>
            <label htmlFor="email" className="label-base">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="example@email.com"
              className="input-base"
            />
          </div>

          <div>
            <label htmlFor="password" className="label-base">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="input-base"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" className="h-4 w-4 rounded border-primary-200 text-primary-600" />
              تذكرني
            </label>
            <Link href="#" className="font-semibold text-primary-700 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button type="submit" className="btn-primary w-full">
            تسجيل الدخول
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="font-semibold text-primary-700 hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>
    </div>
  );
}
