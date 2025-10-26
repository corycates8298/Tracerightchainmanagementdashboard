import { Card } from './ui/card';
import { BarChart3, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const costAnalysis = [
  { supplier: 'Global Materials', avgCost: 12.50, leadTime: 14 },
  { supplier: 'Premier Supply', avgCost: 15.20, leadTime: 12 },
  { supplier: 'Eastern Mfg', avgCost: 13.80, leadTime: 18 },
  { supplier: 'Pacific Resources', avgCost: 11.90, leadTime: 10 },
];

const riskTrends = [
  { month: 'Jul', riskScore: 15 },
  { month: 'Aug', riskScore: 12 },
  { month: 'Sep', riskScore: 18 },
  { month: 'Oct', riskScore: 10 },
];

export function MaterialsIntelligenceView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Materials Intelligence</h1>
        <p className="text-slate-600 mt-1">Supplier risk, cost analysis, and lead-time trends</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Avg Cost Variance</span>
          </div>
          <div className="text-2xl text-slate-900">-3.2%</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Avg Lead Time</span>
          </div>
          <div className="text-2xl text-slate-900">13.5 days</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">High Risk Suppliers</span>
          </div>
          <div className="text-2xl text-slate-900">2</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Cost Savings</span>
          </div>
          <div className="text-2xl text-slate-900">$48K</div>
        </Card>
      </div>

      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Supplier Cost & Lead Time Analysis</h3>
          <p className="text-sm text-slate-600 mt-1">Performance metrics by supplier</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="supplier" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="avgCost" fill="#8b5cf6" name="Avg Cost ($)" />
            <Bar dataKey="leadTime" fill="#a78bfa" name="Lead Time (days)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Supplier Risk Trend</h3>
          <p className="text-sm text-slate-600 mt-1">Risk score over time</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={riskTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
