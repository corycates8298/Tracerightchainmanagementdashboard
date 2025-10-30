// TraceRight - AI-Powered Supply Chain Management Platform
import { useState, lazy, Suspense } from 'react';
import { ToastProvider, Toaster, ToastListener } from './components/ui/sonner';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { FeatureFlagsProvider } from './components/FeatureFlagsContext';
import { Navigation } from './components/Navigation';

// Lazy load all views to reduce initial bundle size and avoid CDN quota issues
const DashboardView = lazy(() => import('./components/DashboardView').then(m => ({ default: m.DashboardView })));
const LogisticsView = lazy(() => import('./components/LogisticsView').then(m => ({ default: m.LogisticsView })));
const SuppliersView = lazy(() => import('./components/SuppliersView').then(m => ({ default: m.SuppliersView })));
const PurchaseOrdersView = lazy(() => import('./components/PurchaseOrdersView').then(m => ({ default: m.PurchaseOrdersView })));
const InboundReceiptsView = lazy(() => import('./components/InboundReceiptsView').then(m => ({ default: m.InboundReceiptsView })));
const WarehouseOpsView = lazy(() => import('./components/WarehouseOpsView').then(m => ({ default: m.WarehouseOpsView })));
const OutboundShipmentsView = lazy(() => import('./components/OutboundShipmentsView').then(m => ({ default: m.OutboundShipmentsView })));
const RawMaterialsView = lazy(() => import('./components/RawMaterialsView').then(m => ({ default: m.RawMaterialsView })));
const RecipesView = lazy(() => import('./components/RecipesView').then(m => ({ default: m.RecipesView })));
const BatchesView = lazy(() => import('./components/BatchesView').then(m => ({ default: m.BatchesView })));
const TraceabilityView = lazy(() => import('./components/TraceabilityView').then(m => ({ default: m.TraceabilityView })));
const AIReportingView = lazy(() => import('./components/AIReportingView').then(m => ({ default: m.AIReportingView })));
const AIForecastingView = lazy(() => import('./components/AIForecastingView').then(m => ({ default: m.AIForecastingView })));
const MaterialsIntelligenceView = lazy(() => import('./components/MaterialsIntelligenceView').then(m => ({ default: m.MaterialsIntelligenceView })));
const MLIntelligenceView = lazy(() => import('./components/MLIntelligenceView').then(m => ({ default: m.MLIntelligenceView })));
const AdministrationView = lazy(() => import('./components/AdministrationView').then(m => ({ default: m.AdministrationView })));
const GovernanceView = lazy(() => import('./components/GovernanceView').then(m => ({ default: m.GovernanceView })));
const AboutView = lazy(() => import('./components/AboutView').then(m => ({ default: m.AboutView })));
const VisualizationShowcase = lazy(() => import('./components/VisualizationShowcase').then(m => ({ default: m.VisualizationShowcase })));
const SheetsShowcase = lazy(() => import('./components/SheetsShowcase').then(m => ({ default: m.SheetsShowcase })));
const FeatureFlagsManager = lazy(() => import('./components/FeatureFlagsManager').then(m => ({ default: m.FeatureFlagsManager })));

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
  | 'about'
  // Special
  | 'showcase'
  | 'sheets-showcase'
  | 'feature-flags';

// Loading component
function LoadingView() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent mb-4"></div>
        <p className="text-gray-600">Loading view...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { backgroundStyle } = useTheme();

  return (
    <div className="flex h-screen bg-slate-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-auto" style={backgroundStyle}>
        <Suspense fallback={<LoadingView />}>
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
          {currentView === 'showcase' && <VisualizationShowcase />}
          {currentView === 'sheets-showcase' && <SheetsShowcase />}
          {currentView === 'feature-flags' && <FeatureFlagsManager />}
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <FeatureFlagsProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
          <Toaster />
          <ToastListener />
        </ToastProvider>
      </ThemeProvider>
    </FeatureFlagsProvider>
  );
}
