-- Dubai FM Service Provider ERP - Database Schema
-- Target Database: PostgreSQL

-- ==========================================
-- 1. CRM MODULE (Customers, Quotes, Contracts)
-- ==========================================

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('RESIDENTIAL', 'COMMERCIAL', 'STRATA')),
    email VARCHAR(255),
    phone VARCHAR(50),
    trn_number VARCHAR(50), -- Tax Registration Number for VAT (if business)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    name VARCHAR(255), -- e.g., "Villa 12, Springs 4"
    address TEXT,
    google_maps_link VARCHAR(255),
    community VARCHAR(100), -- e.g., "Arabian Ranches"
    type VARCHAR(50) -- Villa, Apartment, Office, Warehouse
);

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    property_id INTEGER REFERENCES properties(id),
    status VARCHAR(50) DEFAULT 'DRAFT', -- DRAFT, SENT, APPROVED, REJECTED
    total_amount DECIMAL(10, 2),
    valid_until DATE,
    scope_of_work TEXT
);

CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER REFERENCES quotes(id),
    customer_id INTEGER REFERENCES customers(id),
    property_id INTEGER REFERENCES properties(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    type VARCHAR(50), -- AMC_GOLD, AMC_SILVER, ONE_OFF
    total_value DECIMAL(10, 2),
    visits_per_year INTEGER,
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

-- ==========================================
-- 2. OPERATIONS MODULE (Jobs, Techs, Inventory)
-- ==========================================

CREATE TABLE technicians (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    mobile_number VARCHAR(50),
    specialization VARCHAR(100), -- AC, PLUMBING, ELECTRICAL, GENERAL
    status VARCHAR(50) DEFAULT 'AVAILABLE' -- AVAILABLE, ON_JOB, OFF_DUTY
);

CREATE TABLE job_cards (
    id SERIAL PRIMARY KEY,
    contract_id INTEGER REFERENCES contracts(id), -- Nullable if one-off
    property_id INTEGER REFERENCES properties(id),
    technician_id INTEGER REFERENCES technicians(id),
    
    job_type VARCHAR(50), -- PPM (Planned), REACTIVE (Call-out), QUOTED_JOB
    priority VARCHAR(20) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, EMERGENCY
    
    description TEXT,
    scheduled_date TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    status VARCHAR(50) DEFAULT 'OPEN', -- OPEN, DISPATCHED, IN_PROGRESS, COMPLETED, CANCELLED
    
    customer_sign_off BOOLEAN DEFAULT FALSE,
    technician_notes TEXT
);

CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    sku VARCHAR(100) UNIQUE,
    unit_cost DECIMAL(10, 2),
    selling_price DECIMAL(10, 2),
    stock_quantity INTEGER
);

CREATE TABLE job_materials (
    id SERIAL PRIMARY KEY,
    job_card_id INTEGER REFERENCES job_cards(id),
    inventory_item_id INTEGER REFERENCES inventory_items(id),
    quantity INTEGER,
    unit_price_charged DECIMAL(10, 2), -- Price at time of usage
    total_price DECIMAL(10, 2)
);

-- ==========================================
-- 3. ACCOUNTING MODULE (Invoices, Payments)
-- ==========================================

CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE, -- e.g., INV-2024-001
    customer_id INTEGER REFERENCES customers(id),
    job_card_id INTEGER REFERENCES job_cards(id), -- Link to specific job if applicable
    contract_id INTEGER REFERENCES contracts(id), -- Link to contract if AMC Installment
    
    issue_date DATE DEFAULT CURRENT_DATE,
    due_date DATE,
    
    subtotal DECIMAL(10, 2),
    vat_amount DECIMAL(10, 2), -- 5% Standard Rate
    total_amount DECIMAL(10, 2),
    
    status VARCHAR(50) DEFAULT 'UNPAID', -- UNPAID, PARTIAL, PAID, OVERDUE
    payment_method VARCHAR(50) -- CASH, CARD, BANK_TRANSFER, CHEQUE
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id),
    amount DECIMAL(10, 2),
    payment_date DATE DEFAULT CURRENT_DATE,
    reference_number VARCHAR(100) -- Cheque No or Transaction ID
);
