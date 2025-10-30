# 📂 Library File Structure & Relationships

## Visual Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Components                          │
│  (DashboardView, Navigation, Charts, etc.)                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ import { cn, formatCurrency, ... }
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              /src/lib/index.ts (Central Hub)                │
│         Re-exports everything from all lib files            │
└─────┬────────┬────────┬────────┬─────────────────────────┬──┘
      │        │        │        │                         │
      ▼        ▼        ▼        ▼                         ▼
┌──────────┐ ┌───────┐ ┌──────┐ ┌──────────────┐ ┌──────────────┐
│ utils.ts │ │const  │ │mock  │ │ai-vision     │ │ Your custom  │
│          │ │ants.ts│ │-data │ │-prompts.ts   │ │ lib files    │
│ 40+      │ │       │ │.ts   │ │              │ │ (future)     │
│functions │ │Config │ │Data  │ │AI Vision     │ │              │
│          │ │values │ │gens  │ │utilities     │ │              │
└──────────┘ └───────┘ └──────┘ └──────────────┘ └──────────────┘
```

---

## File Dependencies

### 1. `/src/lib/utils.ts` (No dependencies)
```
utils.ts
├── Imports: clsx, tailwind-merge
└── Exports: 40+ utility functions
    ├── cn() - Class name merger
    ├── formatNumber() - Number formatting
    ├── formatCurrency() - Currency formatting
    ├── formatDate() - Date formatting
    ├── debounce() - Debounce function
    ├── throttle() - Throttle function
    └── ... 34+ more functions
```

### 2. `/src/lib/constants.ts` (No dependencies)
```
constants.ts
├── Imports: None (pure data)
└── Exports: Configuration objects
    ├── APP_NAME, APP_VERSION
    ├── THEME_PRESETS (8 themes)
    ├── STATUS_COLORS
    ├── CHART_COLORS
    ├── ROUTES (all app routes)
    ├── NAV_GROUPS
    └── ... many more constants
```

### 3. `/src/lib/mock-data.ts` (Depends on utils.ts)
```
mock-data.ts
├── Imports: randomBetween, randomItem from utils.ts
└── Exports: Data generators
    ├── generateMockOrders()
    ├── generateMockInventory()
    ├── generateMockShipments()
    ├── generateTimeSeriesData()
    ├── generateKPIMetrics()
    └── MockData object (convenience wrapper)
```

### 4. `/src/lib/ai-vision-prompts.ts` (No dependencies)
```
ai-vision-prompts.ts
├── Imports: None
└── Exports: AI vision utilities
    ├── Type definitions (VisionAnalysisResult, etc.)
    ├── VISION_ANALYSIS_PROMPT
    ├── Quick prompts (BARCODE_SCAN_PROMPT, etc.)
    ├── parseVisionResponse()
    └── MOCK_VISION_RESULTS
```

### 5. `/src/lib/index.ts` (Central hub)
```
index.ts
├── Imports: Everything from other lib files
└── Exports: Re-exports everything
    ├── export * from './utils'
    ├── export * from './constants'
    ├── export * from './mock-data'
    └── export * from './ai-vision-prompts'
```

---

## Import Flow Diagrams

### Pattern 1: Direct Import
```
Component.tsx
    │
    │ import { cn } from '../src/lib/utils'
    ▼
utils.ts
    │
    └─→ Returns cn function
```

### Pattern 2: Central Import (Recommended)
```
Component.tsx
    │
    │ import { cn, THEME_PRESETS } from '../src/lib'
    ▼
index.ts
    │
    ├─→ Finds cn in utils.ts
    └─→ Finds THEME_PRESETS in constants.ts
    │
    └─→ Returns both
```

### Pattern 3: Mock Data with Utils
```
Component.tsx
    │
    │ import { generateMockOrders } from '../src/lib/mock-data'
    ▼
mock-data.ts
    │
    │ Uses randomBetween() internally
    ├─→ Imports from utils.ts
    │       │
    │       └─→ randomBetween function
    │
    └─→ Returns generated orders
```

---

## Usage Frequency Map

### Most Used (⭐⭐⭐⭐⭐)
```typescript
import { cn } from '../src/lib/utils';
// Used in almost every component for conditional styling
```

### Very Common (⭐⭐⭐⭐)
```typescript
import { formatCurrency, formatDate } from '../src/lib/utils';
// Used in dashboards, tables, reports
```

### Common (⭐⭐⭐)
```typescript
import { THEME_PRESETS, STATUS_COLORS } from '../src/lib/constants';
// Used in theme components, status badges
```

```typescript
import { generateMockOrders, MockData } from '../src/lib/mock-data';
// Used for demos and testing
```

### Occasional (⭐⭐)
```typescript
import { debounce, throttle } from '../src/lib/utils';
// Used for search inputs, scroll handlers
```

```typescript
import { ROUTES } from '../src/lib/constants';
// Used in navigation components
```

### Specialized (⭐)
```typescript
import { VisionAnalysisResult } from '../src/lib/ai-vision-prompts';
// Only used in AI Vision components
```

---

## File Size & Complexity

```
File                    Lines   Exports   Complexity
─────────────────────────────────────────────────────
utils.ts                ~400    40+       Medium
constants.ts            ~350    50+       Low (data)
mock-data.ts            ~350    15+       Medium
ai-vision-prompts.ts    ~250    10+       Low (types)
index.ts                ~15     100+      Very Low
─────────────────────────────────────────────────────
Total                   ~1,365  215+
```

---

## Component → Library Relationships

### Dashboard Components
```
DashboardView.tsx
├── Uses: cn, formatCurrency, formatDate
├── Uses: MockData.dashboard()
└── Uses: CHART_COLORS

DashboardBuilder.tsx
├── Uses: cn, generateId
└── Uses: WIDGET_TYPES
```

### Chart Components
```
VisualizationShowcase.tsx
├── Uses: cn
└── Uses: (generates own data, could use MockData)

charts.ts
└── (No lib dependencies, just re-exports recharts)
```

### Theme Components
```
ThemeContext.tsx
├── Uses: THEME_PRESETS
└── Uses: (localStorage helpers could use safeJsonParse)

ThemeCustomizer.tsx
├── Uses: cn
├── Uses: THEME_PRESETS
└── Uses: ANIMATION_DURATION
```

### AI Components
```
AIVisionPanel.tsx
├── Uses: VisionAnalysisResult
└── Uses: MOCK_VISION_RESULTS

AIForecastingView.tsx
├── Uses: formatNumber, formatCurrency
└── Uses: generateForecastData()
```

### Navigation
```
Navigation.tsx
├── Uses: cn
├── Uses: ROUTES
└── Uses: NAV_GROUPS (potentially)
```

### Tables & Lists
```
Any Table Component
├── Uses: cn
├── Uses: formatCurrency, formatDate
├── Uses: sortBy, groupBy
└── Uses: generateMock*() for data
```

---

## Function Categories

### 🎨 Styling (utils.ts)
- `cn()` - Merge classes

### 💰 Formatting (utils.ts)
- `formatNumber()`, `formatCurrency()`, `formatDate()`
- `formatDateTime()`, `formatRelativeTime()`
- `formatFileSize()`, `formatPhone()`

### 📊 Data Manipulation (utils.ts)
- `groupBy()`, `sortBy()`, `unique()`
- `deepClone()`, `isEmpty()`

### ⚡ Performance (utils.ts)
- `debounce()`, `throttle()`, `sleep()`

### ✅ Validation (utils.ts)
- `isValidEmail()`, `isValidPhone()`

### 📥 Export/Import (utils.ts)
- `downloadJSON()`, `downloadCSV()`
- `copyToClipboard()`

### 🎲 Utilities (utils.ts)
- `generateId()`, `randomBetween()`, `randomItem()`
- `clamp()`, `calculatePercentage()`

### 🎨 Theme (constants.ts)
- `THEME_PRESETS`, `STATUS_COLORS`, `CHART_COLORS`

### 🗺️ Navigation (constants.ts)
- `ROUTES`, `NAV_GROUPS`

### 📋 Configuration (constants.ts)
- `APP_NAME`, `TIMEOUTS`, `VALIDATION`, etc.

### 📊 Mock Data (mock-data.ts)
- `generateMock*()` functions
- `MockData` convenience object

### 🤖 AI Vision (ai-vision-prompts.ts)
- Type definitions
- Prompts
- Mock results

---

## Best Practices

### ✅ DO:
```typescript
// Use central import
import { cn, formatCurrency } from '../src/lib';

// Or specific imports
import { cn } from '../src/lib/utils';

// Import multiple from same file
import { THEME_PRESETS, ROUTES } from '../src/lib/constants';
```

### ❌ DON'T:
```typescript
// Don't mix patterns unnecessarily
import { cn } from '../src/lib/utils';
import { formatCurrency } from '../src/lib';  // Inconsistent

// Don't duplicate constants
const myRoutes = { dashboard: '/' };  // Use ROUTES instead
```

---

## Extending the Library

### Add a New Utility Function

1. Open `/src/lib/utils.ts`
2. Add your function:
```typescript
export function myNewUtility(param: string): string {
  // Your implementation
  return param.toUpperCase();
}
```
3. It's automatically available via index.ts!
```typescript
import { myNewUtility } from '../src/lib';
```

### Add a New Constant

1. Open `/src/lib/constants.ts`
2. Add your constant:
```typescript
export const MY_CONFIG = {
  setting1: 'value1',
  setting2: 'value2',
} as const;
```
3. Use it:
```typescript
import { MY_CONFIG } from '../src/lib/constants';
```

### Add a New Data Generator

1. Open `/src/lib/mock-data.ts`
2. Add your generator:
```typescript
export function generateMyData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // ... your data
  }));
}
```
3. Use it:
```typescript
import { generateMyData } from '../src/lib/mock-data';
```

---

## Quick Reference Table

| Need | Import | From |
|------|--------|------|
| Merge classes | `cn` | utils.ts |
| Format money | `formatCurrency` | utils.ts |
| Format date | `formatDate` | utils.ts |
| Debounce | `debounce` | utils.ts |
| Theme colors | `THEME_PRESETS` | constants.ts |
| App routes | `ROUTES` | constants.ts |
| Status colors | `STATUS_COLORS` | constants.ts |
| Mock orders | `generateMockOrders` | mock-data.ts |
| Mock any data | `MockData.*` | mock-data.ts |
| AI vision types | `VisionAnalysisResult` | ai-vision-prompts.ts |

---

## Summary

- **5 files** in `/src/lib/`
- **215+ exports** total
- **Zero dependencies** between most files
- **One import location** via `index.ts`
- **Fully typed** with TypeScript
- **Easy to extend** - just add to existing files

**Everything your components need is now available!** 🎉
