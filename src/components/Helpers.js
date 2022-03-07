import React, { useEffect } from "react";
import { useState } from "react";

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
    <div>
      <p>Date: {date}</p>
      <p>Start: {time}</p>
    </div>
  );
}
