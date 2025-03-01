import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component to wrap the application
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check localStorage for existing login state on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<void> => {
    // Simulate an API call for authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password123") {
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          toast.success("Login successful");
          navigate("/admin-panel");
          resolve();
        } else {
          toast.error("Invalid username or password");
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = (): void => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    toast.info("You have been logged out");
    navigate("/admin-login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};