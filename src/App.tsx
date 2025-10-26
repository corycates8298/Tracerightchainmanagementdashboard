import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { LogisticsView } from './components/LogisticsView';
import { SuppliersView } from './components/SuppliersView';
import { PurchaseOrdersView } from './components/PurchaseOrdersView';
import { InboundReceiptsView } from './components/InboundReceiptsView';
import { WarehouseOpsView } from './components/WarehouseOpsView';
import { OutboundShipmentsView } from './components/OutboundShipmentsView';
import { RawMaterialsView } from './components/RawMaterialsView';
import { RecipesView } from './components/RecipesView';
import { BatchesView } from './components/BatchesView';
import { TraceabilityView } from './components/TraceabilityView';
import { AIReportingView } from './components/AIReportingView';
import { AIForecastingView } from './components/AIForecastingView';
import { MaterialsIntelligenceView } from './components/MaterialsIntelligenceView';
import { MLIntelligenceView } from './components/MLIntelligenceView';
import { AdministrationView } from './components/AdministrationView';
import { GovernanceView } from './components/GovernanceView';
import { AboutView } from './components/AboutView';

export type ViewType = 
  // Core Logistics
  | 'dashboard' 
  | 'logistics' 
  | 'suppliers' 
  | 'purchase-orders'
  | 'inbound-receipts'
  | 'warehouse-ops'
  | 'outbound-shipments'
  // Production
  | 'raw-materials'
  | 'recipes'
  | 'batches'
  // Intelligence
  | 'traceability'
  | 'ai-reporting'
  | 'ai-forecasting'
  | 'materials-intelligence'
  | 'ml-intelligence'
  // System
  | 'administration'
  | 'governance'
  | 'about';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { backgroundStyle } = useTheme();

  return (
    <div className="flex h-screen bg-slate-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-auto" style={backgroundStyle}>
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'logistics' && <LogisticsView />}
          {currentView === 'suppliers' && <SuppliersView />}
          {currentView === 'purchase-orders' && <PurchaseOrdersView />}
          {currentView === 'inbound-receipts' && <InboundReceiptsView />}
          {currentView === 'warehouse-ops' && <WarehouseOpsView />}
          {currentView === 'outbound-shipments' && <OutboundShipmentsView />}
          {currentView === 'raw-materials' && <RawMaterialsView />}
          {currentView === 'recipes' && <RecipesView />}
          {currentView === 'batches' && <BatchesView />}
          {currentView === 'traceability' && <TraceabilityView />}
          {currentView === 'ai-reporting' && <AIReportingView />}
          {currentView === 'ai-forecasting' && <AIForecastingView />}
          {currentView === 'materials-intelligence' && <MaterialsIntelligenceView />}
          {currentView === 'ml-intelligence' && <MLIntelligenceView />}
          {currentView === 'administration' && <AdministrationView />}
          {currentView === 'governance' && <GovernanceView />}
          {currentView === 'about' && <AboutView />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
      <Toaster />
    </ThemeProvider>
  );
}
