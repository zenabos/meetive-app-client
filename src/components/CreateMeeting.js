import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../context/auth.context";

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(undefined);
  const [startTime, setStartTime] = useState(undefined);
  const [invites, setInvites] = useState([]);

  const {getToken, user} = useContext(AuthContext);
  const storedToken = getToken();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("processing form...");

    const meetingDetails = {
      title,
      goal,
      description,
      date,
      startTime,
      invites,
      owner: user._id
    };


    axios
      .post(`${process.env.REACT_APP_API_URL}/meetings`, meetingDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/meetings");
      })
      .catch((err) => console.log("error creating new project", err));
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
        </label>

        <label>
          Goal:
          <textarea
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label>

        <label>
          Description:
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Date:
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </label>

        <label>
          Start:
          <textarea
            type="time"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label>
          Invites:
          <textarea
            type="text"
            name="invites"
            value={invites}
            onChange={(e) => setInvites(e.target.value)}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
