import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import AdminDashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import Salary from "../pages/admin/Salary";

import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeAttendance from "../pages/employee/Attendance";
import EmployeeSalary from "../pages/employee/Salary";
import Profile from "../pages/employee/Profile";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/employees" element={<Employees />} />
      <Route path="/admin/salary" element={<Salary />} />

      {/* EMPLOYEE */}
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/employee/attendance" element={<EmployeeAttendance />} />
      <Route path="/employee/salary" element={<EmployeeSalary />} />
      <Route path="/employee/profile" element={<Profile />} />

    </Routes>
  );
}