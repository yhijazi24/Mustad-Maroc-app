import React, { useEffect, useState } from 'react';
import './css/brandsList.css';
import { Link } from "react-router-dom";
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { getBrands, deleteBrand } from "../redux/apiCalls";
import { publicRequest } from '../../requestMethods';

const BrandsList = () => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await publicRequest.get("/brands");
        setBrands(res.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    };

    fetchBrands();
  }, []);

  const handleDelete = (id) => {
    deleteBrand(id, dispatch);
    setBrands(prev => prev.filter(brand => brand.id !== id));
  };

  const validBrands = Array.isArray(brands)
    ? brands.filter(brand => brand.id)
    : [];

  const columns = [
        {
      field: "img",
      headerName: "Logo",
      width: 200,
      renderCell: (params) => (
        <img className="brandLogo" src={params.value} alt="brand-logo" />
      ),
    },
    {
      field: "title",
      headerName: "Brand Name",
      width: 200,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <Link to={`/brands/${params.row.id}`}>
          <button className="brandsListEdit">Edit</button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.id)} className="brandsListDelete">Delete</button>
      ),
    },
  ];

  return (
    <div className="brandsList">
      <div className="brandsListHeader">
        <Link to="/new-brand">
          <button className="addBrandButton">Add New Brand</button>
        </Link>
      </div>
      <DataGrid
        rows={validBrands}
        getRowId={(row) => row.id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default BrandsList;
