"use client";

import { useState } from "react";

export function ContactReveal({
  contactName,
  contactPhone,
  contactEmail,
  hideContact,
}: {
  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  hideContact: boolean;
}) {
  const [revealed, setRevealed] = useState(!hideContact);

  if (!revealed) {
    return (
      <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/60 p-4 text-center">
        <p className="mb-3 text-sm text-gray-600">
          🔒 صاحب البلاغ اختار إخفاء بيانات التواصل. اضغط الزر لطلب عرضها
          بأمان.
        </p>
        <button type="button" onClick={() => setRevealed(true)} className="btn-primary w-full sm:w-auto">
          عرض بيانات التواصل
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 text-gray-700">
        <span>👤</span>
        <span className="font-medium">{contactName}</span>
      </div>
      <a href={`tel:${contactPhone}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-700">
        <span>📞</span>
        <span dir="ltr" className="font-medium">{contactPhone}</span>
      </a>
      {contactEmail && (
        <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-gray-700 hover:text-primary-700">
          <span>✉️</span>
          <span className="font-medium">{contactEmail}</span>
        </a>
      )}
    </div>
  );
}
