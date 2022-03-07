import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import TopicsList from "./TopicsList";
import DeleteMeeting from "./DeleteMeeting";
import Helpers from "./Helpers";

export default function MeetingDetails() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState("");
  const [endTime, setEndTime] = useState("");
  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  console.log(meeting.topics);

  useEffect(() => {
    updateMeeting();
  }, []);

  const updateMeeting = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setMeeting(response.data);
        calculateEndTime(response.data);
      })
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  };

  const calculateEndTime = (meeting) => {
    const meetingTimes = meeting.topics.map((topic) => topic.totalTime);
    const total = meetingTimes.reduce((prev, curr) => prev + curr, 0);
    const startTime = new Date(meeting.start).getTime();
    const newTime = new Date(startTime + total * 60000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(newTime);
    setEndTime(newTime);
  };

  return (
    <div>
      {meeting && (
        <div key={meeting._id}>
          <h2>{meeting.title}</h2>
          <p>Goal: {meeting.goal}</p>
          <p>Description: {meeting.description}</p>
          <Helpers timestamp={meeting.start} />
          <p>End: {endTime} </p>
          <p>Owner: {meeting.owner.name}</p>
          <p>
            Invites:{" "}
            {meeting.invites.map((invite, index) => {
              return <li key={index}>{invite}</li>;
            })}
          </p>
        </div>
      )}

      <div>
        <TopicsList meetingId={meetingId} updateMeeting={updateMeeting}/>
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
