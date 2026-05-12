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

  // 🟢 LOCAL DATE (UZ TIMEGA YAQIN)
  const today = new Date().toLocaleDateString("en-CA");

  const employeeIndex = employees.findIndex(
    (e) => e.id === user.id
  );

  const employee = employees[employeeIndex];

  if (!employee) {
    return (
      <EmployeeLayout title="Davomat">
        <div className="text-white p-10 text-center">
          Employee topilmadi
        </div>
      </EmployeeLayout>
    );
  }

  const attendance = employee.attendance || [];

  const todayAttendance = attendance.find(
    (a) => a.date === today
  );

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const updateEmployee = (newAttendance) => {
    const updated = [...employees];

    updated[employeeIndex] = {
      ...employee,
      attendance: newAttendance,
    };

    setEmployees(updated);
  };

  // 🟢 STATUS FUNCTION (09:00–18:00)
  const getStatus = (time) => {
    const hour = Number(time.split(":")[0]);

    if (hour < 9) return "Erta";
    if (hour <= 18) return "Hozir";
    return "Kech";
  };

  // ================= CHECK IN =================
  const checkIn = () => {
    const now = new Date().toLocaleTimeString("uz-UZ", {
      hour12: false,
    });

    const updated = [...attendance];

    const index = updated.findIndex(
      (a) => a.date === today
    );

    if (index !== -1 && updated[index].checkIn) {
      return showMessage("Siz bugun allaqachon kelgansiz");
    }

    const status = getStatus(now);

    updated.push({
      date: today,
      checkIn: now,
      checkOut: "",
      status,
    });

    updateEmployee(updated);

    addNotification(`${user.name} ishga keldi`, "success");
    showMessage("Keldim saqlandi");
  };

  // ================= CHECK OUT =================
  const checkOut = () => {
    const now = new Date().toLocaleTimeString("uz-UZ", {
      hour12: false,
    });

    const updated = [...attendance];

    const index = updated.findIndex(
      (a) => a.date === today
    );

    if (index === -1) {
      return showMessage("Avval Keldim bosing");
    }

    if (updated[index].checkOut) {
      return showMessage("Siz chiqib bo‘lgansiz");
    }

    updated[index].checkOut = now;

    updateEmployee(updated);

    addNotification(`${user.name} ishdan chiqdi`, "warning");
    showMessage("Ketdim saqlandi");
  };

  return (
    <EmployeeLayout title="Davomat">

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Bugungi Davomat
          </h1>
          <p className="text-slate-400 text-sm">{today}</p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="bg-slate-900 border border-slate-700 text-white text-center py-2 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* CARD */}
        <div className="bg-slate-800 rounded-3xl p-6 space-y-6">

          {/* STATUS */}
          <div className="flex justify-between items-center">
            <p className="text-white font-bold text-xl">
              Holati
            </p>

            <div className="px-4 py-1 rounded-full text-sm text-white bg-slate-600">
              {todayAttendance?.status || "Kelmagan"}
            </div>
          </div>

          {/* TIME */}
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

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={checkIn}
              className="bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold"
            >
              Keldim
            </button>

            <button
              onClick={checkOut}
              className="bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
            >
              Ketdim
            </button>

          </div>

        </div>

      </div>

    </EmployeeLayout>
  );
}