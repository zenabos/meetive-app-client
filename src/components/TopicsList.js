import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CreateTopic from "./CreateTopic";

export default function TopicsList(props) {
  const { meetingId } = props;
  const [topics, setTopics] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    updateTopics()
  }, []);

  const updateTopics = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}/topics`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setTopics(response.data))
      .catch((err) => console.log("error getting topics from api", err));
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
              <Link to={`/topics/${topic._id}`}>
                <div>
                  <p>
                    {topic.title} | {topic.totalTime} minutes{" "}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}

      <button onClick={toggleForm}>
        {displayForm ? "Cancel" : "Add Topic"}
      </button>
      {displayForm && (
        <CreateTopic meetingId={meetingId} toggleForm={toggleForm} updateTopics={updateTopics}/>
      )}
    </div>
  );
}
