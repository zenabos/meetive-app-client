import React, { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material";

export default function Helpers(props) {
  const { timestamp } = props;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  
  useEffect(() => {
    const newTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    });
  setTime(newTime);

  const newDate = new Date(timestamp).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  setDate(newDate);}, [] )
  
  return (
    <Grid container>
      <Grid item xs={4}>{date}</Grid>
      <Grid item xs={4}>{time}</Grid>
    </Grid>
  );
}
