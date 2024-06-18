import { defaultSettings } from "../pages/Content/constants";

async function restoreOptions() {
  try {
    const items = await new Promise((resolve, reject) => {
      chrome.storage.sync.get(defaultSettings, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items);
        }
      });
    });
    console.log("Options restored!", items);
    return items;
  } catch (error) {
    console.error("Error restoring options:", error);
  }
}

const saveOptions = async (settings) => {
  try {
    await new Promise((resolve, reject) => {
      chrome.storage.sync.set(settings, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
    console.log("Options saved!", settings);
  } catch (error) {
    console.error("Error saving options:", error);
  }
};

export { restoreOptions, saveOptions };
