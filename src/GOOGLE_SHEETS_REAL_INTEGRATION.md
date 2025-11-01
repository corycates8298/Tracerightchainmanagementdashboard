# 🔗 Google Sheets Real Integration Guide

> **Transform the demo into a fully functional Google Sheets integration**

---

## 📋 Overview

Currently, the Google Sheets Showcase uses mock data. This guide shows you how to connect it to real Google Sheets using the Google Sheets API.

---

## 🎯 Two Integration Options

### Option 1: Google Sheets API (Direct)
- ✅ Full control over data
- ✅ Real-time updates
- ✅ Free (Google Cloud free tier)
- ⚠️ Requires API setup

### Option 2: Google Sheets as Backend (Recommended)
- ✅ Easier setup
- ✅ No backend code needed
- ✅ Perfect for employee data entry
- ⚠️ Limited to public/shared sheets

---

## 🚀 Option 1: Google Sheets API Integration

### Step 1: Enable Google Sheets API

1. **Go to Google Cloud Console**: https://console.cloud.google.com
2. **Create/Select Project**: Your Railway project name
3. **Enable APIs**:
   - Search for "Google Sheets API"
   - Click "Enable"
4. **Create Credentials**:
   - Go to APIs & Services → Credentials
   - Click "+ Create Credentials" → API Key
   - Copy the API key

### Step 2: Make Your Sheet Accessible

1. **Open your Google Sheet**
2. **Click "Share"**
3. **Change to "Anyone with the link can view"**
4. **Copy the Sheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

### Step 3: Add Environment Variables

In Railway Dashboard → Variables:

```env
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEET_ID=your_sheet_id_here
```

### Step 4: Install Google API Client

```bash
npm install googleapis
```

### Step 5: Create Google Sheets Service

Create `/src/lib/google-sheets.ts`:

```typescript
/**
 * Google Sheets Integration Service
 * Connects to real Google Sheets for data storage and retrieval
 */

const SHEETS_API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

export interface SheetData {
  range: string;
  values: string[][];
}

/**
 * Fetch data from a Google Sheet
 */
export async function fetchSheetData(range: string = 'Sheet1!A1:Z1000'): Promise<SheetData> {
  if (!SHEETS_API_KEY || !SHEET_ID) {
    console.warn('Google Sheets API not configured. Using mock data.');
    return { range, values: [] };
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${SHEETS_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      range: data.range,
      values: data.values || []
    };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

/**
 * Write data to a Google Sheet (requires OAuth)
 * For now, this is a placeholder - writing requires OAuth setup
 */
export async function writeSheetData(range: string, values: string[][]): Promise<boolean> {
  // TODO: Implement OAuth for write access
  console.warn('Writing to Google Sheets requires OAuth setup');
  return false;
}

/**
 * Parse sheet data into structured format
 */
export function parseSheetData(data: SheetData) {
  if (!data.values || data.values.length === 0) {
    return [];
  }

  const headers = data.values[0];
  const rows = data.values.slice(1);

  return rows.map(row => {
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
}

/**
 * Get specific column data
 */
export function getColumnData(data: SheetData, columnIndex: number): string[] {
  return data.values.map(row => row[columnIndex] || '');
}

/**
 * Search sheet data
 */
export function searchSheetData(data: SheetData, searchTerm: string): string[][] {
  return data.values.filter(row => 
    row.some(cell => 
      cell.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}
```

### Step 6: Update SheetsShowcase.tsx

Add this to the imports:

```typescript
import { fetchSheetData, parseSheetData } from '../src/lib/google-sheets';
```

Add this state and effect:

```typescript
const [realData, setRealData] = useState<any[]>([]);
const [loading, setLoading] = useState(false);
const [usingRealData, setUsingRealData] = useState(false);

useEffect(() => {
  loadRealData();
}, []);

const loadRealData = async () => {
  setLoading(true);
  try {
    const sheetData = await fetchSheetData('Sheet1!A1:G100');
    const parsed = parseSheetData(sheetData);
    setRealData(parsed);
    setUsingRealData(true);
  } catch (error) {
    console.error('Failed to load Google Sheets data:', error);
    setUsingRealData(false);
  } finally {
    setLoading(false);
  }
};

// Use realData instead of spreadsheetData when usingRealData is true
const displayData = usingRealData ? realData : spreadsheetData;
```

---

## 🔥 Option 2: Google Sheets as Database (Easier)

This method uses a simpler approach with a public Google Sheet.

### Step 1: Create Your Data Sheet

Create a Google Sheet with this structure:

```
| Product      | Q1 Sales | Q2 Sales | Q3 Sales | Q4 Sales | Category    |
|--------------|----------|----------|----------|----------|-------------|
| Laptops      | 45000    | 52000    | 48000    | 61000    | Electronics |
| Phones       | 38000    | 42000    | 45000    | 49000    | Electronics |
```

### Step 2: Publish to Web

1. **File → Share → Publish to web**
2. **Select "Entire Document"**
3. **Choose "Comma-separated values (.csv)"**
4. **Click "Publish"**
5. **Copy the published URL**

### Step 3: Create CSV Parser

Create `/src/lib/sheets-parser.ts`:

```typescript
/**
 * Parse CSV data from published Google Sheet
 */
export async function fetchPublishedSheet(url: string) {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching published sheet:', error);
    return [];
  }
}

function parseCSV(csv: string) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj: Record<string, string> = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
    });
    return obj;
  });
}
```

### Step 4: Use in Component

```typescript
const PUBLISHED_SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv';

useEffect(() => {
  fetchPublishedSheet(PUBLISHED_SHEET_URL)
    .then(data => setRealData(data))
    .catch(error => console.error(error));
}, []);
```

---

## 📊 Employee Data Entry Interface

Create `/components/DataEntryForm.tsx`:

```typescript
import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Upload, Save, Plus } from 'lucide-react';

interface DataRow {
  [key: string]: string;
}

export function DataEntryForm() {
  const [rows, setRows] = useState<DataRow[]>([
    { product: '', q1: '', q2: '', q3: '', q4: '', category: '' }
  ]);

  const addRow = () => {
    setRows([...rows, { product: '', q1: '', q2: '', q3: '', q4: '', category: '' }]);
  };

  const updateRow = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleSave = async () => {
    // Convert to CSV format
    const csv = convertToCSV(rows);
    
    // Option 1: Copy to clipboard for manual paste
    navigator.clipboard.writeText(csv);
    toast.success('Data copied to clipboard! Paste into your Google Sheet.');
    
    // Option 2: Download as CSV
    downloadCSV(csv, 'data-export.csv');
  };

  const convertToCSV = (data: DataRow[]) => {
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      csvRows.push(headers.map(header => row[header]).join(','));
    });
    
    return csvRows.join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedRows = parseCSV(text);
      setRows(parsedRows);
      toast.success('Data imported successfully!');
    };
    reader.readAsText(file);
  };

  const parseCSV = (csv: string): DataRow[] => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: DataRow = {};
      headers.forEach((header, index) => {
        obj[header] = values[index]?.trim() || '';
      });
      return obj;
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900 text-xl">Data Entry</h3>
          <p className="text-slate-600 text-sm">Enter or import your data</p>
        </div>
        <div className="flex gap-2">
          <label htmlFor="file-upload">
            <Button variant="outline" asChild>
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
          <Button onClick={handleSave} className="bg-green-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row, index) => (
          <div key={index} className="grid grid-cols-6 gap-3">
            <div>
              <Label>Product</Label>
              <Input
                value={row.product}
                onChange={(e) => updateRow(index, 'product', e.target.value)}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Q1 Sales</Label>
              <Input
                type="number"
                value={row.q1}
                onChange={(e) => updateRow(index, 'q1', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Q2 Sales</Label>
              <Input
                type="number"
                value={row.q2}
                onChange={(e) => updateRow(index, 'q2', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Q3 Sales</Label>
              <Input
                type="number"
                value={row.q3}
                onChange={(e) => updateRow(index, 'q3', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Q4 Sales</Label>
              <Input
                type="number"
                value={row.q4}
                onChange=(e) => updateRow(index, 'q4', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={row.category}
                onChange={(e) => updateRow(index, 'category', e.target.value)}
                placeholder="Category"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

---

## 📝 Summary

### What You Need to Do:

1. **Get Google Sheets API Key** (5 minutes)
2. **Add environment variables** to Railway
3. **Create `/src/lib/google-sheets.ts`** (copy code above)
4. **Update SheetsShowcase.tsx`** to use real data
5. **Add DataEntryForm component** for employee data input

### Employee Data Entry Workflow:

1. Employees fill out the DataEntryForm
2. Click "Export" to download CSV
3. Upload CSV to your Google Sheet
4. TraceRight automatically pulls latest data from Sheet

---

*Last Updated: November 1, 2025*
