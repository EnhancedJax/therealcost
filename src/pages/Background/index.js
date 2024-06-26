import { restoreOptions } from "../../utils/storage";

function getCurrentTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    callback(currentTab);
  });
}

async function getOption(key) {
  try {
    const value = await new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items[key]);
        }
      });
    });
    return value;
  } catch (error) {
    console.error(`Error reading option ${key}:`, error);
  }
}

async function writeOption(key, value) {
  try {
    await new Promise((resolve, reject) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(`Error setting option ${key}:`, error);
  }
}

async function reload() {
  try {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id);
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function writeList(key, add = true) {
  getCurrentTab(function (currentTab) {
    let rawUrl = currentTab.url;
    if (!rawUrl) {
      console.error("No URL found");
      return;
    }

    const url = new URL(rawUrl).origin;

    getOption(key).then((list) => {
      if (add) {
        if (!list) {
          writeOption(key, [url]);
        } else if (!list.includes(url)) {
          writeOption(key, [...list, url]);
        }
      } else {
        if (list && list.includes(url)) {
          const updatedList = list.filter((item) => item !== url);
          writeOption(key, updatedList);
        }
      }
    });
    reload();
  });
}

/* ---------------------------------- */
/*              Listener              */
/* ---------------------------------- */

chrome.runtime.onMessage.addListener((request) => {
  switch (request.message) {
    /* ---------------- - --------------- */
    case "getNecessaryInfo":
      getCurrentTab(function (currentTab) {
        restoreOptions().then(async (storage) => {
          let rates = storage.rates.data;
          if (
            !storage?.rates?.lastFetched ||
            storage?.rates?.lastFetched < Date.now() - 604800000 ||
            !storage?.rates
          ) {
            // if rates are older than a week or not available
            console.log("Fetching new exchange rate");
            try {
              const response = await fetch(
                "https://open.er-api.com/v6/latest/USD"
              );
              const data = await response.json();
              const { rates: ratesData } = data;
              chrome.storage.sync.set({
                rates: { data: ratesData, lastFetched: Date.now() },
              });
              rates = ratesData;
            } catch (error) {
              console.error("Error fetching exchange rate:", error);
            }
          }
          chrome.tabs.sendMessage(currentTab.id, {
            tab: currentTab,
            settings: storage,
            rates: rates,
          });
        });
      });
      break;
    /* ---------------- - --------------- */
    case "refresh":
      reload();
      break;
    /* ---------------- - --------------- */
    case "openOptions":
      chrome.runtime.openOptionsPage();
      break;
    /* ---------------- - --------------- */
    case "addToBlacklist":
      writeList("blacklist");
      break;
    /* ---------------- - --------------- */
    case "addToReplaceBlacklist":
      writeList("replace_blacklist");
      break;
    /* ---------------- - --------------- */
    case "removeFromReplaceBlacklist":
      writeList("replace_blacklist", false);
      break;
    /* ---------------- - --------------- */
    case "changeCurrency":
      getCurrentTab(function (currentTab) {
        let rawUrl = currentTab.url;
        if (!rawUrl) {
          console.error("No URL found");
          return;
        }

        const url = new URL(rawUrl).origin;

        getOption("site_currency_map").then((site_currency_map) => {
          if (!site_currency_map) {
            writeOption("site_currency_map", [
              {
                url: url,
                currency: request.value,
              },
            ]);
          } else {
            const hasSite = site_currency_map.find((site) => site.url === url);
            let updatedMap;
            if (hasSite) {
              updatedMap = site_currency_map.map((site) => {
                if (site.url === url) {
                  return { ...site, currency: request.value };
                }
                return site;
              });
            } else {
              updatedMap = [
                ...site_currency_map,
                { url: url, currency: request.value },
              ];
            }
            writeOption("site_currency_map", updatedMap);
          }
        });
      });
      reload();
      break;
    /* ---------------- - --------------- */
    default:
      console.log("Background received unhandled message:", request);
      break;
  }
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
  }
});
