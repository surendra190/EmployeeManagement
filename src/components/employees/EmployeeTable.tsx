import type { Employee } from "./employeeData";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../context/EmployeeContext";

interface EmployeeTableProps {
  employees: Employee[];
}

function EmployeeTable({ employees }: EmployeeTableProps) {
  const navigate = useNavigate();
  const { deleteEmployee } = useEmployees();
  const handleDelete = (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (confirmed) {
      deleteEmployee(id);
    }
  };
  return (
    <div className="employee-table-wrapper">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>

              <td>
                <div className="employee-info">
                  <strong>{employee.name}</strong>
                  <small>{employee.email}</small>
                </div>
              </td>

              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.joiningDate}</td>

              <td>
                <span
                  className={`employee-status ${
                    employee.status === "Active" ? "active" : "inactive"
                  }`}
                >
                  {employee.status}
                </span>
              </td>

              <td>
                <button
                  className="action-button"
                  onClick={() => navigate(`/employees/${employee.id}`)}
                >
                  View
                </button>

                <button
                  className="action-button"
                  onClick={() => navigate(`/employees/edit/${employee.id}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDelete(employee.id, employee.name)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan={7}>No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
