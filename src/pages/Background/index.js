function getCurrentTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];
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
    console.log(`Option ${key} set to ${value}`);
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

/* ---------------------------------- */
/*              Listener              */
/* ---------------------------------- */

chrome.runtime.onMessage.addListener((request) => {
  switch (request) {
    case "giveMeCurrentTabPlease":
      // console.log("Hello");
      getCurrentTab(function (currentTab) {
        // console.log("Sending current tab", currentTab);
        chrome.tabs.sendMessage(currentTab.id, { tab: currentTab });
      });
      break;
    case "refresh":
      reload();
      break;
    case "openOptions":
      chrome.runtime.openOptionsPage();
      break;
    case "addToBlacklist":
      console.log("addToBlacklist ran");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        if (!url) {
          console.error("No URL found");
          console.log(tabs);
          return;
        }
        getOption("blacklist").then((blacklist) => {
          if (!blacklist) {
            console.log("Writing new blacklist: " + url);
            writeOption("blacklist", [url]);
          } else if (!blacklist.includes(url)) {
            console.log("Adding to blacklist: " + url);
            writeOption("blacklist", [...blacklist, url]);
          }
        });
        console.log("Final setting:", getOption("blacklist"));
        reload();
      });
    default:
      break;
  }
});
