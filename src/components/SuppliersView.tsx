import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  Search, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const suppliers = [
  {
    id: 'SUP-001',
    name: 'Global Materials Inc',
    rating: 4.8,
    onTimeDelivery: 96,
    qualityScore: 98,
    totalOrders: 1247,
    activeContracts: 3,
    status: 'Approved',
    trend: 'up',
    documents: ['Contract 2025', 'ISO Certification', 'Compliance Report'],
  },
  {
    id: 'SUP-002',
    name: 'Premier Supply Co',
    rating: 4.6,
    onTimeDelivery: 92,
    qualityScore: 95,
    totalOrders: 892,
    activeContracts: 2,
    status: 'Approved',
    trend: 'up',
    documents: ['Contract 2025', 'Quality Cert'],
  },
  {
    id: 'SUP-003',
    name: 'Eastern Manufacturing',
    rating: 4.2,
    onTimeDelivery: 88,
    qualityScore: 91,
    totalOrders: 543,
    activeContracts: 1,
    status: 'Review',
    trend: 'down',
    documents: ['Contract 2024'],
  },
  {
    id: 'SUP-004',
    name: 'Pacific Resources Ltd',
    rating: 4.9,
    onTimeDelivery: 98,
    qualityScore: 99,
    totalOrders: 1856,
    activeContracts: 4,
    status: 'Approved',
    trend: 'up',
    documents: ['Contract 2025', 'ISO Certification', 'Compliance Report', 'Audit Report'],
  },
];

export function SuppliersView() {
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex">
      {/* Supplier List */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-slate-900 mb-1">Suppliers</h1>
          <p className="text-sm text-slate-600">Supplier scorecards & management</p>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search suppliers..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredSuppliers.map((supplier) => (
            <button
              key={supplier.id}
              onClick={() => setSelectedSupplier(supplier)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selectedSupplier.id === supplier.id
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-900">{supplier.name}</span>
                <Badge 
                  variant="outline"
                  className={
                    supplier.status === 'Approved'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }
                >
                  {supplier.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-slate-900">{supplier.rating}</span>
                {supplier.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-600 ml-1" />
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-slate-500">On-Time</div>
                  <div className="text-slate-900">{supplier.onTimeDelivery}%</div>
                </div>
                <div>
                  <div className="text-slate-500">Quality</div>
                  <div className="text-slate-900">{supplier.qualityScore}%</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200">
          <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            Add New Supplier
          </Button>
        </div>
      </div>

      {/* Supplier Details */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-slate-900 text-2xl">{selectedSupplier.name}</h2>
                  <Badge 
                    variant="outline"
                    className={
                      selectedSupplier.status === 'Approved'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }
                  >
                    {selectedSupplier.status}
                  </Badge>
                </div>
                <p className="text-slate-600">{selectedSupplier.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Scorecard */}
          <div className="grid grid-cols-4 gap-6">
            <Card className="p-6 border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-slate-600">Rating</span>
              </div>
              <div className="text-2xl text-slate-900 mb-1">{selectedSupplier.rating}</div>
              <div className="text-xs text-slate-500">out of 5.0</div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="text-sm text-slate-600 mb-2">On-Time Delivery</div>
              <div className="text-2xl text-slate-900 mb-1">{selectedSupplier.onTimeDelivery}%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +2.1%
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Quality Score</div>
              <div className="text-2xl text-slate-900 mb-1">{selectedSupplier.qualityScore}%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +1.5%
              </div>
            </Card>

            <Card className="p-6 border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Total Orders</div>
              <div className="text-2xl text-slate-900 mb-1">{selectedSupplier.totalOrders.toLocaleString()}</div>
              <div className="text-xs text-slate-500">All time</div>
            </Card>
          </div>

          {/* Tabs */}
          <Card className="border-slate-200">
            <Tabs defaultValue="documents" className="w-full">
              <div className="border-b border-slate-200 px-6">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="contracts">Contracts</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="documents" className="p-6">
                <div className="space-y-3">
                  {selectedSupplier.documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-violet-600" />
                        <div>
                          <div className="text-slate-900">{doc}</div>
                          <div className="text-sm text-slate-500">Last updated: Oct 2025</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="contracts" className="p-6">
                <div className="text-center py-8 text-slate-500">
                  {selectedSupplier.activeContracts} active contracts
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-slate-900">ISO 9001 Certified</span>
                    </div>
                    <span className="text-sm text-green-700">Valid until Dec 2026</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600" />
                      <span className="text-slate-900">GDPR Compliant</span>
                    </div>
                    <span className="text-sm text-green-700">Verified</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">Average Lead Time</div>
                    <div className="text-2xl text-slate-900">14 days</div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50">
                    <div className="text-sm text-slate-600 mb-1">Defect Rate</div>
                    <div className="text-2xl text-slate-900">0.8%</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
