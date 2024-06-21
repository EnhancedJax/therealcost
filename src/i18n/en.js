const en = {
  translation: {
    hours: "hours",
    cHours: "Hours",
    day: "day",
    days: "days",
    week: "week",
    weeks: "weeks",
    month: "month",
    months: "months",
    year: "year",
    years: "years",
    theRealCost: "The Real Cost",
    theRealCostOf: "The real cost of {{1}}",
    sInfo: {
      underDay: {
        p: "",
        s: " of your {{hoursPerDay}} hour day.",
      },
      underMonth: {
        p: "",
        s: " of your {{daysPerWeek}} day work week.",
      },
      underTimeMonth: {
        p: "",
        s: " of your days of work",
      },
      longTimeScale: {
        1: "",
        2: " of constant work without a break, or ",
        3: " of days of work.",
      },
    },
    tooltips: {
      not: "Not",
      doNotReplace: "Show amount on this site",
      doReplace: "See the real cost on this site",
      doNotRun: "Don't run on this site",
      settings: "Settings",
    },
    settings: {
      theme: {
        label: "Theme",
        tooltip:
          "The theme of the PopOver, which shows when you hover over highlighted amounts",
      },
      currency: {
        label: "Currency",
        tooltip:
          "The currency of pages you visit. If you visit a page that isn't in your currency, you can tell TheRealCost the correct currency in the PopOver menu.",
      },
      hourlyWage: { label: "Hourly Wage", tooltip: "For calculation." },
      hoursPerDay: { label: "Working hours", tooltip: "For calculation." },
      daysPerWeek: { label: "Working days", tooltip: "For calculation." },
      minAmount: {
        label: "Minimum amount to highlight",
        tooltip: "Amounts on a page under this amount will not be highlighted.",
      },
      replace: {
        label: "Replace currency amount with the real cost",
        tooltip:
          "If you disable this, TheRealCost will still highlight amounts, but won't replace them with the real cost.",
      },
      replace_blacklist: {
        label: "Don't replace text on these sites:",
        button: "Add this page to replace blacklist",
        tooltip:
          "(Site specific) TheRealCost will still highlight amounts, but won't replace them with the real cost.",
      },
      blacklist: {
        label: "Don't run on these sites:",
        button: "Add this page to blacklist",
        tooltip:
          "(Site specific) TheRealCost won't run, detect and replace amounts on these sites.",
      },
      performance: "Performance settings",
      performance_load_delay: {
        label: "Load delay",
        tooltip: "The delay in milliseconds before TheRealCost starts running.",
      },
      performance_max_empty_highlights: {
        label: "Performance max empty highlights",
        tooltip:
          "When the page updates this amount of times, and no highlights are found, TheRealCost will perform a cooldown before running again.",
      },
      performance_highlight_cooldown: {
        label: "Performance highlight cooldown",
        tooltip:
          "The delay in milliseconds before TheRealCost starts running again after the cooldown.",
      },
      performance_stop_threshold: {
        label: "Performance stop threshold",
        tooltip:
          "When the page updates this amount of times, and no highlights are found, TheRealCost will stop running.",
      },
      save: "Save changes",
    },
  },
};

export default en;
