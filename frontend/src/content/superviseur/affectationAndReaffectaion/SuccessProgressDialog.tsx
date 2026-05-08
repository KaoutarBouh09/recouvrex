import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';



const SuccessProgressDialog = ({ open, onClose , loading , updateCasesuccess}) => {
 

//   useEffect(() => {
//     if (open) {
//       // Simulate a loading process
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 3000); // Adjust the time as needed

//       return () => clearTimeout(timer);
//     }
//   }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          minWidth="400px"
        >
          {loading ? (
            <CircularProgress />
          ) : !updateCasesuccess? 
          <>
          <ErrorIcon style={{ fontSize: 60, color: 'red' }} />
          <Typography variant="h6" align="center">
            Modification échouée. Veuillez réessayer ultérieurement.
          </Typography>
        </>
        : (
            <>
              <CheckCircleIcon style={{ fontSize: 60, color: 'green' }} />
              <Typography variant="h6" align="center">
                Modification avec succés!
              </Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessProgressDialog;
