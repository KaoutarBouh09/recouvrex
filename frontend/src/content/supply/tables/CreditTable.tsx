import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { Credit } from "../supplyModels";

const columns = [
  { id: "creditType", label: "Type de crédit" },
  { id: "nominalAmount", label: "Montant nominal" },
  { id: "cumulativeDisbursement", label: "Décaissement cumulatif" },
  { id: "setupDate", label: "Date de mise en place" },
  { id: "firstInstallmentDate", label: "Date de la première échéance" },
  { id: "nominalRate", label: "Taux nominal" },
  { id: "rateNature", label: "Nature du taux" },
  { id: "installmentCount", label: "Nombre d'échéances" },
  { id: "deferredType", label: "Type de différé" },
  { id: "restructured", label: "Restructuré" },
  { id: "restructuringCount", label: "Nombre de restructurations" },
  { id: "creditStatus", label: "Statut du crédit" },
  { id: "constantInstallmentAmount", label: "Montant constant de l'échéance" },
  { id: "unpaidAmount", label: "Montant impayé" },
  { id: "insuranceAmount", label: "Montant de l'assurance" },
  { id: "triggeredInstallmentNumber", label: "Numéro d'échéance déclenchée" },
  { id: "openingDate", label: "Date d'ouverture" },
  { id: "modificationDate", label: "Date de modification" },
  { id: "lastStatusDate", label: "Dernière date de statut" },
  { id: "cumulativeRedemptionAmount", label: "Montant de rachat cumulatif" },
  { id: "lastRedemptionDate", label: "Dernière date de rachat" },
  { id: "agency", label: "Agence" },
  { id: "manager", label: "Responsable" },
  { id: "contract", label: "Contrat ID" }, // Added attribute for contract
  { id: "thirdParty", label: "Client ID" },
];

function createRow(data: Credit) {
  return {
    creditType: data.creditType ?? "",
    nominalAmount: data.nominalAmount ?? "",
    cumulativeDisbursement: data.cumulativeDisbursement ?? "",
    setupDate: data.setupDate ?? "",
    firstInstallmentDate: data.firstInstallmentDate ?? "",
    nominalRate: data.nominalRate ?? "",
    rateNature: data.rateNature ?? "",
    installmentCount: data.installmentCount ?? "",
    deferredType: data.deferredType ?? "",
    restructured: data.restructured ?? "",
    restructuringCount: data.restructuringCount ?? "",
    creditStatus: data.creditStatus ?? "",
    constantInstallmentAmount: data.constantInstallmentAmount ?? "",
    unpaidAmount: data.unpaidAmount ?? "",
    insuranceAmount: data.insuranceAmount ?? "",
    triggeredInstallmentNumber: data.triggeredInstallmentNumber ?? "",
    openingDate: data.openingDate ?? "",
    modificationDate: data.modificationDate ?? "",
    lastStatusDate: data.lastStatusDate ?? "",
    cumulativeRedemptionAmount: data.cumulativeRedemptionAmount ?? "",
    lastRedemptionDate: data.lastRedemptionDate ?? "",
    agency: data.agency ?? "",
    manager: data.manager ?? "",
    contract: data.contract?.id ?? "",
    thirdParty: data.thirdParty?.id ??"",
  };
}

const CreditTable: React.FC<{ credits: Credit[] }> = ({ credits }) => {
  if (!credits || credits.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No credits available.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="credit-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {credits.map((data, index) => {
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

export default CreditTable;
