export interface Room {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: "active" | "cancelled";
  createdAt: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  auth?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

// Import types that are needed
import type { User } from "firebase/auth";
