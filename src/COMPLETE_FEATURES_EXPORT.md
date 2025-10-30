# TraceRight Complete Features Export
## Comprehensive Guide for LLM Context Sharing

> **Purpose**: This document consolidates ALL features, visualizations, and capabilities from the TraceRight AI-powered supply chain platform into a single, easy-to-share format for LLM collaboration.

---

## 📋 Table of Contents
1. [Platform Overview](#platform-overview)
2. [Advanced Visualizations](#advanced-visualizations)
3. [Smart Automation System](#smart-automation-system)
4. [Dashboard & Analytics](#dashboard--analytics)
5. [Google Sheets Integration](#google-sheets-integration)
6. [Theme & Customization](#theme--customization)
7. [Feature Flags System](#feature-flags-system)
8. [Technical Architecture](#technical-architecture)
9. [Component Inventory](#component-inventory)
10. [Data Structures Reference](#data-structures-reference)

---

## Platform Overview

### Core Identity
- **Name**: TraceRight
- **Type**: AI-powered supply chain management platform
- **Theme**: Modern purple/violet gradient emphasizing AI capabilities
- **Architecture**: Decoupled, Firebase-based with Remote Config
- **Key Integrations**: Firestore, BigQuery, Google Maps, Google Sheets

### Four Main Modules
1. **Core Logistics**: Inbound receipts, outbound shipments, logistics tracking
2. **Production**: Raw materials, batches, recipes, purchase orders
3. **Intelligence**: AI forecasting, ML intelligence, materials intelligence, traceability
4. **System**: Governance, administration, feature flags, theme customization

---

## Advanced Visualizations

### 1. Sankey Flow Diagram
**Purpose**: Visualize material flow through supply chain network

**Features**:
- Node-based flow representation
- Link thickness represents volume
- Interactive tooltips
- Color-coded paths

**Use Cases**:
- Supply chain flow tracking
- Material movement visualization
- Bottleneck identification
- Network optimization

**Data Structure**:
```javascript
{
  nodes: [
    { name: 'Suppliers' },
    { name: 'Warehouse A' },
    { name: 'Warehouse B' },
    { name: 'Production' },
    { name: 'Distribution' },
    { name: 'Customers' }
  ],
  links: [
    { source: 0, target: 1, value: 450 },
    { source: 0, target: 2, value: 320 },
    { source: 1, target: 3, value: 380 },
    { source: 2, target: 3, value: 290 },
    { source: 3, target: 4, value: 650 },
    { source: 4, target: 5, value: 650 }
  ]
}
```

**Visual Styling**:
- Node fill: #8b5cf6 (purple)
- Node stroke: #7c3aed
- Link stroke: #c4b5fd with 0.5 opacity
- Background: Gradient from purple-50 to pink-50

---

### 2. Category Treemap
**Purpose**: Hierarchical product category distribution by value

**Features**:
- Multi-level hierarchy support
- Size represents value/volume
- Color-coded by category
- Drill-down capability

**Use Cases**:
- Product portfolio analysis
- Inventory distribution
- Category performance
- Space optimization

**Data Structure**:
```javascript
[
  {
    name: 'Electronics',
    children: [
      { name: 'Smartphones', size: 4500, fill: '#8b5cf6' },
      { name: 'Laptops', size: 3200, fill: '#7c3aed' },
      { name: 'Tablets', size: 2100, fill: '#6d28d9' }
    ]
  },
  {
    name: 'Clothing',
    children: [
      { name: 'Shirts', size: 2800, fill: '#3b82f6' },
      { name: 'Pants', size: 2200, fill: '#2563eb' },
      { name: 'Accessories', size: 1500, fill: '#1d4ed8' }
    ]
  },
  {
    name: 'Food',
    children: [
      { name: 'Fresh Produce', size: 3800, fill: '#10b981' },
      { name: 'Packaged', size: 2900, fill: '#059669' },
      { name: 'Frozen', size: 1800, fill: '#047857' }
    ]
  }
]
```

---

### 3. Order Funnel Chart
**Purpose**: Track orders through fulfillment stages with conversion rates

**Features**:
- Stage-by-stage progression
- Conversion visualization
- Drop-off identification
- Animated transitions

**Use Cases**:
- Order fulfillment tracking
- Bottleneck identification
- Process efficiency analysis
- Conversion optimization

**Data Structure**:
```javascript
[
  { stage: 'Orders Received', value: 1000, fill: '#8b5cf6' },
  { stage: 'Orders Validated', value: 850, fill: '#7c3aed' },
  { stage: 'In Production', value: 720, fill: '#6d28d9' },
  { stage: 'Quality Check', value: 680, fill: '#5b21b6' },
  { stage: 'Shipped', value: 650, fill: '#4c1d95' }
]
```

**Conversion Rates**:
- Received → Validated: 85%
- Validated → Production: 84.7%
- Production → Quality: 94.4%
- Quality → Shipped: 95.6%
- **Overall**: 65% order completion rate

---

### 4. Performance Gauge (Radial Bar)
**Purpose**: Real-time KPI monitoring with visual gauge representation

**Features**:
- 180° radial display
- Color-coded performance zones
- Percentage display
- Animated updates

**Use Cases**:
- KPI dashboards
- Performance monitoring
- Efficiency scoring
- Goal tracking

**Data Structure**:
```javascript
[
  { name: 'Performance', value: 87, fill: '#10b981' },
  { name: 'Remaining', value: 13, fill: '#e5e7eb' }
]
```

**Configuration**:
- Inner Radius: 30%
- Outer Radius: 100%
- Start Angle: 180°
- End Angle: 0°
- Corner Radius: 10px

---

### 5. 3D Efficiency Scatter Plot
**Purpose**: Multi-dimensional warehouse efficiency analysis

**Features**:
- Three-axis visualization (X, Y, Z)
- Color-coded by efficiency
- Bubble size represents capacity
- Interactive tooltips

**Use Cases**:
- Warehouse performance comparison
- Multi-dimensional analysis
- Outlier identification
- Optimization planning

**Data Structure**:
```javascript
[
  { x: 100, y: 200, z: 200, efficiency: 85 },
  { x: 120, y: 300, z: 250, efficiency: 92 },
  { x: 170, y: 400, z: 300, efficiency: 78 },
  { x: 140, y: 350, z: 280, efficiency: 88 },
  { x: 150, y: 380, z: 320, efficiency: 95 },
  { x: 110, y: 280, z: 240, efficiency: 81 }
]
```

**Dimensions**:
- X-Axis: Throughput (units/hour)
- Y-Axis: Volume (cubic meters)
- Z-Axis: Capacity (bubble size, range: 60-400)

**Color Coding**:
- Green (#10b981): Efficiency > 90%
- Yellow (#f59e0b): Efficiency 80-90%
- Red (#ef4444): Efficiency < 80%

---

### 6. Real-Time Data Stream
**Purpose**: Live multi-stream data visualization with smooth animations

**Features**:
- Multiple concurrent data streams
- Real-time updates (1-second intervals)
- Gradient fill effects
- Smooth animations
- Sliding window display

**Use Cases**:
- Live monitoring dashboards
- Sensor data visualization
- Network traffic analysis
- System health monitoring

**Data Structure**:
```javascript
// Initial data with 20 points
Array.from({ length: 20 }, (_, i) => ({
  time: i,
  stream1: Math.random() * 100,
  stream2: Math.random() * 80,
  stream3: Math.random() * 60
}))

// Updates every 1000ms with new data point
{
  time: previousTime + 1,
  stream1: Math.random() * 100,
  stream2: Math.random() * 80,
  stream3: Math.random() * 60
}
```

**Visual Effects**:
- Stream 1: Cyan gradient (#06b6d4)
- Stream 2: Purple gradient (#8b5cf6)
- Stream 3: Green gradient (#10b981)
- Gradient opacity: 80% to 0% (top to bottom)

---

## Smart Automation System

### Visual Workflow Builder

**Core Features**:
- Drag-and-drop interface
- Real-time execution preview
- Step-by-step animation
- Status tracking
- Interactive controls

**Node Types**:
1. **Trigger**: Initiates workflow (e.g., "New Order Created")
2. **Condition**: Decision points (e.g., "Check Inventory")
3. **Action**: Executable tasks (e.g., "Generate Pick List")
4. **End**: Workflow completion

**Node Statuses**:
- **Idle**: Gray (#cbd5e1) - Awaiting execution
- **Running**: Blue (#2563eb) - Currently processing, animated pulse
- **Success**: Green (#16a34a) - Completed successfully
- **Error**: Red (#dc2626) - Failed execution

**Example Workflow**:
```
1. [TRIGGER] New Order Created
   ↓
2. [CONDITION] Check Inventory
   ↓
3. [ACTION] Generate Pick List
   ↓
4. [ACTION] Notify Warehouse
   ↓
5. [CONDITION] Quality Verified?
   ↓
6. [ACTION] Ship Order
   ↓
7. [END] Complete
```

**Execution Timing**: 1 second per step with visual animations

---

### AI-Powered Smart Triggers

**Purpose**: Intelligent event detection and prediction

**Features**:
- ML-based prediction
- Confidence scoring
- Active/Inactive states
- Real-time monitoring

**Trigger Examples**:

1. **Inventory Low**
   - Confidence: 98%
   - Status: Active
   - Action: Auto-reorder materials

2. **Demand Spike Predicted**
   - Confidence: 87%
   - Status: Active
   - Action: Adjust production schedule

3. **Supplier Delay Risk**
   - Confidence: 73%
   - Status: Inactive
   - Action: Alert procurement team

4. **Quality Issue Pattern**
   - Confidence: 91%
   - Status: Active
   - Action: Trigger QC inspection

**Confidence Visualization**:
- Progress bar with gradient (blue-600 to cyan-600)
- Percentage display
- Color-coded status badges

---

### Automated Actions

**Purpose**: Pre-configured smart responses to triggers

**Available Actions**:

1. **Auto-Reorder Materials**
   - Executions: 247
   - Trigger: Inventory threshold reached
   - Result: Purchase order generation

2. **Send Alert Notifications**
   - Executions: 892
   - Trigger: Critical events
   - Result: Team notifications via email/SMS

3. **Update Forecasts**
   - Executions: 156
   - Trigger: Significant demand changes
   - Result: AI model retraining

4. **Generate Reports**
   - Executions: 423
   - Trigger: Scheduled intervals
   - Result: PDF/Excel report creation

**Execution Tracking**:
- Total execution count
- Success rate monitoring
- Performance metrics
- Error logging

---

### Pre-Built Workflow Templates

**Purpose**: Industry-standard automation ready to deploy

**Available Templates**:

1. **Order-to-Cash** (12 steps)
   - Complete order fulfillment automation
   - Payment processing integration
   - Customer notification system

2. **Procure-to-Pay** (9 steps)
   - Supplier ordering workflow
   - Invoice matching
   - Payment automation

3. **Quality Control** (7 steps)
   - Automated QC checks
   - Approval routing
   - Defect tracking

4. **Inventory Optimization** (8 steps)
   - Smart reordering
   - Stock balancing
   - Dead stock identification

5. **Returns Processing** (6 steps)
   - RMA automation
   - Refund handling
   - Restocking workflow

6. **Compliance Reporting** (10 steps)
   - Regulatory report generation
   - Data aggregation
   - Automated submission

**Template Structure**:
- Icon representation
- Step count
- Description
- One-click deployment
- Customization options

---

## Dashboard & Analytics

### Dashboard Widgets (15+ Types)

**Real-Time Metrics**:
1. Active Orders
2. Inventory Value
3. Revenue Today
4. Fulfillment Rate

**Chart Widgets**:
5. Line Chart (trends)
6. Bar Chart (comparisons)
7. Pie Chart (distributions)
8. Area Chart (cumulative)
9. Radar Chart (multi-dimensional)

**Advanced Widgets**:
10. Sankey Flow
11. Treemap
12. Funnel Chart
13. Scatter Plot
14. Heatmap
15. Gauge Charts

**Interactive Features**:
- Drag-and-drop positioning
- Resizable containers
- Live data updates
- Export capabilities

---

### 3D Dashboard Mode

**Features**:
- Three.js integration
- 3D card layouts
- Parallax effects
- Interactive rotation
- Depth perception

**Use Cases**:
- Executive presentations
- Demo environments
- Immersive analytics

---

### Cyberpunk Dashboard Theme

**Visual Elements**:
- Neon color scheme (cyan, magenta, yellow)
- Glitch effects
- Scanline overlays
- Holographic UI
- Terminal-style text

**Typography**:
- Monospace fonts
- Glowing text effects
- Matrix-style animations

---

## Google Sheets Integration

### Advanced Chart Library (15+ Types)

**Basic Charts**:
1. Line Chart
2. Bar Chart
3. Column Chart
4. Pie Chart
5. Donut Chart

**Statistical Charts**:
6. Histogram
7. Box Plot
8. Violin Plot
9. Area Chart
10. Scatter Plot

**Advanced Charts**:
11. Bubble Chart
12. Radar Chart
13. Heatmap
14. Waterfall Chart
15. Candlestick Chart

**Chart Features**:
- Multiple series support
- Custom color schemes
- Interactive legends
- Export to PNG/SVG
- Responsive sizing

---

### Pivot Table Builder

**Capabilities**:
- Drag-and-drop field selection
- Multiple aggregation functions (Sum, Average, Count, Min, Max)
- Row/Column grouping
- Value filtering
- Conditional formatting
- Subtotals and grand totals

**Example Configuration**:
```javascript
{
  rows: ['Region', 'Product'],
  columns: ['Quarter'],
  values: ['Sales'],
  aggregation: 'Sum',
  filters: {
    Region: ['North', 'South'],
    Sales: { min: 1000, max: 10000 }
  }
}
```

---

### AI-Powered Features

**1. Data Analysis**:
- Pattern recognition
- Anomaly detection
- Trend identification
- Correlation analysis

**2. Smart Suggestions**:
- Formula recommendations
- Chart type suggestions
- Data cleaning tips
- Optimization advice

**3. Natural Language Queries**:
- "Show me top 10 products by revenue"
- "Find all orders from last quarter"
- "Calculate average delivery time by region"

**4. Automated Insights**:
- Key metric summaries
- Change detection
- Performance alerts
- Forecast generation

---

### Data Cleaning Tools

**Functions**:
1. Remove Duplicates
2. Fill Missing Values
3. Trim Whitespace
4. Format Standardization
5. Outlier Detection
6. Type Conversion
7. Split/Merge Columns
8. Text-to-Columns

**Batch Operations**:
- Apply to entire columns
- Preview before applying
- Undo/Redo support
- Operation history

---

### Collaboration Tools

**Real-Time Features**:
- Live cursor tracking
- User presence indicators
- Simultaneous editing
- Comment threads
- Change history
- Version control

**Permissions**:
- View-only access
- Comment permissions
- Edit access
- Admin controls

---

### Template Library

**Categories**:
1. **Financial**: Budgets, invoices, expense trackers
2. **Inventory**: Stock management, reorder lists
3. **Sales**: Pipeline tracking, CRM sheets
4. **HR**: Employee records, time tracking
5. **Project Management**: Gantt charts, task lists
6. **Analytics**: KPI dashboards, report templates

**Template Features**:
- One-click deployment
- Pre-configured formulas
- Sample data included
- Customization guides

---

### Smart Automation (Sheets)

**Triggers**:
- On cell edit
- On form submit
- On time-driven schedule
- On value change

**Actions**:
- Send email notifications
- Update other sheets
- Create calendar events
- Generate PDFs
- Call external APIs
- Run custom scripts

---

## Theme & Customization

### Layout Switcher

**Available Layouts**:
1. **Master-Detail** (Default)
   - Sidebar navigation
   - Main content area
   - Detail panel

2. **Card Grid**
   - Dashboard-style cards
   - Responsive grid
   - Equal-height cards

3. **Tabbed Interface**
   - Top navigation tabs
   - Single content area
   - Clean minimal design

4. **Split View**
   - Dual-pane layout
   - Resizable dividers
   - Side-by-side comparison

---

### Equalizer-Style Theme Customizer

**5 Dynamic Gradient Sliders**:

1. **Hue Shift** (0-360°)
   - Rotates color wheel
   - Changes base color palette
   - Default: 270° (purple)

2. **Saturation** (0-100%)
   - Color intensity
   - Gray to vibrant
   - Default: 75%

3. **Lightness** (0-100%)
   - Dark to light theme
   - Affects background tones
   - Default: 50%

4. **Gradient Angle** (0-360°)
   - Direction of gradients
   - Linear rotation
   - Default: 135°

5. **Accent Intensity** (0-100%)
   - Highlight brightness
   - Contrast level
   - Default: 60%

**Real-Time Preview**:
- Live updates as sliders move
- No page refresh needed
- Smooth transitions
- Save/Load presets

**Preset Themes**:
- Purple Gradient (Default)
- Ocean Blue
- Sunset Orange
- Forest Green
- Rose Gold
- Cyberpunk Neon
- Monochrome
- High Contrast

---

## Feature Flags System

### Firebase Remote Config Integration

**Purpose**: On-the-fly feature toggling without redeployment

**Capabilities**:
- A/B testing support
- Phased rollouts
- User segmentation
- Emergency kill switches
- Analytics integration

---

### Module Control

**Four Main Modules** (Can be toggled independently):

1. **Core Logistics**
   - Flag: `enableCoreLogistics`
   - Default: true
   - Features: Receipts, shipments, logistics

2. **Production**
   - Flag: `enableProduction`
   - Default: true
   - Features: Materials, batches, recipes, POs

3. **Intelligence**
   - Flag: `enableIntelligence`
   - Default: true
   - Features: AI forecasting, ML, traceability

4. **System**
   - Flag: `enableSystem`
   - Default: true
   - Features: Governance, admin, settings

---

### Feature Flags

**Dashboard Features**:
- `enableDashboard3D`: 3D dashboard mode
- `enableCyberpunkTheme`: Cyberpunk UI
- `enableAdvancedCharts`: 15+ chart types
- `enableDashboardBuilder`: Custom widgets

**Intelligence Features**:
- `enableAIForecasting`: Predictive analytics
- `enableMLIntelligence`: Machine learning
- `enableAIVision`: Computer vision
- `enableAIReporting`: Automated reports

**Sheets Features**:
- `enableSheetsShowcase`: Google Sheets integration
- `enablePivotTables`: Pivot table builder
- `enableDataCleaning`: Data cleaning tools
- `enableTemplateLibrary`: Template gallery
- `enableSmartAutomation`: Automation workflows

**Visualization Features**:
- `enableVisualizationShowcase`: Advanced viz
- `enableSankeyDiagram`: Flow diagrams
- `enableTreemap`: Hierarchical charts
- `enableFunnelChart`: Funnel analysis
- `enableRealTimeStreaming`: Live data

**Customization Features**:
- `enableThemeCustomizer`: Theme editor
- `enableLayoutSwitcher`: Layout options
- `enableWidgetLibrary`: Widget gallery

---

### Flag Configuration

**Local Development**:
```javascript
const defaultFlags = {
  enableCoreLogistics: true,
  enableProduction: true,
  enableIntelligence: true,
  enableSystem: true,
  enableDashboard3D: false,
  enableCyberpunkTheme: false,
  enableAdvancedCharts: true,
  // ... etc
};
```

**Remote Config** (Firebase):
```json
{
  "enableAIForecasting": {
    "value": true,
    "condition": "user_tier == 'premium'"
  },
  "enableCyberpunkTheme": {
    "value": false,
    "rollout_percentage": 25
  }
}
```

---

## Technical Architecture

### Frontend Stack

**Core Framework**:
- React 18+ with TypeScript
- Tailwind CSS v4.0
- Vite build system

**UI Components**:
- Custom component library (replaced Radix UI)
- ShadCN UI components
- Lucide React icons

**Charts & Visualization**:
- Recharts (centralized imports)
- Custom 3D components
- Canvas-based rendering

**State Management**:
- React Context API
- Local state with hooks
- Feature flags context
- Theme context

---

### Backend Integration

**Firebase Services**:
- **Firestore**: Real-time database
- **Remote Config**: Feature flags
- **Authentication**: User management
- **Storage**: File uploads
- **Functions**: Serverless backend

**Google Cloud Platform**:
- **BigQuery**: Analytics warehouse
- **Maps API**: Logistics tracking
- **Sheets API**: Spreadsheet integration
- **Vision AI**: Image analysis

---

### Performance Optimizations

**CDN Quota Management**:
- Centralized recharts imports (`/components/charts.ts`)
- Browser caching enabled
- Reduced parallel requests
- Lazy loading components

**Code Splitting**:
- Route-based splitting
- Component lazy loading
- Dynamic imports
- Suspense boundaries

**Asset Optimization**:
- Image compression
- SVG optimization
- Font subsetting
- CSS purging

---

### Build Configuration

**ESM.sh CDN Issues - SOLVED**:
- Problem: "Quota exceeded" errors from esm.sh
- Solution: Replaced Radix UI with pure React implementations
- Result: Successful builds without quota limits

**Import Strategy**:
```typescript
// ✅ Correct - Centralized recharts
import { LineChart, BarChart } from './components/charts';

// ❌ Avoid - Direct imports cause quota issues
import { LineChart } from 'recharts';
```

---

## Component Inventory

### Main Views (28 Components)

**Dashboard Section**:
1. `DashboardView.tsx` - Main dashboard (default)
2. `DashboardViewV2.tsx` - Alternative dashboard
3. `Dashboard3D.tsx` - 3D mode dashboard
4. `DashboardCyberpunk.tsx` - Cyberpunk theme
5. `DashboardBuilder.tsx` - Custom dashboard builder

**Core Logistics**:
6. `InboundReceiptsView.tsx` - Receiving operations
7. `OutboundShipmentsView.tsx` - Shipping operations
8. `LogisticsView.tsx` - Logistics tracking
9. `WarehouseOpsView.tsx` - Warehouse management

**Production**:
10. `RawMaterialsView.tsx` - Materials inventory
11. `BatchesView.tsx` - Production batches
12. `RecipesView.tsx` - Product recipes/BOMs
13. `PurchaseOrdersView.tsx` - PO management

**Intelligence**:
14. `AIForecastingView.tsx` - Predictive analytics
15. `MLIntelligenceView.tsx` - Machine learning
16. `MaterialsIntelligenceView.tsx` - Material insights
17. `TraceabilityView.tsx` - Product traceability
18. `AIVisionPanel.tsx` - Computer vision
19. `AIAnalysisPanel.tsx` - AI analysis tools
20. `AIReportingView.tsx` - Automated reporting

**System**:
21. `GovernanceView.tsx` - Compliance & governance
22. `AdministrationView.tsx` - System admin
23. `SuppliersView.tsx` - Supplier management
24. `AboutView.tsx` - About page

**Showcases**:
25. `VisualizationShowcase.tsx` - Advanced visualizations
26. `SheetsShowcase.tsx` - Google Sheets features
27. `AdvancedChartsShowcase.tsx` - Chart library demo
28. `AdvancedChartLibrary.tsx` - Chart components

---

### Supporting Components

**Builders & Tools**:
- `PivotTableBuilder.tsx` - Pivot table creator
- `DataCleaningTools.tsx` - Data cleaning UI
- `TemplateLibrary.tsx` - Template browser
- `CollaborationPanel.tsx` - Collaboration UI
- `WidgetLibrary.tsx` - Dashboard widgets

**System Components**:
- `Navigation.tsx` - Main navigation
- `ThemeContext.tsx` - Theme provider
- `ThemeCustomizer.tsx` - Theme editor
- `FeatureFlagsContext.tsx` - Feature flags provider
- `FeatureFlagsManager.tsx` - Flags UI

---

### UI Components (44 ShadCN Components)

Located in `/components/ui/`:

**Form Controls**:
- button, input, textarea, checkbox, radio-group
- select, slider, switch, toggle, toggle-group

**Layout**:
- card, separator, tabs, accordion, collapsible
- resizable, scroll-area, sidebar, sheet

**Navigation**:
- navigation-menu, menubar, breadcrumb, pagination

**Feedback**:
- alert, alert-dialog, dialog, drawer, toast (sonner)
- tooltip, hover-card, popover, progress, skeleton

**Data Display**:
- avatar, badge, table, calendar, chart
- aspect-ratio

**Forms**:
- form, label, input-otp, command

**Utility**:
- use-mobile.ts, utils.ts

---

## Data Structures Reference

### Visualization Data Formats

**Sankey Data**:
```typescript
interface SankeyData {
  nodes: Array<{ name: string }>;
  links: Array<{ 
    source: number;  // node index
    target: number;  // node index
    value: number;   // flow volume
  }>;
}
```

**Treemap Data**:
```typescript
interface TreemapData {
  name: string;
  children?: Array<{
    name: string;
    size: number;
    fill: string;
  }>;
  size?: number;
  fill?: string;
}
```

**Funnel Data**:
```typescript
interface FunnelStage {
  stage: string;
  value: number;
  fill: string;
}
```

**Scatter Data**:
```typescript
interface ScatterPoint {
  x: number;      // X-axis value
  y: number;      // Y-axis value
  z: number;      // Bubble size
  [key: string]: any;  // Additional properties
}
```

**Time Series Data**:
```typescript
interface TimeSeriesPoint {
  time: number | string | Date;
  [seriesName: string]: number | string | Date;
}
```

---

### Workflow Data Structures

**Workflow Node**:
```typescript
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'end';
  label: string;
  status: 'idle' | 'running' | 'success' | 'error';
  icon: React.ComponentType;
  config?: Record<string, any>;
}
```

**Workflow Connection**:
```typescript
interface WorkflowConnection {
  from: string;  // source node id
  to: string;    // target node id
  condition?: string;  // for conditional branches
}
```

**Automation Rule**:
```typescript
interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: string;
    config: Record<string, any>;
  };
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
  }>;
  actions: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  enabled: boolean;
}
```

---

### Dashboard Widget Data

**Widget Configuration**:
```typescript
interface WidgetConfig {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'custom';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data: any;
  config: {
    refreshInterval?: number;
    chartType?: string;
    colors?: string[];
    [key: string]: any;
  };
}
```

**Metric Widget**:
```typescript
interface MetricWidget {
  value: number | string;
  label: string;
  trend?: {
    direction: 'up' | 'down' | 'flat';
    value: number;
    period: string;
  };
  icon?: React.ComponentType;
  color?: string;
}
```

---

### Theme Configuration

**Theme Object**:
```typescript
interface ThemeConfig {
  hue: number;              // 0-360
  saturation: number;       // 0-100
  lightness: number;        // 0-100
  gradientAngle: number;    // 0-360
  accentIntensity: number;  // 0-100
  customColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
  };
}
```

**Layout Configuration**:
```typescript
interface LayoutConfig {
  type: 'master-detail' | 'card-grid' | 'tabbed' | 'split';
  sidebarWidth?: number;
  contentPadding?: number;
  cardGap?: number;
  responsive?: boolean;
}
```

---

### Feature Flag Configuration

**Flag Definition**:
```typescript
interface FeatureFlag {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
  conditions?: Array<{
    type: 'user' | 'date' | 'custom';
    operator: string;
    value: any;
  }>;
  metadata?: {
    description?: string;
    owner?: string;
    createdAt?: Date;
    expiresAt?: Date;
  };
}
```

---

## Quick Reference: Key Files

### Essential Files to Share

**Core Application**:
- `/App.tsx` - Main app component
- `/styles/globals.css` - Global styles

**Visualization**:
- `/components/VisualizationShowcase.tsx` - Advanced viz showcase
- `/components/charts.ts` - Centralized recharts exports

**Sheets Integration**:
- `/components/SheetsShowcase.tsx` - Sheets features
- `/components/PivotTableBuilder.tsx` - Pivot tables
- `/components/DataCleaningTools.tsx` - Data cleaning

**Dashboard**:
- `/components/DashboardView.tsx` - Main dashboard
- `/components/DashboardBuilder.tsx` - Widget builder
- `/components/WidgetLibrary.tsx` - Available widgets

**System**:
- `/components/FeatureFlagsContext.tsx` - Feature flags
- `/components/ThemeContext.tsx` - Theme system
- `/components/Navigation.tsx` - Navigation

---

## Color Palette Reference

### Primary Gradients

**Purple Theme** (Default):
- From: `#8b5cf6` (purple-600)
- To: `#ec4899` (pink-600)
- Background: `from-purple-50 via-pink-50 to-rose-50`

**Blue Theme**:
- From: `#3b82f6` (blue-600)
- To: `#06b6d4` (cyan-600)
- Background: `from-blue-50 via-cyan-50 to-sky-50`

**Green Theme**:
- From: `#10b981` (green-600)
- To: `#059669` (emerald-600)
- Background: `from-green-50 via-emerald-50 to-teal-50`

**Orange Theme**:
- From: `#f97316` (orange-600)
- To: `#ef4444` (red-600)
- Background: `from-orange-50 via-red-50 to-pink-50`

### Status Colors

- **Success**: `#10b981` (green-600)
- **Warning**: `#f59e0b` (yellow-600)
- **Error**: `#ef4444` (red-600)
- **Info**: `#3b82f6` (blue-600)
- **Neutral**: `#64748b` (slate-600)

### Chart Color Schemes

**Scheme 1** (Purple):
- `#8b5cf6`, `#7c3aed`, `#6d28d9`, `#5b21b6`, `#4c1d95`

**Scheme 2** (Blue):
- `#3b82f6`, `#2563eb`, `#1d4ed8`, `#1e40af`, `#1e3a8a`

**Scheme 3** (Multi-color):
- `#8b5cf6` (purple), `#3b82f6` (blue), `#10b981` (green)
- `#f59e0b` (yellow), `#ef4444` (red), `#06b6d4` (cyan)

---

## Performance Metrics

### Target Metrics

**Load Times**:
- Initial page load: < 2 seconds
- Route navigation: < 500ms
- Widget rendering: < 100ms
- Chart rendering: < 300ms

**Interactivity**:
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3 seconds
- Largest Contentful Paint (LCP): < 2.5 seconds

**Data Updates**:
- Real-time data latency: < 1 second
- Dashboard refresh: < 500ms
- Chart re-render: < 200ms

---

## Browser Support

**Supported Browsers**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Features Requiring Modern Browsers**:
- CSS Grid (Dashboard layouts)
- CSS Custom Properties (Theming)
- ES6+ Features (Arrow functions, async/await)
- Canvas API (3D mode)
- WebSocket (Real-time updates)

---

## Deployment Notes

### Environment Variables

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Cloud Platform
VITE_GCP_PROJECT_ID=your_gcp_project
VITE_BIGQUERY_DATASET=your_dataset
VITE_MAPS_API_KEY=your_maps_key

# Feature Flags (Optional - overrides Remote Config)
VITE_ENABLE_ALL_FEATURES=false
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Future Enhancements

### Planned Features

**Q1 2025**:
- Advanced AI recommendations
- Predictive maintenance
- Blockchain integration for traceability
- Mobile app (React Native)

**Q2 2025**:
- Multi-language support (i18n)
- Offline mode with sync
- Advanced permissions system
- Custom widget development SDK

**Q3 2025**:
- IoT sensor integration
- Edge computing support
- Advanced ML model training
- API marketplace

---

## Support & Resources

### Documentation Links
- Feature Flags: `/FEATURE_FLAGS_GUIDE.md`
- Sheets Integration: `/GOOGLE_SHEETS_FEATURES.md`
- Theme System: `/THEME_CUSTOMIZATION.md`
- Dashboard Widgets: `/DASHBOARD_WIDGETS_GUIDE.md`
- Visualizations: `/VISUALIZATION_AUTOMATION_SHOWCASE.md`

### Contact & Support
- Technical Support: support@traceright.ai
- Feature Requests: features@traceright.ai
- Bug Reports: bugs@traceright.ai

---

## Version History

### Version 2.0 (Current)
- ✅ Advanced visualizations (Sankey, Treemap, Funnel, etc.)
- ✅ Smart automation system with workflow builder
- ✅ Google Sheets integration with 15+ features
- ✅ 5-slider theme customizer
- ✅ Feature flags with Remote Config
- ✅ 3D and Cyberpunk dashboard modes
- ✅ Real-time data streaming
- ✅ AI-powered analytics

### Version 1.0
- Basic dashboard
- Core logistics tracking
- Simple charts
- Standard theme

---

## Conclusion

This document provides a complete reference for the TraceRight platform. It can be copied and pasted directly into an LLM conversation for full context without needing GitHub or file uploads.

**Total Features**: 100+
**Components**: 70+
**Chart Types**: 15+
**Automation Templates**: 6
**Dashboard Themes**: 8+
**Feature Flags**: 25+

**Last Updated**: October 30, 2025
**Document Version**: 1.0
**Platform Version**: 2.0

---

*This document is designed to be LLM-friendly with clear structure, complete data examples, and comprehensive feature descriptions. Share the entire file for maximum context.*
