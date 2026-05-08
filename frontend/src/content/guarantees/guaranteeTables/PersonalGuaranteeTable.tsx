import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { PersonalGuarantee } from "src/models/guarantee/personalGuarantee";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import PersonalGuaranteeForm from "../updateForms/PersonalGuaranteeForm";
import { Typography } from "@mui/material";

// Define the columns with concise labels for PersonalGuarantee
const columns = [
  { id: "guarantorLastName", label: "Nom" },
  { id: "guarantorFirstName", label: "Prénom" },
  { id: "guarantorPhoneNumber", label: "Téléphone" },
  { id: "guarantorNationalID", label: "CIN" },
  { id: "guarantorIDExpirationDate", label: "Exp. CIN" },
  { id: "relationshipWithClient", label: "Lien avec le client" },
  { id: "guarantorResidenceAddress", label: "Adresse de Résidence" },
  { id: "guarantorActivity", label: "Activité" },
  { id: "guarantorMonthlyIncome", label: "Revenu mensuel" },
  { id: "guarantorResidualIncome", label: "Revenu résiduel" },
  { id: "totalOutstandingInstallments", label: "Échéances en cours" },
  { id: "activitySeniority", label: "Ancienneté" },
  { id: "guarantorEmployer", label: "Employeur" },
  { id: "guarantorProfessionalAddress", label: "Adresse professionnelle" },
];

// Function to create rows based on provided PersonalGuarantee data
function createRow(data: PersonalGuarantee) {
  return {
    guarantorLastName: data.guarantorLastName,
    guarantorFirstName: data.guarantorFirstName,
    guarantorPhoneNumber: data.guarantorPhoneNumber,
    guarantorNationalID: data.guarantorNationalID,
    guarantorIDExpirationDate: data.guarantorIDExpirationDate,
    relationshipWithClient: data.relationshipWithClient,
    guarantorResidenceAddress: data.guarantorResidenceAddress,
    guarantorActivity: data.guarantorActivity,
    guarantorMonthlyIncome: data.guarantorMonthlyIncome,
    guarantorResidualIncome: data.guarantorResidualIncome,
    totalOutstandingInstallments: data.totalOutstandingInstallments,
    activitySeniority: data.activitySeniority,
    guarantorEmployer: data.guarantorEmployer,
    guarantorProfessionalAddress: data.guarantorProfessionalAddress,
  };
}

// Create a custom styled TableCell component with hover effect
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Use MUI's hover color
  },
  cursor: "pointer",
}));

export default function PersonalGuaranteeTable() {
  const { guarantees } = useGuaranteeContext(); // Access guarantee data from context
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedRow, setselectedRow] = useState<PersonalGuarantee>({
    id: 0,
    credit: { id: 0 },
    guarantorLastName: "",
    guarantorFirstName: "",
    guarantorPhoneNumber: "",
    guarantorNationalID: "",
    guarantorIDExpirationDate: new Date(),
    relationshipWithClient: "",
    guarantorResidenceAddress: "",
    guarantorActivity: "",
    guarantorMonthlyIncome: 0,
    guarantorResidualIncome: 0,
    totalOutstandingInstallments: 0,
    activitySeniority: 0,
    guarantorEmployer: "",
    guarantorProfessionalAddress: "",
    type: "PersonalGuarantee", // Assuming type needs to be set as "PersonalGuarantee"
  });

  function handleRowClicked(data: PersonalGuarantee) {
    setselectedRow(data);
    setOpenForm(true);
  }
  return (
    <>
      <PersonalGuaranteeForm
        open={isOpenForm}
        setOpen={setOpenForm}
        initialValues={selectedRow}
      />
     
      { guarantees?.personalGuarantees.length === 0 ? (
        // <Typography variant="h6" align="center">
        //   Il n'y a pas de garanties Caution Personnelle.
        // </Typography>
        <></>
      ) : (
        <>
        <Typography variant="h3" sx={{ m: 1 }}>
        Tableau des Garanties Caution Personnelle
      </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {guarantees?.personalGuarantees.map((data, index) => {
                const row = createRow(data);
                return (
                  <CustomTableRow
                    key={index}
                    onClick={() => {
                      handleRowClicked(data);
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </CustomTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
    </>
  );
}
