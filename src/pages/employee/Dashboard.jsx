import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { calculateSalary } from "../../utils/salary";

export default function Dashboard() {
  const user = useUser();

  const salary = calculateSalary(user);

  return (
    <EmployeeLayout title="Bosh sahifa">

      <div></div>
    </EmployeeLayout>
  );
}