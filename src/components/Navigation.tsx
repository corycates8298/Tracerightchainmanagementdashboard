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
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
  ToggleLeft,
  Moon,
  Sun,
  Shield,
  QrCode,
  Globe,
  Barcode
} from 'lucide-react';
import { ViewType } from '../App';
import { useState } from 'react';
import { useTheme } from './ThemeContext';
import { useFeatureFlags } from './FeatureFlagsContext';
import { Button } from './ui/button';

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
    'UNIVERSAL TRACEABILITY',
    'SYSTEM',
    'GOOGLE SHEETS',
    'NEXT-GEN FEATURES',
    'CONFIGURATION'
  ]);
  const { gradientStyleValue, isDarkMode, toggleDarkMode } = useTheme();
  const { isEnabled } = useFeatureFlags();
  
  // Map ViewType to feature flag keys
  const featureFlagMap: Partial<Record<ViewType, keyof import('./FeatureFlagsContext').FeatureFlags>> = {
    'logistics': 'logistics',
    'suppliers': 'suppliers',
    'purchase-orders': 'purchaseOrders',
    'inbound-receipts': 'inboundReceipts',
    'warehouse-ops': 'warehouseOps',
    'outbound-shipments': 'outboundShipments',
    'raw-materials': 'rawMaterials',
    'recipes': 'recipes',
    'batches': 'batches',
    'traceability': 'traceability',
    'ai-reporting': 'aiReporting',
    'ai-forecasting': 'aiForecast',
    'materials-intelligence': 'materialsIntel',
    'ml-intelligence': 'mlIntelligence',
    'administration': 'administration',
    'governance': 'governance',
    'about': 'about',
    'supplier-certifications': 'suppliers',
    'provenance-qr': 'traceability',
    'universal-dashboard': 'dashboardStandard',
    'barcode-recovery': 'warehouseOps',
  };

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
      title: 'UNIVERSAL TRACEABILITY',
      items: [
        { id: 'universal-dashboard', label: '🌍 Universal Dashboard', icon: Globe },
        { id: 'supplier-certifications', label: 'Supplier Certifications', icon: Shield },
        { id: 'provenance-qr', label: 'QR Provenance', icon: QrCode },
        { id: 'barcode-recovery', label: 'Barcode Recovery', icon: Barcode },
      ],
    },
    {
      title: 'GOOGLE SHEETS',
      items: [
        { id: 'sheets-showcase', label: '📊 Google Sheets', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'NEXT-GEN FEATURES',
      items: [
        { id: 'showcase', label: '✨ Innovation Lab', icon: Sparkles },
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
    {
      title: 'CONFIGURATION',
      items: [
        { id: 'feature-flags', label: '🎛️ Feature Flags', icon: ToggleLeft },
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
    <nav className={`w-64 border-r flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className={`p-6 border-b ${isDarkMode ? 'border-cyan-500/30' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: gradientStyleValue }}
          >
            <Search className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={isDarkMode ? 'text-cyan-400 glow-text-cyan' : 'text-slate-900'}>TraceRight</h1>
            <p className={`text-xs ${isDarkMode ? 'text-purple-400' : 'text-slate-500'}`}>Universal Trace Cloud</p>
          </div>
        </div>
      </div>

      {/* Cyberpunk Mode Toggle - PROMINENT! */}
      <div className={`p-3 border-b ${isDarkMode ? 'border-cyan-500/30' : 'border-slate-200'}`}>
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          className={`w-full justify-start gap-2 text-base font-medium ${
            isDarkMode 
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-cyan-400 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-cyan-500/50' 
              : 'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-400 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg'
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5" />
              Exit Cyberpunk Mode
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              🌆 Cyberpunk Mode
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {navSections.map((section) => {
          const isExpanded = expandedSections.includes(section.title);
          
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isDarkMode 
                    ? 'text-cyan-400 hover:text-cyan-300' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
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
                    
                    // Check if feature is enabled (Configuration items always show)
                    const featureKey = featureFlagMap[item.id];
                    const shouldShow = !featureKey || isEnabled(featureKey);
                    
                    if (!shouldShow) return null;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onViewChange(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                          isActive
                            ? isDarkMode
                              ? 'text-black shadow-md shadow-cyan-500/50'
                              : 'text-white shadow-md'
                            : isDarkMode 
                              ? 'text-cyan-300 hover:bg-slate-800 hover:text-cyan-400' 
                              : 'text-slate-600 hover:bg-slate-100'
                        }`}
                        style={isActive ? { 
                          background: isDarkMode 
                            ? 'linear-gradient(to right, #00ffff, #ff00ff)' 
                            : gradientStyleValue 
                        } : {}}
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

      <div className={`p-4 border-t ${isDarkMode ? 'border-cyan-500/30' : 'border-slate-200'}`}>
        <div 
          className={`px-3 py-3 rounded-lg ${isDarkMode ? 'neon-border-cyan' : ''}`}
          style={{ 
            background: isDarkMode 
              ? 'linear-gradient(to right, #00ffff, #ff00ff)' 
              : gradientStyleValue 
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-white" />
            <span className="text-xs text-white">AI Status</span>
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-black font-bold' : 'text-white'}`}>
            Active & Learning
          </div>
        </div>
        
        {/* Creator Credit - Subtle */}
        <div className="mt-3 text-center">
          <a
            href="https://www.linkedin.com/in/coryncates"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[10px] ${isDarkMode ? 'text-cyan-400/60 hover:text-cyan-400' : 'text-slate-400 hover:text-slate-600'} transition-colors`}
          >
            Truvera Solutions Inc
          </a>
        </div>
      </div>
    </nav>
  );
}
