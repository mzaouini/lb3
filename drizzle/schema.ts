import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with Abhi-specific fields for salary advance platform.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Abhi-specific fields
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  nationalId: varchar("nationalId", { length: 50 }),
  company: varchar("company", { length: 255 }),
  netSalary: int("netSalary"), // Stored in fils (smallest currency unit)
  currency: varchar("currency", { length: 3 }).default("MAD").notNull(),
  
  // KYC status
  kycStatus: mysqlEnum("kycStatus", ["pending", "in_progress", "verified", "rejected"]).default("pending").notNull(),
  kycCompletedAt: timestamp("kycCompletedAt"),
  
  // PIN for transactions
  pin: varchar("pin", { length: 255 }), // Hashed PIN
  
  // Address information
  addressLine1: text("addressLine1"),
  addressLine2: text("addressLine2"),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postalCode", { length: 20 }),
  country: varchar("country", { length: 100 }).default("Morocco"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Bank accounts linked to users
 */
export const bankAccounts = mysqlTable("bank_accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  accountTitle: varchar("accountTitle", { length: 255 }).notNull(),
  accountNumber: varchar("accountNumber", { length: 50 }).notNull(),
  bankName: varchar("bankName", { length: 255 }).notNull(),
  iban: varchar("iban", { length: 34 }),
  
  isDefault: boolean("isDefault").default(false).notNull(),
  isVerified: boolean("isVerified").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BankAccount = typeof bankAccounts.$inferSelect;
export type InsertBankAccount = typeof bankAccounts.$inferInsert;

/**
 * Salary advance requests (Yalla feature)
 */
export const salaryAdvances = mysqlTable("salary_advances", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bankAccountId: int("bankAccountId").notNull(),
  
  amount: int("amount").notNull(), // Amount in fils
  serviceFee: int("serviceFee").notNull(), // Service fee in fils
  totalAmount: int("totalAmount").notNull(), // Total including fee
  
  status: mysqlEnum("status", ["pending", "in_progress", "approved", "rejected", "completed", "failed"]).default("pending").notNull(),
  
  requestedAt: timestamp("requestedAt").defaultNow().notNull(),
  processedAt: timestamp("processedAt"),
  completedAt: timestamp("completedAt"),
  
  notes: text("notes"),
});

export type SalaryAdvance = typeof salaryAdvances.$inferSelect;
export type InsertSalaryAdvance = typeof salaryAdvances.$inferInsert;

/**
 * Transaction history
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  salaryAdvanceId: int("salaryAdvanceId"),
  
  type: mysqlEnum("type", ["salary_advance", "repayment", "fee", "refund", "transfer"]).notNull(),
  amount: int("amount").notNull(), // Amount in fils
  
  status: mysqlEnum("status", ["pending", "in_progress", "successful", "failed"]).default("pending").notNull(),
  
  description: text("description"),
  referenceNumber: varchar("referenceNumber", { length: 100 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * Virtual cards (MasterCard integration)
 */
export const cards = mysqlTable("cards", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  
  cardNumber: varchar("cardNumber", { length: 19 }).notNull(), // Masked: **** **** **** 1234
  cardHolderName: varchar("cardHolderName", { length: 255 }).notNull(),
  expiryMonth: int("expiryMonth").notNull(),
  expiryYear: int("expiryYear").notNull(),
  
  balance: int("balance").default(0).notNull(), // Balance in fils
  
  status: mysqlEnum("status", ["active", "locked", "expired", "cancelled"]).default("active").notNull(),
  
  // Card settings
  dailyLimit: int("dailyLimit"),
  monthlyLimit: int("monthlyLimit"),
  alertsEnabled: boolean("alertsEnabled").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Card = typeof cards.$inferSelect;
export type InsertCard = typeof cards.$inferInsert;

/**
 * Card transactions
 */
export const cardTransactions = mysqlTable("card_transactions", {
  id: int("id").autoincrement().primaryKey(),
  cardId: int("cardId").notNull(),
  userId: int("userId").notNull(),
  
  merchant: varchar("merchant", { length: 255 }),
  amount: int("amount").notNull(), // Amount in fils
  
  type: mysqlEnum("type", ["purchase", "withdrawal", "refund", "fee"]).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "reversed"]).default("pending").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type CardTransaction = typeof cardTransactions.$inferSelect;
export type InsertCardTransaction = typeof cardTransactions.$inferInsert;
