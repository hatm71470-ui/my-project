export type ReportType = "LOST" | "FOUND";

export type ReportStatus = "PENDING" | "PUBLISHED" | "RESOLVED" | "REJECTED";

export interface Report {
  id: string;
  type: ReportType;
  status: ReportStatus;

  title: string;
  description: string;
  category: string;
  brand?: string | null;
  color?: string | null;

  city: string;
  locationDetails?: string | null;

  eventDate: string; // ISO date string
  images: string[];

  contactName: string;
  contactPhone: string;
  contactEmail?: string | null;
  hideContact: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: "documents", label: "وثائق ومستندات", icon: "📄" },
  { id: "electronics", label: "إلكترونيات", icon: "📱" },
  { id: "bags", label: "حقائب", icon: "🎒" },
  { id: "keys", label: "مفاتيح", icon: "🔑" },
  { id: "jewelry", label: "مجوهرات", icon: "💍" },
  { id: "wallets", label: "محافظ ونقود", icon: "👛" },
  { id: "pets", label: "حيوانات أليفة", icon: "🐾" },
  { id: "clothes", label: "ملابس وإكسسوارات", icon: "👕" },
  { id: "cards", label: "بطاقات", icon: "💳" },
  { id: "other", label: "أخرى", icon: "📦" },
];

export const CITIES: string[] = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "الطائف",
  "تبوك",
  "أبها",
  "بريدة",
  "خميس مشيط",
  "حائل",
  "نجران",
  "جازان",
];

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
