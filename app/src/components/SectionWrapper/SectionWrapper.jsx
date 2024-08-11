import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import SearchPortIn from "../SearchPortIn/SearchPortIn";
import SearchPortOut from "../SearchPortOut/SearchPortOut";
import "./style.scss";

const SectionWrapper = () => {
  return (
    <main className="SectionWrapper">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/searchin" element={<SearchPortIn />} />
        <Route path="/searchout" element={<SearchPortOut />} />
      </Routes>
    </main>
  );
};

export default SectionWrapper;
