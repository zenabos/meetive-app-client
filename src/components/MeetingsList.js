import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Helpers from "./Helpers";
import { Grid, Paper } from "@mui/material";

export default function MeetingsList(props) {
  const [meetings, setMeetings] = useState([]);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const updateMeetings = (meetings) => {
    const newArr = meetings.filter(
      (meeting) => new Date(meeting.start) > Date.now()
    );
    const newMeetingsArr = newArr
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, props.maxNumber);
    setMeetings(newMeetingsArr);
    console.log(newMeetingsArr);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        updateMeetings(response.data);
      })
      .catch((err) => console.log("error getting meetings from api", err));
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h2>Upcoming Meetings</h2>
      </Grid>

      {meetings &&
        meetings.map((meeting) => {
          return (
            <Grid item xs={12} key={meeting._id}>
              <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                  <Link to={`/meetings/${meeting._id}`}>{meeting.title}</Link>
                </Grid>
                <Grid item xs={8}>
                  <Helpers timestamp={meeting.start} />{" "}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
}
