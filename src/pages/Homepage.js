import { useContext } from "react";
import { Link } from "react-router-dom";
import MeetingsList from "../components/MeetingsList";
import { AuthContext } from "../context/auth.context";

import * as React from "react";
import Button from "@mui/material/Button";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <div>
          <p>Hi {user.name} !</p>

          <MeetingsList maxNumber={3} />
          <Button variant="outlined" href="/meetings/my-meetings">
            My Meetings
          </Button>
          <Button variant="outlined" href="/meetings/invitations">
            My invitations
          </Button>
        </div>
      )}

      {!user && (
        <div>
          <h1>Meetive </h1>
          <h2>meet effective</h2>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}
