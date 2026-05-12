import { useState } from "react";
import { useEmployees } from "../../store/employeeStore";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AddEmployeeModal({ closeModal }) {
  const { employees, setEmployees } = useEmployees();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
    position: "",
    salary: "",
    salaryType: "monthly",
    startTime: 9,
    endTime: 18,
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "salary") {
      value = value.replace(/\D/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  // 📅 oy kunlari
  const getDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth();

  // ⏰ ish soatlari
  const workHours = form.endTime - form.startTime || 0;

  // 💰 salary convert (REAL LOGIC)
  let totalSalaryPerMonth = 0;

  if (form.salaryType === "daily") {
    totalSalaryPerMonth = Number(form.salary) * daysInMonth;
  }

  if (form.salaryType === "weekly") {
    totalSalaryPerMonth = Number(form.salary) * 4.33;
  }

  if (form.salaryType === "monthly") {
    totalSalaryPerMonth = Number(form.salary);
  }

  const monthlyWorkHours = workHours * 22;

  const hourlySalary =
    totalSalaryPerMonth && monthlyWorkHours > 0
      ? Math.round(totalSalaryPerMonth / monthlyWorkHours)
      : 0;

  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(password);
  };

  const addEmployee = () => {
    setError("");

    if (
      !form.name ||
      !form.password ||
      !form.position ||
      !form.salary
    ) {
      return setError("Barcha maydonlarni to‘ldiring");
    }

    if (form.name.length < 3 || form.name.length > 12) {
      return setError("Ism 3-12 harf bo‘lishi kerak");
    }

    if (!isStrongPassword(form.password)) {
      return setError("Parol kuchsiz (A-Z, 0-9, symbol kerak)");
    }

    if (workHours <= 0) {
      return setError("Ish vaqti noto‘g‘ri");
    }

    const newEmployee = {
      id: Date.now(),
      role: "employee",
      bonus: 0,
      fine: 0,
      attendance: [],
      salary: Number(form.salary),
      salaryType: form.salaryType,
      totalMonthlySalary: totalSalaryPerMonth,
      salaryPerHour: hourlySalary,
      workHours,
      ...form,
    };

    setEmployees([...employees, newEmployee]);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className="bg-slate-900 w-full max-w-lg rounded-3xl p-6 space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold">
          Xodim qo‘shish
        </h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 text-red-400 p-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          name="name"
          placeholder="Ism"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl"
        />

        {/* POSITION */}
        <input
          name="position"
          placeholder="Lavozim"
          value={form.position}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl"
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Parol"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-slate-800 rounded-xl pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* SALARY TYPE (MODERN UI) */}
        <div className="bg-slate-800 p-1 rounded-xl flex gap-1">
          {[
            { key: "daily", label: "Kunlik" },
            { key: "weekly", label: "Haftalik" },
            { key: "monthly", label: "Oylik" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  salaryType: item.key,
                }))
              }
              className={`flex-1 py-2 rounded-lg text-sm transition ${
                form.salaryType === item.key
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* SALARY INPUT */}
        <input
          name="salary"
          placeholder="Summani kiriting"
          value={form.salary}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded-xl"
        />

        {/* INFO BOX */}
        <div className="bg-slate-800 p-3 rounded-xl text-sm space-y-1">
          <p className="text-slate-400">Maosh turi:</p>

          <p className="text-white font-medium">
            {form.salaryType === "daily" && "Kunlik maosh"}
            {form.salaryType === "weekly" && "Haftalik maosh"}
            {form.salaryType === "monthly" && "Oylik maosh"}
          </p>

          <p className="text-xs text-slate-400">
            Tizim avtomatik hisoblaydi
          </p>
        </div>

        {/* LIVE PREVIEW */}
        <div className="bg-slate-800 p-3 rounded-xl text-sm">
          <p className="text-slate-400">Hisob:</p>

          <p className="text-emerald-400 font-bold">
            {totalSalaryPerMonth.toLocaleString("uz-UZ")} so‘m / oy
          </p>

          <p className="text-blue-400">
            ~ {hourlySalary.toLocaleString()} so‘m / soat
          </p>

          <p className="text-xs text-gray-400">
            Oy kunlari: {daysInMonth}
          </p>
        </div>

        {/* WORK TIME */}
        <div className="bg-slate-800 p-4 rounded-xl space-y-2">
          <p className="text-sm text-slate-400">
            Ish vaqti: {form.startTime}:00 → {form.endTime}:00
          </p>

          <input
            type="range"
            min="0"
            max="24"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
          />

          <input
            type="range"
            min="0"
            max="24"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
          />

          <p className="text-blue-400 font-bold">
            {workHours} soat
          </p>
        </div>

        {/* SAVE */}
        <button
          onClick={addEmployee}
          className="w-full bg-blue-600 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}