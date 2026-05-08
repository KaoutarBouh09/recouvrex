import { Alert, Button, Grid, Tooltip, Typography } from "@mui/material"
import { Box, Container, color } from "@mui/system"
import CaseTable  from "./CaseTable"
import UserTable  from "./UserTable"
import React, { useState } from "react"
import { Case } from "src/models/case"
import { User } from "src/models/User"
import { updateCaseUserId } from "src/utils/api/case/caseApiCall"
import SaveIcon from '@mui/icons-material/Save';
import SuccessProgressDialog from "./SuccessProgressDialog"
import WorkIcon from '@mui/icons-material/Work';
import Person3Icon from '@mui/icons-material/Person3';
const user:User = {
  id: 0,
  identificationNumber: "",
  userName: "",
  firstName: "",
  lastName: "",
  profile: null,
  manager: undefined,
  nbrCaseAffected: undefined,
  email: "",
  photo: ""
};

export const CaseAffectToUser = () => {

    const [casesSelected, setCasesSelected] = useState<Case[]>([]);
    const [usersSelected, setUsersSelected] = useState<User>();
    const [casesSelectedIsEmpty,setCasesSelectedIsEmpty]=useState<Boolean>();
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [updateCasesuccess,setUpdateCaseSuccess] = useState<Boolean>()
    const [reloadData,setReloadData] = useState<Boolean>()

    const updateCaseAssignedUser = async()=>{
        if(!(casesSelected.length>0 && usersSelected)){
            setCasesSelectedIsEmpty(true);
        }else{
            setCasesSelectedIsEmpty(false);
            setDialogOpen(true);
            console.log("user : ",usersSelected)
              const casesIds = casesSelected.map(item => item.id)
                 try {
                   await updateCaseUserId(casesIds,usersSelected?.id);
                       setLoading(false)
                       setTimeout(()=>{
                           setDialogOpen(false)
                       },1000)
                   setReloadData(true)
                   setUpdateCaseSuccess(true)
                   setCasesSelected([])
                   setUsersSelected(user)
                  // setIsAffectationSuccess(true);
                 } catch (error) {
                     console.log(error)
                     setUpdateCaseSuccess(false)
                 }
        }
         
            
    }

  return (
  <Grid container  spacing={1} marginBottom={10} style={{justifyContent:"center" , paddingInline:50}}>
      <Grid item xs={12} marginTop={2}>
          <Typography variant="h2" p={2}> Affecter / Réaffecter les Cases </Typography>
      </Grid>
      <Grid item xs={12}>
      <Box display="flex" alignItems="center" p={2}>
        <WorkIcon />
        <Typography variant="h4" ml={1}>
          Cocher les cases à affecter
        </Typography>
      </Box>
      <CaseTable casesSelected={casesSelected} setCasesSelected={setCasesSelected} setReloadData={setReloadData} reloadData = {reloadData}/>
    </Grid>
      <Grid item xs={12}>
          <Box display="flex" alignItems="center" p={2}>
        <Person3Icon />
        <Typography variant="h4" ml={1}>
        Choisir le collaborateur
        </Typography>
      </Box>
           <UserTable usersSelected={usersSelected} setUsersSelected={setUsersSelected} setReloadData={setReloadData} reloadData = {reloadData}/>
      </Grid>
      <Grid item xs={12}>
      <Box p={2} border="warning.main" borderRadius={2}>
        <Typography variant="h4">ℹ️ Informations importantes :</Typography>
        <Typography variant="h6" mt={2}>
          Si une case sélectionnée a déjà un utilisateur, la réaffectation de l'utilisateur sera effectuée.
        </Typography>
        <Typography variant="h6" mt={1}>
          Si vous faites une erreur d'affectation, il suffit de réaffecter la case.
        </Typography>
      </Box>
    </Grid>
      {casesSelectedIsEmpty&& <>
      <Grid  item xs={9} >
        <Alert variant="outlined" color="warning" >selectioner les cases à affecter et l'Agent </Alert>

        </Grid></>}
      <Grid item xs={4} display={"flex"} justifyContent={"end"}>

      <Button
      onClick={() => updateCaseAssignedUser()}
      variant="contained"
      fullWidth
      
      sx={{
        bgcolor: "#7c95de",
        height:"50px",
        fontSize:"20px",
        "&:hover": {
          bgcolor: "#4764ba"
        }
      }}
      startIcon={<SaveIcon />}
    >
      Appliquer l'affectation
    </Button>
      </Grid>
    <SuccessProgressDialog open={dialogOpen} onClose={()=>setDialogOpen(false)} loading={loading} updateCasesuccess={updateCasesuccess} />
  </Grid>
  )

}
