import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Box, User, DollarSign, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const rawMaterials = [
  { id: 'RM-4521', name: 'Steel Grade A', supplier: 'Global Materials Inc', stock: 1250, unit: 'kg', costPerUnit: 12.50, minStock: 1000 },
  { id: 'RM-4522', name: 'Aluminum Alloy', supplier: 'Pacific Resources Ltd', stock: 890, unit: 'kg', costPerUnit: 18.75, minStock: 500 },
  { id: 'RM-4523', name: 'Polymer Resin', supplier: 'Premier Supply Co', stock: 2340, unit: 'L', costPerUnit: 8.30, minStock: 1500 },
  { id: 'RM-4524', name: 'Copper Wire', supplier: 'Eastern Manufacturing', stock: 450, unit: 'kg', costPerUnit: 22.40, minStock: 800 },
];

export function RawMaterialsView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Raw Materials</h1>
        <p className="text-slate-600 mt-1">Purchasable materials and supplier management</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Box className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Materials</span>
          </div>
          <div className="text-2xl text-slate-900">247</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Suppliers</span>
          </div>
          <div className="text-2xl text-slate-900">42</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Total Value</span>
          </div>
          <div className="text-2xl text-slate-900">$1.2M</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Low Stock Items</span>
          </div>
          <div className="text-2xl text-slate-900">12</div>
        </Card>
      </div>

      <Card className="border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Cost/Unit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rawMaterials.map((material) => {
              const isLowStock = material.stock < material.minStock;
              return (
                <TableRow key={material.id}>
                  <TableCell className="text-slate-900">{material.id}</TableCell>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>
                    {material.stock} {material.unit}
                    {isLowStock && <span className="text-orange-600 ml-2">(Low)</span>}
                  </TableCell>
                  <TableCell>${material.costPerUnit}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      isLowStock 
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }>
                      {isLowStock ? 'Low Stock' : 'In Stock'}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
