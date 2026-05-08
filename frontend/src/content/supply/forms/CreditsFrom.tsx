import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createMultipleCredits } from "src/utils/api/supplyApi";
import CreditTable from "../tables/CreditTable";
import { Credit } from "../supplyModels";

const ClientForm: React.FC = () => {
  const [excelData, setExcelData] = useState<Credit[] | null>(null); // Update state type
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [virifyData, setVirifyData] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log("excelData");
  //   console.log(excelData);
  // }, [excelData]);

  const handleFileUpload = async (file: File) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    const worksheet = workbook.worksheets[0];
    console.log("🚀 ~ handleFileUpload ~ worksheet:", worksheet);
    const data: Credit[] = [];

    let isFirstRow = true; // Flag to skip the first row

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return; // Skip the first row
      }

      // Assuming the structure of your Excel matches the Credit interface
      const credit: Credit = {
        id: 0,
        creditId: null,
        creditType: `${row.getCell(1).value}`,
        nominalAmount: parseFloat(`${row.getCell(2).value}`),
        cumulativeDisbursement: parseFloat(`${row.getCell(3).value}`),
        setupDate: formatDate(new Date(`${row.getCell(4).value}`)),
        firstInstallmentDate:  formatDate(new Date(`${row.getCell(5).value}`)),
        nominalRate: parseInt(`${row.getCell(6).value}`),
        rateNature:  `${row.getCell(7).value}`,
        installmentCount:parseInt(`${row.getCell(8).value}`),
        deferredType:  `${row.getCell(9).value}`,
        restructured:  (`${row.getCell(10).value}`).toLowerCase() == "oui"?true:false,
        restructuringCount:parseInt(`${row.getCell(11).value}`),
        creditStatus:  `${row.getCell(12).value}`,
        constantInstallmentAmount:parseFloat(`${row.getCell(13).value}`),
        unpaidAmount: parseFloat(`${row.getCell(14).value}`),
        insuranceAmount: parseFloat(`${row.getCell(15).value}`),
        triggeredInstallmentNumber: parseInt(`${row.getCell(16).value}`),
        openingDate:  formatDate(new Date(`${row.getCell(17).value}`)),
        modificationDate:  formatDate(new Date(`${row.getCell(18).value}`)),
        lastStatusDate:  formatDate(new Date(`${row.getCell(19).value}`)),
        cumulativeRedemptionAmount: parseFloat(`${row.getCell(20).value}`),
        lastRedemptionDate: formatDate(new Date(`${row.getCell(21).value}`)),
        agency:  `${row.getCell(22).value}`,
        manager:  `${row.getCell(23).value}`,
        contract: {
          id:parseInt(`${row.getCell(24).value}`),
        },
        thirdParty: {
          id: parseInt(`${row.getCell(25).value}`),
        }
      };
      data.push(credit);
    });

    setExcelData(data);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const insertManyCredits = async () => {
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available

    try {
      const createdCredits = await createMultipleCredits(excelData); // Call API function for inserting credits
      console.log("Created credits:", createdCredits);
    } catch (error) {
      console.error("Failed to create credits:", error);
    }
  };

  const downloadExampleExcel = () => {
    // Construct the path to the file in the public folder
    const exampleFilePath = "/examples/credits.xlsx";

    // Create an anchor element
    const link = document.createElement("a");
    // Set its href to the file path
    link.href = exampleFilePath;
    // Set its download attribute to the file name
    link.download = "credits.xlsx";
    // Simulate a click on the anchor element
    link.click();
  };

  return (
    <>
      <Button
        sx={{ mb: 1 }}
        component="span"
        startIcon={<CloudUploadIcon />}
        variant="outlined"
        onClick={downloadExampleExcel}
        size="small"
        color="success"
      >
        <Typography variant="body1" gutterBottom>
          Téléchargez l'exemple de fichier ici
        </Typography>
      </Button>
      {!virifyData && (
        <Paper
          elevation={3}
          sx={{
            border: "1px solid",
            padding: 4,
            textAlign: "center",
            backgroundColor: isDragging ? "blue" : "inherit",
            cursor: "pointer",
          }}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Typography variant="h5" gutterBottom>
            Drag and Drop credits Excel File Here
          </Typography>
          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files![0])}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              sx={{ mr: 1 }}
              component="span"
              startIcon={<CloudUploadIcon />}
              variant="contained"
            >
              Ou choisissez un fichier
            </Button>
          </label>
          {excelData && (
            <Button
              sx={{ ml: 1 }}
              startIcon={<CloudUploadIcon />}
              variant="contained"
              onClick={() => { setVirifyData(true) }}
            >
              Virifer les données
            </Button>
          )}
        </Paper>
      )}
      {virifyData && excelData && <CreditTable credits={excelData} />}
      {excelData && virifyData && (
        <>
          <Button
            sx={{ mr: 1, mt: 1 }}
            startIcon={<CloudUploadIcon />}
            variant="contained"
            onClick={insertManyCredits}
          >
            Ajouter les crédits
          </Button>
          <Button
            sx={{ ml: 1, mt: 1 }}
            startIcon={<CloudUploadIcon />}
            variant="contained"
            onClick={() => { setVirifyData(false) }}
          >
            Annuler
          </Button>
        </>
      )}
    </>
  );
};

export default ClientForm;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000`;
};
