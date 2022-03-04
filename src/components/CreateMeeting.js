import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(undefined);
  const [invites, setInvites] = useState([]);

  const {getToken} = useContext(AuthContext);
  const storedToken = getToken();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("processing form...");

    const meetingDetails = {
      title,
      goal,
      description,
      start,
      invites,
    };


    axios
      .post(`${process.env.REACT_APP_API_URL}/meetings`, meetingDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/meetings");
      })
      .catch((err) => console.log("error creating new meeting", err));
  };

  return (
    <div className="CreateMeeting">
      <h1>New meeting</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title: 
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label> <br/>

        <label>
          Goal:
          <input
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label><br/>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label><br/>

        <label>
          Start:
          <input
            type="datetime-local"
            name="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label><br/>

        <label>
          Invites:
          <input
            type="text"
            name="invites"
            value={invites}
            onChange={(e) => setInvites(e.target.value)}
          />
        </label><br/>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
