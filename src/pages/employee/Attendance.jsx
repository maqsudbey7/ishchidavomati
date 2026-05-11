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
          Faqat employee kiradi
        </div>
      </EmployeeLayout>
    );
  }

  const today = new Date().toISOString().slice(0, 10);

  const employeeIndex = employees.findIndex((e) => e.id === user.id);
  const employee = employees[employeeIndex] || { attendance: [] };

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
    setTimeout(() => setMessage(""), 2000);
  };

  const checkIn = () => {
    const now = new Date().toLocaleTimeString();

    const updatedAttendance = [...employee.attendance];

    const todayIndex = updatedAttendance.findIndex(
      (a) => a.date === today
    );

    if (todayIndex !== -1 && updatedAttendance[todayIndex].checkIn) {
      return showMessage("Siz bugun allaqachon kelgansiz");
    }

    const status = now <= "09:00:00" ? "present" : "late";

    updatedAttendance.push({
      date: today,
      checkIn: now,
      checkOut: "",
      status,
    });

    updateEmployee(updatedAttendance);

    addNotification(`${user.name} ishga keldi`, "success");
    showMessage("Keldim saqlandi");
  };

  const checkOut = () => {
    const now = new Date().toLocaleTimeString();

    const updatedAttendance = [...employee.attendance];

    const todayIndex = updatedAttendance.findIndex(
      (a) => a.date === today
    );

    if (todayIndex === -1) return showMessage("Avval Keldim bosing");

    if (updatedAttendance[todayIndex].checkOut) {
      return showMessage("Siz chiqib bo‘lgansiz");
    }

    updatedAttendance[todayIndex].checkOut = now;

    updateEmployee(updatedAttendance);

    addNotification(`${user.name} ishdan chiqdi`, "warning");
    showMessage("Ketdim saqlandi");
  };

  return (
    <EmployeeLayout title="Davomat">

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">
            Bugungi Davomat
          </h1>
          <p className="text-slate-400 text-sm">
            {today}
          </p>
        </div>

        {/* MESSAGE (TOAST STYLE) */}
        {message && (
          <div className="bg-slate-900 border border-slate-700 text-white text-center py-2 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* MAIN CARD */}
        <div className="bg-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">

          {/* STATUS SECTION */}
          <div className="flex justify-between items-center">

            <div>
              <p className="text-white font-bold text-xl">Holati</p>
              {/* <p className="text-white font-semibold text-lg">
                {todayAttendance?.status || "Kelmagan"}
              </p> */}
            </div>

            <div
              className={`px-4 py-1 rounded-full text-sm text-white ${
                todayAttendance?.status === "Hozir"
                  ? "bg-green-600"
                  : todayAttendance?.status === "Kech"
                  ? "bg-yellow-500"
                  : "bg-slate-600"
              }`}
            >
              {todayAttendance?.status || "Kelmagan"}
            </div>

          </div>

          {/* TIME INFO */}
          <div className="grid grid-cols-2 gap-3">

            <div className="bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-400 text-xs">Keldi</p>
              <p className="text-white font-semibold">
                {todayAttendance?.checkIn || "-"}
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl">
              <p className="text-slate-400 text-xs">Ketdi</p>
              <p className="text-white font-semibold">
                {todayAttendance?.checkOut || "-"}
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={checkIn}
              className="bg-green-600 hover:bg-green-700 transition py-3 rounded-xl font-semibold"
            >
              Keldim
            </button>

            <button
              onClick={checkOut}
              className="bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
            >
              Ketdim
            </button>

          </div>

        </div>

      </div>

    </EmployeeLayout>
  );
}