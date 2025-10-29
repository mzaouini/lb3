import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const kycStatusEnum = pgEnum("kyc_status", ["pending", "in_progress", "verified", "rejected"]);
export const salaryAdvanceStatusEnum = pgEnum("salary_advance_status", ["pending", "approved", "disbursed", "repaid", "rejected"]);
export const transactionTypeEnum = pgEnum("transaction_type", ["salary_advance", "repayment", "fee", "transfer"]);
export const transactionStatusEnum = pgEnum("transaction_status", ["pending", "completed", "failed"]);
export const cardStatusEnum = pgEnum("card_status", ["active", "locked", "expired"]);

/**
 * Core user table backing auth flow.
 * Extended with Abhi-specific fields for salary advance platform.
 */
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  openId: varchar("open_id", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("login_method", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  
  // Abhi-specific fields
  phoneNumber: varchar("phone_number", { length: 20 }),
  nationalId: varchar("national_id", { length: 50 }),
  company: varchar("company", { length: 255 }),
  netSalary: integer("net_salary"), // Stored in fils (smallest currency unit)
  currency: varchar("currency", { length: 3 }).default("MAD").notNull(),
  
  // KYC status
  kycStatus: kycStatusEnum("kyc_status").default("pending").notNull(),
  kycCompletedAt: timestamp("kyc_completed_at"),
  
  // PIN for transactions
  pin: varchar("pin", { length: 255 }), // Hashed PIN
  
  // Address information
  addressLine1: text("address_line1"),
  addressLine2: text("address_line2"),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  country: varchar("country", { length: 100 }).default("Morocco"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastSignedIn: timestamp("last_signed_in").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Bank accounts linked to users
 */
export const bankAccounts = pgTable("bank_accounts", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  accountTitle: varchar("account_title", { length: 255 }).notNull(),
  accountNumber: varchar("account_number", { length: 50 }).notNull(),
  bankName: varchar("bank_name", { length: 255 }).notNull(),
  iban: varchar("iban", { length: 34 }),
  isDefault: integer("is_default").default(0).notNull(), // 0 = false, 1 = true
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = typeof bankAccounts.$inferInsert;

/**
 * Salary advance requests
 */
export const salaryAdvances = pgTable("salary_advances", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(), // In fils
  serviceFee: integer("service_fee").notNull(), // In fils
  totalAmount: integer("total_amount").notNull(), // amount + serviceFee, in fils
  status: salaryAdvanceStatusEnum("status").default("pending").notNull(),
  bankAccountId: integer("bank_account_id").references(() => bankAccounts.id),
  requestedAt: timestamp("requested_at").defaultNow().notNull(),
  approvedAt: timestamp("approved_at"),
  disbursedAt: timestamp("disbursed_at"),
  repaidAt: timestamp("repaid_at"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SalaryAdvance = typeof salaryAdvances.$inferSelect;
export type InsertSalaryAdvance = typeof salaryAdvances.$inferInsert;

/**
 * Transaction history
 */
export const transactions = pgTable("transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  salaryAdvanceId: integer("salary_advance_id").references(() => salaryAdvances.id),
  type: transactionTypeEnum("type").notNull(),
  amount: integer("amount").notNull(), // In fils
  status: transactionStatusEnum("status").default("pending").notNull(),
  description: text("description"),
  referenceNumber: varchar("reference_number", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Virtual/Physical cards
 */
export const cards = pgTable("cards", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id").notNull().references(() => users.id),
  cardNumber: varchar("card_number", { length: 19 }).notNull(), // Encrypted
  cardholderName: varchar("cardholder_name", { length: 255 }).notNull(),
  expiryMonth: integer("expiry_month").notNull(),
  expiryYear: integer("expiry_year").notNull(),
  cvv: varchar("cvv", { length: 4 }), // Encrypted
  cardType: varchar("card_type", { length: 50 }).default("virtual").notNull(), // virtual or physical
  status: cardStatusEnum("status").default("active").notNull(),
  balance: integer("balance").default(0).notNull(), // In fils
  dailyLimit: integer("daily_limit"), // In fils
  monthlyLimit: integer("monthly_limit"), // In fils
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;

/**
 * Card transactions
 */
export const cardTransactions = pgTable("card_transactions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  cardId: integer("card_id").notNull().references(() => cards.id),
  amount: integer("amount").notNull(), // In fils
  merchant: varchar("merchant", { length: 255 }),
  category: varchar("category", { length: 100 }),
  status: transactionStatusEnum("status").default("completed").notNull(),
  transactionDate: timestamp("transaction_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CardTransaction = typeof cardTransactions.$inferSelect;
export type InsertCardTransaction = typeof cardTransactions.$inferInsert;
