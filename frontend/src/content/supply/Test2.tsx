import React, { useEffect, useState } from "react";
import * as ExcelJS from "exceljs";
import { Button } from "@mui/material";
import { ThirdParty } from "src/models/ThirdParty";
import { createMultipleThirdParties } from "src/utils/api/client/ClientApi";

const ExcelReader: React.FC = () => {
  const [excelData, setExcelData] = useState<ThirdParty[] | null>(null);

  // useEffect(() => {
  //   console.log("excelData:", excelData);
  // }, [excelData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.worksheets[0];
      console.log("🚀 ~ handleFileUpload ~ worksheet:", worksheet)
      const data: ThirdParty[] = [];
      
      
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        // Assuming the structure of your Excel matches the ThirdParty interface
        const thirdParty: ThirdParty = {
            id: 0,
            thirdPartyId: "",
            tiersType: `${row.getCell(21).value}`,
            title: `${row.getCell(22).value}`,
            lastName: `${row.getCell(11).value}`,
            firstName: `${row.getCell(9).value}`,
            companyName: `${row.getCell(6).value}`,
            birthDate: `${row.getCell(1).value}`,//
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
            supportingDocumentType: `${row.getCell(20).value}`,
            supportingDocumentNumber: `${row.getCell(19).value}`,
            supportingDocumentExpirationDate: `${row.getCell(18).value}`,
            maritalStatus: `${row.getCell(13).value}`,
            user: {
              id:parseInt(`${row.getCell(23).value}`)
            }
          };
          
          
        // console.log("🚀 ~ worksheet.eachRow ~ thirdParty:", thirdParty)
        
        data.push(thirdParty);
      });

      setExcelData(data);
    }
  };

  const insertManyThirdpartiesTest = async () => {
    if (!excelData) return; // Ensure data is available

    try {
      const createdThirdParties = await createMultipleThirdParties(excelData);
      console.log("Created third parties 💛💚:", createdThirdParties);
    } catch (error) {
      console.error("Failed to create third parties:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <Button onClick={insertManyThirdpartiesTest}>InsertManyThirdpartiesTest</Button>
      {excelData && (
        <table>
          <tbody>
            {excelData.map((thirdParty, index) => (
              <tr key={index}>
                <td>{thirdParty.thirdPartyId}</td>
                <td>{thirdParty.title}</td>
                <td>{thirdParty.lastName}</td>
                {/* Render other properties accordingly */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelReader;
