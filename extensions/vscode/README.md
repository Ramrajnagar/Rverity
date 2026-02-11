# NeuroSync AI - VS Code Extension

Your AI-powered second brain for Visual Studio Code. Automatically capture your coding context and recall it when you need it.

## 🚀 Features

### ✨ Automatic Context Capture
- **File Changes**: Tracks edits, saves, creates, and deletes
- **Git Commits**: Captures commit messages automatically
- **Smart Debouncing**: Configurable delay to avoid spam (default: 3s)
- **Exclusion Patterns**: Skip node_modules, dist, and other folders

### 🔍 Intelligent Search
- **Quick Search**: `Ctrl+Shift+K` (Cmd+Shift+K on Mac)
- **Full-text search** across all your captured memories
- **Filter by source**, tags, and date
- **Related memories** discovery

### 📝 Quick Notes
- **Capture Notes**: `Ctrl+Shift+N` (Cmd+Shift+N on Mac)
- Manually capture important thoughts
- Tagged automatically for easy retrieval

### 📊 Activity Dashboard
- **Recent Memories** sidebar view
- **Statistics** panel with insights
- **Timeline view** of all activities
- **Real-time sync** with WebSocket

### 🔐 Privacy First
- **Configurable exclusions** - skip sensitive files
- **Opt-in terminal capture** - disabled by default
- **Local queue** when offline
- **Your data, your control**

## 📦 Installation

1. Install from VS Code Marketplace (coming soon)
2. Or install from VSIX:
   ```bash
   code --install-extension neurosync-ai-1.0.0.vsix
   ```

## ⚙️ Setup

1. Get your API key from [rverity.ai](https://rverity.ai)
2. Open VS Code Settings (`Ctrl+,`)
3. Search for "NeuroSync"
4. Enter your API key
5. Start coding! 🎉

## 🎯 Usage

### Search Your Memories
1. Press `Ctrl+Shift+K` (or `Cmd+Shift+K` on Mac)
2. Type your search query
3. Select a result to view details

### Capture a Quick Note
1. Press `Ctrl+Shift+N` (or `Cmd+Shift+N` on Mac)
2. Type your note
3. Press Enter

### View Timeline
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "NeuroSync: Show Activity Timeline"
3. Browse your activity history

### Sidebar Views
- Click the NeuroSync icon in the Activity Bar
- View recent memories
- Check your statistics
- Refresh anytime

## ⚙️ Configuration

### Required Settings
- **API Key**: Your NeuroSync API key (get one at rverity.ai)

### Optional Settings
- **Endpoint**: API endpoint (default: https://rverity.ai)
- **Auto Capture**: Enable/disable automatic file tracking
- **Capture Git Commits**: Track commit messages
- **Capture Terminal**: Track terminal commands (opt-in)
- **Debounce Time**: Delay before capturing changes (1000-10000ms)
- **Enable Realtime**: WebSocket real-time sync
- **Enable Offline Queue**: Queue changes when offline
- **Exclude Patterns**: File patterns to skip

### Example Configuration

```json
{
  "neurosync.apiKey": "your-api-key-here",
  "neurosync.endpoint": "https://rverity.ai",
  "neurosync.autoCapture": true,
  "neurosync.captureGitCommits": true,
  "neurosync.captureTerminal": false,
  "neurosync.debounceMs": 3000,
  "neurosync.enableRealtime": true,
  "neurosync.enableOfflineQueue": true,
  "neurosync.excludePatterns": [
    "**/node_modules/**",
    "**/.git/**",
    "**/dist/**",
    "**/build/**"
  ]
}
```

## 🎨 Commands

| Command | Keybinding | Description |
|---------|-----------|-------------|
| `NeuroSync: Search Memory` | `Ctrl+Shift+K` | Search your memories |
| `NeuroSync: Capture Quick Note` | `Ctrl+Shift+N` | Capture a note |
| `NeuroSync: Show Activity Timeline` | - | View timeline |
| `NeuroSync: Toggle Auto Capture` | - | Enable/disable auto capture |
| `NeuroSync: Refresh` | - | Refresh sidebar |
| `NeuroSync: Open Settings` | - | Open settings |

## 🔧 How It Works

1. **Capture**: Automatically tracks your coding activity
2. **Sync**: Sends context to NeuroSync AI
3. **Process**: AI analyzes and indexes your memories
4. **Recall**: Search and retrieve when you need it

## 🌐 Offline Support

NeuroSync works offline! When you're disconnected:
- Changes are queued locally
- Automatically synced when back online
- No data loss

## 🔒 Privacy & Security

- **End-to-end encryption** (coming soon)
- **Configurable exclusions** for sensitive files
- **Opt-in terminal capture**
- **Your data stays yours**

## 📊 What Gets Captured?

### Automatically (if enabled):
- File edits, saves, creates, deletes
- Git commit messages
- Active file context

### Manually:
- Quick notes
- Selected text snippets

### Never Captured:
- Files matching exclusion patterns
- Terminal commands (unless opted in)
- Passwords or secrets

## 🐛 Troubleshooting

### Extension not working?
1. Check your API key in settings
2. Verify internet connection
3. Check the Output panel (View > Output > NeuroSync)

### Not capturing changes?
1. Ensure "Auto Capture" is enabled
2. Check exclusion patterns
3. Verify file is not in excluded folder

### Can't connect?
1. Check your endpoint URL
2. Verify API key is correct
3. Check firewall settings

## 🤝 Support

- 📧 Email: support@rverity.ai
- 💬 Discord: [Join our community](https://discord.gg/rverity)
- 🐛 Issues: [GitHub Issues](https://github.com/Ramrajnagar/Rverity/issues)
- 📖 Docs: [rverity.ai/docs](https://rverity.ai/docs)

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

Built with ❤️ by the Rverity Team

---

**Happy Coding with NeuroSync!** 🧠✨
