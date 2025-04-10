import { 
  users, type User, type InsertUser,
  customers, type Customer, type InsertCustomer,
  transactions, type Transaction, type InsertTransaction
} from "@shared/schema";
import { format, subDays } from "date-fns";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Customer methods
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomers(): Promise<Customer[]>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getNewCustomers(dayCount: number): Promise<Customer[]>;
  getTopCustomersBySpend(limit: number): Promise<{customer: Customer, totalSpent: number}[]>;
  
  // Transaction methods
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getRecentTransactions(limit: number): Promise<Transaction[]>;
  getTransactionsForPeriod(days: number): Promise<Transaction[]>;
  getFailedTransactions(): Promise<Transaction[]>;
  
  // Dashboard stats
  getGrossVolume(days: number): Promise<number>;
  getNetVolume(days: number): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private customers: Map<number, Customer>;
  private transactions: Map<number, Transaction>;
  private userCurrentId: number;
  private customerCurrentId: number;
  private transactionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.transactions = new Map();
    this.userCurrentId = 1;
    this.customerCurrentId = 1;
    this.transactionCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData() {
    // Create some customers
    const customer1 = this.createCustomer({ 
      name: "John Doe", 
      email: "john.doe@example.com" 
    });
    
    const customer2 = this.createCustomer({ 
      name: "Sarah Miller", 
      email: "sarah.m@example.com" 
    });
    
    // Create some transactions
    this.createTransaction({
      amount: "12.50",
      status: "succeeded",
      customerId: customer1.id,
    });
    
    this.createTransaction({
      amount: "8.75",
      status: "succeeded",
      customerId: customer2.id,
    });
    
    this.createTransaction({
      amount: "11.62",
      status: "succeeded",
      customerId: customer1.id,
    });
    
    this.createTransaction({
      amount: "15.00",
      status: "failed",
      customerId: customer2.id,
      failureReason: "card_declined",
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Customer methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }
  
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }
  
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.customerCurrentId++;
    const customer: Customer = { 
      ...insertCustomer, 
      id, 
      createdAt: new Date() 
    };
    this.customers.set(id, customer);
    return customer;
  }
  
  async getNewCustomers(dayCount: number): Promise<Customer[]> {
    const cutoffDate = subDays(new Date(), dayCount);
    return Array.from(this.customers.values()).filter(
      customer => customer.createdAt >= cutoffDate
    );
  }
  
  async getTopCustomersBySpend(limit: number): Promise<{customer: Customer, totalSpent: number}[]> {
    const customerSpend = new Map<number, number>();
    
    // Calculate total spend per customer
    for (const transaction of this.transactions.values()) {
      if (transaction.status === 'succeeded' && transaction.customerId) {
        const currentSpend = customerSpend.get(transaction.customerId) || 0;
        customerSpend.set(transaction.customerId, currentSpend + Number(transaction.amount));
      }
    }
    
    // Create customer-spend pairs and sort by spent amount
    const customerSpendPairs = Array.from(customerSpend.entries())
      .map(([customerId, totalSpent]) => ({
        customer: this.customers.get(customerId)!,
        totalSpent
      }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit);
      
    return customerSpendPairs;
  }
  
  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }
  
  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values());
  }
  
  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionCurrentId++;
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }
  
  async getRecentTransactions(limit: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  async getTransactionsForPeriod(days: number): Promise<Transaction[]> {
    const cutoffDate = subDays(new Date(), days);
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.createdAt >= cutoffDate
    );
  }
  
  async getFailedTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.status === 'failed'
    );
  }
  
  // Dashboard stats
  async getGrossVolume(days: number): Promise<number> {
    const periodTransactions = await this.getTransactionsForPeriod(days);
    return periodTransactions.reduce((total, t) => {
      return total + Number(t.amount);
    }, 0);
  }
  
  async getNetVolume(days: number): Promise<number> {
    const periodTransactions = await this.getTransactionsForPeriod(days);
    return periodTransactions
      .filter(t => t.status === 'succeeded')
      .reduce((total, t) => {
        return total + Number(t.amount);
      }, 0);
  }
}

export const storage = new MemStorage();
