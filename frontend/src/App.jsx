import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import AddUser from "./pages/Admin/AddUser";
import EditUser from "./pages/Admin/EditUser";

import Roles from "./pages/Admin/Roles";
import AddRole from "./pages/Admin/AddRole";
import EditRole from "./pages/Admin/EditRole";

import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StaffDashboard from "./pages/Staff/StaffDashboard";


function App() {

return (

<BrowserRouter>

<Routes>


{/* Login */}

<Route
path="/"
element={<Login />}
/>



{/* Admin */}

<Route
path="/admin"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<AdminDashboard />
</ProtectedRoute>
}
/>


<Route
path="/admin/users"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<Users />
</ProtectedRoute>
}
/>


<Route
path="/admin/add-user"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<AddUser />
</ProtectedRoute>
}
/>


<Route
path="/admin/edit-user/:id"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<EditUser />
</ProtectedRoute>
}
/>


<Route
path="/admin/roles"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<Roles />
</ProtectedRoute>
}
/>


<Route
path="/admin/add-role"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<AddRole />
</ProtectedRoute>
}
/>


<Route
path="/admin/edit-role/:id"
element={
<ProtectedRoute allowedRoles={["Admin"]}>
<EditRole />
</ProtectedRoute>
}
/>



{/* Student */}

<Route
path="/student"
element={
<ProtectedRoute allowedRoles={["Student"]}>
<StudentDashboard />
</ProtectedRoute>
}
/>



{/* Teacher */}

<Route
path="/teacher"
element={
<ProtectedRoute allowedRoles={["Teacher"]}>
<TeacherDashboard />
</ProtectedRoute>
}
/>



{/* Staff */}

<Route
path="/staff"
element={
<ProtectedRoute allowedRoles={["Staff"]}>
<StaffDashboard />
</ProtectedRoute>
}
/>


</Routes>


</BrowserRouter>

);

}


export default App;