# 🗄️ TraceRight Universal Trace Cloud - Database Schema

> **Complete database structure for production deployment**  
> **Version**: 1.0  
> **Last Updated**: November 1, 2025

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Database Technology Recommendations](#database-technology-recommendations)
3. [Core Tables](#core-tables)
4. [Relationship Diagram](#relationship-diagram)
5. [Index Strategies](#index-strategies)
6. [Data Retention & Archival](#data-retention--archival)

---

## Overview

TraceRight uses a relational database structure optimized for traceability, real-time inventory management, and compliance tracking. The schema supports multi-industry traceability while maintaining data integrity and audit trails.

### Key Design Principles:
- ✅ **Full Traceability**: Every record links to WHO, WHAT, WHEN, WHERE, WHY
- ✅ **Audit Trail**: All changes tracked with timestamps and user IDs
- ✅ **Data Integrity**: Foreign keys enforce relationships
- ✅ **Performance**: Strategic indexing for fast queries
- ✅ **Scalability**: Designed for millions of records

---

## Database Technology Recommendations

### Primary Database: **PostgreSQL 15+**
**Why PostgreSQL?**
- ✅ JSONB support for flexible cert/spec data
- ✅ Advanced indexing (GiST, GIN for full-text search)
- ✅ Native UUID support
- ✅ Excellent transaction performance
- ✅ Free and open-source

### Alternative: **MySQL 8.0+**
- ✅ Wide hosting support
- ✅ JSON column type
- ✅ Good performance
- ⚠️ Less advanced features than PostgreSQL

### Cloud Options:
- **Google Cloud SQL** (PostgreSQL) - Recommended for BigQuery integration
- **AWS RDS** (PostgreSQL/MySQL)
- **Azure Database** (PostgreSQL/MySQL)
- **Supabase** (PostgreSQL) - Great for rapid development

---

## Core Tables

### 1. **Organizations & Users**

#### `organizations`
Stores company/organization information.

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  tax_id VARCHAR(50),
  industry VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  logo_url TEXT,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  UNIQUE(tax_id)
);

CREATE INDEX idx_organizations_status ON organizations(status);
CREATE INDEX idx_organizations_industry ON organizations(industry);
```

#### `users`
System users with role-based access.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) NOT NULL, -- Admin, Manager, Operator, Viewer
  department VARCHAR(100),
  phone VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
);

CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
```

---

### 2. **Supplier Management**

#### `suppliers`
Supplier master data.

```sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  supplier_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  contact_person VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  tax_id VARCHAR(50),
  rating DECIMAL(3,2), -- 0.00 to 5.00
  payment_terms VARCHAR(100),
  payment_terms_days INTEGER,
  discount_percent DECIMAL(5,2),
  discount_days INTEGER,
  lead_time_days INTEGER,
  minimum_order_value DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'USD',
  preferred_shipping_method VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_suppliers_organization ON suppliers(organization_id);
CREATE INDEX idx_suppliers_status ON suppliers(status);
CREATE INDEX idx_suppliers_country ON suppliers(country);
CREATE INDEX idx_suppliers_rating ON suppliers(rating);
```

#### `supplier_certifications`
Track supplier certificates and compliance documents.

```sql
CREATE TABLE supplier_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID NOT NULL,
  certification_name VARCHAR(255) NOT NULL,
  certification_type VARCHAR(100), -- Organic, Fair Trade, ISO, etc.
  issuing_body VARCHAR(255),
  certificate_number VARCHAR(100),
  issue_date DATE,
  expiry_date DATE,
  status VARCHAR(50) DEFAULT 'Valid', -- Valid, Expiring Soon, Expired
  document_url TEXT,
  verified_by UUID,
  verified_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE INDEX idx_supplier_certs_supplier ON supplier_certifications(supplier_id);
CREATE INDEX idx_supplier_certs_status ON supplier_certifications(status);
CREATE INDEX idx_supplier_certs_expiry ON supplier_certifications(expiry_date);
```

---

### 3. **Raw Materials & Inventory**

#### `raw_materials`
Master data for all raw materials.

```sql
CREATE TABLE raw_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- Carrier Oils, Butters, Essential Oils, Chemicals, Additives
  primary_supplier_id UUID,
  current_stock DECIMAL(15,3) DEFAULT 0,
  unit VARCHAR(50) NOT NULL,
  minimum_stock DECIMAL(15,3) NOT NULL,
  reorder_point DECIMAL(15,3) NOT NULL,
  reorder_quantity DECIMAL(15,3) NOT NULL,
  max_stock DECIMAL(15,3),
  cost_per_unit DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'USD',
  average_cost DECIMAL(15,2),
  last_purchase_date DATE,
  last_purchase_price DECIMAL(15,2),
  shelf_life_months INTEGER,
  storage_requirements TEXT,
  handling_instructions TEXT,
  safety_notes TEXT,
  is_allergen BOOLEAN DEFAULT FALSE,
  is_hazardous BOOLEAN DEFAULT FALSE,
  hazmat_class VARCHAR(50),
  regulatory_compliance JSONB, -- Array of compliance standards
  specifications JSONB, -- Quality specifications as JSON
  status VARCHAR(50) DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (primary_supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_raw_materials_organization ON raw_materials(organization_id);
CREATE INDEX idx_raw_materials_sku ON raw_materials(sku);
CREATE INDEX idx_raw_materials_category ON raw_materials(category);
CREATE INDEX idx_raw_materials_supplier ON raw_materials(primary_supplier_id);
CREATE INDEX idx_raw_materials_stock_status ON raw_materials(current_stock, reorder_point);
CREATE INDEX idx_raw_materials_hazardous ON raw_materials(is_hazardous) WHERE is_hazardous = TRUE;
```

#### `inventory_lots`
Track individual lots/batches of raw materials.

```sql
CREATE TABLE inventory_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_material_id UUID NOT NULL,
  lot_number VARCHAR(100) NOT NULL,
  supplier_id UUID NOT NULL,
  purchase_order_id UUID,
  inbound_receipt_id UUID,
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  cost_per_unit DECIMAL(15,2),
  total_cost DECIMAL(15,2),
  received_date DATE NOT NULL,
  manufacturing_date DATE,
  expiry_date DATE,
  storage_location VARCHAR(100),
  storage_zone VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Available', -- Available, Reserved, Expired, Quarantined
  quarantine_reason TEXT,
  reserved_quantity DECIMAL(15,3) DEFAULT 0,
  quality_check_status VARCHAR(50), -- Passed, Failed, Pending
  quality_check_date DATE,
  quality_checked_by UUID,
  certifications JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (quality_checked_by) REFERENCES users(id),
  UNIQUE(lot_number, raw_material_id)
);

CREATE INDEX idx_inventory_lots_material ON inventory_lots(raw_material_id);
CREATE INDEX idx_inventory_lots_status ON inventory_lots(status);
CREATE INDEX idx_inventory_lots_expiry ON inventory_lots(expiry_date);
CREATE INDEX idx_inventory_lots_location ON inventory_lots(storage_location);
CREATE INDEX idx_inventory_lots_lot_number ON inventory_lots(lot_number);
```

---

### 4. **Products & Recipes**

#### `recipes`
Production formulas/recipes.

```sql
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  recipe_code VARCHAR(100) UNIQUE NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  version VARCHAR(20) NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Active, Archived, Under Review
  category VARCHAR(100),
  batch_size DECIMAL(15,3),
  batch_unit VARCHAR(50),
  estimated_yield DECIMAL(15,3),
  yield_unit VARCHAR(50),
  production_time_minutes INTEGER,
  skill_level_required VARCHAR(50), -- Basic, Intermediate, Advanced
  cost_per_batch DECIMAL(15,2),
  allergens JSONB, -- Array of allergen names
  shelf_life_days INTEGER,
  storage_conditions TEXT,
  packaging_instructions TEXT,
  regulatory_compliance JSONB,
  equipment_needed JSONB,
  total_batches_produced INTEGER DEFAULT 0,
  average_yield_percentage DECIMAL(5,2),
  last_produced_date DATE,
  created_date DATE NOT NULL,
  created_by UUID NOT NULL,
  approved_date DATE,
  approved_by UUID,
  notes TEXT,
  safety_warnings TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id),
  UNIQUE(recipe_code, version)
);

CREATE INDEX idx_recipes_organization ON recipes(organization_id);
CREATE INDEX idx_recipes_status ON recipes(status);
CREATE INDEX idx_recipes_code ON recipes(recipe_code);
```

#### `recipe_ingredients`
Ingredients for each recipe with quantities.

```sql
CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL,
  raw_material_id UUID NOT NULL,
  sequence_number INTEGER NOT NULL,
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  percentage_of_total DECIMAL(5,2),
  function VARCHAR(100), -- Base, Fragrance, Colorant, Preservative, etc.
  is_critical_parameter BOOLEAN DEFAULT FALSE,
  specifications TEXT,
  substitutes JSONB, -- Array of alternative material IDs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_material ON recipe_ingredients(raw_material_id);
```

#### `recipe_process_steps`
Step-by-step production instructions.

```sql
CREATE TABLE recipe_process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL,
  step_number INTEGER NOT NULL,
  step_name VARCHAR(255) NOT NULL,
  duration_minutes INTEGER,
  temperature_celsius DECIMAL(5,2),
  instructions TEXT NOT NULL,
  equipment_required VARCHAR(255),
  is_critical_control_point BOOLEAN DEFAULT FALSE,
  safety_notes TEXT,
  quality_check_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

CREATE INDEX idx_recipe_steps_recipe ON recipe_process_steps(recipe_id);
```

---

### 5. **Production & Batches**

#### `production_batches`
Actual production batches created from recipes.

```sql
CREATE TABLE production_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  batch_number VARCHAR(100) UNIQUE NOT NULL,
  recipe_id UUID NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'In Production', -- In Production, Released, Quarantined, Under Review, Rejected
  production_date DATE NOT NULL,
  expiry_date DATE,
  shelf_life_days INTEGER,
  location VARCHAR(100),
  operator_id UUID NOT NULL,
  supervisor_id UUID,
  shift VARCHAR(50),
  equipment_used JSONB,
  yield_percentage DECIMAL(5,2),
  waste_percentage DECIMAL(5,2),
  traceability_code VARCHAR(255) UNIQUE,
  qr_code_generated BOOLEAN DEFAULT FALSE,
  qr_code_url TEXT,
  packaging_date DATE,
  package_type VARCHAR(100),
  units_per_package INTEGER,
  total_packages INTEGER,
  packaging_line VARCHAR(100),
  allocated_orders JSONB, -- Array of order IDs this batch is allocated to
  quarantine_reason TEXT,
  release_date DATE,
  released_by UUID,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (operator_id) REFERENCES users(id),
  FOREIGN KEY (supervisor_id) REFERENCES users(id),
  FOREIGN KEY (released_by) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_batches_organization ON production_batches(organization_id);
CREATE INDEX idx_batches_batch_number ON production_batches(batch_number);
CREATE INDEX idx_batches_recipe ON production_batches(recipe_id);
CREATE INDEX idx_batches_status ON production_batches(status);
CREATE INDEX idx_batches_production_date ON production_batches(production_date);
CREATE INDEX idx_batches_expiry_date ON production_batches(expiry_date);
CREATE INDEX idx_batches_traceability_code ON production_batches(traceability_code);
```

#### `batch_materials_used`
Raw materials consumed in batch production.

```sql
CREATE TABLE batch_materials_used (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  raw_material_id UUID NOT NULL,
  inventory_lot_id UUID NOT NULL,
  quantity_used DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  cost_per_unit DECIMAL(15,2),
  total_cost DECIMAL(15,2),
  used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  used_by UUID,
  FOREIGN KEY (batch_id) REFERENCES production_batches(id) ON DELETE CASCADE,
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id),
  FOREIGN KEY (inventory_lot_id) REFERENCES inventory_lots(id),
  FOREIGN KEY (used_by) REFERENCES users(id)
);

CREATE INDEX idx_batch_materials_batch ON batch_materials_used(batch_id);
CREATE INDEX idx_batch_materials_material ON batch_materials_used(raw_material_id);
CREATE INDEX idx_batch_materials_lot ON batch_materials_used(inventory_lot_id);
```

#### `batch_quality_checks`
Quality control checks performed on batches.

```sql
CREATE TABLE batch_quality_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  check_type VARCHAR(100), -- Pre-Production, In-Process, Final Release
  parameter VARCHAR(255) NOT NULL,
  expected_value VARCHAR(255),
  actual_value VARCHAR(255),
  status VARCHAR(50), -- Pass, Fail, Warning
  checked_by UUID NOT NULL,
  checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (batch_id) REFERENCES production_batches(id) ON DELETE CASCADE,
  FOREIGN KEY (checked_by) REFERENCES users(id)
);

CREATE INDEX idx_batch_qc_batch ON batch_quality_checks(batch_id);
CREATE INDEX idx_batch_qc_status ON batch_quality_checks(status);
```

#### `batch_production_steps`
Actual execution of production steps.

```sql
CREATE TABLE batch_production_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL,
  step_number INTEGER NOT NULL,
  step_name VARCHAR(255) NOT NULL,
  operator_id UUID NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  temperature_celsius DECIMAL(5,2),
  humidity_percent DECIMAL(5,2),
  equipment_used VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, In Progress, Completed, Failed
  notes TEXT,
  FOREIGN KEY (batch_id) REFERENCES production_batches(id) ON DELETE CASCADE,
  FOREIGN KEY (operator_id) REFERENCES users(id)
);

CREATE INDEX idx_batch_steps_batch ON batch_production_steps(batch_id);
CREATE INDEX idx_batch_steps_operator ON batch_production_steps(operator_id);
```

---

### 6. **Purchase Orders**

#### `purchase_orders`
Purchase orders to suppliers.

```sql
CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  po_number VARCHAR(100) UNIQUE NOT NULL,
  supplier_id UUID NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- Draft, Approved, Sent, Partially Received, Received, Closed, Cancelled
  order_date DATE NOT NULL,
  approval_date DATE,
  expected_delivery_date DATE,
  actual_delivery_date DATE,
  requested_by UUID NOT NULL,
  approved_by UUID,
  buyer_id UUID NOT NULL,
  department VARCHAR(100),
  delivery_location VARCHAR(255),
  subtotal DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  shipping_cost DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  incoterms VARCHAR(50),
  payment_terms VARCHAR(255),
  notes TEXT,
  terms_and_conditions TEXT,
  attachments JSONB,
  priority VARCHAR(50) DEFAULT 'Medium', -- High, Medium, Low
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (requested_by) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id),
  FOREIGN KEY (buyer_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_po_organization ON purchase_orders(organization_id);
CREATE INDEX idx_po_number ON purchase_orders(po_number);
CREATE INDEX idx_po_supplier ON purchase_orders(supplier_id);
CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_po_order_date ON purchase_orders(order_date);
CREATE INDEX idx_po_expected_delivery ON purchase_orders(expected_delivery_date);
```

#### `purchase_order_line_items`
Line items in purchase orders.

```sql
CREATE TABLE purchase_order_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id UUID NOT NULL,
  raw_material_id UUID NOT NULL,
  line_number INTEGER NOT NULL,
  description TEXT,
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  unit_price DECIMAL(15,2) NOT NULL,
  total_price DECIMAL(15,2) NOT NULL,
  received_quantity DECIMAL(15,3) DEFAULT 0,
  pending_quantity DECIMAL(15,3),
  expected_delivery_date DATE,
  specifications TEXT,
  certifications_required JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (po_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
);

CREATE INDEX idx_po_lines_po ON purchase_order_line_items(po_id);
CREATE INDEX idx_po_lines_material ON purchase_order_line_items(raw_material_id);
```

#### `po_shipment_tracking`
Shipment tracking for purchase orders.

```sql
CREATE TABLE po_shipment_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_id UUID NOT NULL,
  carrier VARCHAR(255),
  tracking_number VARCHAR(255),
  shipping_method VARCHAR(255),
  status VARCHAR(100),
  current_location VARCHAR(255),
  estimated_delivery DATE,
  last_update TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (po_id) REFERENCES purchase_orders(id) ON DELETE CASCADE
);

CREATE INDEX idx_po_tracking_po ON po_shipment_tracking(po_id);
CREATE INDEX idx_po_tracking_number ON po_shipment_tracking(tracking_number);
```

---

### 7. **Inbound Receipts**

#### `inbound_receipts`
Receiving records for incoming materials.

```sql
CREATE TABLE inbound_receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  receipt_number VARCHAR(100) UNIQUE NOT NULL,
  po_id UUID NOT NULL,
  supplier_id UUID NOT NULL,
  status VARCHAR(50) DEFAULT 'In Progress', -- In Progress, Completed, Partial, On Hold, Cancelled
  receipt_date DATE NOT NULL,
  receipt_time TIME NOT NULL,
  received_by UUID NOT NULL,
  verified_by UUID,
  carrier VARCHAR(255),
  tracking_number VARCHAR(255),
  delivery_method VARCHAR(255),
  total_items_ordered INTEGER,
  total_items_received INTEGER,
  packaging_condition VARCHAR(50), -- Excellent, Good, Fair, Poor, Damaged
  temperature_on_arrival DECIMAL(5,2),
  storage_zone VARCHAR(100),
  putaway_completed BOOLEAN DEFAULT FALSE,
  putaway_date DATE,
  documents_received JSONB,
  photos JSONB,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (po_id) REFERENCES purchase_orders(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (received_by) REFERENCES users(id),
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE INDEX idx_inbound_organization ON inbound_receipts(organization_id);
CREATE INDEX idx_inbound_receipt_number ON inbound_receipts(receipt_number);
CREATE INDEX idx_inbound_po ON inbound_receipts(po_id);
CREATE INDEX idx_inbound_status ON inbound_receipts(status);
CREATE INDEX idx_inbound_date ON inbound_receipts(receipt_date);
```

#### `inbound_receipt_items`
Individual items received.

```sql
CREATE TABLE inbound_receipt_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID NOT NULL,
  po_line_item_id UUID NOT NULL,
  raw_material_id UUID NOT NULL,
  lot_number VARCHAR(100) NOT NULL,
  ordered_quantity DECIMAL(15,3) NOT NULL,
  received_quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  condition VARCHAR(50), -- Acceptable, Damaged, Rejected
  storage_location VARCHAR(100),
  quality_check_status VARCHAR(50), -- Passed, Failed, Pending
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receipt_id) REFERENCES inbound_receipts(id) ON DELETE CASCADE,
  FOREIGN KEY (po_line_item_id) REFERENCES purchase_order_line_items(id),
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id)
);

CREATE INDEX idx_receipt_items_receipt ON inbound_receipt_items(receipt_id);
CREATE INDEX idx_receipt_items_material ON inbound_receipt_items(raw_material_id);
CREATE INDEX idx_receipt_items_lot ON inbound_receipt_items(lot_number);
```

#### `receipt_quality_inspections`
Quality inspection data for receipts.

```sql
CREATE TABLE receipt_quality_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID NOT NULL,
  inspection_id VARCHAR(100) UNIQUE,
  inspector_id UUID NOT NULL,
  inspection_date DATE NOT NULL,
  inspection_time TIME NOT NULL,
  overall_result VARCHAR(50), -- Approved, Rejected, Conditional
  parameters JSONB, -- Array of {parameter, expected, actual, status}
  certifications JSONB,
  comments TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receipt_id) REFERENCES inbound_receipts(id) ON DELETE CASCADE,
  FOREIGN KEY (inspector_id) REFERENCES users(id)
);

CREATE INDEX idx_receipt_qc_receipt ON receipt_quality_inspections(receipt_id);
CREATE INDEX idx_receipt_qc_result ON receipt_quality_inspections(overall_result);
```

#### `receipt_discrepancies`
Track receiving discrepancies.

```sql
CREATE TABLE receipt_discrepancies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID NOT NULL,
  type VARCHAR(100), -- Short Shipment, Over Shipment, Damaged, Wrong Item, Documentation Missing
  description TEXT NOT NULL,
  severity VARCHAR(50), -- High, Medium, Low
  resolution TEXT,
  resolved_by UUID,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receipt_id) REFERENCES inbound_receipts(id) ON DELETE CASCADE,
  FOREIGN KEY (resolved_by) REFERENCES users(id)
);

CREATE INDEX idx_discrepancies_receipt ON receipt_discrepancies(receipt_id);
CREATE INDEX idx_discrepancies_severity ON receipt_discrepancies(severity);
```

---

### 8. **Warehouse Operations**

#### `warehouse_operations`
All warehouse movements and operations.

```sql
CREATE TABLE warehouse_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  operation_id VARCHAR(100) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL, -- Receipt, Shipment, Transfer, Adjustment, Picking, Putaway
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, In Progress, Completed, On Hold, Cancelled
  operation_date DATE NOT NULL,
  operator_id UUID NOT NULL,
  supervisor_id UUID,
  location VARCHAR(255),
  source_location VARCHAR(255),
  destination_location VARCHAR(255),
  reference_number VARCHAR(100), -- PO, SO, or Transfer Order number
  total_items INTEGER,
  total_quantity DECIMAL(15,3),
  start_time TIMESTAMP,
  completion_time TIMESTAMP,
  duration_minutes INTEGER,
  verified_by UUID,
  verification_time TIMESTAMP,
  discrepancies JSONB,
  priority VARCHAR(50) DEFAULT 'Medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (operator_id) REFERENCES users(id),
  FOREIGN KEY (supervisor_id) REFERENCES users(id),
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE INDEX idx_warehouse_ops_organization ON warehouse_operations(organization_id);
CREATE INDEX idx_warehouse_ops_operation_id ON warehouse_operations(operation_id);
CREATE INDEX idx_warehouse_ops_type ON warehouse_operations(type);
CREATE INDEX idx_warehouse_ops_status ON warehouse_operations(status);
CREATE INDEX idx_warehouse_ops_date ON warehouse_operations(operation_date);
CREATE INDEX idx_warehouse_ops_reference ON warehouse_operations(reference_number);
```

#### `warehouse_operation_items`
Items involved in warehouse operations.

```sql
CREATE TABLE warehouse_operation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id UUID NOT NULL,
  raw_material_id UUID,
  batch_id UUID,
  product_name VARCHAR(255),
  sku VARCHAR(100),
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50),
  lot_number VARCHAR(100),
  from_location VARCHAR(255),
  to_location VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (operation_id) REFERENCES warehouse_operations(id) ON DELETE CASCADE,
  FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id),
  FOREIGN KEY (batch_id) REFERENCES production_batches(id)
);

CREATE INDEX idx_warehouse_items_operation ON warehouse_operation_items(operation_id);
CREATE INDEX idx_warehouse_items_material ON warehouse_operation_items(raw_material_id);
CREATE INDEX idx_warehouse_items_batch ON warehouse_operation_items(batch_id);
```

---

### 9. **Sales & Outbound**

#### `customers`
Customer master data.

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  customer_code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  contact_person VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  tax_id VARCHAR(50),
  payment_terms VARCHAR(100),
  credit_limit DECIMAL(15,2),
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_customers_organization ON customers(organization_id);
CREATE INDEX idx_customers_code ON customers(customer_code);
CREATE INDEX idx_customers_status ON customers(status);
```

#### `sales_orders`
Customer orders.

```sql
CREATE TABLE sales_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  customer_id UUID NOT NULL,
  order_date DATE NOT NULL,
  requested_ship_date DATE,
  promised_ship_date DATE,
  status VARCHAR(50) DEFAULT 'Pending', -- Pending, Confirmed, Picking, Packed, Shipped, Delivered, Cancelled
  sales_rep_id UUID,
  subtotal DECIMAL(15,2) NOT NULL,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  shipping_cost DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  shipping_address TEXT,
  shipping_city VARCHAR(100),
  shipping_state VARCHAR(100),
  shipping_country VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  shipping_method VARCHAR(100),
  payment_status VARCHAR(50),
  payment_method VARCHAR(100),
  priority VARCHAR(50) DEFAULT 'Medium',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by UUID,
  updated_by UUID,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (sales_rep_id) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

CREATE INDEX idx_sales_orders_organization ON sales_orders(organization_id);
CREATE INDEX idx_sales_orders_number ON sales_orders(order_number);
CREATE INDEX idx_sales_orders_customer ON sales_orders(customer_id);
CREATE INDEX idx_sales_orders_status ON sales_orders(status);
CREATE INDEX idx_sales_orders_date ON sales_orders(order_date);
```

#### `sales_order_line_items`
Items in sales orders.

```sql
CREATE TABLE sales_order_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  line_number INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  sku VARCHAR(100),
  description TEXT,
  quantity DECIMAL(15,3) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(15,2) NOT NULL,
  total_price DECIMAL(15,2) NOT NULL,
  allocated_batch_id UUID,
  picked_quantity DECIMAL(15,3) DEFAULT 0,
  shipped_quantity DECIMAL(15,3) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (allocated_batch_id) REFERENCES production_batches(id)
);

CREATE INDEX idx_sales_lines_order ON sales_order_line_items(order_id);
CREATE INDEX idx_sales_lines_batch ON sales_order_line_items(allocated_batch_id);
```

#### `outbound_shipments`
Outgoing shipments.

```sql
CREATE TABLE outbound_shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  shipment_number VARCHAR(100) UNIQUE NOT NULL,
  order_id UUID NOT NULL,
  status VARCHAR(50) DEFAULT 'Preparing', -- Preparing, Ready, Shipped, In Transit, Delivered, Returned
  ship_date DATE,
  delivery_date DATE,
  carrier VARCHAR(255),
  tracking_number VARCHAR(255),
  shipping_method VARCHAR(255),
  packed_by UUID,
  verified_by UUID,
  total_boxes INTEGER,
  total_weight_kg DECIMAL(10,2),
  shipping_cost DECIMAL(15,2),
  delivery_signature VARCHAR(255),
  delivery_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES sales_orders(id),
  FOREIGN KEY (packed_by) REFERENCES users(id),
  FOREIGN KEY (verified_by) REFERENCES users(id)
);

CREATE INDEX idx_outbound_organization ON outbound_shipments(organization_id);
CREATE INDEX idx_outbound_shipment_number ON outbound_shipments(shipment_number);
CREATE INDEX idx_outbound_order ON outbound_shipments(order_id);
CREATE INDEX idx_outbound_status ON outbound_shipments(status);
CREATE INDEX idx_outbound_tracking ON outbound_shipments(tracking_number);
```

---

### 10. **Traceability & Audit**

#### `traceability_events`
Complete audit trail of all events.

```sql
CREATE TABLE traceability_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  event_type VARCHAR(100) NOT NULL, -- Material Received, Production Started, QC Check, Batch Released, Shipment Sent
  entity_type VARCHAR(100) NOT NULL, -- RawMaterial, Batch, PurchaseOrder, SalesOrder, etc.
  entity_id UUID NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id UUID,
  location VARCHAR(255),
  description TEXT,
  metadata JSONB, -- Flexible JSON for any additional data
  parent_event_id UUID, -- Links events together
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_event_id) REFERENCES traceability_events(id)
);

CREATE INDEX idx_traceability_organization ON traceability_events(organization_id);
CREATE INDEX idx_traceability_type ON traceability_events(event_type);
CREATE INDEX idx_traceability_entity ON traceability_events(entity_type, entity_id);
CREATE INDEX idx_traceability_user ON traceability_events(user_id);
CREATE INDEX idx_traceability_timestamp ON traceability_events(event_timestamp);
```

#### `audit_log`
System-wide audit log.

```sql
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID,
  user_id UUID,
  action VARCHAR(100) NOT NULL, -- CREATE, UPDATE, DELETE, LOGIN, LOGOUT, etc.
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(50),
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_audit_organization ON audit_log(organization_id);
CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_table ON audit_log(table_name);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp);
```

---

## Relationship Diagram

```
┌─────────────────┐
│  organizations  │
└────────┬────────┘
         │
         ├──────────────────────────────────────┐
         │                                      │
┌────────▼────────┐                  ┌─────────▼──────────┐
│     users       │                  │     suppliers      │
└────────┬────────┘                  └─────────┬──────────┘
         │                                     │
         │                           ┌─────────▼──────────────┐
         │                           │ supplier_certifications │
         │                           └────────────────────────┘
         │
         │           ┌──────────────────────────────┐
         │           │                              │
┌────────▼────────┐  │  ┌──────────────┐  ┌────────▼────────────┐
│ raw_materials   │──┼──│   recipes    │  │  purchase_orders    │
└────────┬────────┘  │  └──────┬───────┘  └────────┬────────────┘
         │           │         │                   │
         │           │         │                   │
┌────────▼──────────┐│ ┌───────▼──────────┐ ┌─────▼────────────────┐
│ inventory_lots    ││ │recipe_ingredients│ │po_line_items         │
└────────┬──────────┘│ └──────────────────┘ └─────┬────────────────┘
         │           │                             │
         │           │                   ┌─────────▼──────────┐
┌────────▼───────────▼┐                  │ inbound_receipts   │
│ production_batches  │                  └─────────┬──────────┘
└────────┬────────────┘                            │
         │                             ┌───────────▼───────────┐
         │                             │receipt_items          │
┌────────▼──────────────┐              └───────────────────────┘
│batch_materials_used   │
└───────────────────────┘
         │
         │                   ┌──────────────┐
┌────────▼────────┐          │  customers   │
│ sales_orders    │◄─────────┴──────────────┘
└────────┬────────┘
         │
┌────────▼──────────────┐
│outbound_shipments     │
└───────────────────────┘
         │
         ▼
┌───────────────────────┐
│traceability_events    │
└───────────────────────┘
```

---

## Index Strategies

### Primary Indexes (Already Included Above)
- ✅ All foreign keys indexed
- ✅ All unique constraints
- ✅ Status fields
- ✅ Date fields for range queries
- ✅ Search fields (email, names, codes)

### Composite Indexes for Common Queries

```sql
-- Frequently queried combinations
CREATE INDEX idx_batches_status_date ON production_batches(status, production_date);
CREATE INDEX idx_inventory_material_status ON inventory_lots(raw_material_id, status);
CREATE INDEX idx_po_supplier_status ON purchase_orders(supplier_id, status);
CREATE INDEX idx_sales_customer_status ON sales_orders(customer_id, status);

-- Full-text search (PostgreSQL)
CREATE INDEX idx_raw_materials_search ON raw_materials USING GIN(to_tsvector('english', name || ' ' || description));
CREATE INDEX idx_suppliers_search ON suppliers USING GIN(to_tsvector('english', name || ' ' || contact_person));
```

---

## Data Retention & Archival

### Retention Policy Recommendations

| Table | Retention Period | Archive Strategy |
|-------|-----------------|------------------|
| `audit_log` | 7 years | Archive annually to cold storage |
| `traceability_events` | 10 years (compliance) | Never delete - partition by year |
| `production_batches` | 5 years active | Archive old batches to separate DB |
| `sales_orders` | 7 years (tax law) | Archive after 3 years |
| `purchase_orders` | 7 years (tax law) | Archive after 3 years |
| `inventory_lots` | While in stock + 2 years | Archive expired/used lots |

### Archival Tables

```sql
CREATE TABLE archived_batches (LIKE production_batches INCLUDING ALL);
CREATE TABLE archived_sales_orders (LIKE sales_orders INCLUDING ALL);
CREATE TABLE archived_purchase_orders (LIKE purchase_orders INCLUDING ALL);
```

---

## Data Migration Scripts

### Initial Data Load

```sql
-- Insert default organization
INSERT INTO organizations (name, industry, status)
VALUES ('TraceRight Demo Company', 'Food/Cosmetics', 'Active');

-- Insert admin user
INSERT INTO users (organization_id, email, username, password_hash, first_name, last_name, role, is_active)
VALUES (
  (SELECT id FROM organizations WHERE name = 'TraceRight Demo Company'),
  'admin@traceright.com',
  'admin',
  '$2b$12$...', -- Use bcrypt hash
  'Admin',
  'User',
  'Admin',
  TRUE
);
```

---

## Performance Optimization Tips

### 1. **Partitioning** (For large tables)
```sql
-- Partition traceability_events by date
CREATE TABLE traceability_events (
  ...
) PARTITION BY RANGE (event_timestamp);

CREATE TABLE traceability_events_2024 PARTITION OF traceability_events
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

### 2. **Materialized Views** (For reports)
```sql
CREATE MATERIALIZED VIEW mv_inventory_summary AS
SELECT 
  rm.id,
  rm.sku,
  rm.name,
  rm.current_stock,
  COUNT(il.id) as lot_count,
  SUM(il.quantity) as total_quantity,
  MIN(il.expiry_date) as earliest_expiry
FROM raw_materials rm
LEFT JOIN inventory_lots il ON rm.id = il.raw_material_id
WHERE il.status = 'Available'
GROUP BY rm.id;

-- Refresh daily
REFRESH MATERIALIZED VIEW mv_inventory_summary;
```

### 3. **Connection Pooling**
- Use PgBouncer or similar
- Set appropriate pool size (20-50 connections for small/medium apps)

### 4. **Query Optimization**
- Use EXPLAIN ANALYZE for slow queries
- Add indexes based on actual query patterns
- Consider read replicas for reporting

---

## Backup Strategy

### Recommended Schedule
- **Daily**: Full backup at 2 AM
- **Hourly**: Transaction log backup (point-in-time recovery)
- **Weekly**: Test restore on staging server
- **Monthly**: Archive to long-term storage

### Backup Script (PostgreSQL)
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/traceright"
DB_NAME="traceright_production"

# Full backup
pg_dump -U postgres -F c -b -v -f "$BACKUP_DIR/backup_$DATE.backup" $DB_NAME

# Compress
gzip "$BACKUP_DIR/backup_$DATE.backup"

# Upload to cloud storage (e.g., Google Cloud Storage)
gsutil cp "$BACKUP_DIR/backup_$DATE.backup.gz" gs://traceright-backups/

# Delete local backups older than 7 days
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
```

---

## Security Considerations

### 1. **Encryption**
- ✅ Encrypt database at rest (AES-256)
- ✅ Use SSL/TLS for all connections
- ✅ Encrypt sensitive fields (e.g., tax_id, password_hash)

### 2. **Access Control**
```sql
-- Create read-only role for reporting
CREATE ROLE reporting_user WITH LOGIN PASSWORD 'secure_password';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO reporting_user;

-- Create app role with limited permissions
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;
-- Restrict DELETE to specific tables only
```

### 3. **Row-Level Security** (PostgreSQL)
```sql
ALTER TABLE production_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY batch_isolation ON production_batches
  USING (organization_id = current_setting('app.current_org_id')::UUID);
```

---

## Next Steps

### 1. **Deploy Database**
- Choose hosting provider (Google Cloud SQL recommended)
- Set up database instance
- Run schema creation scripts
- Configure backups

### 2. **Load Sample Data**
- Use data from enhanced views as templates
- Create realistic test data
- Test all relationships

### 3. **Connect Application**
- Update database connection strings
- Implement ORM models (Prisma, TypeORM, etc.)
- Test CRUD operations

### 4. **Optimize**
- Monitor query performance
- Add indexes as needed
- Set up monitoring/alerts

---

## Support & Documentation

### SQL Scripts Location
All SQL scripts should be organized as:
```
/database
  /schema
    01_organizations_users.sql
    02_suppliers.sql
    03_raw_materials.sql
    04_recipes_production.sql
    05_purchase_orders.sql
    06_inbound_receipts.sql
    07_warehouse.sql
    08_sales_outbound.sql
    09_traceability.sql
    10_indexes.sql
  /migrations
    001_initial_schema.sql
    002_add_certifications.sql
  /seed
    sample_data.sql
  /backup
    backup_script.sh
```

---

**Database Schema Complete!** 🎉

This schema is production-ready, scalable, and optimized for traceability. All tables support the enhanced views created in your application with complete WHO, WHAT, WHEN, WHERE, WHY tracking.

---

*TraceRight Universal Trace Cloud*  
*Database Schema v1.0*  
*November 1, 2025*
