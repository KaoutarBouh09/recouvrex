import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { RealEstateGuarantee } from "src/models/guarantee/realEstateGuarantee";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import RealEstateGuaranteeForm from "../updateForms/RealEstateGuaranteeForm";
import { Typography } from "@mui/material";

// Define the columns with concise labels
const columns = [
  { id: "ownerLastName", label: "Nom du propriétaire" },
  { id: "ownerFirstName", label: "Prénom du propriétaire" },
  { id: "ownerAddress", label: "Adresse du propriétaire" },
  { id: "ownerNationalID", label: "N° CIN" },
  { id: "landTitleName", label: "Nom du titre foncier" },
  { id: "landTitleNumber", label: "N° du titre foncier" },
  { id: "purchaseDeed", label: "Acte d'achat" },
  { id: "rank", label: "Rang" },
  { id: "landRegistryName", label: "Nom de la conservation foncière" },
  { id: "loanAmount", label: "Montant de prêt" },
  { id: "propertyName", label: "Nom de la propriété" },
  { id: "area", label: "Superficie" },
  { id: "constructionDescription", label: "Description des constructions" },
  { id: "registrationDate", label: "Date d'inscription" },
];

// Create a custom styled TableCell component with hover effect
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Use MUI's hover color
  },
  cursor: "pointer",
}));

// Function to create rows based on provided RealEstateGuarantee data
function createRow(data: RealEstateGuarantee) {
  return {
    ownerLastName: data.ownerLastName,
    ownerFirstName: data.ownerFirstName,
    ownerAddress: data.ownerAddress,
    ownerNationalID: data.ownerNationalID,
    landTitleName: data.landTitleName,
    landTitleNumber: data.landTitleNumber,
    purchaseDeed: data.purchaseDeed,
    rank: data.rank,
    landRegistryName: data.landRegistryName,
    loanAmount: data.loanAmount,
    propertyName: data.propertyName,
    area: data.area,
    constructionDescription: data.constructionDescription,
    registrationDate: data.registrationDate,
  };
}

export default function RealEstateGuaranteeTable() {
  const { guarantees } = useGuaranteeContext(); // Access guarantee data from context
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedRow, setselectedRow] = useState<RealEstateGuarantee>({
    id: 0,
    credit: { id: 0 },
    ownerLastName: "",
    ownerFirstName: "",
    ownerAddress: "",
    ownerNationalID: "",
    landTitleName: "",
    landTitleNumber: "",
    purchaseDeed: "",
    rank: "",
    landRegistryName: "",
    loanAmount: 0,
    propertyName: "",
    area: 0,
    constructionDescription: "",
    registrationDate: new Date(),
    type: "RealEstate", // Assuming type needs to be set as "RealEstate"
  });

  function handleRowClicked(data: RealEstateGuarantee) {
    setselectedRow(data);
    setOpenForm(true);
  }
  return (
    <>
      <RealEstateGuaranteeForm
        open={isOpenForm}
        setOpen={setOpenForm}
        initialValues={selectedRow}
      />
      
      { guarantees?.realEstateGuarantees.length === 0 ? (
        // <Typography variant="h6" align="center">
        //   Il n'y a pas de garanties Bien immobilier.
        // </Typography>
        <></>
      ) : (
        <>
        <Typography variant="h3" sx={{ m: 1 }}>
        Tableau des Garanties Bien immobilier
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
              {guarantees?.realEstateGuarantees.map((data, index) => {
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
