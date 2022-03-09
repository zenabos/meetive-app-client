import { NavLink } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import { AddCircleRounded } from "@mui/icons-material";


export default function NavBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);


  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction component={NavLink} to="/" label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction component={NavLink} to="/meetings/my-meetings" label="Meetings" icon={<FavoriteIcon />} />
          <BottomNavigationAction component={NavLink} to="/meetings/invitations" label="Invitations" icon={<EmailIcon />} />
          <BottomNavigationAction component={NavLink} to="/meetings/create" label="Add meeting" icon={<AddCircleRounded />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}