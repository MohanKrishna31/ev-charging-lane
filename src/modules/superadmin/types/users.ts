export type UserRoleVariant = "Super Admin" | "Vendor Admin" | "Station Operator" | "Finance Manager" | "Support Agent";

export interface UserManagementItem {
  id: string;
  fullName: string;
  email: string;
  role: UserRoleVariant;
  vendorName: string; // "—" if not applicable
  lastLogin: string;
  status: "Active" | "Inactive";
}

export interface NewUserFormPayload {
  fullName: string;
  email: string;
  role: UserRoleVariant;
  vendorName: string;
  temporaryPassword?: string;
}