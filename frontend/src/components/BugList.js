import React, { useState, useEffect } from "react";
import axios from "axios";

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bugs")
      .then(response => setBugs(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Bug List</h1>
      <ul>
        {bugs.map((bug) => (
          <li key={bug._id}>
            <strong>{bug.title}:</strong> {bug.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;
