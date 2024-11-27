import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BugForm = () => {
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugStatus, setBugStatus] = useState("open");
  const navigate = useNavigate();
  const location = useLocation();

  // If the location state has a bug, prefill the form for editing
  useEffect(() => {
    if (location.state?.bug) {
      const { bug } = location.state;
      setBugTitle(bug.title);
      setBugDescription(bug.description);
      setBugStatus(bug.status);
    }
  }, [location.state]); // Dependency array ensures this runs only when state changes

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBug = {
      title: bugTitle,
      description: bugDescription,
      status: bugStatus,
    };

    if (location.state?.bug) {
      // Edit existing bug - Perform a PUT request
      axios
        .put(`http://localhost:5000/api/bugs/${location.state.bug._id}`, newBug)
        .then((response) => {
          navigate("/"); // Redirect to the bug list page after successful update
        })
        .catch((error) => {
          console.error("Error updating bug", error);
        });
    } else {
      // Create a new bug - Perform a POST request
      axios
        .post("http://localhost:5000/api/bugs", newBug)
        .then((response) => {
          navigate("/"); // Redirect to the bug list page after successful creation
        })
        .catch((error) => {
          console.error("Error creating bug", error);
        });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
          {location.state?.bug ? "Edit Bug" : "Report New Bug"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Bug Title */}
          <label htmlFor="title" className="block text-gray-700 font-medium text-lg">
            Bug Title
          </label>
          <input
            type="text"
            id="title"
            value={bugTitle}
            onChange={(e) => setBugTitle(e.target.value)}
            className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Bug Description */}
          <label htmlFor="description" className="block text-gray-700 font-medium text-lg mt-4">
            Bug Description
          </label>
          <textarea
            id="description"
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Bug Status */}
          <label htmlFor="status" className="block text-gray-700 font-medium text-lg mt-4">
            Bug Status
          </label>
          <select
            id="status"
            value={bugStatus}
            onChange={(e) => setBugStatus(e.target.value)}
            className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
            <option value="in-progress">In Progress</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700"
          >
            {location.state?.bug ? "Update Bug" : "Report Bug"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BugForm;
