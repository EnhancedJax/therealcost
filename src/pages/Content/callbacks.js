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

function log(text) {
  console.log(text);
}

export default {
  writeOption,
  log,
};
