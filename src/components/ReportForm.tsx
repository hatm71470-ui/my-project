"use client";

import { useState } from "react";
import { CATEGORIES, CITIES, ReportType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ReportForm({ type }: { type: ReportType }) {
  const isLost = type === "LOST";
  const [images, setImages] = useState<string[]>([]);
  const [hideContact, setHideContact] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files)
      .slice(0, 5 - images.length)
      .map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // سيتم لاحقًا ربط هذا النموذج بواجهة API حقيقية لحفظ البلاغ في قاعدة البيانات
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card mx-auto max-w-lg animate-fade-in p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-3xl">
          ✅
        </div>
        <h2 className="text-xl font-extrabold text-gray-800">
          تم استلام بلاغك بنجاح
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          سيتم مراجعة البلاغ من قبل فريق الإدارة قبل نشره ليظهر للجميع في نتائج
          البحث. يمكنك متابعة حالته من صفحة حسابك.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-primary mt-6"
        >
          إضافة بلاغ آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-2xl space-y-6 p-6 sm:p-8">
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-primary-700">تفاصيل الغرض</h2>

        <div>
          <label htmlFor="title" className="label-base">
            عنوان مختصر <span className="text-accent-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder={isLost ? "مثال: محفظة جلدية سوداء" : "مثال: هاتف آيفون أزرق"}
            className="input-base"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="label-base">
              الفئة <span className="text-accent-500">*</span>
            </label>
            <select id="category" name="category" required className="input-base" defaultValue="">
              <option value="" disabled>
                اختر الفئة
              </option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="color" className="label-base">
              اللون
            </label>
            <input id="color" name="color" placeholder="مثال: أسود" className="input-base" />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="label-base">
            الوصف التفصيلي <span className="text-accent-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="اكتب وصفًا دقيقًا يساعد في التعرف على الغرض (علامات مميزة، محتويات، حالة الاستخدام...)"
            className="input-base resize-none"
          />
        </div>
      </section>

      <section className="space-y-4 border-t border-primary-100 pt-6">
        <h2 className="text-sm font-bold text-primary-700">
          {isLost ? "مكان وزمان الفقدان" : "مكان وزمان العثور"}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className="label-base">
              المدينة <span className="text-accent-500">*</span>
            </label>
            <select id="city" name="city" required className="input-base" defaultValue="">
              <option value="" disabled>
                اختر المدينة
              </option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="eventDate" className="label-base">
              التاريخ <span className="text-accent-500">*</span>
            </label>
            <input id="eventDate" name="eventDate" type="date" required className="input-base" />
          </div>
        </div>

        <div>
          <label htmlFor="locationDetails" className="label-base">
            تفاصيل الموقع
          </label>
          <input
            id="locationDetails"
            name="locationDetails"
            placeholder="مثال: بالقرب من بوابة 3، مجمع الرياض بارك"
            className="input-base"
          />
        </div>
      </section>

      <section className="space-y-3 border-t border-primary-100 pt-6">
        <h2 className="text-sm font-bold text-primary-700">الصور (اختياري، حتى 5 صور)</h2>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {images.map((src, i) => (
            <div key={src} className="group relative aspect-square overflow-hidden rounded-xl border border-primary-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`صورة ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-primary-200 text-primary-400 transition hover:border-primary-400 hover:text-primary-600">
              <span className="text-2xl">📷</span>
              <span className="text-xs">إضافة صورة</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>
      </section>

      <section className="space-y-4 border-t border-primary-100 pt-6">
        <h2 className="text-sm font-bold text-primary-700">بيانات التواصل</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="label-base">
              الاسم <span className="text-accent-500">*</span>
            </label>
            <input id="contactName" name="contactName" required placeholder="اسمك" className="input-base" />
          </div>
          <div>
            <label htmlFor="contactPhone" className="label-base">
              رقم الجوال <span className="text-accent-500">*</span>
            </label>
            <input id="contactPhone" name="contactPhone" type="tel" required placeholder="05xxxxxxxx" className="input-base" />
          </div>
        </div>

        <div>
          <label htmlFor="contactEmail" className="label-base">
            البريد الإلكتروني (اختياري)
          </label>
          <input id="contactEmail" name="contactEmail" type="email" placeholder="example@email.com" className="input-base" />
        </div>

        <label className="flex items-start gap-2 rounded-xl bg-primary-50/60 p-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={hideContact}
            onChange={(e) => setHideContact(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-primary-200 text-primary-600"
          />
          <span>
            🔒 إخفاء بيانات التواصل عن الزوار، وإظهارها فقط بعد موافقتي على طلب
            تواصل من داخل المنصة (حماية أفضل للخصوصية).
          </span>
        </label>
      </section>

      <button type="submit" className={cn("w-full", isLost ? "btn-outline" : "btn-accent")}>
        {isLost ? "نشر بلاغ المفقود" : "نشر بلاغ الموجود"}
      </button>
    </form>
  );
}
