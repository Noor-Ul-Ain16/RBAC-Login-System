import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AddRole() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/roles/", {
        role_name: roleName,
      });

      alert("Role created successfully!");

      navigate("/admin/roles");

    } catch (error) {
      console.error(error);

      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Failed to create role.");
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
          Add Role
        </h1>


        <input
          type="text"
          placeholder="Role Name"
          className="w-full border p-2 rounded mb-6"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />


        <div className="flex justify-between">

          <button
            type="button"
            onClick={() => navigate("/admin/roles")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>


          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Role
          </button>

        </div>


      </form>

    </div>
  );
}

export default AddRole;