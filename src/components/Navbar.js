import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function NavBar() {
  const { logOutUser } = useContext(AuthContext);

  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/meetings">My meetings</NavLink> |
      <NavLink to="/meetings/create">New Meeting</NavLink>
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}
