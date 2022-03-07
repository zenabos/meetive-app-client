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

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const navigate = useNavigate();

  const handleInputs = (event, index) => {
    let data = [...invites];
    data[index] = event.target.value;
    setInvites(data);
  };

  const addFields = (e) => {
    e.preventDefault();
    setInvites([...invites, ""]);
  };

  const removeFields = (event, index) => {
    let data = [...invites];
    data.splice(index, 1);
    setInvites(data);
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("processing form...");

    const meetingDetails = {
      title,
      goal,
      description,
      start,
      invites: invites,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/meetings`, meetingDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data._id);
        navigate(`/meetings/${response.data._id}`);
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
        </label>{" "}
        <br />
        <label>
          Goal:
          <input
            type="text"
            name="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Start:
          <input
            type="datetime-local"
            name="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <div className="Invites">
          Invites:
          {invites.map((invite, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  name="email"
                  placeholder="zena@test.com"
                  onChange={(event) => handleInputs(event, index)}
                  value={invite.email}
                />
                <button onClick={(event) => removeFields(event, index)}>
                  Delete
                </button>
              </div>
            );
          })}
          <button onClick={addFields}>Add Invite</button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
