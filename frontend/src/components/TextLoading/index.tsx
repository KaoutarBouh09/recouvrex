import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const TextLoading = () => {
  return (
      <Stack sx={{ color: "white" }} spacing={1} direction="row">
          <CircularProgress size={24} sx={{color:"white"}} /> 
          <Stack>
          Chargement ...
          </Stack>
      </Stack>
     
  )
}
export default TextLoading