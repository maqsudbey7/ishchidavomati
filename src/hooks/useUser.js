import { useEmployees } from "../store/employeeStore";

export default function useUser() {
  const local = localStorage.getItem("user");

  const localUser = local ? JSON.parse(local) : null;

  const { employees } = useEmployees();

  if (!localUser) return null;

  if (localUser.role === "admin") {
    return localUser;
  }

  return (
    employees.find(
      (e) => e.id === localUser.id
    ) || localUser
  );
}