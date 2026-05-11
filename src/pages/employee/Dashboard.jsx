import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { calculateSalary } from "../../utils/salary";

export default function Dashboard() {
  const user = useUser();

  const salary = calculateSalary(user);

  return (
    <EmployeeLayout title="Bosh sahifa">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-slate-800 p-5 rounded-2xl">
          <p className="text-slate-400">
            Umumiy maosh
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {salary.toLocaleString()}
          </h1>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl">
          <p className="text-slate-400">
            Bonus
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {user.bonus}
          </h1>
        </div>

        <div className="bg-slate-800 p-5 rounded-2xl">
          <p className="text-slate-400">
            Jarima
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {user.fine}
          </h1>
        </div>

      </div>

    </EmployeeLayout>
  );
}