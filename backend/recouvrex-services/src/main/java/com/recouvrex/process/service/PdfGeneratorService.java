package com.recouvrex.process.service;

import com.recouvrex.process.model.Agreement;
import com.recouvrex.process.model.InstallmentPayment;
import com.recouvrex.process.repository.InstallmentPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfGeneratorService {

    private final InstallmentPaymentRepository installmentPaymentRepository;

    private static final String PDF_DIR = "generated-pdfs/payment-plans/";
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public String generatePaymentPlanPdf(Agreement agreement) throws IOException {
        // Créer le dossier si inexistant
        new File(PDF_DIR).mkdirs();

        String fileName = "plan_paiement_" + agreement.getAgreementId() + ".pdf";
        String filePath = PDF_DIR + fileName;

        List<InstallmentPayment> installments = installmentPaymentRepository
                .findByAgreementIdOrderByInstallmentNumber(agreement.getId());

        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            try (PDPageContentStream content = new PDPageContentStream(document, page)) {
                float yPosition = 750;
                float margin = 50;
                float pageWidth = page.getMediaBox().getWidth();

                // TITRE
                content.setFont(PDType1Font.HELVETICA_BOLD, 18);
                content.beginText();
                content.newLineAtOffset(margin, yPosition);
                content.showText("PLAN DE PAIEMENT");
                content.endText();
                yPosition -= 30;

                // Ligne de séparation
                content.moveTo(margin, yPosition);
                content.lineTo(pageWidth - margin, yPosition);
                content.stroke();
                yPosition -= 20;

                // INFORMATIONS GÉNÉRALES
                content.setFont(PDType1Font.HELVETICA_BOLD, 11);
                yPosition = addLine(content, margin, yPosition, 
                    "Référence: " + agreement.getAgreementId());
                yPosition = addLine(content, margin, yPosition, 
                    "Date: " + agreement.getAgreementDate().format(DATE_FORMAT));
                yPosition = addLine(content, margin, yPosition, 
                    "Client: " + agreement.getCase1().getThirdParty().getFirstName() + " " 
                    + agreement.getCase1().getThirdParty().getLastName());
                yPosition -= 10;

                // MONTANTS
                content.setFont(PDType1Font.HELVETICA_BOLD, 12);
                yPosition = addLine(content, margin, yPosition, "DÉTAILS FINANCIERS");
                content.setFont(PDType1Font.HELVETICA_BOLD, 11);
                yPosition = addLine(content, margin, yPosition, 
                    "Montant total: " + formatAmount(agreement.getCase1().getTotalAmount()) + " DH");
                yPosition = addLine(content, margin, yPosition, 
                    "Intérêts: " + formatAmount(agreement.getInterestAmount()) + " DH");
                yPosition = addLine(content, margin, yPosition, 
                    "Total avec intérêts: " + formatAmount(agreement.getTotalAmountWithInterest()) + " DH");
                yPosition = addLine(content, margin, yPosition, 
                    "Mensualité: " + formatAmount(agreement.getMonthlyPaymentAmount()) + " DH");
                yPosition = addLine(content, margin, yPosition, 
                    "Nombre d'échéances: " + installments.size());
                yPosition -= 20;

                // TABLEAU DES ÉCHÉANCES
                content.setFont(PDType1Font.HELVETICA_BOLD, 12);
                yPosition = addLine(content, margin, yPosition, "ÉCHÉANCIER");
                yPosition -= 10;

                // En-têtes du tableau
                content.setFont(PDType1Font.HELVETICA_BOLD, 10);
                float col1 = margin;
                float col2 = margin + 80;
                float col3 = margin + 200;
                float col4 = margin + 320;

                yPosition = addLine(content, col1, yPosition, "N°");
                addLine(content, col2, yPosition, "Date d'échéance");
                addLine(content, col3, yPosition, "Montant");
                addLine(content, col4, yPosition, "Statut");
                yPosition -= 5;

                // Ligne de séparation
                content.moveTo(margin, yPosition);
                content.lineTo(pageWidth - margin, yPosition);
                content.stroke();
                yPosition -= 15;

                // Contenu du tableau
                content.setFont(PDType1Font.HELVETICA_BOLD, 10);
                for (InstallmentPayment installment : installments) {
                    if (yPosition < 100) {
                       content.close();

                       page = new PDPage(PDRectangle.A4);
                       document.addPage(page);

    // IMPORTANT: open new content stream in APPEND mode
                       try (PDPageContentStream newContent =
                                new PDPageContentStream(document, page)) {

                           yPosition = 750;

        // Continue writing using newContent instead of content
                           for (InstallmentPayment installment1 : installments) {

                               if (yPosition < 100) break;

                               addLine(newContent, col1, yPosition, String.valueOf(installment1.getInstallmentNumber()));
                               addLine(newContent, col2, yPosition, installment1.getDueDate().format(DATE_FORMAT));
                               addLine(newContent, col3, yPosition, formatAmount(installment1.getAmount()) + " DH");
                               addLine(newContent, col4, yPosition, getStatusLabel(installment1.getStatus().name()));

                               yPosition -= 20;
        }
    }

                        break; // exit outer loop
}
                        // Nouvelle page si nécessaire
                        
                        
                        
                        
                    addLine(content, col1, yPosition, String.valueOf(installment.getInstallmentNumber()));
                    addLine(content, col2, yPosition, installment.getDueDate().format(DATE_FORMAT));
                    addLine(content, col3, yPosition, formatAmount(installment.getAmount()) + " DH");
                    addLine(content, col4, yPosition, getStatusLabel(installment.getStatus().name()));
                    yPosition -= 20;
                }

                // PIED DE PAGE
                yPosition -= 30;
                content.setFont(PDType1Font.HELVETICA_OBLIQUE, 9);
                addLine(content, margin, yPosition, 
                    "Document généré le " + java.time.LocalDate.now().format(DATE_FORMAT));
            }

            document.save(filePath);
        }

        return filePath;
    }

    private float addLine(PDPageContentStream content, float x, float y, String text) throws IOException {
        content.beginText();
        content.newLineAtOffset(x, y);
        content.showText(text);
        content.endText();
        return y - 15;
    }

    private String formatAmount(BigDecimal amount) {
        return String.format("%,.2f", amount);
    }

    private String getStatusLabel(String status) {
        return switch (status) {
            case "PENDING" -> "En attente";
            case "VALIDATED" -> "Payé";
            case "REJECTED" -> "Rejeté";
            default -> status;
        };
    }
}