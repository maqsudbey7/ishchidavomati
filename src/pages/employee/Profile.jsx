import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { useEmployees } from "../../store/employeeStore";
import { FiClock, FiUser, FiBriefcase } from "react-icons/fi";

export default function Profile() {
  const user = useUser();
  const { employees } = useEmployees();

  if (!user) {
    return (
      <EmployeeLayout title="Profil">
        <h1 className="text-white">Foydalanuvchi topilmadi</h1>
      </EmployeeLayout>
    );
  }

  // ✅ user -> employee
  const employee = employees.find(
    (e) => e.username === user.username
  );

  if (!employee) {
    return (
      <EmployeeLayout title="Profil">
        <div className="text-white p-6">
          Employee topilmadi
        </div>
      </EmployeeLayout>
    );
  }

  // ⏰ WORK HOURS CALC
  const workHours =
    (employee.endTime || 0) - (employee.startTime || 0);

  return (
    <EmployeeLayout title="Profil">

      <div className="max-w-3xl mx-auto p-4">

        {/* PROFILE CARD */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl">

          {/* HEADER */}
          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
              {employee.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                {employee.name}
              </h1>

              <p className="text-slate-400 flex items-center gap-2">
                <FiBriefcase />
                {employee.position}
              </p>
            </div>

          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* USERNAME */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiUser />
                Username
              </div>

              <p className="text-white font-semibold mt-1">
                {employee.username}
              </p>
            </div>

            {/* POSITION */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiBriefcase />
                Lavozim
              </div>

              <p className="text-white font-semibold mt-1">
                {employee.position}
              </p>
            </div>

            {/* WORK HOURS */}
            <div className="sm:col-span-2 bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <FiClock />
                Ish vaqti
              </div>

              <p className="text-white font-semibold mt-1 text-lg">
                {employee.startTime}:00 → {employee.endTime}:00
                <span className="text-blue-400 ml-2">
                  ({workHours} soat)
                </span>
              </p>
            </div>

          </div>

        </div>

      </div>

    </EmployeeLayout>
  );
}