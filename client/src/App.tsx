import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/main-layout/MainLayout";
import Employees from "./pages/employees/Employees";
import Positions from "./pages/positions/Positions";
import Map from "./pages/map/Map";
import NotFound from "./pages/not-found/NotFound";
import positionsStore from "./stores/positions-store";

import "./utils/scss/global.scss";

const App = () => {
  useEffect(() => {
    positionsStore.loadPositions();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="employees" element={<Employees />} />
          <Route path="positions" element={<Positions />} />
          <Route path="map" element={<Map mapCall="page" />} />
          <Route path="" element={<Employees />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
