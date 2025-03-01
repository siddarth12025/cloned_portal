const generateOfferContent = (employee) => {
  const template = `
    Dear ${employee.name || "Candidate"},

    We are pleased to extend this offer of employment for the position of ${employee.position || "Software Engineer"} at Genpact. This letter confirms the details of our offer as discussed during your interview process.

    Position: ${employee.position || "Software Engineer"}
    Start Date: ${employee.startDate || "TBD"}
    Location: ${employee.location || "TBD"}
    Salary: ${employee.salary ? `₹${employee.salary.toLocaleString()} per annum` : "TBD"}
    Benefits: ${employee.benefits || "Standard company benefits"}
    Reporting To: ${employee.reportingTo || "TBD"}

    This offer is contingent upon the successful completion of a background check and your ability to provide documentation proving your eligibility to work in India.

    We are excited about the prospect of you joining our team and contributing to Genpact's success. Your skills and experience will be valuable assets to our organization, and we look forward to working with you.

    To accept this offer, please sign below and return this letter by ${employee.responseDeadline || "TBD"}. If you have any questions or require clarification on any aspect of this offer, please do not hesitate to contact our HR department.

    Sincerely,
    John Doe
    Head of Human Resources, Genpact
  `;
  return template.trim().split("\\n");
};

export default generateOfferContent;