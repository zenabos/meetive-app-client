import React from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function MeetingMenu(props) {
  const { meetingId, owner } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user, getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (path) => {
    setAnchorEl(null);
    navigate(path);
  };

  const deleteMeeting = (e) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/meetings/my-meetings");
      })
      .catch((err) =>
        console.log("error getting meetingDetails from api", err)
      );
  };

  return (
    <Box>
      {user.email === owner && (
        <Box>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => handleClick(`/meetings/edit/${meetingId}`)}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={deleteMeeting}>Delete</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
}
