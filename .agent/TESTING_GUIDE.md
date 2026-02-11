# 🧪 Integration Testing Guide

## 🎯 Complete Testing Checklist

Since the browser automation isn't available, here's a comprehensive manual testing guide for all the updates we've made.

---

## 1. **Landing Page Testing** 🏠

### URL: `http://localhost:3001`

#### Developer Section Code Snippet:
- [ ] Scroll to the "Built for developers" section
- [ ] Verify the code snippet shows:
  ```typescript
  npm install @neurosync/sdk
  
  import { NeuroSyncClient } from '@neurosync/sdk';
  
  const client = new NeuroSyncClient({
    apiKey: 'your-api-key',
    endpoint: 'https://rverity.ai'
  });
  
  // Capture context
  await client.sendContext(
    'Working on auth feature',
    'vscode',
    ['coding', 'auth']
  );
  
  // Search memories
  const results = await client.search('auth');
  ```
- [ ] Verify syntax highlighting is correct
- [ ] Check that it's readable and properly formatted

---

## 2. **API Documentation Testing** 📚

### URL: `http://localhost:3001/docs/api`

#### Stats Section:
- [ ] Base URL shows: `rverity.ai/v1`
- [ ] Auth shows: `Bearer Token`
- [ ] Endpoints shows: `14 Available`
- [ ] Protocol shows: `REST + JSON`

#### Endpoints Section:
- [ ] **Memory Management** section exists with 6 endpoints:
  - [ ] `POST /v1/memory` - Create Memory
  - [ ] `POST /v1/memory/batch` - Batch Create Memories
  - [ ] `GET /v1/memory` - List Memories
  - [ ] `GET /v1/memory/:id` - Get Single Memory
  - [ ] `PUT /v1/memory/:id` - Update Memory
  - [ ] `DELETE /v1/memory/:id` - Delete Memory

- [ ] **Search & Discovery** section exists with 2 endpoints:
  - [ ] `GET /v1/memory/search` - Advanced Search
  - [ ] `GET /v1/memory/:id/related` - Related Memories

- [ ] **Analytics** section exists with 2 endpoints:
  - [ ] `GET /v1/insights` - Memory Insights
  - [ ] `GET /v1/stats` - Activity Statistics

- [ ] **System** section exists with 1 endpoint:
  - [ ] `GET /v1/health` - Health Check (green badge)

---

## 3. **Integration Pages Testing** 🔌

### VS Code Integration Page
**URL**: `http://localhost:3001/integrations/vscode`

- [ ] Page loads without errors
- [ ] Title shows: "NeuroSync for VS Code Extension"
- [ ] Description is present and accurate
- [ ] Features list shows 11 items with emoji icons
- [ ] Setup steps section shows 3 numbered steps
- [ ] Code example section is present
- [ ] "Get Started" button links to GitHub
- [ ] "Read Docs" button is present

### Chrome Extension Page
**URL**: `http://localhost:3001/integrations/browser`

- [ ] Page loads without errors
- [ ] Title shows: "NeuroSync for Chrome Extension"
- [ ] Description is present and accurate
- [ ] Features list shows 12 items
- [ ] Setup steps section shows 3 numbered steps (Build, Load, Configure)
- [ ] Code example shows keyboard shortcuts
- [ ] Privacy controls are mentioned
- [ ] Offline support is explained

### GitHub Integration Page
**URL**: `http://localhost:3001/integrations/github`

- [ ] Page loads without errors
- [ ] Title shows: "NeuroSync for GitHub Integration"
- [ ] Description is present and accurate
- [ ] Features list shows 12 items
- [ ] Setup steps section shows 4 numbered steps
- [ ] Code example shows payload examples
- [ ] Event types are documented
- [ ] Security features are highlighted

---

## 4. **Settings Page Testing** ⚙️

### URL: `http://localhost:3001/settings`

#### Integrations Section:
- [ ] Section loads without errors
- [ ] **GitHub Integration** card is present:
  - [ ] GitHub icon is visible
  - [ ] Shows "GitHub" title
  - [ ] Shows description or connection status
  - [ ] Has "Connect" button (if not connected)
  - [ ] OR shows "Manage" and "Disconnect" buttons (if connected)

- [ ] **VS Code Extension** card is present:
  - [ ] Code icon is visible
  - [ ] Shows "VS Code Extension" title
  - [ ] Shows description
  - [ ] Has "View Guide" button
  - [ ] Button links to `/integrations/vscode`

- [ ] **Chrome Extension** card is present:
  - [ ] Chrome icon is visible
  - [ ] Shows "Chrome Extension" title
  - [ ] Shows description
  - [ ] Has "View Guide" button
  - [ ] Button links to `/integrations/browser`

- [ ] **SDK & API** card is present:
  - [ ] Database icon is visible
  - [ ] Shows "SDK & API" title
  - [ ] Shows description
  - [ ] Has "View Docs" button
  - [ ] Button links to `/docs/api`

---

## 5. **GitHub Integration Functional Testing** 🐙

### Connect Flow:
1. [ ] Go to Settings page
2. [ ] Find GitHub integration card
3. [ ] Click "Connect" button
4. [ ] Verify redirect to GitHub App installation page
5. [ ] (Don't install yet - just verify redirect works)

### API Testing (if connected):
1. [ ] Open browser console
2. [ ] Run: `fetch('/api/github/installations').then(r => r.json()).then(console.log)`
3. [ ] Verify response shows installations array
4. [ ] Check for proper JSON structure

---

## 6. **Link Testing** 🔗

### From Landing Page:
- [ ] Click any integration card → Verify it navigates correctly
- [ ] Click "View Docs" → Verify it goes to docs

### From Settings:
- [ ] Click "View Guide" on VS Code → Goes to `/integrations/vscode`
- [ ] Click "View Guide" on Chrome → Goes to `/integrations/browser`
- [ ] Click "View Docs" on SDK → Goes to `/docs/api`

### From Integration Pages:
- [ ] Click "Get Started" button → Verify link works
- [ ] Click "Read Docs" button → Verify link works

---

## 7. **Backend API Testing** 🔌

### Health Check:
```bash
curl http://localhost:3001/v1/health
```
**Expected**: `{"status":"ok","timestamp":"..."}`

### List Memories (requires auth):
```bash
curl http://localhost:3001/v1/memory \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Expected**: `{"status":"success","data":{"memories":[...],"count":...}}`

### Get Stats (requires auth):
```bash
curl http://localhost:3001/v1/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Expected**: `{"status":"success","data":{"today":...,"thisWeek":...}}`

### Search (requires auth):
```bash
curl "http://localhost:3001/v1/memory/search?q=test&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
**Expected**: `{"status":"success","data":{"memories":[...],"count":...}}`

---

## 8. **Console Error Check** 🐛

### For Each Page:
1. [ ] Open browser DevTools (F12)
2. [ ] Go to Console tab
3. [ ] Refresh the page
4. [ ] Verify NO red errors appear
5. [ ] Warnings are okay, but errors should be investigated

### Common Issues to Check:
- [ ] No 404 errors for missing files
- [ ] No TypeScript errors
- [ ] No React hydration errors
- [ ] No CORS errors

---

## 9. **Mobile Responsiveness** 📱

### Test on Different Screen Sizes:
1. [ ] Open DevTools (F12)
2. [ ] Click device toolbar icon (Ctrl+Shift+M)
3. [ ] Test these breakpoints:
   - [ ] Mobile (375px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1024px)

### Check:
- [ ] Landing page developer section is readable
- [ ] Integration pages are scrollable
- [ ] Settings integrations stack vertically
- [ ] API docs are readable
- [ ] Buttons are clickable

---

## 10. **Performance Check** ⚡

### Page Load Times:
1. [ ] Open DevTools → Network tab
2. [ ] Hard refresh (Ctrl+Shift+R)
3. [ ] Check "Load" time at bottom
4. [ ] Should be under 3 seconds

### Check:
- [ ] Landing page loads quickly
- [ ] Integration pages load quickly
- [ ] Settings page loads quickly
- [ ] API docs page loads quickly

---

## 🎯 Quick Test Script

Run this in your browser console on each page:

```javascript
// Check for errors
console.clear();
console.log('Testing page:', window.location.pathname);

// Check for broken images
const brokenImages = Array.from(document.images).filter(img => !img.complete || img.naturalHeight === 0);
console.log('Broken images:', brokenImages.length);

// Check for broken links (404s)
const links = Array.from(document.querySelectorAll('a[href^="/"]'));
console.log('Internal links found:', links.length);

// Check for console errors
console.log('Check console for any red errors above');
```

---

## ✅ Success Criteria

### All Tests Pass If:
1. ✅ Landing page shows correct SDK code
2. ✅ API docs show all 14 endpoints
3. ✅ All 3 integration pages load with rich content
4. ✅ Settings integrations section is functional
5. ✅ GitHub integration has working Connect button
6. ✅ All links navigate correctly (no 404s)
7. ✅ No console errors on any page
8. ✅ Backend APIs respond correctly
9. ✅ Pages are mobile responsive
10. ✅ Load times are acceptable

---

## 🐛 If You Find Issues

### Report Format:
```
Page: [URL]
Issue: [Description]
Expected: [What should happen]
Actual: [What actually happens]
Console Errors: [Any errors from console]
```

---

## 🚀 Next Steps After Testing

Once all tests pass:
1. ✅ Test SDK integration end-to-end
2. ✅ Test VS Code extension
3. ✅ Test Chrome extension
4. ✅ Test GitHub integration
5. ✅ Deploy to production

---

**Created**: 2026-02-11T03:50:00+05:30
**Status**: Ready for Manual Testing
**Estimated Time**: 15-20 minutes for complete testing
