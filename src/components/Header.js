import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <Box>
      {user && (
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/">
              <img id="logo-header" src="/meetive-logo-white.png" alt="logo" />
            </Link>
            <Typography
              variant="h7"
              component="div"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              Hi {user.name}!
            </Typography>
            <IconButton onClick={logOut} color="inherit" label="Logout">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}
