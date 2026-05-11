import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

export default function AdminLayout({
  children,
  title,
}) {
  const links = [
    {
      path: "/admin",
      label: "Bosh sahifa",
      icon: "home",
    },
    {
      path: "/admin/employees",
      label: "Xodimlar",
      icon: "users",
    },
    {
      path: "/admin/salary",
      label: "Maosh",
      icon: "salary",
    },
  ];

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* SIDEBAR */}
      <Sidebar links={links} />

      {/* MAIN */}
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