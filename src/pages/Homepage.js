import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MeetingsList from "../components/MeetingsList";
import { AuthContext } from "../context/auth.context";

export default function Homepage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && (
        <div>
          <p>Hi {user.name} !</p>

          <MeetingsList maxNumber={3} />

          <Link to="/meetings/my-meetings">
            <button>My meetings</button>
          </Link>
          <Link to="/meetings/invitations">
            <button>My invites</button>
          </Link>
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
