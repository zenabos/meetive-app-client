import { useContext } from "react";
import MeetingsList from "../components/MeetingsList";
import { AuthContext } from "../context/auth.context";
// import logo from "./meetive-logo.jpg";
import * as React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Container, Grid } from "@mui/material";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      {user && (
        <div>
          <p>Hi {user.name} !</p>

          <Box>
            <MeetingsList maxNumber={3} />
          </Box>
          <Button variant="outlined" href="/meetings/my-meetings">
            My Meetings
          </Button>
          <Button variant="outlined" href="/meetings/invitations">
            My invitations
          </Button>
        </div>
      )}

      {!user && (
        <Box>
          {/* <img src={logo} alt="logo"/> */}
          <h1>meet effective</h1>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4}>
              <Button fullWidth variant="outlined" href="/signup">
                Sign up
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" href="/login">
                Log in
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
