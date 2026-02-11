# Memory Nodes Animation - Multi-Page Implementation

## Overview
The creative memory nodes animation is now used on both the login page and knowledge graph page, with color variants to match each page's theme.

---

## Pages Using Animation

### 1. Login Page
**Location**: `/login`
**Color Variant**: Purple/Pink
**Purpose**: Engaging background for authentication

**Colors**:
- Nodes: Purple (`rgba(168, 85, 247)`)
- Connections: Purple
- Mouse interaction: Pink (`rgba(236, 72, 153)`)
- Orbs: Purple + Pink gradients

### 2. Knowledge Graph Page
**Location**: `/features/graph`
**Color Variant**: Emerald/Cyan
**Purpose**: Matches graph theme, represents knowledge connections

**Colors**:
- Nodes: Emerald (`rgba(52, 211, 153)`)
- Connections: Emerald
- Mouse interaction: Cyan (`rgba(34, 211, 238)`)
- Orbs: Emerald + Cyan gradients

---

## Animation Features

### Shared Across Both Pages:

1. **40 Floating Nodes**
   - Random positions and movement
   - Bounce off screen edges
   - Smooth, slow drift

2. **Auto-Connecting Lines**
   - Nodes connect when within 150px
   - Opacity fades with distance
   - Creates knowledge graph effect

3. **Mouse Interaction**
   - Nodes connect to cursor within 200px
   - Different color for cursor connections
   - Interactive and engaging

4. **Floating Gradient Orbs**
   - Two large gradient blurs
   - 8-10 second animation loops
   - Adds depth and atmosphere

---

## Implementation

### Component Structure:
```typescript
<MemoryNodesBackground variant="purple" />  // Login
<MemoryNodesBackground variant="emerald" /> // Graph
```

### Color Variants:
```typescript
interface MemoryNodesBackgroundProps {
    variant?: 'purple' | 'emerald';
}
```

### Variant Configuration:
```typescript
const colors = {
    purple: {
        node: 'rgba(168, 85, 247, ',
        connection: 'rgba(168, 85, 247, ',
        mouse: 'rgba(236, 72, 153, ',
        orb1: 'bg-purple-600/20',
        orb2: 'bg-pink-600/20'
    },
    emerald: {
        node: 'rgba(52, 211, 153, ',
        connection: 'rgba(52, 211, 153, ',
        mouse: 'rgba(34, 211, 238, ',
        orb1: 'bg-emerald-600/20',
        orb2: 'bg-cyan-600/20'
    }
};
```

---

## Visual Comparison

### Login Page (Purple):
```
     •  ─────  •     (Purple nodes)
    /│\       /│\
   • │ •  ───  │ •   (Purple connections)
     │    /    │
     •  ─  •  ─  •
        /   \
       •  ─  •  ←  [Cursor] (Pink lines to cursor)
```

### Graph Page (Emerald):
```
     •  ─────  •     (Emerald nodes)
    /│\       /│\
   • │ •  ───  │ •   (Emerald connections)
     │    /    │
     •  ─  •  ─  •
        /   \
       •  ─  •  ←  [Cursor] (Cyan lines to cursor)
```

---

## Technical Details

### Performance:
- Canvas-based rendering
- 60fps animation loop
- Efficient distance calculations
- Cleanup on unmount
- Responsive to window resize

### Interactivity:
- Real-time mouse tracking
- Dynamic connection updates
- Smooth transitions
- No lag or stuttering

### Accessibility:
- Decorative only (doesn't affect functionality)
- Subtle and non-distracting
- Works on all screen sizes
- Performant on all devices

---

## Files Modified

1. ✅ **Enhanced**: `MemoryNodesBackground.tsx`
   - Added color variant support
   - Purple and emerald themes
   - Dynamic color switching

2. ✅ **Updated**: `login/page.tsx`
   - Uses purple variant (default)

3. ✅ **Updated**: `features/graph/page.tsx`
   - Uses emerald variant
   - Replaced static background

---

## Benefits

### Visual Consistency:
- Same animation style across pages
- Different colors match page themes
- Professional and cohesive

### User Experience:
- Engaging and interactive
- Represents knowledge connections
- Smooth and performant
- Not overwhelming

### Brand Identity:
- Purple/pink for auth
- Emerald/cyan for graph
- Consistent with overall design
- Modern and premium feel

---

## Animation Parameters

**Shared Settings**:
- Node count: 40
- Node size: 1-4px
- Connection distance: 150px
- Mouse interaction radius: 200px
- Movement speed: 0.5px/frame
- Orb animation: 8-10 seconds

**Performance**:
- FPS: 60
- Canvas size: Full viewport
- Auto-resize on window change
- Optimized rendering

---

## Usage

### Default (Purple):
```tsx
<MemoryNodesBackground />
```

### Emerald Variant:
```tsx
<MemoryNodesBackground variant="emerald" />
```

### Future Variants:
Easy to add new color schemes:
```typescript
const colors = {
    purple: { ... },
    emerald: { ... },
    // Add more variants here
    blue: { ... },
    orange: { ... }
};
```

---

**Status**: Complete
**Pages**: Login + Knowledge Graph
**Variants**: Purple/Pink + Emerald/Cyan
**Performance**: Optimized 60fps
**Interactivity**: Mouse tracking enabled
