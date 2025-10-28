# 🗺️ Master Feature Reference Guide

## Your Complete Map to TraceRight's Features

This guide shows you **exactly where to find every feature** in your codebase. Use this when you want to modify, extend, or understand any part of the application.

---

## 📊 QUICK NAVIGATION

Jump to:
- [Showcase Features](#-showcase-features-the-demos)
- [Dashboard & Core Views](#-dashboard--core-views)
- [AI & Intelligence Features](#-ai--intelligence-features)
- [Google Sheets Integration](#-google-sheets-integration-features)
- [Charts & Visualizations](#-charts--visualizations)
- [Theme & Customization](#-theme--customization)
- [Navigation & Routing](#-navigation--routing)
- [UI Components](#-ui-components-shadcn)
- [Documentation](#-documentation-files)

---

## 🎬 SHOWCASE FEATURES (The Demos)

### 1. Next-Gen Features Showcase
**What:** Advanced visualizations + automation demos  
**Location:** `/components/VisualizationShowcase.tsx`  
**Features:**
- Sankey Flow Diagram
- Treemap Visualization
- Funnel Chart
- Performance Gauge
- 3D Scatter Plot
- Real-Time Streaming Chart
- Interactive Workflow Builder
- Smart Triggers (AI)
- Automated Actions
- Workflow Templates

**How to Access:** Sidebar → SHOWCASE → "✨ Next-Gen Features"

**Related Docs:**
- `/QUICK_DEMO_GUIDE.md`
- `/VISUALIZATION_AUTOMATION_SHOWCASE.md`
- `/WHATS_NEW.md`

---

### 2. Google Sheets Showcase
**What:** Complete spreadsheet interface demo  
**Location:** `/components/SheetsShowcase.tsx`  
**Features:**
- Interactive Spreadsheet Grid
- Formula Bar
- Cell Selection
- AI Analysis (4 insights)
- 4 Chart Types (Bar, Pie, Line, Radar)
- Pivot Table Builder
- Data Cleaning with Auto-Fix
- Collaboration Panel
- Activity Feed
- Template Library (6 templates)

**How to Access:** Sidebar → SHOWCASE → "📊 Google Sheets Demo"

**Related Docs:**
- `/SHEETS_DEMO_GUIDE.md`
- `/GOOGLE_SHEETS_FEATURES.md`

---

### 3. Cyberpunk Mode
**What:** Professional dark theme dashboard  
**Location:** `/components/DashboardCyberpunk.tsx`  
**Features:**
- All-black background
- Neon accents (cyan/green/purple)
- Glitch effects
- CRT scanline effect
- Animated grid background
- System metrics monitoring
- Terminal log feed
- Status bar

**How to Access:** Dashboard View → "Cyberpunk" button (top right)

**Related Docs:**
- `/CYBERPUNK_MODE.md`

---

### 4. 3D Dashboard
**What:** Futuristic rotating glassmorphic dashboard  
**Location:** `/components/Dashboard3D.tsx`  
**Features:**
- Rotating 3D cards
- Glassmorphic design
- Perspective transforms
- Auto-rotation animation
- Interactive KPIs

**How to Access:** Dashboard View → "3D View" button (top right)

**Related Docs:**
- `/TRACERIGHT_2.0.md`
- `/VERSION_2_SUMMARY.md`

---

## 🏠 DASHBOARD & CORE VIEWS

### Main Dashboard
**Primary File:** `/components/DashboardView.tsx`

**What it Contains:**
- Layout switcher (Grid/List/Compact/Kanban)
- Theme switcher button
- 3D View toggle
- Cyberpunk mode toggle
- AI Vision button
- Custom widget system
- All panel access buttons

**Access Buttons to Other Features:**
- "AI Analysis" → Opens AIAnalysisPanel
- "AI Vision" → Opens AIVisionPanel
- "Team" → Opens CollaborationPanel
- "Data Cleaning" → Opens DataCleaningTools
- "Pivot Table" → Opens PivotTableBuilder
- "Templates" → Opens TemplateLibrary
- "Customize Theme" → Opens ThemeCustomizer

**Related File:** `/components/DashboardViewV2.tsx` (alternate version)

---

### Dashboard Builder
**File:** `/components/DashboardBuilder.tsx`

**What it Does:**
- Drag-and-drop widget builder
- 8 widget types available
- localStorage persistence
- Widget customization
- Layout management

**Widget Types Available:**
1. KPI Card
2. Sales Chart
3. Revenue Chart
4. Inventory Status
5. Recent Orders
6. Top Products
7. Performance Metrics
8. Custom Chart

**How to Access:** Via DashboardView buttons

---

### Widget Library
**File:** `/components/WidgetLibrary.tsx`

**Contains:**
- All 8 widget components
- Widget configuration logic
- Chart integrations
- Data formatting functions

**Used By:** DashboardBuilder.tsx

---

## 🧠 AI & INTELLIGENCE FEATURES

### 1. AI Analysis Panel
**File:** `/components/AIAnalysisPanel.tsx`

**Features:**
- Natural language queries
- Multi-table analysis
- Trend detection
- Anomaly detection
- Smart recommendations
- Confidence scoring
- Quick prompts library

**How to Access:** Dashboard → "AI Analysis" button

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 11-18)

---

### 2. AI Vision Panel
**File:** `/components/AIVisionPanel.tsx`

**Features:**
- Barcode/QR code scanning
- OCR text extraction
- Damage detection
- Object recognition
- Image upload/camera capture
- Real-time processing

**Prompts File:** `/src/lib/ai-vision-prompts.ts`

**How to Access:** Dashboard → "AI Vision" button

**Related Docs:** `/TRACERIGHT_2.0.md`

---

### 3. AI Reporting View
**File:** `/components/AIReportingView.tsx`

**Features:**
- Automated report generation
- AI-powered insights
- Custom report templates

**How to Access:** Sidebar → INTELLIGENCE → "AI Reporting"

---

### 4. AI Forecasting View
**File:** `/components/AIForecastingView.tsx`

**Features:**
- Predictive analytics
- Demand forecasting
- Trend predictions

**How to Access:** Sidebar → INTELLIGENCE → "AI Forecasting"

---

### 5. ML Intelligence View
**File:** `/components/MLIntelligenceView.tsx`

**Features:**
- Machine learning insights
- Pattern recognition
- Advanced analytics

**How to Access:** Sidebar → INTELLIGENCE → "ML Intelligence"

---

### 6. Materials Intelligence View
**File:** `/components/MaterialsIntelligenceView.tsx`

**Features:**
- Material analytics
- Supply chain insights
- Inventory intelligence

**How to Access:** Sidebar → INTELLIGENCE → "Materials Intelligence"

---

## 📊 GOOGLE SHEETS INTEGRATION FEATURES

All these features are accessible from the main Dashboard:

### 1. Pivot Table Builder
**File:** `/components/PivotTableBuilder.tsx`

**Features:**
- Drag-and-drop field selection
- 5 aggregation functions (SUM, AVG, COUNT, MIN, MAX)
- Multi-dimensional analysis
- Auto-update on data changes
- Pivot chart creation

**How to Access:** Dashboard → "Pivot Table" button

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 33-41)

---

### 2. Data Cleaning Tools
**File:** `/components/DataCleaningTools.tsx`

**Features:**
- Duplicate detection (fuzzy matching)
- Missing data identification
- Outlier detection
- Format inconsistency detection
- One-click auto-fix
- Batch operations
- Confidence scoring

**How to Access:** Dashboard → "Data Cleaning" button

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 43-51)

---

### 3. Collaboration Panel
**File:** `/components/CollaborationPanel.tsx`

**Features:**
- Live user cursors (structure)
- Comment threads
- Activity feed
- @Mentions support
- 3-tier permissions (Owner/Editor/Viewer)
- Active user status
- Team management

**How to Access:** Dashboard → "Team" button

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 53-61)

---

### 4. Template Library
**File:** `/components/TemplateLibrary.tsx`

**Features:**
- 9 industry-specific templates
- Categories: Financial, Sales, Operations, Executive, Marketing
- Preview functionality
- Search and filter
- One-click application

**Templates Included:**
1. CEO Executive Summary
2. CFO Financial Dashboard
3. Sales Performance Tracker
4. Revenue Analysis Board
5. Customer Acquisition Dashboard
6. Supply Chain Operations
7. Warehouse Efficiency Monitor
8. Production Quality Control
9. Marketing Campaign ROI

**How to Access:** Dashboard → "Templates" button

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 63-69)

---

## 📈 CHARTS & VISUALIZATIONS

### Advanced Chart Library
**File:** `/components/AdvancedChartLibrary.tsx`

**Contains 15+ Chart Types:**
1. Waterfall Charts
2. Treemap Charts
3. Scatter Plots
4. Radar Charts
5. Funnel Charts
6. Combination Charts (Line + Bar)
7. Stacked Area Charts
8. Gauge Charts
9. Bullet Charts
10. Heatmaps
11. Bar Charts
12. Line Charts
13. Pie Charts
14. Sankey Diagrams
15. Bubble Charts

**Used By:** 
- WidgetLibrary.tsx
- AdvancedChartsShowcase.tsx
- SheetsShowcase.tsx
- VisualizationShowcase.tsx

**Related Docs:** `/GOOGLE_SHEETS_FEATURES.md` (lines 21-31)

---

### Advanced Charts Showcase
**File:** `/components/AdvancedChartsShowcase.tsx`

**What it Does:**
- Interactive gallery of all chart types
- Sample data for each chart
- Chart selection guide
- Best practices documentation

**How to Access:** About View → "View Charts" button

---

## 🎨 THEME & CUSTOMIZATION

### Theme Context
**File:** `/components/ThemeContext.tsx`

**What it Manages:**
- Global theme state
- Gradient customization (5 sliders)
- Font family selection
- Layout preferences
- LocalStorage persistence

**Provides:**
- `gradientStyleValue` - CSS gradient string
- `backgroundStyle` - Background object for inline styles
- `updateTheme()` - Function to update theme
- `fontClass` - Tailwind font class

**Used By:** Every component that needs theme access

---

### Theme Customizer
**File:** `/components/ThemeCustomizer.tsx`

**Features:**
- **Equalizer-Style Interface** with 5 sliders:
  1. Color Hue (0-360°)
  2. Saturation (0-100%)
  3. Lightness (0-100%)
  4. Gradient Angle (0-360°)
  5. Color Intensity (0-100%)
- Font family selector (6 options)
- Real-time preview
- Reset to defaults
- Preset themes

**How to Access:** Dashboard → "Customize Theme" button (top right)

**Related Docs:** `/DASHBOARD_WIDGETS_GUIDE.md`

---

## 🧭 NAVIGATION & ROUTING

### Navigation Component
**File:** `/components/Navigation.tsx`

**Structure:**
```
CORE LOGISTICS
├── Dashboard
├── Logistics
├── Suppliers
├── Purchase Orders
├── Inbound Receipts
├── Warehouse Ops
└── Outbound Shipments

PRODUCTION
├── Raw Materials
├── Recipes
└── Batches

INTELLIGENCE
├── Traceability
├── AI Reporting
├── AI Forecasting
├── Materials Intelligence
└── ML Intelligence

SYSTEM
├── Administration
├── Governance
└── About

SHOWCASE
├── ✨ Next-Gen Features
└── 📊 Google Sheets Demo
```

**Features:**
- Collapsible sections
- Icon-based navigation
- Active state highlighting
- Dynamic gradient styling

---

### Main App Router
**File:** `/App.tsx`

**What it Does:**
- Route management for all views
- View type definitions
- Theme provider wrapper
- Main layout structure

**All View Types Defined:**
```typescript
export type ViewType = 
  | 'dashboard' 
  | 'logistics' 
  | 'suppliers' 
  | 'purchase-orders'
  | 'inbound-receipts'
  | 'warehouse-ops'
  | 'outbound-shipments'
  | 'raw-materials'
  | 'recipes'
  | 'batches'
  | 'traceability'
  | 'ai-reporting'
  | 'ai-forecasting'
  | 'materials-intelligence'
  | 'ml-intelligence'
  | 'administration'
  | 'governance'
  | 'about'
  | 'showcase'
  | 'sheets-showcase';
```

---

## 📋 ALL MODULE VIEWS

Each module has its own view component:

### Core Logistics Module
- `/components/LogisticsView.tsx`
- `/components/SuppliersView.tsx`
- `/components/PurchaseOrdersView.tsx`
- `/components/InboundReceiptsView.tsx`
- `/components/WarehouseOpsView.tsx`
- `/components/OutboundShipmentsView.tsx`

### Production Module
- `/components/RawMaterialsView.tsx`
- `/components/RecipesView.tsx`
- `/components/BatchesView.tsx`

### Intelligence Module
- `/components/TraceabilityView.tsx`
- `/components/AIReportingView.tsx`
- `/components/AIForecastingView.tsx`
- `/components/MaterialsIntelligenceView.tsx`
- `/components/MLIntelligenceView.tsx`

### System Module
- `/components/AdministrationView.tsx`
- `/components/GovernanceView.tsx`
- `/components/AboutView.tsx`

**Pattern:** Each view is self-contained and accessible via Navigation

---

## 🧩 UI COMPONENTS (shadcn/ui)

**Location:** `/components/ui/`

### Core Components:
- `button.tsx` - Button variants
- `card.tsx` - Card containers
- `input.tsx` - Form inputs
- `badge.tsx` - Status badges
- `table.tsx` - Data tables
- `tabs.tsx` - Tabbed interfaces
- `dialog.tsx` - Modal dialogs
- `sheet.tsx` - Slide-in panels
- `select.tsx` - Dropdown selects
- `textarea.tsx` - Text areas

### Advanced Components:
- `chart.tsx` - Chart wrapper for Recharts
- `calendar.tsx` - Date picker
- `carousel.tsx` - Image/content carousel
- `command.tsx` - Command palette
- `accordion.tsx` - Collapsible sections
- `alert-dialog.tsx` - Confirmation dialogs
- `context-menu.tsx` - Right-click menus
- `dropdown-menu.tsx` - Dropdown menus
- `hover-card.tsx` - Hover previews
- `popover.tsx` - Floating popovers
- `tooltip.tsx` - Hover tooltips

### Form Components:
- `form.tsx` - Form handling
- `checkbox.tsx` - Checkboxes
- `radio-group.tsx` - Radio buttons
- `switch.tsx` - Toggle switches
- `slider.tsx` - Range sliders

**All components:** Based on Radix UI primitives, styled with Tailwind CSS

---

## 🎨 STYLING

### Global Styles
**File:** `/styles/globals.css`

**Contains:**
- Tailwind v4.0 configuration
- CSS custom properties (tokens)
- Typography defaults (h1-h6, p, etc.)
- Color system
- Theme variables
- Base resets

**Important:** Don't add Tailwind classes for font-size, font-weight, or line-height unless specifically requested (typography is handled by globals.css)

---

## 📚 DOCUMENTATION FILES

### User Guides:
- `/QUICK_START_V2.md` - Getting started guide
- `/QUICK_DEMO_GUIDE.md` - Next-Gen Features walkthrough
- `/SHEETS_DEMO_GUIDE.md` - Google Sheets demo guide
- `/DASHBOARD_WIDGETS_GUIDE.md` - Widget system guide
- `/ADVANCED_FEATURES_GUIDE.md` - Complete features guide

### Technical Documentation:
- `/FEATURE_SUMMARY.md` - All features listed
- `/GOOGLE_SHEETS_FEATURES.md` - Sheets integration details
- `/VISUALIZATION_AUTOMATION_SHOWCASE.md` - Viz & automation guide
- `/CYBERPUNK_MODE.md` - Dark theme documentation
- `/TRACERIGHT_2.0.md` - Version 2.0 features
- `/VERSION_2_SUMMARY.md` - V2 summary

### Reference Guides:
- `/ALL_SHOWCASES_SUMMARY.md` - All 3 showcases compared
- `/WHATS_NEW.md` - Latest features highlights
- `/WIDGET_DATA_INTEGRATION_EXAMPLE.md` - Widget data integration
- `/MASTER_FEATURE_REFERENCE.md` - This file!

### Project Files:
- `/README.md` - Project overview
- `/Attributions.md` - Credits and attributions
- `/guidelines/Guidelines.md` - Development guidelines

---

## 🔍 QUICK REFERENCE: FIND BY FEATURE

### "I want to modify..."

**The gradient theme:**
→ `/components/ThemeContext.tsx` (state management)
→ `/components/ThemeCustomizer.tsx` (UI controls)

**The dashboard layout:**
→ `/components/DashboardView.tsx` (main view)
→ `/components/DashboardBuilder.tsx` (builder interface)

**Widget types:**
→ `/components/WidgetLibrary.tsx` (all widget definitions)

**Chart visualizations:**
→ `/components/AdvancedChartLibrary.tsx` (15+ chart types)

**Navigation menu:**
→ `/components/Navigation.tsx` (sidebar structure)

**AI features:**
→ `/components/AIAnalysisPanel.tsx` (AI analysis)
→ `/components/AIVisionPanel.tsx` (image analysis)
→ `/src/lib/ai-vision-prompts.ts` (vision prompts)

**Spreadsheet features:**
→ `/components/SheetsShowcase.tsx` (full demo)
→ `/components/PivotTableBuilder.tsx` (pivot tables)
→ `/components/DataCleaningTools.tsx` (data quality)
→ `/components/CollaborationPanel.tsx` (team features)

**Dark theme:**
→ `/components/DashboardCyberpunk.tsx` (cyberpunk mode)

**3D dashboard:**
→ `/components/Dashboard3D.tsx` (3D view)

**Showcases:**
→ `/components/VisualizationShowcase.tsx` (viz & automation)
→ `/components/SheetsShowcase.tsx` (sheets demo)

**Global styling:**
→ `/styles/globals.css` (CSS variables, typography)

**Routing:**
→ `/App.tsx` (main router and view types)

---

## 🗂️ FILE ORGANIZATION PATTERNS

### Component Naming:
- **Views:** `*View.tsx` (e.g., DashboardView.tsx)
- **Panels:** `*Panel.tsx` (e.g., AIAnalysisPanel.tsx)
- **Builders:** `*Builder.tsx` (e.g., DashboardBuilder.tsx)
- **Libraries:** `*Library.tsx` (e.g., WidgetLibrary.tsx)
- **Showcases:** `*Showcase.tsx` (e.g., VisualizationShowcase.tsx)
- **Tools:** `*Tools.tsx` (e.g., DataCleaningTools.tsx)
- **Context:** `*Context.tsx` (e.g., ThemeContext.tsx)

### Import Patterns:

**For components:**
```typescript
import { ComponentName } from './components/ComponentName';
```

**For UI components:**
```typescript
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
```

**For icons:**
```typescript
import { IconName } from 'lucide-react';
```

**For charts:**
```typescript
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
```

---

## 🔧 CUSTOMIZATION GUIDE

### To Add a New Feature:

1. **Create the component file** in `/components/`
2. **Import in App.tsx** if it's a new view
3. **Add to Navigation.tsx** if it needs a menu item
4. **Update ViewType** in App.tsx if it's a route
5. **Add documentation** in relevant .md file

### To Modify Existing Feature:

1. **Find the file** using this reference guide
2. **Check related files** (imports/dependencies)
3. **Update documentation** if behavior changes
4. **Test in the UI** to verify changes

### To Add a New Chart Type:

1. **Add to AdvancedChartLibrary.tsx**
2. **Update WidgetLibrary.tsx** if needed
3. **Add to VisualizationShowcase.tsx** for demo
4. **Update GOOGLE_SHEETS_FEATURES.md** (lines 130-144)

### To Add a New Widget:

1. **Add widget type** to WidgetLibrary.tsx
2. **Create widget component** in same file
3. **Add to dashboard builder** options
4. **Update DASHBOARD_WIDGETS_GUIDE.md**

---

## 💡 BEST PRACTICES

### When Modifying Code:

✅ **Do:**
- Check if feature is used elsewhere (search imports)
- Test with theme customizer to ensure styling works
- Verify on both light themes and Cyberpunk mode
- Update relevant documentation

❌ **Don't:**
- Modify files in `/components/ui/` (shadcn components)
- Modify `/components/figma/ImageWithFallback.tsx` (protected)
- Add font-size/font-weight Tailwind classes (use globals.css)
- Delete files without checking imports

### Performance Tips:

- Most data is mock/sample data (easy to replace)
- LocalStorage is used for persistence (Theme, Widgets)
- Charts use Recharts library (well-optimized)
- State management is React hooks (no Redux needed)

---

## 🎯 COMMON TASKS QUICK REFERENCE

### Task: Add a new dashboard widget
**Files to modify:**
1. `/components/WidgetLibrary.tsx` - Add widget component
2. `/components/DashboardBuilder.tsx` - Add to widget options

---

### Task: Change color scheme
**Files to modify:**
1. `/components/ThemeContext.tsx` - Update default values
2. `/styles/globals.css` - Update CSS variables if needed

---

### Task: Add a new page/view
**Files to modify:**
1. Create `/components/NewView.tsx`
2. `/App.tsx` - Add to ViewType and routing
3. `/components/Navigation.tsx` - Add menu item

---

### Task: Modify AI prompts
**Files to modify:**
1. `/src/lib/ai-vision-prompts.ts` - AI Vision prompts
2. `/components/AIAnalysisPanel.tsx` - AI Analysis prompts

---

### Task: Add a new template
**Files to modify:**
1. `/components/TemplateLibrary.tsx` - Add template definition

---

### Task: Customize charts
**Files to modify:**
1. `/components/AdvancedChartLibrary.tsx` - Chart configurations
2. Sample data arrays in specific components

---

## 📦 DEPENDENCIES

### Key Libraries Used:

**UI & Styling:**
- React + TypeScript
- Tailwind CSS v4.0
- shadcn/ui components (Radix UI)
- Lucide React (icons)

**Charts & Visualizations:**
- Recharts (all chart types)
- Custom 3D CSS transforms

**Utilities:**
- LocalStorage for persistence
- React hooks for state management

**No Backend Required:**
- All features work client-side
- Mock/sample data included
- Ready for backend integration

---

## 🎓 LEARNING PATH

### If you're new to the codebase:

**Day 1:** Explore the Showcases
- Navigate through all 3 showcases
- Read the documentation files
- Try interactive features

**Day 2:** Review Main Dashboard
- Check `/components/DashboardView.tsx`
- Open each panel (AI Analysis, AI Vision, etc.)
- Try the Dashboard Builder

**Day 3:** Examine Individual Modules
- Look at view components in `/components/`
- See how they integrate with Navigation
- Check data structures

**Day 4:** Customize Theme
- Modify `/components/ThemeContext.tsx`
- Update default gradients
- Add new color presets

**Day 5:** Add Your First Feature
- Create a new widget or view
- Follow the patterns in existing code
- Update documentation

---

## 🔗 RELATIONSHIPS DIAGRAM

```
App.tsx (Router)
├── ThemeContext (Theme State)
│   └── ThemeCustomizer (Theme UI)
├── Navigation (Sidebar)
└── Views
    ├── DashboardView (Main)
    │   ├── DashboardBuilder
    │   │   └── WidgetLibrary
    │   ├── Dashboard3D
    │   ├── DashboardCyberpunk
    │   ├── AIAnalysisPanel
    │   ├── AIVisionPanel
    │   ├── CollaborationPanel
    │   ├── DataCleaningTools
    │   ├── PivotTableBuilder
    │   └── TemplateLibrary
    ├── LogisticsView
    ├── SuppliersView
    ├── [...other views...]
    ├── VisualizationShowcase
    └── SheetsShowcase
```

---

## ✅ SUMMARY

### Your Codebase at a Glance:

**Total Components:** 40+
**Total Documentation Files:** 15+
**UI Components (shadcn):** 40+
**View Components:** 17
**Feature Panels:** 7
**Showcases:** 3
**Chart Types:** 15+
**Widget Types:** 8
**Templates:** 9

### Everything is Organized:
- ✅ Components in `/components/`
- ✅ UI primitives in `/components/ui/`
- ✅ Styles in `/styles/`
- ✅ Docs in root directory
- ✅ AI prompts in `/src/lib/`

### Main Entry Points:
1. `/App.tsx` - Application router
2. `/components/Navigation.tsx` - Menu structure
3. `/components/DashboardView.tsx` - Main dashboard
4. `/components/ThemeContext.tsx` - Theme system

---

**🎉 You now have a complete map to your entire application!**

Use this guide whenever you need to find, modify, or extend any feature. Everything is documented and easy to locate! 🗺️✨
