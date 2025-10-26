import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, Package, Clock } from 'lucide-react';

const recipes = [
  {
    id: 'RCP-001',
    name: 'Product A - Standard',
    outputQty: 100,
    outputUnit: 'units',
    productionTime: 4,
    materials: [
      { id: 'RM-4521', name: 'Steel Grade A', qty: 50, unit: 'kg' },
      { id: 'RM-4523', name: 'Polymer Resin', qty: 15, unit: 'L' },
    ],
  },
  {
    id: 'RCP-002',
    name: 'Product B - Premium',
    outputQty: 50,
    outputUnit: 'units',
    productionTime: 6,
    materials: [
      { id: 'RM-4522', name: 'Aluminum Alloy', qty: 30, unit: 'kg' },
      { id: 'RM-4524', name: 'Copper Wire', qty: 10, unit: 'kg' },
      { id: 'RM-4523', name: 'Polymer Resin', qty: 20, unit: 'L' },
    ],
  },
];

export function RecipesView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-slate-900">Recipes (BOM)</h1>
        <p className="text-slate-600 mt-1">Bill of Materials for finished products</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="p-6 border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900 text-xl mb-1">{recipe.name}</h3>
                <p className="text-sm text-slate-600">{recipe.id}</p>
              </div>
              <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                Active
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <Package className="w-4 h-4" />
                  Output
                </div>
                <div className="text-slate-900">
                  {recipe.outputQty} {recipe.outputUnit}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <Clock className="w-4 h-4" />
                  Time
                </div>
                <div className="text-slate-900">{recipe.productionTime} hours</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                  <BookOpen className="w-4 h-4" />
                  Materials
                </div>
                <div className="text-slate-900">{recipe.materials.length}</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-600 mb-3">Required Materials:</div>
              <div className="space-y-2">
                {recipe.materials.map((material) => (
                  <div 
                    key={material.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                  >
                    <div>
                      <div className="text-sm text-slate-900">{material.name}</div>
                      <div className="text-xs text-slate-500">{material.id}</div>
                    </div>
                    <div className="text-sm text-slate-700">
                      {material.qty} {material.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
