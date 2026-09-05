const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Formats a number as an Indian Rupee amount, e.g. 79900 -> "\u20b979,900" */
export function formatINR(amount: number): string {
  return formatter.format(amount);
}
