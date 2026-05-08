import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { ThirdParty } from "src/models/ThirdParty";

const columns = [
    { id: "title", label: "Titre" },
    { id: "lastName", label: "Nom de famille" },
    { id: "firstName", label: "Prénom" },
    { id: "nationality", label: "Nationalité" },
    { id: "businessSector", label: "Secteur d'activité" },
    { id: "birthDate", label: "Date de naissance" },
    { id: "companyName", label: "Nom de la société" },
    { id: "countryOfResidence", label: "Pays de résidence" },
    { id: "legalForm", label: "Forme juridique" },
    { id: "occupation", label: "Profession" },
    { id: "personalEmail", label: "Email personnel" },
    { id: "businessEmail", label: "Email professionnel" },
    { id: "privatePhone", label: "Téléphone portable" },
    { id: "businessPhone", label: "Téléphone professionnel" },
    { id: "landLinePhone", label: "Téléphone fixe" },
    { id: "faxNumber", label: "Numéro de fax" },
    { id: "commercialRegister", label: "Registre commercial" },
    { id: "supportingDocumentType", label: "Type de document support" },
    { id: "supportingDocumentNumber", label: "Numéro du document support" },
    { id: "supportingDocumentExpirationDate", label: "Date d'expiration du document support" },
    { id: "maritalStatus", label: "État civil" },
    { id: "userId", label: "Identifiant utilisateur" },
  ];
  

function createRow(data: ThirdParty) {
    return {
      title: data.title ?? "",
      lastName: data.lastName ?? "",
      firstName: data.firstName ?? "",
      nationality: data.nationality ?? "",
      businessSector: data.businessSector ?? "",
      birthDate: data.birthDate ?? "",
      companyName: data.companyName ?? "",
      countryOfResidence: data.countryOfResidence ?? "",
      legalForm: data.legalForm ?? "",
      occupation: data.occupation ?? "",
      personalEmail: data.personalEmail ?? "",
      businessEmail: data.businessEmail ?? "",
      privatePhone: data.privatePhone ?? "",
      businessPhone: data.businessPhone ?? "",
      landLinePhone: data.landLinePhone ?? "",
      faxNumber: data.faxNumber ?? "",
      commercialRegister: data.commercialRegister ?? "",
      supportingDocumentType: data.supportingDocumentType ?? "",
      supportingDocumentNumber: data.supportingDocumentNumber ?? "",
      supportingDocumentExpirationDate: data.supportingDocumentExpirationDate ?? "",
      maritalStatus: data.maritalStatus ?? "",
      userId: data.user?.id ?? 0,
    };
  }
  

const ThirdPartyTable: React.FC<{ thirdParties: ThirdParty[] }> = ({ thirdParties }) => {
  if (!thirdParties || thirdParties.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No third parties available.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{mt:2}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="third-party-table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {thirdParties.map((data, index) => {
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

export default ThirdPartyTable;
