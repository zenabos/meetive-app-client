import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import moment from 'moment'
import { Grid, Typography } from "@mui/material";
import { Container, Card, CardContent, CardHeader, CardActionArea } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


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
    <Container>
    <Container>
    <Typography color="primary" component="h1" variant="h5">
          My Invitations
        </Typography>
    {meetings &&
      meetings.map((meeting) => {
        return (
          <Card key={meeting._id} sx={{ p: 0, mb:1}}>
            <CardActionArea href={`/meetings/${meeting._id}`}>
              <CardHeader
                sx={{ pb: 0, textAlign: "left" }}
                subheader={meeting.title}
              />
              <CardContent sx={{ pt: 1 }}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={4}>
                    <Grid container direction="row" alignItems="center">
                      <CalendarTodayIcon
                        fontSize="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography>
                        {moment(meeting.start).format("DD/MM")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="row" alignItems="center">
                      <AccessTimeIcon
                        fontSize="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography>
                        {moment(meeting.start).format("HH:mm")}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
      
  </Container>
  </Container>
  )}