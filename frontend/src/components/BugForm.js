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
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-gradient-to-r from-green-50 to-blue-100 shadow-xl rounded-lg transform transition-all duration-500 hover:scale-105">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-wide">
        Report a Bug <span className="text-blue-500">Quickly</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium text-lg">Bug Title</label>
          <input
            type="text"
            id="title"
            value={bugTitle}
            onChange={(e) => setBugTitle(e.target.value)}
            className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 ease-in-out hover:scale-105"
            placeholder="Enter the bug title"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium text-lg">Bug Description</label>
          <textarea
            id="description"
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            className="mt-2 w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300 ease-in-out hover:scale-105"
            placeholder="Describe the bug in detail"
            rows="6"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};
export default BugForm;