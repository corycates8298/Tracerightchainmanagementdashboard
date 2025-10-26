import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Truck, Package, Clock, CheckCircle2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const outboundShipments = [
  { id: 'SO-8472', customer: 'Acme Corp', date: '2025-10-25', items: 145, status: 'Shipped', type: 'SalesOrder' },
  { id: 'SO-8471', customer: 'Global Industries', date: '2025-10-24', items: 89, status: 'Processing', type: 'SalesOrder' },
  { id: 'SO-8470', customer: 'Tech Solutions Ltd', date: '2025-10-23', items: 234, status: 'Delivered', type: 'SalesOrder' },
  { id: 'SO-8469', customer: 'Metro Supplies', date: '2025-10-22', items: 67, status: 'Shipped', type: 'SalesOrder' },
];

export function OutboundShipmentsView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Outbound Shipments</h1>
        <p className="text-slate-600 mt-1">Sales orders and outbound logistics</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Shipments</span>
          </div>
          <div className="text-2xl text-slate-900">3,284</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Processing</span>
          </div>
          <div className="text-2xl text-slate-900">156</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">In Transit</span>
          </div>
          <div className="text-2xl text-slate-900">1,243</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Delivered</span>
          </div>
          <div className="text-2xl text-slate-900">1,885</div>
        </Card>
      </div>

      <Card className="border-slate-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outboundShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="text-slate-900">{shipment.id}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{new Date(shipment.date).toLocaleDateString()}</TableCell>
                <TableCell>{shipment.items}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    shipment.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                    shipment.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }>
                    {shipment.status}
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
