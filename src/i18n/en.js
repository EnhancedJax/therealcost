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
        s: " of your {{hoursPerDay}} hour work day.",
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
      label: "Settings",
      titles: {
        general: "General",
        calculation: "Calculation",
        siteSpecific: "Site Specific",
        performance: "Performance / Developer",
      },
      lang: {
        label: "Language",
      },
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
      noReplace: {
        label: "Show original amount instead",
        tooltip:
          "If you enable this, TheRealCost will still highlight amounts, but won't replace them with the real cost.",
      },
      replace_blacklist: {
        label: "Show original amount on these sites:",
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
      footerButtons: {
        report: "Report an issue",
        suggest: "Suggest a feature",
        repo: "GitHub Repository",
      },
    },
    welcome: {
      initial: {
        hello: "Hello",
        thank: "Thank you for installing TheRealCost!",
        guide: "I'll guide you through what the extension does.",
        setup: "Let's setup the extension first!",
      },
      configurator: {
        1: "If you earn",
        2: "per hour, ",
        3: "work",
        4: "a day, ",
        5: "a week...",
      },
      display: {
        1: "Your new phone isn't {{price}}, it's ",
        2: " of your life",
      },
      try: {
        description:
          "The extension will automatically convert & highlight prices to how much hours you have to work to afford them! This can be turned off in the settings.",
        hover: "Hover me!",
        configure:
          "Configure your settings by clicking on the extension icon of your browser!",
      },
      complete: "Setup complete, enjoy the extension!",
    },
  },
};

export default en;
