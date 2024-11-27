import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to the 'Report New Bug' page

  // Fetch bugs from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bugs")
      .then((response) => setBugs(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Function to delete a bug
  const deleteBug = (id) => {
    axios
      .delete(`http://localhost:5000/api/bugs/${id}`)
      .then((response) => {
        setBugs(bugs.filter((bug) => bug._id !== id)); // Remove deleted bug from UI
      })
      .catch((err) => console.error("Error deleting bug", err));
  };

  // Function to navigate to the 'Report New Bug' page
  const reportNewBug = () => {
    navigate("/report");
  };

  // Function to handle editing a bug (currently just navigates to the 'report' page with bug data)
  const editBug = (bug) => {
    navigate(`/edit/${bug._id}`, { state: { bug } }); // Pass the bug data for editing
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">Bug Tracker Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Track and manage software bugs effectively.</p>
        </div>

        {/* Add Bug Button */}
        <div className="text-center mb-6">
          <Link
            to="/report"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transform transition duration-200 hover:scale-105"
          >
            Report New Bug
          </Link>
        </div>

        {/* Bug List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bugs.length === 0 ? (
            <div className="col-span-full text-center p-6 bg-gray-200 rounded-lg shadow-lg">
              <p className="text-lg font-semibold text-gray-700">No bugs found!</p>
            </div>
          ) : (
            bugs.map((bug) => (
              <div
                key={bug._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out"
              >
                <h2 className="text-2xl font-semibold text-indigo-600">{bug.title}</h2>
                <p className="text-gray-500 mt-2">{bug.description}</p>
                <div className="mt-4">
                  <span
                    className={`inline-block px-4 py-2 text-sm font-medium rounded-full ${
                      bug.status === "open"
                        ? "bg-red-500 text-white"
                        : bug.status === "resolved"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {bug.status}
                  </span>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <Link
                    to={`/edit/${bug._id}`}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transform transition duration-200 hover:scale-105"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBug(bug._id)} // Add delete functionality here
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transform transition duration-200 hover:scale-105"
                  >
                    Delete
                  </button>
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
