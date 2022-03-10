import React from "react";
import { CardHeader, Container, Box } from "@mui/material";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { AccessTimeOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DeleteTopic from "./DeleteTopic";

export default function TopicDetails(props) {
  const { topic, updateTopics } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List >
      <ListItem sx={{m:0, p:0}}>
        <ListItemButton key={topic._id} onClick={handleClick}>
        <ListItemText primary={topic.title} />
        </ListItemButton>
        {open ? <ExpandLess /> : <ExpandMore />}
        <DeleteTopic topicId={topic._id} updateTopics={updateTopics} />
      </ListItem>
      <Collapse key={topic._id} in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`${topic.owner.name} (owner)`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary={`${topic.totalTime} minutes`} />
          </ListItem>
          <ListItem>{topic.description}</ListItem>
        </List>
      </Collapse>
    </List>
  );
}
