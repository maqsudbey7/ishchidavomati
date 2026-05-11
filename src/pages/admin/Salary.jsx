import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";

export default function Salary() {
  const { employees } = useEmployees();

  return (
    <AdminLayout title="Salary">
      <div className="p-6">
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Xodimlar maoshi
            </h2>

            <span className="text-xs text-slate-400">
              Jami: {employees.length}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-300">
              
              <thead className="text-slate-400 uppercase text-xs bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4">Ism</th>
                  <th className="px-6 py-4">Soatlik maosh</th>
                  <th className="px-6 py-4">Bonus</th>
                  <th className="px-6 py-4">Jarima</th>
                  <th className="px-6 py-4">Holat</th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      Hech qanday xodim topilmadi
                    </td>
                  </tr>
                ) : (
                  employees.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {e.name}
                      </td>

                      <td className="px-6 py-4">
                        {e.salaryPerHour}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                          +${e.bonus}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                          -${e.fine}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {e.fine > 0 ? (
                          <span className="text-red-400 text-xs">
                            Jarima bor
                          </span>
                        ) : (
                          <span className="text-green-400 text-xs">
                            Tinch
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}