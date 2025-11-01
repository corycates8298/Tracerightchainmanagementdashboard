import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Truck, Package, Clock, CheckCircle2, AlertTriangle, MapPin, Eye, ExternalLink, Barcode, Shield, Box, Store } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface ShipmentItem {
  id: string;
  productName: string;
  sku: string;
  batchNumber: string;
  quantity: number;
  lotNumber: string;
  expiryDate: string;
  quarantineStatus: 'Released' | 'Quarantined' | 'Under Review';
  rawMaterials?: string[];
  formula?: string;
  traceabilityStatus: 'Complete' | 'Partial' | 'Missing';
}

interface ShipmentDetail {
  id: string;
  customer: string;
  store?: string;
  storeLocation?: string;
  date: string;
  items: number;
  status: 'Delivered' | 'Shipped' | 'In Transit' | 'Processing' | 'On Hold' | 'Delayed';
  type: string;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  origin: string;
  destination: string;
  route: string[];
  poNumber: string;
  shipmentDate?: string;
  receivedDate?: string;
  inRouteDate?: string;
  products: ShipmentItem[];
  notes?: string;
  priority: 'High' | 'Medium' | 'Low';
}

const mockShipmentDetails: ShipmentDetail[] = [
  {
    id: 'SO-8472',
    customer: 'Acme Corp',
    store: 'Acme Downtown',
    storeLocation: '123 Main St, New York, NY 10001',
    date: '2025-10-25',
    items: 3,
    status: 'Shipped',
    type: 'Sales Order',
    carrier: 'FedEx',
    trackingNumber: 'FDX987654321',
    estimatedDelivery: '2025-10-28',
    origin: 'Warehouse A, Dallas, TX',
    destination: 'Acme Downtown, New York, NY',
    route: ['Dallas, TX', 'Memphis, TN', 'Philadelphia, PA', 'New York, NY'],
    poNumber: 'PO-2024-5521',
    shipmentDate: '2025-10-25 09:30 AM',
    inRouteDate: '2025-10-25 02:15 PM',
    priority: 'High',
    products: [
      {
        id: 'P-001',
        productName: 'Lavender Dream Soap',
        sku: 'LDS-001',
        batchNumber: 'BATCH-7264K',
        quantity: 50,
        lotNumber: 'LOT-A-2024-1025',
        expiryDate: '2026-10-25',
        quarantineStatus: 'Released',
        rawMaterials: ['Coconut Oil', 'Shea Butter', 'Lavender Essential Oil', 'Sodium Hydroxide'],
        formula: 'FORM-LAV-001',
        traceabilityStatus: 'Complete',
      },
      {
        id: 'P-002',
        productName: 'Vanilla Bliss Soap',
        sku: 'VBS-002',
        batchNumber: 'BATCH-7265K',
        quantity: 50,
        lotNumber: 'LOT-B-2024-1025',
        expiryDate: '2026-10-25',
        quarantineStatus: 'Released',
        rawMaterials: ['Coconut Oil', 'Cocoa Butter', 'Vanilla Extract', 'Sodium Hydroxide'],
        formula: 'FORM-VAN-002',
        traceabilityStatus: 'Complete',
      },
      {
        id: 'P-003',
        productName: 'Eucalyptus Fresh Soap',
        sku: 'EFS-003',
        batchNumber: 'BATCH-7266K',
        quantity: 45,
        lotNumber: 'LOT-C-2024-1024',
        expiryDate: '2026-10-24',
        quarantineStatus: 'Released',
        rawMaterials: ['Palm Oil', 'Eucalyptus Oil', 'Peppermint Oil', 'Sodium Hydroxide'],
        formula: 'FORM-EUC-003',
        traceabilityStatus: 'Complete',
      },
    ],
    notes: 'Temperature-controlled shipping required. Expedited delivery requested by customer.',
  },
  {
    id: 'SO-8471',
    customer: 'Global Industries',
    store: 'Global Warehouse #3',
    storeLocation: '456 Oak Ave, Chicago, IL 60601',
    date: '2025-10-24',
    items: 2,
    status: 'Processing',
    type: 'Sales Order',
    carrier: 'UPS',
    trackingNumber: 'UPS123456789',
    estimatedDelivery: '2025-10-29',
    origin: 'Warehouse B, Houston, TX',
    destination: 'Global Warehouse #3, Chicago, IL',
    route: ['Houston, TX', 'St. Louis, MO', 'Chicago, IL'],
    poNumber: 'PO-2024-5522',
    priority: 'Medium',
    products: [
      {
        id: 'P-004',
        productName: 'Citrus Burst Soap',
        sku: 'CBS-004',
        batchNumber: 'BATCH-7267K',
        quantity: 60,
        lotNumber: 'LOT-D-2024-1024',
        expiryDate: '2026-10-24',
        quarantineStatus: 'Under Review',
        rawMaterials: ['Coconut Oil', 'Orange Essential Oil', 'Lemon Extract', 'Sodium Hydroxide'],
        formula: 'FORM-CIT-004',
        traceabilityStatus: 'Partial',
      },
      {
        id: 'P-005',
        productName: 'Rose Garden Soap',
        sku: 'RGS-005',
        batchNumber: 'BATCH-7268K',
        quantity: 29,
        lotNumber: 'LOT-E-2024-1023',
        expiryDate: '2026-10-23',
        quarantineStatus: 'Released',
        rawMaterials: ['Shea Butter', 'Rose Otto Oil', 'Geranium Oil', 'Sodium Hydroxide'],
        formula: 'FORM-ROS-005',
        traceabilityStatus: 'Complete',
      },
    ],
    notes: 'One product (CBS-004) under quality review. Shipment on hold pending approval.',
  },
  {
    id: 'SO-8470',
    customer: 'Tech Solutions Ltd',
    store: 'Tech Solutions HQ',
    storeLocation: '789 Tech Blvd, San Francisco, CA 94102',
    date: '2025-10-23',
    items: 4,
    status: 'Delivered',
    type: 'Sales Order',
    carrier: 'DHL',
    trackingNumber: 'DHL456789123',
    estimatedDelivery: '2025-10-26',
    actualDelivery: '2025-10-26 10:45 AM',
    origin: 'Warehouse A, Dallas, TX',
    destination: 'Tech Solutions HQ, San Francisco, CA',
    route: ['Dallas, TX', 'Phoenix, AZ', 'Los Angeles, CA', 'San Francisco, CA'],
    poNumber: 'PO-2024-5520',
    shipmentDate: '2025-10-23 08:00 AM',
    inRouteDate: '2025-10-23 01:00 PM',
    receivedDate: '2025-10-26 10:45 AM',
    priority: 'Medium',
    products: [
      {
        id: 'P-006',
        productName: 'Ocean Breeze Soap',
        sku: 'OBS-006',
        batchNumber: 'BATCH-7269K',
        quantity: 40,
        lotNumber: 'LOT-F-2024-1023',
        expiryDate: '2026-10-23',
        quarantineStatus: 'Released',
        rawMaterials: ['Coconut Oil', 'Sea Salt', 'Seaweed Extract', 'Sodium Hydroxide'],
        formula: 'FORM-OCE-006',
        traceabilityStatus: 'Complete',
      },
      {
        id: 'P-007',
        productName: 'Mint Chocolate Soap',
        sku: 'MCS-007',
        batchNumber: 'BATCH-7270K',
        quantity: 35,
        lotNumber: 'LOT-G-2024-1022',
        expiryDate: '2026-10-22',
        quarantineStatus: 'Released',
        rawMaterials: ['Cocoa Butter', 'Peppermint Oil', 'Cocoa Powder', 'Sodium Hydroxide'],
        formula: 'FORM-MIN-007',
        traceabilityStatus: 'Complete',
      },
      {
        id: 'P-008',
        productName: 'Honey Oat Soap',
        sku: 'HOS-008',
        batchNumber: 'BATCH-7271K',
        quantity: 45,
        lotNumber: 'LOT-H-2024-1022',
        expiryDate: '2026-10-22',
        quarantineStatus: 'Released',
        rawMaterials: ['Oat Flour', 'Honey', 'Shea Butter', 'Sodium Hydroxide'],
        formula: 'FORM-HON-008',
        traceabilityStatus: 'Complete',
      },
      {
        id: 'P-009',
        productName: 'Charcoal Detox Soap',
        sku: 'CDS-009',
        batchNumber: 'BATCH-7272K',
        quantity: 114,
        lotNumber: 'LOT-I-2024-1021',
        expiryDate: '2026-10-21',
        quarantineStatus: 'Released',
        rawMaterials: ['Activated Charcoal', 'Tea Tree Oil', 'Coconut Oil', 'Sodium Hydroxide'],
        formula: 'FORM-CHA-009',
        traceabilityStatus: 'Complete',
      },
    ],
    notes: 'Successfully delivered. Customer satisfaction rating: 5/5.',
  },
  {
    id: 'SO-8469',
    customer: 'Metro Supplies',
    store: 'Metro Distribution Center',
    storeLocation: '321 Commerce Way, Atlanta, GA 30301',
    date: '2025-10-22',
    items: 1,
    status: 'On Hold',
    type: 'Sales Order',
    carrier: 'USPS',
    trackingNumber: 'USPS789123456',
    estimatedDelivery: '2025-10-30',
    origin: 'Warehouse C, Miami, FL',
    destination: 'Metro Distribution Center, Atlanta, GA',
    route: ['Miami, FL', 'Jacksonville, FL', 'Savannah, GA', 'Atlanta, GA'],
    poNumber: 'PO-2024-5519',
    priority: 'Low',
    products: [
      {
        id: 'P-010',
        productName: 'Sandalwood Serenity Soap',
        sku: 'SSS-010',
        batchNumber: 'BATCH-7273K',
        quantity: 67,
        lotNumber: 'LOT-J-2024-1020',
        expiryDate: '2026-10-20',
        quarantineStatus: 'Quarantined',
        rawMaterials: ['Sandalwood Oil', 'Jojoba Oil', 'Shea Butter', 'Sodium Hydroxide'],
        formula: 'FORM-SAN-010',
        traceabilityStatus: 'Complete',
      },
    ],
    notes: 'SHIPMENT ON HOLD: Lot LOT-J-2024-1020 quarantined due to failed pH test. Awaiting quality approval.',
  },
];

export function OutboundShipmentsViewEnhanced() {
  const [selectedShipment, setSelectedShipment] = useState<ShipmentDetail | null>(null);
  const [filteredShipments, setFilteredShipments] = useState<ShipmentDetail[]>(mockShipmentDetails);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'status',
      icon: <Package className="w-4 h-4" />,
      options: [
        { value: 'Processing', label: 'Processing' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'In Transit', label: 'In Transit' },
        { value: 'Delivered', label: 'Delivered' },
        { value: 'On Hold', label: 'On Hold' },
        { value: 'Delayed', label: 'Delayed' },
      ],
    },
    {
      id: 'carrier',
      label: 'Carrier',
      type: 'select',
      icon: <Truck className="w-4 h-4" />,
      options: [
        { value: 'FedEx', label: 'FedEx' },
        { value: 'UPS', label: 'UPS' },
        { value: 'DHL', label: 'DHL' },
        { value: 'USPS', label: 'USPS' },
      ],
    },
    {
      id: 'priority',
      label: 'Priority',
      type: 'select',
      icon: <AlertTriangle className="w-4 h-4" />,
      options: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
      ],
    },
    {
      id: 'customer',
      label: 'Customer',
      type: 'text',
      icon: <Store className="w-4 h-4" />,
    },
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = mockShipmentDetails;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.id.toLowerCase().includes(search) ||
          s.customer.toLowerCase().includes(search) ||
          s.trackingNumber.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      filtered = filtered.filter((s) => s.status === filters.status);
    }

    if (filters.carrier) {
      filtered = filtered.filter((s) => s.carrier === filters.carrier);
    }

    if (filters.priority) {
      filtered = filtered.filter((s) => s.priority === filters.priority);
    }

    if (filters.customer) {
      const customer = filters.customer.toLowerCase();
      filtered = filtered.filter((s) => s.customer.toLowerCase().includes(customer));
    }

    setFilteredShipments(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Shipped':
      case 'In Transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'On Hold':
      case 'Delayed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getQuarantineColor = (status: string) => {
    switch (status) {
      case 'Released':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Quarantined':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Under Review':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTraceabilityColor = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Partial':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Missing':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Calculate stats
  const stats = {
    total: mockShipmentDetails.length,
    processing: mockShipmentDetails.filter((s) => s.status === 'Processing').length,
    inTransit: mockShipmentDetails.filter((s) => s.status === 'In Transit' || s.status === 'Shipped').length,
    delivered: mockShipmentDetails.filter((s) => s.status === 'Delivered').length,
    onHold: mockShipmentDetails.filter((s) => s.status === 'On Hold').length,
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav />

      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-slate-900">Outbound Shipments</h1>
          <p className="text-slate-600 mt-1">Complete order lifecycle from warehouse to customer</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-violet-600" />
              <span className="text-sm text-slate-600">Total Orders</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.total}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-slate-600">Processing</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.processing}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">In Transit</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.inTransit}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Delivered</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.delivered}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-slate-600">On Hold</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.onHold}</div>
          </Card>
        </div>

        {/* Smart Filters */}
        <SmartFilter
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          placeholder="Search by Order ID, Customer, or Tracking Number..."
        />

        {/* Shipments Table */}
        <Card className="border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer / Store</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Carrier</TableHead>
                <TableHead>Route Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-slate-50 cursor-pointer">
                  <TableCell className="text-slate-900 font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{shipment.customer}</div>
                      {shipment.store && (
                        <div className="text-sm text-slate-500">{shipment.store}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(shipment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{shipment.items} products</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" />
                      {shipment.carrier}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      {shipment.shipmentDate && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-3 h-3" />
                          Sent
                        </div>
                      )}
                      {shipment.inRouteDate && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Truck className="w-3 h-3" />
                          In Route
                        </div>
                      )}
                      {shipment.receivedDate && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-3 h-3" />
                          Received
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        shipment.priority === 'High'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : shipment.priority === 'Medium'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }
                    >
                      {shipment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setSelectedShipment(shipment)}
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Detail Modal */}
      {selectedShipment && (
        <DetailModal
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipment(null)}
          title={`Order ${selectedShipment.id}`}
          subtitle={`${selectedShipment.customer} - ${selectedShipment.store || 'N/A'}`}
          badge={
            <Badge variant="outline" className={getStatusColor(selectedShipment.status)}>
              {selectedShipment.status}
            </Badge>
          }
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: (
                <div className="space-y-6">
                  {/* Alert for On Hold status */}
                  {selectedShipment.status === 'On Hold' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <div className="font-semibold text-red-900">Shipment On Hold</div>
                          <div className="text-sm text-red-700 mt-1">
                            {selectedShipment.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Shipment Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Order Date</div>
                          <div className="text-sm text-slate-900">{new Date(selectedShipment.date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">PO Number</div>
                          <div className="text-sm text-slate-900">{selectedShipment.poNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Carrier</div>
                          <div className="flex items-center gap-2 text-sm text-slate-900">
                            <Truck className="w-4 h-4 text-slate-400" />
                            {selectedShipment.carrier}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Tracking Number</div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-slate-900 font-mono">{selectedShipment.trackingNumber}</div>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Priority</div>
                          <Badge
                            variant="outline"
                            className={
                              selectedShipment.priority === 'High'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : selectedShipment.priority === 'Medium'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }
                          >
                            {selectedShipment.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3">Delivery Information</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Origin</div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                            <div className="text-sm text-slate-900">{selectedShipment.origin}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Destination</div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-red-600 mt-0.5" />
                            <div>
                              <div className="text-sm text-slate-900">{selectedShipment.destination}</div>
                              {selectedShipment.storeLocation && (
                                <div className="text-xs text-slate-500 mt-1">{selectedShipment.storeLocation}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Estimated Delivery</div>
                          <div className="text-sm text-slate-900">{new Date(selectedShipment.estimatedDelivery).toLocaleDateString()}</div>
                        </div>
                        {selectedShipment.actualDelivery && (
                          <div>
                            <div className="text-xs text-slate-500">Actual Delivery</div>
                            <div className="text-sm text-green-700 font-medium">{selectedShipment.actualDelivery}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Route Timeline */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Route Timeline</h3>
                    <div className="relative">
                      {selectedShipment.route.map((location, index) => (
                        <div key={index} className="flex items-start gap-3 pb-4 last:pb-0">
                          <div className="relative">
                            <div className={`w-3 h-3 rounded-full border-2 ${
                              index === 0 ? 'bg-green-500 border-green-500' :
                              index === selectedShipment.route.length - 1 && selectedShipment.actualDelivery ? 'bg-green-500 border-green-500' :
                              index < selectedShipment.route.length / 2 ? 'bg-blue-500 border-blue-500' :
                              'bg-slate-300 border-slate-300'
                            }`} />
                            {index < selectedShipment.route.length - 1 && (
                              <div className="absolute top-3 left-1.5 w-0.5 h-8 bg-slate-300" />
                            )}
                          </div>
                          <div className="flex-1 pt-0">
                            <div className="text-sm text-slate-900">{location}</div>
                            {index === 0 && selectedShipment.shipmentDate && (
                              <div className="text-xs text-slate-500">{selectedShipment.shipmentDate}</div>
                            )}
                            {index === selectedShipment.route.length - 1 && selectedShipment.receivedDate && (
                              <div className="text-xs text-green-600">{selectedShipment.receivedDate}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedShipment.notes && selectedShipment.status !== 'On Hold' && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-900">{selectedShipment.notes}</div>
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: 'products',
              label: `Products (${selectedShipment.products.length})`,
              content: (
                <div className="space-y-4">
                  {selectedShipment.products.map((product) => (
                    <Card key={product.id} className="p-4 border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{product.productName}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                            <span>SKU: {product.sku}</span>
                            <span>•</span>
                            <span>Qty: {product.quantity}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={getQuarantineColor(product.quarantineStatus)}>
                          <Shield className="w-3 h-3 mr-1" />
                          {product.quarantineStatus}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-slate-500">Batch Number</div>
                          <div className="text-sm text-slate-900 font-mono">{product.batchNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Lot Number</div>
                          <div className="text-sm text-slate-900 font-mono">{product.lotNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Expiry Date</div>
                          <div className="text-sm text-slate-900">{new Date(product.expiryDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {product.formula && (
                        <div className="mb-3">
                          <div className="text-xs text-slate-500">Formula</div>
                          <div className="text-sm text-slate-900 font-mono">{product.formula}</div>
                        </div>
                      )}

                      {product.rawMaterials && product.rawMaterials.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-slate-500 mb-2">Raw Materials</div>
                          <div className="flex flex-wrap gap-2">
                            {product.rawMaterials.map((material, idx) => (
                              <Badge key={idx} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <Badge variant="outline" className={getTraceabilityColor(product.traceabilityStatus)}>
                          <Barcode className="w-3 h-3 mr-1" />
                          Traceability: {product.traceabilityStatus}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Full Trace
                        </Button>
                      </div>

                      {product.quarantineStatus === 'Quarantined' && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                            <div className="text-sm text-red-900">
                              <strong>Quarantined:</strong> This lot cannot ship until quality approval is received.
                            </div>
                          </div>
                        </div>
                      )}

                      {product.quarantineStatus === 'Under Review' && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                            <div className="text-sm text-yellow-900">
                              <strong>Under Review:</strong> Quality control review in progress. Shipment pending approval.
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              id: 'traceability',
              label: 'Traceability',
              content: (
                <div className="space-y-6">
                  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Barcode className="w-5 h-5 text-violet-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-violet-900">Complete Product Lifecycle</div>
                        <div className="text-sm text-violet-700 mt-1">
                          Full traceability from raw materials to customer delivery
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Product Journey</h3>
                    <div className="space-y-4">
                      {selectedShipment.products.map((product) => (
                        <Card key={product.id} className="p-4 border-slate-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-slate-900">{product.productName}</h4>
                            <Badge variant="outline" className={getTraceabilityColor(product.traceabilityStatus)}>
                              {product.traceabilityStatus}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <Box className="w-4 h-4 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">Raw Materials Sourced</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {product.rawMaterials?.join(', ')}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Package className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">Production Batch</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  Batch: {product.batchNumber} | Lot: {product.lotNumber}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">Quality Approved & Released</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  Status: {product.quarantineStatus} | Expires: {new Date(product.expiryDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-4 h-4 text-orange-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">Shipped to Customer</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {selectedShipment.carrier} | {selectedShipment.trackingNumber}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                                <Store className="w-4 h-4 text-violet-600" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">End Use Location</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {selectedShipment.store || selectedShipment.customer} | {selectedShipment.storeLocation}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200">
                            <Button variant="outline" size="sm" className="w-full">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Complete Traceability Report
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          actions={
            <>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Track Shipment
              </Button>
            </>
          }
        />
      )}
    </div>
  );
}
