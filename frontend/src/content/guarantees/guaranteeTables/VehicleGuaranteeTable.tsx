import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGuaranteeContext } from "src/contexts/GuaranteeContext";
import { VehicleGuarantee } from "src/models/guarantee/vehicleGuarantee";
import { styled } from "@mui/material/styles";
import VehicleGuaranteeForm from "../updateForms/VehicleGuaranteeForm";
import { useState } from "react";
import { Typography } from "@mui/material";

// Define the columns with concise labels
const columns = [
  { id: "vehicleBrand", label: "Marque" },
  { id: "modelYear", label: "Année modèle" },
  { id: "registrationNumber", label: "Immatriculation" },
  { id: "fuelType", label: "Carburant" },
  { id: "fiscalHorsepower", label: "Puissance fiscale" },
];

// Function to create rows based on provided BusinessFundGuarantee data
function createRow(data: VehicleGuarantee) {
  return {
    vehicleBrand: data.vehicleBrand,
    modelYear: data.modelYear,
    registrationNumber: data.registrationNumber,
    fuelType: data.fuelType,
    fiscalHorsepower: data.fiscalHorsepower,
  };
}

// Create a custom styled TableCell component with hover effect
const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Use MUI's hover color
  },
  cursor: "pointer",
}));

export default function VehicleGuaranteeTable() {
  const { guarantees } = useGuaranteeContext(); // Access guarantee data from context
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedRow, setselectedRow] = useState<VehicleGuarantee>(
    {
      id: 0,
      credit: { id: 0 },
      vehicleBrand: "",
      modelYear: 0,
      registrationNumber: "",
      fuelType: "",
      fiscalHorsepower: 0,
      type: "",
    }
  );

  function handleRowClicked(data:VehicleGuarantee) {
    setselectedRow(data);
    setOpenForm(true);

  }

  return (
    <>
      <VehicleGuaranteeForm open={isOpenForm} setOpen={setOpenForm} initialValues={selectedRow} />
     
      { guarantees?.vehicleGuarantees.length === 0 ? (
        // <Typography variant="h6" align="center">
        //   Il n'y a pas de garanties véhiculaires.
        // </Typography>
        <></>
      ) : (
        <>
        <Typography variant="h3" sx={{ m: 1 }}>
        Tableau des Garanties Véhiculaires
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
            {guarantees?.vehicleGuarantees.map((data, index) => {
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
