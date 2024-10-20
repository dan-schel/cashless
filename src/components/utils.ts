export function formatMoney(amount: number): string {
  return amount >= 0
    ? `$${amount.toFixed()}`
    : `-$${Math.abs(amount).toFixed()}`;
}
