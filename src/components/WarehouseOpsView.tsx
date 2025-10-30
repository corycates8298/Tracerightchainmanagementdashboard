import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Warehouse, Package, AlertTriangle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from './charts';

const warehouseData = [
  { location: 'West Coast', stock: 12450, capacity: 15000, lowStock: 23 },
  { location: 'East Coast', stock: 18200, capacity: 20000, lowStock: 15 },
  { location: 'Midwest', stock: 9800, capacity: 12000, lowStock: 31 },
  { location: 'South', stock: 14500, capacity: 18000, lowStock: 19 },
];

const stockLevels = [
  { name: 'Electronics', current: 2450, min: 1000, max: 3000 },
  { name: 'Raw Materials', current: 5670, min: 4000, max: 8000 },
  { name: 'Finished Goods', current: 3200, min: 2000, max: 5000 },
  { name: 'Packaging', current: 1890, min: 1500, max: 3000 },
];

export function WarehouseOpsView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Warehouse Operations</h1>
        <p className="text-slate-600 mt-1">Real-time stock levels and warehouse management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Warehouse className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Locations</span>
          </div>
          <div className="text-2xl text-slate-900">4</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Total Stock</span>
          </div>
          <div className="text-2xl text-slate-900">54,950</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Low Stock Alerts</span>
          </div>
          <div className="text-2xl text-slate-900">88</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Avg Utilization</span>
          </div>
          <div className="text-2xl text-slate-900">82%</div>
        </Card>
      </div>

      {/* Warehouse Locations */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Warehouse Locations</h3>
          <p className="text-sm text-slate-600 mt-1">Stock and capacity by location</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {warehouseData.map((wh) => (
            <div key={wh.location} className="p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-slate-900">{wh.location}</h4>
                <Badge variant="outline">{Math.round((wh.stock / wh.capacity) * 100)}% Full</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                <div>
                  <div className="text-slate-500">Stock</div>
                  <div className="text-slate-900">{wh.stock.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-500">Capacity</div>
                  <div className="text-slate-900">{wh.capacity.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-slate-500">Low Stock</div>
                  <div className="text-orange-600">{wh.lowStock}</div>
                </div>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  style={{ width: `${(wh.stock / wh.capacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Stock Levels */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Stock Levels by Category</h3>
          <p className="text-sm text-slate-600 mt-1">Current inventory vs min/max thresholds</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockLevels}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="min" fill="#e2e8f0" />
            <Bar dataKey="current" fill="#8b5cf6" />
            <Bar dataKey="max" fill="#c4b5fd" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
