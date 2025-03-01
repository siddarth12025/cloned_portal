
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  handleSignatureUpload
} from "@/utils/signatureUtils";

interface SignatureSectionProps {
  signatureImage: string | null;
  signatureComplete: boolean;
  setSignatureComplete: (isComplete: boolean) => void;
  setSignatureImage: (image: string | null) => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  signatureImage,
  signatureComplete,
  setSignatureComplete,
  setSignatureImage
}) => {
  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSignatureUpload(e, setSignatureImage, setSignatureComplete);
  };

  const handleClearSignature = () => {
    setSignatureImage(null);
    setSignatureComplete(false);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your Signature</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please upload your signature to confirm your acceptance of this offer.
      </p>
      
      <div className="border border-gray-300 rounded-md p-4 mb-3">
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUploadSignature}
            className="mb-2"
          />
          {signatureImage && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <img 
                src={signatureImage} 
                alt="Uploaded signature" 
                className="border border-gray-200 max-h-32 object-contain"
              />
              <Button 
                variant="outline" 
                onClick={handleClearSignature}
                size="sm"
                className="mt-3"
              >
                Clear Signature
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignatureSection;
