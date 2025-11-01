import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Shield, Settings, UserPlus, Database, Sparkles, Trash2, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner@2.0.3';
import { 
  generateAllFakeData, 
  exportFakeDataAsJSON, 
  saveFakeDataToStorage, 
  clearFakeDataFromStorage,
  loadFakeDataFromStorage
} from '../src/lib/fake-data-generator';

const users = [
  { id: 1, name: 'John Smith', email: 'john@traceright.com', role: 'Admin', status: 'Active', lastLogin: '2025-10-25' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@traceright.com', role: 'Supervisor', status: 'Active', lastLogin: '2025-10-25' },
  { id: 3, name: 'Mike Davis', email: 'mike@traceright.com', role: 'Operator', status: 'Active', lastLogin: '2025-10-24' },
  { id: 4, name: 'Lisa Anderson', email: 'lisa@traceright.com', role: 'Viewer', status: 'Active', lastLogin: '2025-10-23' },
];

const roles = [
  { name: 'Admin', users: 2, permissions: 'Full access to all modules' },
  { name: 'Supervisor', users: 5, permissions: 'Manage operations, view reports' },
  { name: 'Operator', users: 12, permissions: 'Execute tasks, update records' },
  { name: 'Viewer', users: 8, permissions: 'Read-only access' },
];

export function AdministrationView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataGenerated, setDataGenerated] = useState(false);

  const handleGenerateFakeData = () => {
    setIsGenerating(true);
    
    // Generate fake data using Faker.js
    setTimeout(() => {
      try {
        const fakeData = generateAllFakeData();
        
        // Save to localStorage for app-wide access
        const saved = saveFakeDataToStorage(fakeData);
        
        if (saved) {
          setIsGenerating(false);
          setDataGenerated(true);
          toast.success('Successfully generated fake data!', {
            description: `Created ${fakeData.totalRecords} records across all modules`,
          });
        } else {
          throw new Error('Failed to save data');
        }
      } catch (error) {
        setIsGenerating(false);
        toast.error('Failed to generate data', {
          description: 'Make sure Faker.js is installed: npm install @faker-js/faker',
        });
      }
    }, 2000);
  };

  const handleClearData = () => {
    const cleared = clearFakeDataFromStorage();
    if (cleared) {
      setDataGenerated(false);
      toast.success('Fake data cleared from system');
    } else {
      toast.error('Failed to clear data');
    }
  };

  const handleExportData = () => {
    const data = loadFakeDataFromStorage();
    if (data) {
      exportFakeDataAsJSON(data);
      toast.success('Data exported as JSON file');
    } else {
      toast.error('No data to export. Generate data first.');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Administration</h1>
          <p className="text-slate-600 mt-1">User management, role assignments, and data tools</p>
        </div>
        <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Data Generation Tool */}
      <Card className="p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-slate-900 text-xl mb-2">Fake Data Generator</h3>
              <p className="text-slate-600 mb-4">
                Generate realistic test data for development and testing. Uses Faker.js to create
                orders, inventory, shipments, suppliers, and analytics data.
              </p>
              
              {dataGenerated && (
                <div className="mb-4 p-4 bg-green-100 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Data Generated Successfully!</span>
                  </div>
                  <div className="text-sm text-green-600 space-y-1">
                    <div>• 250 Orders with tracking numbers</div>
                    <div>• 150 Inventory items across 5 warehouses</div>
                    <div>• 200 Shipments with logistics data</div>
                    <div>• 100 Supplier records with contacts</div>
                    <div>• 400 Analytics events and KPIs</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleGenerateFakeData}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Fake Data
                    </>
                  )}
                </Button>
                
                {dataGenerated && (
                  <>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="border-blue-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button
                      onClick={handleClearData}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear Data
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-violet-600" />
            <span className="text-sm text-slate-600">Total Users</span>
          </div>
          <div className="text-2xl text-slate-900">27</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">Roles</span>
          </div>
          <div className="text-2xl text-slate-900">4</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">Active Today</span>
          </div>
          <div className="text-2xl text-slate-900">18</div>
        </Card>
        <Card className="p-6 border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">Pending Invites</span>
          </div>
          <div className="text-2xl text-slate-900">3</div>
        </Card>
      </div>

      {/* User Table */}
      <Card className="border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-slate-900">Users</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-slate-900">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Roles */}
      <Card className="p-6 border-slate-200">
        <div className="mb-6">
          <h3 className="text-slate-900">Roles & Permissions</h3>
          <p className="text-sm text-slate-600 mt-1">Configure access control</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role.name} className="p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-slate-900">{role.name}</h4>
                <Badge variant="outline">{role.users} users</Badge>
              </div>
              <p className="text-sm text-slate-600 mb-3">{role.permissions}</p>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
