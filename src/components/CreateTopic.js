import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography, Container } from "@mui/material";
import { InputAdornment } from "@mui/material";

export default function CreateTopic(props) {
  const { meetingId, toggleForm, updateTopics } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [introductionTime, setIntroductionTime] = useState(0);
  const [discussionTime, setDiscussionTime] = useState(0);
  const [conclusionTime, setConclusionTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    setTotalTime(
      Number(introductionTime) + Number(discussionTime) + Number(conclusionTime)
    );
  }, [introductionTime, discussionTime, conclusionTime]);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const topicDetails = {
    title,
    description,
    introductionTime,
    discussionTime,
    conclusionTime,
    totalTime,
    meeting: meetingId,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("processing form...");

    axios
      .post(`${process.env.REACT_APP_API_URL}/topics`, topicDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        updateTopics();
        toggleForm();
      })
      .catch((err) => console.log("error creating new topic", err));
  };

  return (
    <Container className="CreateTopic">
      <h2>Add topic</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          multiline
          size="small"
          maxRows={4}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <p>How much time do you need?</p>

        <TextField
          label="Introduction"
          variant="outlined"
          type="number"
          required
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
          value={introductionTime}
          onChange={(e) => setIntroductionTime(e.target.value)}
        />

        <TextField
          id="outlined-name"
          label="Discussion"
          variant="outlined"
          type="number"
          required
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
          value={discussionTime}
          onChange={(e) => setDiscussionTime(e.target.value)}
        />

        <TextField
          id="outlined-name"
          label="Conclusion"
          variant="outlined"
          type="number"
          required
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
          value={conclusionTime}
          onChange={(e) => setConclusionTime(e.target.value)}
        />

        <TextField
          id="outlined-name"
          disabled
          label="Total"
          variant="outlined"
          type="number"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">minutes</InputAdornment>
            ),
          }}
          value={totalTime}
        />
      </Box>
      <Box></Box>
      <Button
        sx={{ mb: 3, mt: 2, width: "30ch" }}
        size="small"
        onClick={handleSubmit}
        variant="contained"
      >
        Save
      </Button>
    </Container>
  );
}
