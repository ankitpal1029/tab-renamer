// Content script for Tab Renamer Chrome Extension

// Store original title to restore if needed
let originalTitle = document.title;
let isCustomTitle = false;

// Check if this tab has a custom name on load
chrome.runtime.sendMessage(
  {
    action: "getCustomName",
    tabId: getCurrentTabId(),
  },
  (response) => {
    if (response && response.customName) {
      updateDocumentTitle(response.customName);
      isCustomTitle = true;
    }
  },
);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showRenameDialog") {
    showRenameDialog(message.currentName, message.tabId);
  }

  if (message.action === "updateTitle") {
    updateDocumentTitle(message.newTitle);
    isCustomTitle = true;
  }
});

// Function to show rename dialog
function showRenameDialog(currentName, tabId) {
  // Remove existing dialog if present
  const existingDialog = document.getElementById("tab-renamer-dialog");
  if (existingDialog) {
    existingDialog.remove();
  }

  // Create dialog overlay
  const overlay = document.createElement("div");
  overlay.id = "tab-renamer-dialog";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  // Create dialog box
  const dialog = document.createElement("div");
  dialog.style.cssText = `
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    min-width: 400px;
    max-width: 500px;
  `;

  // Create dialog content
  dialog.innerHTML = `
    <h3 style="margin: 0 0 16px 0; color: #333; font-size: 18px;">Rename Tab</h3>
    <input type="text" id="tab-name-input" value="${escapeHtml(currentName)}" style="
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      margin-bottom: 16px;
      box-sizing: border-box;
    ">
    <div style="display: flex; gap: 8px; justify-content: flex-end;">
      <button id="tab-rename-cancel" style="
        padding: 8px 16px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Cancel</button>
      <button id="tab-rename-confirm" style="
        padding: 8px 16px;
        border: none;
        background: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Rename</button>
      <button id="tab-rename-reset" style="
        padding: 8px 16px;
        border: 1px solid #dc3545;
        background: white;
        color: #dc3545;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Reset to Original</button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Focus on input and select text
  const input = document.getElementById("tab-name-input");
  input.focus();
  input.select();

  // Handle button clicks
  document.getElementById("tab-rename-cancel").addEventListener("click", () => {
    overlay.remove();
  });

  document
    .getElementById("tab-rename-confirm")
    .addEventListener("click", () => {
      const newName = input.value.trim();
      if (newName) {
        chrome.runtime.sendMessage({
          action: "renameTab",
          tabId: tabId,
          newName: newName,
        });
      }
      overlay.remove();
    });

  document.getElementById("tab-rename-reset").addEventListener("click", () => {
    updateDocumentTitle(originalTitle);
    isCustomTitle = false;
    chrome.runtime.sendMessage({
      action: "renameTab",
      tabId: tabId,
      newName: originalTitle,
    });
    overlay.remove();
  });

  // Handle Enter key
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const newName = input.value.trim();
      if (newName) {
        chrome.runtime.sendMessage({
          action: "renameTab",
          tabId: tabId,
          newName: newName,
        });
      }
      overlay.remove();
    } else if (e.key === "Escape") {
      overlay.remove();
    }
  });

  // Close dialog when clicking outside
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });
}

// Function to update document title
function updateDocumentTitle(newTitle) {
  document.title = newTitle;
}

// Helper function to get current tab ID (not directly available in content script)
function getCurrentTabId() {
  // We'll get this from the background script message
  return null;
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Monitor for title changes from the page itself and restore custom title if needed
const titleObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" && mutation.target === document.head) {
      // Check if title was changed by the page
      const titleElement = document.querySelector("title");
      if (
        titleElement &&
        isCustomTitle &&
        titleElement.textContent !== document.title
      ) {
        // Restore our custom title
        setTimeout(() => {
          if (isCustomTitle) {
            chrome.runtime.sendMessage(
              {
                action: "getCustomName",
                tabId: getCurrentTabId(),
              },
              (response) => {
                if (response && response.customName) {
                  updateDocumentTitle(response.customName);
                }
              },
            );
          }
        }, 100);
      }
    }
  });
});

// Start observing title changes
titleObserver.observe(document.head, {
  childList: true,
  subtree: true,
});
