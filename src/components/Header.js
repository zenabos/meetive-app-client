import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import { Toolbar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";

export default function Header() {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logOut = () => {
    logOutUser();
    navigate("/");
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      {user && (
        <AppBar position="fixed">
          <Grid container display="flex" flexDirection="row" alignItems= "center">
            <Grid item xs={7}>
              <Link to="/">
                <img
                  id="logo-header"
                  src="/meetive-logo-white.png"
                  alt="logo"
                />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h7"
                component="div"
                sx={{ flexGrow: 1, textAlign: "right" }}
              >
                Hi {user.name}!
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                color="inherit"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleOpen}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </AppBar>
      )}
    </Box>
  );
}
