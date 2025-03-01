
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface OfferActionsProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
  offerAccepted: boolean;
  handleAcceptOffer: () => void;
  signatureComplete: boolean;
  handleDownloadPdf: () => void;
  generatingPdf: boolean;
}

const OfferActions: React.FC<OfferActionsProps> = ({
  agreeToTerms,
  setAgreeToTerms,
  offerAccepted,
  handleAcceptOffer,
  signatureComplete,
  handleDownloadPdf,
  generatingPdf,
}) => {
  return (
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
  );
};

export default OfferActions;
