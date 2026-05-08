import { Box, Grid, Skeleton } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CreateIcon from "@mui/icons-material/Create";
import StatusCard from "./infoCards/StatusCard";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";
import GroupsIcon from "@mui/icons-material/Groups";
import { ComponentType, forwardRef, useContext, useEffect, useState } from "react";
import { getStatuses } from "src/utils/api/status/statusApiCall";
import { getFilteredCasesByStatusId } from "src/utils/api/case/caseApiCall";
import { CaseContext } from "src/contexts/CaseContext";
import { SvgIcon, SvgIconProps } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import SkeletonGrid from "./skeletons/SkeletonGrid";
import { UserContext } from "src/contexts/UserContext";


interface ExistingCasesProps {
  selectedStatusId: number;
  setSelectedStatusId: React.Dispatch<React.SetStateAction<number>>;

  searchkeyWord: string;
  setSearchkeyWord: React.Dispatch<React.SetStateAction<string>>;
}

export interface PageHeaderHandles {
  updateSelectedStatus: (id: number) => void;
}

const PageHeader = forwardRef<PageHeaderHandles, ExistingCasesProps>(
  ({
    selectedStatusId,
    setSelectedStatusId,
    setSearchkeyWord,
    searchkeyWord,
  }) => {
    //context states
    const { setCases } = useContext(CaseContext);
    const { currentUser } = useContext(UserContext);


    // const user = {
    //   name: 'Catherine Pike',
    //   avatar: '/static/images/avatars/1.jpg'
    // };

    // Define type for status object
    // type StatusType = {
    //   id: number;
    //   status: string;
    //   count: number;
    // };

    interface StatusType {
      id: number;
      status: string;
      count: number;
      Icon: ComponentType<{ fontSize?: "inherit" | "default" | "small" | "large" }>;
    IconColor:'red',
    }

    useEffect(() => {
      if (searchkeyWord) {
        setSearchkeyWord("");
      }
    }, [selectedStatusId]);

    useEffect(() => {
      if (selectedStatusId > 0) {
        // fetch the cases based on the selected status id and the user id
        const fetchData = async () => {
          try {
            const result = await getFilteredCasesByStatusId(selectedStatusId);
            setCases(result);
            console.log(result);
          } catch (error) {
            // Handle error
            console.error("Error fetching cases for user by statusid", error);
          }
        };

        fetchData();

        // update the existing cases
      }
    }, [selectedStatusId]);

    const [fetchedStatus, setFetchedStatus] = useState<StatusType[]>([]);

   
interface StatusType {
  id: number;
  status: string;
  count: number;
  Icon: SvgIconComponent;
  color: string;
}

const [status, setStatus] = useState<Record<string, StatusType>>({
  pre_douteux: {
    id: 1,
    status: "Prédouteux",
    count: 0,
    Icon: WarningIcon,
    color: "red",
  },
  douteux: {
    id: 2,
    status: "Douteux",
    count: 0,
    Icon: WarningIcon,
    color: "orange",
  },
  compromis: {
    id: 3,
    status: "Compromis",
    count: 0,
    Icon: CreateIcon,
    color: "blue",
  },
  contentieux: {
    id: 4,
    status: "Contentieux",
    count: 0,
    Icon: GroupsIcon,
    color: "green",
  },
  deces: {
    id: 5,
    status: "Décès",
    count: 0,
    Icon: CreateIcon,
    color: "purple",
  },
  invalidite: {
    id: 6,
    status: "Invalidité",
    count: 0,
    Icon: GroupsIcon,
    color: "teal",
  },
  termine: {
    id: 7,
    status: "Terminé",
    count: 0,
    Icon: CheckBoxIcon,
    color: "indigo",
  },
  radie: {
    id: 8,
    status: "Radié",
    count: 0,
    Icon: ClearIcon,
    color: "pink",
  },
});
    

    useEffect(() => {
      if (fetchedStatus?.length > 0) {
        const updatedStatus = { ...status };

        fetchedStatus.forEach((item) => {
          const key = Object.keys(status).find(
            (key) => status[key].id === item.id
          );

          // console.log("key",key)
          if (key) {
            updatedStatus[key].count = item.count;
          }
        });

        // Update the status state with the new counts
        setStatus(updatedStatus);
      }
    }, [fetchedStatus]);
 ////////
  const [statusDownloading,setStatusDownloading]=useState(true)
 ///////
    useEffect(() => {
      if(currentUser?.id<1){
        return;
      }
      const fetchDataStatuses = async () => {
        try {
          console.log("\n\n\nstart to fetch data fo status .....");
          const result = await getStatuses()
          setTimeout(() => {
            setStatusDownloading(false)
          }, 2000);
          setFetchedStatus(result);
          console.log(result);
        } catch (error) {
          // Handle error
          console.error("Error fetching status for user by userId:", error);
        }
      };

      fetchDataStatuses();
    }, [currentUser]);



    return (
      <Grid spacing={1} container justifyContent="center" alignItems="center">
        {statusDownloading?
             <SkeletonGrid />
        :<>
            
        {Object.values(status).map((statusItem) => (
          <Grid key={statusItem.id} item  md={3} sm={6} xs={12}>
            <Box>
              <StatusCard
                id={statusItem.id}
                setSelectedStatusId={setSelectedStatusId}
                selectedStatusId={selectedStatusId}
                Icon={statusItem.Icon} // Provide a default icon if not specified
                IconColor={statusItem.color || "primary"} // You may want to provide a default color
                text={statusItem.status}
                value={statusItem.count}
              />
            </Box>
          </Grid>
          
        ))}
        </>
      }
      </Grid>

    );

  
    
    
  }
  
);

export default PageHeader;
