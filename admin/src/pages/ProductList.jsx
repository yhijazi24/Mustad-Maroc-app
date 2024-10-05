import React, { useEffect } from 'react';
import './css/productList.css';
import { Link, useParams } from "react-router-dom";
import { deleteProduct, getProducts } from "../redux/apiCalls";
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const { type } = useParams(); // Extract type from URL
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(type, dispatch); // Fetch products based on the type from URL
  }, [type, dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const validProducts = Array.isArray(products) ? products.filter(product => product._id) : [];

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={validProducts}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id} 
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

export default ProductList;
