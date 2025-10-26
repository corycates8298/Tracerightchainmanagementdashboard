import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Factory, Calendar, User, Package } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const batches = [
  {
    id: 'B-8472',
    recipe: 'Product A - Standard',
    status: 'Completed',
    startDate: '2025-10-20',
    endDate: '2025-10-24',
    operator: 'John Smith',
    outputQty: 100,
    materialsConsumed: 4,
  },
  {
    id: 'B-8473',
    recipe: 'Product B - Premium',
    status: 'In Progress',
    startDate: '2025-10-23',
    endDate: null,
    operator: 'Sarah Johnson',
    outputQty: 50,
    materialsConsumed: 3,
  },
  {
    id: 'B-8474',
    recipe: 'Product A - Standard',
    status: 'Planned',
    startDate: '2025-10-27',
    endDate: null,
    operator: 'Mike Davis',
    outputQty: 150,
    materialsConsumed: 0,
  },
];

export function BatchesView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Production Batches</h1>
        <p className="text-slate-600 mt-1">Track production runs and material consumption</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Factory className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Batches</span>
          </div>
          <div className="text-2xl text-slate-900">847</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">In Progress</span>
          </div>
          <div className="text-2xl text-slate-900">23</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Completed (Month)</span>
          </div>
          <div className="text-2xl text-slate-900">156</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Active Operators</span>
          </div>
          <div className="text-2xl text-slate-900">12</div>
        </Card>
      </div>

      <Card className="border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Recipe</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Output Qty</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="text-slate-900">{batch.id}</TableCell>
                <TableCell>{batch.recipe}</TableCell>
                <TableCell>{batch.operator}</TableCell>
                <TableCell>{new Date(batch.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{batch.outputQty}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    batch.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                    batch.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }>
                    {batch.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
