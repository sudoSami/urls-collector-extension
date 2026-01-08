chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clipboardText" && message.text) {
    try {
      const url = new URL(message.text);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        chrome.storage.local.get({ urls: [] }, (data) => {
          if (!data.urls.includes(message.text)) {
            const updatedUrls = [...data.urls, message.text];
            chrome.storage.local.set({ urls: updatedUrls }, () => {
              console.log('URL saved:', message.text);
            });
          }
        });
      }
    } catch (e) {
      // Not a valid URL
    }
  }
});