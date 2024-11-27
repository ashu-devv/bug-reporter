import React, { useState } from "react";
import axios from "axios";

const BugForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/bugs", { title, description })
      .then(() => alert("Bug reported!"))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Report a Bug</h1>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BugForm;
