export interface Charger {
  id: string;
  name: string;
  status: 'Available' | 'Charging' | 'Faulted' | 'Offline';
  power: number;
  connectorType: 'CCS2' | 'Type 2' | 'CHAdeMO';
  lastUsed: string;
  totalSessions: number;
  activeSessionProgress?: number;
  error?: string;
}
