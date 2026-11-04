import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeList from "./components/employees/EmployeeList";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import { EmployeeProvider } from "./context/EmployeeContext";

import "./App.css";

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />

            <Route path="employees" element={<EmployeeList />} />

            <Route path="employees/new" element={<AddEmployee />} />

            <Route path="employees/:id" element={<EmployeeDetails />} />

            <Route path="employees/edit/:id" element={<EditEmployee />} />

            <Route
              path="projects"
              element={<h2>Projects page coming soon...</h2>}
            />

            <Route
              path="settings"
              element={<h2>Settings page coming soon...</h2>}
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
