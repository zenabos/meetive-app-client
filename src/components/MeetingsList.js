import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Grid } from "@mui/material";
import moment from "moment";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";

export default function MeetingsList(props) {
  const [meetings, setMeetings] = useState([]);

  // const date = moment(start).format("ddd DD/MM");
  // const time = moment(start).format("HH:mm");

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
    <Box sx={{ border: 1, borderColor: "primary.main", borderRadius: 2, pb: 3}}>
      <h3>Upcoming Meetings</h3>
      {meetings &&
        meetings.map((meeting) => {
          return (
            <Grid container key={meeting._id} sx={{ p: 3 }}>
              <Grid item xs={6} sx={{ textAlign: 'left' }}>
                <Link to={`/meetings/${meeting._id}`}>{meeting.title}</Link>
              </Grid>
              <Grid item xs={3}>
                {moment(meeting.start).format("ddd DD/MM")}
              </Grid>
              <Grid item xs={3}>
                {moment(meeting.start).format("HH:mm")}
              </Grid>
            </Grid>
          );
        })}
    </Box>
  );
}
