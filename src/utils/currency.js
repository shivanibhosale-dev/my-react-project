export const USD_TO_INR = 90;

export function usdToInr(usd) {
  return usd * USD_TO_INR;
}

export function formatUSD(usd) {
  return `$${usd.toFixed(2)}`;
}

export function formatINR(usd) {
  return `₹${usdToInr(usd).toFixed(2)}`;
}