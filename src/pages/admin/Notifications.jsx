import AdminLayout from "../../layouts/AdminLayout";
import { useNotifications } from "../../store/notificationStore";

export default function Notifications() {
  const { notifications } =
    useNotifications();

  return (
    <AdminLayout title="Notifications">

      <div className="bg-slate-800 p-5 rounded-2xl">

        <h1 className="text-2xl font-bold mb-5">
          Xabarnomalar
        </h1>

        <div className="space-y-3">

          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl ${
                n.type === "success"
                  ? "bg-green-600"
                  : n.type === "warning"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            >

              <p>{n.message}</p>

              <span className="text-xs opacity-70">
                {n.date}
              </span>

            </div>
          ))}

        </div>

      </div>

    </AdminLayout>
  );
}