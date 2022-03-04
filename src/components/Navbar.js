import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function NavBar() {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/meetings">My meetings</NavLink>
      <NavLink to="/meetings/create">New Meeting</NavLink>
      {user && <button onClick={logOutUser}>Logout</button>}
    </div>
  );
}
