import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { useEmployees } from "../../store/employeeStore";
import { useState } from "react";

export default function Salary() {
  const user = useUser();
  const { employees } = useEmployees();

  const [selectedMonth, setSelectedMonth] =
    useState(new Date().getMonth());

  const formatUZS = (v) =>
    new Intl.NumberFormat("uz-UZ").format(
      Math.round(v || 0)
    ) + " so'm";

  if (!user) return null;

  const employee = employees.find(
    (e) => e.username === user.username
  );

  if (!employee) {
    return (
      <EmployeeLayout title="Oylik">
        <div className="p-6 text-white">
          Employee topilmadi
        </div>
      </EmployeeLayout>
    );
  }

  const attendance = employee.attendance || [];

  const currentAttendance = attendance.filter((a) => {
    if (!a.date) return false;
    const d = new Date(a.date);
    return d.getMonth() === selectedMonth;
  });

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [h = 0, m = 0] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const startTime = Number(employee.startTime || 9);
  const endTime = Number(employee.endTime || 18);
  const requiredHoursPerDay = endTime - startTime;

  let totalWorkedMinutes = 0;
  let overtimeHours = 0;
  let fullWorkedDays = 0;
  let missingHours = 0;

  currentAttendance.forEach((d) => {
    if (d.checkIn && d.checkOut) {
      const inMin = timeToMinutes(d.checkIn);
      const outMin = timeToMinutes(d.checkOut);

      let diff = outMin - inMin;
      if (diff < 0) diff += 24 * 60;

      const workedHours = diff / 60;
      totalWorkedMinutes += diff;

      if (workedHours >= requiredHoursPerDay * 0.8) {
        fullWorkedDays += 1;
      }

      if (workedHours < requiredHoursPerDay) {
        missingHours += requiredHoursPerDay - workedHours;
      }

      if (workedHours > requiredHoursPerDay) {
        overtimeHours += workedHours - requiredHoursPerDay;
      }
    }
  });

  const totalWorkedHours = totalWorkedMinutes / 60;
  const workedDays = totalWorkedHours / requiredHoursPerDay;

  const salaryType = employee.salaryType || "monthly";
  const baseSalary = Number(employee.salaryAmount || 0);

  let totalSalary = 0;
  let formulaText = "";

  if (salaryType === "monthly") {
    const requiredMonthlyHours = requiredHoursPerDay * 30;
    totalSalary = baseSalary * (totalWorkedHours / requiredMonthlyHours);

    formulaText = `
${totalWorkedHours.toFixed(1)}h / ${requiredMonthlyHours}h × ${formatUZS(baseSalary)}
`;
  }

  if (salaryType === "weekly") {
    const requiredWeeklyHours = requiredHoursPerDay * 7;
    totalSalary = baseSalary * (totalWorkedHours / requiredWeeklyHours);

    formulaText = `
${totalWorkedHours.toFixed(1)}h / ${requiredWeeklyHours}h × ${formatUZS(baseSalary)}
`;
  }

  if (salaryType === "daily") {
    totalSalary = workedDays * baseSalary;

    formulaText = `
${workedDays.toFixed(2)} kun × ${formatUZS(baseSalary)}
`;
  }

  const overtimeRate =
    baseSalary / (requiredHoursPerDay * 30);

  const overtimePay = overtimeHours * overtimeRate;

  const bonus = Number(employee.bonus || 0);
  const fine = Number(employee.fine || 0);

  const finalSalary =
    totalSalary + overtimePay + bonus - fine;

  const remainingSalary =
    baseSalary - finalSalary;

  const progress = (finalSalary / baseSalary) * 100;

  const today = new Date().toISOString().slice(0, 10);

  const todayAttendance = currentAttendance.find(
    (a) => a.date === today
  );

  let todayWorkedHours = 0;

  if (
    todayAttendance?.checkIn &&
    todayAttendance?.checkOut
  ) {
    const inMin = timeToMinutes(todayAttendance.checkIn);
    const outMin = timeToMinutes(todayAttendance.checkOut);
    todayWorkedHours = (outMin - inMin) / 60;
  }

  let todayStatus = "⏳ Ish tugamagan";

  if (todayWorkedHours >= requiredHoursPerDay) {
    todayStatus = "✅ To‘liq kun";
  } else if (todayWorkedHours > 0) {
    todayStatus = "⚠️ Erta ketgan";
  }

  const months = [
    "Yanvar","Fevral","Mart","Aprel","May","Iyun",
    "Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"
  ];

  return (
    <EmployeeLayout title="Oylik">

      {/* PAGE WRAPPER */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-10 py-4 space-y-5 md:space-y-6">

        {/* HEADER */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {employee.name}
              </h1>
              <p className="text-slate-400 mt-1">
                {employee.position}
              </p>
            </div>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(Number(e.target.value))
              }
              className="w-full sm:w-auto bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* TODAY + PROGRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
            <p className="text-slate-400 text-sm">Bugungi holat</p>

            <h2 className="text-white text-xl sm:text-2xl font-bold mt-2">
              {todayStatus}
            </h2>

            <p className="text-slate-400 mt-2">
              {todayAttendance?.checkIn || "--:--"} →{" "}
              {todayAttendance?.checkOut || "--:--"}
            </p>

            <p className="text-blue-400 text-sm mt-2">
              Bugun ishladi: {todayWorkedHours.toFixed(1)} S
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">

            <div className="flex justify-between text-sm mb-3">
              <span className="text-slate-400">Progress</span>
              <span className="text-white">
                {Math.min(progress, 100).toFixed(0)}%
              </span>
            </div>

            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <p className="text-slate-500 text-xs mt-3">
              {formulaText}
            </p>

          </div>

        </div>

        {/* STATS + FINANCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* WORK */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
            <h2 className="text-white font-bold">Ish statistikasi</h2>

            <p className="text-white text-2xl font-bold">
              {totalWorkedHours.toFixed(1)} S
            </p>

            <div className="flex justify-between text-sm text-slate-400">
              <span>To‘liq kun</span>
              <span>{fullWorkedDays}</span>
            </div>

            <div className="flex justify-between text-sm text-orange-400">
              <span>Yetmagan</span>
              <span>{missingHours.toFixed(1)} S</span>
            </div>

            <div className="flex justify-between text-sm text-blue-400">
              <span>Qoshimcha ish</span>
              <span>{overtimeHours.toFixed(1)} S</span>
            </div>
          </div>

          {/* FINANCE */}
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
            <h2 className="text-white font-bold">Moliyaviy</h2>

            <p className="text-white text-2xl font-bold">
              {formatUZS(finalSalary)}
            </p>

            <div className="flex justify-between text-sm text-emerald-400">
              <span>Bonus</span>
              <span>+{formatUZS(bonus)}</span>
            </div>

            <div className="flex justify-between text-sm text-red-400">
              <span>Jarima</span>
              <span>-{formatUZS(fine)}</span>
            </div>

            <div className="flex justify-between text-sm text-blue-400">
              <span>Qoshimcha ish</span>
              <span>+{formatUZS(overtimePay)}</span>
            </div>

            <div className="flex justify-between text-sm border-t border-slate-700 pt-2 text-purple-400">
              <span>Qolgan</span>
              <span>{formatUZS(Math.max(remainingSalary, 0))}</span>
            </div>
          </div>

        </div>

        {/* MONTH SUMMARY */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5">
          <h2 className="text-white text-xl font-bold">
            {months[selectedMonth]} hisoboti
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4">

            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs">Jami soat</p>
              <p className="text-white font-bold">{totalWorkedHours.toFixed(1)} S</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs">To‘liq kun</p>
              <p className="text-white font-bold">{fullWorkedDays}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs">Yetmagan</p>
              <p className="text-orange-400 font-bold">{missingHours.toFixed(1)} S</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-3">
              <p className="text-slate-400 text-xs">Qoshimcha ish</p>
              <p className="text-blue-400 font-bold">{overtimeHours.toFixed(1)} S</p>
            </div>

          </div>

        </div>

      </div>
    </EmployeeLayout>
  );
}