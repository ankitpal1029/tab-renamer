# Development Installation Guide

This guide will help you install and test the Tab Renamer Chrome extension during development.

## Prerequisites

- Google Chrome browser (version 88 or higher)
- The extension files downloaded to your computer

## Step-by-Step Installation

### 1. Prepare the Extension Files

Make sure you have all the required files in the `tab-renamer` folder:
```
tab-renamer/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
├── icons/ (optional, but recommended)
└── README.md
```

### 2. Add Icons (Recommended)

Create or download three PNG icon files and place them in the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)  
- `icon128.png` (128x128 pixels)

If you don't have icons, the extension will still work with default placeholders.

### 3. Load the Extension in Chrome

1. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in the address bar and press Enter
   - Or go to Chrome menu → More tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner
   - This will show additional options for loading unpacked extensions

3. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to and select the `tab-renamer` folder
   - Click "Select Folder" (or "Open" on some systems)

4. **Verify Installation**
   - The Tab Renamer extension should appear in your extensions list
   - You should see a new icon in the Chrome toolbar (or extensions menu)

### 4. Test the Extension

1. **Test Right-Click Method**
   - Navigate to any website (e.g., google.com)
   - Right-click anywhere on the page
   - Look for "Rename Tab" in the context menu
   - Click it and try renaming the tab

2. **Test Popup Method**
   - Click the Tab Renamer icon in the toolbar
   - Click "Rename This Tab" in the popup
   - Try renaming the tab through this interface

3. **Test Features**
   - Try renaming a tab with a custom name
   - Navigate to a different page in the same tab (custom name should persist)
   - Try the "Reset to Original" button
   - Test keyboard shortcuts (Enter to confirm, Escape to cancel)

## Troubleshooting

### Extension Won't Load
- Check that all required files are present
- Verify the `manifest.json` file is valid JSON
- Look for error messages in the Extensions page

### Context Menu Not Appearing
- Make sure you're right-clicking on a regular webpage (not chrome:// pages)
- Try refreshing the page after installing the extension
- Check the Extensions page for any error messages

### Dialog Not Showing
- Check the browser console for JavaScript errors (F12 → Console tab)
- Try disabling other extensions that might interfere
- Ensure the content script is running (check the Extensions page)

### Custom Names Not Persisting
- This is expected behavior - names are stored in memory only
- Names will be lost when Chrome is restarted
- Names should persist when navigating within the same tab

## Development Tips

### Updating the Extension
1. Make changes to the extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Tab Renamer extension card
4. Test your changes

### Debugging
- **Background Script**: Check `chrome://extensions/` → Tab Renamer → "service worker" link
- **Content Script**: Use F12 Developer Tools on the webpage
- **Popup**: Right-click the extension icon → "Inspect popup"

### Console Logging
Add `console.log()` statements to debug:
- Background script logs appear in the service worker console
- Content script logs appear in the webpage's console
- Popup logs appear in the popup's console

## Next Steps

Once you've verified the extension works correctly:

1. **Add Custom Icons**: Create proper icon files for a professional appearance
2. **Test Edge Cases**: Try different websites, navigation patterns, and tab scenarios
3. **Package for Distribution**: When ready, package the extension for the Chrome Web Store

## File Permissions

Make sure all files have proper read permissions:
```bash
# On Unix-like systems (macOS, Linux)
chmod -R 644 tab-renamer/
chmod 755 tab-renamer/
```

## Uninstalling

To remove the extension:
1. Go to `chrome://extensions/`
2. Find the Tab Renamer extension
3. Click "Remove"
4. Confirm the removal

The extension and all its data will be completely removed from Chrome.