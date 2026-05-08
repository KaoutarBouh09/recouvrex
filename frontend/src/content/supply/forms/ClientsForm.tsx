import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import { ThirdParty } from "src/models/ThirdParty";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ThirdPartyTable from "../tables/ThirdPartyTable";
import { createMultipleThirdParties } from "src/utils/api/supplyApi";

const ClientForm: React.FC = () => {
  const [excelData, setExcelData] = useState<ThirdParty[] | null>(null);
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
    const data: ThirdParty[] = [];

    let isFirstRow = true; // Flag to skip the first row

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      if (isFirstRow) {
        isFirstRow = false;
        return; // Skip the first row
      }

      // Assuming the structure of your Excel matches the ThirdParty interface
      const thirdParty: ThirdParty = {
        id: 0,
        thirdPartyId: "",
        tiersType: `${row.getCell(21).value}` as ThirdParty["tiersType"],
        title: `${row.getCell(22).value}`,
        lastName: `${row.getCell(11).value}`,
        firstName: `${row.getCell(9).value}`,
        companyName: `${row.getCell(6).value}`,
        birthDate: formatDate(new Date(`${row.getCell(1).value}`)), //`${row.getCell(1).value}`,//
        nationality: `${row.getCell(14).value}`,
        countryOfResidence: `${row.getCell(7).value}`,
        businessSector: `${row.getCell(4).value}`,
        legalForm: `${row.getCell(12).value}`,
        occupation: `${row.getCell(15).value}`,
        personalEmail: `${row.getCell(16).value}`,
        businessEmail: `${row.getCell(2).value}`,

        privatePhone: `${row.getCell(17).value}`,
        businessPhone: `${row.getCell(3).value}`,
        landLinePhone: `${row.getCell(10).value}`,
        faxNumber: `${row.getCell(8).value}`,

        commercialRegister: `${row.getCell(5).value}`,
        supportingDocumentType: `${
          row.getCell(20).value
        }` as ThirdParty["supportingDocumentType"],
        supportingDocumentNumber: `${row.getCell(19).value}`,
        supportingDocumentExpirationDate: formatDate(
          new Date(`${row.getCell(18).value}`)
        ),
        maritalStatus: `${row.getCell(13).value}`,
        user: {
          id: parseInt(`${row.getCell(23).value}`),
        },
      };
      data.push(thirdParty);
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

  const insertManyThirdpartiesTest = async () => {
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available

    try {
      const createdThirdParties = await createMultipleThirdParties(excelData);
      console.log("Created third parties 💛💚:", createdThirdParties);
    } catch (error) {
      console.error("Failed to create third parties:", error);
    }
  };

  const downloadExampleExcel = () => {
   
    // Construct the path to the file in the public folder
    const exampleFilePath ="/examples/client.xlsx";
  
    // Create an anchor element
    const link = document.createElement("a");
    // Set its href to the file path
    link.href = exampleFilePath;
    // Set its download attribute to the file name
    link.download = "client.xlsx";
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
          Drag and Drop clients Excel File Here
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
    {virifyData&& excelData && <ThirdPartyTable thirdParties={excelData} />}
      {excelData && virifyData&& (
        <>
        <Button
         sx={{ mr: 1,mt:1 }}
          startIcon={<CloudUploadIcon />}
          variant="contained"
          onClick={insertManyThirdpartiesTest}
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

export default ClientForm;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000`;
};
