// Normalize YouTube URL to clean youtu.be format
function normalizeYouTubeUrl(urlString) {
  try {
    const url = new URL(urlString);
    let videoId = null;

    // Handle youtu.be/VIDEO_ID format
    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1).split('/')[0];
    }
    // Handle youtube.com/watch?v=VIDEO_ID format
    else if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
      videoId = url.searchParams.get('v');
    }

    // If we found a video ID, return the clean youtu.be format
    if (videoId) {
      return `https://youtu.be/${videoId}`;
    }
  } catch (e) {
    // Not a valid URL
  }
  return urlString; // Return original if not a YouTube URL
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clipboardText" && message.text) {
    try {
      const url = new URL(message.text);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        // Normalize YouTube URLs to clean format
        const normalizedUrl = normalizeYouTubeUrl(message.text);
        
        chrome.storage.local.get({ urls: [] }, (data) => {
          if (!data.urls.includes(normalizedUrl)) {
            const updatedUrls = [...data.urls, normalizedUrl];
            chrome.storage.local.set({ urls: updatedUrls }, () => {
              console.log('URL saved:', normalizedUrl);
            });
          }
        });
      }
    } catch (e) {
      // Not a valid URL
    }
  }
});