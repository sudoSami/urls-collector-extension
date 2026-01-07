// Helper function to save a URL to storage
function saveUrl(urlText) {
  try {
    const url = new URL(urlText);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      chrome.storage.local.get({ urls: [] }, (data) => {
        if (!data.urls.includes(urlText)) {
          const updatedUrls = [...data.urls, urlText];
          chrome.storage.local.set({ urls: updatedUrls }, () => {
            console.log('URL saved:', urlText);
          });
        }
      });
    }
  } catch (e) {
    // Not a valid URL
  }
}

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "collectUrl",
    title: "Collect this URL",
    contexts: ["link"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "collectUrl" && info.linkUrl) {
    saveUrl(info.linkUrl);
  }
});

// Handle clipboard text from content script (Share button, etc.)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clipboardText" && message.text) {
    saveUrl(message.text);
  }
});