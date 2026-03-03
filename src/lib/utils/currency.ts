export function formatCurrency(amount: number, currency: string = "EUR"): string {
  const symbol = currency === "EUR" ? "\u20AC" : "$";
  return `${symbol}${amount.toLocaleString("es-ES")}`;
}

export function getCurrencySymbol(currency: string = "EUR"): string {
  return currency === "EUR" ? "\u20AC" : "$";
}
