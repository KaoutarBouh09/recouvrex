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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import Radio from "@mui/material/Radio";

import { User } from "src/models/User";
import { getNbrCaseByUser, getUserByManagerId } from "src/utils/api/user/userApi";
import ClientSearch from "./filterUser/UsersSearch";
import UserSearch from "./filterUser/UsersSearch";
import { Avatar } from "@mui/material";

const headCells = [
  {
    id: "userID",
    numeric: false,
    disablePadding: false,
    label: "userID",
  },
  {
    id: "nom",
    numeric: false,
    disablePadding: false,
    label: "Nom",
  },
  {
    id: "nbrcase",
    numeric: true,
    disablePadding: false,
    label: "Nombre de case déjà affectées",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "photo",
    numeric: false,
    disablePadding: false,
    label: "Photo",
  }
];

interface EnhancedTableProps {
  numSelected: number;
  // rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { numSelected } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
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
      {!(numSelected > 0) && (
      <></>
      )}
    </Toolbar>
  );
}

const applyPagination = (
  users: User[],
  page: number,
  limit: number
): User[] => {
  return users.slice(page * limit, page * limit + limit);
};

export default function UserTable({ usersSelected, setUsersSelected , setReloadData ,reloadData }) {
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState<User[]>([]);

  const defaultImage =
  "https://res.cloudinary.com/dm9udoven/image/upload/v1716625891/recouvrex_photos/defaultPhoto_ftvpzr.jpg";


  const getUsers = async () => {
     
    try {
      const data = await getUserByManagerId();
      setRows(data);
      console.log("users in Tbale : ",data)
    } catch (error) {
      console.log("Error fetching users manager: ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [reloadData]);

/////////////////////////////////////
   
const countNbrCaseForUser= async(id : number)=>{
  try {
    const data   =  await getNbrCaseByUser(id);
   // return data;
     console.log(data)
     return data
  } catch (error) {
     console.log("count cases by user : ",error)
  }
      
}

//////////////////////////////////////




  const paginatedUsers = applyPagination(rows, page, rowsPerPage);

  const handleClick = (event: React.MouseEvent<unknown>, item: User) => {
    setUsersSelected(item);
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

  const isSelected = (item: User) => usersSelected?.id === item.id;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>

        <UserSearch setRows={setRows} rows={rows}/>

        <EnhancedTableToolbar numSelected={usersSelected ? 1 : 0} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead numSelected={usersSelected ? 1 : 0} />
            <TableBody>
              {paginatedUsers.map((row: User) => {
                const isItemSelected = isSelected(row);
                 console.log("row user : ",(row.nbrCaseAffected))
                return (
                  <TableRow
                  
                  onClick={(event) => handleClick(event, row)}
                  role="radio"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                  sx={{
                    cursor: "pointer",
                    '&:hover': {
                      backgroundColor: '#e3e5e6', // Change this to the desired hover color
                    },
                  }}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        color="primary"
                        checked={isItemSelected}
                      />
                    </TableCell>
                    <TableCell align="left">{row.identificationNumber}</TableCell>
                    <TableCell align="left">{row.userName}</TableCell>
                    <TableCell align="center" >{row.nbrCaseAffected}</TableCell>
                    <TableCell align="left" >{row.email}</TableCell>
                    <TableCell align="left" >
                    <Avatar
                         variant="rounded"
                         alt={"user photo"}
                         src={row.photo ?? defaultImage}
                       />
                    </TableCell>
                    
                   
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
