import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Sparkles,
  Zap,
  TrendingUp,
  GitBranch,
  Layers,
  Activity,
  Workflow,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Brain,
  Gauge as GaugeIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  Sankey,
  Treemap,
  Funnel,
  FunnelChart,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  Bar
} from './charts';

// Advanced Visualization Data
const sankeyData = {
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
};

const treemapData = [
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
];

const funnelData = [
  { stage: 'Orders Received', value: 1000, fill: '#8b5cf6' },
  { stage: 'Orders Validated', value: 850, fill: '#7c3aed' },
  { stage: 'In Production', value: 720, fill: '#6d28d9' },
  { stage: 'Quality Check', value: 680, fill: '#5b21b6' },
  { stage: 'Shipped', value: 650, fill: '#4c1d95' }
];

const gaugeData = [
  { name: 'Performance', value: 87, fill: '#10b981' },
  { name: 'Remaining', value: 13, fill: '#e5e7eb' }
];

const scatterData = [
  { x: 100, y: 200, z: 200, efficiency: 85 },
  { x: 120, y: 300, z: 250, efficiency: 92 },
  { x: 170, y: 400, z: 300, efficiency: 78 },
  { x: 140, y: 350, z: 280, efficiency: 88 },
  { x: 150, y: 380, z: 320, efficiency: 95 },
  { x: 110, y: 280, z: 240, efficiency: 81 }
];

const streamData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  stream1: Math.random() * 100,
  stream2: Math.random() * 80,
  stream3: Math.random() * 60
}));

// Automation Workflow Data
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'end';
  label: string;
  status: 'idle' | 'running' | 'success' | 'error';
  icon: any;
}

const workflowNodes: WorkflowNode[] = [
  { id: '1', type: 'trigger', label: 'New Order Created', status: 'idle', icon: Sparkles },
  { id: '2', type: 'condition', label: 'Check Inventory', status: 'idle', icon: GitBranch },
  { id: '3', type: 'action', label: 'Generate Pick List', status: 'idle', icon: Zap },
  { id: '4', type: 'action', label: 'Notify Warehouse', status: 'idle', icon: Zap },
  { id: '5', type: 'condition', label: 'Quality Verified?', status: 'idle', icon: GitBranch },
  { id: '6', type: 'action', label: 'Ship Order', status: 'idle', icon: Zap },
  { id: '7', type: 'end', label: 'Complete', status: 'idle', icon: CheckCircle2 }
];

export function VisualizationShowcase() {
  const [activeTab, setActiveTab] = useState('visualizations');
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [streamingData, setStreamingData] = useState(streamData);

  // Workflow animation
  useEffect(() => {
    if (workflowRunning) {
      const interval = setInterval(() => {
        setCurrentNodeIndex((prev) => {
          if (prev >= workflowNodes.length - 1) {
            setWorkflowRunning(false);
            return -1;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [workflowRunning]);

  // Real-time data streaming
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamingData((prev) => [
        ...prev.slice(1),
        {
          time: prev[prev.length - 1].time + 1,
          stream1: Math.random() * 100,
          stream2: Math.random() * 80,
          stream3: Math.random() * 60
        }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getNodeStatus = (index: number): WorkflowNode['status'] => {
    if (index < currentNodeIndex) return 'success';
    if (index === currentNodeIndex) return 'running';
    return 'idle';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-slate-900 text-4xl">Next-Gen Features Showcase</h1>
          </div>
          <p className="text-slate-600 text-lg">
            Cutting-edge visualizations and intelligent automation capabilities
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="visualizations" className="text-lg py-3">
              <Layers className="w-5 h-5 mr-2" />
              Advanced Visualizations
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-lg py-3">
              <Workflow className="w-5 h-5 mr-2" />
              Smart Automation
            </TabsTrigger>
          </TabsList>

          {/* VISUALIZATIONS TAB */}
          <TabsContent value="visualizations" className="space-y-6">
            {/* Sankey Flow Diagram */}
            <Card className="p-6 border-purple-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900 text-2xl">Sankey Flow Diagram</h3>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Supply Chain Flow
                  </Badge>
                </div>
                <p className="text-slate-600">
                  Visualize material flow through your entire supply chain network
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8">
                <ResponsiveContainer width="100%" height={400}>
                  <Sankey
                    data={sankeyData}
                    node={{ fill: '#8b5cf6', stroke: '#7c3aed' }}
                    link={{ stroke: '#c4b5fd', strokeOpacity: 0.5 }}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #8b5cf6',
                        borderRadius: '8px'
                      }}
                    />
                  </Sankey>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Treemap + Funnel */}
            <div className="grid grid-cols-2 gap-6">
              {/* Treemap */}
              <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-xl">Category Treemap</h3>
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                      Hierarchical
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Product category distribution by value
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <Treemap
                    data={treemapData}
                    dataKey="size"
                    stroke="#fff"
                    fill="#8b5cf6"
                  >
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                  </Treemap>
                </ResponsiveContainer>
              </Card>

              {/* Funnel Chart */}
              <Card className="p-6 border-violet-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-xl">Order Funnel</h3>
                    <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                      Conversion
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Track orders through each fulfillment stage
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <FunnelChart>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #8b5cf6',
                        borderRadius: '8px'
                      }}
                    />
                    <Funnel dataKey="value" data={funnelData} isAnimationActive>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Gauge + 3D Scatter */}
            <div className="grid grid-cols-2 gap-6">
              {/* Radial Gauge */}
              <Card className="p-6 border-green-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-xl">Performance Gauge</h3>
                    <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      KPI Monitor
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Real-time performance metric tracking
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <RadialBarChart
                    innerRadius="30%"
                    outerRadius="100%"
                    data={gaugeData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarGrid gridType="circle" />
                    <RadialBar
                      background
                      dataKey="value"
                      cornerRadius={10}
                    />
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-4xl fill-slate-900"
                    >
                      87%
                    </text>
                    <text
                      x="50%"
                      y="60%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm fill-slate-600"
                    >
                      Efficiency Score
                    </text>
                  </RadialBarChart>
                </ResponsiveContainer>
              </Card>

              {/* 3D Scatter Plot */}
              <Card className="p-6 border-orange-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-slate-900 text-xl">3D Efficiency Plot</h3>
                    <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      Multi-Dimensional
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Warehouse efficiency across multiple dimensions
                  </p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" name="Throughput" stroke="#64748b" />
                    <YAxis type="number" dataKey="y" name="Volume" stroke="#64748b" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="Capacity" />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #f97316',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Scatter name="Warehouses" data={scatterData} fill="#f97316">
                      {scatterData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.efficiency > 90 ? '#10b981' :
                            entry.efficiency > 80 ? '#f59e0b' :
                            '#ef4444'
                          }
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Real-Time Streaming Chart */}
            <Card className="p-6 border-cyan-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-slate-900 text-2xl">Real-Time Data Stream</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
                      Live Data
                    </Badge>
                  </div>
                </div>
                <p className="text-slate-600">
                  Multiple data streams updating in real-time with smooth animations
                </p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-8">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={streamingData}>
                    <defs>
                      <linearGradient id="stream1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="stream2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="stream3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area type="monotone" dataKey="stream1" stroke="#06b6d4" fill="url(#stream1)" />
                    <Area type="monotone" dataKey="stream2" stroke="#8b5cf6" fill="url(#stream2)" />
                    <Area type="monotone" dataKey="stream3" stroke="#10b981" fill="url(#stream3)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          {/* AUTOMATION TAB */}
          <TabsContent value="automation" className="space-y-6">
            {/* Visual Workflow Builder */}
            <Card className="p-6 border-purple-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-2xl mb-2">Visual Workflow Builder</h3>
                    <p className="text-slate-600">
                      Drag-and-drop automation with real-time execution preview
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {!workflowRunning ? (
                      <Button
                        onClick={() => {
                          setWorkflowRunning(true);
                          setCurrentNodeIndex(0);
                        }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Workflow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setWorkflowRunning(false);
                          setCurrentNodeIndex(-1);
                        }}
                        className="bg-gradient-to-r from-red-600 to-pink-600 text-white"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    )}
                    <Button
                      onClick={() => setCurrentNodeIndex(-1)}
                      variant="outline"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              {/* Workflow Visualization */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8">
                <div className="flex flex-col items-center space-y-6">
                  {workflowNodes.map((node, index) => {
                    const Icon = node.icon;
                    const status = getNodeStatus(index);
                    
                    return (
                      <div key={node.id} className="w-full flex flex-col items-center">
                        <div
                          className={`w-full max-w-md p-6 rounded-xl border-2 transition-all duration-500 ${
                            status === 'running'
                              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200 scale-105'
                              : status === 'success'
                              ? 'border-green-500 bg-green-50'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                status === 'running'
                                  ? 'bg-blue-600 animate-pulse'
                                  : status === 'success'
                                  ? 'bg-green-600'
                                  : 'bg-slate-300'
                              }`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs uppercase tracking-wider text-slate-500">
                                  {node.type}
                                </span>
                                {status === 'running' && (
                                  <Badge className="bg-blue-600 text-white text-xs">
                                    Processing...
                                  </Badge>
                                )}
                                {status === 'success' && (
                                  <Badge className="bg-green-600 text-white text-xs">
                                    ✓ Complete
                                  </Badge>
                                )}
                              </div>
                              <p className="text-slate-900">{node.label}</p>
                            </div>
                          </div>
                        </div>
                        
                        {index < workflowNodes.length - 1 && (
                          <div className="flex items-center justify-center my-3">
                            <ArrowRight
                              className={`w-6 h-6 transition-colors ${
                                status === 'success' ? 'text-green-600' : 'text-slate-300'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* AI-Powered Rules */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 border-blue-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-slate-900 text-xl">Smart Triggers</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    AI-powered event detection and prediction
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Inventory Low', confidence: 98, active: true },
                    { name: 'Demand Spike Predicted', confidence: 87, active: true },
                    { name: 'Supplier Delay Risk', confidence: 73, active: false },
                    { name: 'Quality Issue Pattern', confidence: 91, active: true }
                  ].map((trigger) => (
                    <div
                      key={trigger.name}
                      className={`p-4 rounded-lg border-2 ${
                        trigger.active
                          ? 'border-green-200 bg-green-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-900">{trigger.name}</span>
                        <Badge
                          className={
                            trigger.active
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-300 text-slate-700'
                          }
                        >
                          {trigger.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                            style={{ width: `${trigger.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">{trigger.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-purple-200 bg-white/80 backdrop-blur">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-slate-900 text-xl">Automated Actions</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Pre-configured smart responses
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Auto-Reorder Materials', executions: 247 },
                    { name: 'Send Alert Notifications', executions: 892 },
                    { name: 'Update Forecasts', executions: 156 },
                    { name: 'Generate Reports', executions: 423 }
                  ].map((action) => (
                    <div
                      key={action.name}
                      className="p-4 rounded-lg border-2 border-purple-200 bg-purple-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-900 mb-1">{action.name}</p>
                          <p className="text-xs text-slate-600">
                            {action.executions.toLocaleString()} executions
                          </p>
                        </div>
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Workflow Templates */}
            <Card className="p-6 border-green-200 bg-white/80 backdrop-blur">
              <div className="mb-6">
                <h3 className="text-slate-900 text-2xl mb-2">Pre-Built Workflow Templates</h3>
                <p className="text-slate-600">
                  Industry-standard automation templates ready to deploy
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { 
                    name: 'Order-to-Cash', 
                    steps: 12, 
                    icon: '💰',
                    description: 'Complete order fulfillment automation'
                  },
                  { 
                    name: 'Procure-to-Pay', 
                    steps: 9, 
                    icon: '📦',
                    description: 'Supplier ordering and payment workflow'
                  },
                  { 
                    name: 'Quality Control', 
                    steps: 7, 
                    icon: '✅',
                    description: 'Automated QC and approval process'
                  },
                  { 
                    name: 'Inventory Optimization', 
                    steps: 8, 
                    icon: '📊',
                    description: 'Smart reordering and balancing'
                  },
                  { 
                    name: 'Returns Processing', 
                    steps: 6, 
                    icon: '↩️',
                    description: 'Automated RMA and refund handling'
                  },
                  { 
                    name: 'Compliance Reporting', 
                    steps: 10, 
                    icon: '📋',
                    description: 'Automated regulatory reports'
                  }
                ].map((template) => (
                  <div
                    key={template.name}
                    className="p-6 rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <h4 className="text-slate-900 mb-1 group-hover:text-green-600 transition-colors">
                      {template.name}
                    </h4>
                    <p className="text-xs text-slate-600 mb-3">{template.description}</p>
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      {template.steps} steps
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}