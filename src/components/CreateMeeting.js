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
import { Typography, Container } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

export default function CreateMeeting() {
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          New meeting
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                sx={{ mt: 1 }}
                id="outlined-name"
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                id="outlined-name"
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
                  onChange={(newValue) => {
                    setStart(newValue);
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container textAlign="left" sx={{ mt: 2 }} alignItems="center">
            <Grid item xs={4}>
              <Typography component="h2" variant="h5">
                Add Invites
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={addFields}
                aria-label="delete"
                color="primary"
              >
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
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    size="small"
                    id="outlined-name"
                    label="Email"
                    variant="outlined"
                    value={invite}
                    onChange={(event) => handleInputs(event, index)}
                  />
                </Grid>
                <Grid item xs={1} display="inline">
                  <IconButton
                    onClick={(event) => removeFields(event, index)}
                    aria-label="delete"
                    color="secondary"
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
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
