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

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get(`/users/${id}`);

      setUsername(response.data.username);
      setEmail(response.data.email);
      setRoleId(response.data.role_id);
    } catch (error) {
      console.error(error);
      alert("Failed to load user.");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get("/roles");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load roles.");
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

      alert("User updated successfully!");

      navigate("/admin/users");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to update user.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >

        <h1 className="text-2xl font-bold mb-6">
          Edit User
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded mb-6"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
        >
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option
              key={role.id}
              value={role.id}
            >
              {role.role_name}
            </option>
          ))}
        </select>

        <div className="flex justify-between">

          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update User
          </button>

        </div>

      </form>
    </div>
  );
}

export default EditUser;