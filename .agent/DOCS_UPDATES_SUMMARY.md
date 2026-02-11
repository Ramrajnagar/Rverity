# Documentation & Dashboard Updates

## 1. Documentation Pages (`/integrations/*`)
Updated the installation commands and setup instructions to be more accurate for each platform:

- **Slack Integration**:
  - Changed install command to "Add App to Slack Workspace".
  - Clarified setup steps to use the Rverity Slack App and generate an API Key.

- **Notion Integration**:
  - Changed install command to "Configure in Notion Workspace Settings".
  - Clarified that the integration uses a Notion Integration Token and Rverity API Key.

- **Obsidian Integration**:
  - Confirmed instructions point to "Rverity Plugin" and API Key configuration.

- **VS Code**:
  - Confirmed instructions reference "Rverity" and API Key setup in VS Code settings.

- **GitHub**:
  - Clarified instructions for using the GitHub App.

- **Browser (Chrome)**:
  - Clarified that the Web Store version is "coming soon" and provided steps for loading unpacked extension.

## 2. Documentation Landing Page (`/docs`)
- Added **3 New Documentation Cards** for Slack, Notion, and Obsidian to the main docs grid.
- Users visiting `/docs` can now immediately find guides for these new integrations.

## 3. Dashboard Settings (`/dashboard/settings`)
- Verified that the definitions in `IntegrationsSection` link correctly to the updated `/integrations/*` pages.
- Users clicking "View Guide" in the dashboard will be taken to the accurate, updated instructions.

## 4. API Authentication (`/v1/memory`)
- Confirmed that the backend API now supports `Authorization: Bearer <API_KEY>` header.
- This aligns with the instructions provided in all extension/integration documentation.
