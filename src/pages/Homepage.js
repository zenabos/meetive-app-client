import { useContext } from "react";
import MeetingsList from "../components/MeetingsList";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      {user && (
        <Container>

            <MeetingsList maxNumber={3} />

          <Grid container spacing={3} justifyContent="center" sx={{mt: 3}}>
            <Grid item xs={12}>
              <Button component={Link} to="/meetings/my-meetings" fullWidth variant="contained" href="/meetings/my-meetings">
                My Meetings
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button component={Link} to="/meetings/invitations" fullWidth variant="contained">
                My invitations
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}

      {!user && (
        <Container sx={{mt:20}}>
        <img id="logo-home" src="/meetive-logo.png" alt="logo"/>
        <Divider sx={{mt: 1, mb: 1}}/>
        <Typography component="h1" variant="h4">
          meet effective
        </Typography>

          <Grid container justifyContent="center" spacing={2} sx={{mt: 4}} >
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" href="/signup">
                Sign up
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" href="/login">
                Log in
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
    </Container>
  );
}
