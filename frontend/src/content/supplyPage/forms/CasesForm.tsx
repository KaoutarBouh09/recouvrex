import React, {  useState } from "react";
import * as ExcelJS from "exceljs";
import { Button, Paper, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { createMultipleCases } from "src/utils/api/supplyApi";
import { Case } from "../supplyModels";
import CaseTable from "../tables/CaseTable";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextLoading from "src/components/TextLoading";
import { SnackbarOptions } from "src/components/CustomizedSnackbars/SnackbarOptions";
import CustomizedSnackbars from "src/components/CustomizedSnackbars";

interface CaseFormProps {
  excelData: Case[] | null;
  setExcelData: React.Dispatch<React.SetStateAction<Case[] | null>>;
}

const CaseForm: React.FC<CaseFormProps> = ({ excelData, setExcelData }) => {
  // const [excelData, setExcelData] = useState<Case[] | null>(null);
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
          id: parseInt(`${row.getCell(1).value}`),
        },
        procedure: {
          id: parseInt(`${row.getCell(2).value}`),
        },
        thirdParty: {
          id: parseInt(`${row.getCell(3).value}`),
        },
        assignedAgent: {
          id: parseInt(`${row.getCell(4).value}`),
        },
        startDate: formatDate(new Date(`${row.getCell(5).value}`)),
        principalAmount: parseFloat(`${row.getCell(6).value}`),
        interestAmount: parseFloat(`${row.getCell(7).value}`),
        penaltyAmount: parseFloat(`${row.getCell(8).value}`),
        totalAmount: parseFloat(`${row.getCell(9).value}`),
        commissionAmount: parseFloat(`${row.getCell(10).value}`),
        insuranceSettlementAmount: parseFloat(`${row.getCell(11).value}`),
        contributor: {
          id: parseFloat(`${row.getCell(12).value}`),
        },
      };
      data.push(_case);
    });
    console.log("\n\ndata");
    console.log(data);
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
    if (isLoading) {
      return;
    }
    console.log("excelData to send");
    console.log(excelData);
    if (!excelData) return; // Ensure data is available

    setisLoading(true);
    try {
      const createdCases = await createMultipleCases(excelData);
      console.log("Created cases 💛💚:", createdCases);

      handleShowSnackbar({
        message: "Les cas ont été enregistrés avec succès.",
        severity: "success",
      })

    } catch (error) {
      console.error("Failed to create cases:", error);

      handleShowSnackbar({
        message: "Malheureusement, les cas n'ont pas été enregistrés !",
        severity: "error",
      })

    }
    setisLoading(false);
  };

  const downloadExampleExcel = () => {
    // Construct the path to the file in the public folder
    const exampleFilePath = "/examples/cas.xlsx";

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
      {
        <Paper
          elevation={3}
          sx={{
            padding: 8,
            textAlign: "center",
            background: isDragging
              ? "linear-gradient(190deg, #68D2E8, green)"
              : "inherit",
            cursor: "pointer",
            mb: 2,
          }}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Typography
            sx={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 10 }}
            variant="h5"
            gutterBottom
          >
            Faites simplement glisser et déposez le fichier Excel des cas ici
            pour le télécharger.{" "}
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
              sx={{ mr: 1, fontSize: 16, fontWeight: 14 }}
              component="span"
              startIcon={<UploadFileIcon />}
              variant="contained"
            >
              Ou choisissez un fichier
            </Button>
          </label>
        </Paper>
      }
      {excelData && <CaseTable cases={excelData} />}
      {excelData && (
        <>
          <Button
            sx={{ mr: 1, my: 1 }}
            startIcon={!isLoading && <CloudUploadIcon />}
            variant="contained"
            onClick={insertManyCasesTest}
          >
            {isLoading ? <TextLoading /> : "Ajouter les cas"}
          </Button>
          <CustomizedSnackbars setOpen={setSnackbarOpen} open={snackbarOpen} options={snackbarOptions}/>
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
