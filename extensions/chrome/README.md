# NeuroSync AI - Chrome Extension

Your AI-powered browsing memory for Chrome. Automatically capture and recall your web context.

## 🚀 Features

### ✨ Automatic Capture
- **Page Visits**: Tracks pages you visit with titles and URLs
- **Bookmarks**: Captures when you bookmark pages
- **Text Selection**: Capture selected text with `Ctrl+Shift+S`
- **Privacy First**: Respects incognito mode, blacklist/whitelist

### 🔍 Intelligent Search
- **Quick Search**: `Ctrl+Shift+K` to open popup
- **Full-text search** across all captured memories
- **Recent memories** view
- **Beautiful UI** with gradient design

### 🎯 Smart Features
- **Offline Queue**: Works offline, syncs when back online
- **Blacklist/Whitelist**: Control what gets captured
- **Incognito Respect**: Never captures in incognito mode (configurable)
- **Keyboard Shortcuts**: Fast access to all features

## 📦 Installation

### From Chrome Web Store (Coming Soon)
1. Visit Chrome Web Store
2. Click "Add to Chrome"
3. Configure your API key

### Manual Installation (Development)
1. Clone the repository
2. Navigate to `extensions/chrome`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the extension:
   ```bash
   npm run build
   ```
5. Open Chrome and go to `chrome://extensions/`
6. Enable "Developer mode"
7. Click "Load unpacked"
8. Select the `extensions/chrome` directory

## ⚙️ Setup

1. Get your API key from [rverity.ai](https://rverity.ai)
2. Click the NeuroSync icon in Chrome toolbar
3. Click "⚙️ Settings"
4. Enter your API key
5. Configure capture preferences
6. Save settings
7. Start browsing! 🎉

## 🎯 Usage

### Capture Page Visits
- Just browse normally
- Pages are automatically captured (if enabled)
- Check the popup to see recent memories

### Capture Selected Text
1. Select text on any page
2. Press `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac)
3. Text is captured with page context

### Search Memories
1. Press `Ctrl+Shift+K` to open popup
2. Type your search query
3. View results instantly

### Manage Settings
1. Click the NeuroSync icon
2. Click "⚙️ Settings"
3. Configure:
   - API credentials
   - Capture preferences
   - Privacy filters (blacklist/whitelist)

## ⚙️ Configuration

### API Settings
- **API Key**: Your NeuroSync API key (required)
- **Endpoint**: API endpoint URL (default: https://rverity.ai)

### Capture Settings
- **Auto Capture**: Enable/disable automatic capture
- **Capture History**: Track page visits
- **Capture Bookmarks**: Track bookmarks
- **Capture Selection**: Enable text selection capture
- **Respect Incognito**: Don't capture in incognito mode

### Privacy & Filters
- **Blacklist**: URLs to never capture (supports wildcards)
- **Whitelist**: Only capture these URLs (if specified)

### Example Filters

**Blacklist** (never capture):
```
*://mail.google.com/*
*://banking.example.com/*
*://accounts.google.com/*
```

**Whitelist** (only capture these):
```
*://github.com/*
*://stackoverflow.com/*
*://docs.*.com/*
```

## 🎨 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+K` | Open popup |
| `Ctrl+Shift+F` | Search memories |
| `Ctrl+Shift+S` | Capture selection |

*On Mac, use `Cmd` instead of `Ctrl`*

## 🔒 Privacy & Security

- **Incognito Mode**: Respects incognito by default
- **Blacklist**: Block sensitive sites
- **Whitelist**: Only capture specific sites
- **Local Queue**: Offline data stored locally
- **Your Data**: You control what gets captured

## 🌐 Offline Support

NeuroSync works offline!
- Changes are queued locally
- Automatically synced when back online
- No data loss

## 🐛 Troubleshooting

### Extension not working?
1. Check API key in settings
2. Verify internet connection
3. Check Chrome console for errors

### Not capturing pages?
1. Ensure "Auto Capture" is enabled
2. Check blacklist/whitelist settings
3. Verify page URL isn't blocked

### Can't search?
1. Check API key is valid
2. Verify endpoint URL
3. Check internet connection

## 🔧 Development

### Build
```bash
npm run build
```

### Development Mode (Watch)
```bash
npm run dev
```

### Clean Build
```bash
npm run clean
npm run build
```

## 📁 Project Structure

```
extensions/chrome/
├── src/
│   ├── background/
│   │   └── service-worker.ts    # Background service worker
│   ├── content/
│   │   ├── content-script.ts    # Content script
│   │   └── styles.css           # Content styles
│   ├── popup/
│   │   └── popup.ts             # Popup script
│   ├── options/
│   │   └── options.ts           # Options script
│   └── shared/
│       └── utils.ts             # Shared utilities
├── dist/                        # Built files
├── manifest.json                # Extension manifest
├── popup.html                   # Popup HTML
├── options.html                 # Options HTML
├── webpack.config.js            # Webpack config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## 🤝 Support

- 📧 Email: support@rverity.ai
- 💬 Discord: [Join our community](https://discord.gg/rverity)
- 🐛 Issues: [GitHub Issues](https://github.com/Ramrajnagar/Rverity/issues)
- 📖 Docs: [rverity.ai/docs](https://rverity.ai/docs)

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details

## 🙏 Acknowledgments

Built with ❤️ by the Rverity Team

---

**Happy Browsing with NeuroSync!** 🧠✨
