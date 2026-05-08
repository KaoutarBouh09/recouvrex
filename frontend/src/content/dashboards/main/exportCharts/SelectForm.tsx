import { Button, Popover, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image'; // Assuming you have an icon for JPG
import { GeneratePDF } from "./GeneratePDF";
import { UserContext } from "src/contexts/UserContext";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
//import { GenerateExcel } from "./GenerateExcel";


const listFormes = [
  { id: 1, name: "PDF" , icon: PictureAsPdfIcon  },
  { id: 2, name: "Excel", icon: ImageIcon  },
  // { id: 3, name: "JPG" , icon: AddIcon  },
  // { id: 4, name: "Word" , icon: PictureAsPdfIcon  },
  // { id: 5, name: "XML" , icon: AddTwoToneIcon },
];

function SelectForm() {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleListItemClick = (formId: number) => {
       if(formId===1){
       GeneratePDF(document.getElementById('allCharts'),currentUser)
       }
       if(formId===2){
     //   GenerateExcel(document.getElementById('allCharts'),currentUser)
        }
    setOpenForm(true);
    handleClose();
  };

  return (
    <>
      <Button
        ref={ref}
        onClick={handleOpen}
        size="small"
        rel="noopener noreferrer"
        sx={{ m: 1 }}
        variant="contained"
        startIcon={<SystemUpdateAltIcon fontSize="small" />}
      >
        Exporter
      </Button>
     
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          variant="h4"
          sx={{ m: 2, mb: 0, pb: 0, maxWidth: 200 }}
          gutterBottom
        >
          Exporter en tanq que : 
        </Typography>

        <List>
          {listFormes.map((formItem) => (
            <ListItem disableGutters key={formItem.id}>
              <ListItemButton onClick={() => handleListItemClick(formItem.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  {<formItem.icon/>}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={formItem.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default SelectForm;
