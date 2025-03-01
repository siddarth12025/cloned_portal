
import { RefObject } from "react";
import { toast } from "sonner";

export type SignatureMethod = "draw" | "upload";

export interface SignatureHandlerProps {
  canvasRef: RefObject<any>;
  setSignatureComplete: (isComplete: boolean) => void;
  setSignatureImage: (image: string | null) => void;
}

export const handleSignatureFromCanvas = (props: SignatureHandlerProps): void => {
  const { canvasRef, setSignatureComplete, setSignatureImage } = props;
  
  if (canvasRef.current) {
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setSignatureImage(dataURL);
      setSignatureComplete(true);
      console.log("Signature saved successfully from canvas");
    } catch (error) {
      console.error("Error saving signature from canvas:", error);
      toast.error("Could not save signature. Please try again.");
      setSignatureComplete(false);
    }
  }
};

export const handleSignatureUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSignatureImage: (image: string | null) => void,
  setSignatureComplete: (isComplete: boolean) => void
): void => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    toast.error("Please upload an image file.");
    return;
  }

  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image size should be less than 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const result = event.target?.result as string;
    setSignatureImage(result);
    setSignatureComplete(true);
  };
  reader.onerror = () => {
    toast.error("Error reading file. Please try again.");
  };
  reader.readAsDataURL(file);
};

export const clearSignature = (
  canvasRef: RefObject<any>,
  setSignatureComplete: (isComplete: boolean) => void,
  setSignatureImage: (image: string | null) => void
): void => {
  setSignatureImage(null);
  setSignatureComplete(false);
  if (canvasRef.current) {
    canvasRef.current.clear();
  }
};
