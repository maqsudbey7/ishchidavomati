import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiClock,
} from "react-icons/fi";
import useUser from "../../hooks/useUser";

import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";

import AddEmployeeModal from "../../components/forms/AddEmployeeModal";
import EditEmployeeModal from "../../components/forms/EditEmployeeModal";

export default function Employees() {
  const { employees, setEmployees } = useEmployees();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");



const user = useUser();

const filteredEmployees = employees.filter(
  (e) =>
    e.company === user.company &&
    e.name?.toLowerCase().includes(search.toLowerCase())
);

  const deleteEmployee = (id) => {
    if (!window.confirm("O‘chirasizmi?")) return;
    setEmployees(employees.filter((e) => e.id !== id));
  };

  // 💡 salary type label
  const getSalaryTypeLabel = (type) => {
    if (type === "daily") return "K";
    if (type === "weekly") return "H";
    if (type === "monthly") return "O";
    return "";
  };

  return (
    <AdminLayout title="Xodimlar">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">Xodimlar</h1>
            <p className="text-slate-400 text-sm">
              HR boshqaruv paneli
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 px-5 py-3 rounded-2xl flex items-center gap-2"
          >
            <FiPlus />
            Yangi xodim
          </button>

        </div>

        {/* SEARCH */}
        <div className="relative">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Xodim qidirish..."
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12"
          />

        </div>

        {/* TABLE */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-800 text-slate-400">
              <tr>
                <th className="p-4 text-left">Ism</th>
                <th className="p-4 text-left">Lavozim</th>
                <th className="p-4 text-left">Maosh</th>
                <th className="p-4 text-left">Ish vaqti</th>
                <th className="p-4 text-left">Parol</th>
                <th className="p-4 text-left">Amal</th>
              </tr>
            </thead>

            <tbody>

              {filteredEmployees.map((e) => (
                <tr
                  key={e.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >

                  {/* NAME */}
                  <td className="p-4 font-medium">
                    {e.name || "-"}
                  </td>

                  {/* POSITION */}
                  <td className="p-4 text-slate-300">
                    {e.position || "-"}
                  </td>

                  {/* SALARY */}
                  <td className="p-4 text-emerald-400 whitespace-nowrap">
                    {Number(e.salary || 0).toLocaleString("uz-UZ")} so‘m{" "}
                    <span className="text-slate-400">
                      ({getSalaryTypeLabel(e.salaryType)})
                    </span>
                  </td>

                  {/* WORK TIME */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-xl text-sm">
                      <FiClock />
                      {e.startTime ?? "-"}:00 → {e.endTime ?? "-"}:00
                      <span className="text-slate-400">
                        ({e.workHours || 0} soat)
                      </span>
                    </span>
                  </td>

                  {/* PASSWORD */}
                  <td className="p-4 text-yellow-400 font-mono">
                    {e.password || "-"}
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => setSelectedEmployee(e)}
                        className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => deleteEmployee(e.id)}
                        className="bg-red-600 p-2 rounded-lg hover:bg-red-700"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-4">

          {filteredEmployees.map((e) => (
            <div
              key={e.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
            >

              <div className="flex justify-between">

                <div>
                  <h2 className="font-bold">{e.name}</h2>
                  <p className="text-slate-400 text-sm">
                    {e.position}
                  </p>
                </div>

              </div>

              <div className="text-sm space-y-1">

                <div>
                  💰 {Number(e.salary || 0).toLocaleString()} so‘m{" "}
                  <span className="text-slate-400">
                    ({getSalaryTypeLabel(e.salaryType)})
                  </span>
                </div>

                <div>
                  ⏰ {e.startTime ?? "-"}:00 → {e.endTime ?? "-"}:00
                </div>

                <div>
                  ⏱ {e.workHours || 0} soat
                </div>

                <div className="text-yellow-400">
                  🔐 {e.password}
                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => setSelectedEmployee(e)}
                  className="flex-1 bg-blue-600 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteEmployee(e.id)}
                  className="flex-1 bg-red-600 py-2 rounded-xl"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* MODALS */}
      {showAddModal && (
        <AddEmployeeModal
          closeModal={() => setShowAddModal(false)}
        />
      )}

      {selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          closeModal={() => setSelectedEmployee(null)}
        />
      )}

    </AdminLayout>
  );
}