import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
  // Custom notification system instead of native windows alerts
  const [notification, setNotification] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => { 
    fetchRoles(); 
  }, []);

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
      showToast("Failed to fetch roles.", "error");
    }
  };

  const deleteRole = async () => {
    if (!selectedRole) return;
    try {
      await api.delete(`/roles/${selectedRole.id}`);
      
      setRoles(roles.filter((role) => role.id !== selectedRole.id));
      showToast("Role deleted successfully!", "success");
      
      setShowDeleteModal(false);
      setSelectedRole(null);
    } catch (error) {
      console.error(error);
      showToast("Failed to delete role.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased relative">
      <div className="h-1 w-full bg-slate-900"></div>
      
      {/* Dynamic Inline Notification Banner */}
      {notification.message && (
        <div 
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded shadow-md text-sm font-medium transition-all duration-300 ${
            notification.type === "success" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Role Management</h1>
            <p className="text-sm text-slate-500 mt-2">Create, update, and manage roles and permissions in the system.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate("/admin/add-role")} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition">Add Role</button>
            <button onClick={() => navigate("/admin")} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 text-sm font-semibold rounded-md shadow-sm transition">Back</button>
          </div>
        </div>

        {/* INFO BAR */}
        <div className="mb-6 flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-xs text-blue-800 font-medium">
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          <span>Manage system roles and control user access levels.</span>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Role Name</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <tr key={role.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-slate-600">{role.id}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">{role.role_name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => navigate(`/admin/edit-role/${role.id}`)} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold transition">Edit</button>
                          <button 
                            onClick={() => {
                              setSelectedRole(role);
                              setShowDeleteModal(true);
                            }} 
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
                    <td colSpan="3" className="px-6 py-10 text-center text-slate-500">No roles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400 flex justify-between">
          <span>University Role-Based Access Control System</span>
          <span>Role Management</span>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-xl bg-white shadow-2xl border border-slate-200">
            <div className="px-6 pt-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
              </div>

              <h2 className="mt-4 text-center text-xl font-bold text-slate-900">
                Delete Role
              </h2>

              <p className="mt-3 text-center text-sm text-slate-600 leading-6">
                Are you sure you want to delete
                <span className="font-semibold text-slate-900">
                  {" "}
                  {selectedRole?.role_name}
                </span>
                ?
              </p>

              <p className="mt-1 text-center text-xs text-slate-500">
                This action cannot be undone. Any users currently assigned to this role may lose access permissions.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedRole(null);
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={deleteRole}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition"
              >
                Delete Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;