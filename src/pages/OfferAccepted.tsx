import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const OfferAccepted = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/");
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
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8 text-center">
              <h1 className="text-2xl font-medium text-gray-900 mb-4">
                Offer Accepted!
              </h1>
              <p className="text-gray-700 mb-6">
                Thank you for accepting your offer. We are excited to have you
                join our team. You will receive further details via email
                shortly.
              </p>
              <Button onClick={handleGoToHome} className="w-full">
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-4 px-6 border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Offer Portal
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OfferAccepted;
