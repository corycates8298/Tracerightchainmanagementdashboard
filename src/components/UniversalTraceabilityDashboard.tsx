import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Waves,
  MapPin,
  Factory,
  Truck,
  Store,
  Users,
  Leaf,
  Zap,
  Globe,
  TrendingUp,
  Shield,
  Sparkles,
  Package,
  BarChart3,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface IndustryModule {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  activeProducts: number;
  traceableUnits: number;
  suppliers: number;
  metrics: {
    label: string;
    value: string;
    trend?: string;
  }[];
}

const industryModules: IndustryModule[] = [
  {
    id: 'food-cosmetics',
    name: 'Food & Cosmetics',
    icon: <Leaf className="w-6 h-6" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50 border-green-200',
    activeProducts: 1284,
    traceableUnits: 45621,
    suppliers: 42,
    metrics: [
      { label: 'Ingredient Traceability', value: '99.8%', trend: '+2.1%' },
      { label: 'Batch Compliance', value: '100%', trend: '0%' },
      { label: 'Organic Certified', value: '87%', trend: '+5%' },
      { label: 'Avg. Shelf Life', value: '11 months', trend: '-' },
    ],
  },
  {
    id: 'apparel',
    name: 'Apparel & Textiles',
    icon: <Users className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    activeProducts: 892,
    traceableUnits: 32145,
    suppliers: 28,
    metrics: [
      { label: 'Material Sourcing', value: '95%', trend: '+3%' },
      { label: 'Ethical Labor', value: '100%', trend: '0%' },
      { label: 'Sustainable Fabrics', value: '78%', trend: '+12%' },
      { label: 'Carbon Per Unit', value: '4.2 kg', trend: '-8%' },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <Zap className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200',
    activeProducts: 567,
    traceableUnits: 18934,
    suppliers: 35,
    metrics: [
      { label: 'Component Tracking', value: '98%', trend: '+1.5%' },
      { label: 'Conflict-Free Minerals', value: '100%', trend: '0%' },
      { label: 'RoHS Compliant', value: '100%', trend: '0%' },
      { label: 'Recycling Rate', value: '45%', trend: '+6%' },
    ],
  },
  {
    id: 'pharma',
    name: 'Pharmaceutical',
    icon: <Shield className="w-6 h-6" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200',
    activeProducts: 423,
    traceableUnits: 124567,
    suppliers: 18,
    metrics: [
      { label: 'Serial Tracking', value: '100%', trend: '0%' },
      { label: 'Cold Chain Integrity', value: '99.9%', trend: '+0.1%' },
      { label: 'API Traceability', value: '100%', trend: '0%' },
      { label: 'Counterfeit Protection', value: '100%', trend: '0%' },
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: <Truck className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200',
    activeProducts: 2341,
    traceableUnits: 87234,
    suppliers: 156,
    metrics: [
      { label: 'Part Traceability', value: '97%', trend: '+4%' },
      { label: 'Recall Readiness', value: '100%', trend: '0%' },
      { label: 'Supplier Audits', value: '94%', trend: '+2%' },
      { label: 'ESG Compliance', value: '89%', trend: '+7%' },
    ],
  },
];

export function UniversalTraceabilityDashboard() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryModule | null>(null);

  return (
    <div className="p-8 space-y-6">
      {/* Hero Section - River & Ocean Metaphor */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-violet-900 to-purple-900 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Universal Trace Cloud</h1>
              <p className="text-blue-200">Global Traceability Platform</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-300" />
                The River
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                <strong>Traceability</strong> is the river—the clear, continuous flow of
                information from source to customer. It carries transparency, direction, and proof
                of origin through every touchpoint in the supply chain.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-300" />
                The Ocean
              </h2>
              <p className="text-purple-100 text-sm leading-relaxed">
                <strong>Supply Chain</strong> is the ocean—the vast, interconnected ecosystem that
                contains everything. Multiple rivers of traceability feed into it, creating a
                navigable, transparent global network.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-500/20 to-transparent" />
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Industries</span>
          </div>
          <div className="text-2xl text-slate-900">{industryModules.length}</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Active Products</span>
          </div>
          <div className="text-2xl text-slate-900">
            {industryModules.reduce((acc, m) => acc + m.activeProducts, 0).toLocaleString()}
          </div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Traceable Units</span>
          </div>
          <div className="text-2xl text-slate-900">
            {industryModules.reduce((acc, m) => acc + m.traceableUnits, 0).toLocaleString()}
          </div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Global Suppliers</span>
          </div>
          <div className="text-2xl text-slate-900">
            {industryModules.reduce((acc, m) => acc + m.suppliers, 0)}
          </div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-slate-600">Avg Compliance</span>
          </div>
          <div className="text-2xl text-slate-900">98.4%</div>
        </Card>
      </div>

      {/* Industry Modules */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-slate-900">Industry Modules</h2>
          <p className="text-slate-600">Universal platform serving multiple industries globally</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {industryModules.map((module) => (
            <Card
              key={module.id}
              className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${
                selectedIndustry?.id === module.id
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-slate-200'
              }`}
              onClick={() => setSelectedIndustry(module)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center`}>
                  <div className={module.color}>{module.icon}</div>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">{module.name}</h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <div className="text-xs text-slate-500">Products</div>
                  <div className="text-sm font-medium text-slate-900">
                    {module.activeProducts.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Units</div>
                  <div className="text-sm font-medium text-slate-900">
                    {module.traceableUnits.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Suppliers</div>
                  <div className="text-sm font-medium text-slate-900">{module.suppliers}</div>
                </div>
              </div>

              <Button
                variant={selectedIndustry?.id === module.id ? 'default' : 'outline'}
                className="w-full"
                size="sm"
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Industry Details */}
      {selectedIndustry && (
        <Card className="p-6 border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl ${selectedIndustry.bgColor} flex items-center justify-center`}>
                <div className={selectedIndustry.color}>{selectedIndustry.icon}</div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {selectedIndustry.name} Module
                </h3>
                <p className="text-slate-600">Industry-specific traceability metrics</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => setSelectedIndustry(null)}>
              Close
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {selectedIndustry.metrics.map((metric, idx) => (
              <Card key={idx} className="p-4 border-slate-200 bg-white">
                <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-xl font-semibold text-slate-900">{metric.value}</div>
                  {metric.trend && metric.trend !== '-' && (
                    <Badge
                      className={
                        metric.trend.startsWith('+')
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : metric.trend.startsWith('-')
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }
                    >
                      {metric.trend}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Traceability Flow Visualization */}
      <Card className="p-8 border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Universal Traceability Flow
        </h3>

        <div className="relative">
          {/* River Visual */}
          <div className="flex items-center justify-between mb-8">
            {[
              { icon: <MapPin />, label: 'Sourcing', color: 'bg-blue-500' },
              { icon: <Factory />, label: 'Production', color: 'bg-green-500' },
              { icon: <Package />, label: 'Distribution', color: 'bg-yellow-500' },
              { icon: <Truck />, label: 'Delivery', color: 'bg-orange-500' },
              { icon: <Store />, label: 'Customer', color: 'bg-purple-500' },
            ].map((stage, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${stage.color} flex items-center justify-center text-white shadow-lg mb-2`}>
                  {stage.icon}
                </div>
                <div className="text-sm font-medium text-slate-900">{stage.label}</div>
                {idx < 4 && (
                  <div className="absolute top-8 h-1 bg-gradient-to-r from-blue-300 to-purple-300"
                    style={{
                      left: `${(idx * 25) + 12.5}%`,
                      width: '12.5%',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-50 via-violet-50 to-purple-50 rounded-lg border-2 border-dashed border-violet-300">
            <div className="flex items-center gap-3 text-slate-700">
              <Waves className="w-6 h-6 text-violet-600" />
              <div>
                <div className="font-semibold">The River Flows Through Every Stage</div>
                <div className="text-sm text-slate-600">
                  Complete visibility from raw material sourcing to end customer, across all
                  industries
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Ingredient & Component Tracking
          </h3>
          <p className="text-sm text-slate-600">
            Track every raw material, component, and ingredient from source to finished product
            across all industries.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Supplier Certification Management
          </h3>
          <p className="text-sm text-slate-600">
            Auto-track certifications, compliance documents, and audit schedules for global
            suppliers.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Customer-Facing Provenance
          </h3>
          <p className="text-sm text-slate-600">
            QR codes link customers to complete product stories, building trust through
            transparency.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            AI-Powered Analytics
          </h3>
          <p className="text-sm text-slate-600">
            Predictive risk scoring, anomaly detection, and automated compliance reporting.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Global Interoperability
          </h3>
          <p className="text-sm text-slate-600">
            Works with existing ERP, WMS, POS systems. Multi-language, multi-currency,
            multi-regulatory.
          </p>
        </Card>

        <Card className="p-6 border-slate-200">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
            <Waves className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Sustainability Tracking
          </h3>
          <p className="text-sm text-slate-600">
            Measure carbon footprint, water usage, ethical sourcing, and generate ESG reports
            automatically.
          </p>
        </Card>
      </div>
    </div>
  );
}
