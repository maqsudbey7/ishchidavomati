import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";
import { useEmployees } from "../../store/employeeStore";
import { useState } from "react";
import { useNotifications } from "../../store/notificationStore";

export default function Attendance() {
  const user = useUser();

  const { employees, setEmployees } = useEmployees();
  const { addNotification } = useNotifications();

  const [message, setMessage] = useState("");

  if (!user) return null;

  if (user.role !== "employee") {
    return (
      <EmployeeLayout title="Davomat">
        <div className="text-white p-10 text-center">
          Faqat xodimlar kirishi mumkin
        </div>
      </EmployeeLayout>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const employeeIndex = employees.findIndex((e) => e.id === user.id);
  const employee = employees[employeeIndex];

  if (!employee) {
    return (
      <EmployeeLayout title="Davomat">
        <div className="text-white p-10 text-center">
          Xodim topilmadi
        </div>
      </EmployeeLayout>
    );
  }

  const todayAttendance = employee.attendance?.find(
    (a) => a.date === today
  );

  const updateEmployee = (attendance) => {
    const updated = [...employees];

    updated[employeeIndex] = {
      ...employee,
      attendance,
    };

    setEmployees(updated);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const checkIn = () => {
    const now = new Date().toLocaleTimeString();

    const updatedAttendance = [...(employee.attendance || [])];

    const todayIndex = updatedAttendance.findIndex(
      (a) => a.date === today
    );

    if (todayIndex !== -1 && updatedAttendance[todayIndex].checkIn) {
      return showMessage("Siz bugun allaqachon kelgansiz");
    }

    const status = now <= "09:00:00" ? "present" : "late";

    if (todayIndex === -1) {
      updatedAttendance.push({
        date: today,
        checkIn: now,
        checkOut: "",
        status,
      });
    } else {
      updatedAttendance[todayIndex].checkIn = now;
    }

    updateEmployee(updatedAttendance);

    addNotification(`${user.name} ishga keldi`, "success");
    showMessage("Keldim saqlandi");
  };

  const checkOut = () => {
    const now = new Date().toLocaleTimeString();

    const updatedAttendance = [...(employee.attendance || [])];

    const todayIndex = updatedAttendance.findIndex(
      (a) => a.date === today
    );

    if (todayIndex === -1) {
      return showMessage("Avval Keldim tugmasini bosing");
    }

    if (updatedAttendance[todayIndex].checkOut) {
      return showMessage("Siz bugun chiqib bo‘lgansiz");
    }

    updatedAttendance[todayIndex].checkOut = now;

    updateEmployee(updatedAttendance);

    addNotification(`${user.name} ishdan chiqdi`, "warning");
    showMessage("Ketdim saqlandi");
  };

  const statusColor =
    todayAttendance?.status === "present"
      ? "from-green-500 to-green-700"
      : todayAttendance?.status === "late"
      ? "from-yellow-500 to-orange-500"
      : "from-slate-600 to-slate-700";

  return (
    <EmployeeLayout title="Davomat">

      {/* BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4 py-6">

        {/* TOAST */}
        {message && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm shadow-lg z-50">
            {message}
          </div>
        )}

        <div className="max-w-md mx-auto space-y-6">

          {/* HEADER CARD */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl text-center shadow-xl">
            <h1 className="text-xl font-bold text-white">
              Bugungi Davomat
            </h1>
            <p className="text-slate-400 text-sm">
              {today}
            </p>
          </div>

          {/* BUTTON CARD */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl space-y-4">

            <button
              onClick={checkIn}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition"
            >
              🟢 Keldim
            </button>

            <button
              onClick={checkOut}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold active:scale-95 transition"
            >
              🔴 Ketdim
            </button>

          </div>

          {/* STATUS CARD */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl shadow-xl space-y-3">

            <h2 className="text-white font-semibold text-center">
              Bugungi holat
            </h2>

            <div className="text-sm text-slate-300 space-y-2">

              <p>Keldi: {todayAttendance?.checkIn || "-"}</p>
              <p>Ketdi: {todayAttendance?.checkOut || "-"}</p>

              <div className="flex items-center gap-2">
                <span>Status:</span>
                <span className={`px-3 py-1 rounded-full text-white text-xs bg-gradient-to-r ${statusColor}`}>
                  {todayAttendance?.status || "kelmagan"}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </EmployeeLayout>
  );
}