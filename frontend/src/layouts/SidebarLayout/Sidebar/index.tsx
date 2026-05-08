import { useContext } from "react";
import Scrollbar from "src/components/Scrollbar";
import { SidebarContext } from "src/contexts/SidebarContext";

import {
  Box,
  alpha,
  styled,
  Divider,
  useTheme,
  lighten,
  darken,
  Button,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
         width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle } = useContext(SidebarContext);
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: sidebarToggle ? "inline-block" : "none",
          left: 0,
          top: 0,
          background:
            theme.palette.mode === "dark"
              ? alpha(
                  lighten(theme.header.background ?? "#000", 0.1) ?? "#000",
                  0.5
                )
              : darken(theme.colors.alpha.black[100], 0.5),//this is where you may change the background for menu
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box p={2}>
          <Button
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="warning"
            size="small"
            fullWidth
          >
            Recouvrex
          </Button>
        </Box>
      </SidebarWrapper>
    </>
  );
}

export default Sidebar;
