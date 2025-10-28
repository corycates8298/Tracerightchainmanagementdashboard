import { useState } from 'react';
import { useFeatureFlags, FeatureFlags } from './FeatureFlagsContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import {
  Settings,
  ToggleLeft,
  ToggleRight,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Package,
  Factory,
  Brain,
  Cog,
  Sparkles,
  LayoutDashboard,
  PieChart,
  Table2,
  Search,
  Power,
  PowerOff,
  Copy,
  Check
} from 'lucide-react';

interface FeatureConfig {
  key: keyof FeatureFlags;
  label: string;
  description: string;
  category: 'Core Logistics' | 'Production' | 'Intelligence' | 'System' | 'Showcases' | 'Dashboard' | 'Panels' | 'Widgets' | 'Charts' | 'Advanced';
  icon: React.ReactNode;
}

const featureConfigs: FeatureConfig[] = [
  // Core Logistics
  { key: 'logistics', label: 'Logistics Overview', description: 'Main logistics dashboard and tracking', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  { key: 'suppliers', label: 'Suppliers', description: 'Supplier management and analytics', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  { key: 'purchaseOrders', label: 'Purchase Orders', description: 'PO creation and management', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  { key: 'inboundReceipts', label: 'Inbound Receipts', description: 'Receiving and inspection', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  { key: 'warehouseOps', label: 'Warehouse Operations', description: 'Warehouse management system', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  { key: 'outboundShipments', label: 'Outbound Shipments', description: 'Shipping and delivery tracking', category: 'Core Logistics', icon: <Package className="w-4 h-4" /> },
  
  // Production
  { key: 'rawMaterials', label: 'Raw Materials', description: 'Material inventory management', category: 'Production', icon: <Factory className="w-4 h-4" /> },
  { key: 'recipes', label: 'Recipes', description: 'Product recipes and BOMs', category: 'Production', icon: <Factory className="w-4 h-4" /> },
  { key: 'batches', label: 'Production Batches', description: 'Batch tracking and management', category: 'Production', icon: <Factory className="w-4 h-4" /> },
  
  // Intelligence
  { key: 'traceability', label: 'Traceability', description: 'End-to-end product tracking', category: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
  { key: 'aiReporting', label: 'AI Reporting', description: 'AI-powered reports and insights', category: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
  { key: 'aiForecast', label: 'AI Forecasting', description: 'Predictive analytics', category: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
  { key: 'materialsIntel', label: 'Materials Intelligence', description: 'Material analytics and insights', category: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
  { key: 'mlIntelligence', label: 'ML Intelligence', description: 'Machine learning features', category: 'Intelligence', icon: <Brain className="w-4 h-4" /> },
  
  // System
  { key: 'administration', label: 'Administration', description: 'System administration', category: 'System', icon: <Cog className="w-4 h-4" /> },
  { key: 'governance', label: 'Governance', description: 'Compliance and governance', category: 'System', icon: <Cog className="w-4 h-4" /> },
  { key: 'about', label: 'About', description: 'About and information', category: 'System', icon: <Cog className="w-4 h-4" /> },
  
  // Showcases
  { key: 'showcaseVisualization', label: 'Next-Gen Features', description: 'Advanced visualizations showcase', category: 'Showcases', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'showcaseSheets', label: 'Google Sheets Demo', description: 'Spreadsheet interface showcase', category: 'Showcases', icon: <Sparkles className="w-4 h-4" /> },
  
  // Dashboard Features
  { key: 'dashboard3D', label: '3D Dashboard', description: '3D rotating glassmorphic view', category: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'dashboardCyberpunk', label: 'Cyberpunk Mode', description: 'Dark theme dashboard', category: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'dashboardBuilder', label: 'Dashboard Builder', description: 'Custom dashboard creation', category: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'aiVision', label: 'AI Vision', description: 'Image analysis and OCR', category: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  
  // Panel Features
  { key: 'aiAnalysis', label: 'AI Analysis', description: 'Natural language analysis', category: 'Panels', icon: <Brain className="w-4 h-4" /> },
  { key: 'collaboration', label: 'Collaboration', description: 'Team collaboration features', category: 'Panels', icon: <Table2 className="w-4 h-4" /> },
  { key: 'dataCleaningTools', label: 'Data Cleaning', description: 'Data quality tools', category: 'Panels', icon: <Table2 className="w-4 h-4" /> },
  { key: 'pivotTables', label: 'Pivot Tables', description: 'Dynamic pivot tables', category: 'Panels', icon: <Table2 className="w-4 h-4" /> },
  { key: 'templateLibrary', label: 'Templates', description: 'Dashboard templates', category: 'Panels', icon: <Table2 className="w-4 h-4" /> },
  { key: 'themeCustomizer', label: 'Theme Customizer', description: 'Theme customization', category: 'Panels', icon: <Table2 className="w-4 h-4" /> },
  
  // Widget Types
  { key: 'widgetKPI', label: 'KPI Widgets', description: 'Key performance indicators', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetSalesChart', label: 'Sales Chart', description: 'Sales visualization', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetRevenueChart', label: 'Revenue Chart', description: 'Revenue tracking', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetInventory', label: 'Inventory Status', description: 'Stock level widgets', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetOrders', label: 'Recent Orders', description: 'Order list widgets', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetProducts', label: 'Top Products', description: 'Product rankings', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetPerformance', label: 'Performance Metrics', description: 'Performance indicators', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  { key: 'widgetCustomChart', label: 'Custom Charts', description: 'Custom visualizations', category: 'Widgets', icon: <PieChart className="w-4 h-4" /> },
  
  // Chart Types
  { key: 'chartBar', label: 'Bar Charts', description: 'Bar chart visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartLine', label: 'Line Charts', description: 'Line chart visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartPie', label: 'Pie Charts', description: 'Pie chart visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartArea', label: 'Area Charts', description: 'Area chart visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartRadar', label: 'Radar Charts', description: 'Radar chart visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartScatter', label: 'Scatter Plots', description: 'Scatter plot visualizations', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartTreemap', label: 'Treemap Charts', description: 'Hierarchical data viz', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartSankey', label: 'Sankey Diagrams', description: 'Flow diagrams', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartFunnel', label: 'Funnel Charts', description: 'Conversion funnels', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartGauge', label: 'Gauge Charts', description: 'Performance gauges', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartWaterfall', label: 'Waterfall Charts', description: 'Sequential changes', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartBullet', label: 'Bullet Charts', description: 'Target comparisons', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  { key: 'chartHeatmap', label: 'Heatmaps', description: 'Pattern analysis', category: 'Charts', icon: <PieChart className="w-4 h-4" /> },
  
  // Advanced Features
  { key: 'advancedCharts', label: 'Advanced Charts', description: 'Complex visualizations', category: 'Advanced', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'realTimeUpdates', label: 'Real-time Updates', description: 'Live data streaming', category: 'Advanced', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'exportData', label: 'Data Export', description: 'Export capabilities', category: 'Advanced', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'notifications', label: 'Notifications', description: 'System notifications', category: 'Advanced', icon: <Sparkles className="w-4 h-4" /> },
];

export function FeatureFlagsManager() {
  const { flags, toggleFeature, resetFlags, enableAll, disableAll, exportConfig, importConfig } = useFeatureFlags();
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [exportedConfig, setExportedConfig] = useState('');
  const [importConfig_input, setImportConfig_input] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = Array.from(new Set(featureConfigs.map(f => f.category)));

  const filteredFeatures = featureConfigs.filter(feature =>
    feature.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFeaturesByCategory = (category: string) => {
    return filteredFeatures.filter(f => f.category === category);
  };

  const handleExport = () => {
    const config = exportConfig();
    setExportedConfig(config);
    setShowExportDialog(true);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(exportedConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    if (importConfig_input.trim()) {
      importConfig(importConfig_input);
      setShowImportDialog(false);
      setImportConfig_input('');
    }
  };

  const enabledCount = Object.values(flags).filter(Boolean).length;
  const totalCount = Object.keys(flags).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900 text-4xl">Feature Flags Manager</h1>
                <p className="text-slate-600">Control which features are enabled in your application</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
              {enabledCount} / {totalCount} Enabled
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search features..."
                  className="pl-10 border-blue-300"
                />
              </div>
            </div>
            <Button
              onClick={enableAll}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
            >
              <Power className="w-4 h-4 mr-2" />
              Enable All
            </Button>
            <Button
              onClick={disableAll}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <PowerOff className="w-4 h-4 mr-2" />
              Disable All
            </Button>
            <Button
              onClick={resetFlags}
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleExport}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              onClick={() => setShowImportDialog(true)}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </Card>

        {/* Feature Tabs by Category */}
        <Tabs defaultValue={categories[0]} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 p-2 bg-white/80 backdrop-blur border-2 border-blue-200">
            {categories.map((category) => {
              const categoryFeatures = getFeaturesByCategory(category);
              const enabledInCategory = categoryFeatures.filter(f => flags[f.key]).length;
              return (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex items-center gap-2"
                >
                  {category}
                  <Badge variant="outline" className="ml-1">
                    {enabledInCategory}/{categoryFeatures.length}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => {
            const categoryFeatures = getFeaturesByCategory(category);
            return (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryFeatures.map((feature) => {
                    const isEnabled = flags[feature.key];
                    return (
                      <Card
                        key={feature.key}
                        className={`p-5 border-2 transition-all cursor-pointer ${
                          isEnabled
                            ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50'
                            : 'border-red-200 bg-gradient-to-br from-red-50 to-rose-50 opacity-60'
                        }`}
                        onClick={() => toggleFeature(feature.key)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                isEnabled ? 'bg-green-600' : 'bg-red-600'
                              }`}
                            >
                              {feature.icon}
                            </div>
                            <div className="flex items-center gap-2">
                              {isEnabled ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </div>
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => toggleFeature(feature.key)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <h3 className="text-slate-900 font-semibold mb-1">{feature.label}</h3>
                        <p className="text-slate-600 text-sm mb-3">{feature.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={
                              isEnabled
                                ? 'border-green-600 text-green-700'
                                : 'border-red-600 text-red-700'
                            }
                          >
                            {isEnabled ? 'ENABLED' : 'DISABLED'}
                          </Badge>
                          <code className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {feature.key}
                          </code>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Export Dialog */}
        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Export Configuration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-slate-600 text-sm">
                Copy this configuration to share or backup your feature flag settings.
              </p>
              <Textarea
                value={exportedConfig}
                readOnly
                className="font-mono text-sm h-96"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleCopyConfig}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Import Configuration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-slate-600 text-sm">
                Paste a configuration JSON to restore feature flag settings.
              </p>
              <Textarea
                value={importConfig_input}
                onChange={(e) => setImportConfig_input(e.target.value)}
                placeholder="Paste configuration JSON here..."
                className="font-mono text-sm h-96"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Configuration
                </Button>
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
