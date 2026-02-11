# GitHub Integration Setup Guide

This guide will help you set up the NeuroSync GitHub App.

## Prerequisites

- GitHub account
- NeuroSync account with API key
- Node.js 18+ installed

## Step 1: Create GitHub App

1. Go to GitHub Settings → Developer settings → GitHub Apps
2. Click "New GitHub App"
3. Fill in the details:
   - **GitHub App name**: `NeuroSync AI`
   - **Homepage URL**: `https://rverity.ai`
   - **Callback URL**: `https://rverity.ai/api/github/callback`
   - **Webhook URL**: `https://rverity.ai/api/github/webhook`
   - **Webhook secret**: Generate a random secret (save this!)

4. Set permissions:
   - **Repository permissions**:
     - Contents: Read-only
     - Metadata: Read-only
     - Pull requests: Read-only
     - Issues: Read-only
     - Commit statuses: Read-only
   - **Organization permissions**:
     - Members: Read-only

5. Subscribe to events:
   - [x] Push
   - [x] Pull request
   - [x] Pull request review
   - [x] Pull request review comment
   - [x] Issues
   - [x] Issue comment
   - [x] Commit comment
   - [x] Create (branch/tag)
   - [x] Delete (branch/tag)
   - [x] Release

6. Click "Create GitHub App"
7. Generate a private key (download and save securely)
8. Note your App ID

## Step 2: Configure Environment Variables

Add to your `.env.local`:

```env
# GitHub App Configuration
GITHUB_APP_ID=your_app_id
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your_webhook_secret
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

## Step 3: Install the App

1. Go to your GitHub App settings
2. Click "Install App"
3. Select repositories to monitor
4. Authorize the installation

## Step 4: Test Webhook

The webhook endpoint will be at:
```
POST https://rverity.ai/api/github/webhook
```

You can test it with:
```bash
curl -X POST https://rverity.ai/api/github/webhook \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -H "X-Hub-Signature-256: sha256=..." \
  -d '{"ref":"refs/heads/main","commits":[...]}'
```

## What Gets Captured

### Commits
- Commit message
- Author
- Files changed
- Repository
- Branch

### Pull Requests
- PR title and description
- Author
- Status (opened, closed, merged)
- Reviews and comments

### Issues
- Issue title and description
- Author
- Labels
- Status changes
- Comments

### Releases
- Release name and notes
- Tag
- Author

## Privacy

- Only captures metadata (no code content)
- Respects repository permissions
- Can be disabled per repository
- User controls what gets synced

## Troubleshooting

### Webhook not receiving events
1. Check webhook URL is correct
2. Verify webhook secret matches
3. Check GitHub App permissions
4. Review webhook delivery logs in GitHub

### Authentication errors
1. Verify App ID is correct
2. Check private key format
3. Ensure installation ID is valid

## Support

For help, contact support@rverity.ai or visit https://rverity.ai/docs/github
