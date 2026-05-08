import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";

export interface StatusCardProps {
  sx?: SxProps;
  value: number;
  id: number;
  text: string; // New prop for the text
  Icon?: SvgIconComponent; // New prop for the icon, optional if you want to keep WarningIcon as a default
  IconColor?: string;
}

export default function StatusCard({
  value,
  text,
  Icon = WarningIcon, // Set a default icon if Icon is not provided
  IconColor = "inherit", // Set a default icon color if IconColor is not provided
  sx,
  id
}: StatusCardProps): React.JSX.Element {


  
  return (
    <Box
      sx={{ m: 0.3}}
    >
      <Card sx={sx}>
        <Box  sx={{ 
        border: '1px solid transparent', 
        borderRadius: 1, 
        '&:hover': {
          borderColor: '#dedcdc', 
        },
      }}>
        <CardContent>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack>
              <Typography color="text.secondary" variant="h5">
                {text} 
              </Typography>
              {id==3 ?  <Typography variant="h3">{value} % </Typography>
               :  <Typography variant="h3">{value} </Typography>}
             
            </Stack>
            <Stack sx={{ background: "" }}>
              <Icon sx={{ fontSize:  30, color: IconColor }} />
            </Stack>
          </Stack>
        </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
