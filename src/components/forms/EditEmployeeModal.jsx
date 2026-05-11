import { useState } from "react";
import { useEmployees } from "../../store/employeeStore";

export default function EditEmployeeModal({
  employee,
  closeModal,
}) {
  const { employees, setEmployees } =
    useEmployees();

  const [bonus, setBonus] = useState(
    employee.bonus
  );

  const [fine, setFine] = useState(
    employee.fine
  );

  const [salaryPerHour, setSalaryPerHour] =
    useState(employee.salaryPerHour);

  const saveChanges = () => {
    const updated = employees.map((e) => {
      if (e.id === employee.id) {
        return {
          ...e,
          bonus: Number(bonus),
          fine: Number(fine),
          salaryPerHour: Number(
            salaryPerHour
          ),
        };
      }
      return e;
    });

    setEmployees(updated);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-slate-800 p-6 rounded-2xl w-[450px]">

        <h1 className="text-2xl font-bold mb-5">
          Xodimni tahrirlash
        </h1>

        <div className="space-y-4">

          <input
            value={salaryPerHour}
            onChange={(e) =>
              setSalaryPerHour(
                e.target.value
              )
            }
            placeholder="Soatlik maosh"
            className="w-full p-3 bg-slate-700 rounded-lg"
          />

          <input
            value={bonus}
            onChange={(e) =>
              setBonus(e.target.value)
            }
            placeholder="Bonus"
            className="w-full p-3 bg-slate-700 rounded-lg"
          />

          <input
            value={fine}
            onChange={(e) =>
              setFine(e.target.value)
            }
            placeholder="Jarima"
            className="w-full p-3 bg-slate-700 rounded-lg"
          />

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={saveChanges}
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