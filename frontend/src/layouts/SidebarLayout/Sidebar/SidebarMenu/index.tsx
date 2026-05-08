import { useContext, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Invoice from "src/components/icons/Invoice";
import InvoiceIcon2 from "src/components/icons/InvoiceIcon2";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import SmartToyIcon from "@mui/icons-material/SmartToy"; // ✅ AJOUT

import {
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "src/contexts/SidebarContext";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import ExpandMore from "@mui/icons-material/ExpandMore";
import RecoveryIcon from "src/components/icons/RecoveryIcon";
import BarChartIcon from '@mui/icons-material/BarChart';
import { fontWeight } from "@mui/system";
import { UserContext } from "src/contexts/UserContext";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }

        .MuiButton-root  {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }

    .MuiListItemButton-root  {
      display: flex;
      color: ${theme.colors.alpha.trueWhite[70]};
      background-color: transparent;
      width: 100%;
      justify-content: flex-start;
      padding: ${theme.spacing(1, 1)};
      &:hover {
        background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.09)};
        color: ${theme.colors.alpha.trueWhite[100]};
    }  
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { currentUser, isRecoveryAgent } = useContext(UserContext);

  const [openAlimentation, setOpenAlimentation] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("openAlimentation") || "true")
  );
  const handleClickAlimentation = () => {
    const newState = !openAlimentation;
    setOpenAlimentation(newState);
    localStorage.setItem('openAlimentation', JSON.stringify(newState));
  };

  const [openClient, setOpenClient] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("openClient") || "true")
  );
  const handleClickOpenClient = () => {
    const newState = !openClient;
    setOpenClient(newState);
    localStorage.setItem('openClient', JSON.stringify(newState));
  };

  const [openFacturation, setOpenFacturation] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("openFacturation") || "true")
  );
  const handleClickOpenFacturation = () => {
    const newState = !openFacturation;
    setOpenFacturation(newState);
    localStorage.setItem('openFacturation', JSON.stringify(newState));
  };

  const [openSupervisor, setOpenSupervisor] = useState<boolean>(
    () => JSON.parse(localStorage.getItem("openSupervisor") || "true")
  );
  const handleClickOpenSupervisor = () => {
    const newState = !openSupervisor;
    setOpenSupervisor(newState);
    localStorage.setItem('openSupervisor', JSON.stringify(newState));
  };

  return (
    <>
      <MenuWrapper>
        {/* ── Dashboard ── */}
        <Button
          disableRipple
          component={RouterLink}
          to="/dashboard"
          startIcon={<BarChartIcon />}
          fullWidth
          sx={{ fontWeight: "bold", fontSize: 20, borderRadius: 0, justifyContent: "flex-start" }}
        >
          Dashboard
        </Button>

        {/* ✅ Conversations Chatbot */}
        <Button
          disableRipple
          component={RouterLink}
          to="/chatbot/conversations"
          onClick={closeSidebar}
          startIcon={<SmartToyIcon />}
          fullWidth
          sx={{ fontWeight: "bold", fontSize: 20, borderRadius: 0, justifyContent: "flex-start" }}
        >
          Conversations
        </Button>

        {/* ── ALIMENTATION (admin seulement) ── */}
        {currentUser?.profile?.id == 1 && (
          <SubMenuWrapper>
            <ListItemButton onClick={handleClickAlimentation}>
              <ListItemIcon>
                <PowerOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="ALIMENTATION" />
              {openAlimentation ? <ExpandMore /> : <KeyboardArrowRightSharpIcon />}
            </ListItemButton>
            <Collapse in={openAlimentation} timeout="auto" unmountOnExit>
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/alimentation/clients"
                      startIcon={<PeopleIcon />}
                    >
                      Les clients
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/alimentation/credits"
                      startIcon={<CreditCardIcon />}
                    >
                      Les credits
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/alimentation/factures"
                      startIcon={<Invoice />}
                    >
                      Les factures
                    </Button>
                  </ListItem>
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/alimentation/cases"
                      startIcon={<BusinessCenterIcon />}
                    >
                      Les cas
                    </Button>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </Collapse>
          </SubMenuWrapper>
        )}

        {/* ── FACTURATION ── */}
        <SubMenuWrapper>
          <ListItemButton onClick={handleClickOpenFacturation}>
            <ListItemIcon>
              <InvoiceIcon2 />
            </ListItemIcon>
            <ListItemText primary="FACTURATION" />
            {openFacturation ? <ExpandMore /> : <KeyboardArrowRightSharpIcon />}
          </ListItemButton>
          <Collapse in={openFacturation} timeout="auto" unmountOnExit>
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/cases"
                    startIcon={<RecoveryIcon />}
                  >
                    Recouvrements
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </Collapse>
        </SubMenuWrapper>

        {/* ── CLIENT (agent seulement) ── */}
        {isRecoveryAgent() && (
          <SubMenuWrapper>
            <ListItemButton onClick={handleClickOpenClient}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="CLIENT" />
              {openClient ? <ExpandMore /> : <KeyboardArrowRightSharpIcon />}
            </ListItemButton>
            <Collapse in={openClient} timeout="auto" unmountOnExit>
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/clients"
                      startIcon={<ManageAccountsIcon />}
                    >
                      Gestion du clients
                    </Button>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </Collapse>
          </SubMenuWrapper>
        )}

        {/* ── SUPERVISEUR ── */}
        {(currentUser?.profile?.id == 1 || currentUser?.profile?.id == 2) && (
          <SubMenuWrapper>
            <ListItemButton onClick={handleClickOpenSupervisor}>
              <ListItemIcon>
                <SupervisorAccountOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="SUPERVISEUR" />
              {openSupervisor ? <ExpandMore /> : <KeyboardArrowRightSharpIcon />}
            </ListItemButton>
            <Collapse in={openSupervisor} timeout="auto" unmountOnExit>
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <Button
                      disableRipple
                      component={RouterLink}
                      onClick={closeSidebar}
                      to="/supervisor/affectation"
                      startIcon={<ManageHistoryOutlinedIcon />}
                    >
                      Affectation des cases
                    </Button>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </Collapse>
          </SubMenuWrapper>
        )}

      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;