import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PackageCheck, Camera, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const receipts = [
  {
    id: 'IR-3291',
    poId: 'PO-5830',
    date: '2025-10-25',
    inspector: 'Sarah Johnson',
    status: 'Approved',
    items: 256,
    inspectionPhotos: 3,
    aiConfidence: 98,
    defectsFound: 0,
  },
  {
    id: 'IR-3290',
    poId: 'PO-5829',
    date: '2025-10-24',
    inspector: 'Mike Davis',
    status: 'Approved',
    items: 178,
    inspectionPhotos: 2,
    aiConfidence: 95,
    defectsFound: 0,
  },
  {
    id: 'IR-3289',
    poId: 'PO-5828',
    date: '2025-10-22',
    inspector: 'Lisa Anderson',
    status: 'Rejected',
    items: 45,
    inspectionPhotos: 4,
    aiConfidence: 92,
    defectsFound: 3,
  },
];

export function InboundReceiptsView() {
  const [selectedReceipt, setSelectedReceipt] = useState(receipts[0]);

  return (
    <div className="h-full flex">
      {/* List */}
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-slate-900 mb-1">Inbound Receipts</h1>
          <p className="text-sm text-slate-600">AI Visual Inspection & Traceability</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {receipts.map((receipt) => (
            <button
              key={receipt.id}
              onClick={() => setSelectedReceipt(receipt)}
              className={`w-full p-4 rounded-lg border text-left transition-all ${
                selectedReceipt.id === receipt.id
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-900">{receipt.id}</span>
                <Badge 
                  variant="outline"
                  className={
                    receipt.status === 'Approved'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-red-50 text-red-700 border-red-200'
                  }
                >
                  {receipt.status}
                </Badge>
              </div>
              <div className="text-sm text-slate-600 mb-2">PO: {receipt.poId}</div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  {receipt.inspectionPhotos} photos
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  AI: {receipt.aiConfidence}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-slate-900 text-2xl mb-1">{selectedReceipt.id}</h2>
                <p className="text-slate-600">PO: {selectedReceipt.poId}</p>
              </div>
              <Badge 
                variant="outline"
                className={
                  selectedReceipt.status === 'Approved'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }
              >
                {selectedReceipt.status}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-slate-600 mb-1">Inspector</div>
                <div className="text-slate-900">{selectedReceipt.inspector}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Date</div>
                <div className="text-slate-900">{new Date(selectedReceipt.date).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Items Received</div>
                <div className="text-slate-900">{selectedReceipt.items}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Defects Found</div>
                <div className={selectedReceipt.defectsFound > 0 ? 'text-red-600' : 'text-green-600'}>
                  {selectedReceipt.defectsFound}
                </div>
              </div>
            </div>
          </Card>

          {/* AI Inspection */}
          <Card className="p-6 border-slate-200">
            <div className="mb-4">
              <h3 className="text-slate-900">AI Visual Inspection</h3>
              <p className="text-sm text-slate-600 mt-1">Automated quality control</p>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-700">AI Confidence Score</span>
                <span className="text-slate-900">{selectedReceipt.aiConfidence}%</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  style={{ width: `${selectedReceipt.aiConfidence}%` }}
                />
              </div>
            </div>

            {selectedReceipt.status === 'Approved' ? (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-slate-900">Inspection Passed</div>
                  <p className="text-sm text-slate-600">No defects detected by AI analysis</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-slate-900">Inspection Failed</div>
                  <p className="text-sm text-slate-600">{selectedReceipt.defectsFound} defects detected</p>
                </div>
              </div>
            )}
          </Card>

          {/* Inspection Photos */}
          <Card className="p-6 border-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-slate-900">Inspection Photos</h3>
                <p className="text-sm text-slate-600 mt-1">{selectedReceipt.inspectionPhotos} images captured</p>
              </div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Add Photos
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: selectedReceipt.inspectionPhotos }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-400" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
