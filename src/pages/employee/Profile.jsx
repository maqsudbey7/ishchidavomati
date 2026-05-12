import EmployeeLayout from "../../layouts/EmployeeLayout";
import useUser from "../../hooks/useUser";

export default function Profile() {
  const user = useUser();

  if (!user) {
    return (
      <EmployeeLayout title="Profil">
        <h1 className="text-white">Foydalanuvchi topilmadi</h1>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout title="Profil">

      <div className="max-w-2xl mx-auto bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-3xl p-8 shadow-xl">

        {/* Header */}
        <div className="flex items-center gap-5 mb-8">

          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
            {user.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {user.name}
            </h1>

            <p className="text-slate-400 text-sm">
              {user.position}
            </p>
          </div>

        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">Foydalanuvchi nomi</p>
            <p className="text-lg font-semibold">{user.username}</p>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">Lavozim</p>
            <p className="text-lg font-semibold">{user.position}</p>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700 sm:col-span-2">
            <p className="text-slate-400 text-sm">Ish vaqti</p>
            <p className="text-lg font-semibold">
              {user.workHours}   soat
            </p>
          </div>

        </div>

      </div>

    </EmployeeLayout>
  );
}