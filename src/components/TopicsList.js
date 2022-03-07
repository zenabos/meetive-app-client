import React from "react";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateTopic from "./CreateTopic";
import DeleteTopic from "./DeleteTopic";

export default function TopicsList(props) {
  const { meetingId } = props;
  const [topics, setTopics] = useState([]);
  const [displayTopic, setDisplayTopic] = useState(false);
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
      .then((response) => {setTopics(response.data)
      console.log(response.data)})
      .catch((err) => console.log("error getting topics from api", err));
  };

  const toggleTopic = () => {
    setDisplayTopic(!displayTopic);
  };

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div className="TopicsList">
      <h4>Topics</h4>

      {topics &&
        topics.map((topic) => {
          return (
            <div className="topics-summary" key={topic._id}>
              <p>
                {topic.title}
                <button onClick={toggleTopic}>
                  {displayTopic ? "-" : "+"}{" "}
                </button>
                <DeleteTopic topicId={topic._id} updateTopics={updateTopics}/>
              </p>
              {displayTopic && (
                <div key={topic._id}>
                  <p>Description: {topic.description}</p>
                  <p>Owner: {topic.owner.name}</p>
                  <p>Duration: {topic.totalTime} minutes</p>
                </div>
              )}
            </div>
          );
        })}

      <p>Duration: </p>

      <button onClick={toggleForm}>
        {displayForm ? "Cancel" : "Add Topic"}
      </button>
      {displayForm && (
        <CreateTopic
          meetingId={meetingId}
          toggleForm={toggleForm}
          updateTopics={updateTopics}
        />
      )}
    </div>
  );
}
