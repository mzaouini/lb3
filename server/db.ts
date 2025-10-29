import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  bankAccounts,
  salaryAdvances,
  transactions,
  cards,
  cardTransactions,
  InsertBankAccount,
  InsertSalaryAdvance,
  InsertTransaction
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Bank Accounts
export async function getUserBankAccounts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(bankAccounts).where(eq(bankAccounts.userId, userId));
}

export async function createBankAccount(account: InsertBankAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(bankAccounts).values(account);
}

// Salary Advances
export async function getUserSalaryAdvances(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(salaryAdvances)
    .where(eq(salaryAdvances.userId, userId))
    .orderBy(desc(salaryAdvances.requestedAt));
}

export async function createSalaryAdvance(advance: InsertSalaryAdvance) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(salaryAdvances).values(advance);
  return result;
}

export async function getUserAvailableBalance(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  
  // Get user's net salary
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!user.length) return 0;
  
  const netSalary = user[0].netSalary || 0;
  
  // Get total outstanding advances
  const advances = await db.select().from(salaryAdvances)
    .where(and(
      eq(salaryAdvances.userId, userId),
      eq(salaryAdvances.status, "pending")
    ));
  
  const totalAdvances = advances.reduce((sum, adv) => sum + adv.amount, 0);
  
  return Math.max(0, netSalary - totalAdvances);
}

// Transactions
export async function getUserTransactions(userId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];
  
  if (startDate && endDate) {
    return db.select().from(transactions)
      .where(and(
        eq(transactions.userId, userId),
        gte(transactions.createdAt, startDate),
        lte(transactions.createdAt, endDate)
      ))
      .orderBy(desc(transactions.createdAt));
  }
  
  return db.select().from(transactions)
    .where(eq(transactions.userId, userId))
    .orderBy(desc(transactions.createdAt));
}

export async function createTransaction(transaction: InsertTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(transactions).values(transaction);
}

// Cards
export async function getUserCard(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(cards).where(eq(cards.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getCardTransactions(cardId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(cardTransactions)
    .where(eq(cardTransactions.cardId, cardId))
    .orderBy(desc(cardTransactions.createdAt));
}
