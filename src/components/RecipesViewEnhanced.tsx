import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FlaskConical, Users, Calendar, CheckCircle2, AlertTriangle, Eye, FileText, Beaker, Scale, Clock, Thermometer, Shield } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BreadcrumbNav } from './BreadcrumbNav';
import { SmartFilter, FilterOption } from './SmartFilter';
import { DetailModal } from './DetailModal';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  percentage: number;
  function: string;
  supplier?: string;
  specifications?: string;
  allergen?: boolean;
  criticalParameter?: boolean;
}

interface ProcessStep {
  step: number;
  name: string;
  duration: string;
  temperature?: string;
  instructions: string;
  equipmentRequired: string;
  criticalControlPoint: boolean;
  safetyNotes?: string;
}

interface QualityParameter {
  parameter: string;
  specification: string;
  testMethod: string;
  frequency: string;
  acceptanceCriteria: string;
}

interface Recipe {
  id: string;
  recipeCode: string;
  productName: string;
  version: string;
  status: 'Active' | 'Draft' | 'Archived' | 'Under Review';
  category: string;
  batchSize: number;
  batchUnit: string;
  estimatedYield: number;
  yieldUnit: string;
  createdDate: string;
  createdBy: string;
  approvedDate?: string;
  approvedBy?: string;
  lastModified: string;
  modifiedBy: string;
  ingredients: Ingredient[];
  processSteps: ProcessStep[];
  qualityParameters: QualityParameter[];
  allergens: string[];
  shelfLife: number;
  storageConditions: string;
  packagingInstructions: string;
  regulatoryCompliance: string[];
  costPerBatch: number;
  productionTime: string;
  equipmentNeeded: string[];
  skillLevelRequired: 'Basic' | 'Intermediate' | 'Advanced';
  batchHistory: {
    totalBatches: number;
    successRate: number;
    averageYield: number;
    lastProduced: string;
  };
  notes?: string;
  safetyWarnings?: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: 'R-001',
    recipeCode: 'RECIPE-LAV-001',
    productName: 'Lavender Dream Soap',
    version: '3.2',
    status: 'Active',
    category: 'Cold Process Soap',
    batchSize: 1000,
    batchUnit: 'bars',
    estimatedYield: 985,
    yieldUnit: 'bars',
    createdDate: '2023-01-15',
    createdBy: 'Dr. Emily Chen - R&D Manager',
    approvedDate: '2024-09-15',
    approvedBy: 'Sarah Johnson - Production Director',
    lastModified: '2024-09-15',
    modifiedBy: 'Dr. Emily Chen',
    ingredients: [
      {
        id: 'ING-001',
        name: 'Organic Coconut Oil',
        quantity: 250,
        unit: 'kg',
        percentage: 50,
        function: 'Base oil - Creates lather and hardness',
        supplier: 'Natural Oils Inc',
        specifications: 'Virgin, Organic certified, Melting point: 24°C',
        allergen: true,
        criticalParameter: true
      },
      {
        id: 'ING-002',
        name: 'Shea Butter',
        quantity: 150,
        unit: 'kg',
        percentage: 30,
        function: 'Moisturizing agent - Adds creaminess',
        supplier: 'African Butters Co',
        specifications: 'Unrefined, Grade A, Melting point: 32°C',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-003',
        name: 'Lavender Essential Oil',
        quantity: 25,
        unit: 'L',
        percentage: 5,
        function: 'Fragrance and therapeutic properties',
        supplier: 'French Aromatics Ltd',
        specifications: 'Pure Lavandula angustifolia, GC/MS tested',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-004',
        name: 'Food Grade Sodium Hydroxide (Lye)',
        quantity: 50,
        unit: 'kg',
        percentage: 10,
        function: 'Saponification agent',
        supplier: 'Chemical Supply Corp',
        specifications: '98% purity min, Food grade certified',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-005',
        name: 'Distilled Water',
        quantity: 25,
        unit: 'L',
        percentage: 5,
        function: 'Lye solution preparation',
        specifications: 'Distilled, pH neutral',
        allergen: false,
        criticalParameter: true
      }
    ],
    processSteps: [
      {
        step: 1,
        name: 'Material Preparation and Weighing',
        duration: '30 minutes',
        instructions: 'Weigh all oils and butters according to recipe. Verify weights against specifications. Ensure all materials are at room temperature (20-25°C).',
        equipmentRequired: 'Digital scale (±0.1g accuracy), Stainless steel containers',
        criticalControlPoint: true,
        safetyNotes: 'Verify all materials against COAs before use'
      },
      {
        step: 2,
        name: 'Oil Phase Heating',
        duration: '45 minutes',
        temperature: '38-42°C',
        instructions: 'Combine coconut oil and shea butter in heating tank. Heat gently to 38-42°C while stirring. Do not exceed 45°C.',
        equipmentRequired: 'Heating Tank-A, Thermometer, Stirrer',
        criticalControlPoint: true,
        safetyNotes: 'Monitor temperature continuously. Do not leave heating tank unattended.'
      },
      {
        step: 3,
        name: 'Lye Solution Preparation',
        duration: '30 minutes',
        temperature: 'Cool to 38°C',
        instructions: 'SLOWLY add sodium hydroxide to distilled water (NEVER water to lye). Stir until completely dissolved. Allow to cool to 38°C in ventilated area.',
        equipmentRequired: 'Mixing Tank-B, Heat-resistant container, Thermometer',
        criticalControlPoint: true,
        safetyNotes: 'CRITICAL: Wear full PPE (goggles, gloves, apron). Work in well-ventilated area. Have neutralizing solution available.'
      },
      {
        step: 4,
        name: 'Combining Oil and Lye',
        duration: '5 minutes',
        temperature: '38-40°C',
        instructions: 'Ensure both oil phase and lye solution are at 38-40°C. Slowly pour lye solution into oil mixture while stirring.',
        equipmentRequired: 'Mixer-01, Thermometer',
        criticalControlPoint: true,
        safetyNotes: 'Both phases must be within 2°C of each other'
      },
      {
        step: 5,
        name: 'Saponification (Mixing to Trace)',
        duration: '60-90 minutes',
        temperature: '40°C',
        instructions: 'Mix continuously using immersion blender. Check for "trace" (mixture thickens like pudding). Typical trace time: 75 minutes.',
        equipmentRequired: 'Mixer-01, Immersion blender',
        criticalControlPoint: true,
        safetyNotes: 'Check temperature every 15 minutes'
      },
      {
        step: 6,
        name: 'Essential Oil Addition',
        duration: '15 minutes',
        temperature: '38°C',
        instructions: 'Once trace is achieved, add lavender essential oil. Mix thoroughly for 10 minutes to ensure even distribution.',
        equipmentRequired: 'Mixer-01',
        criticalControlPoint: true
      },
      {
        step: 7,
        name: 'Molding',
        duration: '60 minutes',
        temperature: 'Ambient',
        instructions: 'Pour soap mixture into molds. Tap molds to remove air bubbles. Smooth surface with spatula. Cover molds with plastic wrap.',
        equipmentRequired: 'Mold-Station-03, Spatulas',
        criticalControlPoint: false
      },
      {
        step: 8,
        name: 'Initial Curing (Saponification Completion)',
        duration: '48 hours',
        temperature: '20-25°C',
        instructions: 'Allow soap to remain in molds for 48 hours. Do not disturb. Saponification will complete during this time.',
        equipmentRequired: 'Curing-Rack-A1',
        criticalControlPoint: false,
        safetyNotes: 'Do not handle during this period - lye may still be active'
      },
      {
        step: 9,
        name: 'Unmolding and Cutting',
        duration: '2 hours',
        instructions: 'After 48 hours, remove soap from molds. Cut into individual bars using wire cutter. Handle with gloves.',
        equipmentRequired: 'Cutting-Station-02, Wire cutter, Gloves',
        criticalControlPoint: false
      },
      {
        step: 10,
        name: 'Final Curing',
        duration: '28 days',
        temperature: '20-25°C',
        instructions: 'Place cut bars on curing racks with adequate spacing. Turn bars every 7 days. Cure for minimum 28 days (4 weeks).',
        equipmentRequired: 'Curing-Rack-A1',
        criticalControlPoint: true,
        safetyNotes: 'Ensure adequate air circulation. Monitor for mold growth.'
      }
    ],
    qualityParameters: [
      {
        parameter: 'pH Level (final product)',
        specification: '9.5 - 10.5',
        testMethod: 'pH meter or test strips',
        frequency: 'Every batch after curing',
        acceptanceCriteria: 'Must be within range. If >10.5, extend curing time.'
      },
      {
        parameter: 'Hardness',
        specification: 'Firm, no soft spots',
        testMethod: 'Visual and tactile inspection',
        frequency: 'After 48-hour cure',
        acceptanceCriteria: 'Should not dent under light finger pressure'
      },
      {
        parameter: 'Color',
        specification: 'Creamy white to light beige, uniform',
        testMethod: 'Visual inspection against standard',
        frequency: 'Every bar during cutting',
        acceptanceCriteria: 'No discoloration, streaking, or separation'
      },
      {
        parameter: 'Aroma',
        specification: 'Distinct lavender scent',
        testMethod: 'Sensory evaluation',
        frequency: 'Sample from each batch',
        acceptanceCriteria: 'Lavender aroma detectable, no off-odors'
      },
      {
        parameter: 'Weight',
        specification: '100g ± 5g per bar',
        testMethod: 'Digital scale',
        frequency: 'Random sampling (10% of batch)',
        acceptanceCriteria: 'Must be 95-105g'
      }
    ],
    allergens: ['Coconut', 'Tree Nuts (Shea)'],
    shelfLife: 730,
    storageConditions: 'Cool, dry place. Temperature: 15-25°C. Relative humidity: <60%. Protect from direct sunlight.',
    packagingInstructions: 'Wrap each bar in biodegradable paper wrapper. Pack 12 bars per cardboard box. Label with batch number, production date, and expiry date.',
    regulatoryCompliance: ['FDA CPSC', 'EU Cosmetics Regulation 1223/2009', 'USDA Organic', 'Fair Trade Certified'],
    costPerBatch: 2450.00,
    productionTime: '32 days (4 days active, 28 days curing)',
    equipmentNeeded: ['Heating Tank-A', 'Mixing Tank-B', 'Mixer-01', 'Mold-Station-03', 'Cutting-Station-02', 'Curing-Rack-A1'],
    skillLevelRequired: 'Intermediate',
    batchHistory: {
      totalBatches: 156,
      successRate: 98.7,
      averageYield: 98.2,
      lastProduced: '2024-10-20'
    },
    notes: 'Most popular product. Customer feedback consistently excellent. Version 3.2 improved yield by 2% through optimized temperature control.',
    safetyWarnings: [
      'Sodium hydroxide (lye) is highly caustic - always add lye to water, never water to lye',
      'Wear full PPE when handling lye and fresh soap batter',
      'Work in well-ventilated area during lye mixing',
      'Keep neutralizing solution (vinegar) readily available',
      'Do not handle soap bars until after 48-hour initial cure'
    ]
  },
  {
    id: 'R-002',
    recipeCode: 'RECIPE-VAN-002',
    productName: 'Vanilla Bliss Soap',
    version: '2.1',
    status: 'Active',
    category: 'Cold Process Soap',
    batchSize: 800,
    batchUnit: 'bars',
    estimatedYield: 780,
    yieldUnit: 'bars',
    createdDate: '2023-03-20',
    createdBy: 'Dr. Emily Chen - R&D Manager',
    approvedDate: '2024-08-10',
    approvedBy: 'Sarah Johnson - Production Director',
    lastModified: '2024-08-10',
    modifiedBy: 'Dr. Emily Chen',
    ingredients: [
      {
        id: 'ING-006',
        name: 'Organic Coconut Oil',
        quantity: 200,
        unit: 'kg',
        percentage: 45,
        function: 'Base oil',
        allergen: true,
        criticalParameter: true
      },
      {
        id: 'ING-007',
        name: 'Cocoa Butter',
        quantity: 120,
        unit: 'kg',
        percentage: 30,
        function: 'Moisturizing and hardness',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-008',
        name: 'Vanilla Extract',
        quantity: 15,
        unit: 'L',
        percentage: 4,
        function: 'Fragrance',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-009',
        name: 'Food Grade Sodium Hydroxide',
        quantity: 65,
        unit: 'kg',
        percentage: 16,
        function: 'Saponification',
        allergen: false,
        criticalParameter: true
      },
      {
        id: 'ING-010',
        name: 'Distilled Water',
        quantity: 20,
        unit: 'L',
        percentage: 5,
        function: 'Lye solution',
        allergen: false,
        criticalParameter: true
      }
    ],
    processSteps: [
      {
        step: 1,
        name: 'Material Preparation',
        duration: '30 minutes',
        instructions: 'Weigh all ingredients according to specifications.',
        equipmentRequired: 'Digital scale, Containers',
        criticalControlPoint: true
      },
      {
        step: 2,
        name: 'Saponification',
        duration: '90 minutes',
        temperature: '42°C',
        instructions: 'Mix oils and lye solution. Blend until trace achieved.',
        equipmentRequired: 'Mixer-02',
        criticalControlPoint: true,
        safetyNotes: 'Monitor temperature continuously'
      }
    ],
    qualityParameters: [
      {
        parameter: 'pH Level',
        specification: '9.5 - 10.5',
        testMethod: 'pH meter',
        frequency: 'Every batch',
        acceptanceCriteria: 'Within specification range'
      },
      {
        parameter: 'Aroma',
        specification: 'Rich vanilla scent',
        testMethod: 'Sensory evaluation',
        frequency: 'Every batch',
        acceptanceCriteria: 'Strong vanilla, no off-odors'
      }
    ],
    allergens: ['Coconut'],
    shelfLife: 730,
    storageConditions: 'Cool, dry place. 15-25°C, <60% RH',
    packagingInstructions: 'Individual wrapper, 12-unit boxes',
    regulatoryCompliance: ['FDA CPSC', 'EU Cosmetics Regulation'],
    costPerBatch: 1980.00,
    productionTime: '32 days',
    equipmentNeeded: ['Mixer-02', 'Mold-Station-04', 'Curing-Rack-A2'],
    skillLevelRequired: 'Intermediate',
    batchHistory: {
      totalBatches: 98,
      successRate: 97.5,
      averageYield: 97.0,
      lastProduced: '2024-10-21'
    },
    notes: 'Seasonal favorite during holidays. Vanilla extract can cause slight browning - normal and expected.',
    safetyWarnings: [
      'Sodium hydroxide is caustic - use full PPE',
      'Work in ventilated area'
    ]
  },
  {
    id: 'R-003',
    recipeCode: 'RECIPE-EUC-003',
    productName: 'Eucalyptus Fresh Soap',
    version: '1.5',
    status: 'Active',
    category: 'Cold Process Soap',
    batchSize: 1200,
    batchUnit: 'bars',
    estimatedYield: 1175,
    yieldUnit: 'bars',
    createdDate: '2023-06-10',
    createdBy: 'Dr. Emily Chen - R&D Manager',
    approvedDate: '2024-07-20',
    approvedBy: 'Sarah Johnson - Production Director',
    lastModified: '2024-07-20',
    modifiedBy: 'Dr. Emily Chen',
    ingredients: [
      {
        id: 'ING-011',
        name: 'Organic Coconut Oil',
        quantity: 300,
        unit: 'kg',
        percentage: 55,
        function: 'Base oil',
        allergen: true,
        criticalParameter: true
      },
      {
        id: 'ING-012',
        name: 'Eucalyptus Essential Oil',
        quantity: 30,
        unit: 'L',
        percentage: 6,
        function: 'Therapeutic fragrance',
        allergen: false,
        criticalParameter: true
      }
    ],
    processSteps: [
      {
        step: 1,
        name: 'Material Preparation',
        duration: '30 minutes',
        instructions: 'Prepare all materials',
        equipmentRequired: 'Weighing Station',
        criticalControlPoint: true
      }
    ],
    qualityParameters: [
      {
        parameter: 'pH Level',
        specification: '9.5 - 10.5',
        testMethod: 'pH meter',
        frequency: 'Every batch',
        acceptanceCriteria: 'Within range'
      }
    ],
    allergens: ['Coconut'],
    shelfLife: 730,
    storageConditions: 'Cool, dry, 15-25°C',
    packagingInstructions: 'Standard packaging',
    regulatoryCompliance: ['FDA CPSC'],
    costPerBatch: 2850.00,
    productionTime: '32 days',
    equipmentNeeded: ['Mixer-03', 'Mold-Station-05'],
    skillLevelRequired: 'Intermediate',
    batchHistory: {
      totalBatches: 72,
      successRate: 98.6,
      averageYield: 97.9,
      lastProduced: '2024-10-30'
    },
    notes: 'Strong eucalyptus scent - very popular in winter months'
  },
  {
    id: 'R-004',
    recipeCode: 'RECIPE-ROSE-004',
    productName: 'Rose Garden Luxury Soap',
    version: '1.0',
    status: 'Under Review',
    category: 'Cold Process Soap',
    batchSize: 500,
    batchUnit: 'bars',
    estimatedYield: 485,
    yieldUnit: 'bars',
    createdDate: '2024-10-15',
    createdBy: 'Dr. Emily Chen - R&D Manager',
    lastModified: '2024-10-25',
    modifiedBy: 'Dr. Emily Chen',
    ingredients: [
      {
        id: 'ING-013',
        name: 'Rose Essential Oil',
        quantity: 10,
        unit: 'L',
        percentage: 8,
        function: 'Premium fragrance',
        allergen: false,
        criticalParameter: true
      }
    ],
    processSteps: [],
    qualityParameters: [],
    allergens: [],
    shelfLife: 730,
    storageConditions: 'Cool, dry place',
    packagingInstructions: 'Premium packaging',
    regulatoryCompliance: [],
    costPerBatch: 3500.00,
    productionTime: '32 days',
    equipmentNeeded: ['Mixer-01'],
    skillLevelRequired: 'Advanced',
    batchHistory: {
      totalBatches: 0,
      successRate: 0,
      averageYield: 0,
      lastProduced: 'Never'
    },
    notes: 'New luxury product line. Awaiting final approval from QA and regulatory.'
  }
];

interface RecipesViewEnhancedProps {
  onNavigate?: (view: string) => void;
}

export function RecipesViewEnhanced({ onNavigate }: RecipesViewEnhancedProps = {}) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filteredData, setFilteredData] = useState<Recipe[]>(mockRecipes);

  const filterOptions: FilterOption[] = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'Active', label: 'Active' },
        { value: 'Draft', label: 'Draft' },
        { value: 'Under Review', label: 'Under Review' },
        { value: 'Archived', label: 'Archived' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'Cold Process Soap', label: 'Cold Process Soap' },
        { value: 'Hot Process Soap', label: 'Hot Process Soap' },
        { value: 'Melt & Pour', label: 'Melt & Pour' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'skillLevel',
      label: 'Skill Level',
      type: 'select',
      options: [
        { value: 'all', label: 'All Levels' },
        { value: 'Basic', label: 'Basic' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' }
      ],
      defaultValue: 'all'
    },
    {
      id: 'search',
      label: 'Search',
      type: 'text',
      placeholder: 'Recipe code, product name...'
    }
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    let filtered = [...mockRecipes];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(recipe => recipe.status === filters.status);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === filters.category);
    }

    if (filters.skillLevel && filters.skillLevel !== 'all') {
      filtered = filtered.filter(recipe => recipe.skillLevelRequired === filters.skillLevel);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.recipeCode.toLowerCase().includes(searchLower) ||
        recipe.productName.toLowerCase().includes(searchLower)
      );
    }

    setFilteredData(filtered);
  };

  const getStatusBadge = (status: Recipe['status']) => {
    const variants = {
      'Active': 'default',
      'Draft': 'secondary',
      'Archived': 'outline',
      'Under Review': 'outline'
    };

    return <Badge variant={variants[status] as any}>{status}</Badge>;
  };

  const renderOverviewTab = (recipe: Recipe) => (
    <div className="space-y-6">
      {/* WHO */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Users className="w-5 h-5" />
          WHO - Development & Approval
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Created By</p>
            <p>{recipe.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Created Date</p>
            <p>{new Date(recipe.createdDate).toLocaleDateString()}</p>
          </div>
          {recipe.approvedBy && (
            <>
              <div>
                <p className="text-sm text-slate-500">Approved By</p>
                <p>{recipe.approvedBy}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Approved Date</p>
                <p>{recipe.approvedDate ? new Date(recipe.approvedDate).toLocaleDateString() : 'N/A'}</p>
              </div>
            </>
          )}
          <div>
            <p className="text-sm text-slate-500">Last Modified By</p>
            <p>{recipe.modifiedBy}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Last Modified</p>
            <p>{new Date(recipe.lastModified).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* WHAT */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <FlaskConical className="w-5 h-5" />
          WHAT - Recipe Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Product Name</p>
            <p>{recipe.productName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Recipe Code</p>
            <p>{recipe.recipeCode}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Version</p>
            <Badge variant="outline">v{recipe.version}</Badge>
          </div>
          <div>
            <p className="text-sm text-slate-500">Category</p>
            <p>{recipe.category}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Batch Size</p>
            <p>{recipe.batchSize} {recipe.batchUnit}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Estimated Yield</p>
            <p className="text-green-600">{recipe.estimatedYield} {recipe.yieldUnit} ({Math.round(recipe.estimatedYield / recipe.batchSize * 100)}%)</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Cost Per Batch</p>
            <p>${recipe.costPerBatch.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Cost Per Unit</p>
            <p>${(recipe.costPerBatch / recipe.estimatedYield).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Production Info */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Clock className="w-5 h-5" />
          Production Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Production Time</p>
            <p>{recipe.productionTime}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Skill Level Required</p>
            <Badge variant={recipe.skillLevelRequired === 'Advanced' ? 'destructive' : 'secondary'}>
              {recipe.skillLevelRequired}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-slate-500">Shelf Life</p>
            <p>{recipe.shelfLife} days ({Math.floor(recipe.shelfLife / 365)} years)</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Storage Conditions</p>
            <p className="text-sm">{recipe.storageConditions}</p>
          </div>
        </div>
      </div>

      {/* Equipment */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Beaker className="w-5 h-5" />
          Equipment Needed
        </h3>
        <div className="flex flex-wrap gap-2">
          {recipe.equipmentNeeded.map((eq, idx) => (
            <Badge key={idx} variant="outline">{eq}</Badge>
          ))}
        </div>
      </div>

      {/* Allergens & Compliance */}
      <div>
        <h3 className="flex items-center gap-2 mb-3 text-purple-700">
          <Shield className="w-5 h-5" />
          Allergens & Compliance
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-500">Allergens</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {recipe.allergens.length > 0 ? (
                recipe.allergens.map((allergen, idx) => (
                  <Badge key={idx} variant="destructive">{allergen}</Badge>
                ))
              ) : (
                <Badge variant="outline">No known allergens</Badge>
              )}
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Regulatory Compliance</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {recipe.regulatoryCompliance.map((reg, idx) => (
                <Badge key={idx} variant="secondary">{reg}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Warnings */}
      {(recipe.notes || recipe.safetyWarnings) && (
        <div>
          <h3 className="flex items-center gap-2 mb-3 text-purple-700">
            <FileText className="w-5 h-5" />
            Notes & Safety
          </h3>
          {recipe.notes && (
            <div className="mb-3">
              <p className="text-sm text-slate-500">Notes</p>
              <p className="text-sm">{recipe.notes}</p>
            </div>
          )}
          {recipe.safetyWarnings && recipe.safetyWarnings.length > 0 && (
            <div>
              <p className="text-sm text-slate-500 mb-2">Safety Warnings</p>
              <div className="space-y-2">
                {recipe.safetyWarnings.map((warning, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderIngredientsTab = (recipe: Recipe) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <FlaskConical className="w-5 h-5" />
        Ingredients ({recipe.ingredients.length})
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingredient</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>%</TableHead>
            <TableHead>Function</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Specifications</TableHead>
            <TableHead>Flags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipe.ingredients.map((ing) => (
            <TableRow key={ing.id}>
              <TableCell>{ing.name}</TableCell>
              <TableCell>{ing.quantity} {ing.unit}</TableCell>
              <TableCell>{ing.percentage}%</TableCell>
              <TableCell className="text-sm">{ing.function}</TableCell>
              <TableCell className="text-sm">{ing.supplier || 'N/A'}</TableCell>
              <TableCell className="text-xs text-slate-600">{ing.specifications || 'N/A'}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {ing.allergen && <Badge variant="destructive" className="text-xs">Allergen</Badge>}
                  {ing.criticalParameter && <Badge variant="outline" className="text-xs">Critical</Badge>}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="bg-slate-50 p-4 rounded">
        <p className="text-sm"><strong>Total Weight:</strong> {recipe.ingredients.reduce((sum, ing) => sum + ing.quantity, 0).toFixed(2)} kg</p>
        <p className="text-sm"><strong>Total Percentage:</strong> {recipe.ingredients.reduce((sum, ing) => sum + ing.percentage, 0)}%</p>
      </div>
    </div>
  );

  const renderProcessTab = (recipe: Recipe) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <Beaker className="w-5 h-5" />
        Process Steps ({recipe.processSteps.length})
      </h3>
      <div className="space-y-3">
        {recipe.processSteps.map((step) => (
          <Card key={step.step} className={`p-4 ${step.criticalControlPoint ? 'border-red-300 border-2' : ''}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Step {step.step}</Badge>
                  {step.criticalControlPoint && <Badge variant="destructive">CCP</Badge>}
                  <h4>{step.name}</h4>
                </div>
                <p className="text-sm text-slate-500 mt-1">Duration: {step.duration}</p>
                {step.temperature && (
                  <p className="text-sm text-orange-600 flex items-center gap-1 mt-1">
                    <Thermometer className="w-4 h-4" />
                    Temperature: {step.temperature}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-slate-500">Instructions:</p>
                <p>{step.instructions}</p>
              </div>
              <div>
                <p className="text-slate-500">Equipment Required:</p>
                <p>{step.equipmentRequired}</p>
              </div>
              {step.safetyNotes && (
                <div className="bg-yellow-50 p-2 rounded flex items-start gap-2 text-yellow-800">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-500">Safety Notes:</p>
                    <p>{step.safetyNotes}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderQualityTab = (recipe: Recipe) => (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-purple-700">
        <CheckCircle2 className="w-5 h-5" />
        Quality Parameters ({recipe.qualityParameters.length})
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parameter</TableHead>
            <TableHead>Specification</TableHead>
            <TableHead>Test Method</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Acceptance Criteria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipe.qualityParameters.map((param, idx) => (
            <TableRow key={idx}>
              <TableCell>{param.parameter}</TableCell>
              <TableCell>{param.specification}</TableCell>
              <TableCell className="text-sm">{param.testMethod}</TableCell>
              <TableCell className="text-sm">{param.frequency}</TableCell>
              <TableCell className="text-sm">{param.acceptanceCriteria}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderHistoryTab = (recipe: Recipe) => (
    <div className="space-y-6">
      <h3 className="flex items-center gap-2 text-purple-700">
        <Calendar className="w-5 h-5" />
        Production History
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-slate-500">Total Batches Produced</p>
          <p className="text-2xl text-purple-600">{recipe.batchHistory.totalBatches}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Success Rate</p>
          <p className="text-2xl text-green-600">{recipe.batchHistory.successRate}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Average Yield</p>
          <p className="text-2xl text-blue-600">{recipe.batchHistory.averageYield}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-slate-500">Last Produced</p>
          <p className="text-sm mt-1">{recipe.batchHistory.lastProduced === 'Never' ? 'Never' : new Date(recipe.batchHistory.lastProduced).toLocaleDateString()}</p>
        </Card>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <h4 className="mb-3">Production Insights</h4>
        <div className="space-y-2 text-sm">
          <p>• This recipe has been successfully produced <strong>{recipe.batchHistory.totalBatches}</strong> times</p>
          <p>• Average yield is <strong>{recipe.batchHistory.averageYield}%</strong> of expected output</p>
          <p>• Success rate is <strong>{recipe.batchHistory.successRate}%</strong></p>
          {recipe.batchHistory.totalBatches > 0 && (
            <p>• Total units produced: <strong>{(recipe.batchHistory.totalBatches * recipe.estimatedYield * recipe.batchHistory.averageYield / 100).toLocaleString()}</strong> {recipe.yieldUnit}</p>
          )}
        </div>
      </div>
    </div>
  );

  const modalTabs = selectedRecipe ? [
    { id: 'overview', label: 'Overview', content: renderOverviewTab(selectedRecipe) },
    { id: 'ingredients', label: `Ingredients (${selectedRecipe.ingredients.length})`, content: renderIngredientsTab(selectedRecipe) },
    { id: 'process', label: `Process (${selectedRecipe.processSteps.length} steps)`, content: renderProcessTab(selectedRecipe) },
    { id: 'quality', label: 'Quality Parameters', content: renderQualityTab(selectedRecipe) },
    { id: 'history', label: 'Production History', content: renderHistoryTab(selectedRecipe) }
  ] : [];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <BreadcrumbNav
        items={[
          { label: 'Production' },
          { label: 'Recipes' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">Product Recipes</h1>
              <p className="text-slate-600">Master formulations and production procedures</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              <FlaskConical className="w-4 h-4 mr-2" />
              Create New Recipe
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
                  <TableHead>Recipe Code</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Batch Size</TableHead>
                  <TableHead>Batches Produced</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((recipe) => (
                  <TableRow key={recipe.id} className="cursor-pointer hover:bg-slate-50">
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-600 hover:text-purple-700"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        {recipe.recipeCode}
                      </Button>
                    </TableCell>
                    <TableCell>{recipe.productName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">v{recipe.version}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(recipe.status)}</TableCell>
                    <TableCell className="text-sm">{recipe.category}</TableCell>
                    <TableCell>{recipe.batchSize} {recipe.batchUnit}</TableCell>
                    <TableCell>{recipe.batchHistory.totalBatches}</TableCell>
                    <TableCell>
                      <span className={recipe.batchHistory.successRate >= 95 ? 'text-green-600' : 'text-orange-600'}>
                        {recipe.batchHistory.successRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRecipe(recipe)}
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
              <p className="text-sm text-slate-500">Total Recipes</p>
              <p className="text-2xl text-purple-600">{mockRecipes.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Active Recipes</p>
              <p className="text-2xl text-green-600">{mockRecipes.filter(r => r.status === 'Active').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Under Review</p>
              <p className="text-2xl text-orange-600">{mockRecipes.filter(r => r.status === 'Under Review').length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-500">Avg Success Rate</p>
              <p className="text-2xl text-blue-600">
                {(mockRecipes.reduce((sum, r) => sum + r.batchHistory.successRate, 0) / mockRecipes.length).toFixed(1)}%
              </p>
            </Card>
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <DetailModal
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          title={`Recipe: ${selectedRecipe.recipeCode}`}
          subtitle={`${selectedRecipe.productName} v${selectedRecipe.version}`}
          tabs={modalTabs}
        />
      )}
    </div>
  );
}
