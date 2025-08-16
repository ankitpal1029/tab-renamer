// Background script for Tab Renamer Chrome Extension

// Store custom tab names
const customTabNames = new Map();

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "renameTab",
    title: "Rename Tab",
    contexts: ["page"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "renameTab") {
    // Get current tab name (custom or original)
    const currentName = customTabNames.get(tab.id) || tab.title;

    // Send message to content script to show rename dialog
    chrome.tabs.sendMessage(tab.id, {
      action: "showRenameDialog",
      currentName: currentName,
      tabId: tab.id
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "renameTab") {
    const { tabId, newName } = message;

    // Store the custom name
    customTabNames.set(tabId, newName);

    // Send message to content script to update the tab title
    chrome.tabs.sendMessage(tabId, {
      action: "updateTitle",
      newTitle: newName
    });

    sendResponse({ success: true });
  }

  if (message.action === "getCustomName") {
    const customName = customTabNames.get(message.tabId);
    sendResponse({ customName: customName });
  }
});

// Clean up when tabs are closed
chrome.tabs.onRemoved.addListener((tabId) => {
  customTabNames.delete(tabId);
});

// Restore custom names when tabs are updated (e.g., navigation)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && customTabNames.has(tabId)) {
    const customName = customTabNames.get(tabId);
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, {
        action: "updateTitle",
        newTitle: customName
      }).catch(() => {
        // Ignore errors if content script isn't ready
      });
    }, 100);
  }
});
