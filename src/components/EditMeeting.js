import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditMeeting() {
  const { meetingId } = useParams();

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [start, setStart] = useState("");
  const [invites, setInvites] = useState("");
  console.log(start);

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle(response.data.title);
        setGoal(response.data.goal);
        setInvites(response.data.invites);
        setStart(response.data.start);
        console.log(response.data.start);
      })
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  }, []);

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
      .put(
        `${process.env.REACT_APP_API_URL}/meetings/${meetingId}`,
        meetingDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response.data._id);
        navigate(`/meetings/${response.data._id}`);
      })
      .catch((err) => console.log("error creating new meeting", err));
  };

  return (
    <div>
      {invites && (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
           <h1>Edit Meeting</h1>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
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
                    required
                    size="small"
                    fullWidth
                    multiline
                    maxRows={3}
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
                          required
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
              <Grid
                container
                textAlign="left"
                sx={{ mt: 2 }}
                alignItems="center"
              >
                <Grid item xs={5}>
                  <h2>Add Invites</h2>
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
                        required
                        type="email"
                        fullWidth
                        size="small"
                        id="outlined-name"
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
                type="submit"
                sx={{ mt: 3 }}
                fullWidth
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </div>
  );
}
