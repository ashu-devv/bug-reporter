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
    <div className="min-h-screen relative flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse delay-150"></div>
      
      <div className="relative max-w-2xl w-full bg-gray-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl
        transform transition-all duration-500 hover:scale-[1.02] group
        before:absolute before:inset-0 before:p-[0.5px] before:bg-gradient-to-r before:from-blue-500/50 before:via-purple-500/50 before:to-blue-500/50 
        before:rounded-3xl before:content-[''] before:opacity-0 before:transition-opacity before:duration-500
        hover:before:opacity-100 hover:before:p-[1px] isolate">
        <div className="relative z-10 bg-gray-900/90 rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-8">
            {location.state?.bug ? "Edit Bug" : "Report New Bug"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="title" className="block text-gray-100 font-medium text-lg mb-2">
                Bug Title
              </label>
              <input
                type="text"
                id="title"
                value={bugTitle}
                onChange={(e) => setBugTitle(e.target.value)}
                className="w-full p-4 bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                  hover:shadow-[0_0_15px_rgba(37,99,235,0.1)] 
                  transition-shadow duration-300"
                required
              />
            </div>

            <div className="group">
              <label htmlFor="description" className="block text-gray-100 font-medium text-lg mb-2">
                Bug Description
              </label>
              <textarea
                id="description"
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
                className="w-full p-4 bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                  hover:shadow-[0_0_15px_rgba(37,99,235,0.1)]
                  transition-shadow duration-300 custom-scrollbar"
                required
                rows="4"
              />
            </div>

            <div className="group">
              <label htmlFor="status" className="block text-gray-100 font-medium text-lg mb-2">
                Bug Status
              </label>
              <select
                id="status"
                value={bugStatus}
                onChange={(e) => setBugStatus(e.target.value)}
                className="w-full p-4 bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/30 
                  hover:shadow-[0_0_15px_rgba(37,99,235,0.1)]
                  transition-shadow duration-300"
                required
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg
                shadow-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:scale-[1.02] 
                transform transition-all duration-300 relative overflow-hidden
                after:absolute after:inset-0 after:z-10 after:bg-gradient-to-r after:from-transparent 
                after:via-white/25 after:to-transparent after:translate-x-[-200%] 
                hover:after:translate-x-[200%] after:transition-transform after:duration-1000"
            >
              {location.state?.bug ? "Update Bug" : "Report Bug"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BugForm;
