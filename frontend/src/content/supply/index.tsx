import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
// import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SupplyBottomNavigation from "./SupplyBottomNavigation";
import CasesForm from "./forms/CasesForm";
import ClientsForm from "./forms/ClientsForm";
import CreditsFrom from "./forms/CreditsFrom";
import InvoicesForm from "./forms/InvoicesForm";
// import Test from "./Test";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Supply() {
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = React.useState("clients");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* if you uncoment this button it will apear in the cases page */}
      {/* <Button
        onClick={handleClickOpen}
        size="medium"
        rel="noopener noreferrer"
        sx={{ mb: 1 }}
        variant="outlined"
        startIcon={<AddTwoToneIcon fontSize="small" />}
      >
        Alimentation
      </Button> */}
      <Dialog
        PaperProps={{ sx: { maxWidth: "none" } }}
        // sx={{background:'red'}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <SupplyBottomNavigation setSelectedForm={setSelectedForm} />

        <DialogTitle>
          {"Validation et intégration des nouvelles données alimentaires:"}
        </DialogTitle>
        <DialogContent
        >
          {/* <Test/> */}
          {selectedForm == "cases" && <CasesForm />}
          {selectedForm == "clients" && <ClientsForm />}
          {selectedForm == "credits" && <CreditsFrom />}
          {selectedForm == "invoices" && <InvoicesForm />}
        </DialogContent>
        <DialogActions
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
