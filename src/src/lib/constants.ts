/**
 * Application-wide constants and configuration
 */

// Application metadata
export const APP_NAME = 'TraceRight';
export const APP_VERSION = '2.0.0';
export const APP_DESCRIPTION = 'AI-powered supply chain management platform';

// API endpoints (configure in .env for production)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Feature flags (can be overridden by Firebase Remote Config)
export const DEFAULT_FEATURES = {
  enableCoreLogistics: true,
  enableProduction: true,
  enableIntelligence: true,
  enableSystem: true,
  enableDashboard3D: false,
  enableCyberpunkTheme: false,
  enableAdvancedCharts: true,
} as const;

// Theme presets
export const THEME_PRESETS = {
  purple: {
    name: 'Purple Gradient',
    hue: 270,
    saturation: 75,
    lightness: 50,
    gradientAngle: 135,
    accentIntensity: 60,
  },
  blue: {
    name: 'Ocean Blue',
    hue: 210,
    saturation: 80,
    lightness: 50,
    gradientAngle: 135,
    accentIntensity: 60,
  },
  green: {
    name: 'Forest Green',
    hue: 150,
    saturation: 70,
    lightness: 45,
    gradientAngle: 135,
    accentIntensity: 55,
  },
  orange: {
    name: 'Sunset Orange',
    hue: 30,
    saturation: 85,
    lightness: 55,
    gradientAngle: 135,
    accentIntensity: 65,
  },
  rose: {
    name: 'Rose Gold',
    hue: 340,
    saturation: 70,
    lightness: 60,
    gradientAngle: 135,
    accentIntensity: 60,
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    hue: 180,
    saturation: 100,
    lightness: 50,
    gradientAngle: 90,
    accentIntensity: 90,
  },
  monochrome: {
    name: 'Monochrome',
    hue: 0,
    saturation: 0,
    lightness: 50,
    gradientAngle: 135,
    accentIntensity: 40,
  },
} as const;

// Status colors
export const STATUS_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  neutral: '#64748b',
} as const;

// Chart color schemes
export const CHART_COLORS = {
  purple: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
  blue: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
  green: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
  multi: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'],
} as const;

// Module routes
export const ROUTES = {
  // Core Logistics
  dashboard: '/',
  inboundReceipts: '/inbound-receipts',
  outboundShipments: '/outbound-shipments',
  logistics: '/logistics',
  warehouseOps: '/warehouse-ops',
  
  // Production
  rawMaterials: '/raw-materials',
  batches: '/batches',
  recipes: '/recipes',
  purchaseOrders: '/purchase-orders',
  
  // Intelligence
  aiForecasting: '/ai-forecasting',
  mlIntelligence: '/ml-intelligence',
  materialsIntelligence: '/materials-intelligence',
  traceability: '/traceability',
  aiReporting: '/ai-reporting',
  
  // System
  governance: '/governance',
  administration: '/administration',
  suppliers: '/suppliers',
  about: '/about',
  
  // Showcases
  visualizationShowcase: '/visualization-showcase',
  sheetsShowcase: '/sheets-showcase',
  advancedCharts: '/advanced-charts',
} as const;

// Navigation groups
export const NAV_GROUPS = [
  {
    id: 'core-logistics',
    label: 'Core Logistics',
    icon: 'Package',
    routes: ['dashboard', 'inboundReceipts', 'outboundShipments', 'logistics', 'warehouseOps'],
  },
  {
    id: 'production',
    label: 'Production',
    icon: 'Factory',
    routes: ['rawMaterials', 'batches', 'recipes', 'purchaseOrders'],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    icon: 'Brain',
    routes: ['aiForecasting', 'mlIntelligence', 'materialsIntelligence', 'traceability', 'aiReporting'],
  },
  {
    id: 'system',
    label: 'System',
    icon: 'Settings',
    routes: ['governance', 'administration', 'suppliers', 'about'],
  },
] as const;

// Pagination defaults
export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 25, 50, 100],
  maxPageButtons: 5,
} as const;

// Date formats
export const DATE_FORMATS = {
  short: 'MMM d, yyyy',
  long: 'MMMM d, yyyy',
  time: 'h:mm a',
  datetime: 'MMM d, yyyy h:mm a',
  iso: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// File upload limits
export const FILE_UPLOAD = {
  maxSizeMB: 10,
  acceptedTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
  },
} as const;

// Validation rules
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
} as const;

// Timeouts
export const TIMEOUTS = {
  apiRequest: 30000, // 30 seconds
  toast: 5000, // 5 seconds
  debounce: 300, // 300ms
  throttle: 1000, // 1 second
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'traceright_theme',
  featureFlags: 'traceright_feature_flags',
  userPreferences: 'traceright_user_preferences',
  dashboardLayout: 'traceright_dashboard_layout',
  recentSearches: 'traceright_recent_searches',
} as const;

// Dashboard widget types
export const WIDGET_TYPES = {
  metric: 'metric',
  chart: 'chart',
  table: 'table',
  custom: 'custom',
} as const;

// Chart types
export const CHART_TYPES = {
  line: 'line',
  bar: 'bar',
  area: 'area',
  pie: 'pie',
  donut: 'donut',
  scatter: 'scatter',
  radar: 'radar',
  sankey: 'sankey',
  treemap: 'treemap',
  funnel: 'funnel',
  gauge: 'gauge',
  heatmap: 'heatmap',
  waterfall: 'waterfall',
  candlestick: 'candlestick',
  bubble: 'bubble',
} as const;

// Severity levels
export const SEVERITY_LEVELS = {
  NONE: 'NONE',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL',
} as const;

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Shipment statuses
export const SHIPMENT_STATUSES = {
  PENDING: 'pending',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  DELAYED: 'delayed',
  RETURNED: 'returned',
} as const;

// Inventory statuses
export const INVENTORY_STATUSES = {
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  DISCONTINUED: 'discontinued',
} as const;

// Quality check statuses
export const QC_STATUSES = {
  PENDING: 'pending',
  PASSED: 'passed',
  FAILED: 'failed',
  QUARANTINE: 'quarantine',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Role permissions
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
} as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (must match Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  TIMEOUT: 'Request timed out. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Successfully saved!',
  UPDATED: 'Successfully updated!',
  DELETED: 'Successfully deleted!',
  UPLOADED: 'Successfully uploaded!',
  SENT: 'Successfully sent!',
} as const;

// Mock data generation helpers
export const MOCK_DATA_CONFIG = {
  generateCount: 50,
  dateRange: 90, // days
  minValue: 100,
  maxValue: 10000,
} as const;
