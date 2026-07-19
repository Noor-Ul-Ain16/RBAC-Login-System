import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users.");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      alert("User deleted successfully!");

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">

      <div className="h-1 w-full bg-slate-900"></div>


      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8">


        {/* HEADER */}

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200 pb-6">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              User Management
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              View, update, and manage users who have access to the system.
            </p>

          </div>



          <div className="flex gap-3">


            <button
              onClick={() => navigate("/admin/add-user")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition"
            >
              Add User
            </button>


            <button
              onClick={() => navigate("/admin")}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition"
            >
              Back
            </button>


          </div>


        </div>




        {/* INFORMATION BAR */}

        <div className="mb-6 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 font-medium">

          <span className="h-2 w-2 rounded-full bg-blue-600"></span>

          <span>
            Manage user accounts and their assigned roles.
          </span>

        </div>




        {/* TABLE CARD */}

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">


          <div className="overflow-x-auto">


            <table className="w-full text-sm">


              <thead>

                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">

                  <th className="px-6 py-4 text-left font-semibold">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Username
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Role
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>


                </tr>

              </thead>




              <tbody>


                {users.length > 0 ? (

                  users.map((user) => (

                    <tr
                      key={user.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >


                      <td className="px-6 py-4 text-slate-600">
                        {user.id}
                      </td>


                      <td className="px-6 py-4 font-medium text-slate-900">
                        {user.username}
                      </td>


                      <td className="px-6 py-4 text-slate-600">
                        {user.email}
                      </td>


                      <td className="px-6 py-4">

                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {user.role_name}
                        </span>

                      </td>



                      <td className="px-6 py-4">

                        <div className="flex justify-center gap-2">


                          <button
                            onClick={() =>
                              navigate(`/admin/edit-user/${user.id}`)
                            }
                            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold transition"
                          >
                            Edit
                          </button>



                          <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition"
                          >
                            Delete
                          </button>


                        </div>


                      </td>


                    </tr>

                  ))

                ) : (


                  <tr>

                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-slate-500"
                    >
                      No users found.
                    </td>

                  </tr>


                )}


              </tbody>


            </table>


          </div>


        </div>




        {/* FOOTER */}

        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400 flex justify-between">

          <span>
            University Role-Based Access Control System
          </span>

          <span>
            User Management
          </span>

        </div>


      </div>


    </div>
  );
}

export default Users;