import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Package, Calendar, CheckCircle2, AlertTriangle, XCircle, Eye, Users, MapPin, Thermometer, Droplet, FlaskConical, FileText, Boxes } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface RawMaterialUsed {
  id: string;
  name: string;
  lotNumber: string;
  quantity: number;
  unit: string;
  supplier: string;
  receivedDate: string;
  expiryDate: string;
  certifications: string[];
}

interface QualityCheck {
  id: string;
  checkType: string;
  parameter: string;
  expectedValue: string;
  actualValue: string;
  status: 'Pass' | 'Fail' | 'Warning';
  checkedBy: string;
  timestamp: string;
}

interface ProductionStep {
  step: number;
  name: string;
  operator: string;
  startTime: string;
  endTime: string;
  temperature?: string;
  humidity?: string;
  equipment: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  notes?: string;
}

interface Batch {
  id: string;
  batchNumber: string;
  productName: string;
  sku: string;
  recipe: string;
  quantity: number;
  unit: string;
  status: 'Released' | 'Quarantined' | 'In Production' | 'Under Review' | 'Rejected';
  productionDate: string;
  expiryDate: string;
  shelfLife: number;
  location: string;
  operator: string;
  supervisor: string;
  shift: string;
  equipmentUsed: string[];
  rawMaterials: RawMaterialUsed[];
  qualityChecks: QualityCheck[];
  productionSteps: ProductionStep[];
  yieldPercentage: number;
  wastePercentage: number;
  packagingDetails: {
    packagingDate: string;
    packageType: string;
    unitsPerPackage: number;
    totalPackages: number;
    packagingLine: string;
  };
  traceabilityCode: string;
  qrCodeGenerated: boolean;
  allocatedTo?: string[];
  quarantineReason?: string;
  releaseDate?: string;
  notes?: string;
}

const mockBatches: Batch[] = [
  {
    id: 'B-001',
    batchNumber: 'BATCH-7264K',
    productName: 'Lavender Dream Soap',
    sku: 'LDS-001',
    recipe: 'RECIPE-LAV-001',
    quantity: 1000,
    unit: 'bars',
    status: 'Released',
    productionDate: '2024-10-20',
    expiryDate: '2026-10-20',
    shelfLife: 730,
    location: 'Production Floor A, Station 3',
    operator: 'John Smith',
    supervisor: 'Sarah Johnson',
    shift: 'Morning (6AM - 2PM)',
    equipmentUsed: ['Mixer-01', 'Mold-Station-03', 'Curing-Rack-A1'],
    rawMaterials: [
      {
        id: 'RM-001',
        name: 'Organic Coconut Oil',
        lotNumber: 'LOT-CO-2024-1015',
        quantity: 250,
        unit: 'kg',
        supplier: 'Natural Oils Inc',
        receivedDate: '2024-10-15',
        expiryDate: '2026-10-15',
        certifications: ['USDA Organic', 'Fair Trade', 'Non-GMO']
      },
      {
        id: 'RM-002',
        name: 'Shea Butter',
        lotNumber: 'LOT-SB-2024-1016',
        quantity: 150,
        unit: 'kg',
        supplier: 'African Butters Co',
        receivedDate: '2024-10-16',
        expiryDate: '2026-04-16',
        certifications: ['Organic', 'Fair Trade']
      },
      {
        id: 'RM-003',
        name: 'Lavender Essential Oil',
        lotNumber: 'LOT-LEO-2024-1017',
        quantity: 25,
        unit: 'L',
        supplier: 'French Aromatics Ltd',
        receivedDate: '2024-10-17',
        expiryDate: '2027-10-17',
        certifications: ['GC/MS Tested', 'Organic', 'Pure Essential Oil']
      },
      {
        id: 'RM-004',
        name: 'Food Grade Sodium Hydroxide',
        lotNumber: 'LOT-SH-2024-1018',
        quantity: 50,
        unit: 'kg',
        supplier: 'Chemical Supply Corp',
        receivedDate: '2024-10-18',
        expiryDate: '2029-10-18',
        certifications: ['Food Grade', 'ISO 9001']
      }
    ],
    qualityChecks: [
      {
        id: 'QC-001',
        checkType: 'Pre-Production',
        parameter: 'Raw Material Verification',
        expectedValue: 'All materials within spec',
        actualValue: 'Verified - All materials approved',
        status: 'Pass',
        checkedBy: 'QA Team - Maria Garcia',
        timestamp: '2024-10-20 06:30 AM'
      },
      {
        id: 'QC-002',
        checkType: 'In-Process',
        parameter: 'pH Level',
        expectedValue: '9.5 - 10.5',
        actualValue: '10.1',
        status: 'Pass',
        checkedBy: 'QA Team - James Wilson',
        timestamp: '2024-10-20 09:15 AM'
      },
      {
        id: 'QC-003',
        checkType: 'In-Process',
        parameter: 'Temperature',
        expectedValue: '38-42°C',
        actualValue: '40°C',
        status: 'Pass',
        checkedBy: 'Production Operator - John Smith',
        timestamp: '2024-10-20 09:20 AM'
      },
      {
        id: 'QC-004',
        checkType: 'Post-Production',
        parameter: 'Hardness Test',
        expectedValue: 'Firm after 48h curing',
        actualValue: 'Firm - Within spec',
        status: 'Pass',
        checkedBy: 'QA Team - Maria Garcia',
        timestamp: '2024-10-22 10:00 AM'
      },
      {
        id: 'QC-005',
        checkType: 'Final Release',
        parameter: 'Visual Inspection',
        expectedValue: 'No defects, uniform color',
        actualValue: 'Passed - Excellent quality',
        status: 'Pass',
        checkedBy: 'QA Supervisor - Robert Chen',
        timestamp: '2024-10-24 02:00 PM'
      }
    ],
    productionSteps: [
      {
        step: 1,
        name: 'Material Preparation',
        operator: 'John Smith',
        startTime: '2024-10-20 07:00 AM',
        endTime: '2024-10-20 07:30 AM',
        equipment: 'Weighing Station-01',
        status: 'Completed',
        notes: 'All materials weighed and verified'
      },
      {
        step: 2,
        name: 'Oil Heating',
        operator: 'John Smith',
        startTime: '2024-10-20 07:30 AM',
        endTime: '2024-10-20 08:15 AM',
        temperature: '40°C',
        equipment: 'Heating Tank-A',
        status: 'Completed'
      },
      {
        step: 3,
        name: 'Lye Solution Preparation',
        operator: 'John Smith',
        startTime: '2024-10-20 08:15 AM',
        endTime: '2024-10-20 08:45 AM',
        temperature: '38°C',
        equipment: 'Mixing Tank-B',
        status: 'Completed',
        notes: 'Lye solution cooled to safe temperature'
      },
      {
        step: 4,
        name: 'Saponification',
        operator: 'John Smith',
        startTime: '2024-10-20 09:00 AM',
        endTime: '2024-10-20 10:30 AM',
        temperature: '40°C',
        equipment: 'Mixer-01',
        status: 'Completed',
        notes: 'Trace achieved at 10:15 AM'
      },
      {
        step: 5,
        name: 'Essential Oil Addition',
        operator: 'John Smith',
        startTime: '2024-10-20 10:30 AM',
        endTime: '2024-10-20 10:45 AM',
        temperature: '38°C',
        equipment: 'Mixer-01',
        status: 'Completed'
      },
      {
        step: 6,
        name: 'Molding',
        operator: 'John Smith',
        startTime: '2024-10-20 10:45 AM',
        endTime: '2024-10-20 12:00 PM',
        equipment: 'Mold-Station-03',
        status: 'Completed',
        notes: '1000 bars molded'
      },
      {
        step: 7,
        name: 'Curing',
        operator: 'Auto',
        startTime: '2024-10-20 12:00 PM',
        endTime: '2024-10-24 12:00 PM',
        temperature: '22°C',
        humidity: '45%',
        equipment: 'Curing-Rack-A1',
        status: 'Completed',
        notes: '96-hour cure cycle completed'
      },
      {
        step: 8,
        name: 'Cutting & Finishing',
        operator: 'Jane Doe',
        startTime: '2024-10-24 01:00 PM',
        endTime: '2024-10-24 03:00 PM',
        equipment: 'Cutting-Station-02',
        status: 'Completed'
      }
    ],
    yieldPercentage: 98.5,
    wastePercentage: 1.5,
    packagingDetails: {
      packagingDate: '2024-10-24',
      packageType: 'Individual wrapper + 12-unit box',
      unitsPerPackage: 12,
      totalPackages: 83,
      packagingLine: 'Packaging Line 2'
    },
    traceabilityCode: 'TRACE-BATCH-7264K-2024',
    qrCodeGenerated: true,
    allocatedTo: ['SO-8472', 'SO-8473', 'SO-8474'],
    releaseDate: '2024-10-24',
    notes: 'Excellent batch quality. Customer feedback: Outstanding aroma and lather.'
  },
  {
    id: 'B-002',
    batchNumber: 'BATCH-7265K',
    productName: 'Vanilla Bliss Soap',
    sku: 'VBS-002',
    recipe: 'RECIPE-VAN-002',
    quantity: 800,
    unit: 'bars',
    status: 'Released',
    productionDate: '2024-10-21',
    expiryDate: '2026-10-21',
    shelfLife: 730,
    location: 'Production Floor A, Station 3',
    operator: 'Jane Doe',
    supervisor: 'Sarah Johnson',
    shift: 'Afternoon (2PM - 10PM)',
    equipmentUsed: ['Mixer-02', 'Mold-Station-04', 'Curing-Rack-A2'],
    rawMaterials: [
      {
        id: 'RM-005',
        name: 'Organic Coconut Oil',
        lotNumber: 'LOT-CO-2024-1015',
        quantity: 200,
        unit: 'kg',
        supplier: 'Natural Oils Inc',
        receivedDate: '2024-10-15',
        expiryDate: '2026-10-15',
        certifications: ['USDA Organic', 'Fair Trade']
      },
      {
        id: 'RM-006',
        name: 'Cocoa Butter',
        lotNumber: 'LOT-CB-2024-1019',
        quantity: 120,
        unit: 'kg',
        supplier: 'Chocolate Supply Co',
        receivedDate: '2024-10-19',
        expiryDate: '2026-10-19',
        certifications: ['Fair Trade', 'Organic']
      },
      {
        id: 'RM-007',
        name: 'Vanilla Extract',
        lotNumber: 'LOT-VE-2024-1020',
        quantity: 15,
        unit: 'L',
        supplier: 'Madagascar Vanilla Ltd',
        receivedDate: '2024-10-20',
        expiryDate: '2027-10-20',
        certifications: ['Pure Extract', 'Fair Trade']
      }
    ],
    qualityChecks: [
      {
        id: 'QC-006',
        checkType: 'Pre-Production',
        parameter: 'Raw Material Verification',
        expectedValue: 'All materials within spec',
        actualValue: 'Verified - All approved',
        status: 'Pass',
        checkedBy: 'QA Team - Maria Garcia',
        timestamp: '2024-10-21 02:30 PM'
      },
      {
        id: 'QC-007',
        checkType: 'Final Release',
        parameter: 'Aroma Test',
        expectedValue: 'Strong vanilla scent',
        actualValue: 'Excellent - Rich vanilla',
        status: 'Pass',
        checkedBy: 'QA Supervisor - Robert Chen',
        timestamp: '2024-10-25 03:00 PM'
      }
    ],
    productionSteps: [
      {
        step: 1,
        name: 'Material Preparation',
        operator: 'Jane Doe',
        startTime: '2024-10-21 02:00 PM',
        endTime: '2024-10-21 02:30 PM',
        equipment: 'Weighing Station-02',
        status: 'Completed'
      },
      {
        step: 2,
        name: 'Saponification',
        operator: 'Jane Doe',
        startTime: '2024-10-21 03:00 PM',
        endTime: '2024-10-21 04:30 PM',
        temperature: '42°C',
        equipment: 'Mixer-02',
        status: 'Completed'
      },
      {
        step: 3,
        name: 'Molding',
        operator: 'Jane Doe',
        startTime: '2024-10-21 04:30 PM',
        endTime: '2024-10-21 06:00 PM',
        equipment: 'Mold-Station-04',
        status: 'Completed'
      }
    ],
    yieldPercentage: 97.0,
    wastePercentage: 3.0,
    packagingDetails: {
      packagingDate: '2024-10-25',
      packageType: 'Individual wrapper + 12-unit box',
      unitsPerPackage: 12,
      totalPackages: 66,
      packagingLine: 'Packaging Line 1'
    },
    traceabilityCode: 'TRACE-BATCH-7265K-2024',
    qrCodeGenerated: true,
    allocatedTo: ['SO-8472', 'SO-8475'],
    releaseDate: '2024-10-25'
  },
  {
    id: 'B-003',
    batchNumber: 'BATCH-7266K',
    productName: 'Eucalyptus Fresh Soap',
    sku: 'EFS-003',
    recipe: 'RECIPE-EUC-003',
    quantity: 1200,
    unit: 'bars',
    status: 'In Production',
    productionDate: '2024-10-30',
    expiryDate: '2026-10-30',
    shelfLife: 730,
    location: 'Production Floor B, Station 1',
    operator: 'Mike Johnson',
    supervisor: 'Sarah Johnson',
    shift: 'Morning (6AM - 2PM)',
    equipmentUsed: ['Mixer-03', 'Mold-Station-05'],
    rawMaterials: [
      {
        id: 'RM-008',
        name: 'Organic Coconut Oil',
        lotNumber: 'LOT-CO-2024-1028',
        quantity: 300,
        unit: 'kg',
        supplier: 'Natural Oils Inc',
        receivedDate: '2024-10-28',
        expiryDate: '2026-10-28',
        certifications: ['USDA Organic', 'Fair Trade']
      },
      {
        id: 'RM-009',
        name: 'Eucalyptus Essential Oil',
        lotNumber: 'LOT-EEO-2024-1029',
        quantity: 30,
        unit: 'L',
        supplier: 'Australian Oils Co',
        receivedDate: '2024-10-29',
        expiryDate: '2027-10-29',
        certifications: ['Pure Essential Oil', 'GC/MS Tested']
      }
    ],
    qualityChecks: [
      {
        id: 'QC-008',
        checkType: 'Pre-Production',
        parameter: 'Raw Material Verification',
        expectedValue: 'All materials within spec',
        actualValue: 'Verified - All approved',
        status: 'Pass',
        checkedBy: 'QA Team - James Wilson',
        timestamp: '2024-10-30 06:15 AM'
      }
    ],
    productionSteps: [
      {
        step: 1,
        name: 'Material Preparation',
        operator: 'Mike Johnson',
        startTime: '2024-10-30 07:00 AM',
        endTime: '2024-10-30 07:30 AM',
        equipment: 'Weighing Station-01',
        status: 'Completed'
      },
      {
        step: 2,
        name: 'Saponification',
        operator: 'Mike Johnson',
        startTime: '2024-10-30 08:00 AM',
        endTime: '2024-10-30 09:30 AM',
        temperature: '40°C',
        equipment: 'Mixer-03',
        status: 'In Progress'
      }
    ],
    yieldPercentage: 0,
    wastePercentage: 0,
    packagingDetails: {
      packagingDate: '2024-11-03',
      packageType: 'Individual wrapper + 12-unit box',
      unitsPerPackage: 12,
      totalPackages: 100,
      packagingLine: 'Packaging Line 3'
    },
    traceabilityCode: 'TRACE-BATCH-7266K-2024',
    qrCodeGenerated: false,
    notes: 'Production in progress - Expected completion: Nov 3, 2024'
  },
  {
    id: 'B-004',
    batchNumber: 'BATCH-7263K',
    productName: 'Charcoal Detox Soap',
    sku: 'CDS-004',
    recipe: 'RECIPE-CHAR-004',
    quantity: 500,
    unit: 'bars',
    status: 'Quarantined',
    productionDate: '2024-10-18',
    expiryDate: '2026-10-18',
    shelfLife: 730,
    location: 'Quarantine Area Q-1',
    operator: 'Tom Anderson',
    supervisor: 'Sarah Johnson',
    shift: 'Night (10PM - 6AM)',
    equipmentUsed: ['Mixer-01', 'Mold-Station-02', 'Curing-Rack-B1'],
    rawMaterials: [
      {
        id: 'RM-010',
        name: 'Activated Charcoal',
        lotNumber: 'LOT-AC-2024-1017',
        quantity: 20,
        unit: 'kg',
        supplier: 'Carbon Solutions Inc',
        receivedDate: '2024-10-17',
        expiryDate: '2029-10-17',
        certifications: ['Food Grade', 'Activated']
      }
    ],
    qualityChecks: [
      {
        id: 'QC-009',
        checkType: 'Final Release',
        parameter: 'pH Level',
        expectedValue: '9.5 - 10.5',
        actualValue: '11.2',
        status: 'Fail',
        checkedBy: 'QA Supervisor - Robert Chen',
        timestamp: '2024-10-22 04:00 PM'
      }
    ],
    productionSteps: [],
    yieldPercentage: 96.0,
    wastePercentage: 4.0,
    packagingDetails: {
      packagingDate: '2024-10-22',
      packageType: 'Individual wrapper',
      unitsPerPackage: 1,
      totalPackages: 500,
      packagingLine: 'None - Quarantined'
    },
    traceabilityCode: 'TRACE-BATCH-7263K-2024',
    qrCodeGenerated: false,
    quarantineReason: 'pH level out of specification (11.2, expected 9.5-10.5). Investigating saponification process.',
    notes: 'Under investigation by QA team. Root cause analysis in progress.'
  }
];

interface BatchesViewEnhancedProps {
  onNavigate?: (view: string) => void;
}

export function BatchesViewEnhanced({ onNavigate }: BatchesViewEnhancedProps = {}) {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [filteredData, setFilteredData] = useState<Batch[]>(mockBatches);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Released', label: 'Released' },
        { value: 'In Production', label: 'In Production' },
        { value: 'Quarantined', label: 'Quarantined' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Rejected', label: 'Rejected' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'product',
      label: 'Product',
      type: 'select',
      options: [
        { value: 'all', label: 'All Products' },
        { value: 'Lavender Dream Soap', label: 'Lavender Dream Soap' },
        { value: 'Vanilla Bliss Soap', label: 'Vanilla Bliss Soap' },
        { value: 'Eucalyptus Fresh Soap', label: 'Eucalyptus Fresh Soap' },
        { value: 'Charcoal Detox Soap', label: 'Charcoal Detox Soap' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'dateRange',
      label: 'Production Date',
      type: 'date-range'
    },
    {
      id: 'search',
      label: 'Search',
      type: 'text',
      placeholder: 'Batch number, recipe, operator...'
    }
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mockBatches];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(batch => batch.status === filters.status);
    }

    if (filters.product && filters.product !== 'all') {
      filtered = filtered.filter(batch => batch.productName === filters.product);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(batch =>
        batch.batchNumber.toLowerCase().includes(searchLower) ||
        batch.productName.toLowerCase().includes(searchLower) ||
        batch.recipe.toLowerCase().includes(searchLower) ||
        batch.operator.toLowerCase().includes(searchLower)
      );
    }

    if (filters.startDate && filters.endDate) {
      filtered = filtered.filter(batch => {
        const batchDate = new Date(batch.productionDate);
        return batchDate >= new Date(filters.startDate) && batchDate <= new Date(filters.endDate);
      });
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: Batch['status']) => {
    const variants = {
      'Released': 'default',
      'Quarantined': 'destructive',
      'In Production': 'secondary',
      'Under Review': 'outline',
      'Rejected': 'destructive'
    };

    const icons = {
      'Released': CheckCircle2,
      'Quarantined': XCircle,
      'In Production': Package,
      'Under Review': AlertTriangle,
      'Rejected': XCircle
    };

    const Icon = icons[status];

    return (
      <Badge variant={variants[status] as any} className="gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const renderOverviewTab = (batch: Batch) => (
    <div className="space-y-6">
      {/* WHO */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Users className="w-5 h-5" />
          WHO - Personnel
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Operator</p>
            <p>{batch.operator}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Supervisor</p>
            <p>{batch.supervisor}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Shift</p>
            <p>{batch.shift}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">QA Checks By</p>
            <p className="text-sm">{batch.qualityChecks.map(qc => qc.checkedBy.split(' - ')[1]).filter((v, i, a) => a.indexOf(v) === i).join(', ')}</p>
          </div>
        </div>
      </div>

      {/* WHAT */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Package className="w-5 h-5" />
          WHAT - Product Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Product Name</p>
            <p>{batch.productName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">SKU</p>
            <p>{batch.sku}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Recipe</p>
            <p>{batch.recipe}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Quantity Produced</p>
            <p>{batch.quantity.toLocaleString()} {batch.unit}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Yield %</p>
            <p className="text-green-600">{batch.yieldPercentage}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Waste %</p>
            <p className="text-orange-600">{batch.wastePercentage}%</p>
          </div>
        </div>
      </div>

      {/* WHEN */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Calendar className="w-5 h-5" />
          WHEN - Timeline
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Production Date</p>
            <p>{new Date(batch.productionDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Expiry Date</p>
            <p>{new Date(batch.expiryDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Shelf Life</p>
            <p>{batch.shelfLife} days ({Math.floor(batch.shelfLife / 365)} years)</p>
          </div>
          {batch.releaseDate && (
            <div>
              <p className="text-sm text-slate-500">Release Date</p>
              <p>{new Date(batch.releaseDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>

      {/* WHERE */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <MapPin className="w-5 h-5" />
          WHERE - Location & Equipment
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-500">Current Location</p>
            <p>{batch.location}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Equipment Used</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {batch.equipmentUsed.map((eq, idx) => (
                <Badge key={idx} variant="outline">{eq}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Packaging Line</p>
            <p>{batch.packagingDetails.packagingLine}</p>
          </div>
        </div>
      </div>

      {/* WHY/STATUS */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <FileText className="w-5 h-5" />
          WHY - Status & Disposition
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-500">Current Status</p>
            <div className="mt-1">{getStatusBadge(batch.status)}</div>
          </div>
          {batch.quarantineReason && (
            <div>
              <p className="text-sm text-slate-500">Quarantine Reason</p>
              <p className="text-red-600">{batch.quarantineReason}</p>
            </div>
          )}
          {batch.allocatedTo && batch.allocatedTo.length > 0 && (
            <div>
              <p className="text-sm text-slate-500">Allocated To</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {batch.allocatedTo.map((order, idx) => (
                  <Badge key={idx} variant="secondary">{order}</Badge>
                ))}
              </div>
            </div>
          )}
          {batch.notes && (
            <div>
              <p className="text-sm text-slate-500">Notes</p>
              <p className="text-sm">{batch.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRawMaterialsTab = (batch: Batch) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-purple-700">
          <FlaskConical className="w-5 h-5" />
          Raw Materials Used ({batch.rawMaterials.length})
        </h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Material Name</TableHead>
            <TableHead>Lot Number</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Received Date</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Certifications</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batch.rawMaterials.map((material) => (
            <TableRow key={material.id}>
              <TableCell>{material.name}</TableCell>
              <TableCell>
                <code className="text-xs bg-slate-100 px-2 py-1 rounded">{material.lotNumber}</code>
              </TableCell>
              <TableCell>{material.quantity} {material.unit}</TableCell>
              <TableCell>{material.supplier}</TableCell>
              <TableCell>{new Date(material.receivedDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(material.expiryDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {material.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderProductionStepsTab = (batch: Batch) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <Boxes className="w-5 h-5" />
        Production Steps ({batch.productionSteps.length})
      </h3>
      <div className="space-y-3">
        {batch.productionSteps.map((step) => (
          <Card key={step.step} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step {step.step}</Badge>
                  <h4>{step.name}</h4>
                </div>
                <p className="text-sm text-slate-500 mt-1">Operator: {step.operator}</p>
              </div>
              <Badge variant={step.status === 'Completed' ? 'default' : step.status === 'In Progress' ? 'secondary' : 'outline'}>
                {step.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Start Time</p>
                <p>{step.startTime}</p>
              </div>
              <div>
                <p className="text-slate-500">End Time</p>
                <p>{step.endTime}</p>
              </div>
              {step.temperature && (
                <div className="flex items-center gap-1">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-slate-500">Temperature</p>
                    <p>{step.temperature}</p>
                  </div>
                </div>
              )}
              {step.humidity && (
                <div className="flex items-center gap-1">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-slate-500">Humidity</p>
                    <p>{step.humidity}</p>
                  </div>
                </div>
              )}
              <div>
                <p className="text-slate-500">Equipment</p>
                <p>{step.equipment}</p>
              </div>
            </div>
            {step.notes && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-sm text-slate-600">{step.notes}</p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderQualityTab = (batch: Batch) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <CheckCircle2 className="w-5 h-5" />
        Quality Control Checks ({batch.qualityChecks.length})
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Check Type</TableHead>
            <TableHead>Parameter</TableHead>
            <TableHead>Expected</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Checked By</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batch.qualityChecks.map((check) => (
            <TableRow key={check.id}>
              <TableCell>{check.checkType}</TableCell>
              <TableCell>{check.parameter}</TableCell>
              <TableCell className="text-sm">{check.expectedValue}</TableCell>
              <TableCell className="text-sm">{check.actualValue}</TableCell>
              <TableCell>
                <Badge variant={check.status === 'Pass' ? 'default' : check.status === 'Warning' ? 'outline' : 'destructive'}>
                  {check.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{check.checkedBy}</TableCell>
              <TableCell className="text-sm">{check.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderPackagingTab = (batch: Batch) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <Package className="w-5 h-5" />
        Packaging Details
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-500">Packaging Date</p>
          <p>{new Date(batch.packagingDetails.packagingDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Package Type</p>
          <p>{batch.packagingDetails.packageType}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Units Per Package</p>
          <p>{batch.packagingDetails.unitsPerPackage}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Total Packages</p>
          <p>{batch.packagingDetails.totalPackages}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Packaging Line</p>
          <p>{batch.packagingDetails.packagingLine}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">QR Code Generated</p>
          <Badge variant={batch.qrCodeGenerated ? 'default' : 'outline'}>
            {batch.qrCodeGenerated ? 'Yes' : 'No'}
          </Badge>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-slate-500">Traceability Code</p>
          <code className="text-sm bg-slate-100 px-3 py-2 rounded block mt-1">{batch.traceabilityCode}</code>
        </div>
      </div>
    </div>
  );

  const renderTraceabilityTab = (batch: Batch) => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <h3 className="flex items-center gap-2 text-purple-700 mb-4">
          <Package className="w-5 h-5" />
          Complete Batch Lifecycle
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
            <div className="flex-1">
              <h4>Raw Material Sourcing</h4>
              <p className="text-sm text-slate-600 mt-1">
                {batch.rawMaterials.length} materials from {new Set(batch.rawMaterials.map(rm => rm.supplier)).size} suppliers
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {batch.rawMaterials.map((rm, idx) => (
                  <Badge key={idx} variant="outline">{rm.name} ({rm.lotNumber})</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
            <div className="flex-1">
              <h4>Production Process</h4>
              <p className="text-sm text-slate-600 mt-1">
                {batch.productionSteps.length} production steps completed
              </p>
              <p className="text-sm text-slate-600">
                Recipe: {batch.recipe} | Operator: {batch.operator}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
            <div className="flex-1">
              <h4>Quality Assurance</h4>
              <p className="text-sm text-slate-600 mt-1">
                {batch.qualityChecks.length} quality checks performed
              </p>
              <p className="text-sm text-slate-600">
                Pass Rate: {Math.round((batch.qualityChecks.filter(qc => qc.status === 'Pass').length / batch.qualityChecks.length) * 100)}%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">4</div>
            <div className="flex-1">
              <h4>Packaging & Distribution</h4>
              <p className="text-sm text-slate-600 mt-1">
                {batch.packagingDetails.totalPackages} packages created on {new Date(batch.packagingDetails.packagingDate).toLocaleDateString()}
              </p>
              {batch.allocatedTo && batch.allocatedTo.length > 0 && (
                <p className="text-sm text-slate-600">
                  Allocated to {batch.allocatedTo.length} sales orders
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-3">Traceability Metrics</h4>
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-500">Yield Efficiency</p>
            <p className="text-2xl text-green-600">{batch.yieldPercentage}%</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-500">QC Pass Rate</p>
            <p className="text-2xl text-blue-600">
              {Math.round((batch.qualityChecks.filter(qc => qc.status === 'Pass').length / batch.qualityChecks.length) * 100)}%
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-500">Shelf Life Remaining</p>
            <p className="text-2xl text-purple-600">
              {Math.floor((new Date(batch.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </Card>
        </div>
      </div>
    </div>
  );

  const modalTabs = selectedBatch ? [
    { id: 'overview', label: 'Overview', content: renderOverviewTab(selectedBatch) },
    { id: 'raw-materials', label: 'Raw Materials', content: renderRawMaterialsTab(selectedBatch) },
    { id: 'production', label: 'Production Steps', content: renderProductionStepsTab(selectedBatch) },
    { id: 'quality', label: 'Quality Control', content: renderQualityTab(selectedBatch) },
    { id: 'packaging', label: 'Packaging', content: renderPackagingTab(selectedBatch) },
    { id: 'traceability', label: 'Traceability', content: renderTraceabilityTab(selectedBatch) }
  ] : [];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <BreadcrumbNav
        items={[
          { label: 'Production' },
          { label: 'Batches' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">Production Batches</h1>
              <p className="text-slate-600">Complete batch tracking and traceability</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Package className="w-4 h-4 mr-2" />
              Create New Batch
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
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Production Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((batch) => (
                  <TableRow key={batch.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-600 hover:text-purple-700"
                        onClick={() => setSelectedBatch(batch)}
                      >
                        {batch.batchNumber}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p>{batch.productName}</p>
                        <p className="text-xs text-slate-500">{batch.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell>{batch.quantity.toLocaleString()} {batch.unit}</TableCell>
                    <TableCell>{getStatusBadge(batch.status)}</TableCell>
                    <TableCell>{new Date(batch.productionDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(batch.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>{batch.operator}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBatch(batch)}
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
              <p className="text-sm text-slate-500">Total Batches</p>
              <p className="text-2xl text-purple-600">{mockBatches.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Released</p>
              <p className="text-2xl text-green-600">{mockBatches.filter(b => b.status === 'Released').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">In Production</p>
              <p className="text-2xl text-blue-600">{mockBatches.filter(b => b.status === 'In Production').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Quarantined</p>
              <p className="text-2xl text-red-600">{mockBatches.filter(b => b.status === 'Quarantined').length}</p>
            </Card>
          </div>
        </div>
      </div>

      {selectedBatch && (
        <DetailModal
          isOpen={!!selectedBatch}
          onClose={() => setSelectedBatch(null)}
          title={`Batch: ${selectedBatch.batchNumber}`}
          subtitle={`${selectedBatch.productName} - ${selectedBatch.quantity} ${selectedBatch.unit}`}
          tabs={modalTabs}
        />
      )}
    </div>
  );
}
