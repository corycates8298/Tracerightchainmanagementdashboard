import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Calendar, Target, Sparkles } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const forecastData = [
  { month: 'Jul', actual: 2400, forecast: 2380 },
  { month: 'Aug', actual: 2800, forecast: 2790 },
  { month: 'Sep', actual: 3200, forecast: 3180 },
  { month: 'Oct', actual: 2900, forecast: 2920 },
  { month: 'Nov', actual: null, forecast: 3350 },
  { month: 'Dec', actual: null, forecast: 3680 },
  { month: 'Jan', actual: null, forecast: 3200 },
];

const materialForecast = [
  { material: 'Steel Grade A', current: 1250, recommended: 1680, confidence: 94 },
  { material: 'Aluminum Alloy', current: 890, recommended: 1150, confidence: 92 },
  { material: 'Polymer Resin', current: 2340, recommended: 2890, confidence: 96 },
  { material: 'Copper Wire', current: 450, recommended: 720, confidence: 89 },
];

export function AIForecastingView() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">AI Forecasting</h1>
          <p className="text-slate-600 mt-1">Demand planning and predictive analytics</p>
        </div>
        <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Forecast Accuracy</span>
          </div>
          <div className="text-2xl text-slate-900 mb-1">96.8%</div>
          <div className="text-xs text-green-600">+2.3% vs last month</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Forecast Horizon</span>
          </div>
          <div className="text-2xl text-slate-900">90 days</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Predicted Demand</span>
          </div>
          <div className="text-2xl text-slate-900">+15.3%</div>
        </Card>
      </div>

      {/* AI Insight */}
      <Card className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 border-0 text-white">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <div className="mb-1">AI Forecast Insight</div>
            <p className="text-sm text-violet-100">
              Based on historical patterns and market trends, we predict a 15.3% increase in demand over the next 90 days. 
              Consider increasing inventory levels for Steel Grade A and Polymer Resin by 20-25%.
            </p>
          </div>
        </div>
      </Card>

      {/* Demand Forecast Chart */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Demand Forecast</h3>
          <p className="text-sm text-slate-600 mt-1">Actual vs predicted demand</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="actual" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#colorActual)"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#a78bfa" 
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{ fill: '#a78bfa', r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Material Recommendations */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Material Inventory Recommendations</h3>
          <p className="text-sm text-slate-600 mt-1">AI-recommended stock levels</p>
        </div>
        <div className="space-y-4">
          {materialForecast.map((item) => (
            <div key={item.material} className="p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-900">{item.material}</h4>
                <Badge variant="outline">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {item.confidence}% confidence
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm text-slate-600">Current Stock</div>
                  <div className="text-slate-900">{item.current} units</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Recommended</div>
                  <div className="text-violet-700">{item.recommended} units</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600">Increase Needed</div>
                  <div className="text-green-600">+{item.recommended - item.current} units</div>
                </div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  style={{ width: `${(item.current / item.recommended) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
