export const defaultSettings = {
  hourlyWage: 75,
  hoursPerDay: 8,
  daysPerWeek: 5,
  currency: "HKD",
  replace: true,
  minAmount: 10,
  rates: {},
  theme: "light",
  blacklist: ["https://discord.com/"],
  replace_blacklist: [],
  site_currency_map: [],
  performance_load_delay: 1000,
  performance_max_empty_highlights: 3,
  performance_highlight_cooldown: 3000,
};

export const moneyRegex =
  /(?:((?:XY|XYZ)\s?[$£¥€]?|[$£¥€])|\s-\s)\s?(\d+(?:,\d{3})*(?:[.,]\d{0,2})?)/m;

export const stopWhenMatch = /[.,]\d{1,2}\s/m;

export const spanStyle = {
  textDecoration: "underline",
};

export const ANTTHEME = {
  token: {
    fontFamily: "interregular",
  },
};

export const highlightClass = "highlighted-money";
export const highlightClassHidden = "highlighted-money-hidden";
export const preMatchIgnoreClasses = [
  "highlighted-money",
  "highlighted-money-hidden",
];
export const preMatchIgnoreClassesIncludes = [
  "hidden",
  "offscreen",
  "screen-reader",
];
