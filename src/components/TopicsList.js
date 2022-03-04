import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function TopicsList(props) {
const {meetingId} = props
const [topics, setTopics] = useState([]);

  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/meetings/${meetingId}/topics`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setTopics(response.data))
      .catch((err) => console.log("error getting topics from api", err));
  }, []);


  return (
    <div className="TopicsList">
    <h4>Topics</h4>

    {topics &&
      topics.map((topic) => {
        return (
          <div className="topics-summary" key={topic._id}>
            <Link to={`/topics/${topic._id}`}>
              <div>
                <p>{topic.title}{" "}|{" "}{topic.totalTime} minutes </p>
              </div>
            </Link>
          </div>
        );
      })}
  </div>
  )
}
