export interface OperatorData {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: "Super Admin" | "Vendor Admin" | "Station Operator" | "Finance Manager" | "Support Agent";
  vendor: string;
  lastLogin: string;
  status: "Active" | "Inactive";
}
