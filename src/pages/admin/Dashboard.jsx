import AdminLayout from "../../layouts/AdminLayout";
import { useEmployees } from "../../store/employeeStore";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getToday } from "../../utils/date";

export default function Dashboard() {
  const { employees } = useEmployees();

  const today = getToday();

  let present = 0;
  let late = 0;
  let absent = 0;

  employees.forEach((emp) => {
    const record = emp.attendance.find(
      (a) => a.date === today
    );

    if (!record || !record.checkIn) {
      absent++;
    } else if (record.status === "late") {
      late++;
    } else {
      present++;
    }
  });

  const pieData = [
    { name: "Hozirgi", value: present },
    { name: "Kechikish", value: late },
    { name: "Kelmagan", value: absent },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  // dummy weekly data
  const barData = [
    { name: "Mon", present: 5, late: 2, absent: 1 },
    { name: "Tue", present: 6, late: 1, absent: 1 },
    { name: "Wed", present: 4, late: 3, absent: 1 },
    { name: "Thu", present: 7, late: 1, absent: 0 },
    { name: "Fri", present: 5, late: 2, absent: 1 },
  ];

  return (
    <AdminLayout title="Boshqaruv paneli">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-green-600 p-5 rounded-2xl">
          <h2>Hozirgi</h2>
          <p className="text-3xl font-bold">{present}</p>
        </div>

        <div className="bg-yellow-600 p-5 rounded-2xl">
          <h2>Kechikish</h2>
          <p className="text-3xl font-bold">{late}</p>
        </div>

        <div className="bg-red-600 p-5 rounded-2xl">
          <h2>Kelmagan</h2>
          <p className="text-3xl font-bold">{absent}</p>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* PIE CHART */}
        <div className="bg-slate-800 p-5 rounded-2xl">

          <h2 className="mb-3 font-bold">
            Bugungi holat
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
              >

                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* BAR CHART */}
        <div className="bg-slate-800 p-5 rounded-2xl">

          <h2 className="mb-3 font-bold">
            Haftalik statistika
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={barData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="present" fill="#22c55e" />
              <Bar dataKey="late" fill="#eab308" />
              <Bar dataKey="absent" fill="#ef4444" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </AdminLayout>
  );
}