import { defaultSettings } from "./constants.js";

async function restoreOptions(restore = defaultSettings) {
  try {
    const items = await new Promise((resolve, reject) => {
      chrome.storage.sync.get(restore, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items);
        }
      });
    });
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
  } catch (error) {
    console.error("Error saving options:", error);
  }
};

export { restoreOptions, saveOptions };
