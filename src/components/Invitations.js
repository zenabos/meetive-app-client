import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Invitations(props) {
  const [meetings, setMeetings] = useState([]);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const updateMeetings = (meetings) => {
    const newArr = meetings.filter(meeting => new Date(meeting.start) > Date.now())
    const newMeetingsArr = newArr
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, props.maxNumber);
    setMeetings(newMeetingsArr);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/invitations`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        updateMeetings(response.data);
      })
      .catch((err) => console.log("error getting meetings from api", err));
  }, []);

  return (
    <div className="MeetingsList">
      <h2>My invitations</h2>

      {meetings &&
        meetings.map((meeting) => {
          return (
            <div className="meeting-summary" key={meeting._id}>
              <Link to={`/meetings/${meeting._id}`}>
                <div>
                  <p>{meeting.title}</p>
                  <p>{meeting.start}</p>
                  <p>{meeting.time}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}