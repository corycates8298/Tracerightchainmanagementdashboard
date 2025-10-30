import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, TrendingUp, Activity, Zap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from './charts';

const accuracyData = [
  { epoch: 1, train: 75, validation: 73 },
  { epoch: 5, train: 85, validation: 82 },
  { epoch: 10, train: 92, validation: 89 },
  { epoch: 15, train: 96, validation: 93 },
  { epoch: 20, train: 98, validation: 96 },
];

const featureImportance = [
  { feature: 'Historical Demand', importance: 0.35 },
  { feature: 'Seasonality', importance: 0.25 },
  { feature: 'Lead Time', importance: 0.18 },
  { feature: 'Price Trends', importance: 0.12 },
  { feature: 'External Factors', importance: 0.10 },
];

export function MLIntelligenceView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">ML Intelligence</h1>
          <p className="text-slate-600 mt-1">Model health and performance metrics</p>
        </div>
        <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">
          <Brain className="w-3 h-3 mr-1" />
          Vertex AI
        </Badge>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Model Accuracy</span>
          </div>
          <div className="text-2xl text-slate-900">96.8%</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Validation Loss</span>
          </div>
          <div className="text-2xl text-slate-900">0.042</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Predictions/Day</span>
          </div>
          <div className="text-2xl text-slate-900">12,450</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Training Epochs</span>
          </div>
          <div className="text-2xl text-slate-900">20</div>
        </Card>
      </div>

      {/* Model Status */}
      <Card className="p-6 border-slate-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
          <div>
            <h3 className="text-slate-900 mb-1">Model Status: Healthy</h3>
            <p className="text-sm text-slate-700">
              Last trained: October 24, 2025 | Next scheduled training: October 31, 2025
            </p>
            <p className="text-sm text-slate-700 mt-1">
              Model is performing within expected parameters. No anomalies detected.
            </p>
          </div>
        </div>
      </Card>

      {/* Accuracy Over Training */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Training & Validation Accuracy</h3>
          <p className="text-sm text-slate-600 mt-1">Model performance over epochs</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="epoch" stroke="#64748b" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke="#64748b" domain={[70, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="train" stroke="#8b5cf6" strokeWidth={2} name="Training" />
            <Line type="monotone" dataKey="validation" stroke="#10b981" strokeWidth={2} name="Validation" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Feature Importance */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Feature Importance</h3>
          <p className="text-sm text-slate-600 mt-1">Which features drive predictions</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" stroke="#64748b" domain={[0, 0.4]} />
            <YAxis type="category" dataKey="feature" stroke="#64748b" width={150} />
            <Tooltip />
            <Bar dataKey="importance" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
