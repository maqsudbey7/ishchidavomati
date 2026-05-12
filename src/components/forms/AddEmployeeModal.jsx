import { useState } from "react";
import { useEmployees } from "../../store/employeeStore";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function AddEmployeeModal({
  closeModal,
}) {
  const { employees, setEmployees } =
    useEmployees();

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

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

      setForm((prev) => ({
        ...prev,
        salary: value,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  // 📅 OY KUNLARI
  const getDaysInMonth = () => {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();
  };

  const daysInMonth = getDaysInMonth();

  // ⏰ ISH SOATLARI
  const workHours = Math.max(
    1,
    form.endTime - form.startTime
  );
  // 💰 MAOSH HISOBI
  let totalSalaryPerMonth = 0;

  if (form.salaryType === "daily") {
    totalSalaryPerMonth =
      Number(form.salary) * daysInMonth;
  }

  if (form.salaryType === "weekly") {
    totalSalaryPerMonth =
      Number(form.salary) * 4.33;
  }

  if (form.salaryType === "monthly") {
    totalSalaryPerMonth =
      Number(form.salary);
  }

  const monthlyWorkHours =
    workHours * 22;

  const hourlySalary =
    totalSalaryPerMonth &&
      monthlyWorkHours > 0
      ? Math.round(
        totalSalaryPerMonth /
        monthlyWorkHours
      )
      : 0;

  // 🔐 PASSWORD VALIDATION
  const isStrongPassword = (
    password
  ) => {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(
      password
    );
  };

  // ➕ ADD EMPLOYEE
  const addEmployee = () => {
    setError("");

    if (
      !form.name ||
      !form.password ||
      !form.position ||
      !form.salary
    ) {
      return setError(
        "Barcha maydonlarni to‘ldiring"
      );
    }

    if (
      form.name.length < 3 ||
      form.name.length > 12
    ) {
      return setError(
        "Ism 3-12 harf bo‘lishi kerak"
      );
    }

    if (
      !isStrongPassword(form.password)
    ) {
      return setError(
        "Parol kuchsiz (A-Z, 0-9, symbol kerak)"
      );
    }

    if (workHours <= 0) {
      return setError(
        "Ish vaqti noto‘g‘ri"
      );
    }

    const newEmployee = {
      id: Date.now(),
      role: "employee",
      bonus: 0,
      fine: 0,
      attendance: [],
      salary: Number(form.salary),
      salaryType: form.salaryType,
      totalMonthlySalary:
        totalSalaryPerMonth,
      salaryPerHour: hourlySalary,
      workHours,
      ...form,
    };

    setEmployees([
      ...employees,
      newEmployee,
    ]);

    closeModal();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-3
        sm:p-4
      "
      onClick={closeModal}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          relative
          w-full
          max-w-lg
          bg-slate-900
          rounded-3xl
          border
          border-slate-800
          shadow-2xl
          p-4
          sm:p-6
          space-y-4
          max-h-[92vh]
          overflow-y-auto
        "
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={closeModal}
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
            rounded-full
            bg-slate-800
            text-slate-400
            hover:text-white
            hover:bg-slate-700
            transition
          "
        >
          ✕
        </button>

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Xodim qo‘shish
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Yangi xodim yaratish
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              bg-red-500/10
              border
              border-red-500/30
              text-red-400
              p-3
              rounded-xl
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          name="name"
          placeholder="Ism"
          value={form.name}
          onChange={handleChange}
          className="
            w-full
            bg-slate-800
            rounded-xl
            px-4
            py-3
            text-sm
            text-white
            placeholder:text-slate-500
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* POSITION */}
        <input
          name="position"
          placeholder="Lavozim"
          value={form.position}
          onChange={handleChange}
          className="
            w-full
            bg-slate-800
            rounded-xl
            px-4
            py-3
            text-sm
            text-white
            placeholder:text-slate-500
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Parol"
            value={form.password}
            onChange={handleChange}
            className="
              w-full
              bg-slate-800
              rounded-xl
              px-4
              py-3
              pr-12
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-slate-400
              hover:text-white
            "
          >
            {showPassword ? (
              <FiEyeOff size={18} />
            ) : (
              <FiEye size={18} />
            )}
          </button>
        </div>

        {/* SALARY TYPE */}
        <div
          className="
            bg-slate-800
            p-1
            rounded-2xl
            flex
            gap-1
            overflow-hidden
          "
        >
          {[
            {
              key: "daily",
              label: "Kunlik",
            },
            {
              key: "weekly",
              label: "Haftalik",
            },
            {
              key: "monthly",
              label: "Oylik",
            },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  salaryType:
                    item.key,
                }))
              }
              className={`
                flex-1
                py-2.5
                rounded-xl
                text-sm
                font-medium
                transition
                ${form.salaryType ===
                  item.key
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-700"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* SALARY */}
        <div className="relative">
          <input
            name="salary"
            placeholder="Summani kiriting"
            value={
              form.salary
                ? Number(
                  form.salary
                ).toLocaleString("ru-RU")
                : ""
            }
            onChange={handleChange}
            inputMode="numeric"
            className="
      w-full
      bg-slate-800
      rounded-xl
      px-4
      py-3
      pr-16
      text-sm
      text-white
      placeholder:text-slate-500
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
          />

          <span
            className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-slate-400
      text-sm
    "
          >
            so‘m
          </span>
        </div>

        {/* INFO */}
        <div
          className="
            bg-slate-800
            rounded-2xl
            p-4
            space-y-1
          "
        >
          <p className="text-slate-400 text-sm">
            Maosh turi
          </p>

          <p className="text-white font-semibold">
            {form.salaryType ===
              "daily" &&
              "Kunlik maosh"}

            {form.salaryType ===
              "weekly" &&
              "Haftalik maosh"}

            {form.salaryType ===
              "monthly" &&
              "Oylik maosh"}
          </p>

          <p className="text-xs text-slate-500">
            Tizim avtomatik hisoblaydi
          </p>
        </div>

        {/* LIVE PREVIEW */}
        <div
          className="
            bg-slate-800
            rounded-2xl
            p-4
            space-y-2
          "
        >
          <p className="text-slate-400 text-sm">
            Hisob
          </p>

          <p className="text-emerald-400 text-2xl font-bold">
            {totalSalaryPerMonth.toLocaleString(
              "uz-UZ"
            )}{" "}
            so‘m
          </p>

          <p className="text-blue-400 font-medium">
            ~{" "}
            {hourlySalary.toLocaleString()}{" "}
            so‘m / soat
          </p>

          <p className="text-xs text-slate-500">
            Oy kunlari:{" "}
            {daysInMonth}
          </p>
        </div>

        {/* WORK TIME */}
        <div
          className="
            bg-slate-800
            rounded-2xl
            p-4
            space-y-4
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Ish vaqti
            </p>

            <p className="text-white font-semibold">
              {form.startTime}:00 →{" "}
              {form.endTime}:00
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-2">
              Boshlanish
            </p>

            <input
              type="range"
              min="0"
              max="23"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div>
            <p className="text-xs text-slate-500 mb-2">
              Tugash
            </p>

            <input
              type="range"
              min={Number(form.startTime) + 1}
              max="24"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div
            className="
              bg-blue-600/10
              border
              border-blue-500/20
              rounded-xl
              p-3
            "
          >
            <p className="text-blue-400 font-bold text-lg">
              {workHours} soat
            </p>
          </div>
        </div>

        {/* BOTTOM SPACE */}
        <div className="h-2" />

        {/* SAVE */}
        <button
          onClick={addEmployee}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            transition
            py-3.5
            rounded-2xl
            font-semibold
            text-white
            text-sm
            sticky
            bottom-0
          "
        >
          Saqlash
        </button>
      </div>
    </div>
  );
}