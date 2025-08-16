# Tab Renamer Chrome Extension

A simple Chrome extension that allows you to rename browser tabs with custom titles. Perfect for organizing your workflow and keeping track of multiple tabs with meaningful names.

## Features

- 🏷️ **Custom Tab Names**: Right-click on any webpage to rename its tab
- 💾 **Persistent Names**: Custom names persist even when navigating within the same tab
- 🔄 **Reset Option**: Easily restore original tab titles
- ⌨️ **Keyboard Shortcuts**: Use Enter to confirm or Escape to cancel
- 🎯 **Multiple Access Methods**: Right-click context menu or extension popup

## Installation

### From Chrome Web Store (Coming Soon)
The extension will be available on the Chrome Web Store once published.

### Manual Installation (Developer Mode)

1. **Download the Extension**
   - Clone this repository or download the ZIP file
   - Extract the files to a folder on your computer

2. **Enable Developer Mode**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the `tab-renamer` folder containing the extension files
   - The Tab Renamer extension should now appear in your extensions list

4. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "Tab Renamer" and click the pin icon to keep it visible

## Usage

### Method 1: Right-Click Context Menu
1. Navigate to any webpage
2. Right-click anywhere on the page
3. Select "Rename Tab" from the context menu
4. Enter your desired tab name in the dialog
5. Click "Rename" or press Enter to confirm

### Method 2: Extension Popup
1. Click the Tab Renamer icon in the Chrome toolbar
2. Click "Rename This Tab" button
3. Enter your desired tab name in the dialog
4. Click "Rename" or press Enter to confirm

### Additional Options
- **Reset to Original**: Click "Reset to Original" to restore the original page title
- **Cancel**: Click "Cancel" or press Escape to close the dialog without changes

## How It Works

The extension uses Chrome's APIs to:
- Add a context menu item to all web pages
- Intercept and modify the document title
- Store custom tab names in memory
- Restore custom names when navigating within tabs
- Clean up stored data when tabs are closed

## Technical Details

### Files Structure
```
tab-renamer/
├── manifest.json      # Extension configuration
├── background.js      # Service worker for context menu and tab management
├── content.js         # Content script for title modification and UI
├── popup.html         # Extension popup interface
├── popup.js           # Popup functionality
├── icons/             # Extension icons (16px, 48px, 128px)
└── README.md          # This file
```

### Permissions Used
- `tabs`: Access tab information and modify tab properties
- `contextMenus`: Add custom right-click menu items
- `activeTab`: Access the currently active tab

## Limitations

- Custom names are stored in memory and will be lost when Chrome is restarted
- The extension cannot rename tabs for Chrome's internal pages (chrome://, chrome-extension://)
- Some websites may override the title dynamically, requiring the extension to restore custom names

## Future Enhancements

- 💾 Persistent storage across browser sessions
- 🔍 Search and filter renamed tabs
- 📁 Group management for related tabs
- ⚙️ Customizable keyboard shortcuts
- 🎨 Visual indicators for renamed tabs

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the existing issues in this repository
2. Create a new issue with detailed information about the problem
3. Include your Chrome version and operating system

---

**Version**: 1.0  
**Compatibility**: Chrome Extensions Manifest V3  
**Minimum Chrome Version**: 88+