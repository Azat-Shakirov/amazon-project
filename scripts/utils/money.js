export function formatCurrency(priceCents) {
  if (priceCents < 0) {
    return 'Cannot be negative';
  }
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;