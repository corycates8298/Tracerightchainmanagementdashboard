# Widget Data Integration Examples

## Overview
This guide shows how to connect TraceRight's widget system with real data sources (Firestore, BigQuery, API endpoints).

## 1. Firestore Real-Time Integration

### Example: KPI Widget with Live Order Count

```typescript
// In your component or custom hook
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase-config';

function useLiveOrderCount() {
  const [kpiData, setKpiData] = useState({
    label: 'Active Orders',
    value: '0',
    change: '0%',
    trend: 'up' as const
  });

  useEffect(() => {
    const ordersRef = collection(firestore, 'orders');
    const activeQuery = query(
      ordersRef, 
      where('status', 'in', ['processing', 'in-transit'])
    );

    const unsubscribe = onSnapshot(activeQuery, (snapshot) => {
      const count = snapshot.size;
      const previousCount = parseInt(localStorage.getItem('previousOrderCount') || '0');
      const change = previousCount > 0 
        ? ((count - previousCount) / previousCount * 100).toFixed(1)
        : '0';

      setKpiData({
        label: 'Active Orders',
        value: count.toString(),
        change: `${change > 0 ? '+' : ''}${change}%`,
        trend: change >= 0 ? 'up' : 'down'
      });

      localStorage.setItem('previousOrderCount', count.toString());
    });

    return () => unsubscribe();
  }, []);

  return kpiData;
}

// Usage in DashboardView or custom dashboard
const liveOrderData = useLiveOrderCount();

// Update widget config
const widget: WidgetConfig = {
  id: 'live-orders',
  type: 'kpi',
  title: 'Active Orders',
  data: liveOrderData,
  // ... rest of config
};
```

## 2. BigQuery Analytics Integration

### Example: Revenue Chart with Historical Data

```typescript
import { useState, useEffect } from 'react';

interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

async function fetchRevenueData(): Promise<RevenueDataPoint[]> {
  // Using Cloud Functions to query BigQuery
  const response = await fetch('https://us-central1-your-project.cloudfunctions.net/getRevenueData', {
    headers: {
      'Authorization': `Bearer ${await getAuthToken()}`
    }
  });
  
  const data = await response.json();
  return data.rows;
}

function useRevenueChart() {
  const [chartData, setChartData] = useState<RevenueDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData()
      .then(data => {
        setChartData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch revenue data:', error);
        setLoading(false);
      });
  }, []);

  return { chartData, loading };
}

// Cloud Function example (BigQuery)
// functions/getRevenueData.js
const { BigQuery } = require('@google-cloud/bigquery');

exports.getRevenueData = async (req, res) => {
  const bigquery = new BigQuery();
  
  const query = `
    SELECT 
      FORMAT_DATE('%b', date) as month,
      SUM(total_amount) as revenue,
      COUNT(DISTINCT order_id) as orders
    FROM \`your-project.analytics.orders\`
    WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
    GROUP BY month, date
    ORDER BY date
  `;

  const [rows] = await bigquery.query(query);
  res.json({ rows });
};
```

## 3. REST API Integration

### Example: Activity Feed from External API

```typescript
interface Activity {
  id: number;
  message: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

async function fetchRecentActivities(): Promise<Activity[]> {
  const response = await fetch('/api/activities/recent?limit=10', {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  
  const data = await response.json();
  
  // Transform API data to widget format
  return data.activities.map((activity: any) => ({
    id: activity.id,
    message: activity.description,
    time: formatRelativeTime(activity.timestamp),
    status: mapPriorityToStatus(activity.priority)
  }));
}

function useActivityFeed(refreshInterval = 30000) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecentActivities();
        setActivities(data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return activities;
}
```

## 4. Creating a Custom Widget with Live Data

### Example: Warehouse Utilization Widget

```typescript
// components/CustomWarehouseWidget.tsx
import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useTheme } from './ThemeContext';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase-config';

interface WarehouseData {
  warehouse: string;
  utilization: number;
  capacity: number;
}

export function CustomWarehouseWidget({ config }: WidgetProps) {
  const [data, setData] = useState<WarehouseData[]>([]);
  const { gradientStyleValue } = useTheme();

  useEffect(() => {
    const fetchWarehouseData = async () => {
      const warehousesRef = collection(firestore, 'inventoryLocations');
      const q = query(warehousesRef);
      const snapshot = await getDocs(q);

      const warehouseData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          warehouse: data.name,
          utilization: (data.currentStock / data.maxCapacity) * 100,
          capacity: data.maxCapacity
        };
      });

      setData(warehouseData);
    };

    fetchWarehouseData();
    const interval = setInterval(fetchWarehouseData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 border-slate-200 h-full">
      <h3 className="text-slate-900 mb-4">{config.title}</h3>
      <div className="space-y-4">
        {data.map((warehouse) => (
          <div key={warehouse.warehouse}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-900">{warehouse.warehouse}</span>
              <Badge variant="outline">{Math.round(warehouse.utilization)}% Full</Badge>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ 
                  width: `${warehouse.utilization}%`,
                  background: gradientStyleValue
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Register in WidgetLibrary.tsx
export const WIDGET_COMPONENTS = {
  // ... existing widgets
  'warehouse-utilization': CustomWarehouseWidget,
};
```

## 5. Real-Time Updates with Firestore Listeners

### Example: Multi-Metric Dashboard

```typescript
import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { firestore } from './firebase-config';

interface DashboardMetrics {
  totalRevenue: number;
  activeShipments: number;
  onTimeDelivery: number;
  delayedOrders: number;
}

function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    activeShipments: 0,
    onTimeDelivery: 0,
    delayedOrders: 0
  });

  useEffect(() => {
    // Revenue listener
    const invoicesRef = collection(firestore, 'invoices');
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);

    const revenueQuery = query(
      invoicesRef,
      where('type', '==', 'sales'),
      where('date', '>=', Timestamp.fromDate(currentMonthStart)),
      where('status', '==', 'paid')
    );

    const unsubscribeRevenue = onSnapshot(revenueQuery, (snapshot) => {
      const total = snapshot.docs.reduce((sum, doc) => {
        return sum + (doc.data().amount || 0);
      }, 0);

      setMetrics(prev => ({ ...prev, totalRevenue: total }));
    });

    // Active shipments listener
    const shipmentsRef = collection(firestore, 'shipments');
    const activeQuery = query(
      shipmentsRef,
      where('status', 'in', ['in-transit', 'dispatched'])
    );

    const unsubscribeShipments = onSnapshot(activeQuery, (snapshot) => {
      setMetrics(prev => ({ ...prev, activeShipments: snapshot.size }));
    });

    // Delayed orders listener
    const ordersRef = collection(firestore, 'orders');
    const delayedQuery = query(
      ordersRef,
      where('status', '==', 'delayed')
    );

    const unsubscribeDelayed = onSnapshot(delayedQuery, (snapshot) => {
      setMetrics(prev => ({ ...prev, delayedOrders: snapshot.size }));
    });

    return () => {
      unsubscribeRevenue();
      unsubscribeShipments();
      unsubscribeDelayed();
    };
  }, []);

  return metrics;
}

// Usage
function DashboardWithLiveData() {
  const metrics = useDashboardMetrics();

  const widgets: WidgetConfig[] = [
    {
      id: 'revenue-kpi',
      type: 'kpi',
      title: 'Monthly Revenue',
      data: {
        label: 'Monthly Revenue',
        value: `$${(metrics.totalRevenue / 1000000).toFixed(1)}M`,
        change: '+18.2%',
        trend: 'up'
      },
      // ... rest
    },
    // ... more widgets
  ];

  return <CustomDashboard widgets={widgets} />;
}
```

## 6. Firebase Remote Config Integration

### Example: Feature-Flagged Widgets

```typescript
import { getRemoteConfig, getValue, fetchAndActivate } from 'firebase/remote-config';

async function getEnabledWidgets(): Promise<string[]> {
  const remoteConfig = getRemoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

  await fetchAndActivate(remoteConfig);

  const enabledWidgets = getValue(remoteConfig, 'enabled_widget_types').asString();
  return JSON.parse(enabledWidgets);
}

// Filter widget catalog based on remote config
async function getFilteredWidgetCatalog() {
  const enabledTypes = await getEnabledWidgets();
  
  return WIDGET_CATALOG.filter(widget => 
    enabledTypes.includes(widget.type)
  );
}

// Remote Config parameters to set in Firebase Console:
// enabled_widget_types: ["kpi", "area-chart", "bar-chart", "activity-feed"]
```

## 7. Cloud Functions for Data Processing

### Example: Aggregated Analytics

```javascript
// functions/aggregateAnalytics.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { BigQuery } = require('@google-cloud/bigquery');

exports.aggregateAnalytics = functions.pubsub
  .schedule('0 2 * * *') // Run daily at 2 AM
  .onRun(async (context) => {
    const bigquery = new BigQuery();
    const firestore = admin.firestore();

    // Query BigQuery for analytics
    const query = `
      SELECT 
        DATE_TRUNC(date, MONTH) as month,
        SUM(revenue) as total_revenue,
        COUNT(DISTINCT order_id) as order_count,
        AVG(delivery_time_hours) as avg_delivery_time
      FROM \`analytics.orders\`
      WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
      GROUP BY month
      ORDER BY month
    `;

    const [rows] = await bigquery.query(query);

    // Store aggregated data in Firestore for fast widget access
    const batch = firestore.batch();
    
    rows.forEach(row => {
      const docRef = firestore.collection('analytics_cache').doc(row.month);
      batch.set(docRef, {
        ...row,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    await batch.commit();
    
    console.log('Analytics aggregation completed');
  });
```

## 8. Best Practices

### Performance Optimization
```typescript
// Use React Query for caching and automatic refetching
import { useQuery } from '@tanstack/react-query';

function useWidgetData(widgetId: string) {
  return useQuery({
    queryKey: ['widget', widgetId],
    queryFn: () => fetchWidgetData(widgetId),
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // 5 minutes
  });
}
```

### Error Handling
```typescript
function useRobustWidgetData(widgetId: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    const fetchWithRetry = async () => {
      try {
        const result = await fetchWidgetData(widgetId);
        setData(result);
        setError(null);
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchWithRetry, 1000 * retryCount); // Exponential backoff
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWithRetry();
  }, [widgetId]);

  return { data, error, loading };
}
```

### Data Transformation
```typescript
// Transform Firestore data to widget format
function transformOrderDataForChart(orders: any[]) {
  const monthlyData = orders.reduce((acc, order) => {
    const month = format(order.date.toDate(), 'MMM');
    
    if (!acc[month]) {
      acc[month] = { month, revenue: 0, orders: 0 };
    }
    
    acc[month].revenue += order.total;
    acc[month].orders += 1;
    
    return acc;
  }, {} as Record<string, any>);

  return Object.values(monthlyData);
}
```

## 9. Security Considerations

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read analytics
    match /analytics_cache/{document} {
      allow read: if request.auth != null;
      allow write: if false; // Only Cloud Functions can write
    }
    
    // Users can only read their own custom dashboards
    match /user_dashboards/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### API Authentication
```typescript
// Secure API calls with auth tokens
async function fetchProtectedData(endpoint: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('User not authenticated');
  }

  const token = await user.getIdToken();
  
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
```

---

**Remember**: Always sanitize and validate data from external sources before displaying in widgets!
