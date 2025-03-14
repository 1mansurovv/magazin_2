import React from "react";
import Contect from "./components/content";
import { Route, Routes } from "react-router-dom";
import Details from "./components/details";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Contect />} />
        <Route path={`/detail/:id`} element={<Details />} />
      </Routes>
    </div>
  );
}