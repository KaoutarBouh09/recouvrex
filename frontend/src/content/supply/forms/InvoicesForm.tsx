import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createMultipleDueDates } from "src/utils/api/supplyApi";
import DueDateTable from "../tables/DueDateTable";
import { DueDate } from "../supplyModels";

const InvoiceForm: React.FC = () => {
  const [excelData, setExcelData] = useState<DueDate[] | null>(null);
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
    const data: DueDate[] = [];

    let isFirstRow = true; // Flag to skip the first row

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return; // Skip the first row
      }

      // Assuming the structure of your Excel matches the DueDate interface
      const dueDate: DueDate = {
        id: 0,
        dueDateId: null,
        paymentDueDate: formatDate(new Date(`${row.getCell(1).value}`)),
        dueDateStatus: `${row.getCell(2).value}`,
        principalAmount:parseFloat(`${row.getCell(3).value}`),
        interestAmount: parseFloat(`${row.getCell(4).value}`),
        insuranceAmount: parseFloat(`${row.getCell(5).value}`),
        ancillaryCharge: parseFloat(`${row.getCell(6).value}`),
        remainingPrincipalBalance:parseFloat(`${row.getCell(7).value}`),
        startDate: formatDate(new Date(`${row.getCell(8).value}`)),
        modificationDate: formatDate(new Date(`${row.getCell(9).value}`)),
        totalInstallmentAmount: parseFloat(`${row.getCell(10).value}`),
        latePaymentCharge: parseFloat(`${row.getCell(11).value}`),
        unpaidPrincipalAmount: parseFloat(`${row.getCell(12).value}`),
        accruedInterest: parseFloat(`${row.getCell(13).value}`),//
        unpaidInsurancePrenium: parseFloat(`${row.getCell(14).value}`),//
        unpaidAncillaryCharges: parseFloat(`${row.getCell(15).value}`),//
        get_case: {
          id: parseInt(`${row.getCell(16).value}`)
        },
        credit: {
          id: parseInt(`${row.getCell(17).value}`)
        }
      };
      data.push(dueDate);
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

  const insertManyDueDateTest = async () => {
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available

    try {
      const createdDueDate = await createMultipleDueDates(excelData);
      console.log("Created DueDates 💛💚:", createdDueDate);
    } catch (error) {
      console.error("Failed to create DueDates:", error);
    }
  };

  const downloadExampleExcel = () => {
   
    // Construct the path to the file in the public folder
    const exampleFilePath ="/examples/factures.xlsx";
  
    // Create an anchor element
    const link = document.createElement("a");
    // Set its href to the file path
    link.href = exampleFilePath;
    // Set its download attribute to the file name
    link.download = "factures.xlsx";
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
    { !virifyData&& <Paper
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
          Drag and Drop invoice Excel File Here
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
            onClick={()=>{setVirifyData(true)}}
          >
            Virifer les donner
          </Button>
        )}
      </Paper>}
    {virifyData&& excelData && <DueDateTable dueDates={excelData} />}
      {excelData && virifyData&& (
        <>
        <Button
         sx={{ mr: 1,mt:1 }}
          startIcon={<CloudUploadIcon />}
          variant="contained"
          onClick={insertManyDueDateTest}
        >
          Ajouter les clients
        </Button>
        <Button
         sx={{ ml: 1,mt:1 }}
          startIcon={<CloudUploadIcon />}
          variant="contained"
          onClick={()=>{setVirifyData(false)}}
        >
          Anneler
        </Button>
        </>
      )}
    </>
  );
};

export default InvoiceForm;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000`;
};
