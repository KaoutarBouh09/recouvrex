import React, { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Case } from "src/models/case";
import {
  getCasesByMultiFilters,
  getFilteredCasesByKeyWord,
} from "src/utils/api/case/caseApiCall";
import CasesSearch from "./filterCase/CasesSearch";
import CasesFilterPopUp from "./filterCase/CasesFilterPopUp";

const headCells = [
  {
    id: "caseID",
    numeric: false,
    disablePadding: false,
    label: "caseID",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "DATE",
  },
  {
    id: "client",
    numeric: false,
    disablePadding: false,
    label: "Client",
  },
  {
    id: "agent",
    numeric: false,
    disablePadding: false,
    label: "Agent",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "TOTAL",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {!(numSelected > 0) && <></>}
    </Toolbar>
  );
}

const applyPagination = (
  cases: Case[],
  page: number,
  limit: number
): Case[] => {
  return cases.slice(page * limit, page * limit + limit);
};
export default function CaseTable({
  casesSelected,
  setCasesSelected,
  setReloadData,
  reloadData,
}) {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState<Case[]>([]);

  const getCases = async () => {
    setReloadData(false);
    try {
      const data = await getFilteredCasesByKeyWord("", 0); //he will return cases by manager id
      setRows(data);
    } catch (error) {
      console.log("error fetching cases manager : ", error);
    }
  };
  useEffect(() => {
    getCases();
  }, [reloadData]);

  const paginatedCases = applyPagination(rows, page, rowsPerPage);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: Case) => n);
      setCasesSelected(newSelected);
      return;
    }
    setCasesSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, item: Case) => {
    const selectedIndex = casesSelected.indexOf(item);
    let newSelected: Case[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(casesSelected, item);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(casesSelected.slice(1));
    } else if (selectedIndex === casesSelected.length - 1) {
      newSelected = newSelected.concat(casesSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        casesSelected.slice(0, selectedIndex),
        casesSelected.slice(selectedIndex + 1)
      );
    }
    setCasesSelected(newSelected);
    console.log("✅Case selected : ", casesSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (item: Case) => casesSelected.indexOf(item) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  async function searchCasesByKeyWord(keyword: string) {
    console.log(keyword);
    setCasesSelected([]);
    try {
      const response = await getFilteredCasesByKeyWord(keyword, 0);
      console.log(response);
      setRows(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <CasesSearch
          searchCasesByKeyWord={searchCasesByKeyWord}
          setRows={setRows}
          setCasesSelected={setCasesSelected}
        />

        <EnhancedTableToolbar numSelected={casesSelected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={casesSelected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {paginatedCases.map((row: Case, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#e3e5e6", // Change this to the desired hover color
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell align="left">{row.caseId} </TableCell>
                    <TableCell align="left">{row.startDate}</TableCell>
                    <TableCell align="left">
                      {row.thirdParty.firstName + " " + row.thirdParty.lastName}
                    </TableCell>
                    <TableCell align="left">
                      {row.assignedAgent.firstName +
                        " " +
                        row.assignedAgent.lastName +
                        " "}
                      {row.assignedAgent.status == "ACTIVE" ? (
                        <span
                          title="ACTIVE"
                          style={{
                            display: "inline-block",
                            backgroundColor: "green",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></span>
                      ) : (
                        <span
                          title="INACTIVE"
                          style={{
                            display: "inline-block",
                            backgroundColor: "red",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></span>
                      )}
                    </TableCell>
                    <TableCell align="left">{row.status.status}</TableCell>
                    <TableCell align="left">{row.principalAmount}</TableCell>
                    {/* // FUNCTION THAT CALCULE TOTAL SHOULD BE ADD instead of call just principalAmount*/}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
