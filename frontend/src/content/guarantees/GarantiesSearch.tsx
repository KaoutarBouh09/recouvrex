import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Tooltip } from "@mui/material";

export default function GarantiesSearch() {
  const [keyword, setKeyword] = React.useState("");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 800,
        maxWidth: "100%",
        m: 1,
        pt: 0,
        mt: 0,
      }}
    >
      <TextField
        size="small"
        fullWidth
        placeholder="Tapez pour filtrer ou appuyez sur Entrée pour rechercher la base de données"
        id="fullWidth"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <Tooltip arrow title="Search">
        <IconButton
          size="small"
          sx={{ ml: 0.2 }}
        >
          <SearchIcon fontSize="large" sx={{ color: "blue" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
