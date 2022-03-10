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
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid } from "@mui/material";

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [invites, setInvites] = useState([]);
  const [start, setStart] = useState(null);

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
      start: start,
      invites: invites,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/meetings`, meetingDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/meetings/${response.data._id}`);
      })
      .catch((err) => console.log("error creating new meeting", err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>New Meeting</h1>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                label="Title"
                variant="outlined"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                multiline
                maxRows={3}
                sx={{ mt: 1 }}
                required
                label="Goal"
                variant="outlined"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />{" "}
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      sx={{ mt: 1 }}
                      fullWidth
                      size="small"
                      {...props}
                    />
                  )}
                  label="Start"
                  value={start}
                  required
                  onChange={(newValue) => {
                    setStart(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container textAlign="left" sx={{ mt: 2 }} alignItems="center">
            <Grid item xs={5}>
              <h2>Add invites</h2>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={addFields} color="primary">
                <AddCircleIcon />
              </IconButton>
            </Grid>
          </Grid>
          {invites.map((invite, index) => {
            return (
              <Grid
                container
                item
                key={index}
                sx={{ mt: 1 }}
                alignItems="center"
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    label="Email"
                    variant="outlined"
                    value={invite}
                    onChange={(event) => handleInputs(event, index)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={(event) => removeFields(event, index)}
                          color="secondary"
                        >
                          <CancelOutlinedIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            );
          })}
          <Button
            sx={{ mt: 3 }}
            fullWidth
            onClick={handleSubmit}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
