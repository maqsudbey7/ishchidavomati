import { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";

import AddEmployeeModal from "../../components/forms/AddEmployeeModal";
import EditEmployeeModal from "../../components/forms/EditEmployeeModal";

export default function Employees() {
  const { employees, setEmployees } =
    useEmployees();

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [search, setSearch] =
    useState("");

  // SEARCH
  const filteredEmployees = employees.filter(
    (e) =>
      e.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // DELETE
  const deleteEmployee = (id) => {
    const confirmDelete = window.confirm(
      "Xodimni o‘chirmoqchimisiz?"
    );

    if (!confirmDelete) return;

    const updated = employees.filter(
      (e) => e.id !== id
    );

    setEmployees(updated);
  };

  return (
    <AdminLayout title="Xodimlar">

      <div className="space-y-5">

        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Xodimlar
            </h1>

            <p className="text-slate-400 text-sm">
              Barcha ishchilar ro‘yxati
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-5 py-3 rounded-2xl font-medium"
          >
            <FiPlus />
            Xodim qo‘shish
          </button>

        </div>

        {/* SEARCH */}
        <div className="relative">

          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Xodim qidirish..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-[350px] bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 transition"
          />

        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-800/60 text-slate-400 text-sm">

                <tr>
                  <th className="p-4 text-left">Ism</th>
                  <th className="p-4 text-left">Lavozim</th>
                  <th className="p-4 text-left">Maosh</th>
                  <th className="p-4 text-left">Bonus</th>
                  <th className="p-4 text-left">Jarima</th>
                  <th className="p-4 text-left">Holat</th>
                  <th className="p-4 text-left">Amal</th>
                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                  >

                    <td className="p-4 font-medium">
                      {e.name}
                    </td>

                    <td className="p-4 text-slate-300">
                      {e.position}
                    </td>

                    <td className="p-4">
                      {new Intl.NumberFormat(
                        "uz-UZ"
                      ).format(e.salaryPerHour)}{" "}
                      so'm
                    </td>

                    <td className="p-4 text-emerald-400">
                      +{e.bonus}
                    </td>

                    <td className="p-4 text-red-400">
                      -{e.fine}
                    </td>

                    <td className="p-4">
                      <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">
                        Faol
                      </span>
                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setSelectedEmployee(e)
                          }
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition"
                        >
                          <FiEdit2 />
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteEmployee(e.id)
                          }
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
                        >
                          <FiTrash2 />
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">

          {filteredEmployees.map((e) => (
            <div
              key={e.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-lg">
                    {e.name}
                  </h2>

                  <p className="text-slate-400 text-sm">
                    {e.position}
                  </p>
                </div>

                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">
                  Faol
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-slate-400">
                    Maosh
                  </p>

                  <p className="font-bold">
                    {new Intl.NumberFormat(
                      "uz-UZ"
                    ).format(e.salaryPerHour)}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-slate-400">
                    Bonus
                  </p>

                  <p className="font-bold text-emerald-400">
                    +{e.bonus}
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-slate-400">
                    Jarima
                  </p>

                  <p className="font-bold text-red-400">
                    -{e.fine}
                  </p>
                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() =>
                    setSelectedEmployee(e)
                  }
                  className="flex-1 bg-blue-600 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FiEdit2 />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteEmployee(e.id)
                  }
                  className="flex-1 bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FiTrash2 />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <AddEmployeeModal
          closeModal={() =>
            setShowAddModal(false)
          }
        />
      )}

      {/* EDIT MODAL */}
      {selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          closeModal={() =>
            setSelectedEmployee(null)
          }
        />
      )}

    </AdminLayout>
  );
}