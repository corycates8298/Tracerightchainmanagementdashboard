/**
 * Mock data generators for TraceRight application
 * Used for demos and testing without backend
 */

import { randomBetween, randomItem } from './utils';

// Sample data arrays
const PRODUCT_NAMES = [
  'Widget A', 'Widget B', 'Gadget X', 'Gadget Y',
  'Component Alpha', 'Component Beta', 'Module Pro', 'Module Max',
  'Unit Standard', 'Unit Premium', 'Part Essential', 'Part Advanced'
];

const SUPPLIERS = [
  'Acme Corp', 'Global Supply Inc', 'TechParts Ltd', 'Prime Materials',
  'Superior Components', 'Elite Manufacturing', 'Advanced Systems',
  'Quality Supplies Co', 'Precision Parts', 'Innovative Solutions'
];

const LOCATIONS = [
  'Warehouse A - NY', 'Warehouse B - CA', 'Warehouse C - TX',
  'Distribution Center East', 'Distribution Center West',
  'Production Facility 1', 'Production Facility 2'
];

const STATUSES = ['Active', 'Pending', 'Completed', 'Cancelled', 'In Progress'];

const CATEGORIES = [
  'Electronics', 'Raw Materials', 'Finished Goods', 'Components',
  'Packaging', 'Tools', 'Supplies', 'Equipment'
];

/**
 * Generate mock order data
 */
export function generateMockOrders(count: number = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: `ORD-${String(i + 1000).padStart(5, '0')}`,
    orderNumber: `PO-${String(i + 2000).padStart(5, '0')}`,
    customer: randomItem(SUPPLIERS),
    product: randomItem(PRODUCT_NAMES),
    quantity: randomBetween(10, 1000),
    value: randomBetween(500, 50000),
    status: randomItem(STATUSES),
    orderDate: new Date(Date.now() - randomBetween(0, 90) * 24 * 60 * 60 * 1000),
    deliveryDate: new Date(Date.now() + randomBetween(1, 30) * 24 * 60 * 60 * 1000),
    location: randomItem(LOCATIONS),
    priority: randomItem(['Low', 'Medium', 'High', 'Urgent']),
  }));
}

/**
 * Generate mock inventory data
 */
export function generateMockInventory(count: number = 100) {
  return Array.from({ length: count }, (_, i) => ({
    id: `INV-${String(i + 1000).padStart(5, '0')}`,
    sku: `SKU-${String(i + 5000).padStart(6, '0')}`,
    product: randomItem(PRODUCT_NAMES),
    category: randomItem(CATEGORIES),
    quantity: randomBetween(0, 5000),
    reorderPoint: randomBetween(50, 500),
    location: randomItem(LOCATIONS),
    supplier: randomItem(SUPPLIERS),
    unitCost: randomBetween(5, 500),
    totalValue: 0, // calculated below
    lastRestocked: new Date(Date.now() - randomBetween(0, 60) * 24 * 60 * 60 * 1000),
    status: randomItem(['In Stock', 'Low Stock', 'Out of Stock', 'Discontinued']),
  })).map(item => ({
    ...item,
    totalValue: item.quantity * item.unitCost,
  }));
}

/**
 * Generate mock shipment data
 */
export function generateMockShipments(count: number = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: `SHP-${String(i + 3000).padStart(5, '0')}`,
    trackingNumber: `TRK-${Math.random().toString(36).substr(2, 12).toUpperCase()}`,
    origin: randomItem(LOCATIONS),
    destination: randomItem(['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL']),
    carrier: randomItem(['FedEx', 'UPS', 'DHL', 'USPS', 'Local Courier']),
    status: randomItem(['Pending', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed']),
    shipDate: new Date(Date.now() - randomBetween(0, 14) * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + randomBetween(1, 7) * 24 * 60 * 60 * 1000),
    weight: randomBetween(5, 500),
    items: randomBetween(1, 50),
    value: randomBetween(100, 10000),
  }));
}

/**
 * Generate mock production batch data
 */
export function generateMockBatches(count: number = 30) {
  return Array.from({ length: count }, (_, i) => ({
    id: `BATCH-${String(i + 1000).padStart(5, '0')}`,
    batchNumber: `BN-${new Date().getFullYear()}-${String(i + 100).padStart(4, '0')}`,
    product: randomItem(PRODUCT_NAMES),
    quantity: randomBetween(100, 5000),
    startDate: new Date(Date.now() - randomBetween(1, 30) * 24 * 60 * 60 * 1000),
    completionDate: new Date(Date.now() + randomBetween(1, 14) * 24 * 60 * 60 * 1000),
    status: randomItem(['Scheduled', 'In Production', 'Quality Check', 'Completed', 'On Hold']),
    yield: randomBetween(85, 99),
    defectRate: randomBetween(0.1, 5),
    location: randomItem(['Production Facility 1', 'Production Facility 2']),
    operator: `Operator ${randomBetween(1, 20)}`,
  }));
}

/**
 * Generate mock supplier data
 */
export function generateMockSuppliers(count: number = 20) {
  return Array.from({ length: count }, (_, i) => ({
    id: `SUP-${String(i + 1000).padStart(5, '0')}`,
    name: SUPPLIERS[i] || `Supplier ${i + 1}`,
    category: randomItem(CATEGORIES),
    rating: randomBetween(3, 5),
    onTimeDelivery: randomBetween(75, 100),
    qualityScore: randomBetween(80, 100),
    totalOrders: randomBetween(10, 500),
    totalValue: randomBetween(10000, 1000000),
    contact: `contact@supplier${i + 1}.com`,
    phone: `+1 (${randomBetween(200, 999)}) ${randomBetween(200, 999)}-${randomBetween(1000, 9999)}`,
    address: `${randomBetween(1, 9999)} Business St, City, ST ${randomBetween(10000, 99999)}`,
    status: randomItem(['Active', 'Inactive', 'Pending Approval']),
  }));
}

/**
 * Generate time series data for charts
 */
export function generateTimeSeriesData(
  points: number = 30,
  series: string[] = ['value'],
  min: number = 0,
  max: number = 100
) {
  const now = new Date();
  return Array.from({ length: points }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (points - i - 1));
    
    const point: any = {
      date: date.toISOString().split('T')[0],
      timestamp: date.getTime(),
    };
    
    series.forEach(seriesName => {
      point[seriesName] = randomBetween(min, max);
    });
    
    return point;
  });
}

/**
 * Generate sales data by region
 */
export function generateSalesByRegion() {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  return regions.map(region => ({
    region,
    sales: randomBetween(50000, 500000),
    orders: randomBetween(100, 1000),
    growth: randomBetween(-10, 50),
  }));
}

/**
 * Generate sales data by product category
 */
export function generateSalesByCategory() {
  return CATEGORIES.map(category => ({
    category,
    sales: randomBetween(10000, 200000),
    units: randomBetween(500, 5000),
    margin: randomBetween(10, 40),
  }));
}

/**
 * Generate KPI metrics
 */
export function generateKPIMetrics() {
  return {
    revenue: {
      value: randomBetween(100000, 1000000),
      trend: randomBetween(-15, 25),
      period: 'month',
    },
    orders: {
      value: randomBetween(500, 5000),
      trend: randomBetween(-10, 30),
      period: 'month',
    },
    fulfillmentRate: {
      value: randomBetween(85, 99),
      trend: randomBetween(-5, 10),
      period: 'month',
    },
    inventoryTurnover: {
      value: randomBetween(4, 12),
      trend: randomBetween(-2, 5),
      period: 'quarter',
    },
    onTimeDelivery: {
      value: randomBetween(90, 99),
      trend: randomBetween(-3, 7),
      period: 'month',
    },
    averageOrderValue: {
      value: randomBetween(500, 5000),
      trend: randomBetween(-8, 15),
      period: 'month',
    },
  };
}

/**
 * Generate alert/notification data
 */
export function generateAlerts(count: number = 10) {
  const types = ['info', 'warning', 'error', 'success'];
  const messages = [
    'Low inventory alert for Product A',
    'Shipment delayed for Order #12345',
    'Quality check failed for Batch #B-2024',
    'New order received: PO-54321',
    'Supplier delivery scheduled for tomorrow',
    'Production target exceeded by 15%',
    'Warehouse capacity at 85%',
    'System maintenance scheduled',
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ALERT-${i + 1}`,
    type: randomItem(types),
    message: randomItem(messages),
    timestamp: new Date(Date.now() - randomBetween(0, 24) * 60 * 60 * 1000),
    read: Math.random() > 0.5,
    priority: randomItem(['low', 'medium', 'high']),
  }));
}

/**
 * Generate forecast data
 */
export function generateForecastData(months: number = 12) {
  const now = new Date();
  let baseValue = randomBetween(1000, 5000);
  
  return Array.from({ length: months }, (_, i) => {
    const date = new Date(now);
    date.setMonth(date.getMonth() + i);
    
    // Add some variance and trend
    const variance = randomBetween(-200, 300);
    baseValue = Math.max(500, baseValue + variance);
    
    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      predicted: Math.round(baseValue),
      actual: i < 3 ? Math.round(baseValue * randomBetween(90, 110) / 100) : null,
      confidence: {
        lower: Math.round(baseValue * 0.85),
        upper: Math.round(baseValue * 1.15),
      },
    };
  });
}

/**
 * Generate warehouse efficiency data
 */
export function generateWarehouseData(count: number = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: `WH-${String(i + 1).padStart(3, '0')}`,
    name: `Warehouse ${String.fromCharCode(65 + i)}`,
    location: randomItem(['East Coast', 'West Coast', 'Central', 'South', 'North']),
    capacity: randomBetween(5000, 20000),
    utilized: randomBetween(3000, 18000),
    throughput: randomBetween(100, 500),
    efficiency: randomBetween(75, 98),
    orders: randomBetween(50, 500),
    staff: randomBetween(10, 50),
  })).map(wh => ({
    ...wh,
    utilizationRate: Math.round((wh.utilized / wh.capacity) * 100),
  }));
}

/**
 * Generate quality control data
 */
export function generateQualityData(count: number = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: `QC-${String(i + 1000).padStart(5, '0')}`,
    batch: `BATCH-${String(randomBetween(1000, 1100)).padStart(5, '0')}`,
    product: randomItem(PRODUCT_NAMES),
    inspector: `Inspector ${randomBetween(1, 10)}`,
    date: new Date(Date.now() - randomBetween(0, 30) * 24 * 60 * 60 * 1000),
    samplesInspected: randomBetween(10, 100),
    defectsFound: randomBetween(0, 10),
    status: randomItem(['Passed', 'Failed', 'Quarantine', 'Retest Required']),
    severity: randomItem(['None', 'Minor', 'Major', 'Critical']),
  })).map(qc => ({
    ...qc,
    passRate: qc.samplesInspected > 0 
      ? Math.round(((qc.samplesInspected - qc.defectsFound) / qc.samplesInspected) * 100)
      : 100,
  }));
}

/**
 * Generate traceability chain data
 */
export function generateTraceabilityChain() {
  return {
    productId: 'PROD-12345',
    productName: randomItem(PRODUCT_NAMES),
    currentLocation: randomItem(LOCATIONS),
    status: 'In Stock',
    chain: [
      {
        stage: 'Raw Material',
        supplier: randomItem(SUPPLIERS),
        location: 'Supplier Facility',
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        lot: 'LOT-RM-2024-001',
        verified: true,
      },
      {
        stage: 'Received',
        location: randomItem(LOCATIONS),
        date: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
        inspector: 'Inspector 3',
        qcStatus: 'Passed',
        verified: true,
      },
      {
        stage: 'Production',
        batch: 'BATCH-10045',
        location: 'Production Facility 1',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        operator: 'Operator 7',
        verified: true,
      },
      {
        stage: 'Quality Control',
        location: 'QC Lab',
        date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
        inspector: 'Inspector 5',
        result: 'Passed',
        verified: true,
      },
      {
        stage: 'Storage',
        location: randomItem(LOCATIONS),
        date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
        verified: true,
      },
    ],
  };
}

/**
 * Generate dashboard widget data
 */
export function generateDashboardData() {
  return {
    kpis: generateKPIMetrics(),
    recentOrders: generateMockOrders(10),
    alerts: generateAlerts(5),
    salesTrend: generateTimeSeriesData(30, ['sales', 'orders'], 0, 1000),
    topProducts: Array.from({ length: 5 }, (_, i) => ({
      product: PRODUCT_NAMES[i],
      sales: randomBetween(10000, 100000),
      units: randomBetween(100, 1000),
      trend: randomBetween(-10, 30),
    })),
  };
}

// Export all generators as a single object for convenience
export const MockData = {
  orders: generateMockOrders,
  inventory: generateMockInventory,
  shipments: generateMockShipments,
  batches: generateMockBatches,
  suppliers: generateMockSuppliers,
  timeSeries: generateTimeSeriesData,
  salesByRegion: generateSalesByRegion,
  salesByCategory: generateSalesByCategory,
  kpis: generateKPIMetrics,
  alerts: generateAlerts,
  forecast: generateForecastData,
  warehouses: generateWarehouseData,
  quality: generateQualityData,
  traceability: generateTraceabilityChain,
  dashboard: generateDashboardData,
};
