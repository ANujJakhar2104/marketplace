import type { EMIPlan } from '../types/product';

/** Tenure options 1Fi offers on marketplace purchases, in months. */
export const EMI_TENURES_MONTHS = [3, 6, 9, 12] as const;

/** The tenure highlighted as "Recommended" by default. */
const RECOMMENDED_TENURE = 6;

/**
 * Builds the set of no-cost EMI plans available for a given price.
 * All 1Fi Marketplace plans are no-cost (0% interest, 0 processing fee) \u2014
 * the affordability comes from the mutual-fund-backed credit line, not
 * from interest charged to the customer.
 */
export function buildEmiPlans(price: number): EMIPlan[] {
  return EMI_TENURES_MONTHS.map((tenureMonths) => {
    const monthlyAmount = Math.ceil(price / tenureMonths);
    return {
      id: `emi-${tenureMonths}`,
      tenureMonths,
      monthlyAmount,
      totalAmount: monthlyAmount * tenureMonths,
      interestRate: 0,
      isNoCost: true,
      processingFee: 0,
      recommended: tenureMonths === RECOMMENDED_TENURE,
    };
  });
}

/** The lowest monthly figure for a price \u2014 used for "EMI from \u20b9X/mo" teasers. */
export function lowestMonthlyEmi(price: number): number {
  const longestTenure = EMI_TENURES_MONTHS[EMI_TENURES_MONTHS.length - 1];
  return Math.ceil(price / longestTenure);
}
