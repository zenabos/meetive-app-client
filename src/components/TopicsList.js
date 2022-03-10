import React from "react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateTopic from "./CreateTopic";
import { CardHeader, Box } from "@mui/material";
import { Button } from "@mui/material";
import TopicDetails from "./TopicDetails";

export default function TopicsList(props) {
  const { meetingId, updateMeeting } = props;
  const [topics, setTopics] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    updateTopics();
  }, []);

  const updateTopics = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}/topics`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTopics(response.data);
        updateMeeting();
      })
      .catch((err) => console.log("error getting topics from api", err));
  };

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <Box className="TopicsList">
      <CardHeader subheader="Topics" sx={{ textAlign: "left", pb: 0 }} />
      {topics &&
        topics.map((topic) => {
          return (
            <TopicDetails key={topic._id} topic={topic} updateTopics={updateTopics} />
            );
        })}
      <Button onClick={toggleForm}>{displayForm ? "Cancel" : "Add Topic"}</Button>
        {displayForm && (
        <CreateTopic
          meetingId={meetingId}
          toggleForm={toggleForm}
          updateTopics={updateTopics}
        />
      )}
    </Box>
  );
}
