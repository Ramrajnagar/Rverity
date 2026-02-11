# Logout Flow Update

## Changes Made

### Updated Logout Behavior
**File**: `AppSidebar.tsx`

**Before**:
- Logout redirected to `/login`
- Back button stayed on login page

**After**:
- Logout redirects to `/` (home/landing page)
- Back button goes to home page
- Improved history manipulation

### How It Works:

1. **User clicks "Sign Out"**:
   - Clears Supabase session
   - Clears localStorage and sessionStorage
   - Redirects to home page (`/`)

2. **User presses back button**:
   - History is replaced with home page
   - Cannot go back to dashboard
   - Stays on home page

3. **If user tries to access dashboard**:
   - Middleware checks for session
   - No session = redirect to `/login`
   - Login page has redirect parameter

### Code Changes:

```typescript
const handleLogout = async () => {
    try {
        await supabase.auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
        onClose();
        
        // Redirect to home page
        router.replace('/');
        
        // Prevent back navigation
        setTimeout(() => {
            window.history.pushState(null, '', '/');
            window.addEventListener('popstate', function preventBack() {
                window.history.pushState(null, '', '/');
                window.removeEventListener('popstate', preventBack);
            });
        }, 100);
    } catch (error) {
        console.error('Logout error:', error);
    }
};
```

### Flow Diagram:

```
User logged in → Dashboard
       ↓
Click "Sign Out"
       ↓
Clear session + storage
       ↓
Redirect to Home (/)
       ↓
Press Back Button
       ↓
Stay on Home (/)
       ↓
Try to access /dashboard
       ↓
Middleware redirects to /login
```

---

**Status**: Complete
**Behavior**: Logout → Home → Back button stays on Home
