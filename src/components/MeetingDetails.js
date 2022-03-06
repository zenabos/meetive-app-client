import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import TopicsList from "./TopicsList";
import DeleteMeeting from "./DeleteMeeting";

export default function MeetingDetails() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const settingDateTime = (date) => {
    const newTime = new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newDate = new Date(date).toLocaleDateString([], {weekday: 'long', month: 'long',
    day: 'numeric'});
    setTime(newTime);
    setDate(newDate);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setMeeting(response.data);
        settingDateTime(response.data.start);
      })
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
          <p>Date: {date}</p>
          <p>Start: {time}</p>
          <p>Owner: {meeting.owner.name}</p>
          <p>Invites: {meeting.invites.map((invite, index) => {
            return (
              <li key={index}>
                {invite}
              </li>
            )
          }  )}</p>
        </div>
      )}

      <div>
        <TopicsList meetingId={meetingId} />
      </div>

      <Link to={`/meetings/edit/${meetingId}`}>
        <button>Edit</button>
      </Link>
      <Link to="/meetings">
        <button>Go back</button>
      </Link>

      <DeleteMeeting meetingId={meetingId} />

    </div>

  );
}
