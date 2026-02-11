# Verifying Extension API Access

## 1. Context
The Chrome and VS Code extensions communicate with the backend via the `/v1/memory` endpoint using an **API Key** in the `Authorization: Bearer <key>` header.
The previous backend implementation only supported Cookie-based authentication, which caused extensions to fail with `401 Unauthorized`.

## 2. The Fix
I have updated `apps/web/src/app/v1/memory/route.ts` to:
1.  Check for `Authorization: Bearer <token>` header.
2.  Verify the token using `ApiKeyService`.
3.  Authenticate the user associated with that key.
4.  Allow the request to proceed using `supabaseAdmin` context (service role).

## 3. Quick Verification (Manual Check)
Open your terminal and run:

```bash
# 1. Generate an API Key in Dashboard (http://localhost:3000/dashboard/settings)
# 2. Run this command (replace KEY):
curl -X POST http://localhost:3000/v1/memory \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk_neuro_YOUR_KEY" \
  -d '{"content": "Localhost verification", "source": "api_test", "tags": ["test"]}'
```

## 4. Full Extension Verification on Localhost

### Verify Chrome Extension Locally
1.  **Build the Extension**:
    ```bash
    cd extensions/chrome
    npm install
    npm run build
    ```
2.  **Load in Chrome**:
    - Go to `chrome://extensions`
    - Enable "Developer Mode" (top right)
    - Click "Load unpacked"
    - Select `neurosync-ai/extensions/chrome/dist`
3.  **Configure**:
    - Click the extension icon -> Right-click -> **Options**
    - **API Key**: Enter your key from local dashboard.
    - **Endpoint**: Enter `http://localhost:3000` (IMPORTANT: Use http, not https).
    - Click **Save**.
4.  **Test**:
    - Open any webpage.
    - Click the extension icon (Popup).
    - Verify it says "Connected".
    - Visit a few pages.
    - Check your Localhost Dashboard to see if memories appear.

### Verify VS Code Extension Locally
1.  **Open Extension Project**:
    - Open a new VS Code window for `extensions/vscode`.
2.  **Run in Debug Mode**:
    - Press `F5` to launch a new "Extension Development Host" window.
3.  **Configure**:
    - In the new window, open Settings (`Ctrl+,`).
    - Search for `neurosync`.
    - **Api Key**: Enter your key.
    - **Endpoint**: Enter `http://localhost:3000`.
4.  **Test**:
    - Open a file, make edits, save.
    - Check your Localhost Dashboard.

### Verify GitHub Integration Locally
*Note: GitHub requires a public URL for webhooks.*
1.  **Expose Localhost**:
    - Use `ngrok` or similar: `ngrok http 3000`
    - Copy the forwarding URL (e.g., `https://abc.ngrok-free.app`).
2.  **Configure GitHub App**:
    - Update Webhook URL to `https://abc.ngrok-free.app/api/github/webhook`.
3.  **Test**:
    - Push a commit to a connected repo.
    - Check `ngrok` terminal for POST request.
    - Check Dashboard for new memory.

## 5. What This Confirms
If these tests pass on localhost, the extensions generally work.
**Deployment**: When you deploy the backend to a real domain (e.g., `https://api.myapp.com`), just update the **Endpoint** setting in the extensions to match.
