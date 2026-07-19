import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Student Dashboard</h1>
      <p className="mt-3">Welcome Student!</p>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;