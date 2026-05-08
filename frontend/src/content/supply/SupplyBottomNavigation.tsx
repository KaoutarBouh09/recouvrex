import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Invoice from 'src/components/icons/Invoice';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


interface SupplyBottomNavigationProps {
  setSelectedForm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SupplyBottomNavigation({setSelectedForm}:SupplyBottomNavigationProps) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      > 
        <BottomNavigationAction onClick={()=>{setSelectedForm("clients")}} label="Les clients" icon={<PeopleIcon />} />
        <BottomNavigationAction onClick={()=>{setSelectedForm("credits")}} label="Les crédits" icon={<CreditCardIcon />} />
        <BottomNavigationAction onClick={()=>{setSelectedForm("invoices")}} label="Les factures" icon={<Invoice />} />
        <BottomNavigationAction onClick={()=>{setSelectedForm("cases")}} label="Les cas" icon={<BusinessCenterIcon />} />
      </BottomNavigation>
    </Box>
  );
}
