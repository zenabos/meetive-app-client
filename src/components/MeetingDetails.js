import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CreateTopic from "./CreateTopic";
import TopicsList from "./TopicsList";

export default function MeetingDetails() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setMeeting(response.data))
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  }, []);

  const toggleForm = () => {
    setDisplayForm(!displayForm);
  };

  return (
    <div>
      {meeting && (
        <div key={meeting._id}>
          <h2>{meeting.title}</h2>
          <p>Goal: {meeting.goal}</p>
          <p>Description: {meeting.description}</p>
          <p>Start: {meeting.start}</p>
          <p>Invites: {meeting.invites}</p>
          {/* {meeting.topics.map((topic) => {
            return <div key={topic._id}><Link to="/topic-details">{topic.title}</Link></div>;
          })} */}
        </div>
      )}

      <div>
        <TopicsList meetingId={meetingId}/>
      </div>

      <button onClick={toggleForm}>
        {displayForm ? "Cancel" : "Add Topic"}
      </button>
      {displayForm && (
        <CreateTopic meetingId={meetingId} toggleForm={toggleForm} />
      )}

      <Link to={`/meetings/edit/${meetingId}`}>
        <button>Edit</button>
      </Link>
      <Link to="/meetings">
        <button>Go back</button>
      </Link>
    </div>
  );
}
