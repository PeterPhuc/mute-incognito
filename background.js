// Default mute when open incognito tab
chrome.tabs.onCreated.addListener((tab) => {
  if (tab.incognito) {
    chrome.tabs.update(tab.id, { muted: true });
  }
});

// On/Off volume tab when press Ctrl + M
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-mute") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;

      let tab = tabs[0];
      if (tab.incognito) {
        chrome.tabs.update(tab.id, { muted: !tab.mutedInfo.muted });
      }
    });
  }
});
