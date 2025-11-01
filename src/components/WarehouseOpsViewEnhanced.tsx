import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Package, MapPin, Calendar, CheckCircle2, AlertTriangle, Eye, TrendingUp, TrendingDown, ArrowRightLeft, Boxes, Users, Warehouse } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface MovementDetail {
  productName: string;
  sku: string;
  quantity: number;
  batchNumber: string;
  fromLocation?: string;
  toLocation?: string;
}

interface WarehouseOperation {
  id: string;
  operationId: string;
  type: 'Receipt' | 'Shipment' | 'Transfer' | 'Adjustment' | 'Picking' | 'Putaway';
  status: 'Completed' | 'In Progress' | 'Pending' | 'On Hold' | 'Cancelled';
  date: string;
  operator: string;
  supervisor: string;
  location: string;
  sourceLocation?: string;
  destinationLocation?: string;
  referenceNumber: string; // PO, SO, or Transfer Order
  products: MovementDetail[];
  totalItems: number;
  totalQuantity: number;
  startTime: string;
  completionTime?: string;
  duration?: string;
  notes?: string;
  verifiedBy?: string;
  verificationTime?: string;
  discrepancies?: string[];
  priority: 'High' | 'Medium' | 'Low';
}

const mockOperations: WarehouseOperation[] = [
  {
    id: 'WO-001',
    operationId: 'WO-2024-1025-001',
    type: 'Putaway',
    status: 'Completed',
    date: '2024-10-25',
    operator: 'Mike Thompson',
    supervisor: 'Jennifer Davis',
    location: 'Warehouse A - Zone 3',
    sourceLocation: 'Receiving Dock A',
    destinationLocation: 'Storage Zone 3, Aisle 5, Rack 12',
    referenceNumber: 'PO-2024-5521',
    products: [
      {
        productName: 'Lavender Dream Soap',
        sku: 'LDS-001',
        quantity: 1000,
        batchNumber: 'BATCH-7264K',
        fromLocation: 'Receiving Dock A',
        toLocation: 'Zone 3-A5-R12-B3'
      },
      {
        productName: 'Vanilla Bliss Soap',
        sku: 'VBS-002',
        quantity: 800,
        batchNumber: 'BATCH-7265K',
        fromLocation: 'Receiving Dock A',
        toLocation: 'Zone 3-A5-R12-B4'
      }
    ],
    totalItems: 2,
    totalQuantity: 1800,
    startTime: '2024-10-25 09:00 AM',
    completionTime: '2024-10-25 11:30 AM',
    duration: '2h 30m',
    verifiedBy: 'Jennifer Davis',
    verificationTime: '2024-10-25 11:45 AM',
    notes: 'All items verified and stored. Temperature-controlled zone maintained at 20°C.',
    priority: 'High'
  },
  {
    id: 'WO-002',
    operationId: 'WO-2024-1025-002',
    type: 'Picking',
    status: 'Completed',
    date: '2024-10-25',
    operator: 'Sarah Martinez',
    supervisor: 'Jennifer Davis',
    location: 'Warehouse A - Multiple Zones',
    sourceLocation: 'Storage Zones 2-5',
    destinationLocation: 'Packing Station B',
    referenceNumber: 'SO-8472',
    products: [
      {
        productName: 'Lavender Dream Soap',
        sku: 'LDS-001',
        quantity: 50,
        batchNumber: 'BATCH-7264K',
        fromLocation: 'Zone 3-A5-R12-B3',
        toLocation: 'Packing Station B'
      },
      {
        productName: 'Vanilla Bliss Soap',
        sku: 'VBS-002',
        quantity: 50,
        batchNumber: 'BATCH-7265K',
        fromLocation: 'Zone 3-A5-R12-B4',
        toLocation: 'Packing Station B'
      },
      {
        productName: 'Eucalyptus Fresh Soap',
        sku: 'EFS-003',
        quantity: 30,
        batchNumber: 'BATCH-7266K',
        fromLocation: 'Zone 4-A2-R08-B1',
        toLocation: 'Packing Station B'
      }
    ],
    totalItems: 3,
    totalQuantity: 130,
    startTime: '2024-10-25 02:00 PM',
    completionTime: '2024-10-25 02:45 PM',
    duration: '45m',
    verifiedBy: 'Jennifer Davis',
    verificationTime: '2024-10-25 02:50 PM',
    notes: 'Order picked and verified. All batches checked for expiry dates. Staged for shipment.',
    priority: 'High'
  },
  {
    id: 'WO-003',
    operationId: 'WO-2024-1026-001',
    type: 'Transfer',
    status: 'In Progress',
    date: '2024-10-26',
    operator: 'Carlos Rodriguez',
    supervisor: 'Jennifer Davis',
    location: 'Warehouse A to Warehouse B',
    sourceLocation: 'Warehouse A - Zone 2',
    destinationLocation: 'Warehouse B - Zone 1',
    referenceNumber: 'TO-2024-1026',
    products: [
      {
        productName: 'Charcoal Detox Soap',
        sku: 'CDS-004',
        quantity: 500,
        batchNumber: 'BATCH-7263K',
        fromLocation: 'Warehouse A - Zone 2-A3-R05',
        toLocation: 'Warehouse B - Zone 1-A1-R02'
      }
    ],
    totalItems: 1,
    totalQuantity: 500,
    startTime: '2024-10-26 10:00 AM',
    notes: 'Transfer in progress. Items loaded on truck. ETA to Warehouse B: 1:00 PM.',
    priority: 'Medium'
  },
  {
    id: 'WO-004',
    operationId: 'WO-2024-1027-001',
    type: 'Adjustment',
    status: 'Completed',
    date: '2024-10-27',
    operator: 'Emily White',
    supervisor: 'Jennifer Davis',
    location: 'Warehouse A - Zone 4',
    sourceLocation: 'Zone 4-A2-R08-B2',
    referenceNumber: 'ADJ-2024-1027',
    products: [
      {
        productName: 'Rose Garden Luxury Soap',
        sku: 'RGL-005',
        quantity: -5,
        batchNumber: 'BATCH-7267K',
        fromLocation: 'Zone 4-A2-R08-B2'
      }
    ],
    totalItems: 1,
    totalQuantity: -5,
    startTime: '2024-10-27 11:00 AM',
    completionTime: '2024-10-27 11:15 AM',
    duration: '15m',
    verifiedBy: 'Jennifer Davis',
    verificationTime: '2024-10-27 11:20 AM',
    discrepancies: ['Physical count showed 5 units less than system inventory'],
    notes: 'Cycle count adjustment. 5 units missing - possible damage during storage. Investigating.',
    priority: 'High'
  },
  {
    id: 'WO-005',
    operationId: 'WO-2024-1028-001',
    type: 'Receipt',
    status: 'Pending',
    date: '2024-10-28',
    operator: 'David Lee',
    supervisor: 'Jennifer Davis',
    location: 'Receiving Dock B',
    destinationLocation: 'Inspection Area B',
    referenceNumber: 'PO-2024-5622',
    products: [
      {
        productName: 'Peppermint Fresh Soap',
        sku: 'PFS-006',
        quantity: 1500,
        batchNumber: 'BATCH-7268K',
        toLocation: 'Inspection Area B'
      }
    ],
    totalItems: 1,
    totalQuantity: 1500,
    startTime: '2024-10-28 08:00 AM',
    notes: 'Scheduled receipt. Awaiting truck arrival.',
    priority: 'Medium'
  }
];

interface WarehouseOpsViewEnhancedProps {
  onNavigate?: (view: string) => void;
}

export function WarehouseOpsViewEnhanced({ onNavigate }: WarehouseOpsViewEnhancedProps = {}) {
  const [selectedOperation, setSelectedOperation] = useState<WarehouseOperation | null>(null);
  const [filteredData, setFilteredData] = useState<WarehouseOperation[]>(mockOperations);

  const filterOptions: FilterOption[] = [
    {
      id: 'type',
      label: 'Operation Type',
      type: 'select',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'Receipt', label: 'Receipt' },
        { value: 'Shipment', label: 'Shipment' },
        { value: 'Transfer', label: 'Transfer' },
        { value: 'Adjustment', label: 'Adjustment' },
        { value: 'Picking', label: 'Picking' },
        { value: 'Putaway', label: 'Putaway' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Completed', label: 'Completed' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Pending', label: 'Pending' },
        { value: 'On Hold', label: 'On Hold' },
        { value: 'Cancelled', label: 'Cancelled' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'dateRange',
      label: 'Date Range',
      type: 'date-range'
    },
    {
      id: 'search',
      label: 'Search',
      type: 'text',
      placeholder: 'Operation ID, reference, operator...'
    }
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mockOperations];

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(op => op.type === filters.type);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(op => op.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(op =>
        op.operationId.toLowerCase().includes(searchLower) ||
        op.referenceNumber.toLowerCase().includes(searchLower) ||
        op.operator.toLowerCase().includes(searchLower)
      );
    }

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(op => {
        const opDate = new Date(op.date);
        return opDate >= new Date(filters.startDate) && opDate <= new Date(filters.endDate);
      });
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: WarehouseOperation['status']) => {
    const variants = {
      'Completed': 'default',
      'In Progress': 'secondary',
      'Pending': 'outline',
      'On Hold': 'outline',
      'Cancelled': 'destructive'
    };

    const icons = {
      'Completed': CheckCircle2,
      'In Progress': ArrowRightLeft,
      'Pending': AlertTriangle,
      'On Hold': AlertTriangle,
      'Cancelled': AlertTriangle
    };

    const Icon = icons[status];

    return (
      <Badge variant={variants[status] as any} className="gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: WarehouseOperation['type']) => {
    const colors = {
      'Receipt': 'bg-green-100 text-green-700',
      'Shipment': 'bg-blue-100 text-blue-700',
      'Transfer': 'bg-purple-100 text-purple-700',
      'Adjustment': 'bg-orange-100 text-orange-700',
      'Picking': 'bg-cyan-100 text-cyan-700',
      'Putaway': 'bg-indigo-100 text-indigo-700'
    };

    const icons = {
      'Receipt': TrendingUp,
      'Shipment': TrendingDown,
      'Transfer': ArrowRightLeft,
      'Adjustment': AlertTriangle,
      'Picking': Package,
      'Putaway': Boxes
    };

    const Icon = icons[type];

    return (
      <Badge variant="outline" className={`gap-1 ${colors[type]}`}>
        <Icon className="w-3 h-3" />
        {type}
      </Badge>
    );
  };

  const renderOverviewTab = (op: WarehouseOperation) => (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Users className="w-5 h-5" />
          WHO - Personnel
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Operator</p>
            <p>{op.operator}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Supervisor</p>
            <p>{op.supervisor}</p>
          </div>
          {op.verifiedBy && (
            <>
              <div>
                <p className="text-sm text-slate-500">Verified By</p>
                <p>{op.verifiedBy}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Verification Time</p>
                <p>{op.verificationTime}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Package className="w-5 h-5" />
          WHAT - Operation Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Operation ID</p>
            <p>{op.operationId}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Type</p>
            <div className="mt-1">{getTypeBadge(op.type)}</div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Reference Number</p>
            <p>{op.referenceNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <div className="mt-1">{getStatusBadge(op.status)}</div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Items</p>
            <p>{op.totalItems} SKUs</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Quantity</p>
            <p>{Math.abs(op.totalQuantity).toLocaleString()} units</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Calendar className="w-5 h-5" />
          WHEN - Timeline
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Date</p>
            <p>{new Date(op.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Start Time</p>
            <p>{op.startTime}</p>
          </div>
          {op.completionTime && (
            <>
              <div>
                <p className="text-sm text-slate-500">Completion Time</p>
                <p>{op.completionTime}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Duration</p>
                <p className="text-green-600">{op.duration}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <MapPin className="w-5 h-5" />
          WHERE - Locations
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-500">Primary Location</p>
            <p>{op.location}</p>
          </div>
          {op.sourceLocation && (
            <div>
              <p className="text-sm text-slate-500">Source Location</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                {op.sourceLocation}
              </p>
            </div>
          )}
          {op.destinationLocation && (
            <div>
              <p className="text-sm text-slate-500">Destination Location</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                {op.destinationLocation}
              </p>
            </div>
          )}
        </div>
      </div>

      {(op.notes || op.discrepancies) && (
        <div>
          <h3 className="flex items-center gap-2 mb-3 text-purple-700">
            <AlertTriangle className="w-5 h-5" />
            Notes & Discrepancies
          </h3>
          {op.notes && (
            <div className="mb-3">
              <p className="text-sm text-slate-500">Notes</p>
              <p className="text-sm">{op.notes}</p>
            </div>
          )}
          {op.discrepancies && op.discrepancies.length > 0 && (
            <div>
              <p className="text-sm text-slate-500 mb-2">Discrepancies</p>
              <div className="space-y-1">
                {op.discrepancies.map((disc, idx) => (
                  <div key={idx} className="text-sm text-red-600 bg-red-50 p-2 rounded flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    {disc}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderProductsTab = (op: WarehouseOperation) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <Package className="w-5 h-5" />
        Products ({op.products.length})
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Batch Number</TableHead>
            <TableHead>Quantity</TableHead>
            {op.sourceLocation && <TableHead>From Location</TableHead>}
            {op.destinationLocation && <TableHead>To Location</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {op.products.map((product, idx) => (
            <TableRow key={idx}>
              <TableCell>{product.productName}</TableCell>
              <TableCell><code className="text-xs bg-slate-100 px-2 py-1 rounded">{product.sku}</code></TableCell>
              <TableCell><code className="text-xs bg-slate-100 px-2 py-1 rounded">{product.batchNumber}</code></TableCell>
              <TableCell>
                <span className={product.quantity < 0 ? 'text-red-600' : 'text-green-600'}>
                  {product.quantity > 0 ? '+' : ''}{product.quantity.toLocaleString()}
                </span>
              </TableCell>
              {product.fromLocation && <TableCell className="text-sm">{product.fromLocation}</TableCell>}
              {product.toLocation && <TableCell className="text-sm">{product.toLocation}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderTraceabilityTab = (op: WarehouseOperation) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <h3 className="flex items-center gap-2 text-purple-700 mb-4">
          <Warehouse className="w-5 h-5" />
          Operation Traceability
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
            <div className="flex-1">
              <h4>Operation Initiated</h4>
              <p className="text-sm text-slate-600 mt-1">
                Operation ID: {op.operationId} | Type: {op.type}
              </p>
              <p className="text-sm text-slate-600">Started: {op.startTime} by {op.operator}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
            <div className="flex-1">
              <h4>Product Movement</h4>
              <p className="text-sm text-slate-600 mt-1">
                {op.totalItems} SKUs, {Math.abs(op.totalQuantity)} total units
              </p>
              {op.sourceLocation && (
                <p className="text-sm text-slate-600">From: {op.sourceLocation}</p>
              )}
              {op.destinationLocation && (
                <p className="text-sm text-slate-600">To: {op.destinationLocation}</p>
              )}
            </div>
          </div>

          {op.verifiedBy && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
              <div className="flex-1">
                <h4>Verification & Quality Check</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Verified by: {op.verifiedBy}
                </p>
                <p className="text-sm text-slate-600">Time: {op.verificationTime}</p>
                {op.discrepancies && op.discrepancies.length > 0 && (
                  <p className="text-sm text-red-600 mt-1">Discrepancies found: {op.discrepancies.length}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
              {op.verifiedBy ? '4' : '3'}
            </div>
            <div className="flex-1">
              <h4>Current Status</h4>
              <div className="mt-1">{getStatusBadge(op.status)}</div>
              {op.completionTime && (
                <p className="text-sm text-green-600 mt-1">
                  Completed: {op.completionTime} (Duration: {op.duration})
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalTabs = selectedOperation ? [
    { id: 'overview', label: 'Overview', content: renderOverviewTab(selectedOperation) },
    { id: 'products', label: `Products (${selectedOperation.products.length})`, content: renderProductsTab(selectedOperation) },
    { id: 'traceability', label: 'Traceability', content: renderTraceabilityTab(selectedOperation) }
  ] : [];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <BreadcrumbNav
        items={[
          { label: 'Core Logistics' },
          { label: 'Warehouse Operations' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">Warehouse Operations</h1>
              <p className="text-slate-600">Track all warehouse movements and operations</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Warehouse className="w-4 h-4 mr-2" />
              New Operation
            </Button>
          </div>

          <SmartFilter
            options={filterOptions}
            onFilterChange={handleFilterChange}
          />

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operation ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead>Items/Quantity</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((op) => (
                  <TableRow key={op.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-600 hover:text-purple-700"
                        onClick={() => setSelectedOperation(op)}
                      >
                        {op.operationId}
                      </Button>
                    </TableCell>
                    <TableCell>{getTypeBadge(op.type)}</TableCell>
                    <TableCell>{getStatusBadge(op.status)}</TableCell>
                    <TableCell>{new Date(op.date).toLocaleDateString()}</TableCell>
                    <TableCell>{op.operator}</TableCell>
                    <TableCell>
                      {op.totalItems} SKUs / {Math.abs(op.totalQuantity).toLocaleString()} units
                    </TableCell>
                    <TableCell><code className="text-xs bg-slate-100 px-2 py-1 rounded">{op.referenceNumber}</code></TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOperation(op)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-slate-500">Total Operations</p>
              <p className="text-2xl text-purple-600">{mockOperations.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Completed</p>
              <p className="text-2xl text-green-600">{mockOperations.filter(o => o.status === 'Completed').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">In Progress</p>
              <p className="text-2xl text-blue-600">{mockOperations.filter(o => o.status === 'In Progress').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl text-orange-600">{mockOperations.filter(o => o.status === 'Pending').length}</p>
            </Card>
          </div>
        </div>
      </div>

      {selectedOperation && (
        <DetailModal
          isOpen={!!selectedOperation}
          onClose={() => setSelectedOperation(null)}
          title={`Operation: ${selectedOperation.operationId}`}
          subtitle={`${selectedOperation.type} - ${selectedOperation.totalQuantity} units`}
          tabs={modalTabs}
        />
      )}
    </div>
  );
}
