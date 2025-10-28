# 🗂️ Complete Directory Map

## Visual Guide to Your File Structure

**Easy-to-scan reference with descriptions for every file**

---

## 📁 ROOT LEVEL FILES

```
/
├── 📄 App.tsx                                    [Main application router & view management]
├── 📄 ShowcaseAccess.tsx                         [Quick access wrapper for showcases]
│
├── 📘 README.md                                  [Project overview & introduction]
├── 📘 Attributions.md                            [Credits & attributions]
│
├── 📗 QUICK_START_V2.md                          [Getting started guide]
├── 📗 FEATURE_SUMMARY.md                         [All features listed]
├── 📗 MASTER_FEATURE_REFERENCE.md                [⭐ COMPLETE feature-to-file mapping]
├── 📗 FIND_ANYTHING.md                           [⚡ Quick lookup index]
├── 📗 DIRECTORY_MAP.md                           [This file - visual directory guide]
│
├── 📙 DASHBOARD_WIDGETS_GUIDE.md                 [Widget system documentation]
├── 📙 ADVANCED_FEATURES_GUIDE.md                 [Advanced features guide]
├── 📙 WIDGET_DATA_INTEGRATION_EXAMPLE.md         [Widget integration examples]
│
├── 📕 QUICK_DEMO_GUIDE.md                        [Next-Gen Features walkthrough]
├── 📕 VISUALIZATION_AUTOMATION_SHOWCASE.md       [Viz & automation technical guide]
├── 📕 WHATS_NEW.md                               [Latest features highlights]
│
├── 📔 SHEETS_DEMO_GUIDE.md                       [Google Sheets demo walkthrough]
├── 📔 GOOGLE_SHEETS_FEATURES.md                  [Sheets integration details]
│
├── 📓 CYBERPUNK_MODE.md                          [Dark theme documentation]
├── 📓 TRACERIGHT_2.0.md                          [Version 2.0 features]
├── 📓 VERSION_2_SUMMARY.md                       [V2 summary]
├── 📓 ALL_SHOWCASES_SUMMARY.md                   [All 3 showcases compared]
```

---

## 📁 /components - MAIN COMPONENTS

### 🎯 Core Dashboard & Navigation

```
components/
├── 🏠 DashboardView.tsx                          [Main dashboard with all features]
├── 🏠 DashboardViewV2.tsx                        [Alternative dashboard version]
├── 🏗️  DashboardBuilder.tsx                      [Drag-and-drop widget builder]
├── 📦 WidgetLibrary.tsx                          [All 8 widget types + logic]
│
├── 🧭 Navigation.tsx                             [Sidebar menu with all modules]
├── 🎨 ThemeContext.tsx                           [Theme state & gradient system]
├── 🎨 ThemeCustomizer.tsx                        [5-slider theme controls]
```

### ✨ Showcases & Special Views

```
components/
├── ✨ VisualizationShowcase.tsx                  [Next-Gen Features showcase]
├── 📊 SheetsShowcase.tsx                         [Google Sheets demo showcase]
├── 🌃 DashboardCyberpunk.tsx                     [Cyberpunk dark theme mode]
├── 🔮 Dashboard3D.tsx                            [3D rotating glassmorphic view]
├── 📈 AdvancedChartsShowcase.tsx                 [Chart gallery demo]
```

### 🧠 AI & Intelligence Features

```
components/
├── 🧠 AIAnalysisPanel.tsx                        [Natural language AI analysis]
├── 👁️  AIVisionPanel.tsx                         [Image/barcode/OCR analysis]
├── 🤖 AIReportingView.tsx                        [AI-powered reports]
├── 📊 AIForecastingView.tsx                      [Predictive analytics]
├── 🔬 MLIntelligenceView.tsx                     [Machine learning insights]
├── 💎 MaterialsIntelligenceView.tsx              [Materials analytics]
```

### 📊 Google Sheets Integration

```
components/
├── 🔄 PivotTableBuilder.tsx                      [Drag-and-drop pivot tables]
├── 🧹 DataCleaningTools.tsx                      [AI data quality scanner]
├── 👥 CollaborationPanel.tsx                     [Team collaboration features]
├── 📋 TemplateLibrary.tsx                        [9 professional templates]
├── 📈 AdvancedChartLibrary.tsx                   [15+ chart type library]
```

### 🏢 Core Logistics Module

```
components/
├── 🚚 LogisticsView.tsx                          [Logistics overview]
├── 👥 SuppliersView.tsx                          [Supplier management]
├── 🛒 PurchaseOrdersView.tsx                     [Purchase orders]
├── 📥 InboundReceiptsView.tsx                    [Inbound shipments]
├── 🏭 WarehouseOpsView.tsx                       [Warehouse operations]
├── 📤 OutboundShipmentsView.tsx                  [Outbound logistics]
```

### 🏭 Production Module

```
components/
├── 📦 RawMaterialsView.tsx                       [Raw materials inventory]
├── 📖 RecipesView.tsx                            [Product recipes/BOM]
├── 🏭 BatchesView.tsx                            [Production batches]
```

### 🔍 Intelligence Module

```
components/
├── 🔍 TraceabilityView.tsx                       [Product traceability]
├── 🤖 AIReportingView.tsx                        [AI reporting (duplicate listed above)]
├── 📊 AIForecastingView.tsx                      [AI forecasting (duplicate listed above)]
├── 💎 MaterialsIntelligenceView.tsx              [Materials intel (duplicate listed above)]
├── 🔬 MLIntelligenceView.tsx                     [ML intel (duplicate listed above)]
```

### ⚙️ System Module

```
components/
├── ⚙️  AdministrationView.tsx                    [System administration]
├── 📜 GovernanceView.tsx                         [Governance & compliance]
├── ℹ️  AboutView.tsx                             [About & information]
```

---

## 📁 /components/ui - UI COMPONENTS (shadcn/ui)

### 🎨 Core UI Components

```
components/ui/
├── 🔘 button.tsx                                 [Button with variants]
├── 🃏 card.tsx                                   [Card container]
├── 📝 input.tsx                                  [Text input field]
├── 🏷️  badge.tsx                                 [Status badges]
├── 📊 table.tsx                                  [Data tables]
├── 📑 tabs.tsx                                   [Tabbed interface]
├── 💬 dialog.tsx                                 [Modal dialogs]
├── 📄 sheet.tsx                                  [Slide-in panels]
├── 🎚️  slider.tsx                                [Range slider]
├── 🔽 select.tsx                                 [Dropdown select]
├── 📝 textarea.tsx                               [Multi-line text]
├── 📏 separator.tsx                              [Visual divider]
```

### 📋 Form Components

```
components/ui/
├── 📋 form.tsx                                   [Form handling]
├── ☑️  checkbox.tsx                              [Checkbox input]
├── 🔘 radio-group.tsx                            [Radio buttons]
├── 🔄 switch.tsx                                 [Toggle switch]
├── 🏷️  label.tsx                                 [Form labels]
```

### 🎯 Advanced Components

```
components/ui/
├── 📊 chart.tsx                                  [Chart wrapper for Recharts]
├── 📅 calendar.tsx                               [Date picker]
├── 🎠 carousel.tsx                               [Content carousel]
├── ⌘  command.tsx                                [Command palette]
├── 📂 accordion.tsx                              [Collapsible sections]
├── ⚠️  alert-dialog.tsx                          [Confirmation dialogs]
├── 🖱️  context-menu.tsx                          [Right-click menu]
├── 📋 dropdown-menu.tsx                          [Dropdown menu]
├── 💭 hover-card.tsx                             [Hover preview]
├── 📌 popover.tsx                                [Floating popover]
├── 💡 tooltip.tsx                                [Hover tooltip]
├── 🎨 sidebar.tsx                                [Sidebar component]
```

### 🔧 Utility Components

```
components/ui/
├── 🚨 alert.tsx                                  [Alert messages]
├── 🖼️  aspect-ratio.tsx                          [Aspect ratio container]
├── 👤 avatar.tsx                                 [User avatar]
├── 🍞 breadcrumb.tsx                             [Breadcrumb navigation]
├── 📁 collapsible.tsx                            [Collapsible container]
├── 🔢 input-otp.tsx                              [OTP input]
├── 🍔 menubar.tsx                                [Menu bar]
├── 🧭 navigation-menu.tsx                        [Navigation menu]
├── 📄 pagination.tsx                             [Pagination controls]
├── 📊 progress.tsx                               [Progress bar]
├── 📏 resizable.tsx                              [Resizable panels]
├── 📜 scroll-area.tsx                            [Scrollable area]
├── 💀 skeleton.tsx                               [Loading skeleton]
├── 🔘 toggle.tsx                                 [Toggle button]
├── 🔘 toggle-group.tsx                           [Toggle button group]
├── 📱 use-mobile.ts                              [Mobile detection hook]
├── 🔧 utils.ts                                   [Utility functions]
```

---

## 📁 /components/figma - FIGMA INTEGRATION

```
components/figma/
└── 🖼️  ImageWithFallback.tsx                     [Image component with fallback (PROTECTED)]
```

---

## 📁 /src/lib - UTILITIES & CONFIGS

```
src/lib/
└── 🤖 ai-vision-prompts.ts                       [AI Vision system prompts]
```

---

## 📁 /styles - STYLING

```
styles/
└── 🎨 globals.css                                [Tailwind v4 config + CSS variables + typography]
```

---

## 📁 /guidelines - PROJECT GUIDELINES

```
guidelines/
└── 📘 Guidelines.md                              [Development guidelines & standards]
```

---

## 📊 STATISTICS

### Component Breakdown:

**Main Components:** 40 files
- Dashboard & Core: 7
- Showcases: 5
- AI Features: 6
- Google Sheets: 5
- Logistics Module: 6
- Production Module: 3
- Intelligence Module: 5
- System Module: 3

**UI Components (shadcn):** 44 files
- Core UI: 12
- Forms: 5
- Advanced: 13
- Utility: 14

**Documentation:** 18 files
- Getting Started: 3
- Feature Guides: 4
- Showcase Guides: 4
- Technical Docs: 7

**Total Files:** ~105 files

---

## 🎯 KEY DIRECTORIES EXPLAINED

### `/` (Root)
**Contains:** Main app file + all documentation  
**Purpose:** Entry points and comprehensive guides

### `/components/`
**Contains:** All React components  
**Purpose:** Application logic and UI views  
**Pattern:** Feature-based organization

### `/components/ui/`
**Contains:** shadcn/ui primitives  
**Purpose:** Reusable UI building blocks  
**Pattern:** Single-purpose components  
**⚠️ Don't modify:** These are from shadcn library

### `/components/figma/`
**Contains:** Figma-specific components  
**Purpose:** Figma integration support  
**⚠️ Protected:** Don't modify ImageWithFallback.tsx

### `/styles/`
**Contains:** Global CSS  
**Purpose:** Tailwind config + theme variables + typography  
**Important:** Uses Tailwind v4.0 syntax

### `/src/lib/`
**Contains:** Utility functions and configs  
**Purpose:** Shared logic and constants

### `/guidelines/`
**Contains:** Development standards  
**Purpose:** Coding conventions and best practices

---

## 🔍 FINDING FILES BY FEATURE

### Want to find...

**Dashboard Features:**
- Main view: `DashboardView.tsx`
- Builder: `DashboardBuilder.tsx`
- Widgets: `WidgetLibrary.tsx`
- 3D mode: `Dashboard3D.tsx`
- Dark mode: `DashboardCyberpunk.tsx`

**AI Features:**
- Analysis: `AIAnalysisPanel.tsx`
- Vision: `AIVisionPanel.tsx`
- Prompts: `src/lib/ai-vision-prompts.ts`
- Reporting: `AIReportingView.tsx`
- Forecasting: `AIForecastingView.tsx`

**Spreadsheet Features:**
- Pivot: `PivotTableBuilder.tsx`
- Cleaning: `DataCleaningTools.tsx`
- Collab: `CollaborationPanel.tsx`
- Templates: `TemplateLibrary.tsx`
- Charts: `AdvancedChartLibrary.tsx`

**Showcases:**
- Next-Gen: `VisualizationShowcase.tsx`
- Sheets: `SheetsShowcase.tsx`
- Charts: `AdvancedChartsShowcase.tsx`

**Theme System:**
- Context: `ThemeContext.tsx`
- Customizer: `ThemeCustomizer.tsx`
- Styles: `styles/globals.css`

**Navigation:**
- Menu: `Navigation.tsx`
- Router: `App.tsx`

---

## 🎨 FILE TYPE ICONS LEGEND

- 📄 = TypeScript/TSX file
- 📘 = Documentation (general)
- 📗 = Reference guides
- 📙 = Feature guides
- 📕 = Showcase guides
- 📔 = Sheets guides
- 📓 = Theme/version docs
- 🏠 = Dashboard files
- 🎨 = Theme files
- 🧭 = Navigation
- ✨ = Showcase
- 🧠 = AI feature
- 📊 = Charts/data
- 🔄 = Data processing
- 👥 = Collaboration
- 🚚 = Logistics
- 🏭 = Production
- 🔍 = Intelligence
- ⚙️ = System/admin
- 🔘 = Button/input
- 🃏 = Container
- 📋 = Form
- 🎯 = Advanced component

---

## 📋 COMPONENT NAMING PATTERNS

### Pattern Recognition:

```
*View.tsx           → Module views (17 files)
*Panel.tsx          → Feature panels (3 files)
*Showcase.tsx       → Demo showcases (3 files)
*Builder.tsx        → Builder interfaces (2 files)
*Library.tsx        → Collections (3 files)
*Context.tsx        → React contexts (1 file)
*Customizer.tsx     → Customization UI (1 file)
Dashboard*.tsx      → Dashboard variants (4 files)
AI*.tsx             → AI features (6 files)
```

---

## 🗺️ NAVIGATION MAP

### How Files Connect:

```
App.tsx (Router)
├── ThemeContext.tsx (Wraps everything)
├── Navigation.tsx (Sidebar)
└── View Components
    ├── DashboardView.tsx
    │   ├── Opens: AIAnalysisPanel.tsx
    │   ├── Opens: AIVisionPanel.tsx
    │   ├── Opens: CollaborationPanel.tsx
    │   ├── Opens: DataCleaningTools.tsx
    │   ├── Opens: PivotTableBuilder.tsx
    │   ├── Opens: TemplateLibrary.tsx
    │   ├── Opens: ThemeCustomizer.tsx
    │   ├── Opens: DashboardBuilder.tsx
    │   │   └── Uses: WidgetLibrary.tsx
    │   │       └── Uses: AdvancedChartLibrary.tsx
    │   ├── Toggles: Dashboard3D.tsx
    │   └── Toggles: DashboardCyberpunk.tsx
    ├── VisualizationShowcase.tsx
    ├── SheetsShowcase.tsx
    └── [All other *View.tsx files]
```

---

## ✅ QUICK REFERENCE CHECKLIST

### Before Modifying Files:

**Read First:**
- [ ] `/MASTER_FEATURE_REFERENCE.md` - Complete feature guide
- [ ] `/FIND_ANYTHING.md` - Quick lookup
- [ ] This file - Directory structure

**Don't Modify:**
- [ ] `/components/ui/*` - shadcn components (external library)
- [ ] `/components/figma/ImageWithFallback.tsx` - Protected component

**Safe to Modify:**
- [x] All `/components/*View.tsx` files
- [x] All `/components/*Panel.tsx` files
- [x] `/components/ThemeContext.tsx`
- [x] `/components/DashboardView.tsx`
- [x] `/components/WidgetLibrary.tsx`
- [x] `/styles/globals.css`
- [x] Documentation files

---

## 🎯 MOST IMPORTANT FILES

**Top 10 Core Files:**

1. **`App.tsx`** - Application router
2. **`components/Navigation.tsx`** - Menu structure
3. **`components/DashboardView.tsx`** - Main dashboard
4. **`components/ThemeContext.tsx`** - Theme system
5. **`components/WidgetLibrary.tsx`** - Widget definitions
6. **`components/AdvancedChartLibrary.tsx`** - Chart library
7. **`styles/globals.css`** - Global styles
8. **`components/DashboardBuilder.tsx`** - Builder interface
9. **`components/ThemeCustomizer.tsx`** - Theme controls
10. **`src/lib/ai-vision-prompts.ts`** - AI configuration

---

## 🚀 QUICK LINKS

**Need more details?**
- Complete reference: `/MASTER_FEATURE_REFERENCE.md`
- Quick lookup: `/FIND_ANYTHING.md`
- Feature list: `/FEATURE_SUMMARY.md`
- Getting started: `/QUICK_START_V2.md`

---

**🎉 Your complete visual map to the entire codebase!**

Use this whenever you need to locate a file or understand the structure. Everything is organized and documented! 🗂️✨
