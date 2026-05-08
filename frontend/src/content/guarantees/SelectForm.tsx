import { Button, Popover, Typography } from "@mui/material";
import { useRef, useState } from "react";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import VehicleGuaranteeForm from "./insertForms/VehicleGuaranteeForm";
import BusinessFundGuaranteeForm from "./insertForms/BusinessFundGuaranteeForm";
import MortgageGuaranteeForm from "./insertForms/MortgageGuaranteeForm";
import PersonalGuaranteeForm from "./insertForms/PersonalGuaranteeForm";
import RealEstateGuaranteeForm from "./insertForms/RealEstateGuaranteeForm";

const listFormes = [
  { id: 1, name: "Garanties Fonds de commerce" },
  { id: 2, name: "Garanties Hypothèque" },
  { id: 3, name: "Garanties Caution Personnelle" },
  { id: 4, name: "Garanties Bien immobilier" },
  { id: 5, name: "Garanties Véhiculaires" },
];

function SelectForm() {
  const ref = useRef<HTMLButtonElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenForm, setOpenForm] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<number>(0);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleListItemClick = (formId: number) => {
    setSelectedForm(formId);
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
        sx={{ mb: 1 }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
      >
        Ajouter
      </Button>
      {selectedForm === 1 && (
        <BusinessFundGuaranteeForm open={isOpenForm} setOpen={setOpenForm} />
      )}
      {selectedForm === 2 && (
        <MortgageGuaranteeForm open={isOpenForm} setOpen={setOpenForm} />
      )}
      {selectedForm === 3 && (
        <PersonalGuaranteeForm open={isOpenForm} setOpen={setOpenForm} />
      )}
      {selectedForm === 4 && (
        <RealEstateGuaranteeForm open={isOpenForm} setOpen={setOpenForm} />
      )}
      {selectedForm === 5 && (
        <VehicleGuaranteeForm open={isOpenForm} setOpen={setOpenForm} />
      )}
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
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
          Sélectionnez le type de garantie.
        </Typography>

        <List>
          {listFormes.map((formItem) => (
            <ListItem disableGutters key={formItem.id}>
              <ListItemButton onClick={() => handleListItemClick(formItem.id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <AddIcon />
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
