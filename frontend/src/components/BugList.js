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
        return "bg-green-500 text-white";
      case "in-progress":
        return "bg-blue-500 text-white";
      case "open":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
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
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Bug Tracker Dashboard
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            Effortlessly track and manage software bugs.
          </p>
        </div>

        <div className="text-center mb-8">
          <Link
            to="/report"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            Report New Bug
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bugs.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-2xl font-semibold text-gray-300">
                No bugs found!
              </p>
            </div>
          ) : (
            bugs.map((bug) => (
              <div
                key={bug._id}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <div className="h-[300px] flex flex-col">
                  <div className="flex-grow overflow-y-auto">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4">
                      {bug.title}
                    </h2>
                    <p className="text-gray-400">
                      {bug.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center px-5 py-2 rounded-full ${getStatusStyles(
                          bug.status
                        )}`}
                      >
                        <span className="w-2.5 h-2.5 bg-white rounded-full mr-2"></span>
                        {formatStatus(bug.status)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <Link
                        to="/report"
                        state={{ bug }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-6 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteBug(bug._id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-6 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300"
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
