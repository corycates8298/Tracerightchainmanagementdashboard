import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Upload, FileText, CheckCircle2, Clock, Trash2 } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Supplier Quality SOP v2.1',
    category: 'SOP',
    uploadDate: '2025-10-20',
    size: '2.4 MB',
    status: 'Indexed',
  },
  {
    id: 2,
    name: 'Master Service Agreement - Global Materials',
    category: 'Contract',
    uploadDate: '2025-10-18',
    size: '1.8 MB',
    status: 'Indexed',
  },
  {
    id: 3,
    name: 'ISO 9001 Compliance Guidelines',
    category: 'Compliance',
    uploadDate: '2025-10-15',
    size: '3.2 MB',
    status: 'Indexed',
  },
  {
    id: 4,
    name: 'FDA Regulations - Food Safety',
    category: 'Regulation',
    uploadDate: '2025-10-12',
    size: '5.1 MB',
    status: 'Processing',
  },
];

const categories = ['SOP', 'Contract', 'Compliance', 'Regulation'];

export function GovernanceView() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocs = selectedCategory === 'All' 
    ? documents 
    : documents.filter(d => d.category === selectedCategory);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Governance</h1>
          <p className="text-slate-600 mt-1">Document upload portal for AI Reporting</p>
        </div>
        <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Documents</span>
          </div>
          <div className="text-2xl text-slate-900">47</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Indexed</span>
          </div>
          <div className="text-2xl text-slate-900">44</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Processing</span>
          </div>
          <div className="text-2xl text-slate-900">3</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">This Month</span>
          </div>
          <div className="text-2xl text-slate-900">12</div>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-violet-600 mt-0.5" />
          <div>
            <div className="text-slate-900 mb-1">Upload Documents for AI Analysis</div>
            <p className="text-sm text-slate-700">
              Upload SOPs, contracts, compliance documents, and regulations. The AI Reporting system uses these documents
              to answer natural language questions with RAG (Retrieval-Augmented Generation).
            </p>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2">
        <Button
          variant={selectedCategory === 'All' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('All')}
          className={selectedCategory === 'All' ? 'bg-gradient-to-r from-violet-500 to-purple-600' : ''}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'bg-gradient-to-r from-violet-500 to-purple-600' : ''}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Documents */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map((doc) => (
          <Card key={doc.id} className="p-6 border-slate-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-lg bg-violet-50">
                  <FileText className="w-6 h-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-1">{doc.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                      {doc.category}
                    </Badge>
                    <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge 
                  variant="outline"
                  className={
                    doc.status === 'Indexed'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }
                >
                  {doc.status === 'Indexed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {doc.status === 'Processing' && <Clock className="w-3 h-3 mr-1" />}
                  {doc.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
