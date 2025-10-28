# 🔧 Feature Flags Integration Examples

## How to Use Feature Flags in Your Components

Quick examples showing how to integrate feature flags into existing components.

---

## 📦 BASIC IMPORT

```typescript
import { useFeature, useFeatureFlags } from './components/FeatureFlagsContext';
```

---

## 🎯 SIMPLE USAGE

### Check if a Single Feature is Enabled:

```typescript
import { useFeature } from './components/FeatureFlagsContext';

function MyComponent() {
  const isAIVisionEnabled = useFeature('aiVision');
  
  return (
    <div>
      {isAIVisionEnabled && (
        <button>Open AI Vision</button>
      )}
    </div>
  );
}
```

---

## 🏠 DASHBOARD VIEW EXAMPLE

### Before (without feature flags):
```typescript
export function DashboardView() {
  return (
    <div>
      <button onClick={open3DView}>3D View</button>
      <button onClick={openCyberpunk}>Cyberpunk</button>
      <button onClick={openBuilder}>Dashboard Builder</button>
      <button onClick={openAIVision}>AI Vision</button>
    </div>
  );
}
```

### After (with feature flags):
```typescript
import { useFeature } from './components/FeatureFlagsContext';

export function DashboardView() {
  const show3D = useFeature('dashboard3D');
  const showCyberpunk = useFeature('dashboardCyberpunk');
  const showBuilder = useFeature('dashboardBuilder');
  const showAIVision = useFeature('aiVision');
  
  return (
    <div>
      {show3D && <button onClick={open3DView}>3D View</button>}
      {showCyberpunk && <button onClick={openCyberpunk}>Cyberpunk</button>}
      {showBuilder && <button onClick={openBuilder}>Dashboard Builder</button>}
      {showAIVision && <button onClick={openAIVision}>AI Vision</button>}
    </div>
  );
}
```

---

## 🧩 NAVIGATION EXAMPLE

### Filter Menu Items Based on Flags:

```typescript
import { useFeatureFlags } from './components/FeatureFlagsContext';

export function Navigation() {
  const { isEnabled } = useFeatureFlags();
  
  const navItems = [
    { id: 'logistics', label: 'Logistics', flag: 'logistics' },
    { id: 'suppliers', label: 'Suppliers', flag: 'suppliers' },
    { id: 'purchase-orders', label: 'Purchase Orders', flag: 'purchaseOrders' },
  ].filter(item => isEnabled(item.flag as any));
  
  return (
    <nav>
      {navItems.map(item => (
        <a key={item.id} href={`#${item.id}`}>{item.label}</a>
      ))}
    </nav>
  );
}
```

---

## 📊 WIDGET LIBRARY EXAMPLE

### Conditionally Show Widget Types:

```typescript
import { useFeature } from './components/FeatureFlagsContext';

export function WidgetLibrary() {
  const showKPI = useFeature('widgetKPI');
  const showSalesChart = useFeature('widgetSalesChart');
  const showRevenueChart = useFeature('widgetRevenueChart');
  
  const availableWidgets = [];
  
  if (showKPI) {
    availableWidgets.push({ type: 'kpi', label: 'KPI Card' });
  }
  if (showSalesChart) {
    availableWidgets.push({ type: 'sales', label: 'Sales Chart' });
  }
  if (showRevenueChart) {
    availableWidgets.push({ type: 'revenue', label: 'Revenue Chart' });
  }
  
  return (
    <div>
      {availableWidgets.map(widget => (
        <WidgetOption key={widget.type} {...widget} />
      ))}
    </div>
  );
}
```

---

## 📈 CHART LIBRARY EXAMPLE

### Filter Chart Types:

```typescript
import { useFeatureFlags } from './components/FeatureFlagsContext';

export function ChartSelector() {
  const { isEnabled } = useFeatureFlags();
  
  const allCharts = [
    { type: 'bar', label: 'Bar Chart', flag: 'chartBar' },
    { type: 'line', label: 'Line Chart', flag: 'chartLine' },
    { type: 'pie', label: 'Pie Chart', flag: 'chartPie' },
    { type: 'sankey', label: 'Sankey Diagram', flag: 'chartSankey' },
  ];
  
  const enabledCharts = allCharts.filter(chart => 
    isEnabled(chart.flag as any)
  );
  
  return (
    <select>
      {enabledCharts.map(chart => (
        <option key={chart.type} value={chart.type}>
          {chart.label}
        </option>
      ))}
    </select>
  );
}
```

---

## 🎨 CONDITIONAL PANELS

### Show/Hide Panel Based on Flag:

```typescript
import { useFeature } from './components/FeatureFlagsContext';

export function DashboardPanels() {
  const showAIAnalysis = useFeature('aiAnalysis');
  const showCollaboration = useFeature('collaboration');
  const showPivotTables = useFeature('pivotTables');
  
  return (
    <div className="panels">
      {showAIAnalysis && (
        <button onClick={openAIAnalysis}>
          <Brain className="w-4 h-4 mr-2" />
          AI Analysis
        </button>
      )}
      
      {showCollaboration && (
        <button onClick={openCollaboration}>
          <Users className="w-4 h-4 mr-2" />
          Team
        </button>
      )}
      
      {showPivotTables && (
        <button onClick={openPivotTables}>
          <Table className="w-4 h-4 mr-2" />
          Pivot Table
        </button>
      )}
    </div>
  );
}
```

---

## 🔄 DYNAMIC FEATURE TOGGLING

### Toggle Feature from UI:

```typescript
import { useFeatureFlags } from './components/FeatureFlagsContext';

export function SettingsPanel() {
  const { flags, toggleFeature } = useFeatureFlags();
  
  return (
    <div>
      <h3>Quick Toggles</h3>
      
      <label>
        <input
          type="checkbox"
          checked={flags.dashboard3D}
          onChange={() => toggleFeature('dashboard3D')}
        />
        Enable 3D Dashboard
      </label>
      
      <label>
        <input
          type="checkbox"
          checked={flags.aiVision}
          onChange={() => toggleFeature('aiVision')}
        />
        Enable AI Vision
      </label>
    </div>
  );
}
```

---

## 🎯 MULTIPLE FLAGS

### Check Multiple Flags at Once:

```typescript
import { useFeature } from './components/FeatureFlagsContext';

export function AdvancedDashboard() {
  const has3D = useFeature('dashboard3D');
  const hasCyberpunk = useFeature('dashboardCyberpunk');
  const hasBuilder = useFeature('dashboardBuilder');
  const hasAIVision = useFeature('aiVision');
  
  const hasAnyAdvancedFeature = has3D || hasCyberpunk || hasBuilder || hasAIVision;
  
  return (
    <div>
      {hasAnyAdvancedFeature && (
        <div className="advanced-features">
          <h3>Advanced Features</h3>
          {has3D && <Dashboard3DButton />}
          {hasCyberpunk && <CyberpunkButton />}
          {hasBuilder && <BuilderButton />}
          {hasAIVision && <AIVisionButton />}
        </div>
      )}
    </div>
  );
}
```

---

## 🧪 GRADUAL FEATURE ROLLOUT

### Show Feature Based on Multiple Conditions:

```typescript
import { useFeature } from './components/FeatureFlagsContext';

export function BetaFeature() {
  const isFeatureEnabled = useFeature('advancedCharts');
  const userIsBeta = localStorage.getItem('betaUser') === 'true';
  
  const showFeature = isFeatureEnabled && userIsBeta;
  
  return (
    <div>
      {showFeature && (
        <div className="beta-feature">
          <Badge>BETA</Badge>
          <AdvancedChartsPanel />
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 THEME INTEGRATION

### Combine with Theme Context:

```typescript
import { useFeature } from './components/FeatureFlagsContext';
import { useTheme } from './components/ThemeContext';

export function ThemedDashboard() {
  const showThemeCustomizer = useFeature('themeCustomizer');
  const { backgroundStyle } = useTheme();
  
  return (
    <div style={backgroundStyle}>
      <h1>Dashboard</h1>
      
      {showThemeCustomizer && (
        <button>Customize Theme</button>
      )}
    </div>
  );
}
```

---

## 🔍 DEBUGGING

### Log Enabled Features:

```typescript
import { useFeatureFlags } from './components/FeatureFlagsContext';

export function DebugPanel() {
  const { flags } = useFeatureFlags();
  
  const enabledFeatures = Object.entries(flags)
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key);
  
  return (
    <div>
      <h3>Enabled Features ({enabledFeatures.length})</h3>
      <ul>
        {enabledFeatures.map(feature => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 📦 EXPORT/IMPORT PROGRAMMATICALLY

### Save/Load Configurations:

```typescript
import { useFeatureFlags } from './components/FeatureFlagsContext';

export function ConfigManager() {
  const { exportConfig, importConfig } = useFeatureFlags();
  
  const saveToFile = () => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'feature-config.json';
    a.click();
  };
  
  const loadFromFile = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const config = e.target?.result as string;
      importConfig(config);
    };
    reader.readAsText(file);
  };
  
  return (
    <div>
      <button onClick={saveToFile}>Save Config</button>
      <input type="file" onChange={loadFromFile} accept=".json" />
    </div>
  );
}
```

---

## 🎯 REAL-WORLD PATTERNS

### Pattern 1: Progressive Disclosure

```typescript
export function Dashboard() {
  const showBasic = useFeature('widgetKPI');
  const showIntermediate = useFeature('widgetSalesChart');
  const showAdvanced = useFeature('advancedCharts');
  
  return (
    <div>
      {/* Always show */}
      <BasicDashboard />
      
      {/* Show for intermediate users */}
      {showIntermediate && <SalesAnalytics />}
      
      {/* Show for advanced users */}
      {showAdvanced && <AdvancedAnalytics />}
    </div>
  );
}
```

### Pattern 2: Feature Gates

```typescript
export function FeatureGate({ feature, children }: {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
}) {
  const isEnabled = useFeature(feature);
  
  if (!isEnabled) {
    return (
      <div className="feature-locked">
        <Lock className="w-8 h-8" />
        <p>This feature is currently disabled</p>
      </div>
    );
  }
  
  return <>{children}</>;
}

// Usage:
<FeatureGate feature="aiVision">
  <AIVisionPanel />
</FeatureGate>
```

### Pattern 3: Fallback Content

```typescript
export function ChartRenderer() {
  const showAdvanced = useFeature('advancedCharts');
  const showBasic = useFeature('chartBar');
  
  if (showAdvanced) {
    return <AdvancedChartLibrary />;
  }
  
  if (showBasic) {
    return <BasicBarChart />;
  }
  
  return <p>No charts available</p>;
}
```

---

## ✅ BEST PRACTICES

### DO:
```typescript
// ✅ Check flag at component level
const MyComponent = () => {
  const isEnabled = useFeature('myFeature');
  return isEnabled ? <Feature /> : null;
};

// ✅ Use descriptive flag names
const showAdvancedAnalytics = useFeature('advancedCharts');

// ✅ Provide fallback UI
{showFeature ? <Feature /> : <Placeholder />}
```

### DON'T:
```typescript
// ❌ Check flag in render loop
{items.map(item => {
  const isEnabled = useFeature('feature'); // Don't do this!
  return isEnabled ? <Item /> : null;
})}

// ❌ Use magic strings
if (flags['someFeature']) { } // Use TypeScript types!

// ❌ Forget null checks
const feature = useFeature('feature');
feature.someMethod(); // Might be null!
```

---

## 🎉 SUMMARY

You can now:
- ✅ Import and use feature flags
- ✅ Conditionally render components
- ✅ Filter navigation items
- ✅ Control widget/chart availability
- ✅ Toggle features programmatically
- ✅ Export/import configurations
- ✅ Debug enabled features
- ✅ Create reusable patterns

**Key Hook:** `useFeature(flagName)` - Returns boolean  
**Full Context:** `useFeatureFlags()` - Access all methods

Start integrating feature flags into your components today! 🚀
