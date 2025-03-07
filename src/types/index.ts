export interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

export interface Offer {
  id: string;
  employeeId: string;
  content: string[];
  accepted: boolean;
}

export interface EmployeeFormValues {
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}

export type OfferContentGenerator = (employee: Employee) => string[];

export interface AdminCredentials {
  username: string;
  password: string;
}

export type OfferContentGenerator = (employee: Employee) => string[];