import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/meetings">My meetings</NavLink> |
      <NavLink to="/meetings/create">New Meeting</NavLink>
    </div>
  );
}
