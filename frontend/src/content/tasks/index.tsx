import { Helmet } from "react-helmet-async";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Card,
  Tooltip,
  IconButton,
} from "@mui/material";
import TasksTable from "./TasksTable";
import TasksSearch from "./TasksSearch";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CaseContext } from "src/contexts/CaseContext";
import NewTask from "./NewTask";
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
function Tasks() {
  const { selectedCaseId = "" } = useParams();
  const { cases, selectedCase, setSelectedCase, fetchCases } =
    useContext(CaseContext);
  const [fetchTasks, setfetchTasks] = useState(false);

  const [rows, setRows] = useState<Data[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // Store the rows data in state

  useEffect(() => {
    if (selectedCaseId && cases.length > 0) {
      const selectedCase = cases.find((c) => c.caseId == selectedCaseId);
      if (selectedCase) {
        setSelectedCase(selectedCase);
      }
    } else if (cases.length == 0) {
      fetchCases();
      //if the fitch did not work its better to navigate
      // back to cases page
      //navigate("/cases");
    }
  }, [selectedCaseId]);

  useEffect(() => {
    if (selectedCaseId && cases.length > 0) {
      const selectedCase = cases.find((c) => c.caseId == selectedCaseId);
      if (selectedCase) {
        setSelectedCase(selectedCase);
      }
    }
  }, [cases]);

  return (
    <>
      <Helmet>
        <title>Taches</title>
      </Helmet>
      {/* <PageTitleWrapper>
        <PageHeader />there is not header for the task tell now
      </PageTitleWrapper> */}
      <Card>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Grid
            container
            // direction="row"
            // justifyContent="center"
            // alignItems="stretch"
            spacing={1}
          >
            <Grid
              item
              xs={12}
              sm={6}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" sx={{ mt: 1, ml: 1 }}>
                Tâches
              </Typography>
              <TasksSearch
                setRows={setRows}
                selectedCaseId={selectedCase ? selectedCase.id : 0}
                setAllTasks={setAllTasks}
              />
            </Grid>
            <Grid item sm={6} sx={{}}>
             
              <Stack
                sx={{
                   display:'flex',
                  alignItems: "center",
                  flexDirection:'row',
                  justifyContent: "end",
                  mr: 2,
                  mt:5,
                }}
              >
                <NewTask setfetchTasks={setfetchTasks} />
                <Tooltip arrow title="Rafraîchir">
                  <IconButton
                    onClick={() => {
                      setfetchTasks(true);
                    }}
                    size="small"
                    sx={{ ml: 0.2 }}
                  >
                    <AutorenewIcon fontSize="small" sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <TasksTable
                fetchTasks={fetchTasks}
                setfetchTasks={setfetchTasks}
                rows={rows}
                setRows={setRows}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
              />
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default Tasks;
