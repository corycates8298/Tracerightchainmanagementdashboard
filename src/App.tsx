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
const PurchaseOrdersView = lazy(() => import('./components/PurchaseOrdersViewEnhanced').then(m => ({ default: m.PurchaseOrdersViewEnhanced })));
const InboundReceiptsView = lazy(() => import('./components/InboundReceiptsViewEnhanced').then(m => ({ default: m.InboundReceiptsViewEnhanced })));
const WarehouseOpsView = lazy(() => import('./components/WarehouseOpsViewEnhanced').then(m => ({ default: m.WarehouseOpsViewEnhanced })));
const OutboundShipmentsView = lazy(() => import('./components/OutboundShipmentsViewEnhanced').then(m => ({ default: m.OutboundShipmentsViewEnhanced })));
const RawMaterialsView = lazy(() => import('./components/RawMaterialsViewEnhanced').then(m => ({ default: m.RawMaterialsViewEnhanced })));
const RecipesView = lazy(() => import('./components/RecipesViewEnhanced').then(m => ({ default: m.RecipesViewEnhanced })));
const BatchesView = lazy(() => import('./components/BatchesViewEnhanced').then(m => ({ default: m.BatchesViewEnhanced })));
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
const SupplierCertificationView = lazy(() => import('./components/SupplierCertificationView').then(m => ({ default: m.SupplierCertificationView })));
const ProvenanceQRView = lazy(() => import('./components/ProvenanceQRView').then(m => ({ default: m.ProvenanceQRView })));
const UniversalTraceabilityDashboard = lazy(() => import('./components/UniversalTraceabilityDashboard').then(m => ({ default: m.UniversalTraceabilityDashboard })));
const BarcodeRecoverySystem = lazy(() => import('./components/BarcodeRecoverySystem').then(m => ({ default: m.BarcodeRecoverySystem })));
const DashboardCyberpunk = lazy(() => import('./components/DashboardCyberpunk').then(m => ({ default: m.DashboardCyberpunk })));

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
  // Universal Traceability
  | 'supplier-certifications'
  | 'provenance-qr'
  | 'universal-dashboard'
  | 'barcode-recovery'
  // Special
  | 'showcase'
  | 'sheets-showcase'
  | 'feature-flags'
  | 'dark-dashboard';

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
  const { backgroundStyle, isDarkMode } = useTheme();

  return (
    <div className="flex h-screen bg-slate-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-auto" style={backgroundStyle}>
        <Suspense fallback={<LoadingView />}>
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'dark-dashboard' && <DashboardCyberpunk />}
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
          {currentView === 'supplier-certifications' && <SupplierCertificationView />}
          {currentView === 'provenance-qr' && <ProvenanceQRView />}
          {currentView === 'universal-dashboard' && <UniversalTraceabilityDashboard />}
          {currentView === 'barcode-recovery' && <BarcodeRecoverySystem />}
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
