import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddUser() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

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
      await api.post("/auth/register", {
        username,
        email,
        password,
        role_id: Number(roleId),
      });

      alert("User created successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to create user.");
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
          Add User
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full border p-2 rounded mb-6"
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
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;