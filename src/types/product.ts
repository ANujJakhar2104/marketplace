export type IconFamily = 'ionicons' | 'material-community';

export interface IconSpec {
  family: IconFamily;
  name: string;
}

export interface Category {
  id: string;
  label: string;
  icon: IconSpec;
  /** Gradient used behind product art for items in this category */
  gradient: [string, string];
}

export interface ProductVariant {
  id: string;
  /** e.g. "128 GB" / "Stealth Black" / "Business Class" */
  label: string;
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  categoryId: string;
  icon: IconSpec;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  /** What the variants differ by, e.g. "Storage", "Colour", "Cabin Class" */
  variantAttribute: string;
  variants: ProductVariant[];
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalAmount: number;
  interestRate: number;
  isNoCost: boolean;
  processingFee: number;
  recommended: boolean;
}
