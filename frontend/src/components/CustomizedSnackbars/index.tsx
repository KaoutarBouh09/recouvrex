import * as React from 'react';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarOptions } from './SnackbarOptions';
import { Alert } from '@mui/material';


interface CustomizedSnackbarsProps {
  options: SnackbarOptions;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CustomizedSnackbars({ options,open,setOpen }: CustomizedSnackbarsProps) {

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={options.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {options.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
