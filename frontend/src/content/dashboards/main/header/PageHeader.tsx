import { Box, Grid, Skeleton } from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import SkeletonGrid from "src/content/Cases/skeletons/SkeletonGrid";

///////////////////////////
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import StatusCard from "./StatusCard";
import { GetNumberOfCasesForUser, caseAmountTotalByStatus } from "src/utils/api/case/caseApiCall";
import { countNbrThirdPartyByUser } from "src/utils/api/client/ClientApi";
import SelectForm from "../exportCharts/SelectForm";

//////////////////////////////
interface StatusType {
  id: number;
  status: string;
  count: number;
  Icon: SvgIconComponent;
  color: string;
}

const PageHeader = ({percentageAmountRecovred}) => {
  //context states

  const [nbrTotalCase, setNbrTotalCase] = useState(0);
  const [nbrTotalClients, setNbrTotalClients] = useState(0);
  const [totalAmountRecupered, setTotalAmountRecupered] = useState(0);

  const numberOfCasesForUser = async () => {
    const data = await GetNumberOfCasesForUser();
    setNbrTotalCase(data);
  };

  const getCountNbrThirdPartyByUser = async () => {
    const data = await countNbrThirdPartyByUser();
    setNbrTotalClients(data);
  };
  const getCaseAmountTotalByStatus = async () => {
    const data = await caseAmountTotalByStatus("Terminé");
    setTotalAmountRecupered(data);
  };
  useEffect(() => {
    console.log("fffff")
    numberOfCasesForUser();
    getCountNbrThirdPartyByUser();
    getCaseAmountTotalByStatus()
  
  }, []);

  const status: Record<string, StatusType> = {
    nbrTotalCases: {
      id: 1,
      status: "Nombre total des cases ",
      count: nbrTotalCase ,
      Icon: WorkIcon,
      color: "black",

      // IconColor: "red"
    },
    MontantTotalRecupere: {
      id: 2,
      status: "Montant total Récuperé en DH",
      count: totalAmountRecupered,
      Icon: AttachMoneyIcon,
      color: "orange",
    },
    PourcentageRecuperation: {
      id: 3,
      status: "Pourcentage de récuperation % ",
      count: percentageAmountRecovred,
      Icon: PercentIcon,
      color: "blue",
    },
    NbrClients: {
      id: 4,
      status: "Nombre clients",
      count: nbrTotalClients,
      Icon: GroupsIcon,
      color: "green",
    },
  };

  return (
    <Grid spacing={1} container justifyContent="center" alignItems="center">
      {false ? (
        <SkeletonGrid />
      ) : (
        <>
      
          {Object.values(status).map((statusItem) => (
            <Grid key={statusItem.id} item md={3} sm={6} xs={12}>
              <Box>
                <StatusCard
                  id={statusItem.id}
                  Icon={statusItem.Icon} // Provide a default icon if not specified
                  IconColor={statusItem.color || "primary"} // You may want to provide a default color
                  text={statusItem.status}
                  value={statusItem.count}
                />
                
              </Box>
         
            </Grid>
          ))}
         
        </>
      )}
         
    </Grid>
  );
};

export default PageHeader;
