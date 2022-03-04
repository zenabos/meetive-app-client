import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

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
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Topic</h2>
          <label>
            Title:
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>{" "}
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </label>
          <p>Fill up how much time you'll need for:</p>
          <label>
            Introduction:
            <input
              type="number"
              name="introductionTime"
              placeholder={0}
              onChange={(e) => setIntroductionTime(e.target.value)}
              value={introductionTime}
            />
            minutes
          </label>
          <br />
          <label>
            Discussion:
            <input
              type="number"
              name="discussionTime"
              placeholder={0}
              onChange={(e) => setDiscussionTime(e.target.value)}
              value={discussionTime}
            />
            minutes
          </label>
          <br />
          <label>
            Conclusion:
            <input
              type="number"
              name="conclusionTime"
              placeholder={0}
              onChange={(e) => setConclusionTime(e.target.value)}
              value={conclusionTime}
            />
            minutes
          </label>
          <br />
          Total: {totalTime} minutes <br />
          <button type="submit">Save</button>
        </div>
      </form>
      <br />
    </div>
  );
}
