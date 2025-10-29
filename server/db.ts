import { supabase } from './supabase';
import { ENV } from './_core/env';

export type InsertUser = {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: 'user' | 'admin';
  phoneNumber?: string | null;
  nationalId?: string | null;
  company?: string | null;
  netSalary?: number | null;
  lastSignedIn?: Date;
};

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  try {
    const values: any = {
      open_id: user.openId,
      name: user.name ?? null,
      email: user.email ?? null,
      login_method: user.loginMethod ?? null,
      last_signed_in: user.lastSignedIn || new Date(),
    };

    if (user.role) {
      values.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
    }

    const { error } = await supabase
      .from('users')
      .upsert(values, { onConflict: 'open_id' });

    if (error) throw error;
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('open_id', openId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("[Database] Failed to get user:", error);
    return undefined;
  }

  return data || undefined;
}

// Bank Accounts
export async function getUserBankAccounts(userId: number) {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("[Database] Failed to get bank accounts:", error);
    return [];
  }

  return data || [];
}

export async function createBankAccount(account: {
  userId: number;
  accountTitle: string;
  accountNumber: string;
  bankName: string;
  iban?: string;
  isDefault: boolean;
  createdAt: Date;
}) {
  const { data, error } = await supabase
    .from('bank_accounts')
    .insert({
      user_id: account.userId,
      account_title: account.accountTitle,
      account_number: account.accountNumber,
      bank_name: account.bankName,
      iban: account.iban || null,
      is_default: account.isDefault ? 1 : 0,
    })
    .select()
    .single();

  if (error) {
    console.error("[Database] Failed to create bank account:", error);
    throw error;
  }

  return data;
}

// Salary Advances
export async function getUserSalaryAdvances(userId: number) {
  const { data, error } = await supabase
    .from('salary_advances')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("[Database] Failed to get salary advances:", error);
    return [];
  }

  return data || [];
}

export async function getAvailableBalance(userId: number): Promise<number> {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('net_salary')
    .eq('id', userId)
    .single();

  if (userError || !user?.net_salary) return 0;

  // Calculate available balance (50% of net salary minus outstanding advances)
  const maxAdvance = Math.floor(user.net_salary * 0.5);

  const { data: advances, error: advancesError } = await supabase
    .from('salary_advances')
    .select('total_amount, status')
    .eq('user_id', userId)
    .in('status', ['approved', 'disbursed']);

  if (advancesError) return maxAdvance;

  const outstanding = (advances || []).reduce((sum, a) => sum + a.total_amount, 0);

  return Math.max(0, maxAdvance - outstanding);
}

export async function createSalaryAdvance(advance: {
  userId: number;
  bankAccountId: number;
  amount: number;
  serviceFee: number;
  totalAmount: number;
  status: string;
  requestedAt: Date;
}) {
  const { data, error } = await supabase
    .from('salary_advances')
    .insert({
      user_id: advance.userId,
      bank_account_id: advance.bankAccountId,
      amount: advance.amount,
      service_fee: advance.serviceFee,
      total_amount: advance.totalAmount,
      status: advance.status,
      requested_at: advance.requestedAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("[Database] Failed to create salary advance:", error);
    throw error;
  }

  return data;
}

// Transactions
export async function getUserTransactions(userId: number, startDate?: Date, endDate?: Date) {
  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (startDate) {
    query = query.gte('created_at', startDate.toISOString());
  }
  if (endDate) {
    query = query.lte('created_at', endDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error("[Database] Failed to get transactions:", error);
    return [];
  }

  return data || [];
}

export async function createTransaction(transaction: {
  userId: number;
  type: string;
  amount: number;
  status: string;
  description: string;
  createdAt: Date;
}) {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      user_id: transaction.userId,
      type: transaction.type,
      amount: transaction.amount,
      status: transaction.status,
      description: transaction.description,
      created_at: transaction.createdAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("[Database] Failed to create transaction:", error);
    throw error;
  }

  return data;
}

// Cards
export async function getUserCard(userId: number) {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("[Database] Failed to get card:", error);
    return null;
  }

  return data || null;
}

export async function getCardTransactions(cardId: number) {
  const { data, error } = await supabase
    .from('card_transactions')
    .select('*')
    .eq('card_id', cardId)
    .order('transaction_date', { ascending: false });

  if (error) {
    console.error("[Database] Failed to get card transactions:", error);
    return [];
  }

  return data || [];
}
