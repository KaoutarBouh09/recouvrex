import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { DueDate } from "../supplyModels";

const columns = [
    { id: "paymentDueDate", label: "Date d'échéance du paiement" },
    { id: "dueDateStatus", label: "Statut de la date d'échéance" },
    { id: "principalAmount", label: "Montant principal" },
    { id: "interestAmount", label: "Montant des intérêts" },
    { id: "insuranceAmount", label: "Montant de l'assurance" },
    { id: "ancillaryCharge", label: "Charge accessoire" },
    { id: "remainingPrincipalBalance", label: "Solde principal restant" },
    { id: "startDate", label: "Date de début" },
    { id: "modificationDate", label: "Date de modification" },
    { id: "totalInstallmentAmount", label: "Montant total des échéances" },
    { id: "latePaymentCharge", label: "Frais de retard" },
    { id: "unpaidPrincipalAmount", label: "Montant principal impayé" },
    { id: "accruedInterest", label: "Intérêts courus" },
    { id: "unpaidInsurancePrenium", label: "Prime d'assurance impayée" },
    { id: "unpaidAncillaryCharges", label: "Charges accessoires impayées" },
    { id: "get_case", label: "Case ID" },
    { id: "credit", label: "Credit ID" } 
];


function createRow(data: DueDate) {
    return {
        paymentDueDate: data.paymentDueDate ?? "",
        dueDateStatus: data.dueDateStatus ?? "",
        principalAmount: data.principalAmount ?? 0, // Assuming it's a number
        interestAmount: data.interestAmount ?? 0, // Assuming it's a number
        insuranceAmount: data.insuranceAmount ?? 0, // Assuming it's a number
        ancillaryCharge: data.ancillaryCharge ?? 0, // Assuming it's a number
        remainingPrincipalBalance: data.remainingPrincipalBalance ?? 0, // Assuming it's a number
        startDate: data.startDate ?? "",
        modificationDate: data.modificationDate ?? "",
        totalInstallmentAmount: data.totalInstallmentAmount ?? 0, // Assuming it's a number
        latePaymentCharge: data.latePaymentCharge ?? 0, // Assuming it's a number
        unpaidPrincipalAmount: data.unpaidPrincipalAmount ?? 0, // Assuming it's a number
        accruedInterest: data.accruedInterest ?? 0, // Assuming it's a number
        unpaidInsurancePrenium: data.unpaidInsurancePrenium ?? 0, // Assuming it's a number
        unpaidAncillaryCharges: data.unpaidAncillaryCharges ?? 0, // Assuming it's a number
        get_case: data.get_case?.id ?? 0, // Assuming it's a number
        credit: data.credit?.id ?? 0, // Assuming it's a number
        // Map other fields accordingly...
    };
}



const DueDateTable: React.FC<{ dueDates: DueDate[] }> = ({ dueDates }) => {
    if (!dueDates || dueDates.length === 0) {
        return (
            <Typography variant="h6" align="center">
                No due dates available.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="due-date-table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dueDates.map((data, index) => {
                        const row = createRow(data);
                        return (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DueDateTable;
