chrome.storage.local.get({urls: []}, (data) => {
  const listDiv = document.getElementById('urlList');
  const countDiv = document.getElementById('urlCount');
  listDiv.innerHTML = data.urls.map((url, index) => 
    `<div style="color: ${index % 2 === 0 ? '#007bff' : '#28a745'}">${url}</div>`
  ).join('');
  countDiv.textContent = `Total URLs: ${data.urls.length}`;
});

document.getElementById('copyButton').addEventListener('click', () => {
  chrome.storage.local.get({urls: []}, (data) => {
    const textToCopy = data.urls.join(' ');
    navigator.clipboard.writeText(textToCopy);
  });
});

document.getElementById('resetButton').addEventListener('click', () => {
  chrome.storage.local.set({ urls: [] }, () => {
    location.reload();
  });
});