document.addEventListener('copy', (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    chrome.runtime.sendMessage({ action: "clipboardText", text: selectedText });
  }
});