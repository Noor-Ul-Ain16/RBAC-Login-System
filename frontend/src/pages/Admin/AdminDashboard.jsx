import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500/10 selection:text-blue-600">
      <div className="h-1 w-full bg-slate-900"></div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 gap-6">

          <div>
            <div className="flex items-center gap-3.5 mb-2">

              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Admin Dashboard
              </h1>

            </div>

            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              Manage users, roles, and permissions from one place. Control access
              and keep your system secure.
            </p>

          </div>


          <button
            onClick={logout}
            className="self-start sm:self-center inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition"
          >

            <svg
              className="w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>

            Logout

          </button>

        </div>



        {/* STATUS MESSAGE */}

        <div className="mb-8 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 font-medium">

          <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>

          <span>
            System is running normally. User and role changes are updated instantly.
          </span>

        </div>



        {/* CARDS */}

        <div className="grid md:grid-cols-2 gap-6">


          {/* USERS CARD */}

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">

            <div>

              <div className="flex items-start justify-between mb-4">

                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 002.625.372A9.337 9.337 0 0021.746 18.5a4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z"
                    />
                  </svg>

                </div>


                <span className="text-[11px] font-semibold text-slate-400 uppercase bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                  Users
                </span>

              </div>


              <h2 className="text-lg font-bold mb-1">
                Manage Users
              </h2>


              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Add new users, update account details, view user information,
                and manage access for system users.
              </p>

            </div>



            <div className="flex gap-3 flex-wrap pt-4 border-t border-slate-100">


              <button
                onClick={() => navigate("/admin/users")}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition"
              >
                View Users
              </button>


              <button
                onClick={() => navigate("/admin/add-user")}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-md transition"
              >
                Add User
              </button>


            </div>

          </div>




          {/* ROLES CARD */}

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-300 transition flex flex-col justify-between">


            <div>


              <div className="flex items-start justify-between mb-4">


                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
                    />
                  </svg>

                </div>



                <span className="text-[11px] font-semibold text-slate-400 uppercase bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                  Roles
                </span>


              </div>



              <h2 className="text-lg font-bold mb-1">
                Manage Roles & Permissions
              </h2>



              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Create roles, assign permissions, and control what different
                users can access in the system.
              </p>



            </div>




            <div className="flex gap-3 flex-wrap pt-4 border-t border-slate-100">


              <button
                onClick={() => navigate("/admin/roles")}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition"
              >
                View Roles
              </button>



              <button
                onClick={() => navigate("/admin/add-role")}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-4 py-2.5 rounded-md transition"
              >
                Add Role
              </button>


            </div>


          </div>


        </div>




        {/* FOOTER */}

        <div className="mt-16 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">


          <p>
            University Role-Based Access Control System
          </p>



          <div className="flex gap-4">

            <span className="flex items-center gap-1.5">

              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>

              Secure Connection

            </span>


            <span>
              Version 1.0
            </span>


          </div>


        </div>


      </div>

    </div>
  );
}

export default AdminDashboard;