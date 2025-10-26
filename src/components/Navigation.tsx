import { 
  LayoutDashboard, 
  MapPin,
  Users,
  ShoppingCart,
  PackageCheck,
  Warehouse,
  TruckIcon,
  Box,
  BookOpen,
  Factory,
  Search,
  Bot,
  TrendingUp,
  BarChart3,
  Brain,
  Settings,
  FileText,
  Info,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { ViewType } from '../App';
import { useState } from 'react';
import { useTheme } from './ThemeContext';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

interface NavItem {
  id: ViewType;
  label: string;
  icon: any;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'CORE LOGISTICS',
    'PRODUCTION',
    'INTELLIGENCE',
    'SYSTEM'
  ]);
  const { gradientStyleValue } = useTheme();

  const navSections: NavSection[] = [
    {
      title: 'CORE LOGISTICS',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'logistics', label: 'Logistics', icon: MapPin },
        { id: 'suppliers', label: 'Suppliers', icon: Users },
        { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
        { id: 'inbound-receipts', label: 'Inbound Receipts', icon: PackageCheck },
        { id: 'warehouse-ops', label: 'Warehouse Ops', icon: Warehouse },
        { id: 'outbound-shipments', label: 'Outbound Shipments', icon: TruckIcon },
      ],
    },
    {
      title: 'PRODUCTION',
      items: [
        { id: 'raw-materials', label: 'Raw Materials', icon: Box },
        { id: 'recipes', label: 'Recipes', icon: BookOpen },
        { id: 'batches', label: 'Batches', icon: Factory },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'traceability', label: 'Traceability', icon: Search },
        { id: 'ai-reporting', label: 'AI Reporting', icon: Bot },
        { id: 'ai-forecasting', label: 'AI Forecasting', icon: TrendingUp },
        { id: 'materials-intelligence', label: 'Materials Intelligence', icon: BarChart3 },
        { id: 'ml-intelligence', label: 'ML Intelligence', icon: Brain },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: 'administration', label: 'Administration', icon: Settings },
        { id: 'governance', label: 'Governance', icon: FileText },
        { id: 'about', label: 'About', icon: Info },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  return (
    <nav className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: gradientStyleValue }}
          >
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-slate-900">TraceRight</h1>
            <p className="text-xs text-slate-500">AI Supply Chain</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section) => {
          const isExpanded = expandedSections.includes(section.title);
          
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                <span>{section.title}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
              
              {isExpanded && (
                <div className="space-y-1 mt-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                          isActive
                            ? 'text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        style={isActive ? { background: gradientStyleValue } : {}}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200">
        <div 
          className="px-3 py-3 rounded-lg"
          style={{ background: gradientStyleValue }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-white" />
            <span className="text-xs text-white">AI Status</span>
          </div>
          <div className="text-sm text-white">Active & Learning</div>
        </div>
      </div>
    </nav>
  );
}
