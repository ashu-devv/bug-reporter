import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BugForm = () => {
  const [bugTitle, setBugTitle] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [bugStatus, setBugStatus] = useState("open");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.bug) {
      const { bug } = location.state;
      setBugTitle(bug.title);
      setBugDescription(bug.description);
      setBugStatus(bug.status.toLowerCase());
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBug = {
      title: bugTitle,
      description: bugDescription,
      status: bugStatus.toLowerCase(),
    };

    try {
      if (location.state?.bug) {
        await axios.put(
          `http://localhost:5000/api/bugs/${location.state.bug._id}`,
          newBug
        );
      } else {
        await axios.post("http://localhost:5000/api/bugs", newBug);
      }
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error saving bug", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
          {location.state?.bug ? "Edit Bug" : "Report New Bug"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Bug Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-white font-medium text-lg">
              Bug Title
            </label>
            <input
              type="text"
              id="title"
              value={bugTitle}
              onChange={(e) => setBugTitle(e.target.value)}
              className="mt-2 w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-all"
              required
            />
          </div>

          {/* Bug Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-white font-medium text-lg">
              Bug Description
            </label>
            <textarea
              id="description"
              value={bugDescription}
              onChange={(e) => setBugDescription(e.target.value)}
              className="mt-2 w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-all"
              required
              rows="4"
            />
          </div>

          {/* Bug Status */}
          <div className="mb-8">
            <label htmlFor="status" className="block text-white font-medium text-lg">
              Bug Status
            </label>
            <select
              id="status"
              value={bugStatus}
              onChange={(e) => setBugStatus(e.target.value)}
              className="mt-2 w-full p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-all"
              required
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            {location.state?.bug ? "Update Bug" : "Report Bug"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BugForm;
