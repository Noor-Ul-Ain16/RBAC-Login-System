import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";


function EditRole() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");


  useEffect(() => {
    fetchRole();
  }, []);


  const fetchRole = async () => {

    try {

      const response = await api.get(`/roles/${id}`);

      setRoleName(response.data.role_name);

    } catch(error){

      console.error(error);
      alert("Failed to load role.");

    }

  };


  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      await api.put(`/roles/${id}`,{
        role_name: roleName
      });


      alert("Role updated successfully!");

      navigate("/admin/roles");


    }catch(error){

      console.error(error);

      if(error.response?.data?.detail){
        alert(error.response.data.detail);
      }
      else{
        alert("Failed to update role.");
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
          Edit Role
        </h1>


        <input

          type="text"

          className="w-full border p-2 rounded mb-6"

          value={roleName}

          onChange={(e)=>setRoleName(e.target.value)}

          required

        />


        <div className="flex justify-between">


          <button

            type="button"

            onClick={()=>navigate("/admin/roles")}

            className="bg-gray-500 text-white px-4 py-2 rounded"

          >
            Cancel
          </button>



          <button

            type="submit"

            className="bg-blue-600 text-white px-4 py-2 rounded"

          >
            Update Role
          </button>


        </div>


      </form>


    </div>

  );


}


export default EditRole;