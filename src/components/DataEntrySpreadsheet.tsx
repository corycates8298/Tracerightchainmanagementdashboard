import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { 
  Upload, 
  Save, 
  Plus, 
  Trash2, 
  Download, 
  FileSpreadsheet,
  Copy,
  CheckCircle2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface DataRow {
  id: string;
  product: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  category: string;
}

export function DataEntrySpreadsheet() {
  const [rows, setRows] = useState<DataRow[]>([
    { id: '1', product: '', q1: '', q2: '', q3: '', q4: '', category: '' }
  ]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const addRow = () => {
    const newRow: DataRow = {
      id: Date.now().toString(),
      product: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      category: ''
    };
    setRows([...rows, newRow]);
    toast.success('New row added');
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
    toast.success('Row deleted');
  };

  const updateRow = (id: string, field: keyof DataRow, value: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSave = async () => {
    const csv = convertToCSV(rows);
    downloadCSV(csv, `traceright-data-${new Date().toISOString().split('T')[0]}.csv`);
    toast.success('Data exported as CSV file');
  };

  const handleCopyToClipboard = async () => {
    const csv = convertToCSV(rows);
    await navigator.clipboard.writeText(csv);
    toast.success('Data copied to clipboard! Paste into your Google Sheet.');
  };

  const convertToCSV = (data: DataRow[]) => {
    const headers = ['Product', 'Q1 Sales', 'Q2 Sales', 'Q3 Sales', 'Q4 Sales', 'Category'];
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = [
        row.product,
        row.q1,
        row.q2,
        row.q3,
        row.q4,
        row.category
      ];
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedRows = parseCSV(text);
        setRows(parsedRows);
        toast.success(`Imported ${parsedRows.length} rows successfully!`);
      } catch (error) {
        toast.error('Failed to parse CSV file');
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (csv: string): DataRow[] => {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      return {
        id: Date.now().toString() + index,
        product: values[0] || '',
        q1: values[1] || '',
        q2: values[2] || '',
        q3: values[3] || '',
        q4: values[4] || '',
        category: values[5] || ''
      };
    });
  };

  const calculateTotal = (row: DataRow) => {
    const sum = [row.q1, row.q2, row.q3, row.q4]
      .map(v => parseFloat(v) || 0)
      .reduce((a, b) => a + b, 0);
    return sum.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-slate-900 text-2xl">Employee Data Entry</h2>
              <p className="text-slate-600">Import, edit, and export your data</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-600 text-green-700">
              {rows.length} rows
            </Badge>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-4 border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="file-upload">
              <Button variant="outline" asChild className="cursor-pointer">
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import CSV
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleUpload}
              className="hidden"
            />
            <Button onClick={addRow} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleCopyToClipboard} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Grid */}
      <Card className="border-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-12">#</TableHead>
                <TableHead className="min-w-[200px]">Product</TableHead>
                <TableHead className="min-w-[120px]">Q1 Sales</TableHead>
                <TableHead className="min-w-[120px]">Q2 Sales</TableHead>
                <TableHead className="min-w-[120px]">Q3 Sales</TableHead>
                <TableHead className="min-w-[120px]">Q4 Sales</TableHead>
                <TableHead className="min-w-[150px]">Category</TableHead>
                <TableHead className="min-w-[120px]">Total</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow 
                  key={row.id}
                  className={selectedRow === row.id ? 'bg-green-50' : ''}
                  onClick={() => setSelectedRow(row.id)}
                >
                  <TableCell className="text-slate-500">{index + 1}</TableCell>
                  <TableCell>
                    <Input
                      value={row.product}
                      onChange={(e) => updateRow(row.id, 'product', e.target.value)}
                      placeholder="Product name"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.q1}
                      onChange={(e) => updateRow(row.id, 'q1', e.target.value)}
                      placeholder="0"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.q2}
                      onChange={(e) => updateRow(row.id, 'q2', e.target.value)}
                      placeholder="0"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.q3}
                      onChange={(e) => updateRow(row.id, 'q3', e.target.value)}
                      placeholder="0"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={row.q4}
                      onChange={(e) => updateRow(row.id, 'q4', e.target.value)}
                      placeholder="0"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.category}
                      onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                      placeholder="Category"
                      className="border-slate-300"
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      ${calculateTotal(row)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteRow(row.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <h3 className="text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          How to Use
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              <div>
                <strong>Enter Data:</strong> Type directly into cells or import existing CSV
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              <div>
                <strong>Export:</strong> Download as CSV or copy to clipboard
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              <div>
                <strong>Upload to Google Sheets:</strong> Paste or import the CSV
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">4.</span>
              <div>
                <strong>Sync:</strong> TraceRight can pull data from your Sheet automatically
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
