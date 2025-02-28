
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

const Index = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId) {
      toast.error("Please enter your Employee ID");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Always store the employeeId (either in localStorage or sessionStorage)
      if (keepSignedIn) {
        // For persistent login across browser sessions
        localStorage.setItem("employeeId", employeeId);
      } else {
        // For temporary login (cleared when browser is closed)
        sessionStorage.setItem("employeeId", employeeId);
      }
      
      navigate("/offer");
      toast.success("Successfully logged in");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10" />
      
      <header className="w-full py-4 px-6 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <Logo />
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-medium text-gray-900">Sign In</h1>
                <p className="mt-2 text-sm text-gray-600">
                  Sign in with your account to access your offer letter
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="employee-id" className="text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <Input
                      id="employee-id"
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="Enter your Employee ID"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="keep-signed-in"
                      checked={keepSignedIn}
                      onCheckedChange={(checked) => 
                        setKeepSignedIn(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="keep-signed-in"
                      className="text-sm font-medium text-gray-700 leading-none"
                    >
                      Keep me signed in
                    </label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Next"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6 flex items-center justify-between">
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Unlock account?
                </a>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  New user login?
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="w-full py-4 px-6 border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by <a href="#" className="text-blue-600 hover:underline">Offer Portal</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
