// src/pages/ProductCardList.jsx
import React, { useEffect, useState } from 'react';
import './css/ProductCardList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { getProductCard, deleteProductCard } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';

const allTypes = ["horseshoes", "nails", "rasps", "tools", "care"];

const ProductCardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchProductCard = async () => {
    const productCard = await getProductCard(dispatch);

    const orderedTypes = ["horseshoes", "rasps", "tools", "care", "nails"];

    const sorted = (productCard || []).sort((a, b) => {
      const indexA = orderedTypes.indexOf(a.type);
      const indexB = orderedTypes.indexOf(b.type);
      return indexA - indexB;
    });

    setData(sorted);
  };
  fetchProductCard();
}, [dispatch]);


  const handleDelete = async (id) => {
    if (window.confirm("Delete this card?")) {
      await deleteProductCard(id, dispatch);
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const usedTypes = data.map(card => card.type);
  const canAdd = data.length < 5;

  const columns = [
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.row.img} alt="card" style={{ width: 50, height: 50, borderRadius: 5, objectFit: 'cover' }} />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <Link to={`/product-card/${params.row.type}`}>
          <button className="productCardListEdit ">Edit</button>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <button className="productCardListDelete" onClick={() => handleDelete(params.row.id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="productCardList headerList">
      <div className="productCardListTop headerListTop">
        {canAdd && (
          <button className="addHeaderBtn" onClick={() => navigate("/product-card/new")}>
            Add New Card
          </button>
        )}
      </div>
      <DataGrid
        rows={data}
        getRowId={(row) => row.id}
        columns={columns}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductCardList;
