import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MeetingDetails() {
  const { meetingId } = useParams();

  const [meeting, setMeeting] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/meetings/${meetingId}`)
      .then((response) => setMeeting(response.data))
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  }, []);

  return (
    <div>
      {meeting && (
        <div key={meeting._id}>
          <h2>{meeting.title}</h2>
          <p>Goal: {meeting.goal}</p>
          <p>Description: {meeting.description}</p>
          <p>Date: {meeting.date}</p>
          <p>Start: {meeting.startTime}</p>
          <p>Invites: {meeting.invites}</p>
        </div>
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
