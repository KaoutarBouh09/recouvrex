import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { getStatuses } from 'src/utils/api/status/statusApiCall';
import { bgcolor } from '@mui/system';
import { Typography } from '@mui/material';
import { UserContext } from 'src/contexts/UserContext';


const valueFormatter = (value: number | null) => `= ${value}`;

const chartSetting = {
  yAxis: [
    {
      label: 'nbr case',
    },
  ],
  series: [{ dataKey: 'count', label: 'Nombre de case', valueFormatter ,  color: '#5569FE', }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function NbrCasesByStatus() {
  const [dataset , SetDataset] = React.useState([]);


const getNbrCaseByStatus = async()=>{
        const data = await getStatuses();
        SetDataset(data); 
} 

React.useEffect(()=>{
  // if(currentUser?.id>0){
  //   console.log("call the fetch status")

  getNbrCaseByStatus();
  // }
},[])




  return (
    <div style={{ width: '100%' }}>
       <Typography variant='h4'>
          Nombre de Case par status
       </Typography>
      <BarChart
        dataset={dataset}
        xAxis={[
          { scaleType: 'band', dataKey: 'status' }
        ]}
        {...chartSetting}
        
      />
        
    </div>
  );
}