import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";

export default function Header() {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
          Meet effective
        </Typography>
        {user && (
          <IconButton
            onClick={logOutUser}
            color="inherit"
            aria-haspopup="true"
            label="Logout"
          >
            <AccountCircleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
