import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import moment from 'moment';

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [invites, setInvites] = useState([]);
  const { getToken } = useContext(AuthContext);
  const [start, setStart] = useState(null);

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
        console.log(response.data);
        console.log(response.data._id);
        navigate(`/meetings/${response.data._id}`);
      })
      .catch((err) => console.log("error creating new meeting", err));
  };

  return (
    <Box className="CreateMeeting">
      <h1>New meeting</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-name"
          label="Goal"
          variant="outlined"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start"
            value={start}
            onChange={(newValue) => {
              setStart(newValue);
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box className="Invites">
        Invites:
        {invites.map((invite, index) => {
          return (
            <Box key={index}>
              <TextField
                id="outlined-name"
                label="Email"
                variant="outlined"
                value={invite}
                onChange={(event) => handleInputs(event, index)}
              />
              <IconButton
                onClick={(event) => removeFields(event, index)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
        <Button onClick={addFields} variant="outlined">
          Add Invite
        </Button>
      </Box>
      <Button onClick={handleSubmit} variant="outlined">
        Save
      </Button>
    </Box>
  );
}
