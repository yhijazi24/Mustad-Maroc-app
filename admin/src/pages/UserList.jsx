import React, { useEffect, useState } from 'react';
import './css/userList.css';
import { Link } from "react-router-dom";
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers, deleteUser } from '../redux/apiCalls'; // Import your API calls

const UserList = () => {
  const [data, setData] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers(); // Fetch users from your API
      setData(users); // Update state with fetched users
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id); // Pass the correct user ID
      setData(data.filter((item) => item._id !== id)); // Update state to remove user from the UI
    } catch (err) {
      console.error("Error deleting user:", err);
      // You can set an error state here if needed
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, // Use _id for the unique identifier
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/users/" + params.row._id}> 
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)} // Pass _id to handleDelete
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        getRowId={(row) => row._id} 
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
