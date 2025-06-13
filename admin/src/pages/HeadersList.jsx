import React, { useEffect, useState } from 'react';
import './css/headersList.css';
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { getHeader, deleteHeader } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const allTypes = ["horseshoes", "nails", "rasps", "tools", "care", "home"];

const HeadersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHeaders = async () => {
      const headers = await getHeader(dispatch);
      setData(headers || []);
    };

    fetchHeaders();
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this header?")) {
      await deleteHeader(id, dispatch);
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const usedTypes = data.map(header => header.type);
  const availableTypes = allTypes.filter(type => !usedTypes.includes(type));

  const columns = [
    {
      field: "img",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img src={params.row.img} alt="header" style={{ width: 60, height: 60, borderRadius: 5, objectFit: 'cover' }} />
      ),
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 250,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <Link to={`/header/type/${params.row.type}`}>
          <button className="headerListEdit">Edit</button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: (params) => (
        <button className="headerListDelete" onClick={() => handleDelete(params.row.id)}>Delete</button>
      ),
    },
  ];

  return (
    <div className="headerList">
      <div className="headerListTop">
        {data.length < 6 && (
          <button
            className="addHeaderBtn"
            onClick={() => navigate("/header/new")}
          >
            Add New Header 
          </button>
        )}
      </div>

      <DataGrid
        rows={data}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={8}
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  );
};

export default HeadersList;
