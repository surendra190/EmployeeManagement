import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useEmployees } from "../context/EmployeeContext";

// 1. Define validation schema
const employeeSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),

  email: z.string().trim().email("Please enter a valid email"),

  department: z.enum(["IT", "HR", "Finance", "Sales"], {
    error: "Please select a department",
  }),

  designation: z.string().trim().min(2, "Designation is required"),

  joiningDate: z.string().min(1, "Joining date is required"),

  status: z.enum(["Active", "Inactive"]),
});

// 2. Infer TypeScript type from schema
type EmployeeFormData = z.infer<typeof employeeSchema>;

function AddEmployee() {
  const navigate = useNavigate();

  const { addEmployee, employees } = useEmployees();

  // 3. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "IT",
      designation: "",
      joiningDate: "",
      status: "Active",
    },
  });

  // 4. Handle form submission
  const onSubmit = (data: EmployeeFormData) => {
    const emailExists = employees.some(
      (employee) => employee.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      alert("An employee with this email already exists.");
      return;
    }

    addEmployee(data);

    alert("Employee added successfully!");

    navigate("/employees");
  };

  return (
    <div className="employee-form-page">
      <div className="details-header">
        <div>
          <h2>Add New Employee</h2>
          <p>Enter employee information below.</p>
        </div>

        <button
          type="button"
          className="reset-button"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </div>

      <form className="employee-form-card" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-grid">
          {/* Employee Name */}
          <div className="form-group">
            <label>Full Name</label>

            <input {...register("name")} placeholder="Enter employee name" />

            {errors.name && (
              <span className="form-error">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter email address"
            />

            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>

          {/* Department */}
          <div className="form-group">
            <label>Department</label>

            <select {...register("department")}>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
            </select>

            {errors.department && (
              <span className="form-error">{errors.department.message}</span>
            )}
          </div>

          {/* Designation */}
          <div className="form-group">
            <label>Designation</label>

            <input
              {...register("designation")}
              placeholder="Enter designation"
            />

            {errors.designation && (
              <span className="form-error">{errors.designation.message}</span>
            )}
          </div>

          {/* Joining Date */}
          <div className="form-group">
            <label>Joining Date</label>

            <input type="date" {...register("joiningDate")} />

            {errors.joiningDate && (
              <span className="form-error">{errors.joiningDate.message}</span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Employment Status</label>

            <select {...register("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {errors.status && (
              <span className="form-error">{errors.status.message}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="reset-button"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-employee-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
