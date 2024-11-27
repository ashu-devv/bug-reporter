import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchBugs();
  }, [location]);

  const fetchBugs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bugs");
      setBugs(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs(bugs.filter((bug) => bug._id !== id));
    } catch (err) {
      console.error("Error deleting bug", err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-gradient-to-r from-emerald-600 to-emerald-700 text-emerald-50 shadow-sm";
      case "in-progress":
        return "bg-gradient-to-r from-blue-600 to-blue-700 text-blue-50 shadow-sm";
      case "open":
        return "bg-gradient-to-r from-red-600 to-red-700 text-red-50 shadow-sm";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-50 shadow-sm";
    }
  };

  const formatStatus = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "Resolved";
      case "in-progress":
        return "In Progress";
      case "open":
        return "Open";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-900 via-black to-gray-900 p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(147,51,234,0.1),transparent_50%)] animate-pulse delay-150"></div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] 
        bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] animate-[grid-fade_20s_linear_infinite]"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-10 animate-fade-in-down">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
            animate-gradient-x hover:scale-105 transition-transform duration-300 cursor-default">
            Bug Tracker Dashboard
          </h1>
          <p className="text-xl text-gray-400 mt-4 hover:text-gray-300 transition-colors duration-300">
            Effortlessly track and manage software bugs.
          </p>
        </div>

        <div className="text-center mb-8">
          <Link
            to="/report"
            className="relative inline-flex items-center px-8 py-3 font-semibold text-white rounded-full
              bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 background-animate
              hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] transform hover:scale-105 transition-all duration-300
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
              before:via-white/25 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%]
              before:transition-transform before:duration-1000 before:rounded-full overflow-hidden"
          >
            <span className="mr-2">Report New Bug</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bugs.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg
              animate-fade-in-up border border-gray-700/50">
              <p className="text-2xl font-semibold text-gray-300">
                No bugs found!
              </p>
            </div>
          ) : (
            bugs.map((bug, index) => (
              <div
                key={bug._id}
                className="group relative bg-gray-800/40 backdrop-blur-sm rounded-2xl transition-all duration-300
                  hover:bg-gray-900/80 hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:scale-[1.02] animate-fade-in-up
                  before:absolute before:inset-0 before:rounded-2xl before:p-[0.5px]
                  before:bg-gradient-to-r before:from-blue-500/50 before:via-purple-500/50 before:to-blue-500/50
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity isolate"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-[300px] flex flex-col bg-gray-900/40 hover:bg-gray-900/90 rounded-xl p-5 transition-colors duration-300">
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-blue-100 group-hover:text-blue-50 transition-colors duration-300
                      truncate hover:text-clip hover:whitespace-normal"
                      title={bug.title}>
                      {bug.title}
                    </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar mb-4 pr-2">
                    <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 text-sm leading-relaxed">
                      {bug.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-700/50">
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${getStatusStyles(bug.status)} transition-all duration-300`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
                        {formatStatus(bug.status)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <Link
                        to="/report"
                        state={{ bug }}
                        className="flex-1 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 px-4 rounded-full text-sm
                          hover:from-blue-500 hover:to-blue-600
                          hover:shadow-[0_0_10px_rgba(37,99,235,0.2)] transform hover:scale-[1.02] transition-all duration-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBug(bug._id)}
                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-4 rounded-full text-sm
                          hover:from-red-500 hover:to-red-600
                          hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] transform hover:scale-[1.02] transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BugList;
