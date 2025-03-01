import html2pdf from "html2pdf.js";

interface PdfGenerationOptions {
  employeeId: string;
  offerContent: string[];
  signatureImage: string | null;
  agreeToTerms: boolean;
}

export const generateOfferLetterPdf = (options: PdfGenerationOptions): Promise<void> => {
  const { employeeId, signatureImage, agreeToTerms } = options;

  return new Promise(async (resolve, reject) => {
    if (!signatureImage || !agreeToTerms) {
      reject(new Error("Cannot generate PDF: Missing signature or terms agreement"));
      return;
    }

    // Fetch employee data from the database
    let employeeData;
    try {
      const { getEmployee } = await import("@/lib/db");
      employeeData = await getEmployee(employeeId);
      if (!employeeData) {
        reject(new Error("Cannot generate PDF: Employee data not found"));
        return;
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      reject(new Error("Cannot generate PDF: Failed to fetch employee data"));
      return;
    }

    // Generate dynamic offer content
    const offerContent = [
      `Dear ${employeeData.name},`,
      "We are pleased to extend this offer of employment for the position of Software Engineer at Genpact. This letter confirms the details of our offer as discussed during your interview process.",
      `Position: ${employeeData.position}`,
      `Start Date: ${employeeData.startDate}`,
      `Location: ${employeeData.location}`,
      `Salary: ₹${employeeData.salary.toLocaleString()} per annum`,
      `Benefits: ${employeeData.benefits}`,
      "Reporting To: Jane Smith, Engineering Manager",
      "This offer is contingent upon the successful completion of a background check and your ability to provide documentation proving your eligibility to work in India.",
      "We are excited about the prospect of you joining our team and contributing to Genpact's success. Your skills and experience will be valuable assets to our organization, and we look forward to working with you.",
      "To accept this offer, please sign below and return this letter by December 1, 2023. If you have any questions or require clarification on any aspect of this offer, please do not hesitate to contact our HR department.",
      "Sincerely,",
      "John Doe",
      "Head of Human Resources, Genpact"
    ];
    
    // Create a clean clone for PDF generation without UI elements
    const element = document.createElement('div');
    element.style.padding = '20px';
    element.style.fontFamily = 'Arial, sans-serif';
    
    // Add title and employee ID
    const headerDiv = document.createElement('div');
    headerDiv.style.display = 'flex';
    headerDiv.style.justifyContent = 'space-between';
    headerDiv.style.marginBottom = '20px';
    
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `
      <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 8px;">Your Offer Letter</h1>
      <p style="font-size: 14px; color: #666;">Employee ID: ${employeeId}</p>
    `;
    
    const logoDiv = document.createElement('div');
    logoDiv.innerHTML = `
      <img src="https://www.noapteacompaniilor.ro/wp-content/uploads/2022/09/Genpact-logo.jpg" alt="Genpact Logo" style="height: 40px; width: auto;" />
      <div style="font-size: 12px; color: #0891b2; text-align: right;">Transformation Happens Here</div>
    `;
    
    headerDiv.appendChild(titleDiv);
    headerDiv.appendChild(logoDiv);
    element.appendChild(headerDiv);
    
    // Add offer content with proper formatting
    const contentDiv = document.createElement('div');
    
    // First paragraph (Dear Candidate)
    const p1 = document.createElement('p');
    p1.style.marginBottom = '16px';
    p1.style.fontWeight = 'bold';
    p1.textContent = offerContent[0];
    contentDiv.appendChild(p1);
    
    // Second paragraph (We are pleased...)
    const p2 = document.createElement('p');
    p2.style.marginBottom = '24px';
    p2.textContent = offerContent[1];
    contentDiv.appendChild(p2);
    
    // Position details with bold labels
    const detailsDiv = document.createElement('div');
    detailsDiv.style.marginBottom = '24px';
    
    offerContent.slice(2, 7).forEach(line => {
      const [label, value] = line.split(': ');
      const detailP = document.createElement('p');
      detailP.style.marginBottom = '8px';
      detailP.style.display = 'flex';
      detailP.innerHTML = `<span style="font-weight: bold; min-width: 120px;">${label}:</span><span style="margin-left: 8px;">${value}</span>`;
      detailsDiv.appendChild(detailP);
    });
    
    contentDiv.appendChild(detailsDiv);
    
    // Center logo
    const centerLogoDiv = document.createElement('div');
    centerLogoDiv.style.textAlign = 'center';
    centerLogoDiv.style.margin = '32px 0';
    centerLogoDiv.innerHTML = `
      <img src="https://www.noapteacompaniilor.ro/wp-content/uploads/2022/09/Genpact-logo.jpg" alt="Genpact Logo" style="height: 64px; width: auto; margin-bottom: 8px;" />
      <p style="font-size: 14px; color: #0891b2; font-weight: 500;">Transformation Happens Here</p>
    `;
    contentDiv.appendChild(centerLogoDiv);
    
    // Remaining paragraphs
    offerContent.slice(7, -2).forEach(paragraph => {
      const p = document.createElement('p');
      p.style.marginBottom = '16px';
      p.textContent = paragraph;
      contentDiv.appendChild(p);
    });
    
    // Signature line
    const signatureLineDiv = document.createElement('div');
    signatureLineDiv.style.marginTop = '32px';
    signatureLineDiv.innerHTML = `
      <p style="font-weight: bold;">${offerContent[offerContent.length - 2]}</p>
      <p style="font-weight: bold;">${offerContent[offerContent.length - 1]}</p>
    `;
    contentDiv.appendChild(signatureLineDiv);
    
    element.appendChild(contentDiv);
    
    // Add the accepted statement
    const acceptanceDiv = document.createElement('div');
    acceptanceDiv.style.marginTop = '32px';
    acceptanceDiv.style.marginBottom = '24px';
    acceptanceDiv.innerHTML = `
      <p style="font-weight: bold;">I have read and agree to the terms and conditions outlined in this offer letter.</p>
    `;
    element.appendChild(acceptanceDiv);
    
    // Add the signature if available
    if (signatureImage) {
      const signatureDiv = document.createElement('div');
      signatureDiv.style.marginTop = '20px';
      signatureDiv.innerHTML = `
        <p style="margin-bottom: 10px; font-weight: bold;">Employee Signature:</p>
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
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => resolve())
      .catch((error) => {
        console.error("PDF generation error:", error);
        reject(error);
      });
  });
};