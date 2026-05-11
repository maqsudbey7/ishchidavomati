import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function EmployeeLayout({ children, title }) {
  const links = [
    // { path: "/employee", label: "Bosh", icon: "home" },
    { path: "/employee/attendance", label: "Davomat", icon: "calendar" },
    { path: "/employee/salary", label: "Maosh", icon: "salary" },
    { path: "/employee/profile", label: "Profil", icon: "users" },
  ];

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* 💻 DESKTOP SIDEBAR */}
      <Sidebar links={links} />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* TOPBAR */}
        <div className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
          <Topbar title={title} />
        </div>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>

      </div>

    </div>
  );
}