import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { Case } from "../supplyModels";

const columns = [
    { id: "statusId", label: "ID du statut" }, // Assuming you want to display the ID of the status
    { id: "procedureId", label: "ID de la procédure" }, // Assuming you want to display the ID of the procedure
    { id: "thirdPartyId", label: "ID du tiers" }, // Assuming you want to display the ID of the third party
    { id: "assignedAgentId", label: "ID de l'agent attribué" }, // Assuming you want to display the ID of the assigned agent
    { id: "startDate", label: "Date de début" },
    { id: "principalAmount", label: "Montant principal" },
    { id: "interestAmount", label: "Montant des intérêts" },
    { id: "penaltyAmount", label: "Montant des pénalités" },
    { id: "totalAmount", label: "Montant total" },
    { id: "commissionAmount", label: "Montant de la commission" },
    { id: "insuranceSettlementAmount", label: "Montant du règlement d'assurance" },
    { id: "contributorId", label: "ID du contributeur" }, // Assuming you want to display the ID of the contributor
    // Add more columns as needed...
];


function createRow(data: Case) {
    return {
        statusId: data.status ? data.status.id : "", // Check if status is defined before accessing its id property
        procedureId: data.procedure ? data.procedure.id : "", // Check if procedure is defined before accessing its id property
        thirdPartyId: data.thirdParty ? data.thirdParty.id : "", // Check if thirdParty is defined before accessing its id property
        assignedAgentId: data.assignedAgent ? data.assignedAgent.id : "", // Check if assignedAgent is defined before accessing its id property
        startDate: data.startDate ?? "",
        principalAmount: data.principalAmount ?? "",
        interestAmount: data.interestAmount ?? "",
        penaltyAmount: data.penaltyAmount ?? "",
        totalAmount: data.totalAmount ?? "",
        commissionAmount: data.commissionAmount ?? "",
        insuranceSettlementAmount: data.insuranceSettlementAmount ?? "",
        contributorId: data.contributor ? data.contributor.id : "", // Check if contributor is defined before accessing its id property
        // Map other fields accordingly...
    };
}



const CaseTable: React.FC<{ cases: Case[] }> = ({ cases }) => {
    if (!cases || cases.length === 0) {
        return (
            <Typography variant="h6" align="center">
                No cases available.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="case-table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cases.map((data, index) => {
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

export default CaseTable;
