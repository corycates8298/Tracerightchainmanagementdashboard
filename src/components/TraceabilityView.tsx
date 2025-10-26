import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Package, Truck, Factory, CheckCircle2, MapPin } from 'lucide-react';

const traceabilityEvents = [
  {
    id: 1,
    timestamp: '2025-10-25 14:30',
    type: 'Receipt',
    description: 'Inbound receipt IR-3291 inspected and approved',
    location: 'West Coast Warehouse',
    user: 'Sarah Johnson',
    status: 'Completed',
  },
  {
    id: 2,
    timestamp: '2025-10-24 10:15',
    type: 'Production',
    description: 'Added to production batch B-8472',
    location: 'Manufacturing Floor A',
    user: 'John Smith',
    status: 'Completed',
  },
  {
    id: 3,
    timestamp: '2025-10-24 08:00',
    type: 'Transit',
    description: 'Shipped from supplier facility',
    location: 'Global Materials Inc',
    user: 'Automated',
    status: 'Completed',
  },
  {
    id: 4,
    timestamp: '2025-10-20 09:00',
    type: 'Order',
    description: 'Purchase order PO-5830 created',
    location: 'System',
    user: 'Mike Davis',
    status: 'Completed',
  },
];

export function TraceabilityView() {
  const [orderId, setOrderId] = useState('PO-5830');

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Traceability</h1>
        <p className="text-slate-600 mt-1">End-to-end tracking of orders and materials</p>
      </div>

      {/* Search */}
      <Card className="p-6 border-slate-200">
        <div className="max-w-2xl">
          <label className="text-sm text-slate-700 mb-2 block">Enter Order ID or Material ID</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="e.g., PO-5830, SO-8472, RM-4521" 
                className="pl-9"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              Trace
            </Button>
          </div>
        </div>
      </Card>

      {/* Order Summary */}
      <Card className="p-6 border-slate-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-slate-900 text-2xl mb-1">{orderId}</h2>
            <p className="text-slate-600">Purchase Order - Global Materials Inc</p>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Delivered
          </Badge>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-slate-600 mb-1">Order Date</div>
            <div className="text-slate-900">Oct 20, 2025</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Delivery Date</div>
            <div className="text-slate-900">Oct 25, 2025</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Items</div>
            <div className="text-slate-900">256 units</div>
          </div>
          <div>
            <div className="text-sm text-slate-600 mb-1">Total Value</div>
            <div className="text-slate-900">$87,600</div>
          </div>
        </div>
      </Card>

      {/* Event Timeline */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Event Timeline</h3>
          <p className="text-sm text-slate-600 mt-1">Complete traceability log</p>
        </div>

        <div className="space-y-4">
          {traceabilityEvents.map((event, index) => (
            <div key={event.id} className="relative pl-8">
              {/* Timeline Line */}
              {index < traceabilityEvents.length - 1 && (
                <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-slate-200" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  event.type === 'Receipt' ? 'bg-green-100' :
                  event.type === 'Production' ? 'bg-purple-100' :
                  event.type === 'Transit' ? 'bg-blue-100' :
                  'bg-slate-100'
                }`}>
                  {event.type === 'Receipt' && <Package className="w-3 h-3 text-green-600" />}
                  {event.type === 'Production' && <Factory className="w-3 h-3 text-purple-600" />}
                  {event.type === 'Transit' && <Truck className="w-3 h-3 text-blue-600" />}
                  {event.type === 'Order' && <CheckCircle2 className="w-3 h-3 text-slate-600" />}
                </div>
              </div>

              {/* Event Content */}
              <div className="pb-6">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="text-slate-900">{event.description}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span>{event.user}</span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-500 whitespace-nowrap ml-4">{event.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
