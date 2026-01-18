// Capture URLs from text selection copy
document.addEventListener('copy', (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: "clipboardText", text: selectedText });
  }
});

// Capture URLs when right-clicking on links (for "Copy link address")
document.addEventListener('contextmenu', (event) => {
  // Find the closest anchor element (in case the click was on a child element)
  const link = event.target.closest('a');
  if (link && link.href) {
    // Send the link URL to background script
    chrome.runtime.sendMessage({ action: "clipboardText", text: link.href });
  }
});