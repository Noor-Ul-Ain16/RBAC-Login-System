import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddRole() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");
  
  // Handles custom UI messages instead of browser alerts
  const [notification, setNotification] = useState({ message: "", type: "" });

  // Helper to show messages that automatically vanish after 4 seconds
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/roles/", {
        role_name: roleName,
      });

      showToast("Role created successfully!", "success");

      // Brief delay before redirecting so the user can read the success message
      setTimeout(() => {
        navigate("/admin/roles");
      }, 1000);
    } catch (error) {
      console.error(error);
      const backendMessage = error.response?.data?.detail;
      showToast(backendMessage || "Failed to create role.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center relative">
      
      {/* Dynamic Inline Notification Banner */}
      {notification.message && (
        <div 
          className={`absolute top-6 px-4 py-3 rounded shadow-md text-sm font-medium transition-all duration-300 ${
            notification.type === "success" 
              ? "bg-green-100 text-green-800 border border-green-200" 
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96 mt-12"
      >
        <h1 className="text-2xl font-bold mb-6">Add Role</h1>

        <input
          type="text"
          placeholder="Role Name"
          className="w-full border p-2 rounded mb-6 focus:outline-blue-500"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/roles")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
          >
            Create Role
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRole;