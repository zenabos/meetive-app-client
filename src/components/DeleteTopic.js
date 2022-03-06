import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

export default function DeleteTopic(props) {
  const { topicId, updateTopics } = props;

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  const deleteTopic = (e) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/topics/${topicId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
          console.log("succesfull deleted")
        updateTopics();
      })
      .catch((err) => console.log("error deleting topic from api", err));
  };

  return <button onClick={deleteTopic}>Delete</button>;
}
