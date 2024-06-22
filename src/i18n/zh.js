const zh = {
  translation: {
    hours: "小時",
    cHours: "小時",
    day: "天",
    days: "天",
    week: "週",
    weeks: "週",
    month: "月",
    months: "月",
    year: "年",
    years: "年",
    theRealCost: "The Real Cost",
    theRealCostOf: "{{1}} 的 Real Cost",
    sInfo: {
      underDay: {
        p: "你每天 {{hoursPerDay}} 小時工作時間的 ",
        s: "。",
      },
      underMonth: {
        p: "你每週 {{daysPerWeek}} 天工作制中的 ",
        s: "。",
      },
      underTimeMonth: {
        p: "",
        s: " 的工作時間。",
      },
      longTimeScale: {
        1: "連續不間斷工作 ",
        2: ", 或者 ",
        3: " 的工作時間。",
      },
    },
    tooltips: {
      not: "不是",
      doNotReplace: "顯示此網站上的金額",
      doReplace: "查看此網站上的 Real Cost",
      doNotRun: "不在此網站上運行",
      settings: "設置",
    },
    settings: {
      label: "設置",
      titles: {
        general: "一般",
        calculation: "計算",
        siteSpecific: "特定網站",
        performance: "性能 / 開發者",
      },
      lang: {
        label: "語言",
      },
      theme: {
        label: "主題",
        tooltip: "當你懸停在金額上時的 PopOver 的主題將顯示。",
      },
      currency: {
        label: "貨幣",
        tooltip:
          "你瀏覽的頁面的貨幣。如果你訪問的頁面不是你的貨幣, 你可以在 PopOver 中告訴 TheRealCost 正確的貨幣。",
      },
      hourlyWage: { label: "時薪", tooltip: "用於計算。" },
      hoursPerDay: { label: "工作小時", tooltip: "用於計算。" },
      daysPerWeek: { label: "工作天數", tooltip: "用於計算。" },
      minAmount: {
        label: "最低金額",
        tooltip: "頁面上低於此金額的金額將不會被突出顯示。",
      },
      noReplace: {
        label: "顯示原始金額",
        tooltip:
          "TheRealCost 仍會突出顯示金額, 但不會用The Real Cost替換它們。",
      },
      replace_blacklist: {
        label: "在這些網站上顯示原始金額：",
        button: "將此頁面添加到顯示原始金額名單",
        tooltip:
          "(特定網站) TheRealCost 仍會突出顯示金額, 但不會用The Real Cost替換它們。",
      },
      blacklist: {
        label: "不要在這些網站上運行：",
        button: "將此頁面添加到黑名單",
        tooltip:
          "(特定網站) TheRealCost 不會在這些網站上運行、檢測和替換金額。",
      },
      performance_load_delay: {
        label: "加載延遲",
        tooltip: "TheRealCost 開始運行前的延遲 (毫秒) 。",
      },
      performance_max_empty_highlights: {
        label: "性能最大空突出顯示",
        tooltip:
          "當頁面更新此次數且未找到突出顯示時, TheRealCost 將在再次運行前進行冷卻。",
      },
      performance_highlight_cooldown: {
        label: "性能突出顯示冷卻",
        tooltip: "冷卻後 TheRealCost 再次運行前的延遲 (毫秒) 。",
      },
      performance_stop_threshold: {
        label: "性能停止閾值",
        tooltip: "當頁面更新此次數且未找到突出顯示時, TheRealCost 將停止運行。",
      },
      save: "保存更改",
    },
  },
};

export default zh;
