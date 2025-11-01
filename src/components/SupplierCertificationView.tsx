import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Download,
  Calendar,
  Search,
  Eye,
  RefreshCw,
  Award,
  Leaf,
  Heart,
  Recycle,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface Certification {
  id: string;
  name: string;
  type: 'Organic' | 'Fair Trade' | 'Cruelty Free' | 'Vegan' | 'ISO' | 'GMP' | 'HACCP' | 'Halal' | 'Kosher' | 'USDA' | 'FDA' | 'Conflict Free' | 'Carbon Neutral';
  issuer: string;
  certNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired' | 'Pending' | 'Under Review';
  documentUrl?: string;
  verificationUrl?: string;
  scope: string;
  autoRenewal: boolean;
}

interface Supplier {
  id: string;
  name: string;
  country: string;
  industry: 'Food & Cosmetics' | 'Apparel' | 'Electronics' | 'Pharma' | 'Automotive' | 'General';
  materials: string[];
  certifications: Certification[];
  complianceScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastAudit: string;
  nextAudit: string;
  contact: string;
  sustainability: {
    carbonFootprint: string;
    ethicalLabor: boolean;
    recyclablePackaging: boolean;
    localSourcing: boolean;
  };
}

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Natural Oils International',
    country: 'Thailand',
    industry: 'Food & Cosmetics',
    materials: ['Coconut Oil', 'Palm Oil', 'Shea Butter'],
    complianceScore: 98,
    riskLevel: 'Low',
    lastAudit: '2025-09-15',
    nextAudit: '2026-03-15',
    contact: 'procurement@naturaloils.com',
    sustainability: {
      carbonFootprint: '15 tons CO₂/year',
      ethicalLabor: true,
      recyclablePackaging: true,
      localSourcing: true,
    },
    certifications: [
      {
        id: 'CERT-001',
        name: 'USDA Organic',
        type: 'Organic',
        issuer: 'USDA',
        certNumber: 'ORG-TH-2024-5521',
        issueDate: '2024-01-15',
        expiryDate: '2026-01-15',
        status: 'Valid',
        documentUrl: '#',
        verificationUrl: 'https://usda.gov/verify',
        scope: 'Coconut Oil, Palm Oil production',
        autoRenewal: true,
      },
      {
        id: 'CERT-002',
        name: 'Fair Trade Certified',
        type: 'Fair Trade',
        issuer: 'Fair Trade USA',
        certNumber: 'FT-2024-8823',
        issueDate: '2024-03-10',
        expiryDate: '2025-12-31',
        status: 'Expiring Soon',
        documentUrl: '#',
        scope: 'All products',
        autoRenewal: true,
      },
      {
        id: 'CERT-003',
        name: 'Cruelty Free International',
        type: 'Cruelty Free',
        issuer: 'Leaping Bunny',
        certNumber: 'CF-INT-7742',
        issueDate: '2023-06-01',
        expiryDate: '2026-06-01',
        status: 'Valid',
        scope: 'Manufacturing process',
        autoRenewal: false,
      },
    ],
  },
  {
    id: 'SUP-002',
    name: 'Essential Botanicals Ltd',
    country: 'France',
    industry: 'Food & Cosmetics',
    materials: ['Lavender Essential Oil', 'Rose Otto Oil', 'Geranium Oil'],
    complianceScore: 95,
    riskLevel: 'Low',
    lastAudit: '2025-08-20',
    nextAudit: '2026-02-20',
    contact: 'contact@essentialbotanicals.fr',
    sustainability: {
      carbonFootprint: '8 tons CO₂/year',
      ethicalLabor: true,
      recyclablePackaging: true,
      localSourcing: true,
    },
    certifications: [
      {
        id: 'CERT-004',
        name: 'EU Organic',
        type: 'Organic',
        issuer: 'EU Commission',
        certNumber: 'EU-ORG-FR-2024-1205',
        issueDate: '2024-02-01',
        expiryDate: '2027-02-01',
        status: 'Valid',
        scope: 'Essential oil production',
        autoRenewal: true,
      },
      {
        id: 'CERT-005',
        name: 'ISO 9001:2015',
        type: 'ISO',
        issuer: 'ISO',
        certNumber: 'ISO-9001-FR-5521',
        issueDate: '2023-11-15',
        expiryDate: '2026-11-15',
        status: 'Valid',
        scope: 'Quality management systems',
        autoRenewal: true,
      },
    ],
  },
  {
    id: 'SUP-003',
    name: 'Precision Electronics Taiwan',
    country: 'Taiwan',
    industry: 'Electronics',
    materials: ['Microchips', 'Circuit Boards', 'LEDs'],
    complianceScore: 92,
    riskLevel: 'Medium',
    lastAudit: '2025-07-10',
    nextAudit: '2025-12-10',
    contact: 'sales@precisionelec.tw',
    sustainability: {
      carbonFootprint: '120 tons CO₂/year',
      ethicalLabor: true,
      recyclablePackaging: true,
      localSourcing: false,
    },
    certifications: [
      {
        id: 'CERT-006',
        name: 'Conflict-Free Minerals',
        type: 'Conflict Free',
        issuer: 'RMI',
        certNumber: 'CFM-TW-2025-3341',
        issueDate: '2025-01-05',
        expiryDate: '2026-01-05',
        status: 'Valid',
        scope: 'Tin, tungsten, tantalum, gold',
        autoRenewal: true,
      },
      {
        id: 'CERT-007',
        name: 'ISO 14001',
        type: 'ISO',
        issuer: 'ISO',
        certNumber: 'ISO-14001-TW-8821',
        issueDate: '2024-05-20',
        expiryDate: '2027-05-20',
        status: 'Valid',
        scope: 'Environmental management',
        autoRenewal: true,
      },
      {
        id: 'CERT-008',
        name: 'RoHS Compliance',
        type: 'ISO',
        issuer: 'EU',
        certNumber: 'ROHS-EU-2024-7652',
        issueDate: '2024-03-01',
        expiryDate: '2026-03-01',
        status: 'Valid',
        scope: 'Hazardous substances restriction',
        autoRenewal: false,
      },
    ],
  },
  {
    id: 'SUP-004',
    name: 'Ethical Textiles India',
    country: 'India',
    industry: 'Apparel',
    materials: ['Organic Cotton', 'Hemp Fabric', 'Recycled Polyester'],
    complianceScore: 88,
    riskLevel: 'Medium',
    lastAudit: '2025-06-15',
    nextAudit: '2025-11-15',
    contact: 'info@ethicaltextiles.in',
    sustainability: {
      carbonFootprint: '45 tons CO₂/year',
      ethicalLabor: true,
      recyclablePackaging: true,
      localSourcing: true,
    },
    certifications: [
      {
        id: 'CERT-009',
        name: 'GOTS (Global Organic Textile)',
        type: 'Organic',
        issuer: 'GOTS',
        certNumber: 'GOTS-IN-2024-5521',
        issueDate: '2024-04-10',
        expiryDate: '2025-04-10',
        status: 'Valid',
        scope: 'Organic cotton processing',
        autoRenewal: true,
      },
      {
        id: 'CERT-010',
        name: 'Fair Wear Foundation',
        type: 'Fair Trade',
        issuer: 'Fair Wear',
        certNumber: 'FWF-2024-1123',
        issueDate: '2024-01-01',
        expiryDate: '2025-12-31',
        status: 'Expiring Soon',
        scope: 'Labor practices',
        autoRenewal: true,
      },
      {
        id: 'CERT-011',
        name: 'SA8000 Social Accountability',
        type: 'ISO',
        issuer: 'SAI',
        certNumber: 'SA8000-IN-9921',
        issueDate: '2023-09-15',
        expiryDate: '2024-09-15',
        status: 'Expired',
        scope: 'Social accountability',
        autoRenewal: false,
      },
    ],
  },
];

export function SupplierCertificationView() {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filterOptions: FilterOption[] = [
    {
      id: 'industry',
      label: 'Industry',
      type: 'select',
      options: [
        { value: 'Food & Cosmetics', label: 'Food & Cosmetics' },
        { value: 'Apparel', label: 'Apparel' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Pharma', label: 'Pharma' },
        { value: 'Automotive', label: 'Automotive' },
      ],
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'status',
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
      ],
    },
    {
      id: 'certStatus',
      label: 'Certification Status',
      type: 'multiselect',
      options: [
        { value: 'Valid', label: 'Valid' },
        { value: 'Expiring Soon', label: 'Expiring Soon' },
        { value: 'Expired', label: 'Expired' },
      ],
    },
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = mockSuppliers;

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.id.toLowerCase().includes(search) ||
          s.materials.some((m) => m.toLowerCase().includes(search))
      );
    }

    if (filters.industry) {
      filtered = filtered.filter((s) => s.industry === filters.industry);
    }

    if (filters.riskLevel) {
      filtered = filtered.filter((s) => s.riskLevel === filters.riskLevel);
    }

    if (filters.certStatus && filters.certStatus.length > 0) {
      filtered = filtered.filter((s) =>
        s.certifications.some((c) => filters.certStatus.includes(c.status))
      );
    }

    setFilteredSuppliers(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Expiring Soon':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Pending':
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'Organic':
        return <Leaf className="w-4 h-4" />;
      case 'Fair Trade':
        return <Heart className="w-4 h-4" />;
      case 'Cruelty Free':
      case 'Vegan':
        return <Award className="w-4 h-4" />;
      case 'Conflict Free':
      case 'Carbon Neutral':
        return <Recycle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  // Calculate stats
  const stats = {
    total: mockSuppliers.length,
    compliant: mockSuppliers.filter((s) => s.complianceScore >= 90).length,
    expiringCerts: mockSuppliers.reduce(
      (acc, s) => acc + s.certifications.filter((c) => c.status === 'Expiring Soon').length,
      0
    ),
    expiredCerts: mockSuppliers.reduce(
      (acc, s) => acc + s.certifications.filter((c) => c.status === 'Expired').length,
      0
    ),
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav />

      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-slate-900">Supplier Certification & Compliance</h1>
          <p className="text-slate-600 mt-1">
            Global supplier transparency and certification tracking
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-violet-600" />
              <span className="text-sm text-slate-600">Total Suppliers</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.total}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Fully Compliant</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.compliant}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-slate-600">Expiring Soon</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.expiringCerts}</div>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-slate-600">Expired Certs</span>
            </div>
            <div className="text-2xl text-slate-900">{stats.expiredCerts}</div>
          </Card>
        </div>

        {/* Smart Filters */}
        <SmartFilter
          filters={filterOptions}
          onFilterChange={handleFilterChange}
          placeholder="Search suppliers, materials, or certifications..."
        />

        {/* Suppliers Table */}
        <Card className="border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Compliance Score</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => {
                const validCerts = supplier.certifications.filter((c) => c.status === 'Valid')
                  .length;
                const expiringCerts = supplier.certifications.filter(
                  (c) => c.status === 'Expiring Soon'
                ).length;
                const expiredCerts = supplier.certifications.filter((c) => c.status === 'Expired')
                  .length;

                return (
                  <TableRow key={supplier.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{supplier.name}</div>
                        <div className="text-sm text-slate-500">
                          {supplier.id} • {supplier.country}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                        {supplier.industry}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600">
                        {supplier.materials.slice(0, 2).join(', ')}
                        {supplier.materials.length > 2 && ` +${supplier.materials.length - 2}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {validCerts > 0 && (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            {validCerts} Valid
                          </Badge>
                        )}
                        {expiringCerts > 0 && (
                          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {expiringCerts} Expiring
                          </Badge>
                        )}
                        {expiredCerts > 0 && (
                          <Badge className="bg-red-50 text-red-700 border-red-200">
                            {expiredCerts} Expired
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-slate-900 font-medium">{supplier.complianceScore}%</div>
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              supplier.complianceScore >= 90
                                ? 'bg-green-500'
                                : supplier.complianceScore >= 70
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${supplier.complianceScore}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRiskColor(supplier.riskLevel)}>
                        {supplier.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => setSelectedSupplier(supplier)}
                        variant="ghost"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Supplier Detail Modal */}
      {selectedSupplier && (
        <DetailModal
          isOpen={!!selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
          title={selectedSupplier.name}
          subtitle={`${selectedSupplier.id} • ${selectedSupplier.country}`}
          badge={
            <Badge variant="outline" className={getRiskColor(selectedSupplier.riskLevel)}>
              {selectedSupplier.riskLevel} Risk
            </Badge>
          }
          tabs={[
            {
              id: 'certifications',
              label: `Certifications (${selectedSupplier.certifications.length})`,
              content: (
                <div className="space-y-4">
                  {selectedSupplier.certifications.map((cert) => (
                    <Card key={cert.id} className="p-4 border-slate-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                            {getCertIcon(cert.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{cert.name}</h4>
                            <div className="text-sm text-slate-600">{cert.issuer}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(cert.status)}>
                          {cert.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-slate-500">Certificate Number</div>
                          <div className="text-sm text-slate-900 font-mono">{cert.certNumber}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Issue Date</div>
                          <div className="text-sm text-slate-900">
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Expiry Date</div>
                          <div className="text-sm text-slate-900">
                            {new Date(cert.expiryDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-xs text-slate-500">Scope</div>
                        <div className="text-sm text-slate-900">{cert.scope}</div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-sm">
                          {cert.autoRenewal ? (
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Auto-Renewal
                            </Badge>
                          ) : (
                            <Badge variant="outline">Manual Renewal</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {cert.verificationUrl && (
                            <Button variant="outline" size="sm">
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Verify
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Certification
                  </Button>
                </div>
              ),
            },
            {
              id: 'materials',
              label: 'Materials',
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedSupplier.materials.map((material, idx) => (
                      <Card key={idx} className="p-4 border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{material}</div>
                            <div className="text-sm text-slate-600">In Stock</div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: 'sustainability',
              label: 'Sustainability',
              content: (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">
                        Environmental Impact
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Carbon Footprint</div>
                          <div className="text-sm text-slate-900">
                            {selectedSupplier.sustainability.carbonFootprint}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Recyclable Packaging</div>
                          <Badge
                            className={
                              selectedSupplier.sustainability.recyclablePackaging
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {selectedSupplier.sustainability.recyclablePackaging ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Local Sourcing</div>
                          <Badge
                            className={
                              selectedSupplier.sustainability.localSourcing
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {selectedSupplier.sustainability.localSourcing ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">Social Impact</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-500">Ethical Labor Practices</div>
                          <Badge
                            className={
                              selectedSupplier.sustainability.ethicalLabor
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {selectedSupplier.sustainability.ethicalLabor
                              ? 'Certified'
                              : 'Not Certified'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'audit',
              label: 'Audit History',
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Last Audit</div>
                      <div className="text-lg text-slate-900">
                        {new Date(selectedSupplier.lastAudit).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Next Audit</div>
                      <div className="text-lg text-slate-900">
                        {new Date(selectedSupplier.nextAudit).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-violet-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-violet-900">Audit Schedule</div>
                        <div className="text-sm text-violet-700 mt-1">
                          Bi-annual audits scheduled. Next audit in{' '}
                          {Math.ceil(
                            (new Date(selectedSupplier.nextAudit).getTime() - Date.now()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          days.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
