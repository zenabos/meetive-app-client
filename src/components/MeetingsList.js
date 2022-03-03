import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function MeetingsList() {
  const [meetings, setMeetings] = useState([]);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setMeetings(response.data))
      .catch((err) => console.log("error getting meetings from api", err));
  }, []);

  return (
    <div className="MeetingsList">
      <h2>My Meetings</h2>

      {meetings &&
        meetings.map((meeting) => {
          return (
            <div className="meeting-summary" key={meeting._id}>
              <Link to={`/meetings/${meeting._id}`}>
                <div>
                  <p>{meeting.title}</p>
                  <p>{meeting.date}</p>
                  <p>{meeting.time}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
