import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteMeeting(props) {
  const { meetingId } = props;

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();
  const navigate = useNavigate();


  const deleteMeeting = (e) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate('/meetings');
    })
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  };

  return <button onClick={deleteMeeting}>Delete</button>;
}
