
import React from "react";

interface OfferContentProps {
  offerContent: string[];
  employeeId: string;
}

const OfferContent: React.FC<OfferContentProps> = ({ offerContent, employeeId }) => {
  return (
    <div className="prose max-w-none mb-8">
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
              src="https://www.noapteacompaniilor.ro/wp-content/uploads/2022/09/Genpact-logo.jpg" 
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
              src="https://www.noapteacompaniilor.ro/wp-content/uploads/2022/09/Genpact-logo.jpg" 
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
    </div>
  );
};

export default OfferContent;
