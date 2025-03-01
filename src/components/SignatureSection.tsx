
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignatureCanvas from "@/components/SignatureCanvas";
import { 
  SignatureMethod, 
  handleSignatureUpload, 
  clearSignature 
} from "@/utils/signatureUtils";

interface SignatureSectionProps {
  signatureMethod: SignatureMethod;
  setSignatureMethod: (method: SignatureMethod) => void;
  signatureImage: string | null;
  signatureComplete: boolean;
  setSignatureComplete: (isComplete: boolean) => void;
  setSignatureImage: (image: string | null) => void;
  handleSignature: (isComplete: boolean) => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  signatureMethod,
  setSignatureMethod,
  signatureImage,
  signatureComplete,
  setSignatureComplete,
  setSignatureImage,
  handleSignature
}) => {
  const canvasRef = useRef<any>(null);

  const handleClearSignature = () => {
    clearSignature(canvasRef, setSignatureComplete, setSignatureImage);
  };

  const handleUploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSignatureUpload(e, setSignatureImage, setSignatureComplete);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Your Signature</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please sign below to confirm your acceptance of this offer.
      </p>
      
      <div className="flex gap-4 mb-4">
        <Button 
          variant={signatureMethod === "draw" ? "default" : "outline"} 
          onClick={() => setSignatureMethod("draw")}
          size="sm"
        >
          Draw Signature
        </Button>
        <Button 
          variant={signatureMethod === "upload" ? "default" : "outline"} 
          onClick={() => setSignatureMethod("upload")}
          size="sm"
        >
          Upload Signature
        </Button>
      </div>
      
      {signatureMethod === "draw" ? (
        <div className="border border-gray-300 rounded-md p-4 mb-3">
          <SignatureCanvas ref={canvasRef} onComplete={handleSignature} />
          <Button 
            variant="outline" 
            onClick={handleClearSignature}
            size="sm"
            className="mt-3"
          >
            Clear Signature
          </Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default SignatureSection;
