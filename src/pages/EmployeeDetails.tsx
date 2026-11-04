import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { employees } = useEmployees();

  const employee = employees.find((item) => item.id === Number(id));

  if (!employee) {
    return (
      <div className="employee-details">
        <h2>Employee Not Found</h2>
        <p>The requested employee does not exist.</p>

        <button
          className="add-employee-button"
          onClick={() => navigate("/employees")}
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="employee-details">
      <div className="details-header">
        <div>
          <h2>Employee Details</h2>
          <p>Complete employee information</p>
        </div>

        <button className="reset-button" onClick={() => navigate("/employees")}>
          ← Back to Employees
        </button>
      </div>

      <div className="employee-profile-card">
        <div className="profile-heading">
          <div className="profile-avatar">{employee.name.charAt(0)}</div>

          <div>
            <h2>{employee.name}</h2>
            <p>{employee.designation}</p>

            <span
              className={`employee-status ${
                employee.status === "Active" ? "active" : "inactive"
              }`}
            >
              {employee.status}
            </span>
          </div>
        </div>

        <hr />

        <h3>Personal & Employment Information</h3>

        <div className="details-grid">
          <div className="detail-item">
            <label>Employee ID</label>
            <strong>{employee.id}</strong>
          </div>

          <div className="detail-item">
            <label>Full Name</label>
            <strong>{employee.name}</strong>
          </div>

          <div className="detail-item">
            <label>Email Address</label>
            <strong>{employee.email}</strong>
          </div>

          <div className="detail-item">
            <label>Department</label>
            <strong>{employee.department}</strong>
          </div>

          <div className="detail-item">
            <label>Designation</label>
            <strong>{employee.designation}</strong>
          </div>

          <div className="detail-item">
            <label>Joining Date</label>
            <strong>{employee.joiningDate}</strong>
          </div>

          <div className="detail-item">
            <label>Employment Status</label>
            <strong>{employee.status}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
