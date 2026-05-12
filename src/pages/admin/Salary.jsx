import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
  Users,
  Trash2,
} from "lucide-react";

export default function Salary() {
  const { employees, setEmployees } = useEmployees();

  // 🗑 DELETE
  const deleteEmployee = (id) => {
    if (!confirm("Xodimni o‘chirasizmi?")) return;
    setEmployees(employees.filter((e) => e.id !== id));
  };

  // 💰 TOTALS
  const totalBonus = employees.reduce(
    (a, e) => a + Number(e.bonus || 0),
    0
  );

  const totalFine = employees.reduce(
    (a, e) => a + Number(e.fine || 0),
    0
  );

  const totalPayroll = employees.reduce((a, e) => {
    return (
      a +
      Number(e.salaryAmount || 0) +
      Number(e.bonus || 0) -
      Number(e.fine || 0)
    );
  }, 0);

  // 🏷 TYPE LABEL
  const getType = (type) => {
    if (type === "daily") return "K";
    if (type === "weekly") return "H";
    if (type === "monthly") return "O";
    return "-";
  };

  return (
    <AdminLayout title="Ish haqi">
      <div className="p-3 sm:p-5 lg:p-6 space-y-6">

        {/* ================= TOP STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          <Card title="Xodimlar" value={employees.length} icon={<Users />} color="indigo" />
          <Card title="Bonus" value={totalBonus} icon={<TrendingUp />} color="emerald" />
          <Card title="Jarima" value={totalFine} icon={<AlertTriangle />} color="red" />
          <Card title="Jami to‘lov" value={totalPayroll} icon={<Wallet />} color="slate" />

        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

          <div className="p-5 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">
              Xodimlar maoshi
            </h2>
            <p className="text-slate-400 text-sm">
              NET = Asosiy + Bonus − Jarima
            </p>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Xodim</th>
                <th className="p-4 text-left">Turi</th>
                <th className="p-4 text-left">Asosiy</th>
                <th className="p-4 text-left">Bonus</th>
                <th className="p-4 text-left">Jarima</th>
                <th className="p-4 text-left">NET</th>
                <th className="p-4 text-left">Amal</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((e) => {
                const base = Number(e.salaryAmount || 0);
                const bonus = Number(e.bonus || 0);
                const fine = Number(e.fine || 0);
                const net = base + bonus - fine;

                return (
                  <tr
                    key={e.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition"
                  >
                    <td className="p-4 text-white font-medium">
                      {e.name}
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg bg-slate-800 text-white text-xs">
                        {getType(e.salaryType)}
                      </span>
                    </td>

                    <td className="p-4 text-white">
                      {base.toLocaleString()}
                    </td>

                    <td className="p-4 text-emerald-400">
                      +{bonus.toLocaleString()}
                    </td>

                    <td className="p-4 text-red-400">
                      -{fine.toLocaleString()}
                    </td>

                    <td className="p-4 text-yellow-400 font-bold">
                      {net.toLocaleString()}
                    </td>

                    {/* DELETE */}
                    <td className="p-4">
                      <button
                        onClick={() => deleteEmployee(e.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                      >
                        <Trash2 size={16} />
                        O‘chirish
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">

          {employees.map((e) => {
            const base = Number(e.salaryAmount || 0);
            const bonus = Number(e.bonus || 0);
            const fine = Number(e.fine || 0);
            const net = base + bonus - fine;

            return (
              <div
                key={e.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4"
              >

                <div className="flex justify-between">
                  <div>
                    <h2 className="text-white font-bold text-lg">
                      {e.name}
                    </h2>
                    <span className="text-slate-400 text-sm">
                      {getType(e.salaryType)}
                    </span>
                  </div>

                  <div className="text-yellow-400 font-bold">
                    {net.toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-slate-800 p-3 rounded-xl text-center">
                    <p className="text-slate-400 text-xs">Asosiy</p>
                    {base.toLocaleString()}
                  </div>

                  <div className="bg-emerald-500/10 p-3 rounded-xl text-center">
                    <p className="text-emerald-400 text-xs">Bonus</p>
                    +{bonus.toLocaleString()}
                  </div>

                  <div className="bg-red-500/10 p-3 rounded-xl text-center">
                    <p className="text-red-400 text-xs">Jarima</p>
                    -{fine.toLocaleString()}
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteEmployee(e.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/20 text-red-400"
                >
                  <Trash2 size={16} />
                  O‘chirish
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </AdminLayout>
  );
}

/* ================= CARD ================= */
function Card({ title, value, icon, color }) {
  const colors = {
    indigo: "from-indigo-600 to-indigo-800",
    emerald: "from-emerald-500 to-emerald-700",
    red: "from-red-500 to-red-700",
    slate: "from-slate-700 to-slate-900",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} rounded-3xl p-5 shadow-xl`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm">{title}</p>
          <h2 className="text-3xl font-bold text-white mt-1">
            {value.toLocaleString?.() ?? value}
          </h2>
        </div>
        <div className="text-white">{icon}</div>
      </div>
    </div>
  );
}