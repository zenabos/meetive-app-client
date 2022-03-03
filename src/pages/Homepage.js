import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Homepage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log(user)

  return (
    <div>
      {user && (
        <div>
          <p>Hi {user.name} !</p>
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
