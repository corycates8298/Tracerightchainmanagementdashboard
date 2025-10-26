import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Calendar, DollarSign, Package, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const purchaseOrders = [
  {
    id: 'PO-5832',
    supplier: 'Global Materials Inc',
    date: '2025-10-20',
    expectedDelivery: '2025-11-05',
    status: 'Pending',
    items: 125,
    total: 48750,
    type: 'PurchaseOrder',
  },
  {
    id: 'PO-5831',
    supplier: 'Premier Supply Co',
    date: '2025-10-18',
    expectedDelivery: '2025-11-02',
    status: 'In Transit',
    items: 89,
    total: 32450,
    type: 'PurchaseOrder',
  },
  {
    id: 'PO-5830',
    supplier: 'Pacific Resources Ltd',
    date: '2025-10-15',
    expectedDelivery: '2025-10-30',
    status: 'Delivered',
    items: 256,
    total: 87600,
    type: 'PurchaseOrder',
  },
  {
    id: 'PO-5829',
    supplier: 'Eastern Manufacturing',
    date: '2025-10-12',
    expectedDelivery: '2025-10-28',
    status: 'Delivered',
    items: 178,
    total: 54200,
    type: 'PurchaseOrder',
  },
  {
    id: 'PO-5828',
    supplier: 'Global Materials Inc',
    date: '2025-10-10',
    expectedDelivery: '2025-10-26',
    status: 'Cancelled',
    items: 45,
    total: 15800,
    type: 'PurchaseOrder',
  },
];

export function PurchaseOrdersView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPO, setSelectedPO] = useState(purchaseOrders[0]);

  const filteredOrders = purchaseOrders.filter(po =>
    po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'In Transit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-8 space-y-6 flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-slate-900">Purchase Orders</h1>
            <p className="text-slate-600 mt-1">Manage inbound orders and procurement</p>
          </div>
          <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            Create PO
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-violet-600" />
              <span className="text-sm text-slate-600">Total POs</span>
            </div>
            <div className="text-2xl text-slate-900">847</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Pending</span>
            </div>
            <div className="text-2xl text-slate-900">23</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Total Value</span>
            </div>
            <div className="text-2xl text-slate-900">$2.1M</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-slate-600">Suppliers</span>
            </div>
            <div className="text-2xl text-slate-900">42</div>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search purchase orders..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table */}
        <Card className="border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((po) => (
                <TableRow 
                  key={po.id}
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => setSelectedPO(po)}
                >
                  <TableCell className="text-slate-900">{po.id}</TableCell>
                  <TableCell>{po.supplier}</TableCell>
                  <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(po.expectedDelivery).toLocaleDateString()}</TableCell>
                  <TableCell>{po.items}</TableCell>
                  <TableCell>${po.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(po.status)}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
