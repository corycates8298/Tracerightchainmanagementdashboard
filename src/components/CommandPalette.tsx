import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './ui/command';
import {
  Search,
  Home,
  Package,
  Truck,
  Factory,
  Brain,
  Settings,
  FileText,
  BarChart3,
  Users,
  Sparkles,
  Zap,
  Calculator,
  Calendar,
  Plus,
  Download,
  Upload,
  Share2,
  Copy,
  Trash2,
} from 'lucide-react';

interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const commands: CommandAction[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Dashboard',
      description: 'View main dashboard',
      icon: <Home className="w-4 h-4" />,
      action: () => { navigate('/'); setOpen(false); },
      category: 'Navigation',
      keywords: ['home', 'dashboard', 'main'],
    },
    {
      id: 'nav-logistics',
      label: 'Go to Logistics',
      description: 'Supply chain management',
      icon: <Truck className="w-4 h-4" />,
      action: () => { navigate('/logistics'); setOpen(false); },
      category: 'Navigation',
      keywords: ['logistics', 'supply', 'chain'],
    },
    {
      id: 'nav-suppliers',
      label: 'Go to Suppliers',
      description: 'Manage suppliers',
      icon: <Package className="w-4 h-4" />,
      action: () => { navigate('/suppliers'); setOpen(false); },
      category: 'Navigation',
      keywords: ['suppliers', 'vendors'],
    },
    {
      id: 'nav-production',
      label: 'Go to Production',
      description: 'Production batches',
      icon: <Factory className="w-4 h-4" />,
      action: () => { navigate('/batches'); setOpen(false); },
      category: 'Navigation',
      keywords: ['production', 'manufacturing', 'batches'],
    },
    {
      id: 'nav-analytics',
      label: 'Go to Analytics',
      description: 'AI-powered insights',
      icon: <Brain className="w-4 h-4" />,
      action: () => { navigate('/ai-reporting'); setOpen(false); },
      category: 'Navigation',
      keywords: ['analytics', 'ai', 'reporting', 'insights'],
    },
    {
      id: 'nav-showcases',
      label: 'Go to Next-Gen Features',
      description: 'View advanced features',
      icon: <Sparkles className="w-4 h-4" />,
      action: () => { navigate('/showcases/visualization'); setOpen(false); },
      category: 'Navigation',
      keywords: ['showcase', 'features', 'advanced'],
    },
    {
      id: 'nav-sheets',
      label: 'Go to Google Sheets',
      description: 'Spreadsheet integration',
      icon: <FileText className="w-4 h-4" />,
      action: () => { navigate('/showcases/sheets'); setOpen(false); },
      category: 'Navigation',
      keywords: ['sheets', 'spreadsheet', 'data'],
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      description: 'Configure TraceRight',
      icon: <Settings className="w-4 h-4" />,
      action: () => { navigate('/administration'); setOpen(false); },
      category: 'Navigation',
      keywords: ['settings', 'admin', 'configuration'],
    },

    // Quick Actions
    {
      id: 'action-new-order',
      label: 'Create New Order',
      description: 'Start a new purchase order',
      icon: <Plus className="w-4 h-4" />,
      action: () => { alert('Create order'); setOpen(false); },
      category: 'Quick Actions',
      keywords: ['create', 'new', 'order', 'add'],
    },
    {
      id: 'action-export',
      label: 'Export Data',
      description: 'Download reports and data',
      icon: <Download className="w-4 h-4" />,
      action: () => { alert('Export data'); setOpen(false); },
      category: 'Quick Actions',
      keywords: ['export', 'download', 'save'],
    },
    {
      id: 'action-import',
      label: 'Import Data',
      description: 'Upload CSV or JSON',
      icon: <Upload className="w-4 h-4" />,
      action: () => { alert('Import data'); setOpen(false); },
      category: 'Quick Actions',
      keywords: ['import', 'upload', 'load'],
    },
    {
      id: 'action-share',
      label: 'Share Dashboard',
      description: 'Share with team',
      icon: <Share2 className="w-4 h-4" />,
      action: () => { alert('Share dashboard'); setOpen(false); },
      category: 'Quick Actions',
      keywords: ['share', 'collaborate', 'team'],
    },

    // Data Actions
    {
      id: 'data-backup',
      label: 'Backup Data',
      description: 'Create system backup',
      icon: <Copy className="w-4 h-4" />,
      action: () => { alert('Backup data'); setOpen(false); },
      category: 'Data',
      keywords: ['backup', 'save', 'copy'],
    },
    {
      id: 'data-calculate',
      label: 'Run Calculations',
      description: 'Recalculate all metrics',
      icon: <Calculator className="w-4 h-4" />,
      action: () => { alert('Running calculations'); setOpen(false); },
      category: 'Data',
      keywords: ['calculate', 'compute', 'refresh'],
    },

    // Reports
    {
      id: 'report-daily',
      label: 'Generate Daily Report',
      description: 'Today\'s summary',
      icon: <FileText className="w-4 h-4" />,
      action: () => { alert('Generating daily report'); setOpen(false); },
      category: 'Reports',
      keywords: ['report', 'daily', 'summary'],
    },
    {
      id: 'report-analytics',
      label: 'View Analytics Report',
      description: 'Detailed analytics',
      icon: <BarChart3 className="w-4 h-4" />,
      action: () => { alert('Analytics report'); setOpen(false); },
      category: 'Reports',
      keywords: ['report', 'analytics', 'insights'],
    },
  ];

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  // Group commands by category
  const categories = Array.from(new Set(commands.map(cmd => cmd.category)));

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 group"
        title="Open Command Palette (⌘K)"
      >
        <Zap className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-12 right-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Press ⌘K or Ctrl+K
        </div>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="border-b border-slate-200 p-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
            <Zap className="w-4 h-4" />
            <span>Quick Actions</span>
          </div>
        </div>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {categories.map((category, index) => (
            <div key={category}>
              <CommandGroup heading={category}>
                {commands
                  .filter(cmd => cmd.category === category)
                  .map(cmd => (
                    <CommandItem
                      key={cmd.id}
                      onSelect={() => runCommand(cmd.action)}
                      className="flex items-center gap-3 p-3 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        {cmd.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900">{cmd.label}</div>
                        {cmd.description && (
                          <div className="text-xs text-slate-500">{cmd.description}</div>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              {index < categories.length - 1 && <CommandSeparator />}
            </div>
          ))}
        </CommandList>
        <div className="border-t border-slate-200 p-3 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <div>⌘K to toggle</div>
        </div>
      </CommandDialog>
    </>
  );
}
