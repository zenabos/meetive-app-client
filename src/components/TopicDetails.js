import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function TopicDetails() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState("");
  console.log(topicId)

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/topics/${topicId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTopic(response.data);
      })
      .catch((err) => console.log("error getting topicDetails from api", err));
  }, []);

  return (
    <div>
      {topic && (
        <div key={topic._id}>
          <h2>{topic.title}</h2>
          <p>Description: {topic.description}</p>
          <p>Introduction: {topic.introductionTime}</p>
          <p>Discussion: {topic.discussionTime}</p>
          <p>Conclusion: {topic.conclusionTime}</p>
          <p>Total: {topic.totalTime}</p>
        </div>
      )}
    </div>
  );
}
