import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

export default function Topbar({ title }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 md:px-6 bg-slate-900/70 backdrop-blur-xl border-b border-slate-800">

      {/* LEFT */}
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-white">
          {title}
        </h1>
        <p className="text-xs text-slate-400 hidden md:block">
          Xodimlar boshqaruv tizimi
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* USER ICON (optional future profile) */}
        {/* <div className="hidden md:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
          <FiUser className="text-slate-300" />
          <span className="text-sm text-slate-300">Account</span>
        </div> */}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl transition"
        >
          <FiLogOut />
          <span className="hidden md:inline">Chiqish</span>
        </button>

      </div>

    </div>
  );
}