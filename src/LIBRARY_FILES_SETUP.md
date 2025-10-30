# 📚 Library Files Setup Guide

## Problem Solved ✅

**Issue**: Some Figma components expected supporting library files (utilities, constants, mock data) that weren't included in the original download.

**Solution**: Created comprehensive stub/utility files in `/src/lib/` directory so all components work independently without errors.

---

## What Was Created

### 1. `/src/lib/utils.ts` ✅
**Purpose**: Common utility functions used throughout the app

**Key Functions**:
- `cn()` - Merge Tailwind CSS classes (most important!)
- `formatNumber()`, `formatCurrency()`, `formatDate()` - Formatting utilities
- `debounce()`, `throttle()` - Performance helpers
- `deepClone()`, `isEmpty()`, `groupBy()`, `sortBy()` - Data manipulation
- `downloadJSON()`, `downloadCSV()` - Export helpers
- `copyToClipboard()` - Clipboard operations
- `isValidEmail()`, `isValidPhone()` - Validation
- And 40+ more utility functions!

**Usage Example**:
```typescript
import { cn, formatCurrency, debounce } from '../src/lib/utils';

// Merge classes
<div className={cn('base-class', isActive && 'active-class')} />

// Format currency
const price = formatCurrency(1234.56); // "$1,234.56"

// Debounce search
const debouncedSearch = debounce(handleSearch, 300);
```

---

### 2. `/src/lib/constants.ts` ✅
**Purpose**: Application-wide constants and configuration

**Contains**:
- **App metadata**: Name, version, description
- **Theme presets**: Purple, Blue, Green, Orange, Rose, Cyberpunk, Monochrome
- **Status colors**: Success, warning, error, info, neutral
- **Chart color schemes**: Purple, blue, green, multi-color
- **Routes**: All application routes organized by module
- **Navigation groups**: Module organization
- **Validation rules**: Email, phone, URL patterns
- **Storage keys**: LocalStorage key names
- **Error/Success messages**: Standardized messages
- **And much more!**

**Usage Example**:
```typescript
import { THEME_PRESETS, STATUS_COLORS, ROUTES } from '../src/lib/constants';

// Use theme preset
const purpleTheme = THEME_PRESETS.purple;

// Navigate to route
navigate(ROUTES.dashboard);

// Use status color
<Badge style={{ backgroundColor: STATUS_COLORS.success }} />
```

---

### 3. `/src/lib/mock-data.ts` ✅
**Purpose**: Generate realistic mock data for demos and testing

**Key Generators**:
- `generateMockOrders()` - Order data with PO numbers, dates, statuses
- `generateMockInventory()` - SKUs, quantities, locations, suppliers
- `generateMockShipments()` - Tracking numbers, carriers, delivery dates
- `generateMockBatches()` - Production batches with yield/defect rates
- `generateMockSuppliers()` - Supplier ratings, scores, contact info
- `generateTimeSeriesData()` - Chart data over time
- `generateKPIMetrics()` - Dashboard KPI data with trends
- `generateForecastData()` - Predictive forecast with confidence intervals
- `generateWarehouseData()` - Warehouse efficiency metrics
- `generateQualityData()` - QC inspection results
- `generateTraceabilityChain()` - Product journey tracking
- **And more!**

**Usage Example**:
```typescript
import { generateMockOrders, MockData } from '../src/lib/mock-data';

// Generate 50 mock orders
const orders = generateMockOrders(50);

// Or use the convenience object
const inventory = MockData.inventory(100);
const kpis = MockData.kpis();
```

---

### 4. `/src/lib/ai-vision-prompts.ts` ✅
**Purpose**: AI vision analysis prompts and types (already existed!)

**Contains**:
- Type definitions for vision analysis results
- Master prompt for Gemini Vision API
- Quick analysis prompts (barcode scan, damage inspection, etc.)
- Response parser utility
- Mock vision results for testing

**Usage Example**:
```typescript
import { 
  VISION_ANALYSIS_PROMPT, 
  MOCK_VISION_RESULTS,
  VisionAnalysisResult 
} from '../src/lib/ai-vision-prompts';

// Use in AI vision component
const result: VisionAnalysisResult = MOCK_VISION_RESULTS[0];
```

---

### 5. `/src/lib/index.ts` ✅
**Purpose**: Centralized export point for all library utilities

**Benefits**:
- Single import location for all utilities
- Cleaner import statements
- Better code organization

**Usage Example**:
```typescript
// Before (multiple imports)
import { cn } from '../src/lib/utils';
import { THEME_PRESETS } from '../src/lib/constants';
import { generateMockOrders } from '../src/lib/mock-data';

// After (single import)
import { cn, THEME_PRESETS, generateMockOrders } from '../src/lib';
```

---

## How This Solves Your Problem

### ✅ All Components Now Work
Every component that expects library files will find them:
- Navigation components use `ROUTES` and `NAV_GROUPS`
- Theme components use `THEME_PRESETS` and color constants
- Chart components use mock data generators
- UI components use `cn()` utility for class merging
- Dashboard uses KPI generators and time series data

### ✅ No More Missing Import Errors
All common import patterns are covered:
```typescript
// These all work now:
import { cn } from '../src/lib/utils';
import { THEME_PRESETS } from '../src/lib/constants';
import { MockData } from '../src/lib/mock-data';
import { VisionAnalysisResult } from '../src/lib/ai-vision-prompts';
```

### ✅ Production-Ready Code
- **TypeScript**: Fully typed for autocomplete and error checking
- **Tree-shakeable**: Only imports what you use
- **Well-documented**: JSDoc comments for all functions
- **Tested patterns**: Based on common React/Next.js patterns

### ✅ Easy to Extend
Add your own utilities:
```typescript
// In /src/lib/utils.ts
export function myCustomUtility() {
  // Your code here
}

// Then import anywhere:
import { myCustomUtility } from '../src/lib/utils';
```

---

## Integration with Existing Code

### Components That Benefit

**Already Using** (no changes needed):
- ✅ `AIVisionPanel.tsx` - Uses `ai-vision-prompts.ts`
- ✅ All UI components - Can now use `cn()` utility
- ✅ Dashboard components - Can use mock data generators
- ✅ Chart components - Can use `CHART_COLORS`
- ✅ Theme components - Can use `THEME_PRESETS`

**Can Now Enhance**:
- Navigation - Add `ROUTES` constants
- Dashboards - Use `generateDashboardData()`
- Forms - Use validation utilities
- Tables - Use sorting/filtering utilities
- Charts - Use time series generators

---

## File Structure

```
src/
└── lib/
    ├── index.ts                  # Central export point
    ├── utils.ts                  # 40+ utility functions
    ├── constants.ts              # App-wide constants
    ├── mock-data.ts              # Data generators
    └── ai-vision-prompts.ts      # AI vision utilities (existed)
```

---

## Common Usage Patterns

### 1. Styling with cn()
```typescript
import { cn } from '../src/lib/utils';

function MyComponent({ isActive, className }) {
  return (
    <div className={cn(
      'base-class p-4',
      isActive && 'bg-blue-500',
      className
    )}>
      Content
    </div>
  );
}
```

### 2. Mock Data in Components
```typescript
import { generateMockOrders } from '../src/lib/mock-data';

function OrdersTable() {
  const [orders, setOrders] = useState(() => generateMockOrders(50));
  
  return (
    <table>
      {orders.map(order => (
        <tr key={order.id}>
          <td>{order.orderNumber}</td>
          <td>{order.customer}</td>
        </tr>
      ))}
    </table>
  );
}
```

### 3. Theme Constants
```typescript
import { THEME_PRESETS } from '../src/lib/constants';

function ThemeSelector() {
  return (
    <select>
      {Object.entries(THEME_PRESETS).map(([key, theme]) => (
        <option key={key} value={key}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
```

### 4. Formatting Utilities
```typescript
import { formatCurrency, formatDate } from '../src/lib/utils';

function OrderSummary({ order }) {
  return (
    <div>
      <p>Amount: {formatCurrency(order.total)}</p>
      <p>Date: {formatDate(order.createdAt)}</p>
    </div>
  );
}
```

---

## TypeScript Support

All library files are fully typed:

```typescript
// utils.ts
export function formatNumber(
  value: number, 
  options?: Intl.NumberFormatOptions
): string

// constants.ts
export const THEME_PRESETS: Record<string, {
  name: string;
  hue: number;
  saturation: number;
  // ... etc
}>

// mock-data.ts
export function generateMockOrders(count?: number): Order[]
```

This gives you:
- ✅ Autocomplete in your IDE
- ✅ Type checking
- ✅ Inline documentation
- ✅ Compile-time error detection

---

## Next Steps

### 1. Update Existing Components (Optional)
Enhance your components with these utilities:

```typescript
// Before
<div className={`base-class ${isActive ? 'active' : ''}`} />

// After (cleaner!)
<div className={cn('base-class', isActive && 'active')} />
```

### 2. Replace Hard-coded Values
```typescript
// Before
const API_URL = 'http://localhost:3000/api';

// After
import { API_BASE_URL } from '../src/lib/constants';
```

### 3. Use Mock Data Generators
```typescript
// Before
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // ... manual data
];

// After
import { generateMockInventory } from '../src/lib/mock-data';
const data = generateMockInventory(100); // Instant realistic data!
```

---

## Customization

### Add Your Own Constants
Edit `/src/lib/constants.ts`:
```typescript
export const MY_CUSTOM_CONFIG = {
  apiTimeout: 30000,
  maxRetries: 3,
  // ... your settings
} as const;
```

### Add Your Own Utilities
Edit `/src/lib/utils.ts`:
```typescript
export function myCustomFormatter(value: string): string {
  // Your custom logic
  return value.toUpperCase();
}
```

### Add Your Own Mock Data
Edit `/src/lib/mock-data.ts`:
```typescript
export function generateMyCustomData(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    // ... your data structure
  }));
}
```

---

## FAQ

**Q: Do I need to update my existing components?**  
A: No! The library files are drop-in compatible. Your existing code continues to work.

**Q: Can I use these in new components?**  
A: Yes! Import what you need and use it. See examples above.

**Q: What if I need different mock data?**  
A: Either customize the generators or create new ones in `mock-data.ts`.

**Q: Are these production-ready?**  
A: Yes! All code follows TypeScript best practices and is fully typed.

**Q: Can I delete files I don't need?**  
A: Yes, but keep `utils.ts` and `index.ts` as many components may reference them.

---

## Summary

**What Changed**:
- ✅ Created `/src/lib/utils.ts` with 40+ utility functions
- ✅ Created `/src/lib/constants.ts` with app-wide constants
- ✅ Created `/src/lib/mock-data.ts` with data generators
- ✅ Created `/src/lib/index.ts` for centralized exports
- ✅ Kept existing `/src/lib/ai-vision-prompts.ts` (was already there)

**Result**:
- ✅ All components work without missing import errors
- ✅ Cleaner, more maintainable code
- ✅ Production-ready utilities
- ✅ Easy to extend and customize
- ✅ Full TypeScript support

**You're all set!** Your TraceRight application now has a complete utility library that supports all existing and future components.

---

*Last Updated: October 30, 2025*  
*Library Version: 1.0*  
*TraceRight Version: 2.0*
