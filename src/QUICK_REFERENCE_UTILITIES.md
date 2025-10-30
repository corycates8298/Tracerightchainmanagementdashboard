# 🚀 Quick Reference: Utility Library

> **One-page cheat sheet for `/src/lib/` utilities**

---

## 📦 Import Patterns

```typescript
// Single import (recommended)
import { cn, formatCurrency, generateMockOrders } from '../src/lib';

// Specific imports
import { cn } from '../src/lib/utils';
import { THEME_PRESETS } from '../src/lib/constants';
import { MockData } from '../src/lib/mock-data';
```

---

## 🎨 Most Used: cn() for Styling

```typescript
import { cn } from '../src/lib/utils';

// Conditional classes
<div className={cn(
  'base-class',
  isActive && 'active-class',
  isPrimary ? 'primary' : 'secondary'
)} />

// Merge with props
<Button className={cn('default-btn', className)} />
```

---

## 💰 Formatting (utils.ts)

```typescript
formatNumber(1234)              // "1,234"
formatCurrency(1234.56)         // "$1,234.56"
formatDate(new Date())          // "Oct 30, 2024"
formatDateTime(new Date())      // "Oct 30, 2024 2:30 PM"
formatRelativeTime(yesterday)   // "1 day ago"
formatFileSize(1024000)         // "1 MB"
formatPhone('1234567890')       // "(123) 456-7890"
```

---

## 🔧 Data Manipulation (utils.ts)

```typescript
// Arrays
groupBy(items, 'category')      // Group by key
sortBy(items, 'name', 'asc')    // Sort array
unique([1, 1, 2, 3])            // [1, 2, 3]

// Objects
deepClone(obj)                  // Deep copy
isEmpty(value)                  // Check if empty

// Strings
truncate('Long text...', 20)    // Add ellipsis
capitalize('hello')             // "Hello"
camelToTitle('userName')        // "User Name"
```

---

## ⏱️ Performance (utils.ts)

```typescript
// Debounce (wait until user stops typing)
const debouncedSearch = debounce(handleSearch, 300);

// Throttle (limit frequency)
const throttledScroll = throttle(handleScroll, 1000);

// Sleep
await sleep(1000); // Wait 1 second
```

---

## 📊 Mock Data (mock-data.ts)

```typescript
import { MockData } from '../src/lib/mock-data';

// Generate test data
const orders = MockData.orders(50);        // 50 orders
const inventory = MockData.inventory(100); // 100 items
const shipments = MockData.shipments(30);  // 30 shipments
const kpis = MockData.kpis();              // Dashboard KPIs

// Time series for charts
const chartData = MockData.timeSeries(
  30,                           // 30 data points
  ['sales', 'revenue'],         // Series names
  0,                            // Min value
  1000                          // Max value
);
```

---

## 🎨 Theme & Colors (constants.ts)

```typescript
import { THEME_PRESETS, STATUS_COLORS, CHART_COLORS } from '../src/lib/constants';

// Theme presets
THEME_PRESETS.purple            // Purple gradient theme
THEME_PRESETS.blue              // Blue theme
THEME_PRESETS.cyberpunk         // Cyberpunk theme

// Status colors
STATUS_COLORS.success           // "#10b981" (green)
STATUS_COLORS.error             // "#ef4444" (red)
STATUS_COLORS.warning           // "#f59e0b" (yellow)

// Chart colors
CHART_COLORS.purple             // ['#8b5cf6', '#7c3aed', ...]
CHART_COLORS.multi              // Multi-color scheme
```

---

## 🗺️ Routes (constants.ts)

```typescript
import { ROUTES } from '../src/lib/constants';

navigate(ROUTES.dashboard)
navigate(ROUTES.inboundReceipts)
navigate(ROUTES.aiForecasting)
navigate(ROUTES.visualizationShowcase)
```

---

## ✅ Validation (utils.ts)

```typescript
isValidEmail('user@example.com')  // true
isValidPhone('1234567890')        // true
isEmpty(null)                     // true
isEmpty('')                       // true
isEmpty([])                       // true
```

---

## 📥 Export/Download (utils.ts)

```typescript
// Download as JSON
downloadJSON(data, 'report.json');

// Download as CSV
downloadCSV(tableData, 'export.csv');

// Copy to clipboard
await copyToClipboard('Text to copy');
```

---

## 🎲 Random Helpers (utils.ts)

```typescript
randomBetween(1, 100)           // Random number 1-100
randomItem(['a', 'b', 'c'])     // Random array item
generateId('user')              // "user-1234567890-abc123"
```

---

## 📅 Date Helpers (utils.ts)

```typescript
daysBetween(date1, date2)       // Days between dates
isToday(new Date())             // true
isDateInRange(date, start, end) // Check if in range
```

---

## 🎯 Math Helpers (utils.ts)

```typescript
clamp(150, 0, 100)              // 100 (clamped to max)
calculatePercentage(25, 100)    // 25
```

---

## 🔐 Safe Operations (utils.ts)

```typescript
safeJsonParse(jsonString, {})   // Returns {} if parse fails
```

---

## 🎬 Common Recipes

### 1. Data Table with Mock Data
```typescript
import { generateMockOrders, formatCurrency, formatDate } from '../src/lib';

function OrdersTable() {
  const orders = generateMockOrders(50);
  
  return (
    <table>
      {orders.map(order => (
        <tr key={order.id}>
          <td>{order.orderNumber}</td>
          <td>{formatCurrency(order.value)}</td>
          <td>{formatDate(order.orderDate)}</td>
        </tr>
      ))}
    </table>
  );
}
```

### 2. Conditional Button Styling
```typescript
import { cn } from '../src/lib';

<Button className={cn(
  'px-4 py-2',
  variant === 'primary' && 'bg-blue-500',
  variant === 'danger' && 'bg-red-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)} />
```

### 3. Debounced Search
```typescript
import { debounce } from '../src/lib';

const handleSearch = (query) => {
  // API call here
};

const debouncedSearch = debounce(handleSearch, 300);

<input onChange={(e) => debouncedSearch(e.target.value)} />
```

### 4. Chart with Time Series
```typescript
import { generateTimeSeriesData } from '../src/lib';

const data = generateTimeSeriesData(
  30,                     // 30 days
  ['sales', 'revenue'],   // Two series
  0, 1000                 // Min/max values
);

<LineChart data={data}>
  <Line dataKey="sales" />
  <Line dataKey="revenue" />
</LineChart>
```

### 5. KPI Dashboard
```typescript
import { generateKPIMetrics, formatCurrency } from '../src/lib';

function Dashboard() {
  const kpis = generateKPIMetrics();
  
  return (
    <div>
      <KPICard
        label="Revenue"
        value={formatCurrency(kpis.revenue.value)}
        trend={kpis.revenue.trend}
      />
      <KPICard
        label="Orders"
        value={kpis.orders.value}
        trend={kpis.orders.trend}
      />
    </div>
  );
}
```

### 6. Theme Selector
```typescript
import { THEME_PRESETS } from '../src/lib';

function ThemeSelector({ onSelect }) {
  return (
    <select onChange={(e) => onSelect(THEME_PRESETS[e.target.value])}>
      {Object.entries(THEME_PRESETS).map(([key, theme]) => (
        <option key={key} value={key}>{theme.name}</option>
      ))}
    </select>
  );
}
```

---

## 📚 File Reference

| File | Purpose | Size |
|------|---------|------|
| `utils.ts` | 40+ utility functions | ~400 lines |
| `constants.ts` | App-wide constants | ~350 lines |
| `mock-data.ts` | Data generators | ~350 lines |
| `ai-vision-prompts.ts` | AI vision utilities | ~250 lines |
| `index.ts` | Central exports | ~15 lines |

---

## 🔗 Full Documentation

See [`LIBRARY_FILES_SETUP.md`](LIBRARY_FILES_SETUP.md) for complete documentation.

---

**Last Updated**: October 30, 2025
