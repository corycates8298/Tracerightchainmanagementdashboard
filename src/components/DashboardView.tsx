import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CheckCircle2, 
  Truck,
  AlertTriangle,
  Package,
  Clock,
  LayoutGrid,
  Settings,
  Sparkles,
  Wand2,
  Users,
  FileText,
  Brain,
  Table2,
  LayoutTemplate,
  Eye,
  Camera
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThemeCustomizer } from './ThemeCustomizer';
import { DashboardBuilder } from './DashboardBuilder';
import { AIAnalysisPanel } from './AIAnalysisPanel';
import { AIVisionPanel } from './AIVisionPanel';
import { CollaborationPanel } from './CollaborationPanel';
import { DataCleaningTools } from './DataCleaningTools';
import { PivotTableBuilder } from './PivotTableBuilder';
import { TemplateLibrary } from './TemplateLibrary';
import { Dashboard3D } from './Dashboard3D';
import { DashboardCyberpunk } from './DashboardCyberpunk';
import { useTheme } from './ThemeContext';
import { useFeature } from './FeatureFlagsContext';
import { WidgetConfig, WIDGET_COMPONENTS } from './WidgetLibrary';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from './charts';

type LayoutType = 'analyst' | 'executive' | 'warehouse' | 'custom';

const kpiData = [
  {
    label: 'Total Revenue',
    value: '$2.4M',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: 'On-Time Delivery',
    value: '94.2%',
    change: '+5.1%',
    trend: 'up',
    icon: CheckCircle2,
  },
  {
    label: 'Active Shipments',
    value: '3,284',
    change: '+12.5%',
    trend: 'up',
    icon: Truck,
  },
  {
    label: 'Delayed Orders',
    value: '47',
    change: '-23.1%',
    trend: 'down',
    icon: AlertTriangle,
  },
];

const revenueData = [
  { month: 'Jan', revenue: 185000, orders: 842 },
  { month: 'Feb', revenue: 210000, orders: 956 },
  { month: 'Mar', revenue: 198000, orders: 891 },
  { month: 'Apr', revenue: 235000, orders: 1024 },
  { month: 'May', revenue: 248000, orders: 1156 },
  { month: 'Jun', revenue: 267000, orders: 1248 },
];

const orderStatusData = [
  { status: 'Delivered', count: 2847 },
  { status: 'In Transit', count: 1243 },
  { status: 'Processing', count: 894 },
  { status: 'Delayed', count: 47 },
];

const warehouseData = [
  { warehouse: 'West Coast', utilization: 85, capacity: 100 },
  { warehouse: 'East Coast', utilization: 92, capacity: 100 },
  { warehouse: 'Midwest', utilization: 78, capacity: 100 },
  { warehouse: 'South', utilization: 81, capacity: 100 },
];

const recentActivities = [
  { id: 1, type: 'shipment', message: 'Shipment SH-2847 delivered to New York, NY', time: '5 min ago', status: 'success' },
  { id: 2, type: 'order', message: 'New purchase order PO-5832 created', time: '12 min ago', status: 'info' },
  { id: 3, type: 'alert', message: 'Low stock alert: Raw Material RM-4521', time: '28 min ago', status: 'warning' },
  { id: 4, type: 'receipt', message: 'Inbound receipt IR-3291 inspected and approved', time: '1 hour ago', status: 'success' },
  { id: 5, type: 'batch', message: 'Production batch B-8472 completed', time: '2 hours ago', status: 'success' },
];

export function DashboardView() {
  const [layout, setLayout] = useState<LayoutType>('analyst');
  const [view3D, setView3D] = useState(false);
  const [viewCyberpunk, setViewCyberpunk] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [aiAnalysisOpen, setAIAnalysisOpen] = useState(false);
  const [aiVisionOpen, setAIVisionOpen] = useState(false);
  const [collaborationOpen, setCollaborationOpen] = useState(false);
  const [dataCleaningOpen, setDataCleaningOpen] = useState(false);
  const [pivotBuilderOpen, setPivotBuilderOpen] = useState(false);
  const [templateLibraryOpen, setTemplateLibraryOpen] = useState(false);
  const [customWidgets, setCustomWidgets] = useState<WidgetConfig[]>([]);
  const { gradientClass, gradientStyleValue, getPrimaryColors, fontClass } = useTheme();
  
  // Feature Flags
  const show3D = useFeature('dashboard3D');
  const showCyberpunk = useFeature('dashboardCyberpunk');
  const showAIVision = useFeature('aiVision');
  const showAIAnalysis = useFeature('aiAnalysis');
  const showCollaboration = useFeature('collaboration');
  const showThemeCustomizer = useFeature('themeCustomizer');
  const showTemplates = useFeature('templateLibrary');
  const showPivotTables = useFeature('pivotTables');
  const showDataCleaning = useFeature('dataCleaningTools');

  // Load saved widgets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('traceright-custom-widgets');
    if (saved) {
      try {
        setCustomWidgets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom widgets:', e);
      }
    }
  }, []);

  // Save widgets to localStorage
  const handleWidgetsChange = (widgets: WidgetConfig[]) => {
    setCustomWidgets(widgets);
    localStorage.setItem('traceright-custom-widgets', JSON.stringify(widgets));
  };

  const layouts: { id: LayoutType | 'custom'; name: string; description: string }[] = [
    { id: 'analyst', name: 'Analyst View', description: 'Detailed charts and trends' },
    { id: 'executive', name: 'Executive Summary', description: 'High-level KPIs' },
    { id: 'warehouse', name: 'Warehouse Ops', description: 'Operations focused' },
    { id: 'custom', name: `Custom${customWidgets.length > 0 ? ` (${customWidgets.length})` : ''}`, description: 'Your widgets' },
  ];

  const primaryColors = getPrimaryColors();

  // Show Cyberpunk Dashboard if enabled
  if (viewCyberpunk) {
    return (
      <>
        <DashboardCyberpunk />
        <Button
          onClick={() => setViewCyberpunk(false)}
          className="fixed bottom-8 right-8 shadow-2xl bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          <Eye className="w-5 h-5 mr-2" />
          Exit Cyberpunk Mode
        </Button>
        
        {/* Panels still accessible in Cyberpunk mode */}
        <AIAnalysisPanel isOpen={aiAnalysisOpen} onClose={() => setAIAnalysisOpen(false)} />
        <AIVisionPanel isOpen={aiVisionOpen} onClose={() => setAIVisionOpen(false)} />
        <CollaborationPanel isOpen={collaborationOpen} onClose={() => setCollaborationOpen(false)} />
        <DataCleaningTools isOpen={dataCleaningOpen} onClose={() => setDataCleaningOpen(false)} />
        <PivotTableBuilder isOpen={pivotBuilderOpen} onClose={() => setPivotBuilderOpen(false)} />
        <TemplateLibrary isOpen={templateLibraryOpen} onClose={() => setTemplateLibraryOpen(false)} onApplyTemplate={(templateId) => console.log('Applying template:', templateId)} />
        <ThemeCustomizer isOpen={customizerOpen} onClose={() => setCustomizerOpen(false)} />
      </>
    );
  }

  // Show 3D Dashboard if enabled
  if (view3D) {
    return (
      <>
        <Dashboard3D />
        <Button
          onClick={() => setView3D(false)}
          className="fixed bottom-8 right-8 shadow-2xl text-white"
          style={{ background: gradientStyleValue }}
          size="lg"
        >
          <Eye className="w-5 h-5 mr-2" />
          Switch to 2D View
        </Button>
        
        {/* Panels still accessible in 3D mode */}
        <AIAnalysisPanel isOpen={aiAnalysisOpen} onClose={() => setAIAnalysisOpen(false)} />
        <AIVisionPanel isOpen={aiVisionOpen} onClose={() => setAIVisionOpen(false)} />
        <CollaborationPanel isOpen={collaborationOpen} onClose={() => setCollaborationOpen(false)} />
        <DataCleaningTools isOpen={dataCleaningOpen} onClose={() => setDataCleaningOpen(false)} />
        <PivotTableBuilder isOpen={pivotBuilderOpen} onClose={() => setPivotBuilderOpen(false)} />
        <TemplateLibrary isOpen={templateLibraryOpen} onClose={() => setTemplateLibraryOpen(false)} onApplyTemplate={(templateId) => console.log('Applying template:', templateId)} />
        <ThemeCustomizer isOpen={customizerOpen} onClose={() => setCustomizerOpen(false)} />
      </>
    );
  }

  return (
    <div className={`p-8 space-y-6 ${fontClass}`}>
      {/* Header with Layout Switcher */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">30,000-foot view of your supply chain operations</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Layout Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
            {layouts.map((l) => (
              <button
                key={l.id}
                onClick={() => setLayout(l.id as LayoutType)}
                className={`px-4 py-2 rounded-md text-sm transition-all ${
                  layout === l.id
                    ? 'text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                style={layout === l.id ? { background: gradientStyleValue } : {}}
              >
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  {l.name}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {show3D && (
              <Button
                onClick={() => setView3D(true)}
                variant="outline"
                className="text-violet-600 border-violet-200 hover:bg-violet-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                3D View
              </Button>
            )}
            {showCyberpunk && (
              <Button
                onClick={() => setViewCyberpunk(true)}
                variant="outline"
                className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Cyberpunk
              </Button>
            )}
            {showAIVision && (
              <Button
                onClick={() => setAIVisionOpen(true)}
                variant="outline"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Vision
              </Button>
            )}
            {showAIAnalysis && (
              <Button
                onClick={() => setAIAnalysisOpen(true)}
                variant="outline"
                className="text-violet-600 border-violet-200 hover:bg-violet-50"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Analysis
              </Button>
            )}
            {showCollaboration && (
              <Button
                onClick={() => setCollaborationOpen(true)}
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Team
              </Button>
            )}
            {showThemeCustomizer && (
              <Button
                onClick={() => setCustomizerOpen(true)}
                className="text-white hover:opacity-90"
                style={{ background: gradientStyleValue }}
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      {(showTemplates || showPivotTables || showDataCleaning) && (
        <Card className="p-4 border-slate-200 bg-gradient-to-br from-violet-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wand2 className="w-5 h-5 text-violet-600" />
              <div>
                <div className="text-sm text-violet-900">Advanced Tools</div>
                <div className="text-xs text-violet-700">Powerful features for data analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showTemplates && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTemplateLibraryOpen(true)}
                >
                  <LayoutTemplate className="w-3 h-3 mr-1" />
                  Templates
                </Button>
              )}
              {showPivotTables && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPivotBuilderOpen(true)}
                >
                  <Table2 className="w-3 h-3 mr-1" />
                  Pivot Table
                </Button>
              )}
              {showDataCleaning && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDataCleaningOpen(true)}
                >
                  <Wand2 className="w-3 h-3 mr-1" />
                  Data Cleaning
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Layout Description */}
      <Card className="p-4 border-slate-200 bg-gradient-to-br from-slate-50 to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className={`w-5 h-5 text-${primaryColors.from.split('-')[1]}-600`} />
            <div>
              <span className="text-sm text-slate-900">
                Active Layout: <strong>{layouts.find(l => l.id === layout)?.name}</strong>
              </span>
              <span className="text-sm text-slate-600 ml-2">
                — {layouts.find(l => l.id === layout)?.description}
              </span>
            </div>
          </div>
          {layout === 'custom' && customWidgets.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setBuilderOpen(true)}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              Edit Widgets
            </Button>
          )}
        </div>
      </Card>

      {/* Executive Summary Layout */}
      {layout === 'executive' && (
        <>
          {/* KPI Cards - Larger for Executive */}
          <div className="grid grid-cols-2 gap-6">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              const isPositive = kpi.trend === 'up' && !kpi.label.includes('Delayed');
              const isImprovement = kpi.label.includes('Delayed') && kpi.trend === 'down';
              
              return (
                <Card key={kpi.label} className="p-8 border-slate-200 hover:shadow-lg transition-shadow">
                  <div 
                    className="inline-flex p-4 rounded-xl mb-6"
                    style={{ background: gradientStyleValue }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-slate-600 mb-2">{kpi.label}</div>
                  <div className="text-slate-900 text-4xl mb-3">{kpi.value}</div>
                  <div className="flex items-center gap-1">
                    {(isPositive || isImprovement) ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`text-lg ${isPositive || isImprovement ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                    <span className="text-slate-500 ml-1">vs last month</span>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Revenue Trend - Full Width */}
          <Card className="p-8 border-slate-200">
            <div className="mb-6">
              <h3 className="text-slate-900 text-2xl">Revenue Performance</h3>
              <p className="text-slate-600 mt-1">6-month trend analysis</p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}

      {/* Analyst View Layout */}
      {layout === 'analyst' && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-6">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              const isPositive = kpi.trend === 'up' && !kpi.label.includes('Delayed');
              const isImprovement = kpi.label.includes('Delayed') && kpi.trend === 'down';
              
              return (
                <Card key={kpi.label} className="p-6 border-slate-200 hover:shadow-lg transition-shadow">
                  <div 
                    className="inline-flex p-3 rounded-xl mb-4"
                    style={{ background: gradientStyleValue }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-slate-600 text-sm mb-1">{kpi.label}</div>
                  <div className="text-slate-900 text-2xl mb-2">{kpi.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {(isPositive || isImprovement) ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={isPositive || isImprovement ? 'text-green-600' : 'text-red-600'}>
                      {kpi.change}
                    </span>
                    <span className="text-slate-500 ml-1">vs last month</span>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="p-6 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900">Revenue & Orders</h3>
                <p className="text-sm text-slate-600 mt-1">6-month trend</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Order Status */}
            <Card className="p-6 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900">Order Status</h3>
                <p className="text-sm text-slate-600 mt-1">Current distribution</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="status" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Warehouse Utilization */}
            <Card className="p-6 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900">Warehouse Utilization</h3>
                <p className="text-sm text-slate-600 mt-1">Capacity usage</p>
              </div>
              <div className="space-y-4">
                {warehouseData.map((warehouse) => (
                  <div key={warehouse.warehouse}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700">{warehouse.warehouse}</span>
                      <span className="text-sm text-slate-900">{warehouse.utilization}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          warehouse.utilization > 90 ? 'bg-red-500' :
                          warehouse.utilization > 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${warehouse.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900">Recent Activity</h3>
                <p className="text-sm text-slate-600 mt-1">Latest updates</p>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Custom Dashboard Layout */}
      {layout === 'custom' && (
        <>
          {customWidgets.length === 0 ? (
            <div className="space-y-6">
              <Card className="p-12 border-slate-200 text-center">
                <LayoutGrid className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">No Custom Widgets Yet</h3>
                <p className="text-slate-600 mb-6">
                  Create your personalized dashboard by adding widgets from our library
                </p>
                <Button
                  onClick={() => setBuilderOpen(true)}
                  style={{ background: gradientStyleValue }}
                  className="text-white"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Open Dashboard Builder
                </Button>
              </Card>

              {/* Preview of Available Widgets */}
              <Card className="p-6 border-slate-200">
                <div className="mb-4">
                  <h3 className="text-slate-900">Available Widgets</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Choose from 8 different widget types to build your perfect dashboard
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: DollarSign, name: 'KPI Cards' },
                    { icon: TrendingUp, name: 'Charts' },
                    { icon: Clock, name: 'Activity Feed' },
                    { icon: Package, name: 'Data Tables' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="p-4 rounded-lg border-2 border-slate-200 text-center">
                        <div 
                          className="inline-flex p-3 rounded-lg mb-2"
                          style={{ background: gradientStyleValue }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-xs text-slate-700">{item.name}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {customWidgets.map((widget) => {
                const WidgetComponent = WIDGET_COMPONENTS[widget.type];
                
                return (
                  <div key={widget.id}>
                    <WidgetComponent config={widget} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Warehouse Ops Layout */}
      {layout === 'warehouse' && (
        <>
          {/* Simplified KPIs for Warehouse */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="p-6 border-slate-200">
              <div 
                className="inline-flex p-3 rounded-xl mb-4"
                style={{ background: gradientStyleValue }}
              >
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-600 text-sm mb-1">Active Shipments</div>
              <div className="text-slate-900 text-3xl">3,284</div>
            </Card>
            <Card className="p-6 border-slate-200">
              <div 
                className="inline-flex p-3 rounded-xl mb-4"
                style={{ background: gradientStyleValue }}
              >
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-600 text-sm mb-1">Avg Processing Time</div>
              <div className="text-slate-900 text-3xl">2.4h</div>
            </Card>
            <Card className="p-6 border-slate-200">
              <div 
                className="inline-flex p-3 rounded-xl mb-4"
                style={{ background: gradientStyleValue }}
              >
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-600 text-sm mb-1">Low Stock Items</div>
              <div className="text-slate-900 text-3xl">88</div>
            </Card>
            <Card className="p-6 border-slate-200">
              <div 
                className="inline-flex p-3 rounded-xl mb-4"
                style={{ background: gradientStyleValue }}
              >
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-600 text-sm mb-1">Quality Pass Rate</div>
              <div className="text-slate-900 text-3xl">97.8%</div>
            </Card>
          </div>

          {/* Warehouse Details */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200">
              <div className="mb-6">
                <h3 className="text-slate-900">Warehouse Utilization</h3>
                <p className="text-sm text-slate-600 mt-1">Real-time capacity</p>
              </div>
              <div className="space-y-6">
                {warehouseData.map((warehouse) => (
                  <div key={warehouse.warehouse}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-900">{warehouse.warehouse}</span>
                      <Badge variant="outline">{warehouse.utilization}% Full</Badge>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${warehouse.utilization}%`,
                          background: gradientStyleValue
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Live Map Placeholder */}
            <Card className="p-6 border-slate-200">
              <div className="mb-4">
                <h3 className="text-slate-900">Live Shipment Map</h3>
                <p className="text-sm text-slate-600 mt-1">Real-time tracking</p>
              </div>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }} />
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Truck className={`w-8 h-8 text-${primaryColors.from.split('-')[1]}-600`} />
                  </div>
                  <p className="text-slate-600">Navigate to Logistics view</p>
                  <p className="text-sm text-slate-500 mt-1">for interactive map</p>
                </div>
              </div>
            </Card>

            {/* Recent Activity - Warehouse Focused */}
            <Card className="p-6 border-slate-200 col-span-2">
              <div className="mb-6">
                <h3 className="text-slate-900">Warehouse Operations Log</h3>
                <p className="text-sm text-slate-600 mt-1">Recent warehouse activities</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Theme Customizer */}
      <ThemeCustomizer isOpen={customizerOpen} onClose={() => setCustomizerOpen(false)} />
      
      {/* Dashboard Builder */}
      <DashboardBuilder 
        isOpen={builderOpen} 
        onClose={() => setBuilderOpen(false)}
        widgets={customWidgets}
        onWidgetsChange={handleWidgetsChange}
      />

      {/* AI Vision Panel */}
      <AIVisionPanel 
        isOpen={aiVisionOpen} 
        onClose={() => setAIVisionOpen(false)} 
      />

      {/* AI Analysis Panel */}
      <AIAnalysisPanel 
        isOpen={aiAnalysisOpen} 
        onClose={() => setAIAnalysisOpen(false)} 
      />

      {/* Collaboration Panel */}
      <CollaborationPanel 
        isOpen={collaborationOpen} 
        onClose={() => setCollaborationOpen(false)} 
      />

      {/* Data Cleaning Tools */}
      <DataCleaningTools 
        isOpen={dataCleaningOpen} 
        onClose={() => setDataCleaningOpen(false)} 
      />

      {/* Pivot Table Builder */}
      <PivotTableBuilder 
        isOpen={pivotBuilderOpen} 
        onClose={() => setPivotBuilderOpen(false)} 
      />

      {/* Template Library */}
      <TemplateLibrary 
        isOpen={templateLibraryOpen} 
        onClose={() => setTemplateLibraryOpen(false)} 
        onApplyTemplate={(templateId) => {
          console.log('Applying template:', templateId);
          // In production, this would load the template's widgets
        }}
      />
    </div>
  );
}
