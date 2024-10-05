import React, { useEffect, useState } from 'react';
import './css/headersList.css';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { getHeader } from '../redux/apiCalls'; // Import your API calls
import { useDispatch } from 'react-redux';

const HeadersList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  // Fetch headers when the component mounts
  useEffect(() => {
    const fetchHeaders = async () => {
      const headers = await getHeader(dispatch); // Fetch headers from your API
      setData(headers || []); // Update state with fetched headers
    };

    fetchHeaders();
  }, [dispatch]); // Only dispatch when the component mounts

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, // Use _id for the unique identifier
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/header/type/` + params.row.type}>
              <button className="headerListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="headerList">
      <DataGrid
        rows={data} // Use the state directly
        getRowId={(row) => row._id} 
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default HeadersList;
