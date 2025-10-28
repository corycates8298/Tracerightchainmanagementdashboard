import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Feature Flag Configuration
export interface FeatureFlags {
  // Core Logistics Module
  logistics: boolean;
  suppliers: boolean;
  purchaseOrders: boolean;
  inboundReceipts: boolean;
  warehouseOps: boolean;
  outboundShipments: boolean;
  
  // Production Module
  rawMaterials: boolean;
  recipes: boolean;
  batches: boolean;
  
  // Intelligence Module
  traceability: boolean;
  aiReporting: boolean;
  aiForecast: boolean;
  materialsIntel: boolean;
  mlIntelligence: boolean;
  
  // System Module
  administration: boolean;
  governance: boolean;
  about: boolean;
  
  // Showcases
  showcaseVisualization: boolean;
  showcaseSheets: boolean;
  
  // Dashboard Features
  dashboard3D: boolean;
  dashboardCyberpunk: boolean;
  dashboardBuilder: boolean;
  aiVision: boolean;
  
  // Panel Features
  aiAnalysis: boolean;
  collaboration: boolean;
  dataCleaningTools: boolean;
  pivotTables: boolean;
  templateLibrary: boolean;
  themeCustomizer: boolean;
  
  // Widget Types
  widgetKPI: boolean;
  widgetSalesChart: boolean;
  widgetRevenueChart: boolean;
  widgetInventory: boolean;
  widgetOrders: boolean;
  widgetProducts: boolean;
  widgetPerformance: boolean;
  widgetCustomChart: boolean;
  
  // Chart Types
  chartBar: boolean;
  chartLine: boolean;
  chartPie: boolean;
  chartArea: boolean;
  chartRadar: boolean;
  chartScatter: boolean;
  chartTreemap: boolean;
  chartSankey: boolean;
  chartFunnel: boolean;
  chartGauge: boolean;
  chartWaterfall: boolean;
  chartBullet: boolean;
  chartHeatmap: boolean;
  
  // Advanced Features
  advancedCharts: boolean;
  realTimeUpdates: boolean;
  exportData: boolean;
  notifications: boolean;
}

// Default configuration - all features enabled by default
const defaultFeatureFlags: FeatureFlags = {
  // Core Logistics
  logistics: true,
  suppliers: true,
  purchaseOrders: true,
  inboundReceipts: true,
  warehouseOps: true,
  outboundShipments: true,
  
  // Production
  rawMaterials: true,
  recipes: true,
  batches: true,
  
  // Intelligence
  traceability: true,
  aiReporting: true,
  aiForecast: true,
  materialsIntel: true,
  mlIntelligence: true,
  
  // System
  administration: true,
  governance: true,
  about: true,
  
  // Showcases
  showcaseVisualization: true,
  showcaseSheets: true,
  
  // Dashboard Features
  dashboard3D: true,
  dashboardCyberpunk: true,
  dashboardBuilder: true,
  aiVision: true,
  
  // Panel Features
  aiAnalysis: true,
  collaboration: true,
  dataCleaningTools: true,
  pivotTables: true,
  templateLibrary: true,
  themeCustomizer: true,
  
  // Widget Types
  widgetKPI: true,
  widgetSalesChart: true,
  widgetRevenueChart: true,
  widgetInventory: true,
  widgetOrders: true,
  widgetProducts: true,
  widgetPerformance: true,
  widgetCustomChart: true,
  
  // Chart Types
  chartBar: true,
  chartLine: true,
  chartPie: true,
  chartArea: true,
  chartRadar: true,
  chartScatter: true,
  chartTreemap: true,
  chartSankey: true,
  chartFunnel: true,
  chartGauge: true,
  chartWaterfall: true,
  chartBullet: true,
  chartHeatmap: true,
  
  // Advanced Features
  advancedCharts: true,
  realTimeUpdates: true,
  exportData: true,
  notifications: true,
};

interface FeatureFlagsContextType {
  flags: FeatureFlags;
  isEnabled: (feature: keyof FeatureFlags) => boolean;
  toggleFeature: (feature: keyof FeatureFlags) => void;
  enableFeature: (feature: keyof FeatureFlags) => void;
  disableFeature: (feature: keyof FeatureFlags) => void;
  resetFlags: () => void;
  enableAll: () => void;
  disableAll: () => void;
  exportConfig: () => string;
  importConfig: (config: string) => void;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    // Load from localStorage if available
    const stored = localStorage.getItem('traceright_feature_flags');
    if (stored) {
      try {
        return { ...defaultFeatureFlags, ...JSON.parse(stored) };
      } catch (e) {
        console.error('Failed to parse stored feature flags:', e);
        return defaultFeatureFlags;
      }
    }
    return defaultFeatureFlags;
  });

  // Save to localStorage whenever flags change
  useEffect(() => {
    localStorage.setItem('traceright_feature_flags', JSON.stringify(flags));
  }, [flags]);

  const isEnabled = (feature: keyof FeatureFlags): boolean => {
    return flags[feature];
  };

  const toggleFeature = (feature: keyof FeatureFlags) => {
    setFlags((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const enableFeature = (feature: keyof FeatureFlags) => {
    setFlags((prev) => ({
      ...prev,
      [feature]: true,
    }));
  };

  const disableFeature = (feature: keyof FeatureFlags) => {
    setFlags((prev) => ({
      ...prev,
      [feature]: false,
    }));
  };

  const resetFlags = () => {
    setFlags(defaultFeatureFlags);
  };

  const enableAll = () => {
    const allEnabled = Object.keys(defaultFeatureFlags).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as FeatureFlags
    );
    setFlags(allEnabled);
  };

  const disableAll = () => {
    const allDisabled = Object.keys(defaultFeatureFlags).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {} as FeatureFlags
    );
    setFlags(allDisabled);
  };

  const exportConfig = (): string => {
    return JSON.stringify(flags, null, 2);
  };

  const importConfig = (config: string) => {
    try {
      const imported = JSON.parse(config);
      setFlags({ ...defaultFeatureFlags, ...imported });
    } catch (e) {
      console.error('Failed to import config:', e);
    }
  };

  return (
    <FeatureFlagsContext.Provider
      value={{
        flags,
        isEnabled,
        toggleFeature,
        enableFeature,
        disableFeature,
        resetFlags,
        enableAll,
        disableAll,
        exportConfig,
        importConfig,
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within FeatureFlagsProvider');
  }
  return context;
}

// Convenience hook to check if a feature is enabled
export function useFeature(feature: keyof FeatureFlags): boolean {
  const { isEnabled } = useFeatureFlags();
  return isEnabled(feature);
}
