// Popup script for Tab Renamer Chrome Extension

document.addEventListener('DOMContentLoaded', async () => {
  const currentTabTitle = document.getElementById('current-tab-title');
  const renameButton = document.getElementById('rename-current-tab');

  try {
    // Get current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab) {
      // Display current tab title
      currentTabTitle.textContent = tab.title;

      // Handle rename button click
      renameButton.addEventListener('click', () => {
        // Send message to content script to show rename dialog
        chrome.tabs.sendMessage(tab.id, {
          action: "showRenameDialog",
          currentName: tab.title,
          tabId: tab.id
        });

        // Close popup
        window.close();
      });
    } else {
      currentTabTitle.textContent = 'Unable to access current tab';
      renameButton.disabled = true;
    }
  } catch (error) {
    console.error('Error getting current tab:', error);
    currentTabTitle.textContent = 'Error loading tab information';
    renameButton.disabled = true;
  }
});
