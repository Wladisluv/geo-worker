import { useEffect } from "react";
import MainLayout from "./layout/main-layout/MainLayout";
import Employees from "./pages/employees/Employees";
import Map from "./pages/map/Map";
import NotFound from "./pages/not-found/NotFound";
import Positions from "./pages/positions/Positions";
import "./utils/scss/global.scss";
import { Routes, Route } from "react-router-dom";
import positionsStore from "./stores/positions-store";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="employees" element={<Employees />} />
          <Route path="positions" element={<Positions />} />
          <Route path="map" element={<Map mapCall="page" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
