
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import SignatureCanvas from "../components/SignatureCanvas";
import Logo from "../components/Logo";
import offerContent from "../data/offerContent";
import html2pdf from "html2pdf.js";

const OfferPage = () => {
  const [signatureComplete, setSignatureComplete] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
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
  };

  const handleClearSignature = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setSignatureComplete(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!signatureComplete || !offerAccepted) {
      toast.error("Please accept and sign the offer before downloading");
      return;
    }

    if (!offerContentRef.current) {
      toast.error("Could not generate PDF. Please try again.");
      return;
    }

    setGeneratingPdf(true);
    
    // Clone the content to avoid modifying the actual DOM
    const element = offerContentRef.current.cloneNode(true) as HTMLElement;
    
    // Add the signature if available
    if (canvasRef.current) {
      const signatureImage = canvasRef.current.toDataURL();
      const signatureDiv = document.createElement('div');
      signatureDiv.style.marginTop = '20px';
      signatureDiv.innerHTML = `
        <p style="margin-bottom: 5px; font-weight: bold;">Employee Signature:</p>
        <img src="${signatureImage}" alt="Signature" style="border: 1px solid #ddd; max-width: 300px;" />
      `;
      element.appendChild(signatureDiv);
    }

    // Configure PDF options
    const options = {
      margin: [10, 10, 10, 10],
      filename: `Genpact_Offer_Letter_${employeeId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().from(element).set(options).save().then(() => {
      setGeneratingPdf(false);
      toast.success("Offer letter downloaded successfully");
    }).catch((error) => {
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
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-medium text-gray-900">Your Offer Letter</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Employee ID: {employeeId}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="flex flex-col items-end">
                    <img 
                      src="/lovable-uploads/012024d2-64d0-4ce5-80e3-7da28fc319ed.png" 
                      alt="Genpact Logo" 
                      className="h-8 w-auto mb-1"
                    />
                    <span className="text-xs text-cyan-500">Transformation Happens Here</span>
                  </div>
                </div>
              </div>
              
              {/* Offer content with better formatting */}
              <div className="prose max-w-none mb-8">
                {/* First paragraph (Dear Candidate) */}
                <p className="mb-4 text-gray-700 font-semibold">
                  {offerContent[0]}
                </p>
                
                {/* Second paragraph (We are pleased...) */}
                <p className="mb-6 text-gray-700">
                  {offerContent[1]}
                </p>
                
                {/* Position details (formatted as bold labels) */}
                <div className="mb-6 space-y-2">
                  {offerContent.slice(2, 7).map((line, index) => {
                    const [label, value] = line.split(': ');
                    return (
                      <p key={index} className="text-gray-700 flex">
                        <span className="font-bold min-w-32">{label}:</span>
                        <span className="ml-2">{value}</span>
                      </p>
                    );
                  })}
                </div>
                
                {/* Center logo */}
                <div className="my-8 flex justify-center">
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/012024d2-64d0-4ce5-80e3-7da28fc319ed.png" 
                      alt="Genpact Logo" 
                      className="h-16 w-auto mx-auto mb-2"
                    />
                    <p className="text-sm text-cyan-600 font-medium">Transformation Happens Here</p>
                  </div>
                </div>
                
                {/* Remaining paragraphs */}
                {offerContent.slice(7, -2).map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
                
                {/* Signature line with proper indentation */}
                <div className="mt-8">
                  <p className="text-gray-700 font-semibold">{offerContent[offerContent.length - 2]}</p>
                  <p className="text-gray-700 font-bold">{offerContent[offerContent.length - 1]}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Accept Your Offer</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => 
                        setAgreeToTerms(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 leading-none pt-0.5"
                    >
                      I have read and agree to the terms and conditions outlined in this offer letter
                    </label>
                  </div>
                  
                  <div>
                    <Button
                      onClick={handleAcceptOffer}
                      disabled={offerAccepted || !agreeToTerms}
                      className="mr-4"
                    >
                      {offerAccepted ? "Offer Accepted" : "Accept Offer"}
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Signature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please sign below to confirm your acceptance of this offer.
                    </p>
                    
                    <div className="border border-gray-300 rounded-md p-4 mb-3">
                      <SignatureCanvas ref={canvasRef} onComplete={handleSignature} />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleClearSignature}
                      size="sm"
                      className="mb-4"
                    >
                      Clear Signature
                    </Button>
                    
                    <div className="mt-6">
                      <Button
                        onClick={handleDownloadPdf}
                        disabled={!signatureComplete || !offerAccepted || generatingPdf}
                        className="w-full md:w-auto"
                      >
                        {generatingPdf ? "Generating PDF..." : "Download Offer Letter (PDF)"}
                      </Button>
                    </div>
                  </div>
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
