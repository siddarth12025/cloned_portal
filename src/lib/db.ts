import { openDB, IDBPDatabase } from "idb";

interface Employee {
  id: string;
  name: string;
  position: string;
  startDate: string;
  location: string;
  salary: number;
  benefits: string;
}

interface Offer {
  id: string;
  employeeId: string;
  content: string[];
  accepted: boolean;
}

const DB_NAME = "EmployeeOfferDB";
const DB_VERSION = 1;
const EMPLOYEE_STORE = "employees";
const OFFER_STORE = "offers";

let db: IDBPDatabase | null = null;

// Initialize the database
export const initDB = async (): Promise<void> => {
  if (!db) {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(EMPLOYEE_STORE)) {
          database.createObjectStore(EMPLOYEE_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(OFFER_STORE)) {
          database.createObjectStore(OFFER_STORE, { keyPath: "id" });
        }
      },
    });
  }
};

// Employee-related operations
export const addEmployee = async (employee: Employee): Promise<void> => {
  if (!db) await initDB();
  await db!.put(EMPLOYEE_STORE, employee);
};

export const getEmployee = async (id: string): Promise<Employee | undefined> => {
  if (!db) await initDB();
  return await db!.get(EMPLOYEE_STORE, id);
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  if (!db) await initDB();
  return await db!.getAll(EMPLOYEE_STORE);
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  if (!db) await initDB();
  await db!.put(EMPLOYEE_STORE, employee);
};

export const deleteEmployee = async (id: string): Promise<void> => {
  if (!db) await initDB();
  await db!.delete(EMPLOYEE_STORE, id);
};

// Offer-related operations
export const addOffer = async (offer: Offer): Promise<void> => {
  if (!db) await initDB();
  await db!.put(OFFER_STORE, offer);
};

export const getOffer = async (id: string): Promise<Offer | undefined> => {
  if (!db) await initDB();
  return await db!.get(OFFER_STORE, id);
};

export const getAllOffers = async (): Promise<Offer[]> => {
  if (!db) await initDB();
  return await db!.getAll(OFFER_STORE);
};

export const updateOffer = async (offer: Offer): Promise<void> => {
  if (!db) await initDB();
  await db!.put(OFFER_STORE, offer);
};

export const deleteOffer = async (id: string): Promise<void> => {
  if (!db) await initDB();
  await db!.delete(OFFER_STORE, id);
};

export const clearDatabase = async (): Promise<void> => {
  if (!db) await initDB();
  const transaction = db!.transaction([EMPLOYEE_STORE, OFFER_STORE], "readwrite");
  await transaction.objectStore(EMPLOYEE_STORE).clear();
  await transaction.objectStore(OFFER_STORE).clear();
  await transaction.done;
};