import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { BusinessFundGuarantee } from "src/models/guarantee/businessFundGuarantee";
import { styled } from "@mui/material/styles";
import BusinessFundGuaranteeForm from "../updateForms/BusinessFundGuaranteeForm";
import { useState } from "react";
import { Typography } from "@mui/material";

// Define the columns with concise labels
const columns = [
  { id: "ownerFullName", label: "Propriétaire" },
  { id: "corporateName", label: "Raison Sociale" },
  { id: "socialCapital", label: "Capital" },
  { id: "commerceRegistryNumber", label: "Registre Commerce N°" },
  { id: "commerceRegistryCity", label: "Ville Registre Commerce" },
  { id: "managerFullName", label: "Nom du Gérant" },
  { id: "managerNationalIDCard", label: "CIN du Gérant" },
  { id: "tradeName", label: "Dénomination" },
  { id: "pledgeRank", label: "Rang Nantissement" },
  { id: "pledgeRealizationDate", label: "Date de concrétisation" },
  { id: "pledgeExpirationDate", label: "Date d'expiration" },
];

// Function to create rows based on provided BusinessFundGuarantee data
function createRow(data: BusinessFundGuarantee) {
  return {
    ownerFullName: data.ownerFullName,
    corporateName: data.corporateName,
    socialCapital: data.socialCapital,
    commerceRegistryNumber: data.commerceRegistryNumber,
    commerceRegistryCity: data.commerceRegistryCity,
    managerFullName: data.managerFullName,
    managerNationalIDCard: data.managerNationalIDCard,
    tradeName: data.tradeName,
    pledgeRank: data.pledgeRank,
    pledgeRealizationDate: data.pledgeRealizationDate,
    pledgeExpirationDate: data.pledgeExpirationDate,
  };
}

// Create a custom styled TableCell component with hover effect
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Use MUI's hover color
  },
  cursor: "pointer",
}));

export default function BusinessFundGuaranteeTable() {
  const { guarantees } = useGuaranteeContext(); // Access guarantee data from context
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedRow, setselectedRow] = useState<BusinessFundGuarantee>({
    id: 0,
    credit : { id: 0 },
    ownerFullName: "",
    corporateName: "",
    socialCapital: 0,
    commerceRegistryNumber: "",
    commerceRegistryCity: "",
    managerFullName: "",
    managerNationalIDCard: "",
    tradeName: "",
    pledgeRank: "",
    pledgeRealizationDate: new Date(),
    pledgeExpirationDate: new Date(),
    type: "BusinessFund", // Assuming type needs to be set as "BusinessFund"
  });

  function handleRowClicked(data: BusinessFundGuarantee) {
    setselectedRow(data);
    setOpenForm(true);
  }
  return (
    <>
      <BusinessFundGuaranteeForm
        open={isOpenForm}
        setOpen={setOpenForm}
        initialValues={selectedRow}
      />
      

      { guarantees?.businessFundGuarantees.length === 0 ? (
        // <Typography variant="h6" align="center">
        //   Il n'y a pas de garanties Fonds de commerce.
        // </Typography>
        <></>
      ) : (
        <>
        <Typography variant="h3" sx={{ m: 1 }}>
        Tableau des Garanties Fonds de commerce
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
              {guarantees?.businessFundGuarantees.map((data, index) => {
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
