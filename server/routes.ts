import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API Routes - prefix all routes with /api
  
  // Get dashboard summary statistics
  app.get('/api/dashboard/summary', async (req, res) => {
    try {
      const days = Number(req.query.days) || 7;
      const grossVolume = await storage.getGrossVolume(days);
      const netVolume = await storage.getNetVolume(days);
      const newCustomers = await storage.getNewCustomers(days);
      const failedTransactions = await storage.getFailedTransactions();
      const topCustomers = await storage.getTopCustomersBySpend(5);
      
      // Calculate yesterday's volumes for comparison
      const yesterdayGrossVolume = await storage.getGrossVolume(1);
      
      const response = {
        grossVolume,
        yesterdayGrossVolume,
        netVolume,
        balance: netVolume, // In a real app, this would be calculated differently
        newCustomersCount: newCustomers.length,
        failedPaymentsTotal: failedTransactions.reduce((sum, t) => sum + Number(t.amount), 0),
        topCustomers
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard summary' });
    }
  });
  
  // Get transactions
  app.get('/api/transactions', async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const transactions = await storage.getRecentTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });
  
  // Get transactions for period
  app.get('/api/transactions/period', async (req, res) => {
    try {
      const days = Number(req.query.days) || 7;
      const transactions = await storage.getTransactionsForPeriod(days);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch period transactions' });
    }
  });
  
  // Get failed transactions
  app.get('/api/transactions/failed', async (req, res) => {
    try {
      const failedTransactions = await storage.getFailedTransactions();
      res.json(failedTransactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch failed transactions' });
    }
  });
  
  // Get customers
  app.get('/api/customers', async (req, res) => {
    try {
      const customers = await storage.getCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  });
  
  // Get new customers
  app.get('/api/customers/new', async (req, res) => {
    try {
      const days = Number(req.query.days) || 7;
      const newCustomers = await storage.getNewCustomers(days);
      res.json(newCustomers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch new customers' });
    }
  });
  
  // Get top customers by spend
  app.get('/api/customers/top', async (req, res) => {
    try {
      const limit = Number(req.query.limit) || 5;
      const topCustomers = await storage.getTopCustomersBySpend(limit);
      res.json(topCustomers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top customers' });
    }
  });

  return httpServer;
}
