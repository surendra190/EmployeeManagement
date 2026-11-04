export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "Active" | "Inactive";
}

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@company.com",
    department: "IT",
    designation: "Frontend Developer",
    joiningDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@company.com",
    department: "HR",
    designation: "HR Manager",
    joiningDate: "2023-06-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@company.com",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "2022-11-20",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Neha Verma",
    email: "neha@company.com",
    department: "IT",
    designation: "Backend Developer",
    joiningDate: "2024-03-12",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikas Gupta",
    email: "vikas@company.com",
    department: "Sales",
    designation: "Sales Executive",
    joiningDate: "2023-09-05",
    status: "Active",
  },
  {
    id: 6,
    name: "Anjali Mehta",
    email: "anjali@company.com",
    department: "IT",
    designation: "QA Engineer",
    joiningDate: "2024-05-01",
    status: "Inactive",
  },
];
