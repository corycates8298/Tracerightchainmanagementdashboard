/**
 * Fake Data Generator using Faker.js
 * 
 * INSTALLATION REQUIRED:
 * npm install @faker-js/faker
 * 
 * This file provides functions to generate realistic test data
 * for all TraceRight modules.
 */

// UNCOMMENT AFTER INSTALLING FAKER:
// import { faker } from '@faker-js/faker';

/**
 * Generate fake orders
 */
export function generateFakeOrders(count: number = 250) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const orders = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  for (let i = 0; i < count; i++) {
    orders.push({
      id: faker.string.uuid(),
      orderNumber: `ORD-${faker.number.int({ min: 10000, max: 99999 })}`,
      customer: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        phone: faker.phone.number(),
      },
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        sku: faker.string.alphanumeric(8).toUpperCase(),
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 100 }),
        price: parseFloat(faker.commerce.price()),
      })),
      status: faker.helpers.arrayElement(statuses),
      priority: faker.helpers.arrayElement(priorities),
      total: parseFloat(faker.commerce.price({ min: 100, max: 10000 })),
      orderDate: faker.date.past({ years: 1 }),
      expectedDelivery: faker.date.future({ years: 0.1 }),
      shippingAddress: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
      },
      trackingNumber: faker.string.alphanumeric(16).toUpperCase(),
      notes: faker.lorem.sentence(),
    });
  }
  
  return orders;
  */
  
  // PLACEHOLDER - Remove after installing Faker
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate fake inventory items
 */
export function generateFakeInventory(count: number = 150) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const inventory = [];
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Food', 'Tools', 'Medical'];
  const warehouses = ['WH-001', 'WH-002', 'WH-003', 'WH-004', 'WH-005'];
  
  for (let i = 0; i < count; i++) {
    const stock = faker.number.int({ min: 0, max: 1000 });
    const reorderPoint = faker.number.int({ min: 10, max: 100 });
    
    inventory.push({
      id: faker.string.uuid(),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement(categories),
      warehouse: faker.helpers.arrayElement(warehouses),
      quantity: stock,
      reorderPoint: reorderPoint,
      reorderQuantity: faker.number.int({ min: 50, max: 500 }),
      needsReorder: stock < reorderPoint,
      unitCost: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
      unitPrice: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      supplier: {
        name: faker.company.name(),
        contact: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
      },
      lastRestocked: faker.date.recent({ days: 30 }),
      location: {
        aisle: faker.number.int({ min: 1, max: 20 }),
        shelf: faker.number.int({ min: 1, max: 10 }),
        bin: faker.number.int({ min: 1, max: 50 }),
      },
      weight: faker.number.float({ min: 0.1, max: 100, precision: 0.01 }),
      dimensions: {
        length: faker.number.float({ min: 1, max: 100, precision: 0.1 }),
        width: faker.number.float({ min: 1, max: 100, precision: 0.1 }),
        height: faker.number.float({ min: 1, max: 100, precision: 0.1 }),
      },
      barcode: faker.string.numeric(13),
    });
  }
  
  return inventory;
  */
  
  // PLACEHOLDER
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate fake shipments
 */
export function generateFakeShipments(count: number = 200) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const shipments = [];
  const carriers = ['FedEx', 'UPS', 'DHL', 'USPS', 'Amazon Logistics'];
  const statuses = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'exception'];
  
  for (let i = 0; i < count; i++) {
    shipments.push({
      id: faker.string.uuid(),
      trackingNumber: faker.string.alphanumeric(16).toUpperCase(),
      carrier: faker.helpers.arrayElement(carriers),
      status: faker.helpers.arrayElement(statuses),
      origin: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
      },
      destination: {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
      },
      shipDate: faker.date.recent({ days: 14 }),
      estimatedDelivery: faker.date.soon({ days: 7 }),
      actualDelivery: faker.datatype.boolean() ? faker.date.recent({ days: 3 }) : null,
      weight: faker.number.float({ min: 0.5, max: 100, precision: 0.01 }),
      dimensions: {
        length: faker.number.int({ min: 5, max: 50 }),
        width: faker.number.int({ min: 5, max: 50 }),
        height: faker.number.int({ min: 5, max: 50 }),
      },
      cost: parseFloat(faker.commerce.price({ min: 5, max: 200 })),
      items: faker.number.int({ min: 1, max: 10 }),
      notes: faker.lorem.sentence(),
    });
  }
  
  return shipments;
  */
  
  // PLACEHOLDER
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate fake suppliers
 */
export function generateFakeSuppliers(count: number = 100) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const suppliers = [];
  const ratings = [3, 3.5, 4, 4.5, 5];
  const statuses = ['active', 'pending', 'inactive', 'blacklisted'];
  
  for (let i = 0; i < count; i++) {
    suppliers.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      code: `SUP-${faker.string.alphanumeric(6).toUpperCase()}`,
      contact: {
        primary: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        mobile: faker.phone.number(),
      },
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
      },
      rating: faker.helpers.arrayElement(ratings),
      status: faker.helpers.arrayElement(statuses),
      category: faker.commerce.department(),
      productsSupplied: faker.number.int({ min: 5, max: 200 }),
      totalOrders: faker.number.int({ min: 10, max: 1000 }),
      totalValue: parseFloat(faker.commerce.price({ min: 10000, max: 1000000 })),
      paymentTerms: faker.helpers.arrayElement(['Net 30', 'Net 60', 'Net 90', 'COD']),
      leadTime: faker.number.int({ min: 1, max: 30 }),
      minimumOrder: parseFloat(faker.commerce.price({ min: 100, max: 5000 })),
      website: faker.internet.url(),
      joinedDate: faker.date.past({ years: 5 }),
      lastOrderDate: faker.date.recent({ days: 90 }),
    });
  }
  
  return suppliers;
  */
  
  // PLACEHOLDER
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate fake analytics data
 */
export function generateFakeAnalytics(days: number = 90) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const analytics = [];
  
  for (let i = 0; i < days; i++) {
    const date = faker.date.recent({ days: i });
    
    analytics.push({
      date: date.toISOString().split('T')[0],
      orders: {
        total: faker.number.int({ min: 10, max: 200 }),
        completed: faker.number.int({ min: 8, max: 180 }),
        pending: faker.number.int({ min: 1, max: 20 }),
        cancelled: faker.number.int({ min: 0, max: 10 }),
      },
      revenue: {
        total: parseFloat(faker.commerce.price({ min: 5000, max: 50000 })),
        shipping: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
        taxes: parseFloat(faker.commerce.price({ min: 300, max: 3000 })),
      },
      inventory: {
        lowStock: faker.number.int({ min: 5, max: 30 }),
        outOfStock: faker.number.int({ min: 0, max: 10 }),
        totalItems: faker.number.int({ min: 500, max: 1500 }),
      },
      shipments: {
        total: faker.number.int({ min: 10, max: 150 }),
        delivered: faker.number.int({ min: 8, max: 120 }),
        inTransit: faker.number.int({ min: 2, max: 30 }),
        delayed: faker.number.int({ min: 0, max: 5 }),
      },
      customers: {
        new: faker.number.int({ min: 1, max: 20 }),
        returning: faker.number.int({ min: 5, max: 50 }),
        total: faker.number.int({ min: 100, max: 1000 }),
      },
    });
  }
  
  return analytics;
  */
  
  // PLACEHOLDER
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate fake production batches
 */
export function generateFakeBatches(count: number = 50) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const batches = [];
  const statuses = ['planning', 'in_progress', 'quality_check', 'completed', 'failed'];
  
  for (let i = 0; i < count; i++) {
    batches.push({
      id: faker.string.uuid(),
      batchNumber: `BATCH-${faker.string.alphanumeric(8).toUpperCase()}`,
      product: faker.commerce.productName(),
      quantity: faker.number.int({ min: 100, max: 10000 }),
      status: faker.helpers.arrayElement(statuses),
      startDate: faker.date.recent({ days: 30 }),
      endDate: faker.date.soon({ days: 7 }),
      qualityScore: faker.number.float({ min: 85, max: 100, precision: 0.1 }),
      defects: faker.number.int({ min: 0, max: 50 }),
      yield: faker.number.float({ min: 90, max: 99.9, precision: 0.1 }),
      supervisor: faker.person.fullName(),
      shift: faker.helpers.arrayElement(['Morning', 'Afternoon', 'Night']),
      notes: faker.lorem.sentence(),
    });
  }
  
  return batches;
  */
  
  // PLACEHOLDER
  console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
  return [];
}

/**
 * Generate all fake data at once
 */
export function generateAllFakeData() {
  return {
    orders: generateFakeOrders(250),
    inventory: generateFakeInventory(150),
    shipments: generateFakeShipments(200),
    suppliers: generateFakeSuppliers(100),
    analytics: generateFakeAnalytics(90),
    batches: generateFakeBatches(50),
    timestamp: new Date().toISOString(),
    totalRecords: 840,
  };
}

/**
 * Export data as JSON
 */
export function exportFakeDataAsJSON(data: any) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `traceright-fake-data-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Save data to localStorage
 */
export function saveFakeDataToStorage(data: any) {
  try {
    localStorage.setItem('traceright_fake_data', JSON.stringify(data));
    localStorage.setItem('traceright_fake_data_timestamp', new Date().toISOString());
    return true;
  } catch (error) {
    console.error('Failed to save data to localStorage:', error);
    return false;
  }
}

/**
 * Load data from localStorage
 */
export function loadFakeDataFromStorage() {
  try {
    const data = localStorage.getItem('traceright_fake_data');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load data from localStorage:', error);
    return null;
  }
}

/**
 * Clear fake data from localStorage
 */
export function clearFakeDataFromStorage() {
  try {
    localStorage.removeItem('traceright_fake_data');
    localStorage.removeItem('traceright_fake_data_timestamp');
    return true;
  } catch (error) {
    console.error('Failed to clear data from localStorage:', error);
    return false;
  }
}
