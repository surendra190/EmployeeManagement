import { useMemo, useState } from "react";

import EmployeeTable from "./EmployeeTable";
import { useEmployees } from "../../context/EmployeeContext";
import { useNavigate } from "react-router-dom";
function EmployeeList() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const { employees } = useEmployees();
  const navigate = useNavigate();

  // Search, filter and sort employees
  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    // Search by employee name or email
    if (search.trim()) {
      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Department filter
    if (department !== "All") {
      result = result.filter((employee) => employee.department === department);
    }

    // Status filter
    if (status !== "All") {
      result = result.filter((employee) => employee.status === status);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "joiningDate") {
        return (
          new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime()
        );
      }

      return 0;
    });

    return result;
  }, [search, department, status, sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setDepartment("All");
    setStatus("All");
    setSortBy("name");
  };

  return (
    <div className="employee-page">
      {/* Page Header */}
      <div className="employee-page-header">
        <div>
          <h2>Employee Management</h2>
          <p>Manage all your company employees here.</p>
        </div>

        <button
          className="add-employee-button"
          onClick={() => navigate("/employees/new")}
        >
          + Add Employee
        </button>
      </div>

      {/* Search and Filters */}
      <div className="employee-filters">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="joiningDate">Sort by Joining Date</option>
        </select>

        <button className="reset-button" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Employee Table */}
      <div className="employee-list-card">
        <div className="employee-list-heading">
          <h3>All Employees</h3>

          <span>
            Showing {filteredEmployees.length} of {employees.length} employees
          </span>
        </div>

        <EmployeeTable employees={filteredEmployees} />
      </div>
    </div>
  );
}

export default EmployeeList;
