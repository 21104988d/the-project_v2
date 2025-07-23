import type { TransactionRecord } from '../types';

const HISTORY_STORAGE_KEY = 'the_project_tx_history';

/**
 * Saves a new transaction record to the history in localStorage.
 * @param record - The transaction data to save.
 */
export const saveTransaction = (record: Omit<TransactionRecord, 'timestamp' | 'id'>): void => {
  try {
    const newRecord: TransactionRecord = {
      ...record,
      id: record.txHash,
      timestamp: Date.now(),
    };
    
    const existingHistory = getTransactions();
    // Prevent duplicates in case of weird race conditions or re-submissions.
    const withoutDuplicates = existingHistory.filter(tx => tx.id !== newRecord.id);
    const updatedHistory = [newRecord, ...withoutDuplicates];
    
    // Limit history to the last 50 transactions to avoid bloating localStorage.
    if(updatedHistory.length > 50) {
        updatedHistory.length = 50;
    }

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save transaction to history:", error);
    // This failure should not block the user flow.
  }
};

/**
 * Retrieves all transaction records from localStorage.
 * @returns An array of transaction records, or an empty array if none are found or an error occurs.
 */
export const getTransactions = (): TransactionRecord[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
      // Note: For a more complex app, a reviver function could be used here to
      // re-instantiate class instances or perform data validation.
      return JSON.parse(storedHistory) as TransactionRecord[];
    }
    return [];
  } catch (error) {
    console.error("Failed to retrieve transaction history:", error);
    return [];
  }
};