import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  QrCode,
  MapPin,
  Calendar,
  User,
  Package,
  Leaf,
  Award,
  Heart,
  TreeDeciduous,
  Sparkles,
  Share2,
  Download,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProvenanceData {
  productId: string;
  productName: string;
  sku: string;
  batchNumber: string;
  productionDate: string;
  expiryDate: string;
  
  // Origin Story
  origin: {
    makery: string;
    city: string;
    state: string;
    country: string;
    craftedBy: string;
    craftedDate: string;
  };
  
  // Ingredients
  ingredients: {
    name: string;
    origin: string;
    supplier: string;
    certifications: string[];
    percentage?: number;
  }[];
  
  // Sustainability
  sustainability: {
    carbonFootprint: string;
    waterUsage: string;
    recyclablePackaging: boolean;
    biodegradable: boolean;
    crueltyfree: boolean;
    vegan: boolean;
    localSourcing: boolean;
    milesFromSource: number;
  };
  
  // Story
  story: {
    headline: string;
    description: string;
    highlights: string[];
  };
  
  // Certifications
  certifications: {
    name: string;
    icon: string;
    verified: boolean;
  }[];
}

const mockProvenanceData: ProvenanceData = {
  productId: 'P-001',
  productName: 'Lavender Dream Soap',
  sku: 'LDS-001',
  batchNumber: 'BATCH-7264K',
  productionDate: '2025-10-20',
  expiryDate: '2026-10-20',
  
  origin: {
    makery: 'Buff City Soap - Downtown Austin',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    craftedBy: 'Sarah Martinez',
    craftedDate: '2025-10-20 09:30 AM',
  },
  
  ingredients: [
    {
      name: 'Organic Coconut Oil',
      origin: 'Koh Samui, Thailand',
      supplier: 'Natural Oils International',
      certifications: ['USDA Organic', 'Fair Trade'],
      percentage: 40,
    },
    {
      name: 'Organic Shea Butter',
      origin: 'Burkina Faso, West Africa',
      supplier: 'African Fair Trade Co-op',
      certifications: ['Fair Trade', 'Organic'],
      percentage: 25,
    },
    {
      name: 'Lavender Essential Oil',
      origin: 'Provence, France',
      supplier: 'Essential Botanicals Ltd',
      certifications: ['EU Organic', 'Cruelty Free'],
      percentage: 10,
    },
    {
      name: 'Plant-Based Glycerin',
      origin: 'California, USA',
      supplier: 'Green Chemistry USA',
      certifications: ['Vegan', 'Sustainable'],
      percentage: 15,
    },
    {
      name: 'Natural Purple Mica',
      origin: 'North Carolina, USA',
      supplier: 'Earth Pigments',
      certifications: ['Cruelty Free'],
      percentage: 5,
    },
  ],
  
  sustainability: {
    carbonFootprint: '0.8 kg CO₂',
    waterUsage: '2.1 liters',
    recyclablePackaging: true,
    biodegradable: true,
    crueltyfree: true,
    vegan: true,
    localSourcing: false,
    milesFromSource: 8420,
  },
  
  story: {
    headline: 'Handcrafted with Love in Austin, Texas',
    description: 'This Lavender Dream soap was lovingly made by Sarah at our Downtown Austin Soap Makery on October 20th, 2025. We use only the finest organic ingredients sourced from ethical suppliers around the world.',
    highlights: [
      'Made fresh daily in small batches',
      'No harsh chemicals or synthetic fragrances',
      'Sustainably sourced ingredients from 4 countries',
      'Supports fair trade communities',
      'Biodegradable and eco-friendly',
    ],
  },
  
  certifications: [
    { name: 'USDA Organic', icon: 'organic', verified: true },
    { name: 'Cruelty Free', icon: 'bunny', verified: true },
    { name: 'Vegan', icon: 'leaf', verified: true },
    { name: 'Fair Trade', icon: 'heart', verified: true },
    { name: 'Biodegradable', icon: 'eco', verified: true },
  ],
};

export function ProvenanceQRView() {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6 py-8">
        {/* Hero Card */}
        <Card className="p-8 border-2 border-violet-200 bg-white/90 backdrop-blur">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {mockProvenanceData.productName}
              </h1>
              <p className="text-lg text-slate-600">
                {mockProvenanceData.story.headline}
              </p>
            </div>
            
            {/* Certifications */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {mockProvenanceData.certifications.map((cert, idx) => (
                <Badge
                  key={idx}
                  className="bg-green-100 text-green-800 border-green-300 px-3 py-1"
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {cert.name}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Story Card */}
        <Card className="p-6 border-slate-200 bg-white/90 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-600" />
              Our Story
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {mockProvenanceData.story.description}
            </p>
            
            <div className="space-y-2">
              {mockProvenanceData.story.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Origin Card */}
        <Card className="p-6 border-slate-200 bg-white/90 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-violet-600" />
              Where It Was Made
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-500">Crafted At</div>
                <div className="font-medium text-slate-900">
                  {mockProvenanceData.origin.makery}
                </div>
                <div className="text-sm text-slate-600">
                  {mockProvenanceData.origin.city}, {mockProvenanceData.origin.state}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-slate-500">Crafted By</div>
                <div className="font-medium text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-600" />
                  {mockProvenanceData.origin.craftedBy}
                </div>
                <div className="text-sm text-slate-600">
                  {new Date(mockProvenanceData.origin.craftedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-violet-600" />
                <div>
                  <div className="text-sm font-medium text-violet-900">
                    Made Fresh: {new Date(mockProvenanceData.productionDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-violet-700">
                    Best by: {new Date(mockProvenanceData.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Ingredients Journey */}
        <Card className="p-6 border-slate-200 bg-white/90 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <TreeDeciduous className="w-5 h-5 text-violet-600" />
              Ingredient Journey
            </h2>
            <p className="text-sm text-slate-600">
              Every ingredient traced from source to soap
            </p>

            <div className="space-y-3">
              {mockProvenanceData.ingredients.map((ingredient, idx) => (
                <Card key={idx} className="p-4 border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-slate-900 flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600" />
                        {ingredient.name}
                        {ingredient.percentage && (
                          <Badge variant="outline" className="text-xs">
                            {ingredient.percentage}%
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {ingredient.origin}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 mb-2">
                    Supplier: {ingredient.supplier}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ingredient.certifications.map((cert, certIdx) => (
                      <Badge
                        key={certIdx}
                        className="bg-green-100 text-green-700 border-green-200 text-xs"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-blue-900">
                    Global Sourcing Journey
                  </div>
                  <div className="text-xs text-blue-700 mt-1">
                    Ingredients traveled approximately {mockProvenanceData.sustainability.milesFromSource.toLocaleString()} miles from 4 countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Sustainability Impact */}
        <Card className="p-6 border-slate-200 bg-white/90 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-violet-600" />
              Sustainability Impact
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-xs text-green-700 mb-1">Carbon Footprint</div>
                <div className="text-lg font-semibold text-green-900">
                  {mockProvenanceData.sustainability.carbonFootprint}
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs text-blue-700 mb-1">Water Usage</div>
                <div className="text-lg font-semibold text-blue-900">
                  {mockProvenanceData.sustainability.waterUsage}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Recyclable Packaging', value: mockProvenanceData.sustainability.recyclablePackaging },
                { label: 'Biodegradable', value: mockProvenanceData.sustainability.biodegradable },
                { label: 'Cruelty Free', value: mockProvenanceData.sustainability.crueltyfree },
                { label: 'Vegan', value: mockProvenanceData.sustainability.vegan },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                  {item.value ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                  )}
                  <span className="text-sm text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Batch Information */}
        <Card className="p-6 border-slate-200 bg-white/90 backdrop-blur">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-600" />
              Product Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500">Product ID</div>
                <div className="text-sm font-mono text-slate-900">{mockProvenanceData.productId}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">SKU</div>
                <div className="text-sm font-mono text-slate-900">{mockProvenanceData.sku}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Batch Number</div>
                <div className="text-sm font-mono text-slate-900">{mockProvenanceData.batchNumber}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Production Date</div>
                <div className="text-sm text-slate-900">
                  {new Date(mockProvenanceData.productionDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Share Actions */}
        <div className="flex items-center gap-3">
          <Button className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share This Story
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Save Report
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center p-4">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mb-2">
            <QrCode className="w-4 h-4" />
            <span>Verified Provenance Report</span>
          </div>
          <div className="text-xs text-slate-500">
            Powered by TraceRight Universal Trace Cloud
          </div>
        </div>
      </div>
    </div>
  );
}
