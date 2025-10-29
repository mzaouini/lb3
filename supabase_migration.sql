-- Create enums
CREATE TYPE role AS ENUM ('user', 'admin');
CREATE TYPE kyc_status AS ENUM ('pending', 'in_progress', 'verified', 'rejected');
CREATE TYPE salary_advance_status AS ENUM ('pending', 'approved', 'disbursed', 'repaid', 'rejected');
CREATE TYPE transaction_type AS ENUM ('salary_advance', 'repayment', 'fee', 'transfer');
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE card_status AS ENUM ('active', 'locked', 'expired');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  open_id VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  login_method VARCHAR(64),
  role role DEFAULT 'user' NOT NULL,
  phone_number VARCHAR(20),
  national_id VARCHAR(50),
  company VARCHAR(255),
  net_salary INTEGER,
  currency VARCHAR(3) DEFAULT 'MAD' NOT NULL,
  kyc_status kyc_status DEFAULT 'pending' NOT NULL,
  kyc_completed_at TIMESTAMP,
  pin VARCHAR(255),
  address_line1 TEXT,
  address_line2 TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Morocco',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  last_signed_in TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Bank accounts table
CREATE TABLE IF NOT EXISTS bank_accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_title VARCHAR(255) NOT NULL,
  account_number VARCHAR(50) NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  iban VARCHAR(34),
  is_default INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Salary advances table
CREATE TABLE IF NOT EXISTS salary_advances (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  service_fee INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status salary_advance_status DEFAULT 'pending' NOT NULL,
  bank_account_id INTEGER REFERENCES bank_accounts(id),
  requested_at TIMESTAMP DEFAULT NOW() NOT NULL,
  approved_at TIMESTAMP,
  disbursed_at TIMESTAMP,
  repaid_at TIMESTAMP,
  due_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  salary_advance_id INTEGER REFERENCES salary_advances(id),
  type transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  status transaction_status DEFAULT 'pending' NOT NULL,
  description TEXT,
  reference_number VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMP
);

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_number VARCHAR(19) NOT NULL,
  cardholder_name VARCHAR(255) NOT NULL,
  expiry_month INTEGER NOT NULL,
  expiry_year INTEGER NOT NULL,
  cvv VARCHAR(4),
  card_type VARCHAR(50) DEFAULT 'virtual' NOT NULL,
  status card_status DEFAULT 'active' NOT NULL,
  balance INTEGER DEFAULT 0 NOT NULL,
  daily_limit INTEGER,
  monthly_limit INTEGER,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Card transactions table
CREATE TABLE IF NOT EXISTS card_transactions (
  id SERIAL PRIMARY KEY,
  card_id INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  merchant VARCHAR(255),
  category VARCHAR(100),
  status transaction_status DEFAULT 'completed' NOT NULL,
  transaction_date TIMESTAMP DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_open_id ON users(open_id);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_salary_advances_user_id ON salary_advances(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id);
CREATE INDEX IF NOT EXISTS idx_card_transactions_card_id ON card_transactions(card_id);
