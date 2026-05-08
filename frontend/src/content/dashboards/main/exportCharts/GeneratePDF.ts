// src/GeneratePDF.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserContext } from 'src/contexts/UserContext';
import { useContext } from 'react';
import { getCurrentDate } from 'src/utils/formatDate/CurrentDateTime';

export const GeneratePDF = (input,currentUser) => {



const logoUrl = 'public/recouvrex.png'
  if (input != null) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Get current date
      const date = new Date().toLocaleDateString();

      // Add logo, date, title, and user information to the first page
      const title = "RAPPORT DU RECOUVREX 2024";
      const user = "Généré par :"+currentUser.userName;
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add logo
      if (logoUrl) {
        pdf.addImage(logoUrl, 'PNG', 10, 10, 50, 50); // Adjust position and size as needed
      }

      // Add date
      pdf.setFontSize(12);
      pdf.text(`Date: ${date}`, pdfWidth - 50, 20); // Adjust position as needed

      // Set font size and add centered title
      pdf.setFontSize(24);
      pdf.setFont("helvetica", "bold"); // Set font to bold
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pdfWidth - titleWidth) / 2, pdfHeight / 2 - 10);

      // Set font size and add centered user information
      pdf.setFontSize(18);
      const userWidth = pdf.getTextWidth(user);
      pdf.text(user, (pdfWidth - userWidth) / 2, pdfHeight / 2 + 10);

      // Add new page for charts and content
      pdf.addPage();

      const imgProps = pdf.getImageProperties(imgData);
      const contentWidth = pdf.internal.pageSize.getWidth();
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

      // Add the image to the second page
      pdf.addImage(imgData, 'PNG', 0, 0, contentWidth, contentHeight);

      pdf.save("RapportRecouvrex-"+getCurrentDate()+".pdf");
    });
  }
};
