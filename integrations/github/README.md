# NeuroSync GitHub Integration

Automatically capture your GitHub activity and build a comprehensive memory of your development work.

## 🚀 Features

### ✨ Automatic Capture
- **Commits & Pushes**: Track all commits with messages, files changed, and authors
- **Pull Requests**: Capture PR creation, updates, reviews, and merges
- **Issues**: Track issue creation, updates, comments, and closures
- **Releases**: Record new releases and version tags
- **Branches**: Monitor branch creation and deletion
- **Reviews**: Capture code review comments and approvals

### 🔒 Privacy First
- **Metadata Only**: Only captures commit messages, PR titles, issue descriptions (no code content)
- **User Controlled**: You choose which repositories to monitor
- **Easy Disconnect**: Remove the integration anytime
- **Secure**: Uses GitHub's official OAuth and webhook system

### 📊 Benefits
- **Never Forget**: Remember what you worked on across all repositories
- **Context Preservation**: Full history of your development activity
- **Search Everything**: Find that PR or issue you worked on months ago
- **Team Insights**: See collaboration patterns and activity

---

## 📦 Installation

### Step 1: Create GitHub App

1. Go to [GitHub Developer Settings](https://github.com/settings/apps)
2. Click "New GitHub App"
3. Configure the app:

**Basic Information**:
- **Name**: `NeuroSync AI` (or your preferred name)
- **Homepage URL**: `https://rverity.ai`
- **Callback URL**: `https://rverity.ai/api/github/callback`
- **Webhook URL**: `https://rverity.ai/api/github/webhook`
- **Webhook Secret**: Generate a secure random string

**Permissions** (Repository):
- Contents: Read-only
- Metadata: Read-only
- Pull requests: Read-only
- Issues: Read-only
- Commit statuses: Read-only

**Subscribe to Events**:
- [x] Push
- [x] Pull request
- [x] Pull request review
- [x] Pull request review comment
- [x] Issues
- [x] Issue comment
- [x] Commit comment
- [x] Create
- [x] Delete
- [x] Release

4. Click "Create GitHub App"
5. Generate a private key (download and save securely)
6. Note your **App ID** and **Client ID**

---

### Step 2: Configure Environment

Add to `.env.local`:

```env
# GitHub App Configuration
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here
GITHUB_CLIENT_ID=Iv1.abc123def456
GITHUB_CLIENT_SECRET=your_client_secret_here
```

**Important**: Replace newlines in private key with `\n`

---

### Step 3: Set Up Database

Run the schema migration:

```bash
psql $DATABASE_URL < integrations/github/schema.sql
```

Or apply via Supabase dashboard:
1. Go to SQL Editor
2. Paste contents of `schema.sql`
3. Run the query

---

### Step 4: Install the App

1. Go to your GitHub App settings
2. Click "Install App"
3. Choose your account or organization
4. Select repositories:
   - All repositories, or
   - Only select repositories
5. Click "Install"

You'll be redirected to the callback URL and the integration will be active!

---

## 🎯 Usage

### Dashboard Integration

Add to your dashboard:

```tsx
import GitHubIntegration from '@/integrations/github/src/components/GitHubIntegration';

export default function SettingsPage() {
    return (
        <div>
            <h1>Integrations</h1>
            <GitHubIntegration />
        </div>
    );
}
```

### Managing Installations

**View Connected Accounts**:
```bash
GET /api/github/installations
```

**Disconnect Account**:
```bash
DELETE /api/github/installations?installation_id=12345
```

---

## 📊 What Gets Captured

### Push Events
```json
{
  "content": "Pushed 3 commits to owner/repo/main: Fix bug; Add feature; Update docs",
  "tags": ["github", "push", "commit", "main"],
  "metadata": {
    "repository": "owner/repo",
    "branch": "main",
    "pusher": "username",
    "commits": 3,
    "filesChanged": 12,
    "url": "https://github.com/..."
  }
}
```

### Pull Request Events
```json
{
  "content": "opened PR #42 in owner/repo: Add new feature",
  "tags": ["github", "pull-request", "opened", "open"],
  "metadata": {
    "repository": "owner/repo",
    "prNumber": 42,
    "title": "Add new feature",
    "author": "username",
    "baseBranch": "main",
    "headBranch": "feature-branch",
    "url": "https://github.com/..."
  }
}
```

### Issue Events
```json
{
  "content": "opened issue #123 in owner/repo: Bug in login",
  "tags": ["github", "issue", "opened", "open"],
  "metadata": {
    "repository": "owner/repo",
    "issueNumber": 123,
    "title": "Bug in login",
    "author": "username",
    "labels": ["bug", "priority-high"],
    "url": "https://github.com/..."
  }
}
```

---

## 🔧 API Endpoints

### Webhook Handler
**Endpoint**: `POST /api/github/webhook`

Receives GitHub webhook events and creates memories.

**Headers**:
- `X-GitHub-Event`: Event type (push, pull_request, etc.)
- `X-Hub-Signature-256`: Webhook signature for verification

---

### OAuth Callback
**Endpoint**: `GET /api/github/callback`

Handles OAuth flow after app installation.

**Query Parameters**:
- `code`: OAuth authorization code
- `installation_id`: GitHub installation ID
- `setup_action`: Setup action type

---

### Installations Management
**Endpoint**: `GET /api/github/installations`

List user's GitHub installations.

**Response**:
```json
{
  "status": "success",
  "data": {
    "installations": [...],
    "count": 2
  }
}
```

---

**Endpoint**: `DELETE /api/github/installations?installation_id=123`

Remove a GitHub installation.

---

## 🐛 Troubleshooting

### Webhook Not Receiving Events

1. **Check Webhook URL**: Ensure it's publicly accessible
2. **Verify Secret**: Make sure `GITHUB_WEBHOOK_SECRET` matches
3. **Check Permissions**: Verify app has required permissions
4. **Review Logs**: Check webhook delivery logs in GitHub App settings

### Authentication Errors

1. **Verify App ID**: Check `GITHUB_APP_ID` is correct
2. **Check Private Key**: Ensure proper format with `\n` for newlines
3. **Validate Installation**: Confirm installation ID exists

### Events Not Captured

1. **Check Subscriptions**: Ensure event types are subscribed in app settings
2. **Verify Repository Access**: Confirm app is installed on the repository
3. **Review Database**: Check `github_installations` table has entry

---

## 🔒 Security

### Webhook Verification
All webhooks are verified using HMAC SHA-256 signature:

```typescript
const verifier = new GitHubWebhookVerifier(secret);
if (!verifier.verify(payload, signature)) {
    return 401; // Unauthorized
}
```

### Token Storage
- Access tokens encrypted in database
- Row-level security enforced
- Users can only access their own installations

### Permissions
- **Read-only**: App never modifies your repositories
- **Metadata only**: No code content is captured
- **User controlled**: You choose what to monitor

---

## 📈 Analytics

View your GitHub activity in the dashboard:
- Commits per day/week/month
- Most active repositories
- PR review patterns
- **Homepage URL**: `http://localhost:3000` (or your deployed URL)
- **Callback URL**: `http://localhost:3000/api/github/callback`
- **Webhook URL**: `http://localhost:3000/api/github/webhook` (use ngrok for local dev)
- Issue resolution time
- Collaboration insights

---

## 🤝 Support

- 📧 Email: support@neurosync.ai
- 💬 Discord: [Join our community](https://discord.gg/rverity)
- 🐛 Issues: [GitHub Issues](https://github.com/Ramrajnagar/neurosync-ai/issues)
- 📖 Docs: [neurosync.ai/docs/github](http://localhost:3000/docs/github)

---

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details

---

**Happy Coding with NeuroSync!** 🚀✨
