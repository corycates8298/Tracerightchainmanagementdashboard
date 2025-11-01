import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShoppingCart, Calendar, CheckCircle2, AlertTriangle, XCircle, Eye, DollarSign, Package, MapPin, Truck, FileText, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface POLineItem {
  id: string;
  itemName: string;
  sku: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity: number;
  pendingQuantity: number;
  expectedDeliveryDate: string;
  specifications?: string;
  certificationRequired?: string[];
}

interface PaymentTerm {
  termType: string;
  daysNet: number;
  discountPercent?: number;
  discountDays?: number;
}

interface ShipmentTracking {
  carrier: string;
  trackingNumber: string;
  method: string;
  status: string;
  currentLocation?: string;
  estimatedDelivery: string;
  lastUpdate: string;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  status: 'Draft' | 'Approved' | 'Sent' | 'Partially Received' | 'Received' | 'Closed' | 'Cancelled';
  supplier: {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    rating: number;
    paymentTerms: PaymentTerm;
  };
  orderDate: string;
  approvalDate?: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  requestedBy: string;
  approvedBy?: string;
  buyer: string;
  department: string;
  deliveryLocation: string;
  lineItems: POLineItem[];
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  currency: string;
  incoterms: string;
  shipmentTracking?: ShipmentTracking;
  notes?: string;
  termsAndConditions: string;
  attachments?: string[];
  relatedInboundReceipts?: string[];
  priority: 'High' | 'Medium' | 'Low';
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    poNumber: 'PO-2024-5521',
    status: 'Received',
    supplier: {
      id: 'SUP-001',
      name: 'Natural Oils International',
      contactPerson: 'John Anderson',
      email: 'j.anderson@naturaloils.com',
      phone: '+1-555-0123',
      address: '123 Commerce Blvd, Miami, FL 33101',
      rating: 4.8,
      paymentTerms: {
        termType: 'Net 30',
        daysNet: 30,
        discountPercent: 2,
        discountDays: 10
      }
    },
    orderDate: '2024-10-01',
    approvalDate: '2024-10-02',
    expectedDeliveryDate: '2024-10-15',
    actualDeliveryDate: '2024-10-14',
    requestedBy: 'Sarah Johnson - Production Manager',
    approvedBy: 'Michael Brown - Procurement Director',
    buyer: 'Emily Davis',
    department: 'Production',
    deliveryLocation: 'Warehouse A - Receiving Dock',
    lineItems: [
      {
        id: 'LI-001',
        itemName: 'Organic Coconut Oil',
        sku: 'RM-COCO-001',
        description: 'Virgin cold-pressed organic coconut oil - Food/Cosmetic grade',
        quantity: 500,
        unit: 'kg',
        unitPrice: 8.50,
        totalPrice: 4250.00,
        receivedQuantity: 500,
        pendingQuantity: 0,
        expectedDeliveryDate: '2024-10-15',
        certificationRequired: ['USDA Organic', 'FDA Registered', 'Non-GMO']
      },
      {
        id: 'LI-002',
        itemName: 'Shea Butter',
        sku: 'RM-SHEA-001',
        description: 'Unrefined Grade A Shea Butter from Ghana',
        quantity: 300,
        unit: 'kg',
        unitPrice: 12.00,
        totalPrice: 3600.00,
        receivedQuantity: 300,
        pendingQuantity: 0,
        expectedDeliveryDate: '2024-10-15',
        certificationRequired: ['Fair Trade', 'Organic']
      },
      {
        id: 'LI-003',
        itemName: 'Lavender Essential Oil',
        sku: 'RM-LAV-001',
        description: 'Pure Lavandula Angustifolia from Provence, France',
        quantity: 50,
        unit: 'L',
        unitPrice: 85.00,
        totalPrice: 4250.00,
        receivedQuantity: 50,
        pendingQuantity: 0,
        expectedDeliveryDate: '2024-10-15',
        specifications: 'GC/MS tested, Linalool content 25-38%',
        certificationRequired: ['Pure Essential Oil Certificate', 'GC/MS Report']
      }
    ],
    subtotal: 12100.00,
    taxAmount: 968.00,
    shippingCost: 350.00,
    totalAmount: 13418.00,
    currency: 'USD',
    incoterms: 'DDP (Delivered Duty Paid)',
    shipmentTracking: {
      carrier: 'FedEx Freight',
      trackingNumber: 'FX-987654321',
      method: 'Ground Freight',
      status: 'Delivered',
      currentLocation: 'Warehouse A',
      estimatedDelivery: '2024-10-15',
      lastUpdate: '2024-10-14 2:30 PM'
    },
    notes: 'All items received in excellent condition. Temperature-controlled shipping maintained throughout transit.',
    termsAndConditions: 'Standard supplier terms apply. Payment due within 30 days of receipt.',
    attachments: ['PO-2024-5521.pdf', 'COA_Coconut_Oil.pdf', 'COA_Shea_Butter.pdf', 'GCMS_Lavender.pdf'],
    relatedInboundReceipts: ['IR-2024-1014-001'],
    priority: 'High'
  },
  {
    id: 'PO-002',
    poNumber: 'PO-2024-5542',
    status: 'Partially Received',
    supplier: {
      id: 'SUP-003',
      name: 'Packaging Solutions Corp',
      contactPerson: 'Maria Garcia',
      email: 'm.garcia@packagingsolutions.com',
      phone: '+1-555-0456',
      address: '456 Industrial Way, Chicago, IL 60601',
      rating: 4.5,
      paymentTerms: {
        termType: 'Net 45',
        daysNet: 45
      }
    },
    orderDate: '2024-10-18',
    approvalDate: '2024-10-19',
    expectedDeliveryDate: '2024-11-05',
    requestedBy: 'Tom Wilson - Packaging Supervisor',
    approvedBy: 'Michael Brown - Procurement Director',
    buyer: 'James Chen',
    department: 'Packaging',
    deliveryLocation: 'Warehouse B - Materials Storage',
    lineItems: [
      {
        id: 'LI-004',
        itemName: 'Recyclable Soap Boxes (Small)',
        sku: 'PKG-BOX-SM-001',
        description: 'Eco-friendly cardboard boxes with window - 100% recyclable',
        quantity: 5000,
        unit: 'units',
        unitPrice: 0.45,
        totalPrice: 2250.00,
        receivedQuantity: 3000,
        pendingQuantity: 2000,
        expectedDeliveryDate: '2024-11-05',
        specifications: '3.5" x 2.5" x 1.5", FSC certified cardboard'
      },
      {
        id: 'LI-005',
        itemName: 'Shrink Wrap Film',
        sku: 'PKG-WRAP-001',
        description: 'Biodegradable PLA shrink wrap - 20" width',
        quantity: 10,
        unit: 'rolls',
        unitPrice: 125.00,
        totalPrice: 1250.00,
        receivedQuantity: 10,
        pendingQuantity: 0,
        expectedDeliveryDate: '2024-11-05',
        certificationRequired: ['BPI Compostable']
      },
      {
        id: 'LI-006',
        itemName: 'Product Labels',
        sku: 'PKG-LBL-001',
        description: 'Custom printed product labels with QR codes - Waterproof',
        quantity: 10000,
        unit: 'labels',
        unitPrice: 0.12,
        totalPrice: 1200.00,
        receivedQuantity: 0,
        pendingQuantity: 10000,
        expectedDeliveryDate: '2024-11-08',
        specifications: '2" x 3", waterproof adhesive, QR code compatible'
      }
    ],
    subtotal: 4700.00,
    taxAmount: 376.00,
    shippingCost: 150.00,
    totalAmount: 5226.00,
    currency: 'USD',
    incoterms: 'FOB (Free On Board)',
    shipmentTracking: {
      carrier: 'UPS Freight',
      trackingNumber: 'UPS-123456789',
      method: 'Standard Freight',
      status: 'In Transit',
      currentLocation: 'Indianapolis Distribution Center',
      estimatedDelivery: '2024-11-05',
      lastUpdate: '2024-11-01 10:15 AM'
    },
    notes: 'First partial shipment received. Labels delayed due to printing quality issues - supplier providing replacement batch.',
    termsAndConditions: 'Payment due within 45 days. Returns accepted within 30 days for defective items.',
    attachments: ['PO-2024-5542.pdf', 'Label_Design_Proof.pdf'],
    relatedInboundReceipts: ['IR-2024-1029-003'],
    priority: 'Medium'
  },
  {
    id: 'PO-003',
    poNumber: 'PO-2024-5563',
    status: 'Sent',
    supplier: {
      id: 'SUP-005',
      name: 'Chemical Supply Corp',
      contactPerson: 'Robert Kim',
      email: 'r.kim@chemicalsupply.com',
      phone: '+1-555-0789',
      address: '789 Industrial Pkwy, Houston, TX 77002',
      rating: 4.9,
      paymentTerms: {
        termType: 'Net 30',
        daysNet: 30,
        discountPercent: 3,
        discountDays: 15
      }
    },
    orderDate: '2024-10-28',
    approvalDate: '2024-10-29',
    expectedDeliveryDate: '2024-11-12',
    requestedBy: 'Sarah Johnson - Production Manager',
    approvedBy: 'Michael Brown - Procurement Director',
    buyer: 'Emily Davis',
    department: 'Production',
    deliveryLocation: 'Warehouse A - Chemical Storage Area (Secured)',
    lineItems: [
      {
        id: 'LI-007',
        itemName: 'Food Grade Sodium Hydroxide',
        sku: 'RM-NAOH-001',
        description: 'High purity NaOH beads - Food/Cosmetic grade',
        quantity: 200,
        unit: 'kg',
        unitPrice: 3.25,
        totalPrice: 650.00,
        receivedQuantity: 0,
        pendingQuantity: 200,
        expectedDeliveryDate: '2024-11-12',
        specifications: '99% purity minimum, food grade certification',
        certificationRequired: ['Food Grade Certificate', 'SDS Sheet', 'ISO 9001']
      },
      {
        id: 'LI-008',
        itemName: 'Activated Charcoal Powder',
        sku: 'RM-CHAR-001',
        description: 'Food grade activated charcoal - ultra fine powder',
        quantity: 50,
        unit: 'kg',
        unitPrice: 18.50,
        totalPrice: 925.00,
        receivedQuantity: 0,
        pendingQuantity: 50,
        expectedDeliveryDate: '2024-11-12',
        certificationRequired: ['Food Grade', 'COA']
      }
    ],
    subtotal: 1575.00,
    taxAmount: 126.00,
    shippingCost: 95.00,
    totalAmount: 1796.00,
    currency: 'USD',
    incoterms: 'DDP (Delivered Duty Paid)',
    shipmentTracking: {
      carrier: 'Old Dominion Freight',
      trackingNumber: 'OD-567890123',
      method: 'LTL Freight - Hazmat Certified',
      status: 'Processing',
      estimatedDelivery: '2024-11-12',
      lastUpdate: '2024-10-29 3:45 PM'
    },
    notes: 'Hazmat shipping required. Ensure chemical storage area is prepared with proper ventilation and safety equipment.',
    termsAndConditions: 'Hazmat surcharge included. Special handling required per DOT regulations.',
    attachments: ['PO-2024-5563.pdf', 'Hazmat_Documentation.pdf'],
    priority: 'High'
  },
  {
    id: 'PO-004',
    poNumber: 'PO-2024-5501',
    status: 'Cancelled',
    supplier: {
      id: 'SUP-007',
      name: 'Essential Oils Direct',
      contactPerson: 'Lisa Wong',
      email: 'l.wong@essentialoilsdirect.com',
      phone: '+1-555-0234',
      address: '234 Botanical Ave, Portland, OR 97201',
      rating: 3.8,
      paymentTerms: {
        termType: 'Net 30',
        daysNet: 30
      }
    },
    orderDate: '2024-09-15',
    approvalDate: '2024-09-16',
    expectedDeliveryDate: '2024-10-01',
    requestedBy: 'Tom Wilson - Materials Coordinator',
    approvedBy: 'Michael Brown - Procurement Director',
    buyer: 'James Chen',
    department: 'Production',
    deliveryLocation: 'Warehouse A',
    lineItems: [
      {
        id: 'LI-009',
        itemName: 'Tea Tree Essential Oil',
        sku: 'RM-TEA-001',
        description: 'Pure Melaleuca Alternifolia from Australia',
        quantity: 30,
        unit: 'L',
        unitPrice: 65.00,
        totalPrice: 1950.00,
        receivedQuantity: 0,
        pendingQuantity: 0,
        expectedDeliveryDate: '2024-10-01',
        certificationRequired: ['GC/MS Report', 'Pure Essential Oil']
      }
    ],
    subtotal: 1950.00,
    taxAmount: 156.00,
    shippingCost: 75.00,
    totalAmount: 2181.00,
    currency: 'USD',
    incoterms: 'FOB',
    notes: 'Order cancelled due to supplier inability to meet GC/MS purity specifications. Alternative supplier sourced.',
    termsAndConditions: 'Cancellation processed per supplier agreement - no penalties.',
    attachments: ['PO-2024-5501.pdf', 'Cancellation_Notice.pdf'],
    priority: 'Low'
  }
];

export function PurchaseOrdersViewEnhanced() {
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [filteredData, setFilteredData] = useState<PurchaseOrder[]>(mockPurchaseOrders);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Approved', label: 'Approved' },
        { value: 'Sent', label: 'Sent to Supplier' },
        { value: 'Partially Received', label: 'Partially Received' },
        { value: 'Received', label: 'Fully Received' },
        { value: 'Closed', label: 'Closed' },
        { value: 'Cancelled', label: 'Cancelled' }
      ]
    },
    {
      id: 'supplier',
      label: 'Supplier',
      type: 'text',
      placeholder: 'Search by supplier name...'
    },
    {
      id: 'dateFrom',
      label: 'Order Date From',
      type: 'date'
    },
    {
      id: 'dateTo',
      label: 'Order Date To',
      type: 'date'
    },
    {
      id: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'all', label: 'All Priorities' },
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' }
      ]
    }
  ];

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = mockPurchaseOrders;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(po => po.status === filters.status);
    }

    if (filters.supplier) {
      filtered = filtered.filter(po =>
        po.supplier.name.toLowerCase().includes(filters.supplier.toLowerCase()) ||
        po.poNumber.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }

    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(po => po.priority === filters.priority);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(po => new Date(po.orderDate) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
      filtered = filtered.filter(po => new Date(po.orderDate) <= new Date(filters.dateTo));
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Draft': 'bg-slate-100 text-slate-700',
      'Approved': 'bg-blue-100 text-blue-700',
      'Sent': 'bg-purple-100 text-purple-700',
      'Partially Received': 'bg-yellow-100 text-yellow-700',
      'Received': 'bg-green-100 text-green-700',
      'Closed': 'bg-slate-100 text-slate-500',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return <Badge className={styles[status] || 'bg-gray-100'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'Low': 'bg-green-100 text-green-700'
    };
    return <Badge className={styles[priority]}>{priority}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Received':
      case 'Closed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Partially Received':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '#' },
          { label: 'Core Logistics', href: '#' },
          { label: 'Purchase Orders', href: '#', current: true }
        ]}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Purchase Orders</h1>
          <p className="text-slate-600 mt-1">Manage supplier purchase orders and procurement</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Create New PO
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
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((po) => (
                <TableRow key={po.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(po.status)}
                      <span className="font-mono">{po.poNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{po.supplier.name}</div>
                      <div className="text-sm text-slate-500">{po.supplier.contactPerson}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {po.orderDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-slate-700">{po.expectedDeliveryDate}</div>
                    {po.actualDeliveryDate && (
                      <div className="text-xs text-green-600 mt-1">
                        Delivered: {po.actualDeliveryDate}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {po.currency} ${po.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-slate-500">
                      {po.lineItems.length} item{po.lineItems.length !== 1 ? 's' : ''}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(po.status)}</TableCell>
                  <TableCell>{getPriorityBadge(po.priority)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPO(po)}
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
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No purchase orders found matching your filters.</p>
          </div>
        )}
      </Card>

      {selectedPO && (
        <DetailModal
          isOpen={!!selectedPO}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order: ${selectedPO.poNumber}`}
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
                        <div className="font-medium text-slate-900">{selectedPO.supplier.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{selectedPO.supplier.contactPerson}</div>
                        <div className="text-sm text-slate-500">{selectedPO.supplier.email}</div>
                        <div className="text-sm text-slate-500">{selectedPO.supplier.phone}</div>
                        <div className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
                          ⭐ Rating: {selectedPO.supplier.rating}/5.0
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Buyer</div>
                          <div className="text-sm text-slate-900">{selectedPO.buyer}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Requested By</div>
                          <div className="text-sm text-slate-900">{selectedPO.requestedBy}</div>
                        </div>
                        {selectedPO.approvedBy && (
                          <div>
                            <div className="text-xs text-slate-500">Approved By</div>
                            <div className="text-sm text-slate-900">{selectedPO.approvedBy}</div>
                          </div>
                        )}
                        <div>
                          <div className="text-xs text-slate-500">Department</div>
                          <div className="text-sm text-slate-900">{selectedPO.department}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WHAT */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      WHAT - Order Details
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span>{getStatusBadge(selectedPO.status)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Priority:</span>
                        <span>{getPriorityBadge(selectedPO.priority)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Items:</span>
                        <span className="font-medium">{selectedPO.lineItems.length} line items</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Subtotal:</span>
                        <span className="font-medium">${selectedPO.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax:</span>
                        <span className="font-medium">${selectedPO.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shipping:</span>
                        <span className="font-medium">${selectedPO.shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                        <span className="text-slate-900 font-medium">Total Amount:</span>
                        <span className="text-lg font-bold text-purple-600">
                          {selectedPO.currency} ${selectedPO.totalAmount.toFixed(2)}
                        </span>
                      </div>
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
                        <span className="text-slate-600">Order Date:</span>
                        <span className="font-medium">{selectedPO.orderDate}</span>
                      </div>
                      {selectedPO.approvalDate && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Approval Date:</span>
                          <span className="font-medium">{selectedPO.approvalDate}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Expected Delivery:</span>
                        <span className="font-medium">{selectedPO.expectedDeliveryDate}</span>
                      </div>
                      {selectedPO.actualDeliveryDate && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Actual Delivery:</span>
                          <span className="font-medium text-green-600">{selectedPO.actualDeliveryDate}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-600">Payment Terms:</span>
                        <span className="font-medium">{selectedPO.supplier.paymentTerms.termType}</span>
                      </div>
                    </div>
                  </div>

                  {/* WHERE */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      WHERE - Locations
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Supplier Location</div>
                        <div className="text-sm text-slate-900">{selectedPO.supplier.address}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Delivery Location</div>
                        <div className="text-sm text-slate-900">{selectedPO.deliveryLocation}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Incoterms</div>
                        <div className="text-sm font-medium text-slate-900">{selectedPO.incoterms}</div>
                      </div>
                    </div>
                  </div>

                  {/* WHY */}
                  {selectedPO.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-3">WHY/HOW - Notes & Terms</h3>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-sm text-slate-700">{selectedPO.notes}</p>
                      </div>
                      <div className="mt-3 bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Terms & Conditions</div>
                        <p className="text-sm text-slate-700">{selectedPO.termsAndConditions}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            },
            {
              id: 'lineitems',
              label: 'Line Items',
              icon: Package,
              content: (
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">Order Line Items ({selectedPO.lineItems.length})</h3>
                  <div className="space-y-3">
                    {selectedPO.lineItems.map((item) => (
                      <Card key={item.id} className="p-4 border border-slate-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-medium text-slate-900">{item.itemName}</h4>
                                <p className="text-sm text-slate-500 mt-1">SKU: {item.sku}</p>
                                <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                              </div>
                            </div>
                            {item.specifications && (
                              <div className="mt-2 p-2 bg-slate-50 rounded text-xs text-slate-600">
                                <strong>Specifications:</strong> {item.specifications}
                              </div>
                            )}
                            {item.certificationRequired && item.certificationRequired.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {item.certificationRequired.map((cert, idx) => (
                                  <Badge key={idx} className="bg-green-100 text-green-700 text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Ordered:</span>
                              <span className="font-medium">{item.quantity} {item.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Received:</span>
                              <span className="font-medium text-green-600">{item.receivedQuantity} {item.unit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Pending:</span>
                              <span className="font-medium text-orange-600">{item.pendingQuantity} {item.unit}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                              <span className="text-slate-600">Unit Price:</span>
                              <span className="font-medium">${item.unitPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-900 font-medium">Total:</span>
                              <span className="font-bold text-purple-600">${item.totalPrice.toFixed(2)}</span>
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
              id: 'shipping',
              label: 'Shipment Tracking',
              icon: Truck,
              content: (
                <div className="space-y-6">
                  {selectedPO.shipmentTracking ? (
                    <>
                      <div>
                        <h3 className="font-medium text-slate-900 mb-4">Shipment Information</h3>
                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Carrier</div>
                            <div className="font-medium text-slate-900">{selectedPO.shipmentTracking.carrier}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Tracking Number</div>
                            <div className="font-mono text-sm text-slate-900">{selectedPO.shipmentTracking.trackingNumber}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Shipping Method</div>
                            <div className="text-sm text-slate-900">{selectedPO.shipmentTracking.method}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Status</div>
                            <Badge className="bg-blue-100 text-blue-700">{selectedPO.shipmentTracking.status}</Badge>
                          </div>
                          {selectedPO.shipmentTracking.currentLocation && (
                            <div>
                              <div className="text-xs text-slate-500 mb-1">Current Location</div>
                              <div className="text-sm text-slate-900">{selectedPO.shipmentTracking.currentLocation}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-xs text-slate-500 mb-1">Estimated Delivery</div>
                            <div className="text-sm font-medium text-slate-900">{selectedPO.shipmentTracking.estimatedDelivery}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs text-slate-500 mb-1">Last Update</div>
                            <div className="text-sm text-slate-600">{selectedPO.shipmentTracking.lastUpdate}</div>
                          </div>
                        </div>
                      </div>
                      {selectedPO.relatedInboundReceipts && selectedPO.relatedInboundReceipts.length > 0 && (
                        <div>
                          <h3 className="font-medium text-slate-900 mb-3">Related Inbound Receipts</h3>
                          <div className="space-y-2">
                            {selectedPO.relatedInboundReceipts.map((receipt) => (
                              <div key={receipt} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                                  <span className="font-mono text-sm">{receipt}</span>
                                </div>
                                <Button variant="outline" size="sm">View Receipt</Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <Truck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p>No shipment tracking information available yet.</p>
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
