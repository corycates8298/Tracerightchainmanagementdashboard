# 🎛️ Feature Flags - Quick Reference Card

## ONE-PAGE CHEAT SHEET

---

## 📍 ACCESS
**Sidebar → CONFIGURATION → 🎛️ Feature Flags**

---

## 🎮 BUTTONS

| Button | Color | Action |
|--------|-------|--------|
| **Enable All** | 🟢 Green | Turn all features ON |
| **Disable All** | 🔴 Red | Turn all features OFF |
| **Reset** | 🟠 Orange | Restore defaults |
| **Export** | 🔵 Blue | Save as JSON |
| **Import** | 🟣 Purple | Load JSON config |
| **Search** | - | Filter features |

---

## 📊 CATEGORIES (10 Total)

| # | Category | Count | Features |
|---|----------|-------|----------|
| 1 | **Core Logistics** | 6 | Logistics, Suppliers, POs, Inbound, Warehouse, Outbound |
| 2 | **Production** | 3 | Raw Materials, Recipes, Batches |
| 3 | **Intelligence** | 5 | Traceability, AI Reporting, Forecasting, Intel (2) |
| 4 | **System** | 3 | Administration, Governance, About |
| 5 | **Showcases** | 2 | Next-Gen, Google Sheets |
| 6 | **Dashboard** | 4 | 3D, Cyberpunk, Builder, AI Vision |
| 7 | **Panels** | 6 | AI Analysis, Collab, Cleaning, Pivot, Templates, Theme |
| 8 | **Widgets** | 8 | KPI, Sales, Revenue, Inventory, Orders, Products, Perf, Custom |
| 9 | **Charts** | 13 | Bar, Line, Pie, Area, Radar, Scatter, Tree, Sankey, Funnel, Gauge, Water, Bullet, Heat |
| 10 | **Advanced** | 4 | Advanced Charts, Real-time, Export, Notifications |

**Total:** 54 Features

---

## 🎨 VISUAL STATES

### Enabled ✅
- Border: Green
- Background: Green gradient
- Icon: Green
- Status: ✓ CheckCircle
- Badge: "ENABLED" (green)
- Opacity: 100%

### Disabled ❌
- Border: Red
- Background: Red gradient
- Icon: Red
- Status: ✗ XCircle
- Badge: "DISABLED" (red)
- Opacity: 60%

---

## 💻 CODE USAGE

### Import:
```typescript
import { useFeature } from './components/FeatureFlagsContext';
```

### Check if Enabled:
```typescript
const enabled = useFeature('featureName');
```

### Conditional Render:
```typescript
{enabled && <Component />}
```

### Toggle Programmatically:
```typescript
const { toggleFeature } = useFeatureFlags();
toggleFeature('featureName');
```

---

## 📝 FEATURE KEYS

### Core Logistics:
- `logistics`
- `suppliers`
- `purchaseOrders`
- `inboundReceipts`
- `warehouseOps`
- `outboundShipments`

### Production:
- `rawMaterials`
- `recipes`
- `batches`

### Intelligence:
- `traceability`
- `aiReporting`
- `aiForecast`
- `materialsIntel`
- `mlIntelligence`

### System:
- `administration`
- `governance`
- `about`

### Showcases:
- `showcaseVisualization`
- `showcaseSheets`

### Dashboard:
- `dashboard3D`
- `dashboardCyberpunk`
- `dashboardBuilder`
- `aiVision`

### Panels:
- `aiAnalysis`
- `collaboration`
- `dataCleaningTools`
- `pivotTables`
- `templateLibrary`
- `themeCustomizer`

### Widgets:
- `widgetKPI`
- `widgetSalesChart`
- `widgetRevenueChart`
- `widgetInventory`
- `widgetOrders`
- `widgetProducts`
- `widgetPerformance`
- `widgetCustomChart`

### Charts:
- `chartBar`
- `chartLine`
- `chartPie`
- `chartArea`
- `chartRadar`
- `chartScatter`
- `chartTreemap`
- `chartSankey`
- `chartFunnel`
- `chartGauge`
- `chartWaterfall`
- `chartBullet`
- `chartHeatmap`

### Advanced:
- `advancedCharts`
- `realTimeUpdates`
- `exportData`
- `notifications`

---

## 🔧 API METHODS

```typescript
const {
  flags,              // Object with all flags
  isEnabled,          // (key) => boolean
  toggleFeature,      // (key) => void
  enableFeature,      // (key) => void
  disableFeature,     // (key) => void
  resetFlags,         // () => void
  enableAll,          // () => void
  disableAll,         // () => void
  exportConfig,       // () => string (JSON)
  importConfig,       // (json: string) => void
} = useFeatureFlags();
```

---

## 💾 STORAGE

- **Location:** `localStorage`
- **Key:** `traceright_feature_flags`
- **Format:** JSON object
- **Persistence:** Across sessions
- **Auto-save:** On every change

---

## 🎯 USE CASES

| Use Case | Action |
|----------|--------|
| **Phased Rollout** | Enable features gradually |
| **A/B Testing** | Create 2 configs, compare |
| **Simplified UI** | Disable advanced features |
| **Development** | Disable slow features |
| **Demo Mode** | Create preset configs |
| **Team Setup** | Export & share configs |

---

## 📁 FILES

| File | Purpose |
|------|---------|
| `/components/FeatureFlagsContext.tsx` | State management |
| `/components/FeatureFlagsManager.tsx` | UI interface |
| `/FEATURE_FLAGS_GUIDE.md` | Complete guide |
| `/FEATURE_FLAGS_INTEGRATION_EXAMPLE.md` | Code examples |
| `/FEATURE_FLAGS_SUMMARY.md` | Summary |
| `/FEATURE_FLAGS_QUICK_REFERENCE.md` | This file |

---

## ⚡ QUICK ACTIONS

### Enable Everything:
1. Click **"Enable All"** (green button)

### Disable Everything:
1. Click **"Disable All"** (red button)

### Find a Feature:
1. Type in search box
2. Results filter instantly

### Save Configuration:
1. Click **"Export"** (blue button)
2. Click **"Copy to Clipboard"**
3. Save to file

### Load Configuration:
1. Click **"Import"** (purple button)
2. Paste JSON
3. Click **"Import Configuration"**

### Toggle Single Feature:
1. Click feature card OR
2. Click toggle switch

---

## 🎨 CARD ANATOMY

```
┌─────────────────────────────────┐
│ [Icon] ✓/✗         [Switch] │
│                                 │
│ Feature Name                    │
│ Description text here...        │
│                                 │
│ [ENABLED/DISABLED]  [key]       │
└─────────────────────────────────┘
```

---

## ✅ CHECKLIST

### First Time Setup:
- [ ] Navigate to Feature Flags
- [ ] Browse all categories
- [ ] Test toggling a feature
- [ ] Try search function
- [ ] Export configuration
- [ ] Save exported config

### Before Production:
- [ ] Test all critical features enabled
- [ ] Export production config
- [ ] Document team configs
- [ ] Share configs with team

---

## 🚨 IMPORTANT

- **Default:** All features ENABLED
- **Persistence:** Per-browser localStorage
- **Navigation:** Disabled features hidden from menu
- **Type-Safe:** Full TypeScript support
- **Performance:** Zero overhead when enabled

---

## 📚 LEARN MORE

**Detailed Docs:** `/FEATURE_FLAGS_GUIDE.md`  
**Code Examples:** `/FEATURE_FLAGS_INTEGRATION_EXAMPLE.md`  
**Summary:** `/FEATURE_FLAGS_SUMMARY.md`

---

## 🎉 QUICK WINS

✅ **54** controllable features  
✅ **10** organized categories  
✅ **1-click** enable/disable  
✅ **Real-time** updates  
✅ **Export/import** configs  
✅ **Auto-save** to storage  
✅ **Search** functionality  
✅ **Type-safe** TypeScript  

---

**Bookmark this page for quick reference!** 📌

**Access:** Sidebar → CONFIGURATION → 🎛️ Feature Flags
