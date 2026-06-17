export interface VendorListItem {
  id: string;
  companyName: string;
  vendorCode: string;
  location: string;
  contactName: string;
  contactEmail: string;
  stationsCount: number;
  activeStationsCount: number;
  revenueMtd: string;
  status: "Active" | "Suspended" | "Pending";
}

export interface VendorModulePayload {
  totalRegisteredText: string;
  items: VendorListItem[];
}

export interface NewVendorFormState {

  vendorName: string;
  legalCompanyName: string;
  emailAddress: string;
  phoneNumber: string;
  city: string;
  state: string;
  fullAddress: string;
  

  gstNumber: string;
  panNumber: string;
  

  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  branchName: string;
  upiId: string;
}