import { useState } from "react";
import {
  FiX,
  FiDollarSign,
  FiGift,
  FiAlertTriangle,
  FiSave,
} from "react-icons/fi";

import { useEmployees } from "../../store/employeeStore";

export default function EditEmployeeModal({
  employee,
  closeModal,
}) {
  const { employees, setEmployees } =
    useEmployees();

  const [bonus, setBonus] = useState(
    employee.bonus || 0
  );

  const [fine, setFine] = useState(
    employee.fine || 0
  );

  const [salaryPerHour, setSalaryPerHour] =
    useState(
      employee.salaryPerHour || 0
    );

  // FORMAT NUMBER
  const formatNumber = (value) => {
    if (!value) return "";

    return Number(
      value.toString().replace(/\s/g, "")
    ).toLocaleString("ru-RU");
  };

  // ONLY NUMBER
  const onlyNumber = (value) => {
    return value.replace(/\D/g, "");
  };

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

  // FINAL SALARY
  const finalSalary =
    Number(employee.totalMonthlySalary || 0) +
    Number(bonus || 0) -
    Number(fine || 0);

  return (
    <div
      onClick={closeModal}
      className="
        fixed
        inset-0
        z-50
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-md
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-5
          sm:p-6
          shadow-2xl
          space-y-5
          relative
          max-h-[92vh]
          overflow-y-auto
        "
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
            hover:bg-slate-700
            hover:text-white
            transition
          "
        >
          <FiX size={18} />
        </button>

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Xodimni tahrirlash
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            {employee.name}
          </p>
        </div>

        {/* EMPLOYEE CARD */}
        <div
          className="
            bg-slate-800
            rounded-2xl
            p-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-slate-400 text-sm">
              Lavozim
            </p>

            <h2 className="text-white font-semibold">
              {employee.position}
            </h2>
          </div>

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-600/20
              flex
              items-center
              justify-center
              text-blue-400
              text-xl
              font-bold
            "
          >
            {employee.name?.charAt(0)}
          </div>
        </div>

        {/* SOATLIK MAOSH */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400 flex items-center gap-2">
            <FiDollarSign />
            Soatlik maosh
          </label>

          <div className="relative">
            <input
              value={formatNumber(
                salaryPerHour
              )}
              onChange={(e) =>
                setSalaryPerHour(
                  onlyNumber(
                    e.target.value
                  )
                )
              }
              inputMode="numeric"
              placeholder="0"
              className="
                w-full
                bg-slate-800
                rounded-2xl
                px-4
                py-3
                pr-16
                text-white
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
        </div>

        {/* BONUS */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400 flex items-center gap-2">
            <FiGift />
            Bonus
          </label>

          <div className="relative">
            <input
              value={formatNumber(bonus)}
              onChange={(e) =>
                setBonus(
                  onlyNumber(
                    e.target.value
                  )
                )
              }
              inputMode="numeric"
              placeholder="0"
              className="
                w-full
                bg-slate-800
                rounded-2xl
                px-4
                py-3
                pr-16
                text-white
                outline-none
                focus:ring-2
                focus:ring-emerald-500
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
        </div>

        {/* FINE */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400 flex items-center gap-2">
            <FiAlertTriangle />
            Jarima
          </label>

          <div className="relative">
            <input
              value={formatNumber(fine)}
              onChange={(e) =>
                setFine(
                  onlyNumber(
                    e.target.value
                  )
                )
              }
              inputMode="numeric"
              placeholder="0"
              className="
                w-full
                bg-slate-800
                rounded-2xl
                px-4
                py-3
                pr-16
                text-white
                outline-none
                focus:ring-2
                focus:ring-red-500
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
        </div>

        {/* RESULT */}
        <div
          className="
            bg-gradient-to-br
            from-blue-600/10
            to-emerald-600/10
            border
            border-blue-500/20
            rounded-2xl
            p-4
            space-y-2
          "
        >
          <p className="text-slate-400 text-sm">
            Yakuniy maosh
          </p>

          <h1 className="text-3xl font-bold text-white">
            {finalSalary.toLocaleString(
              "ru-RU"
            )}{" "}
            so‘m
          </h1>

          <div className="flex items-center gap-3 text-sm">
            <p className="text-emerald-400">
              +{" "}
              {Number(
                bonus
              ).toLocaleString("ru-RU")}
            </p>

            <p className="text-red-400">
              -{" "}
              {Number(
                fine
              ).toLocaleString("ru-RU")}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={saveChanges}
            className="
              flex-1
              bg-blue-600
              hover:bg-blue-700
              transition
              py-3
              rounded-2xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FiSave />
            Saqlash
          </button>

          <button
            onClick={closeModal}
            className="
              flex-1
              bg-slate-800
              hover:bg-slate-700
              transition
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  );
}