import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiMenu,
} from "react-icons/fi";

const iconMap = {
  home: FiHome,
  users: FiUsers,
  salary: FiDollarSign,
  calendar: FiCalendar,
};

export default function Sidebar({ links }) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div
        className={`
          hidden md:flex
          h-screen
          bg-slate-900/80
          border-r border-slate-700
          flex-col
          transition-all duration-300
          ${open ? "w-[260px]" : "w-[80px]"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">

          {/* TITLE */}
          {open && (
            <h1 className="text-lg font-bold text-white">
              Xodimlar Tizimi
            </h1>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
          >
            <FiMenu />
          </button>

        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-2 p-3">

          {links.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                  ${!open ? "justify-center" : ""}
                  `
                }
              >

                {Icon && <Icon className="text-xl" />}

                {/* TEXT ONLY WHEN OPEN */}
                {open && (
                  <span className="text-sm">
                    {item.label}
                  </span>
                )}

              </NavLink>
            );
          })}

        </div>
      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700">

        <div className="flex justify-around items-center py-2">

          {links.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center text-xs px-3 py-2 transition
                  ${
                    isActive
                      ? "text-blue-400"
                      : "text-slate-400"
                  }`
                }
              >
                {Icon && <Icon className="text-xl mb-1" />}
                {item.label}
              </NavLink>
            );
          })}

        </div>
      </div>
    </>
  );
}