# TraceRight Dashboard Widgets & Background Customization Guide

## Overview
TraceRight now features a comprehensive widget system for building custom dashboards on-the-fly, plus full background customization capabilities that integrate seamlessly with the existing theme system.

## 🎨 Background Customization

### Access Background Settings
1. Click **"Customize Theme"** button in the dashboard
2. Scroll to the **"Page Background"** section
3. Choose from 4 background types:
   - **None**: Default white background
   - **Solid Color**: Choose from 8 predefined colors
   - **Gradient**: Uses your current theme gradient
   - **Pattern**: Subtle patterns (dots, grid, diagonal, waves)

### Pattern Options
When using patterns, you can customize:
- **Pattern Type**: Dots, Grid, Diagonal Lines, or Waves
- **Pattern Opacity**: 0-100% (recommended: 5-15% for subtle effect)
- **Base Color**: 8 color options to match your brand

### Technical Details
- Background settings are stored in the ThemeContext
- Applied globally via `backgroundStyle` prop in App.tsx
- Automatically synchronized across all views
- Works seamlessly with gradient equalizer

## 🧩 Widget System

### Available Widget Types

1. **KPI Card** - Display single key metrics
   - Shows value, change %, and trend indicator
   - Compact size (3x2 grid units)

2. **Area Chart** - Trend visualization
   - Perfect for revenue, growth trends
   - Medium size (6x3 grid units)

3. **Bar Chart** - Comparison visualization
   - Great for categorical data
   - Medium size (6x3 grid units)

4. **Line Chart** - Time series data
   - Multi-line support with legend
   - Medium size (6x3 grid units)

5. **Pie Chart** - Distribution view
   - Shows percentage breakdown
   - Compact size (4x3 grid units)

6. **Activity Feed** - Recent activities
   - Real-time updates display
   - Scrollable (4x4 grid units)

7. **Data Table** - Tabular data
   - Structured data display
   - Large size (6x4 grid units)

8. **Text Header** - Section titles
   - Uses theme gradient
   - Full width (12x2 grid units)

### Building Your Custom Dashboard

#### Step 1: Access Dashboard Builder
1. Navigate to Dashboard view
2. Click **"Build Dashboard"** button (top-right)
3. The Dashboard Builder panel opens on the right

#### Step 2: Add Widgets
1. Browse the widget catalog
2. Click any widget type to add it to your dashboard
3. Widgets appear in the "Current Widgets" section
4. Use "Add Sample Dashboard" for quick start

#### Step 3: Customize Widgets
- **Edit**: Click "Edit" to change widget title
- **Reorder**: Use up/down arrows to change widget order
- **Remove**: Click "Remove" to delete a widget
- **Clear All**: Remove all widgets at once

#### Step 4: View Your Dashboard
1. Close the Dashboard Builder panel
2. Switch to "Custom" layout view using the layout switcher
3. Your custom dashboard displays automatically

### Data Integration

Currently, widgets use sample data. To integrate real data:

```typescript
// Example: Update widget with real data
const widget: WidgetConfig = {
  id: 'revenue-kpi',
  type: 'kpi',
  title: 'Monthly Revenue',
  data: {
    label: 'Monthly Revenue',
    value: '$2.4M',
    change: '+18.2%',
    trend: 'up'
  },
  // ... other config
};
```

### Persistence

- Dashboard configurations are **automatically saved** to localStorage
- Key: `traceright-custom-widgets`
- Persists across browser sessions
- No manual save required

### Layout System

The dashboard uses a flexible layout:
- Widgets stack vertically in the order they're added
- Each widget is full-width with appropriate height
- Responsive and scrollable
- Future enhancement: Grid-based drag-and-drop

## 🔧 Technical Architecture

### Files Created/Modified

**New Files:**
- `/components/WidgetLibrary.tsx` - Widget components and catalog
- `/components/DashboardBuilder.tsx` - Builder interface
- `/DASHBOARD_WIDGETS_GUIDE.md` - This documentation

**Modified Files:**
- `/components/ThemeContext.tsx` - Added background settings
- `/components/ThemeCustomizer.tsx` - Added background controls
- `/components/DashboardView.tsx` - Integrated widget system
- `/App.tsx` - Applied background styling globally

### Theme Context Updates

```typescript
interface BackgroundSettings {
  type: 'solid' | 'gradient' | 'pattern' | 'none';
  solidColor: string;
  patternType: 'dots' | 'grid' | 'diagonal' | 'waves';
  patternOpacity: number;
}
```

### Widget Configuration

```typescript
interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
  data?: any;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  x: number;
  y: number;
  w: number;
  h: number;
}
```

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] Drag-and-drop widget repositioning
- [ ] Grid-based layout with react-grid-layout
- [ ] Widget resize handles
- [ ] Real-time data connections (Firestore, BigQuery)
- [ ] Custom widget templates
- [ ] Export/import dashboard configurations
- [ ] Multiple saved dashboards
- [ ] Dashboard sharing via URL

### Firebase Remote Config Integration
- [ ] Feature flags for widget types
- [ ] Dynamic widget catalog
- [ ] Role-based widget access
- [ ] A/B testing for dashboard layouts

### Advanced Customization
- [ ] Custom color picker for backgrounds
- [ ] Image upload for backgrounds
- [ ] Advanced pattern editor
- [ ] CSS gradient builder
- [ ] Theme presets with backgrounds

## 📊 Integration with TraceRight Architecture

### Firestore Integration (Future)
```javascript
// Example: Real-time widget data
const widgetRef = firestore.collection('widgets').doc(widgetId);
widgetRef.onSnapshot(snapshot => {
  updateWidgetData(snapshot.data());
});
```

### BigQuery Analytics (Future)
```javascript
// Example: Historical data for charts
const query = `
  SELECT date, SUM(revenue) as revenue
  FROM analytics.orders
  WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
  GROUP BY date
  ORDER BY date
`;
```

### Remote Config for Feature Flags
```javascript
// Example: Toggle widget types
if (remoteConfig.getBoolean('enable_ml_widgets')) {
  // Show ML-powered widgets
}
```

## 💡 Best Practices

### Dashboard Design
1. **Start Simple**: Begin with 3-4 key widgets
2. **Logical Order**: Place most important metrics at top
3. **Balance**: Mix KPIs with visualizations
4. **Context**: Use text headers to organize sections

### Performance
- Limit to 10-15 widgets per dashboard
- Use appropriate chart types for data size
- Consider data refresh rates

### User Experience
- Choose backgrounds that don't interfere with readability
- Use subtle patterns (5-10% opacity)
- Match background colors to your brand
- Test with different gradient styles

## 🎯 Use Cases

### Executive Dashboard
- 4x KPI cards (Revenue, Orders, Delivery %, Issues)
- 1x Area chart (6-month trend)
- 1x Activity feed (key events)

### Operations Dashboard
- Text header "Warehouse Operations"
- 2x KPI cards (Active Shipments, Processing Time)
- 1x Bar chart (Warehouse utilization)
- 1x Table (Recent orders)

### Analytics Dashboard
- Text header "Performance Analytics"
- 1x Line chart (Multi-metric trend)
- 1x Pie chart (Order distribution)
- 1x Area chart (Revenue growth)
- 1x Activity feed (System alerts)

## 📝 Notes

- All customizations are user-specific (stored in browser)
- No server-side persistence yet (Phase 2)
- Widget data is currently sample/mock data
- Ready for Firestore/BigQuery integration
- Fully compatible with existing theme system
- Works with all gradient equalizer settings

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Next Review**: After Phase 2 Crowdfunding
