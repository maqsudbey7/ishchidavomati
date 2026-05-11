import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { useEmployees } from "../../store/employeeStore";

export default function Salary() {
  const user = useUser();
  const { employees } = useEmployees();

  const formatUZS = (value) =>
    new Intl.NumberFormat("uz-UZ").format(value) + " so'm";

  if (!user) return null;

  const employee = employees.find((e) => e.id === user.id);

  if (!employee) {
    return (
      <div className="p-6 text-slate-300">
        Employee topilmadi
      </div>
    );
  }

  const attendance = employee.attendance || [];

  let totalHours = 0;

  attendance.forEach((d) => {
    if (d.checkIn && d.checkOut) {
      const inTime = new Date(`2024-01-01 ${d.checkIn}`);
      const outTime = new Date(`2024-01-01 ${d.checkOut}`);

      totalHours += (outTime - inTime) / 1000 / 60 / 60;
    }
  });

  const salary = totalHours * employee.salaryPerHour;
  const bonus = employee.bonus || 0;
  const fine = employee.fine || 0;
  const finalSalary = salary + bonus - fine;

  return (
    <EmployeeLayout title="Oylik">

      <div className="p-4 md:p-6 space-y-6">

        {/* HEADER */}
        <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 md:p-6">
          <h2 className="text-white text-xl font-bold">
            {employee.name}
          </h2>
          <p className="text-slate-400 text-sm">
            {employee.position}
          </p>
        </div>

        {/* GRID (DESKTOP 2 COL / MOBILE 1 COL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
            <span className="text-slate-400">Jami soat</span>
            <span className="text-white font-bold">
              {totalHours.toFixed(2)} h
            </span>
          </div>

          <div className="bg-slate-800 rounded-xl p-4 flex justify-between">
            <span className="text-slate-400">Soatlik maosh</span>
            <span className="text-white font-bold">
              {formatUZS(employee.salaryPerHour)}
            </span>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex justify-between">
            <span className="text-emerald-400">Bonus</span>
            <span className="text-emerald-300 font-bold">
              +{formatUZS(bonus)}
            </span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex justify-between">
            <span className="text-red-400">Jarima</span>
            <span className="text-red-300 font-bold">
              -{formatUZS(fine)}
            </span>
          </div>

        </div>

        {/* FINAL SALARY HERO */}
        <div className="bg-gradient-to-r from-blue-600/20 to-emerald-500/20 border border-slate-700 rounded-2xl p-6 text-center shadow-xl">

          <p className="text-slate-300 text-sm">
            Yakuniy oylik
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
            {formatUZS(finalSalary)}
          </h1>

          <p className="text-slate-400 text-xs mt-2">
            soat + bonus - jarima
          </p>

        </div>

      </div>

    </EmployeeLayout>
  );
} 