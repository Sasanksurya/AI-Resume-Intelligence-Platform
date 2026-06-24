import jsPDF from "jspdf";

interface ATSReportData {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export function generateATSReport(data: ATSReportData) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Resume Intelligence Platform", 20, y);

  y += 12;

  doc.setFontSize(16);
  doc.text("ATS Report", 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text(`ATS Score: ${data.score}%`, 20, y);

  y += 15;

  doc.text("Matched Skills", 20, y);
  y += 10;

  data.matchedSkills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.text("Missing Skills", 20, y);
  y += 10;

  data.missingSkills.forEach((skill) => {
    doc.text(`• ${skill}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.text("Suggestions", 20, y);
  y += 10;

  data.suggestions.forEach((suggestion) => {
    doc.text(`• ${suggestion}`, 25, y);
    y += 8;
  });

  y += 10;

  doc.setFontSize(10);
  doc.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    y
  );

  doc.save("ATS_Report.pdf");
}