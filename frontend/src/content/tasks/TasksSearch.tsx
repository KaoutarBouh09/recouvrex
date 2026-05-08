import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";
import { getTasksByCaseId } from "src/utils/api/task/tasksApiCall";
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

interface TasksSearchProps {
  setRows: React.Dispatch<React.SetStateAction<Data[]>>;
  selectedCaseId: number;
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function TasksSearch({
  setRows,
  selectedCaseId,
  setAllTasks,
}: TasksSearchProps) {
  const [keyword, setKeyword] = React.useState("");

  async function handelSearchCaseTasksBykeyWord() {
    //call the function to do the search for tasks by the caseid and keyword
    try {
      const result = await getTasksByCaseId(selectedCaseId);
      setAllTasks(result);
      const updatedRows = result.map((task) =>
        createData(
          task.id,
          task.type,
          `${task.owner.userName}-${task.owner.profile.profile}`,
          task.createdOn,
          task.scheduledTo,
          `${task.taskObject}`,
          `${task.taskDescription}`,
          "",
          task.achievement
        )
      );
      console.log("\n\n\n\nupdatedRows from the the search compoent");
      console.log(updatedRows);
      setRows(updatedRows);
    } catch (error) {
      // Handle error
      console.error("Error fetching tasks by case id :", error);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 800,
        maxWidth: "100%",
        m: 1,
        pt: 0,
        mt: 0,
      }}
    >
      <TextField
        size="small"
        fullWidth
        placeholder="Tapez pour filtrer ou appuyez sur Entrée pour rechercher la base de données"
        id="fullWidth"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <Tooltip arrow title="Search">
        <IconButton
          onClick={() => {
            handelSearchCaseTasksBykeyWord();
          }}
          size="small"
          sx={{ ml: 0.2 }}
        >
          <SearchIcon fontSize="large" sx={{ color: "blue" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
