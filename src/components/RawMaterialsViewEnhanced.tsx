import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Beaker, Calendar, CheckCircle2, AlertTriangle, XCircle, Eye, Package, TrendingDown, TrendingUp, FileText, Users, MapPin, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface InventoryLot {
  lotNumber: string;
  quantity: number;
  unit: string;
  receivedDate: string;
  expiryDate: string;
  storageLocation: string;
  status: 'Available' | 'Reserved' | 'Expired' | 'Quarantined';
  reservedFor?: string[];
}

interface UsageHistory {
  date: string;
  batchNumber: string;
  productName: string;
  quantityUsed: number;
  unit: string;
  operator: string;
}

interface Certification {
  name: string;
  issuedBy: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
}

interface RawMaterial {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  supplier: {
    id: string;
    name: string;
    contactPerson: string;
    rating: number;
    leadTime: string;
  };
  currentStock: number;
  unit: string;
  minimumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  maxStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Overstock';
  inventoryLots: InventoryLot[];
  costPerUnit: number;
  currency: string;
  totalValue: number;
  lastPurchaseDate: string;
  lastPurchasePrice: number;
  averageCost: number;
  usageHistory: UsageHistory[];
  averageMonthlyUsage: number;
  estimatedDaysRemaining: number;
  certifications: Certification[];
  storageRequirements: string;
  shelfLife: number;
  shelfLifeUnit: string;
  handlingInstructions?: string;
  safetyNotes?: string;
  allergen: boolean;
  hazardous: boolean;
  regulatoryCompliance: string[];
  specifications: {
    parameter: string;
    specification: string;
    testMethod?: string;
  }[];
  alternativeSuppliers?: string[];
  linkedRecipes: string[];
  notes?: string;
}

const mockRawMaterials: RawMaterial[] = [
  {
    id: 'RM-001',
    sku: 'RM-COCO-001',
    name: 'Organic Coconut Oil',
    description: 'Virgin cold-pressed organic coconut oil - Food/Cosmetic grade',
    category: 'Carrier Oils',
    supplier: {
      id: 'SUP-001',
      name: 'Natural Oils International',
      contactPerson: 'John Anderson',
      rating: 4.8,
      leadTime: '14 days'
    },
    currentStock: 750,
    unit: 'kg',
    minimumStock: 200,
    reorderPoint: 300,
    reorderQuantity: 500,
    maxStock: 1000,
    status: 'In Stock',
    inventoryLots: [
      {
        lotNumber: 'LOT-CO-2024-1015',
        quantity: 250,
        unit: 'kg',
        receivedDate: '2024-10-15',
        expiryDate: '2026-10-15',
        storageLocation: 'Zone 3-A5-R12-B3',
        status: 'Available'
      },
      {
        lotNumber: 'LOT-CO-2024-1028',
        quantity: 300,
        unit: 'kg',
        receivedDate: '2024-10-28',
        expiryDate: '2026-10-28',
        storageLocation: 'Zone 3-A5-R12-B5',
        status: 'Reserved',
        reservedFor: ['BATCH-7267K', 'BATCH-7268K']
      },
      {
        lotNumber: 'LOT-CO-2024-0920',
        quantity: 200,
        unit: 'kg',
        receivedDate: '2024-09-20',
        expiryDate: '2026-09-20',
        storageLocation: 'Zone 3-A5-R12-B1',
        status: 'Available'
      }
    ],
    costPerUnit: 8.50,
    currency: 'USD',
    totalValue: 6375.00,
    lastPurchaseDate: '2024-10-28',
    lastPurchasePrice: 8.50,
    averageCost: 8.45,
    usageHistory: [
      {
        date: '2024-10-20',
        batchNumber: 'BATCH-7264K',
        productName: 'Lavender Dream Soap',
        quantityUsed: 250,
        unit: 'kg',
        operator: 'John Smith'
      },
      {
        date: '2024-10-21',
        batchNumber: 'BATCH-7265K',
        productName: 'Vanilla Bliss Soap',
        quantityUsed: 200,
        unit: 'kg',
        operator: 'Jane Doe'
      }
    ],
    averageMonthlyUsage: 600,
    estimatedDaysRemaining: 37,
    certifications: [
      {
        name: 'USDA Organic',
        issuedBy: 'USDA',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        certificateNumber: 'USDA-ORG-2024-1234',
        status: 'Valid'
      },
      {
        name: 'Fair Trade Certified',
        issuedBy: 'Fair Trade USA',
        issueDate: '2024-03-10',
        expiryDate: '2025-03-10',
        certificateNumber: 'FT-2024-5678',
        status: 'Valid'
      },
      {
        name: 'Non-GMO Verified',
        issuedBy: 'Non-GMO Project',
        issueDate: '2024-02-20',
        expiryDate: '2025-02-20',
        certificateNumber: 'NGP-2024-9012',
        status: 'Valid'
      }
    ],
    storageRequirements: 'Store in cool, dry place at 15-25°C. Keep away from direct sunlight.',
    shelfLife: 24,
    shelfLifeUnit: 'months',
    handlingInstructions: 'May solidify at temperatures below 24°C. Warm gently to liquefy if needed.',
    allergen: false,
    hazardous: false,
    regulatoryCompliance: ['FDA Registered', 'USDA Organic', 'Kosher Certified'],
    specifications: [
      {
        parameter: 'Free Fatty Acids',
        specification: '< 0.5%',
        testMethod: 'AOCS Ca 5a-40'
      },
      {
        parameter: 'Peroxide Value',
        specification: '< 5 meq/kg',
        testMethod: 'AOCS Cd 8-53'
      },
      {
        parameter: 'Moisture Content',
        specification: '< 0.2%',
        testMethod: 'Karl Fischer'
      }
    ],
    alternativeSuppliers: ['Pacific Oils Ltd', 'Global Coconut Trading'],
    linkedRecipes: ['RECIPE-LAV-001', 'RECIPE-VAN-002', 'RECIPE-MINT-003'],
    notes: 'Primary oil base for all cold process soap recipes. Critical inventory item.'
  },
  {
    id: 'RM-002',
    sku: 'RM-SHEA-001',
    name: 'Shea Butter',
    description: 'Unrefined Grade A Shea Butter from Ghana',
    category: 'Butters',
    supplier: {
      id: 'SUP-002',
      name: 'African Butters Co',
      contactPerson: 'Sarah Williams',
      rating: 4.7,
      leadTime: '21 days'
    },
    currentStock: 450,
    unit: 'kg',
    minimumStock: 150,
    reorderPoint: 250,
    reorderQuantity: 300,
    maxStock: 600,
    status: 'In Stock',
    inventoryLots: [
      {
        lotNumber: 'LOT-SB-2024-1016',
        quantity: 150,
        unit: 'kg',
        receivedDate: '2024-10-16',
        expiryDate: '2026-04-16',
        storageLocation: 'Zone 3-A5-R12-B4',
        status: 'Available'
      },
      {
        lotNumber: 'LOT-SB-2024-0925',
        quantity: 300,
        unit: 'kg',
        receivedDate: '2024-09-25',
        expiryDate: '2026-03-25',
        storageLocation: 'Zone 3-A5-R12-B2',
        status: 'Available'
      }
    ],
    costPerUnit: 12.00,
    currency: 'USD',
    totalValue: 5400.00,
    lastPurchaseDate: '2024-10-16',
    lastPurchasePrice: 12.00,
    averageCost: 11.85,
    usageHistory: [
      {
        date: '2024-10-20',
        batchNumber: 'BATCH-7264K',
        productName: 'Lavender Dream Soap',
        quantityUsed: 150,
        unit: 'kg',
        operator: 'John Smith'
      }
    ],
    averageMonthlyUsage: 400,
    estimatedDaysRemaining: 33,
    certifications: [
      {
        name: 'Fair Trade Certified',
        issuedBy: 'Fair Trade International',
        issueDate: '2024-01-05',
        expiryDate: '2025-01-05',
        certificateNumber: 'FTI-2024-3456',
        status: 'Valid'
      },
      {
        name: 'Organic Certified',
        issuedBy: 'Ecocert',
        issueDate: '2024-02-15',
        expiryDate: '2025-02-15',
        certificateNumber: 'ECO-2024-7890',
        status: 'Valid'
      }
    ],
    storageRequirements: 'Store in cool place at 18-23°C. Protect from heat and moisture.',
    shelfLife: 18,
    shelfLifeUnit: 'months',
    handlingInstructions: 'May have a nutty aroma. Melts at approximately 32°C.',
    allergen: false,
    hazardous: false,
    regulatoryCompliance: ['FDA Registered', 'Organic', 'Fair Trade'],
    specifications: [
      {
        parameter: 'Saponification Value',
        specification: '178-190',
        testMethod: 'AOCS Tl 1a-64'
      },
      {
        parameter: 'Unsaponifiable Matter',
        specification: '5-17%'
      }
    ],
    alternativeSuppliers: ['West African Naturals', 'Fair Trade Butter Imports'],
    linkedRecipes: ['RECIPE-LAV-001', 'RECIPE-CHAR-004'],
    notes: 'Essential moisturizing ingredient. Sourced directly from women\'s cooperatives in Ghana.'
  },
  {
    id: 'RM-003',
    sku: 'RM-LAV-001',
    name: 'Lavender Essential Oil',
    description: 'Pure Lavandula Angustifolia from Provence, France',
    category: 'Essential Oils',
    supplier: {
      id: 'SUP-003',
      name: 'French Aromatics Ltd',
      contactPerson: 'Pierre Dubois',
      rating: 4.9,
      leadTime: '30 days'
    },
    currentStock: 45,
    unit: 'L',
    minimumStock: 15,
    reorderPoint: 20,
    reorderQuantity: 50,
    maxStock: 100,
    status: 'In Stock',
    inventoryLots: [
      {
        lotNumber: 'LOT-LEO-2024-1017',
        quantity: 25,
        unit: 'L',
        receivedDate: '2024-10-17',
        expiryDate: '2027-10-17',
        storageLocation: 'Zone 2-A3-R8-B1',
        status: 'Available'
      },
      {
        lotNumber: 'LOT-LEO-2024-0815',
        quantity: 20,
        unit: 'L',
        receivedDate: '2024-08-15',
        expiryDate: '2027-08-15',
        storageLocation: 'Zone 2-A3-R8-B2',
        status: 'Available'
      }
    ],
    costPerUnit: 85.00,
    currency: 'USD',
    totalValue: 3825.00,
    lastPurchaseDate: '2024-10-17',
    lastPurchasePrice: 85.00,
    averageCost: 83.50,
    usageHistory: [
      {
        date: '2024-10-20',
        batchNumber: 'BATCH-7264K',
        productName: 'Lavender Dream Soap',
        quantityUsed: 25,
        unit: 'L',
        operator: 'John Smith'
      }
    ],
    averageMonthlyUsage: 40,
    estimatedDaysRemaining: 33,
    certifications: [
      {
        name: 'GC/MS Tested',
        issuedBy: 'Independent Lab Testing',
        issueDate: '2024-10-15',
        certificateNumber: 'GCMS-LAV-2024-1017',
        status: 'Valid'
      },
      {
        name: 'Organic Certificate',
        issuedBy: 'Ecocert France',
        issueDate: '2024-06-01',
        expiryDate: '2025-06-01',
        certificateNumber: 'ECO-FR-2024-3456',
        status: 'Valid'
      },
      {
        name: 'Pure Essential Oil',
        issuedBy: 'International Fragrance Association',
        issueDate: '2024-07-10',
        certificateNumber: 'IFRA-2024-7890',
        status: 'Valid'
      }
    ],
    storageRequirements: 'Store in amber glass bottles in cool, dark place at 15-20°C. Keep tightly sealed.',
    shelfLife: 36,
    shelfLifeUnit: 'months',
    handlingInstructions: 'Use glass or stainless steel containers only. Avoid plastic and aluminum.',
    safetyNotes: 'Concentrated essential oil. Use proper PPE. Avoid direct skin contact in undiluted form.',
    allergen: true,
    hazardous: false,
    regulatoryCompliance: ['IFRA Compliant', 'Organic', 'GC/MS Verified'],
    specifications: [
      {
        parameter: 'Linalool Content',
        specification: '25-38%',
        testMethod: 'GC/MS'
      },
      {
        parameter: 'Linalyl Acetate',
        specification: '25-45%',
        testMethod: 'GC/MS'
      },
      {
        parameter: 'Specific Gravity',
        specification: '0.875-0.888 at 20°C',
        testMethod: 'ASTM D891'
      }
    ],
    alternativeSuppliers: ['Bulgarian Lavender Co', 'Mediterranean Essentials'],
    linkedRecipes: ['RECIPE-LAV-001', 'RECIPE-CALM-005'],
    notes: 'Premium quality essential oil. Customer favorite fragrance. High value inventory item.'
  },
  {
    id: 'RM-004',
    sku: 'RM-NAOH-001',
    name: 'Food Grade Sodium Hydroxide',
    description: 'High purity NaOH beads - Food/Cosmetic grade',
    category: 'Chemicals',
    supplier: {
      id: 'SUP-004',
      name: 'Chemical Supply Corp',
      contactPerson: 'Robert Kim',
      rating: 4.9,
      leadTime: '7 days'
    },
    currentStock: 150,
    unit: 'kg',
    minimumStock: 50,
    reorderPoint: 75,
    reorderQuantity: 200,
    maxStock: 300,
    status: 'In Stock',
    inventoryLots: [
      {
        lotNumber: 'LOT-SH-2024-1018',
        quantity: 50,
        unit: 'kg',
        receivedDate: '2024-10-18',
        expiryDate: '2029-10-18',
        storageLocation: 'Chemical-Storage-Secured-B2',
        status: 'Available'
      },
      {
        lotNumber: 'NAOH-LOT-2024-10-15',
        quantity: 100,
        unit: 'kg',
        receivedDate: '2024-10-18',
        expiryDate: '2029-10-18',
        storageLocation: 'Chemical-Storage-Secured-B1',
        status: 'Available'
      }
    ],
    costPerUnit: 3.25,
    currency: 'USD',
    totalValue: 487.50,
    lastPurchaseDate: '2024-10-18',
    lastPurchasePrice: 3.25,
    averageCost: 3.20,
    usageHistory: [
      {
        date: '2024-10-20',
        batchNumber: 'BATCH-7264K',
        productName: 'Lavender Dream Soap',
        quantityUsed: 50,
        unit: 'kg',
        operator: 'John Smith'
      },
      {
        date: '2024-10-21',
        batchNumber: 'BATCH-7265K',
        productName: 'Vanilla Bliss Soap',
        quantityUsed: 35,
        unit: 'kg',
        operator: 'Jane Doe'
      }
    ],
    averageMonthlyUsage: 180,
    estimatedDaysRemaining: 25,
    certifications: [
      {
        name: 'Food Grade Certificate',
        issuedBy: 'FDA',
        issueDate: '2024-01-10',
        certificateNumber: 'FDA-FG-2024-1234',
        status: 'Valid'
      },
      {
        name: 'ISO 9001',
        issuedBy: 'ISO',
        issueDate: '2023-12-01',
        expiryDate: '2026-12-01',
        certificateNumber: 'ISO-9001-2023-5678',
        status: 'Valid'
      }
    ],
    storageRequirements: 'Store in secured chemical storage area. Keep dry and sealed. Separate from acids and organic materials.',
    shelfLife: 60,
    shelfLifeUnit: 'months',
    handlingInstructions: 'CORROSIVE MATERIAL. Always use PPE including goggles, gloves, and apron. Add to water slowly - NEVER add water to NaOH.',
    safetyNotes: 'HAZARDOUS CHEMICAL: Corrosive to skin and eyes. Can cause severe burns. Have emergency eyewash and safety shower nearby. Follow all SOP protocols.',
    allergen: false,
    hazardous: true,
    regulatoryCompliance: ['FDA Food Grade', 'DOT Hazmat Registered', 'OSHA Compliant'],
    specifications: [
      {
        parameter: 'Purity (as NaOH)',
        specification: '≥ 99.0%',
        testMethod: 'Titration'
      },
      {
        parameter: 'Sodium Carbonate',
        specification: '≤ 0.8%',
        testMethod: 'ASTM E291'
      },
      {
        parameter: 'Heavy Metals',
        specification: '≤ 10 ppm',
        testMethod: 'ICP-MS'
      }
    ],
    alternativeSuppliers: ['Industrial Chemicals Inc', 'Premium NaOH Suppliers'],
    linkedRecipes: ['RECIPE-LAV-001', 'RECIPE-VAN-002', 'RECIPE-MINT-003', 'RECIPE-CHAR-004'],
    notes: 'CRITICAL SAFETY ITEM. All handlers must be trained and certified. Required for saponification process in all soap recipes.'
  },
  {
    id: 'RM-005',
    sku: 'RM-CHAR-001',
    name: 'Activated Charcoal Powder',
    description: 'Food grade activated charcoal - ultra fine powder',
    category: 'Additives',
    supplier: {
      id: 'SUP-005',
      name: 'Carbon Solutions Inc',
      contactPerson: 'Emma Thompson',
      rating: 4.6,
      leadTime: '14 days'
    },
    currentStock: 15,
    unit: 'kg',
    minimumStock: 10,
    reorderPoint: 15,
    reorderQuantity: 50,
    maxStock: 75,
    status: 'Low Stock',
    inventoryLots: [
      {
        lotNumber: 'LOT-AC-2024-1017',
        quantity: 15,
        unit: 'kg',
        receivedDate: '2024-10-17',
        expiryDate: '2029-10-17',
        storageLocation: 'Zone 4-Additives-A3-R5',
        status: 'Available'
      }
    ],
    costPerUnit: 18.50,
    currency: 'USD',
    totalValue: 277.50,
    lastPurchaseDate: '2024-10-17',
    lastPurchasePrice: 18.50,
    averageCost: 18.25,
    usageHistory: [
      {
        date: '2024-10-18',
        batchNumber: 'BATCH-7263K',
        productName: 'Charcoal Detox Soap',
        quantityUsed: 20,
        unit: 'kg',
        operator: 'Tom Anderson'
      }
    ],
    averageMonthlyUsage: 45,
    estimatedDaysRemaining: 10,
    certifications: [
      {
        name: 'Food Grade Certificate',
        issuedBy: 'FDA',
        issueDate: '2024-05-01',
        certificateNumber: 'FDA-CHAR-2024-3456',
        status: 'Valid'
      },
      {
        name: 'Activated Carbon Specification',
        issuedBy: 'ASTM International',
        issueDate: '2024-06-15',
        certificateNumber: 'ASTM-AC-2024-7890',
        status: 'Valid'
      }
    ],
    storageRequirements: 'Store in sealed containers in dry area. Keep away from moisture and strong oxidizers.',
    shelfLife: 60,
    shelfLifeUnit: 'months',
    handlingInstructions: 'Use dust mask when handling. May create fine black dust. Clean spills immediately.',
    safetyNotes: 'Inhalation of dust may cause respiratory irritation. Use in well-ventilated area.',
    allergen: false,
    hazardous: false,
    regulatoryCompliance: ['FDA Food Grade', 'ASTM Standards Compliant'],
    specifications: [
      {
        parameter: 'Mesh Size',
        specification: '300+ mesh',
        testMethod: 'Sieve Analysis'
      },
      {
        parameter: 'Iodine Number',
        specification: '≥ 900 mg/g',
        testMethod: 'ASTM D4607'
      },
      {
        parameter: 'Moisture Content',
        specification: '≤ 5%',
        testMethod: 'ASTM D2867'
      }
    ],
    alternativeSuppliers: ['Activated Carbon USA', 'Pure Charcoal Suppliers'],
    linkedRecipes: ['RECIPE-CHAR-004', 'RECIPE-DETOX-006'],
    notes: 'LOW STOCK ALERT! Reorder recommended. Popular ingredient for detox products.'
  }
];

export function RawMaterialsViewEnhanced() {
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);
  const [filteredData, setFilteredData] = useState<RawMaterial[]>(mockRawMaterials);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Stock Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'In Stock', label: 'In Stock' },
        { value: 'Low Stock', label: 'Low Stock' },
        { value: 'Out of Stock', label: 'Out of Stock' },
        { value: 'Overstock', label: 'Overstock' }
      ]
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'Carrier Oils', label: 'Carrier Oils' },
        { value: 'Butters', label: 'Butters' },
        { value: 'Essential Oils', label: 'Essential Oils' },
        { value: 'Chemicals', label: 'Chemicals' },
        { value: 'Additives', label: 'Additives' }
      ]
    },
    {
      id: 'supplier',
      label: 'Supplier',
      type: 'text',
      placeholder: 'Search by supplier...'
    },
    {
      id: 'hazardous',
      label: 'Material Type',
      type: 'select',
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'hazardous', label: 'Hazardous Only' },
        { value: 'safe', label: 'Non-Hazardous Only' }
      ]
    }
  ];

  const handleFilterChange = (filters: Record<string, string>) => {
    let filtered = mockRawMaterials;

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(material => material.status === filters.status);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(material => material.category === filters.category);
    }

    if (filters.supplier) {
      filtered = filtered.filter(material =>
        material.supplier.name.toLowerCase().includes(filters.supplier.toLowerCase()) ||
        material.name.toLowerCase().includes(filters.supplier.toLowerCase())
      );
    }

    if (filters.hazardous && filters.hazardous !== 'all') {
      if (filters.hazardous === 'hazardous') {
        filtered = filtered.filter(material => material.hazardous);
      } else {
        filtered = filtered.filter(material => !material.hazardous);
      }
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'In Stock': 'bg-green-100 text-green-700',
      'Low Stock': 'bg-yellow-100 text-yellow-700',
      'Out of Stock': 'bg-red-100 text-red-700',
      'Overstock': 'bg-blue-100 text-blue-700'
    };
    return <Badge className={styles[status] || 'bg-gray-100'}>{status}</Badge>;
  };

  const getLotStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Available': 'bg-green-100 text-green-700',
      'Reserved': 'bg-yellow-100 text-yellow-700',
      'Expired': 'bg-red-100 text-red-700',
      'Quarantined': 'bg-orange-100 text-orange-700'
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  const getCertStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'Valid': 'bg-green-100 text-green-700',
      'Expiring Soon': 'bg-yellow-100 text-yellow-700',
      'Expired': 'bg-red-100 text-red-700'
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'Low Stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Out of Stock':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '#' },
          { label: 'Production', href: '#' },
          { label: 'Raw Materials', href: '#', current: true }
        ]}
      />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-slate-900">Raw Materials Inventory</h1>
          <p className="text-slate-600 mt-1">Track and manage raw materials, certifications, and stock levels</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
          <Package className="w-4 h-4 mr-2" />
          Add Material
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
                <TableHead>SKU / Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(material.status)}
                      <div>
                        <div className="font-medium text-slate-900">{material.name}</div>
                        <div className="text-sm text-slate-500 font-mono">{material.sku}</div>
                        {material.hazardous && (
                          <Badge className="bg-red-100 text-red-700 text-xs mt-1">Hazardous</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-slate-100 text-slate-700">{material.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-slate-900">{material.supplier.name}</div>
                      <div className="text-xs text-slate-500">Lead: {material.supplier.leadTime}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {material.currentStock} {material.unit}
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            getStockPercentage(material.currentStock, material.maxStock) > 50
                              ? 'bg-green-500'
                              : getStockPercentage(material.currentStock, material.maxStock) > 25
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${getStockPercentage(material.currentStock, material.maxStock)}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-500">
                        Min: {material.minimumStock} | Max: {material.maxStock}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(material.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {material.currency} ${material.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-slate-500">
                      @ ${material.costPerUnit.toFixed(2)}/{material.unit}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {material.estimatedDaysRemaining < 15 ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      )}
                      <span className={material.estimatedDaysRemaining < 15 ? 'text-red-600 font-medium' : 'text-slate-700'}>
                        {material.estimatedDaysRemaining} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedMaterial(material)}
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
            <Beaker className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No raw materials found matching your filters.</p>
          </div>
        )}
      </Card>

      {selectedMaterial && (
        <DetailModal
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          title={`${selectedMaterial.name} (${selectedMaterial.sku})`}
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
                      WHO - Supplier Information
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Primary Supplier:</span>
                        <span className="font-medium text-slate-900">{selectedMaterial.supplier.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contact Person:</span>
                        <span className="text-slate-900">{selectedMaterial.supplier.contactPerson}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Rating:</span>
                        <span className="text-yellow-600">⭐ {selectedMaterial.supplier.rating}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Lead Time:</span>
                        <span className="font-medium">{selectedMaterial.supplier.leadTime}</span>
                      </div>
                      {selectedMaterial.alternativeSuppliers && selectedMaterial.alternativeSuppliers.length > 0 && (
                        <div className="pt-2 border-t border-slate-200">
                          <div className="text-xs text-slate-500 mb-1">Alternative Suppliers</div>
                          <div className="text-sm text-slate-700">
                            {selectedMaterial.alternativeSuppliers.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* WHAT */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      WHAT - Material Details
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Description</div>
                        <div className="text-sm text-slate-900">{selectedMaterial.description}</div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Category:</span>
                        <Badge className="bg-slate-100 text-slate-700">{selectedMaterial.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Current Stock:</span>
                        <span className="font-medium text-lg">{selectedMaterial.currentStock} {selectedMaterial.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Minimum Stock:</span>
                        <span>{selectedMaterial.minimumStock} {selectedMaterial.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Reorder Point:</span>
                        <span>{selectedMaterial.reorderPoint} {selectedMaterial.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Reorder Quantity:</span>
                        <span>{selectedMaterial.reorderQuantity} {selectedMaterial.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <span>{getStatusBadge(selectedMaterial.status)}</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {selectedMaterial.hazardous && (
                          <Badge className="bg-red-100 text-red-700">Hazardous</Badge>
                        )}
                        {selectedMaterial.allergen && (
                          <Badge className="bg-orange-100 text-orange-700">Allergen</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Financial */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3">Financial Information</h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Cost Per Unit:</span>
                        <span className="font-medium">${selectedMaterial.costPerUnit.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Average Cost:</span>
                        <span className="font-medium">${selectedMaterial.averageCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Last Purchase Price:</span>
                        <span className="font-medium">${selectedMaterial.lastPurchasePrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-300 pt-2 mt-2">
                        <span className="text-slate-900 font-medium">Total Inventory Value:</span>
                        <span className="text-lg font-bold text-purple-600">
                          ${selectedMaterial.totalValue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WHERE */}
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      WHERE - Storage Requirements
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Storage Requirements</div>
                        <div className="text-sm text-slate-900">{selectedMaterial.storageRequirements}</div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Shelf Life:</span>
                        <span className="font-medium">
                          {selectedMaterial.shelfLife} {selectedMaterial.shelfLifeUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Safety */}
                  {(selectedMaterial.handlingInstructions || selectedMaterial.safetyNotes) && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-3">Safety & Handling</h3>
                      <div className="space-y-2">
                        {selectedMaterial.handlingInstructions && (
                          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                            <div className="text-xs text-blue-600 font-medium mb-1">Handling Instructions</div>
                            <p className="text-sm text-slate-700">{selectedMaterial.handlingInstructions}</p>
                          </div>
                        )}
                        {selectedMaterial.safetyNotes && (
                          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                            <div className="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              Safety Notes
                            </div>
                            <p className="text-sm text-slate-700">{selectedMaterial.safetyNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedMaterial.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-2">Notes</h3>
                      <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
                        {selectedMaterial.notes}
                      </div>
                    </div>
                  )}
                </div>
              )
            },
            {
              id: 'inventory',
              label: 'Inventory Lots',
              icon: Package,
              content: (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-900">
                      Active Inventory Lots ({selectedMaterial.inventoryLots.length})
                    </h3>
                    <div className="text-sm text-slate-600">
                      Total: {selectedMaterial.currentStock} {selectedMaterial.unit}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {selectedMaterial.inventoryLots.map((lot, idx) => (
                      <Card key={idx} className="p-4 border border-slate-200">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-mono text-sm text-slate-900">{lot.lotNumber}</div>
                              {getLotStatusBadge(lot.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <div className="text-xs text-slate-500">Received</div>
                                <div className="text-slate-900">{lot.receivedDate}</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-500">Expiry</div>
                                <div className="text-slate-900">{lot.expiryDate}</div>
                              </div>
                              <div className="col-span-2">
                                <div className="text-xs text-slate-500">Storage Location</div>
                                <div className="text-slate-900 font-mono text-xs">{lot.storageLocation}</div>
                              </div>
                            </div>
                            {lot.reservedFor && lot.reservedFor.length > 0 && (
                              <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                                <strong className="text-yellow-700">Reserved for:</strong>{' '}
                                <span className="text-slate-700">{lot.reservedFor.join(', ')}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center items-end">
                            <div className="text-2xl font-bold text-purple-600">
                              {lot.quantity}
                            </div>
                            <div className="text-sm text-slate-500">{lot.unit}</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            },
            {
              id: 'certifications',
              label: 'Certifications',
              icon: Shield,
              content: (
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-900">
                    Active Certifications ({selectedMaterial.certifications.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedMaterial.certifications.map((cert, idx) => (
                      <Card key={idx} className="p-4 border border-slate-200">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-slate-900">{cert.name}</h4>
                            <p className="text-sm text-slate-500 mt-1">Issued by: {cert.issuedBy}</p>
                          </div>
                          {getCertStatusBadge(cert.status)}
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-xs text-slate-500">Certificate Number</div>
                            <div className="font-mono text-xs text-slate-900">{cert.certificateNumber}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Issue Date</div>
                            <div className="text-slate-900">{cert.issueDate}</div>
                          </div>
                          {cert.expiryDate && (
                            <div>
                              <div className="text-xs text-slate-500">Expiry Date</div>
                              <div className="text-slate-900">{cert.expiryDate}</div>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>

                  {selectedMaterial.regulatoryCompliance.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium text-slate-900 mb-3">Regulatory Compliance</h3>
                      <div className="flex gap-2 flex-wrap">
                        {selectedMaterial.regulatoryCompliance.map((compliance, idx) => (
                          <Badge key={idx} className="bg-green-100 text-green-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {compliance}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            },
            {
              id: 'usage',
              label: 'Usage & Analytics',
              icon: TrendingUp,
              content: (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="text-sm text-blue-600 mb-1">Average Monthly Usage</div>
                      <div className="text-2xl font-bold text-blue-900">
                        {selectedMaterial.averageMonthlyUsage} {selectedMaterial.unit}
                      </div>
                    </Card>
                    <Card className="p-4 bg-purple-50 border-purple-200">
                      <div className="text-sm text-purple-600 mb-1">Days Remaining</div>
                      <div className="text-2xl font-bold text-purple-900">
                        {selectedMaterial.estimatedDaysRemaining} days
                      </div>
                    </Card>
                    <Card className="p-4 bg-green-50 border-green-200">
                      <div className="text-sm text-green-600 mb-1">Used In Recipes</div>
                      <div className="text-2xl font-bold text-green-900">
                        {selectedMaterial.linkedRecipes.length}
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">Recent Usage History</h3>
                    <div className="space-y-2">
                      {selectedMaterial.usageHistory.map((usage, idx) => (
                        <div key={idx} className="bg-slate-50 p-3 rounded-lg flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">{usage.productName}</div>
                            <div className="text-sm text-slate-500 mt-1">
                              Batch: {usage.batchNumber} • {usage.date} • {usage.operator}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-red-600">
                              -{usage.quantityUsed} {usage.unit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 mb-3">Linked Recipes</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedMaterial.linkedRecipes.map((recipe, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-700 font-mono">
                          {recipe}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedMaterial.specifications.length > 0 && (
                    <div>
                      <h3 className="font-medium text-slate-900 mb-3">Quality Specifications</h3>
                      <div className="space-y-2">
                        {selectedMaterial.specifications.map((spec, idx) => (
                          <div key={idx} className="bg-slate-50 p-3 rounded-lg">
                            <div className="font-medium text-slate-900">{spec.parameter}</div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                              <div>
                                <span className="text-slate-500">Specification:</span>{' '}
                                <span className="text-slate-900">{spec.specification}</span>
                              </div>
                              {spec.testMethod && (
                                <div>
                                  <span className="text-slate-500">Test Method:</span>{' '}
                                  <span className="text-slate-900">{spec.testMethod}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
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
