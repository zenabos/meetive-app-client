import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import TopicsList from "./TopicsList";
import moment from "moment";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import MeetingMenu from "./MeetingMenu";
import { useNavigate } from "react-router-dom";

export default function MeetingDetails() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [openInvites, setOpenInvites] = useState(false);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}/endTime`, {endTime: endTime}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log("error updating endTime", err));
  }, [endTime]);

  const calculateEndTime = (meeting) => {
    const meetingTimes = meeting.topics.map((topic) => topic.totalTime);
    const total = meetingTimes.reduce((prev, curr) => prev + curr, 0);
    const startTime = new Date(meeting.start).getTime();
    const newTime = new Date(startTime + total * 60000)
    setEndTime(newTime.toISOString());
  };

  const handleClick = () => {
    setOpenInvites(!openInvites);
  };

  return (
    <Container>
      <Box textAlign="left">
        <Button
          onClick={() => navigate(-1)}
          size="small"
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
      </Box>
            
      {meeting && (
        <Card key={meeting._id}>
          <CardHeader
            action={
              <MeetingMenu meetingId={meetingId} owner={meeting.owner.email} />
            }
            title={meeting.title}
            subheader={meeting.goal}
            sx={{ textAlign: "left", pb: 0, pl: 4, pt: 4 }}
          />
          <CardContent>
            <List
              sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
              component="nav"
            >
              <ListItem>
                <ListItemIcon>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={moment(meeting.start).format("dddd DD MMMM")}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`${moment(meeting.start).format(
                    "HH:mm"
                  )} - ${moment(endTime).format(
                    "HH:mm"
                  )}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={`${meeting.owner.name} (organisator)`} />
              </ListItem>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <GroupIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Invites" />
                {openInvites ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openInvites} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {meeting.invites.map((invite, index) => {
                    return (
                      <ListItem key={index} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <PersonIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={invite} />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </List>

            <Divider />
            <TopicsList meetingId={meetingId} updateMeeting={updateMeeting} />
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
