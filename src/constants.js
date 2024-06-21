export const defaultSettings = {
  theme: "light",
  currency: "HKD",
  hourlyWage: 75,
  hoursPerDay: 8,
  daysPerWeek: 5,
  minAmount: 10,
  replace: true,
  replace_blacklist: [],
  blacklist: ["https://discord.com/"],
  performance_load_delay: 1000,
  performance_max_empty_highlights: 3,
  performance_highlight_cooldown: 3000,
  performance_stop_threshold: 100,
  site_currency_map: [],
  rates: {},
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
