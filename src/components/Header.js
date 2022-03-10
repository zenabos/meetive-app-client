import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { textAlign } from "@mui/system";

export default function Header() {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <Box>
      {user && (
        <AppBar position="fixed">
          <Toolbar>
            <img id="logo-header" src="/meetive-logo.png" alt="logo" />
            <Typography variant="h7" component="div" sx={{ flexGrow: 1, textAlign: "right"}}>
              Hi {user.name}!
            </Typography>
            <IconButton onClick={logOutUser} color="inherit" label="Logout">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
