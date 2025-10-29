// Session-based transaction store
// Resets on login/refresh, persists during app session

export interface Transaction {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  amount: number; // in centimes
  type: 'credit' | 'debit';
  status: string;
  month: string;
}

const DEFAULT_BALANCE = 233333; // 2,333.33 Dhs in centimes

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    title: 'Salary Advance',
    subtitle: 'Meryem - ACME',
    date: '29 Oct 2025 | 12:48 PM',
    amount: 200000,
    type: 'credit',
    status: 'completed',
    month: 'October'
  },
  {
    id: 2,
    title: 'Service Fee',
    subtitle: 'Transaction Fee',
    date: '29 Oct 2025 | 12:48 PM',
    amount: -6000,
    type: 'debit',
    status: 'completed',
    month: 'October'
  },
  {
    id: 3,
    title: 'Salary Advance',
    subtitle: 'Meryem - ACME',
    date: '15 Oct 2025 | 09:30 AM',
    amount: 100000,
    type: 'credit',
    status: 'completed',
    month: 'October'
  },
  {
    id: 4,
    title: 'Service Fee',
    subtitle: 'Transaction Fee',
    date: '15 Oct 2025 | 09:30 AM',
    amount: -6000,
    type: 'debit',
    status: 'completed',
    month: 'October'
  },
  {
    id: 5,
    title: 'Salary Advance',
    subtitle: 'Meryem - ACME',
    date: '05 Oct 2025 | 02:15 PM',
    amount: 50000,
    type: 'credit',
    status: 'completed',
    month: 'October'
  },
  {
    id: 6,
    title: 'Service Fee',
    subtitle: 'Transaction Fee',
    date: '05 Oct 2025 | 02:15 PM',
    amount: -6000,
    type: 'debit',
    status: 'completed',
    month: 'October'
  }
];

class TransactionStore {
  private storageKey = 'libertypay_transactions';
  private balanceKey = 'libertypay_balance';

  getTransactions(): Transaction[] {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : DEFAULT_TRANSACTIONS;
  }

  getBalance(): number {
    const stored = sessionStorage.getItem(this.balanceKey);
    return stored ? parseInt(stored) : DEFAULT_BALANCE;
  }

  addTransaction(amount: number) {
    const transactions = this.getTransactions();
    const balance = this.getBalance();
    
    // Calculate fee (3% of amount)
    const fee = Math.round(amount * 0.03);
    
    // Get current date/time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }).replace(/ /g, ' ');
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const fullDate = `${dateStr} | ${timeStr}`;
    
    // Get next ID
    const nextId = Math.max(...transactions.map(t => t.id)) + 1;
    
    // Create advance transaction
    const advanceTransaction: Transaction = {
      id: nextId,
      title: 'Salary Advance',
      subtitle: 'Meryem - ACME',
      date: fullDate,
      amount: amount,
      type: 'credit',
      status: 'completed',
      month: 'October'
    };
    
    // Create fee transaction
    const feeTransaction: Transaction = {
      id: nextId + 1,
      title: 'Service Fee',
      subtitle: 'Transaction Fee',
      date: fullDate,
      amount: -fee,
      type: 'debit',
      status: 'completed',
      month: 'October'
    };
    
    // Add to beginning of array (most recent first)
    const updatedTransactions = [advanceTransaction, feeTransaction, ...transactions];
    
    // Update balance (deduct advance amount)
    const newBalance = balance - amount;
    
    // Save to session storage
    sessionStorage.setItem(this.storageKey, JSON.stringify(updatedTransactions));
    sessionStorage.setItem(this.balanceKey, newBalance.toString());
    
    return { transactions: updatedTransactions, balance: newBalance };
  }

  reset() {
    sessionStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.balanceKey);
  }
}

export const transactionStore = new TransactionStore();
