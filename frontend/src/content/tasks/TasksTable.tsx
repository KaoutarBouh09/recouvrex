import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "@mui/material";
import { deleteTasks, getTasksByCaseId } from "src/utils/api/task/tasksApiCall";
import TaskType from "./TaskType";
import ConfirmDelete from "src/components/Dialog/ConfirmDelete";
import Achievement from "./Achievement";
import { CaseContext } from "src/contexts/CaseContext";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import UpdateTask from "./UpdateTask";
import { Task } from "src/models/task";

interface Data {
  id: number;
  type: string;
  createdBy: string;
  createdDate: string;
  scheduledTo: string;
  object: string;
  description: string;
  owner: string;
  achievement: number;
}

function createData(
  id: number,
  type: string,
  createdBy: string,
  createdDate: string,
  scheduledTo: string,
  object: string,
  description: string,
  owner: string,
  achievement: number
): Data {
  return {
    id,
    type,
    createdBy,
    createdDate,
    scheduledTo,
    object,
    description,
    owner,
    achievement,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "createdBy",
    numeric: true,
    disablePadding: false,
    label: "CRÉÉ PAR",
  },
  {
    id: "createdDate",
    numeric: true,
    disablePadding: false,
    label: "date de création",
  },
  {
    id: "scheduledTo",
    numeric: true,
    disablePadding: false,
    label: "planifié",
  },
  {
    id: "object",
    numeric: true,
    disablePadding: false,
    label: "objet",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "owner",
    numeric: true,
    disablePadding: false,
    label: "propriétaire ",
  },
  {
    id: "achievement",
    numeric: true,
    disablePadding: false,
    label: "achèvement ",
  },
  // {
  //   id: "operations",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Operations",
  // },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

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
        {/* this is the head cells */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
            <Box sx={{ mr: 0.5 }}>{headCell.label}</Box>
            {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteTasks: () => void;
  setfetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleDeleteTasks, setfetchTasks, selectedTask } = props;
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  React.useEffect(() => {
    if (confirmDelete === true) {
      handleDeleteTasks();
      setConfirmDelete(false);
    }
  }, [confirmDelete, setConfirmDelete]);

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
        >
          {/* Nutrition */}
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          {numSelected == 1 && (
            <UpdateTask
              setfetchTasks={setfetchTasks}
              selectedTask={selectedTask}
            />
          )}
          <ConfirmDelete setConfirmDelete={setConfirmDelete} />
        </>
      ) : (
        <>
          {/* <Tooltip title="Filter list">
           <IconButton>
             <FilterListIcon />
           </IconButton>
         </Tooltip> */}
        </>
      )}
    </Toolbar>
  );
}

interface TasksTableProps {
  fetchTasks: boolean;
  setfetchTasks: React.Dispatch<React.SetStateAction<boolean>>;
  rows: Data[];
  setRows: React.Dispatch<React.SetStateAction<Data[]>>;
  allTasks: Task[];
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export default function TasksTable({
  fetchTasks,
  setfetchTasks,
  rows,
  setRows,
  allTasks,
  setAllTasks,
}: TasksTableProps) {
  const { selectedCase } = React.useContext(CaseContext);
  const selectedCaseId = selectedCase ? selectedCase.id : 0;

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("type");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [selectedTask, setSelectedTask] = React.useState<Task>();

  // const [rows, setRows] = React.useState<Data[]>([]); // Store the rows data in state
  // const [allTasks, setAllTasks] = React.useState<Task[]>([]); // Store the rows data in state

  React.useEffect(() => {
    if (selected.length === 1) {
      const _selectedTask: Task | undefined = allTasks.find(
        (t) => t.id == selected[0]
      );
      if (_selectedTask) {
        setSelectedTask(_selectedTask);
      }
    }
  }, [selected]);

  // Update rows data when fetchTasks is true
  React.useEffect(() => {
    if (fetchTasks) {
      fetchTasksData();
    }
  }, [fetchTasks, setfetchTasks]);

  React.useEffect(() => {
    fetchTasksData();
  }, [selectedCase]);

  const formatTime = (inputTime: string | Date) => {
    // Create a new Date scheduledTo from the inputTime string
    const date = new Date(inputTime);
    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // January is 0
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // Format the date and time
    const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedTime;
  };

  const fetchTasksData = async () => {
    try {
      const result = await getTasksByCaseId(selectedCaseId);
      setAllTasks(result);
      const updatedRows = result.map((task) =>
        createData(
          task.id,
          task.type,
          // `${task.owner.userName}-${task.owner.profile.profile}`,
          `${task.createdBy.email} (${task.createdBy.profile.profile})`,
          task.createdOn,
          task.scheduledTo,
          `${task.taskObject}`,
          `${task.taskDescription}`,   
          `${task.owner.email} (${task.owner.profile.profile})`,

          task.achievement
        )
      );
      setRows(updatedRows);
      setfetchTasks(false); // Reset fetchTasks after updating rows
    } catch (error) {
      // Handle error
      console.error("Error fetching tasks by case id :", error);
    }
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleDeleteTasks = async () => {
    if (selected.length > 0) {
      try {
        await deleteTasks(selected);
        console.log("Tasks successfully deleted");
        // Remove deleted tasks from the rows state
        const updatedRows = rows.filter((row) => !selected.includes(row.id));
        setRows(updatedRows);
        setSelected([]); // Clear selection after deletion
        setfetchTasks(true); // Optionally re-fetch tasks or update UI based on your needs
      } catch (error) {
        console.error("Failed to delete tasks:", error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDeleteTasks={handleDeleteTasks}
          selectedTask={selectedTask}
          setfetchTasks={setfetchTasks}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
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
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <TaskType type={row.type} />
                    </TableCell>
                    {/* other celles */}
                    <TableCell sx={{ p: 0 }}>{row.createdBy}</TableCell>
                    <TableCell sx={{ p: 0 }}>{row.createdDate}</TableCell>
                    <TableCell sx={{ p: 0 }}>{row.scheduledTo}</TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Link>{row.object}</Link>
                    </TableCell>
                    <TableCell sx={{ p: 0 }}>{row.description}</TableCell>
                    <TableCell sx={{ p: 0 }}>{row.owner}</TableCell>
                    <TableCell sx={{ p: 0 }}>
                      <Achievement value={row.achievement} />
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
        {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
