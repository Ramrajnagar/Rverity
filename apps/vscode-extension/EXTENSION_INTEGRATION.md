# NeuroSync Extension Integration Guide

This guide details how to implement the "One-Click Install & Connect" flow similar to Rverity, allowing users to seamlessly install the VS Code extension and connect it to their NeuroSync account.

## 1. Architecture Overview

To achieve a "no manual setup" experience, we use **Deep Linking** and **VS Code URI Handlers**.

**The Flow:**
1.  **User on Website**: Clicks "Connect VS Code".
2.  **Website**: Checks if the user is logged in.
3.  **Website**: Calls internal API to get/generate an API Key for the user.
4.  **Website**: Redirects the browser to `vscode://neurosync.neurosync-vscode/auth?token={API_KEY}`.
5.  **Browser**: Prompts to open VS Code.
    *   *If extension is not installed*: VS Code will prompt to install it (if published to Marketplace).
    *   *If installed*: VS Code launches and passes the URI to the extension.
6.  **Extension**: The `UriHandler` catches the `/auth` path, extracts the `token`, and securely stores it.
7.  **Extension**: Automatically connects to the backend using the token.
8.  **Backend**: Validates the token and links the session.

## 2. Implementation Details

### A. VS Code Extension (Client Side)

We have modified `apps/vscode-extension/src/extension.ts` to register a `UriHandler`.

**Key Changes:**
*   Registered `vscode.window.registerUriHandler`.
*   Handled the path `/auth`.
*   Extracted `token` query parameter.
*   Stored `token` in `context.secrets` (encrypted storage).
*   Auto-initialized the `NeuroSyncClient` with the new token.

**Requirements for Publishing:**
*   **Publisher Name**: Must match `neurosync` in `package.json`.
*   **Extension Name**: Must match `neurosync-vscode` in `package.json`.
*   **Marketplace**: You must publish the extension to the VS Code Marketplace for the `vscode:` link to work seamlessly for new users.

### B. Backend Logic (Server Side)

We created a new API route at `apps/web/src/app/api/user/token/route.ts`.

**Logic:**
1.  **Authentication**: Verifies the user's session (via Supabase).
2.  **Token Retrieval**: Checks if the user already has an API Key in the `api_keys` table.
3.  **Token Generation**: If no key exists, generates a secure random API Key and saves it.
4.  **Response**: Returns `{ token: "..." }` to the frontend.

**Database Requirement:**
You need a table (e.g., `api_keys` or a column in `profiles`) to store these keys. The provided code assumes an `api_keys` table with `user_id` and `key` columns.

### C. Frontend "Connect" Button

On your dashboard or settings page, add a button with the following logic:

```typescript
// components/ConnectExtensionButton.tsx
'use client';

export function ConnectExtensionButton() {
  const handleConnect = async () => {
    // 1. Get the token
    const res = await fetch('/api/user/token');
    const { token } = await res.json();
    
    if (token) {
      // 2. Redirect to VS Code
      // Format: vscode://{publisher}.{name}/auth?token={token}
      window.location.href = `vscode://neurosync.neurosync-vscode/auth?token=${token}`;
    }
  };

  return (
    <button onClick={handleConnect} className="btn-primary">
      Connect VS Code
    </button>
  );
}
```

### D. GitHub Integration ("Go GitHub To")

The "GitHub Integration" works similarly but server-side:
1.  **Connect**: User clicks "Connect GitHub" on the website.
2.  **OAuth**: Redirects to GitHub OAuth (handled by `api/github/callback` - already visible in your codebase).
3.  **Link**: GitHub returns an Access Token.
4.  **Storage**: Backend stores this token in `github_installations` (as seen in your existing code).
5.  **Sync**: The backend (not the extension) uses this token to fetch/index PRs and Issues.

**Unified Experience**:
*   The **Extension** captures code context from the editor.
*   The **Backend** captures context from GitHub.
*   Both feed into the "One Memory" / NeuroSync layer.

## 3. Next Steps

1.  **Database**: Ensure the `api_keys` table exists in Supabase.
2.  **Publish**: Package and publish the extension (`vsce publish`).
3.  **Frontend**: Add the `ConnectExtensionButton` to your web app.
4.  **Verify**: Test the flow by clicking the button and confirming the extension receives the token.
