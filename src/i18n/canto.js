const canto = {
  translation: {
    hours: "個鐘",
    cHours: "個鐘",
    day: "日",
    days: "日",
    week: "個禮拜",
    weeks: "個禮拜",
    month: "個月",
    months: "個月",
    year: "年",
    years: "年",
    theRealCost: "The Real Cost",
    theRealCostOf: "{{1}} 嘅 Real Cost",
    sInfo: {
      underDay: {
        p: "你一日返 {{hoursPerDay}} 個鐘入邊嘅",
        s: "。",
      },
      underMonth: {
        p: "即係",
        s: " (你一個禮拜返 {{daysPerWeek}} 日)",
      },
      underTimeMonth: {
        p: "做足",
        s: "。",
      },
      longTimeScale: {
        1: "做足",
        2: ", 或者返 ",
        3: " 工。",
      },
    },
    tooltips: {
      not: "唔係",
      doNotReplace: "喺呢個網站上睇返啲金額",
      doReplace: "喺呢個網站上 show Real Cost",
      doNotRun: "唔好搞呢個網站",
      settings: "設定定",
    },
    settings: {
      label: "設定",
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
      footerButtons: {
        report: "報告問題",
        suggest: "建議功能",
        repo: "Github 倉庫",
      },
    },
    welcome: {
      initial: {
        hello: "Hello Ching",
        thank: "多謝你裝咗TheRealCost!",
        guide: "等我介紹吓呢舊嘢有咩用啦",
        setup: "我哋搞咗啲 settings 先",
      },
      configurator: {
        1: "你如果一個鐘搵",
        2: ",",
        3: "一日返",
        4: ",一個禮拜返",
        5: "...",
        tip: "入返符合你自己嘅 value 咁先可以 show 返啲準嘅資訊俾你！",
      },
      display: {
        1: "你一部新嘅電話唔係 ",
        2: "，而係你生命中的 ",
        3: "。",
      },
      try: {
        description:
          "呢舊嘢其實係會幫你喺網站度將啲價錢轉換成時間，同你講你要做幾耐先買得到 (俾你參考吓啫)。 如果你唔想成日睇到嘅都係時間，但係又想有陣時可以check吓，咁你陣間再可以去掘吓啲settings",
        hover: "Hover me！",
        configure: "Settings 可以去撳你 browser 嘅 extension icon",
      },
      complete: "你而家可以用TheRealCost啦!",
      close: "Bye bye",
    },
  },
};

export default canto;
