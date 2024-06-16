export const defaultSettings = {
  hourlyWage: 75,
  hoursPerDay: 8,
  daysPerWeek: 5,
  currency: "HKD",
  replace: true,
};

export const moneyRegex =
  /((?:US|USD|EUR|JPY|GBP|AUD|CAD|CA|CHF|HKD|HK|CNY|SEK|NZD|MXN)?\s?[$£¥€])\s?(\d+([.,]\d+)?)/m;

export const spanStyle = {
  textDecoration: "underline",
  borderRadius: "5px",
  padding: "2px",
};
