export type Locale = 'en' | 'zh' | 'ar';

export interface LocalizedText { en: string; zh: string; ar: string }

export interface Category {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  subcategories: LocalizedText[];
  imagePosition: string;
}

export interface Service {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
}
