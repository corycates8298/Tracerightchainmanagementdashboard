import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { MapPin, Truck, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';

const shipments = [
  {
    id: 'SH-2847',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    lat: 40.7128,
    lng: -74.0060,
    status: 'In Transit',
    progress: 65,
    eta: '2 days',
    driver: 'John Smith',
  },
  {
    id: 'SH-2846',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    lat: 25.7617,
    lng: -80.1918,
    status: 'In Transit',
    progress: 82,
    eta: '1 day',
    driver: 'Sarah Johnson',
  },
  {
    id: 'SH-2845',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    lat: 42.3601,
    lng: -71.0589,
    status: 'In Transit',
    progress: 45,
    eta: '3 days',
    driver: 'Mike Davis',
  },
  {
    id: 'SH-2844',
    origin: 'Houston, TX',
    destination: 'Phoenix, AZ',
    lat: 33.4484,
    lng: -112.0740,
    status: 'In Transit',
    progress: 92,
    eta: '6 hours',
    driver: 'Lisa Anderson',
  },
];

export function LogisticsView() {
  const [selectedShipment, setSelectedShipment] = useState(shipments[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShipments = shipments.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-slate-900 mb-1">Digital Twin - Live Map</h1>
          <p className="text-sm text-slate-600">Real-time shipment tracking</p>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search shipments..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {filteredShipments.map((shipment) => (
              <button
                key={shipment.id}
                onClick={() => setSelectedShipment(shipment)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  selectedShipment.id === shipment.id
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900">{shipment.id}</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {shipment.status}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3 h-3" />
                    {shipment.origin}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 fill-violet-600 text-violet-600" />
                    {shipment.destination}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-900">{shipment.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                    style={{ width: `${shipment.progress}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Total In Transit</span>
            <span className="text-slate-900">{shipments.length} shipments</span>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Mock Google Map - In production, use @react-google-maps/api */}
        <div className="h-full bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(rgba(100, 116, 139, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />

          {/* Map Markers */}
          {shipments.map((shipment, index) => (
            <div
              key={shipment.id}
              className="absolute"
              style={{
                left: `${20 + (index * 15)}%`,
                top: `${30 + (index * 10)}%`,
              }}
            >
              <button
                onClick={() => setSelectedShipment(shipment)}
                className={`group relative ${
                  selectedShipment.id === shipment.id ? 'z-10' : ''
                }`}
              >
                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-75" />
                
                {/* Marker */}
                <div className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedShipment.id === shipment.id
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg scale-110'
                    : 'bg-white border-2 border-violet-500'
                }`}>
                  <Truck className={`w-5 h-5 ${
                    selectedShipment.id === shipment.id ? 'text-white' : 'text-violet-600'
                  }`} />
                </div>

                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
                    {shipment.id} - {shipment.progress}%
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
                  </div>
                </div>
              </button>
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Selected Shipment Detail Card */}
          <div className="absolute bottom-6 left-6 right-6">
            <Card className="p-6 border-slate-200 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-slate-900 text-xl mb-1">{selectedShipment.id}</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {selectedShipment.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">ETA</div>
                  <div className="text-slate-900">{selectedShipment.eta}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Origin</div>
                  <div className="text-slate-900">{selectedShipment.origin}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Destination</div>
                  <div className="text-slate-900">{selectedShipment.destination}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Driver</div>
                  <div className="text-slate-900">{selectedShipment.driver}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-600">Progress</span>
                  <span className="text-slate-900">{selectedShipment.progress}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                    style={{ width: `${selectedShipment.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4">
            <Card className="p-4 border-slate-200">
              <div className="text-xs text-slate-600 mb-2">Map Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-purple-600" />
                  <span className="text-xs text-slate-700">In Transit</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
