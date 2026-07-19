import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  
  // Handles custom UI messages instead of browser alerts
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  // Helper to show messages that automatically vanish after 4 seconds
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setRoleId(response.data.role_id);
    } catch (error) {
      console.error(error);
      showToast("Failed to load user information.", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
      showToast("Failed to load user roles.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/${id}`, {
        username,
        email,
        role_id: Number(roleId),
      });

      showToast("User updated successfully!", "success");

      // Brief delay before redirecting so the user can read the success message
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    } catch (error) {
      console.error(error);
      const backendMessage = error.response?.data?.detail;
      showToast(backendMessage || "Failed to update user.", "error");
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
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-4 focus:outline-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4 focus:outline-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 rounded mb-6 focus:outline-blue-500"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role_name}
            </option>
          ))}
        </select>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;