# 🎲 Faker.js Setup Guide - 5 Minute Installation

> **Get the fake data generator working in 5 minutes**

---

## 📋 What You're Setting Up

The **Fake Data Generator** button in Administration will generate 840+ realistic records including orders, inventory, shipments, suppliers, analytics, and production batches.

---

## 🚀 Quick Installation (3 Steps)

### Step 1: Install Faker.js (1 minute)

```bash
# In your TraceRight project directory
npm install @faker-js/faker
```

Wait for installation to complete.

---

### Step 2: Activate the Generator Code (2 minutes)

Open `/src/lib/fake-data-generator.ts` and make these changes:

#### 2.1: Uncomment the Import (Line 7)

**Before**:
```typescript
// UNCOMMENT AFTER INSTALLING FAKER:
// import { faker } from '@faker-js/faker';
```

**After**:
```typescript
// UNCOMMENT AFTER INSTALLING FAKER:
import { faker } from '@faker-js/faker';
```

#### 2.2: Uncomment Function Bodies

Find each function (6 total) and uncomment the code inside:

**Functions to Uncomment**:
1. `generateFakeOrders()` - Lines ~15-60
2. `generateFakeInventory()` - Lines ~70-130
3. `generateFakeShipments()` - Lines ~140-180
4. `generateFakeBatches()` - Lines ~190-230
5. `generateFakeSuppliers()` - Lines ~240-290
6. `generateFakeAnalytics()` - Lines ~300-350

**Before** (example):
```typescript
export function generateFakeOrders(count: number = 250) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  /*
  const orders = [];
  ... code ...
  return orders;
  */
  
  // PLACEHOLDER - Remove after installing Faker
  console.warn('Faker.js not installed...');
  return [];
}
```

**After** (example):
```typescript
export function generateFakeOrders(count: number = 250) {
  // UNCOMMENT AFTER INSTALLING FAKER:
  const orders = [];
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const priorities = ['low', 'medium', 'high', 'urgent'];
  
  for (let i = 0; i < count; i++) {
    orders.push({
      id: faker.string.uuid(),
      orderNumber: `ORD-${faker.number.int({ min: 10000, max: 99999 })}`,
      // ... rest of code ...
    });
  }
  
  return orders;
}
```

#### 2.3: Remove Placeholder Warnings

Delete these lines from each function:
```typescript
// PLACEHOLDER - Remove after installing Faker
console.warn('Faker.js not installed. Run: npm install @faker-js/faker');
return [];
```

---

### Step 3: Test It (2 minutes)

```bash
# Start your dev server
npm run dev
```

1. **Open TraceRight** in browser
2. **Navigate to Administration**
3. **Find "Fake Data Generator"** panel (blue card)
4. **Click "Generate Fake Data"**
5. **Wait 2 seconds**
6. **See success message**: "Successfully generated fake data!"

---

## ✅ Verification

You should see:

```
✅ Successfully generated fake data!
Created 840 records across all modules

• 250 Orders with tracking numbers
• 150 Inventory items across 5 warehouses
• 200 Shipments with logistics data
• 100 Supplier records with contacts
• 90 days of Analytics events and KPIs
• 50 Production batches
```

---

## 🎯 Using the Generated Data

### View in Browser Console

```javascript
// Open browser console (F12)
const data = JSON.parse(localStorage.getItem('traceright_fake_data'));
console.log(data.orders);      // See all orders
console.log(data.inventory);   // See all inventory
console.log(data.shipments);   // See all shipments
```

### Export as JSON

1. Click **"Export Data"** button in Administration
2. Downloads `traceright-fake-data-[timestamp].json`
3. Use in other tools, testing, or share with team

### Use in Your Components

```typescript
import { loadFakeDataFromStorage } from '../src/lib/fake-data-generator';

function MyComponent() {
  const fakeData = loadFakeDataFromStorage();
  
  if (fakeData) {
    console.log(`Using ${fakeData.orders.length} fake orders`);
    // Use fakeData.orders, fakeData.inventory, etc.
  }
}
```

---

## 🔧 Advanced Configuration

### Customize Data Volume

Edit the function calls in `generateAllFakeData()`:

```typescript
export function generateAllFakeData() {
  return {
    orders: generateFakeOrders(500),        // Change from 250 to 500
    inventory: generateFakeInventory(300),  // Change from 150 to 300
    shipments: generateFakeShipments(400),  // Change from 200 to 400
    suppliers: generateFakeSuppliers(200),  // Change from 100 to 200
    analytics: generateFakeAnalytics(180),  // Change from 90 to 180
    batches: generateFakeBatches(100),      // Change from 50 to 100
    timestamp: new Date().toISOString(),
    totalRecords: 1680,  // Update total
  };
}
```

### Customize Data Fields

Edit individual generator functions to add/remove fields:

```typescript
// In generateFakeOrders()
orders.push({
  id: faker.string.uuid(),
  orderNumber: `ORD-${faker.number.int({ min: 10000, max: 99999 })}`,
  
  // ADD NEW FIELDS:
  paymentMethod: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Wire Transfer']),
  discount: faker.number.float({ min: 0, max: 50, precision: 0.01 }),
  
  // ... existing fields ...
});
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@faker-js/faker'"

**Solution**:
```bash
# Make sure you're in the project directory
cd /path/to/traceright-app

# Install faker
npm install @faker-js/faker

# If error persists, try:
rm -rf node_modules package-lock.json
npm install
```

### Error: "faker is not defined"

**Solution**: You forgot to uncomment the import. Add this to top of file:
```typescript
import { faker } from '@faker-js/faker';
```

### Warning: "Faker.js not installed..."

**Solution**: You didn't uncomment the function bodies. Go back to Step 2.2.

### Button Does Nothing

**Solution**: 
1. Check browser console (F12) for errors
2. Make sure all functions are uncommented
3. Restart dev server: `npm run dev`

### localStorage Full Error

**Solution**:
```typescript
// Clear existing data first
localStorage.clear();

// Or just clear TraceRight data
localStorage.removeItem('traceright_fake_data');
```

---

## 📊 What Data Gets Generated

### Orders (250)
- Unique UUIDs and order numbers
- Customer details (name, email, company, phone)
- 1-5 items per order with SKUs and prices
- Status (pending, processing, shipped, delivered, cancelled)
- Priority levels
- Shipping addresses
- Tracking numbers
- Order and delivery dates
- Notes

### Inventory (150)
- SKUs and product names
- Descriptions and categories
- Warehouse locations (5 warehouses)
- Stock quantities
- Reorder points and quantities
- Unit costs and prices
- Supplier information
- Last restocked dates
- Physical locations (aisle, shelf, bin)
- Dimensions and weight
- Barcodes

### Shipments (200)
- Tracking numbers
- Carriers (FedEx, UPS, DHL, USPS, Amazon)
- Status tracking
- Origin and destination addresses
- Ship dates and delivery estimates
- Actual delivery dates
- Dimensions and weight
- Shipping costs
- Item counts
- Notes

### Suppliers (100)
- Company names and codes
- Contact information (name, email, phone, mobile)
- Full addresses
- Ratings (3-5 stars)
- Status (active, pending, inactive, blacklisted)
- Categories
- Products supplied count
- Order statistics
- Total value
- Payment terms
- Lead times
- Minimum orders
- Websites
- Important dates

### Analytics (90 days)
- Daily data points
- Order statistics (total, completed, pending, cancelled)
- Revenue breakdown (total, shipping, taxes)
- Inventory metrics (low stock, out of stock, total)
- Shipment tracking (delivered, in transit, delayed)
- Customer metrics (new, returning, total)

### Production Batches (50)
- Batch numbers
- Product names
- Quantities
- Status (planning, in progress, quality check, completed, failed)
- Start and end dates
- Quality scores
- Defect counts
- Yield percentages
- Supervisors
- Shift information
- Notes

---

## 💡 Pro Tips

### 1. Generate Once, Reuse
```bash
# Generate data
# Click "Export Data" in Administration
# Save JSON file to project

# Share with team
git add traceright-test-data.json
git commit -m "Add test data"
```

### 2. Create Different Datasets
```typescript
// Create small dataset for quick tests
const smallData = {
  orders: generateFakeOrders(10),
  inventory: generateFakeInventory(20),
  // ...
};

// Create large dataset for stress tests
const largeData = {
  orders: generateFakeOrders(10000),
  inventory: generateFakeInventory(5000),
  // ...
};
```

### 3. Seed Data for Consistent Tests
```typescript
import { faker } from '@faker-js/faker';

// Use seed for reproducible data
faker.seed(123);

// Now every generation will be identical
const orders1 = generateFakeOrders(100);
const orders2 = generateFakeOrders(100);
// orders1 === orders2 (same data every time)
```

---

## 🎓 Learning Resources

- **Faker.js Docs**: https://fakerjs.dev/
- **Faker.js GitHub**: https://github.com/faker-js/faker
- **API Reference**: https://fakerjs.dev/api/

---

## ✅ Checklist

- [ ] Installed @faker-js/faker
- [ ] Uncommented import statement
- [ ] Uncommented all 6 function bodies
- [ ] Removed placeholder warnings
- [ ] Restarted dev server
- [ ] Tested generation in Administration
- [ ] Verified data in localStorage
- [ ] Tested export functionality
- [ ] Tried using data in components

---

## 🎉 You're Done!

Your fake data generator is now fully functional. You can:

✅ Generate 840+ realistic records with one click  
✅ Export data as JSON  
✅ Use in development and testing  
✅ Create realistic demos  
✅ Share test data with team  

**Next**: Check out the Employee Data Entry feature in Google Sheets Integration!

---

*Last Updated: November 1, 2025*  
*Faker.js Setup Guide for TraceRight*
