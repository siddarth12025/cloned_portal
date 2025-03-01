
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SignatureCanvas from "@/components/SignatureCanvas";
import Logo from "@/components/Logo";
import offerContent from "@/data/offerContent";
import OfferContent from "@/components/OfferContent";
import SignatureSection from "@/components/SignatureSection";
import OfferActions from "@/components/OfferActions";
import { generateOfferLetterPdf } from "@/utils/pdfGenerator";
import { handleSignatureFromCanvas, SignatureMethod } from "@/utils/signatureUtils";

const OfferPage = () => {
  const [signatureComplete, setSignatureComplete] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [signatureMethod, setSignatureMethod] = useState<SignatureMethod>("draw");
  const canvasRef = useRef<any>(null);
  const offerContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId") || sessionStorage.getItem("employeeId");
    if (!employeeId) {
      setIsAuthenticated(false);
      toast.error("Please sign in to view your offer");
      navigate("/");
    }
  }, [navigate]);

  const employeeId = localStorage.getItem("employeeId") || sessionStorage.getItem("employeeId") || "Guest";

  const handleAcceptOffer = () => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions first");
      return;
    }
    setOfferAccepted(true);
    toast.success("Offer accepted");
  };

  const handleSignature = (isComplete: boolean) => {
    setSignatureComplete(isComplete);
    // When signature is complete, save the signature image
    if (isComplete && canvasRef.current) {
      handleSignatureFromCanvas({
        canvasRef,
        setSignatureComplete,
        setSignatureImage
      });
    }
  };

  const handleDownloadPdf = () => {
    if (!signatureComplete || !offerAccepted) {
      toast.error("Please accept and sign the offer before downloading");
      return;
    }

    setGeneratingPdf(true);
    
    generateOfferLetterPdf({
      employeeId,
      offerContent,
      signatureImage,
      agreeToTerms
    })
      .then(() => {
        setGeneratingPdf(false);
        toast.success("Offer letter downloaded successfully");
      })
      .catch((error) => {
        console.error("PDF generation error:", error);
        setGeneratingPdf(false);
        toast.error("Failed to generate PDF. Please try again.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    sessionStorage.removeItem("employeeId");
    navigate("/");
    toast.info("You have been logged out");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10" />
      
      <header className="w-full py-4 px-6 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Logo />
          <Button variant="outline" onClick={handleLogout}>Log Out</Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full lg:w-4/5">
            <div className="p-8" ref={offerContentRef}>
              {/* Offer content component */}
              <OfferContent 
                offerContent={offerContent}
                employeeId={employeeId}
              />
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Accept Your Offer</h2>
                
                {/* Offer actions component */}
                <OfferActions 
                  agreeToTerms={agreeToTerms}
                  setAgreeToTerms={setAgreeToTerms}
                  offerAccepted={offerAccepted}
                  handleAcceptOffer={handleAcceptOffer}
                  signatureComplete={signatureComplete}
                  handleDownloadPdf={handleDownloadPdf}
                  generatingPdf={generatingPdf}
                />
                
                {/* Signature section component */}
                <div className="mt-6">
                  <SignatureSection 
                    signatureMethod={signatureMethod}
                    setSignatureMethod={setSignatureMethod}
                    signatureImage={signatureImage}
                    signatureComplete={signatureComplete}
                    setSignatureComplete={setSignatureComplete}
                    setSignatureImage={setSignatureImage}
                    handleSignature={handleSignature}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="w-full py-4 px-6 border-t border-gray-100 mt-auto">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by <a href="#" className="text-blue-600 hover:underline">Genpact</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OfferPage;
