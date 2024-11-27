import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BugList from "./components/BugList";
import BugForm from "./components/BugForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BugList />} />
        <Route path="/report" element={<BugForm />} />
      </Routes>
    </Router>
  );
};

export default App;
