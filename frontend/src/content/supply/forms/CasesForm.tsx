import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createMultipleCases } from "src/utils/api/supplyApi";
import { Case } from "../supplyModels";
import CaseTable from "../tables/CaseTable";

const CaseForm: React.FC = () => {
  const [excelData, setExcelData] = useState<Case[] | null>(null);
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
    const data: Case[] = [];

    let isFirstRow = true; // Flag to skip the first row

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return; // Skip the first row
      }

      const _case: Case = {
        id: 0,
        caseId: null,
        status: {
          id: parseInt(`${row.getCell(1).value}`)
        },
        procedure: {
          id: parseInt(`${row.getCell(2).value}`)
        },
        thirdParty: {
          id: parseInt(`${row.getCell(3).value}`)
        },
        assignedAgent: {
          id: parseInt(`${row.getCell(4).value}`)
        },
        startDate: formatDate(new Date(`${row.getCell(5).value}`)),
        principalAmount: parseFloat(`${row.getCell(6).value}`),
        interestAmount: parseFloat(`${row.getCell(7).value}`),
        penaltyAmount: parseFloat(`${row.getCell(8).value}`),
        totalAmount: parseFloat(`${row.getCell(9).value}`),
        commissionAmount: parseFloat(`${row.getCell(10).value}`),
        insuranceSettlementAmount: parseFloat(`${row.getCell(11).value}`),
        contributor: {
          id: parseFloat(`${row.getCell(12).value}`)
        }
      };
      data.push(_case);
    });
    console.log("\n\ndata")
    console.log(data)
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

  const insertManyCasesTest = async () => {
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available

    try {
      const createdCases = await createMultipleCases(excelData);
      console.log("Created cases 💛💚:", createdCases);
    } catch (error) {
      console.error("Failed to create cases:", error);
    }
  };

  const downloadExampleExcel = () => {
   
    // Construct the path to the file in the public folder
    const exampleFilePath ="/examples/cas.xlsx";
  
    // Create an anchor element
    const link = document.createElement("a");
    // Set its href to the file path
    link.href = exampleFilePath;
    // Set its download attribute to the file name
    link.download = "cas.xlsx";
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
          Drag and Drop cases Excel File Here
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
    {virifyData&& excelData && <CaseTable cases={excelData} />}
      {excelData && virifyData&& (
        <>
        <Button
         sx={{ mr: 1,mt:1 }}
          startIcon={<CloudUploadIcon />}
          variant="contained"
          onClick={insertManyCasesTest}
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

export default CaseForm;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000`;
};
