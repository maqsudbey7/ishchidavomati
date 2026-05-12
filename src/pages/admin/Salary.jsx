import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  Users,
} from "lucide-react";

export default function Salary() {
  const { employees } = useEmployees();

  const totalBonus = employees.reduce(
    (a, b) => a + Number(b.bonus || 0),
    0
  );

  const totalFine = employees.reduce(
    (a, b) => a + Number(b.fine || 0),
    0
  );

  return (
    <AdminLayout title="Salary">
      <div className="p-3 sm:p-5 lg:p-6 space-y-5">
        
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">
                  Xodimlar
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  {employees.length}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <Users size={28} className="text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">
                  Jami bonus
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  {totalBonus}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <TrendingUp
                  size={28}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">
                  Jarimalar
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  {totalFine}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <AlertTriangle
                  size={28}
                  className="text-white"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">
                  O‘rtacha maosh
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                  
                  {employees.length > 0
                    ? Math.floor(
                        employees.reduce(
                          (a, b) =>
                            a +
                            Number(
                              b.salaryPerHour || 0
                            ),
                          0
                        ) / employees.length
                      )
                    : 0}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Wallet
                  size={28}
                  className="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white">
                Xodimlar maoshi
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Barcha xodimlarning ma’lumotlari
              </p>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-300 text-sm">
              {employees.length} ta xodim
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              
              <thead className="bg-slate-800/70 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-5 text-left">
                    Xodim
                  </th>

                  <th className="px-6 py-5 text-left">
                    Soatlik maosh
                  </th>

                  <th className="px-6 py-5 text-left">
                    Bonus
                  </th>

                  <th className="px-6 py-5 text-left">
                    Jarima
                  </th>

                  <th className="px-6 py-5 text-left">
                    Holat
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-14 text-slate-500"
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
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          
                          <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                            {e.name?.charAt(0)}
                          </div>

                          <div>
                            <h3 className="text-white font-semibold">
                              {e.name}
                            </h3>

                            <p className="text-slate-500 text-xs">
                              Employee
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-white font-medium">
                        {e.salaryPerHour}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-medium">
                          +{e.bonus}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 text-xs font-medium">
                          -{e.fine}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {e.fine > 0 ? (
                          <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 text-xs">
                            Jarima bor
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs">
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

        {/* MOBILE CARDS */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          
          {employees.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center text-slate-500">
              Hech qanday xodim topilmadi
            </div>
          ) : (
            employees.map((e) => (
              <div
                key={e.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl"
              >
                
                <div className="flex items-center justify-between">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg font-bold">
                      {e.name?.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-white font-semibold text-lg">
                        {e.name}
                      </h2>

                      <p className="text-slate-500 text-sm">
                        Employee
                      </p>
                    </div>
                  </div>

                  {e.fine > 0 ? (
                    <span className="px-3 py-1 rounded-xl bg-red-500/20 text-red-400 text-xs">
                      Jarima
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs">
                      Active
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-5">
                  
                  <div className="bg-slate-800/60 rounded-2xl p-3 text-center">
                    <p className="text-slate-400 text-xs">
                      Maosh
                    </p>

                    <h3 className="text-white font-bold mt-1">
                      {e.salaryPerHour}
                    </h3>
                  </div>

                  <div className="bg-emerald-500/10 rounded-2xl p-3 text-center">
                    <p className="text-emerald-400 text-xs">
                      Bonus
                    </p>

                    <h3 className="text-emerald-300 font-bold mt-1">
                      +{e.bonus}
                    </h3>
                  </div>

                  <div className="bg-red-500/10 rounded-2xl p-3 text-center">
                    <p className="text-red-400 text-xs">
                      Jarima
                    </p>

                    <h3 className="text-red-300 font-bold mt-1">
                      -{e.fine}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}