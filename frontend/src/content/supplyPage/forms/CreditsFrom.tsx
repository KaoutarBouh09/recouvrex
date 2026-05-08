import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createMultipleCredits } from "src/utils/api/supplyApi";
import CreditTable from "../tables/CreditTable";
import { Credit } from "../supplyModels";
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TextLoading from "src/components/TextLoading";
import CustomizedSnackbars from "src/components/CustomizedSnackbars";
import { SnackbarOptions } from "src/components/CustomizedSnackbars/SnackbarOptions";

interface CreditFormProps {
  excelData: Credit[] | null;
  setExcelData: React.Dispatch<React.SetStateAction<Credit[] | null>>;
}

const CreditsForm: React.FC<CreditFormProps> = ({excelData, setExcelData}) => {
  // const [excelData, setExcelData] = useState<Credit[] | null>(null); // Update state type
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // const [virifyData, setVirifyData] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);


   // states for alert -------------------------
   const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
   const [snackbarOptions, setSnackbarOptions] = React.useState<SnackbarOptions>({
     message: "",
     severity: "success",
   });

   const handleShowSnackbar = (options: SnackbarOptions) => {
     setSnackbarOptions(options);
     setSnackbarOpen(true);
   };
   // -------------------------------------------


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
    if(isLoading){
      return;
    }
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available
    setisLoading(true);
    try {
      const createdCredits = await createMultipleCredits(excelData); // Call API function for inserting credits
      console.log("Created credits:", createdCredits);

       handleShowSnackbar({
        message: "La saisie des informations de crédit a été effectuée avec succès.",
        severity: "success",
      })

    } catch (error) {
      console.error("Failed to create credits:", error);

      handleShowSnackbar({
        message: "Nous sommes désolés, mais les informations sur les crédits n'ont pas pu être enregistrées!",
        severity: "error",
      })
    }
    setisLoading(false);
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
        startIcon={<DownloadIcon />}
        variant="outlined"
        onClick={downloadExampleExcel}
        size="small"
        color="success"
      >
        <Typography variant="body1" gutterBottom>
          Téléchargez l'exemple de fichier ici
        </Typography>
      </Button>
       
        <Paper
          elevation={3}
          sx={{
       
            padding: 8,
            textAlign: "center",
            background: isDragging ? "linear-gradient(190deg, #68D2E8, green)" : "inherit",
            cursor: "pointer",
          }}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Typography sx={{fontFamily:'sans-serif',fontSize:20,fontWeight:10}} variant="h5" gutterBottom>
          Veuillez simplement glisser et déposer le fichier Excel contenant les crédits dans cette zone.
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
              sx={{mr:1,fontSize:16,fontWeight:14}}
              component="span"
              startIcon={<UploadFileIcon />}
              variant="contained"
            >
              Ou choisissez un fichier
            </Button>
          </label>
          {/* {excelData && (
            <Button
              sx={{ ml: 1 }}
              startIcon={<CloudUploadIcon />}
              variant="contained"
              onClick={() => { setVirifyData(true) }}
            >
              Virifer les données
            </Button>
          )} */}
        </Paper>
      
      {excelData && <CreditTable credits={excelData} />}
      {excelData &&  (
        <>
          <Button
         sx={{ mr: 1,my:1}}
       startIcon={!isLoading && <CloudUploadIcon />}
          variant="contained"
          onClick={insertManyCredits}
          
        >
         { isLoading?  <TextLoading /> : "Ajouter les credits"}
        </Button>
        <CustomizedSnackbars setOpen={setSnackbarOpen} open={snackbarOpen} options={snackbarOptions}/>

        </>
      )}
    </>
  );
};

export default CreditsForm;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00.000`;
};
