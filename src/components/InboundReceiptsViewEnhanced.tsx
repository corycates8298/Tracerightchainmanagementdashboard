import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PackageCheck, Calendar, CheckCircle2, AlertTriangle, XCircle, Eye, FileText, Package, Users, MapPin, Truck, Scale } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface ReceivedItem {
  id: string;
  itemName: string;
  sku: string;
  poLineItemId: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unit: string;
  lotNumber: string;
  expiryDate?: string;
  condition: 'Acceptable' | 'Damaged' | 'Rejected';
  storageLocation: string;
  qualityCheckStatus: 'Passed' | 'Failed' | 'Pending';
  notes?: string;
}

interface QualityInspection {
  inspectionId: string;
  inspector: string;
  inspectionDate: string;
  inspectionTime: string;
  parameters: {
    parameter: string;
    expected: string;
    actual: string;
    status: 'Pass' | 'Fail' | 'Warning';
  }[];
  overallResult: 'Approved' | 'Rejected' | 'Conditional';
  comments?: string;
  certifications?: string[];
}

interface InboundReceipt {
  id: string;
  receiptNumber: string;
  status: 'Completed' | 'Partial' | 'In Progress' | 'On Hold' | 'Cancelled';
  poNumber: string;
  supplier: {
    id: string;
    name: string;
    contactPerson: string;
  };
  receiptDate: string;
  receiptTime: string;
  receivedBy: string;
  verifiedBy?: string;
  carrier: string;
  trackingNumber: string;
  deliveryMethod: string;
  receivedItems: ReceivedItem[];
  totalItemsOrdered: number;
  totalItemsReceived: number;
  discrepancies: {
    type: string;
    description: string;
    severity: 'High' | 'Medium' | 'Low';
    resolution?: string;
  }[];
  qualityInspection?: QualityInspection;
  packagingCondition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Damaged';
  temperatureOnArrival?: string;
  storageZone: string;
  putawayCompleted: boolean;
  putawayDate?: string;
  documentsReceived: string[];
  notes?: string;
  photos?: string[];
}

const mockInboundReceipts: InboundReceipt[] = [
  {
    id: 'IR-001',
    receiptNumber: 'IR-2024-1014-001',
    status: 'Completed',
    poNumber: 'PO-2024-5521',
    supplier: {
      id: 'SUP-001',
      name: 'Natural Oils International',
      contactPerson: 'John Anderson'
    },
    receiptDate: '2024-10-14',
    receiptTime: '2:30 PM',
    receivedBy: 'Mike Thompson - Receiving Supervisor',
    verifiedBy: 'Jennifer Davis - Warehouse Manager',
    carrier: 'FedEx Freight',
    trackingNumber: 'FX-987654321',
    deliveryMethod: 'Temperature-Controlled Truck',
    receivedItems: [
      {
        id: 'RI-001',
        itemName: 'Organic Coconut Oil',
        sku: 'RM-COCO-001',
        poLineItemId: 'LI-001',
        orderedQuantity: 500,
        receivedQuantity: 500,
        unit: 'kg',
        lotNumber: 'LOT-CO-2024-1015',
        expiryDate: '2026-10-15',
        condition: 'Acceptable',
        storageLocation: 'Zone 3-A5-R12-B3',
        qualityCheckStatus: 'Passed',
        notes: 'All drums sealed and labeled correctly'
      },
      {
        id: 'RI-002',
        itemName: 'Shea Butter',
        sku: 'RM-SHEA-001',
        poLineItemId: 'LI-002',
        orderedQuantity: 300,
        receivedQuantity: 300,
        unit: 'kg',
        lotNumber: 'LOT-SB-2024-1016',
        expiryDate: '2026-04-16',
        condition: 'Acceptable',
        storageLocation: 'Zone 3-A5-R12-B4',
        qualityCheckStatus: 'Passed'
      },
      {
        id: 'RI-003',
        itemName: 'Lavender Essential Oil',
        sku: 'RM-LAV-001',
        poLineItemId: 'LI-003',
        orderedQuantity: 50,
        receivedQuantity: 50,
        unit: 'L',
        lotNumber: 'LOT-LEO-2024-1017',
        expiryDate: '2027-10-17',
        condition: 'Acceptable',
        storageLocation: 'Zone 2-A3-R8-B1',
        qualityCheckStatus: 'Passed',
        notes: 'GC/MS certificate verified and filed'
      }
    ],
    totalItemsOrdered: 850,
    totalItemsReceived: 850,
    discrepancies: [],
    qualityInspection: {
      inspectionId: 'QI-2024-1014-001',
      inspector: 'Dr. Emily Chen - Quality Manager',
      inspectionDate: '2024-10-14',
      inspectionTime: '3:00 PM',
      parameters: [
        {
          parameter: 'Temperature During Transit',
          expected: '15-25°C',
          actual: '18°C',
          status: 'Pass'
        },
        {
          parameter: 'Packaging Integrity',
          expected: 'Sealed, undamaged',
          actual: 'All seals intact',
          status: 'Pass'
        },
        {
          parameter: 'Label Compliance',
          expected: 'All required info present',
          actual: 'Compliant',
          status: 'Pass'
        },
        {
          parameter: 'Documentation',
          expected: 'COA, MSDS, Certifications',
          actual: 'All present',
          status: 'Pass'
        }
      ],
      overallResult: 'Approved',
      comments: 'All materials meet specifications. Certificates on file. Approved for use in production.',
      certifications: ['USDA Organic Certificate', 'Fair Trade Certificate', 'GC/MS Report - Lavender', 'Non-GMO Declaration']
    },
    packagingCondition: 'Excellent',
    temperatureOnArrival: '18°C',
    storageZone: 'Temperature-Controlled Zone A',
    putawayCompleted: true,
    putawayDate: '2024-10-14',
    documentsReceived: ['Packing Slip', 'COA - Coconut Oil', 'COA - Shea Butter', 'GC/MS - Lavender Oil', 'MSDS - All Materials'],
    notes: 'Perfect delivery. All items in excellent condition. Driver professional and on time. Temperature log reviewed and acceptable.',
    photos: ['Delivery_Truck.jpg', 'Pallet_1.jpg', 'Pallet_2.jpg', 'Labels_Verification.jpg']
  },
  {
    id: 'IR-002',
    receiptNumber: 'IR-2024-1029-003',
    status: 'Partial',
    poNumber: 'PO-2024-5542',
    supplier: {
      id: 'SUP-003',
      name: 'Packaging Solutions Corp',
      contactPerson: 'Maria Garcia'
    },
    receiptDate: '2024-10-29',
    receiptTime: '10:15 AM',
    receivedBy: 'Tom Wilson - Receiving Clerk',
    verifiedBy: 'Jennifer Davis - Warehouse Manager',
    carrier: 'UPS Freight',
    trackingNumber: 'UPS-123456789',
    deliveryMethod: 'Standard Freight',
    receivedItems: [
      {
        id: 'RI-004',
        itemName: 'Recyclable Soap Boxes (Small)',
        sku: 'PKG-BOX-SM-001',
        poLineItemId: 'LI-004',
        orderedQuantity: 5000,
        receivedQuantity: 3000,
        unit: 'units',
        lotNumber: 'PKG-LOT-2024-10-28',
        condition: 'Acceptable',
        storageLocation: 'Zone 5-Packaging-A1',
        qualityCheckStatus: 'Passed',
        notes: 'Partial shipment - 2000 units still pending'
      },
      {
        id: 'RI-005',
        itemName: 'Shrink Wrap Film',
        sku: 'PKG-WRAP-001',
        poLineItemId: 'LI-005',
        orderedQuantity: 10,
        receivedQuantity: 10,
        unit: 'rolls',
        lotNumber: 'WRAP-LOT-2024-10-27',
        condition: 'Acceptable',
        storageLocation: 'Zone 5-Packaging-A2',
        qualityCheckStatus: 'Passed'
      }
    ],
    totalItemsOrdered: 5010,
    totalItemsReceived: 3010,
    discrepancies: [
      {
        type: 'Short Shipment',
        description: '2000 units of Recyclable Soap Boxes not received - Partial delivery',
        severity: 'Medium',
        resolution: 'Supplier confirmed remaining 2000 boxes will ship next week. Back-ordered items tracked under PO-2024-5542.'
      }
    ],
    qualityInspection: {
      inspectionId: 'QI-2024-1029-002',
      inspector: 'Robert Chen - QA Specialist',
      inspectionDate: '2024-10-29',
      inspectionTime: '11:00 AM',
      parameters: [
        {
          parameter: 'Box Dimensions',
          expected: '3.5" x 2.5" x 1.5"',
          actual: '3.5" x 2.5" x 1.5"',
          status: 'Pass'
        },
        {
          parameter: 'Material Quality',
          expected: 'FSC Certified Cardboard',
          actual: 'FSC Certified - Verified',
          status: 'Pass'
        },
        {
          parameter: 'Window Clarity',
          expected: 'Clear, no scratches',
          actual: 'Good quality',
          status: 'Pass'
        }
      ],
      overallResult: 'Approved',
      comments: 'Partial shipment approved for use. Quality meets specifications.',
      certifications: ['FSC Certificate', 'Recyclable Material Declaration']
    },
    packagingCondition: 'Good',
    storageZone: 'Packaging Materials Zone',
    putawayCompleted: true,
    putawayDate: '2024-10-29',
    documentsReceived: ['Packing Slip', 'Partial Shipment Notice', 'FSC Certificate'],
    notes: 'Partial shipment received. Remaining items expected by November 5th. Quality of received items is acceptable.'
  },
  {
    id: 'IR-003',
    receiptNumber: 'IR-2024-1025-002',
    status: 'On Hold',
    poNumber: 'PO-2024-5498',
    supplier: {
      id: 'SUP-004',
      name: 'Global Fragrance Supplies',
      contactPerson: 'David Lee'
    },
    receiptDate: '2024-10-25',
    receiptTime: '1:45 PM',
    receivedBy: 'Sarah Martinez - Receiving Clerk',
    carrier: 'DHL Express',
    trackingNumber: 'DHL-456789012',
    deliveryMethod: 'Air Freight',
    receivedItems: [
      {
        id: 'RI-006',
        itemName: 'Rose Absolute Essential Oil',
        sku: 'RM-ROSE-001',
        poLineItemId: 'LI-010',
        orderedQuantity: 10,
        receivedQuantity: 10,
        unit: 'L',
        lotNumber: 'ROSE-LOT-2024-10-20',
        expiryDate: '2027-10-20',
        condition: 'Acceptable',
        storageLocation: 'Quarantine-Q1',
        qualityCheckStatus: 'Pending',
        notes: 'Awaiting GC/MS verification from lab'
      }
    ],
    totalItemsOrdered: 10,
    totalItemsReceived: 10,
    discrepancies: [
      {
        type: 'Documentation Missing',
        description: 'GC/MS certificate not included in shipment',
        severity: 'High',
        resolution: 'Supplier contacted. Digital copy requested. Material placed on hold pending certificate.'
      }
    ],
    qualityInspection: {
      inspectionId: 'QI-2024-1025-003',
      inspector: 'Dr. Emily Chen - Quality Manager',
      inspectionDate: '2024-10-25',
      inspectionTime: '2:00 PM',
      parameters: [
        {
          parameter: 'Documentation',
          expected: 'COA + GC/MS Report',
          actual: 'COA only - GC/MS missing',
          status: 'Fail'
        },
        {
          parameter: 'Visual Inspection',
          expected: 'Clear amber liquid',
          actual: 'Acceptable appearance',
          status: 'Pass'
        },
        {
          parameter: 'Packaging',
          expected: 'Amber glass bottles, sealed',
          actual: 'Compliant',
          status: 'Pass'
        }
      ],
      overallResult: 'Conditional',
      comments: 'Material placed in quarantine pending receipt of GC/MS certificate. Visual inspection satisfactory.'
    },
    packagingCondition: 'Good',
    storageZone: 'Quarantine Zone Q1',
    putawayCompleted: true,
    putawayDate: '2024-10-25',
    documentsReceived: ['Packing Slip', 'COA - Partial'],
    notes: 'HOLD: Awaiting GC/MS certificate from supplier. Material quarantined until documentation complete. Supplier has 5 business days to provide certificate.',
    photos: ['Quarantine_Label.jpg']
  },
  {
    id: 'IR-004',
    receiptNumber: 'IR-2024-1018-005',
    status: 'Completed',
    poNumber: 'PO-2024-5487',
    supplier: {
      id: 'SUP-002',
      name: 'Chemical Supply Corp',
      contactPerson: 'Robert Kim'
    },
    receiptDate: '2024-10-18',
    receiptTime: '9:00 AM',
    receivedBy: 'Mike Thompson - Hazmat Certified Receiver',
    verifiedBy: 'Jennifer Davis - Warehouse Manager',
    carrier: 'Old Dominion - Hazmat Division',
    trackingNumber: 'OD-789012345',
    deliveryMethod: 'Hazmat Certified Truck',
    receivedItems: [
      {
        id: 'RI-007',
        itemName: 'Food Grade Sodium Hydroxide',
        sku: 'RM-NAOH-001',
        poLineItemId: 'LI-011',
        orderedQuantity: 100,
        receivedQuantity: 100,
        unit: 'kg',
        lotNumber: 'NAOH-LOT-2024-10-15',
        expiryDate: '2029-10-15',
        condition: 'Acceptable',
        storageLocation: 'Chemical-Storage-Secured-B2',
        qualityCheckStatus: 'Passed',
        notes: 'Hazmat protocols followed. All safety equipment used during receipt.'
      }
    ],
    totalItemsOrdered: 100,
    totalItemsReceived: 100,
    discrepancies: [],
    qualityInspection: {
      inspectionId: 'QI-2024-1018-001',
      inspector: 'James Wilson - Chemical Safety Officer',
      inspectionDate: '2024-10-18',
      inspectionTime: '9:30 AM',
      parameters: [
        {
          parameter: 'Container Integrity',
          expected: 'UN-rated drums, sealed',
          actual: 'All drums intact, seals verified',
          status: 'Pass'
        },
        {
          parameter: 'Hazmat Labeling',
          expected: 'DOT compliant labels',
          actual: 'Compliant - Corrosive labels present',
          status: 'Pass'
        },
        {
          parameter: 'Safety Documentation',
          expected: 'MSDS + Emergency Response Guide',
          actual: 'All present',
          status: 'Pass'
        },
        {
          parameter: 'Purity Certification',
          expected: '99% minimum',
          actual: '99.2% per COA',
          status: 'Pass'
        }
      ],
      overallResult: 'Approved',
      comments: 'All hazmat procedures followed. Material meets food grade specifications. Approved for production use.',
      certifications: ['Food Grade Certificate', 'ISO 9001', 'SDS Sheet', 'DOT Hazmat Documentation']
    },
    packagingCondition: 'Excellent',
    temperatureOnArrival: '22°C',
    storageZone: 'Secured Chemical Storage - Climate Controlled',
    putawayCompleted: true,
    putawayDate: '2024-10-18',
    documentsReceived: ['Packing Slip', 'COA', 'MSDS', 'Emergency Response Guide', 'Hazmat Shipping Papers', 'Food Grade Certificate'],
    notes: 'Hazmat delivery completed without incident. All safety protocols observed. Chemical storage area prepared in advance. Temperature and ventilation verified acceptable.',
    photos: ['Hazmat_Delivery.jpg', 'UN_Drums.jpg', 'Storage_Location.jpg']
  }
];

export function InboundReceiptsViewEnhanced() {
  const [selectedReceipt, setSelectedReceipt] = useState<InboundReceipt | null>(null);
  const [filteredData, setFilteredData] = useState<InboundReceipt[]>(mockInboundReceipts);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Partial', label: 'Partial' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'On Hold', label: 'On Hold' },
        { value: 'Cancelled', label: 'Cancelled' }
      ]
    },
    {
      id: 'supplier',
      label: 'Supplier',
      type: 'text',
      placeholder: 'Search by supplier...'
    },
    {
      id: 'dateFrom',
      label: 'Receipt Date From',
      type: 'date'
    },
    {
      id: 'dateTo',
      label: 'Receipt Date To',
      type: 'date'
    },
    {
      id: 'po',
      label: 'PO Number',
      type: 'text',
      placeholder: 'Search by PO number...'
    }
  ];

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = mockInboundReceipts;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(receipt => receipt.status === filters.status);
    }

    if (filters.supplier) {
      filtered = filtered.filter(receipt =>
        receipt.supplier.name.toLowerCase().includes(filters.supplier.toLowerCase()) ||
        receipt.receiptNumber.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }

    if (filters.po) {
      filtered = filtered.filter(receipt =>
        receipt.poNumber.toLowerCase().includes(filters.po.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(receipt => new Date(receipt.receiptDate) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(receipt => new Date(receipt.receiptDate) <= new Date(filters.dateTo));
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Completed': 'bg-green-100 text-green-700',
      'Partial': 'bg-yellow-100 text-yellow-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'On Hold': 'bg-orange-100 text-orange-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return <Badge className={styles[status] || 'bg-gray-100'}>{status}</Badge>;
  };

  const getQualityBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Passed': 'bg-green-100 text-green-700',
      'Failed': 'bg-red-100 text-red-700',
      'Pending': 'bg-yellow-100 text-yellow-700'
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  const getConditionBadge = (condition: string) => {
    const styles: Record<string, string> = {
      'Excellent': 'bg-green-100 text-green-700',
      'Good': 'bg-blue-100 text-blue-700',
      'Fair': 'bg-yellow-100 text-yellow-700',
      'Poor': 'bg-orange-100 text-orange-700',
      'Damaged': 'bg-red-100 text-red-700'
    };
    return <Badge className={styles[condition]}>{condition}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'On Hold':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <PackageCheck className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '#' },
          { label: 'Core Logistics', href: '#' },
          { label: 'Inbound Receipts', href: '#', current: true }
        ]}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Inbound Receipts</h1>
          <p className="text-slate-600 mt-1">Track and verify incoming materials and products</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
          <PackageCheck className="w-4 h-4 mr-2" />
          New Receipt
        </Button>
      </div>

      <SmartFilter
        options={filterOptions}
        onFilterChange={handleFilterChange}
        resultCount={filteredData.length}
      />

      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt #</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>QC Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((receipt) => (
                <TableRow key={receipt.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(receipt.status)}
                      <span className="font-mono">{receipt.receiptNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{receipt.poNumber}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{receipt.supplier.name}</div>
                      <div className="text-sm text-slate-500">{receipt.supplier.contactPerson}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <div>{receipt.receiptDate}</div>
                        <div className="text-xs text-slate-500">{receipt.receiptTime}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">
                        {receipt.totalItemsReceived.toLocaleString()} / {receipt.totalItemsOrdered.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        {receipt.receivedItems.length} line item{receipt.receivedItems.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(receipt.status)}</TableCell>
                  <TableCell>
                    {receipt.qualityInspection ? (
                      <Badge className={
                        receipt.qualityInspection.overallResult === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : receipt.qualityInspection.overallResult === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }>
                        {receipt.qualityInspection.overallResult}
                      </Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-600">Not Inspected</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(receipt)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <PackageCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No inbound receipts found matching your filters.</p>
          </div>
        )}
      </Card>

      {selectedReceipt && (
        <DetailModal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title={`Inbound Receipt: ${selectedReceipt.receiptNumber}`}
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              icon: FileText,
              content: (
                <div className="space-y-6">
                  {/* WHO */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      WHO - People & Organizations
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Supplier</div>
                        <div className="font-medium text-slate-900">{selectedReceipt.supplier.name}</div>
                        <div className="text-sm text-slate-600">{selectedReceipt.supplier.contactPerson}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Received By</div>
                        <div className="text-sm text-slate-900">{selectedReceipt.receivedBy}</div>
                        {selectedReceipt.verifiedBy && (
                          <div className="mt-2">
                            <div className="text-xs text-slate-500">Verified By</div>
                            <div className="text-sm text-slate-900">{selectedReceipt.verifiedBy}</div>
                          </div>
                        )}
                      </div>
                      {selectedReceipt.qualityInspection && (
                        <div className="col-span-2">
                          <div className="text-xs text-slate-500 mb-1">Quality Inspector</div>
                          <div className="text-sm text-slate-900">{selectedReceipt.qualityInspection.inspector}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WHAT */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      WHAT - Receipt Details
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span>{getStatusBadge(selectedReceipt.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">PO Reference:</span>
                        <span className="font-mono text-sm">{selectedReceipt.poNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Ordered:</span>
                        <span className="font-medium">{selectedReceipt.totalItemsOrdered.toLocaleString()} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Received:</span>
                        <span className="font-medium text-green-600">{selectedReceipt.totalItemsReceived.toLocaleString()} units</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Line Items:</span>
                        <span className="font-medium">{selectedReceipt.receivedItems.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Packaging Condition:</span>
                        <span>{getConditionBadge(selectedReceipt.packagingCondition)}</span>
                      </div>
                      {selectedReceipt.temperatureOnArrival && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Temperature on Arrival:</span>
                          <span className="font-medium">{selectedReceipt.temperatureOnArrival}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WHEN */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      WHEN - Timeline
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Receipt Date:</span>
                        <span className="font-medium">{selectedReceipt.receiptDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Receipt Time:</span>
                        <span className="font-medium">{selectedReceipt.receiptTime}</span>
                      </div>
                      {selectedReceipt.putawayDate && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Putaway Completed:</span>
                          <span className="font-medium text-green-600">{selectedReceipt.putawayDate}</span>
                        </div>
                      )}
                      {selectedReceipt.qualityInspection && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Quality Inspection:</span>
                          <span className="font-medium">
                            {selectedReceipt.qualityInspection.inspectionDate} at {selectedReceipt.qualityInspection.inspectionTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WHERE */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      WHERE - Locations & Storage
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Storage Zone:</span>
                        <span className="font-medium">{selectedReceipt.storageZone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Putaway Status:</span>
                        <span>
                          {selectedReceipt.putawayCompleted ? (
                            <Badge className="bg-green-100 text-green-700">Completed</Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WHY - Shipping */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      HOW - Shipping Information
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Carrier:</span>
                        <span className="font-medium">{selectedReceipt.carrier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tracking Number:</span>
                        <span className="font-mono text-sm">{selectedReceipt.trackingNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery Method:</span>
                        <span className="font-medium">{selectedReceipt.deliveryMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedReceipt.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-3">Notes</h3>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-sm text-slate-700">{selectedReceipt.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Discrepancies */}
                  {selectedReceipt.discrepancies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        Discrepancies ({selectedReceipt.discrepancies.length})
                      </h3>
                      <div className="space-y-2">
                        {selectedReceipt.discrepancies.map((disc, idx) => (
                          <div key={idx} className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-medium text-slate-900">{disc.type}</div>
                              <Badge className={
                                disc.severity === 'High' ? 'bg-red-100 text-red-700' :
                                disc.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }>
                                {disc.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-700 mb-2">{disc.description}</p>
                            {disc.resolution && (
                              <div className="text-xs text-green-700 bg-green-50 p-2 rounded mt-2">
                                <strong>Resolution:</strong> {disc.resolution}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            },
            {
              id: 'items',
              label: 'Received Items',
              icon: Package,
              content: (
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">Items Received ({selectedReceipt.receivedItems.length})</h3>
                  <div className="space-y-3">
                    {selectedReceipt.receivedItems.map((item) => (
                      <Card key={item.id} className="p-4 border border-slate-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-slate-900">{item.itemName}</h4>
                                <p className="text-sm text-slate-500 mt-1">SKU: {item.sku}</p>
                                <p className="text-sm text-slate-500">Lot: {item.lotNumber}</p>
                              </div>
                            </div>
                            {item.notes && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-slate-600">
                                {item.notes}
                              </div>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Ordered:</span>
                              <span className="font-medium">{item.orderedQuantity} {item.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Received:</span>
                              <span className="font-medium text-green-600">{item.receivedQuantity} {item.unit}</span>
                            </div>
                            {item.expiryDate && (
                              <div className="flex justify-between">
                                <span className="text-slate-600">Expiry:</span>
                                <span className="text-xs">{item.expiryDate}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-slate-600">Condition:</span>
                              <span>{getConditionBadge(item.condition)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">QC Status:</span>
                              <span>{getQualityBadge(item.qualityCheckStatus)}</span>
                            </div>
                            <div className="pt-2 border-t">
                              <div className="text-xs text-slate-500">Storage Location</div>
                              <div className="font-mono text-xs mt-1">{item.storageLocation}</div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            },
            {
              id: 'quality',
              label: 'Quality Inspection',
              icon: CheckCircle2,
              content: (
                <div className="space-y-6">
                  {selectedReceipt.qualityInspection ? (
                    <>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm text-slate-500">Inspection ID</div>
                            <div className="font-mono text-slate-900">{selectedReceipt.qualityInspection.inspectionId}</div>
                          </div>
                          <Badge className={
                            selectedReceipt.qualityInspection.overallResult === 'Approved'
                              ? 'bg-green-100 text-green-700 text-lg px-4 py-2'
                              : selectedReceipt.qualityInspection.overallResult === 'Rejected'
                              ? 'bg-red-100 text-red-700 text-lg px-4 py-2'
                              : 'bg-yellow-100 text-yellow-700 text-lg px-4 py-2'
                          }>
                            {selectedReceipt.qualityInspection.overallResult}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-xs text-slate-500">Inspector</div>
                            <div className="text-slate-900">{selectedReceipt.qualityInspection.inspector}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Inspection Date/Time</div>
                            <div className="text-slate-900">
                              {selectedReceipt.qualityInspection.inspectionDate} at {selectedReceipt.qualityInspection.inspectionTime}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-slate-900 mb-3">Quality Parameters</h3>
                        <div className="space-y-2">
                          {selectedReceipt.qualityInspection.parameters.map((param, idx) => (
                            <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-slate-900">{param.parameter}</div>
                                <Badge className={
                                  param.status === 'Pass' ? 'bg-green-100 text-green-700' :
                                  param.status === 'Fail' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }>
                                  {param.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <div className="text-xs text-slate-500">Expected</div>
                                  <div className="text-slate-700">{param.expected}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500">Actual</div>
                                  <div className="text-slate-700">{param.actual}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedReceipt.qualityInspection.comments && (
                        <div>
                          <h3 className="font-medium text-slate-900 mb-2">Inspector Comments</h3>
                          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-slate-700">
                            {selectedReceipt.qualityInspection.comments}
                          </div>
                        </div>
                      )}

                      {selectedReceipt.qualityInspection.certifications && selectedReceipt.qualityInspection.certifications.length > 0 && (
                        <div>
                          <h3 className="font-medium text-slate-900 mb-2">Certifications Verified</h3>
                          <div className="flex gap-2 flex-wrap">
                            {selectedReceipt.qualityInspection.certifications.map((cert, idx) => (
                              <Badge key={idx} className="bg-green-100 text-green-700">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Scale className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p>No quality inspection data available.</p>
                    </div>
                  )}
                </div>
              )
            }
          ]}
        />
      )}
    </div>
  );
}
