import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { MortgageGuarantee } from "src/models/guarantee/mortgageGuarantee";
import { styled } from "@mui/material/styles";
import MortgageGuaranteeForm from "../updateForms/MortgageGuaranteeForm";
import { useState } from "react";
import { Typography } from "@mui/material";

// Define the columns with concise labels
const columns = [
  { id: "ownerFullName", label: "Propriétaire" },
  { id: "ownerAddress", label: "Adresse" },
  { id: "nationalIDCardNumber", label: "N° CIN" },
  { id: "landTitleName", label: "Titre foncier" },
  { id: "landTitleNumber", label: "N° Titre foncier" },
  { id: "mortgageRank", label: "Rang" },
  { id: "landRegistryOfficeName", label: "Conservation foncière" },
  { id: "mortgageLoanAmount", label: "Prêt" },
  { id: "mortgagedPropertyName", label: "Propriété" },
  { id: "mortgagedPropertyArea", label: "Superficie" },
  { id: "constructionsDescription", label: "Description constructions" },
  { id: "registrationDate", label: "Date inscription" },
  { id: "mortgageStatus", label: "Statut hypothèque" },
];

// Function to create rows based on provided MortgageGuarantee data
function createRow(data: MortgageGuarantee) {
  return {
    ownerFullName: data.ownerFullName,
    ownerAddress: data.ownerAddress,
    nationalIDCardNumber: data.nationalIDCardNumber,
    landTitleName: data.landTitleName,
    landTitleNumber: data.landTitleNumber,
    mortgageRank: data.mortgageRank,
    landRegistryOfficeName: data.landRegistryOfficeName,
    mortgageLoanAmount: data.mortgageLoanAmount,
    mortgagedPropertyName: data.mortgagedPropertyName,
    mortgagedPropertyArea: data.mortgagedPropertyArea,
    constructionsDescription: data.constructionsDescription,
    registrationDate: data.registrationDate,
    mortgageStatus: data.mortgageStatus,
  };
}

// Create a custom styled TableCell component with hover effect
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Use MUI's hover color
  },
  cursor: "pointer",
}));

export default function MortgageGuaranteeTable() {
  const { guarantees } = useGuaranteeContext(); // Access guarantee data from context
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedRow, setselectedRow] = useState<MortgageGuarantee>({
    id: 0,
    credit: { id: 0 },
    ownerFullName: "",
    ownerAddress: "",
    nationalIDCardNumber: "",
    landTitleName: "",
    landTitleNumber: "",
    mortgageRank: "",
    landRegistryOfficeName: "",
    mortgageLoanAmount: 0,
    mortgagedPropertyName: "",
    mortgagedPropertyArea: 0,
    constructionsDescription: "",
    registrationDate: new Date(),
    mortgageStatus: "",
    type: "Mortgage", // Assuming type needs to be set as "Mortgage"
  });

  function handleRowClicked(data: MortgageGuarantee) {
    setselectedRow(data);
    setOpenForm(true);
  }
  return (
    <>
      <MortgageGuaranteeForm
        open={isOpenForm}
        setOpen={setOpenForm}
        initialValues={selectedRow}
      />
      
      {guarantees?.mortgageGuarantees.length === 0 ? (
        // <Typography variant="h6" align="center">
        //   Il n'y a pas de garanties Hypothèque.
        // </Typography>
        <></>
      ) : (
        <>
        <Typography variant="h3" sx={{ m: 1 }}>
        Tableau des Garanties Hypothèque
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
              {guarantees?.mortgageGuarantees.map((data, index) => {
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
