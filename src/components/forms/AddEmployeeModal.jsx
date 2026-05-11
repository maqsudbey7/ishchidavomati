import { useState } from "react";
import { useEmployees } from "../../store/employeeStore";

export default function AddEmployeeModal({ closeModal }) {
  const { employees, setEmployees } = useEmployees();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    position: "",
    salary: "",
    workHours: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      role: "employee",
      bonus: 0,
      fine: 0,
      attendance: [],
      ...form,
    };

    setEmployees([...employees, newEmployee]);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-slate-800 p-6 rounded-2xl w-[500px]">
        <h1 className="text-2xl font-bold mb-5">
          Xodim qo‘shish
        </h1>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Ism"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            name="username"
            placeholder="Foydalanuvchi nomi"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            name="password"
            placeholder="Parol"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            name="position"
            placeholder="Lavozim"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            name="salary"
            placeholder="Oylik maosh"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />

          <input
            name="workHours"
            placeholder="Ish soati"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={addEmployee}
            className="bg-blue-600 px-5 py-2 rounded-lg"
          >
            Saqlash
          </button>

          <button
            onClick={closeModal}
            className="bg-red-600 px-5 py-2 rounded-lg"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}