import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiCalendar
} from "react-icons/fi";

const iconMap = {
  home: FiHome,
  users: FiUsers,
  salary: FiDollarSign,
  calendar: FiCalendar,
};

export default function Sidebar({ links }) {
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex w-[260px] h-screen bg-slate-900/80 border-r border-slate-700 p-5 flex-col">

        <h1 className="text-xl font-bold text-white mb-8">
          Xodimlar Tizimi
        </h1>

        <div className="flex flex-col gap-2">

          {links.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition text-sm font-medium
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                {Icon && <Icon className="text-lg" />}
                {item.label}
              </NavLink>
            );
          })}

        </div>
      </div>

      {/* 📱 MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700">

        <div className="flex justify-around items-center py-2">

          {links.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center text-xs px-3 py-2 rounded-xl transition
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