export const defaultSettings = {
  hourlyWage: 75,
  hoursPerDay: 8,
  daysPerWeek: 5,
  currency: "HKD",
  replace: true,
  blacklist: ["https://discord.com/"],
  replaceBlacklist: [],
  siteCurrencyMap: [],
  minAmount: 10,
  rates: {},
  theme: "light",
};

export const moneyRegex =
  /(?:([$£¥€])|\s-\s)\s?(\d+(?:,\d{3})*(?:[.,]\d{0,2})?)/m;

export const stopWhenMatch = /[.,]\d{1,2}\s/m;

export const spanStyle = {
  textDecoration: "underline",
};

export const ANTTHEME = {
  token: {
    fontFamily: "interregular",
  },
};
