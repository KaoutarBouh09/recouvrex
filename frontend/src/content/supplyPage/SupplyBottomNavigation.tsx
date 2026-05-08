import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Invoice from 'src/components/icons/Invoice';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { useNavigate } from "react-router-dom";


interface SupplyBottomNavigationProps {
  type: string;
}

export default function SupplyBottomNavigation({type}:SupplyBottomNavigationProps) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    switch (type){
      case "clients":
        setValue(0)
        break;
      case "credits":
        setValue(1)
        break;
      case "factures":
        setValue(2)
        break;
      default:
        setValue(3)   
          //  maybe later we add the case for cases and if non of them we return/navigate to 404
          // but of now its good
    }
  }, [type])
  

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log("🚀 ~ SupplyBottomNavigation ~ newValue:", newValue)
          
          setValue(newValue);
        }}
        sx={{background:'#F8FAFC'}}
      >
        <BottomNavigationAction onClick={()=>{navigate("/alimentation/clients");}} label="Les clients" icon={<PeopleIcon />} />
        <BottomNavigationAction onClick={()=>{navigate("/alimentation/credits");}} label="Les crédits" icon={<CreditCardIcon />} />
        <BottomNavigationAction onClick={()=>{navigate("/alimentation/factures");}} label="Les factures" icon={<Invoice />} />
        <BottomNavigationAction onClick={()=>{navigate("/alimentation/cases");}} label="Les cas" icon={<BusinessCenterIcon />} />
      </BottomNavigation>
    </Box>
  );
}
