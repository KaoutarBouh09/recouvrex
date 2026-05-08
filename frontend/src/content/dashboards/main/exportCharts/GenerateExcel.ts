// // src/GenerateExcel.ts
// import * as XLSX from 'xlsx';
// import { UserContext } from 'src/contexts/UserContext';
// import { getCurrentDate } from 'src/utils/formatDate/CurrentDateTime';


// export const GenerateExcel = (input, currentUser) => {
//   if (!charts || charts.length === 0) return;

//   // Create a new workbook
//   const workbook = XLSX.utils.book_new();

//   charts.forEach((chart, index) => {
//     // Assume each chart has a title and data array
//     const chartTitle = chart.title || `Chart ${index + 1}`;
//     const data: any[][] = chart.data;

//     // Add a worksheet with the chart data
//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(workbook, worksheet, chartTitle);
//   });

//   // Add metadata
//   const date = new Date().toLocaleDateString();
//   const title = "RAPPORT DU RECOUVREX 2024";
//   const user = `Généré par: ${currentUser.userName}`;
//   const header = [[title], [`Date: ${date}`], [user], []]; // Add space between header and table

//   // Add the metadata to the first worksheet
//   if (workbook.SheetNames.length > 0) {
//     const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//     XLSX.utils.sheet_add_aoa(firstSheet, header, { origin: 'A1' });
//   }

//   // Save the workbook
//   const filename = `RapportRecouvrex-${getCurrentDate()}.xlsx`;
//   XLSX.writeFile(workbook, filename);
// };
