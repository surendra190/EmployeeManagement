import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const employeeStats = [
  {
    title: "Total Employees",
    value: 250,
    color: "#2563eb",
  },
  {
    title: "Active Employees",
    value: 230,
    color: "#16a34a",
  },
  {
    title: "Departments",
    value: 8,
    color: "#9333ea",
  },
  {
    title: "New Employees",
    value: 15,
    color: "#ea580c",
  },
];

const hiringData = [
  { month: "Jan", employees: 10 },
  { month: "Feb", employees: 15 },
  { month: "Mar", employees: 12 },
  { month: "Apr", employees: 20 },
  { month: "May", employees: 18 },
  { month: "Jun", employees: 25 },
];

const departmentData = [
  { name: "IT", value: 100 },
  { name: "HR", value: 30 },
  { name: "Finance", value: 45 },
  { name: "Sales", value: 75 },
];

const COLORS = ["#2563eb", "#16a34a", "#9333ea", "#ea580c"];

const recentEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    department: "IT",
    designation: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    department: "HR",
    designation: "HR Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    department: "Finance",
    designation: "Accountant",
    status: "Inactive",
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome back! Here is your employee overview.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {employeeStats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <p>{stat.title}</p>
            <h2 style={{ color: stat.color }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Employee Hiring Overview</h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hiringData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="employees" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Department Distribution</h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={departmentData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {departmentData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="recent-employees">
        <h3>Recent Employees</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>
                  <span
                    className={
                      employee.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
