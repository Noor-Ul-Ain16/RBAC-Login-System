import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Roles() {

  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    fetchRoles();
  }, []);



  const fetchRoles = async () => {

    try {

      const response = await api.get("/roles");

      setRoles(response.data);

    } catch (error) {

      console.error(error);
      alert("Failed to fetch roles.");

    }

  };



  const deleteRole = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );


    if (!confirmDelete) return;



    try {

      await api.delete(`/roles/${id}`);

      alert("Role deleted successfully!");

      fetchRoles();


    } catch (error) {

      console.error(error);

      alert("Failed to delete role.");

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
              Role Management
            </h1>


            <p className="text-sm text-slate-500 mt-2">
              Create, update, and manage roles and permissions in the system.
            </p>


          </div>




          <div className="flex gap-3">


            <button
              onClick={() => navigate("/admin/add-role")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition"
            >
              Add Role
            </button>




            <button
              onClick={() => navigate("/admin")}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition"
            >
              Back
            </button>



          </div>


        </div>





        {/* INFO BAR */}

        <div className="mb-6 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 font-medium">


          <span className="h-2 w-2 rounded-full bg-blue-600"></span>


          <span>
            Manage system roles and control user access levels.
          </span>


        </div>





        {/* TABLE */}


        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">



          <div className="overflow-x-auto">



            <table className="w-full text-sm">


              <thead>


                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">


                  <th className="px-6 py-4 text-left font-semibold">
                    ID
                  </th>



                  <th className="px-6 py-4 text-left font-semibold">
                    Role Name
                  </th>



                  <th className="px-6 py-4 text-center font-semibold">
                    Actions
                  </th>



                </tr>


              </thead>





              <tbody>



                {
                  roles.length > 0 ? (

                    roles.map((role) => (


                      <tr
                        key={role.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >



                        <td className="px-6 py-4 text-slate-600">
                          {role.id}
                        </td>




                        <td className="px-6 py-4">


                          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">

                            {role.role_name}

                          </span>


                        </td>





                        <td className="px-6 py-4">


                          <div className="flex justify-center gap-2">





                            <button
                              onClick={() =>
                                navigate(`/admin/edit-role/${role.id}`)
                              }
                              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold transition"
                            >
                              Edit
                            </button>






                            <button
                              onClick={() => deleteRole(role.id)}
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
                        colSpan="3"
                        className="px-6 py-10 text-center text-slate-500"
                      >
                        No roles found.
                      </td>


                    </tr>


                  )

                }



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
            Role Management
          </span>


        </div>



      </div>



    </div>

  );

}


export default Roles;