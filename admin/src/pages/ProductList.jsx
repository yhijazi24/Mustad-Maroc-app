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
    console.log("useParams type:", type); // Check what type is
    if (type) {
      getProducts(type, dispatch);
    } else {
      console.warn("No type provided in URL.");
    }
  }, [type, dispatch]);


  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const validProducts = Array.isArray(products) ? products.filter(product => product.id) : [];

  const columns = [
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
      field: "Edit Product",
      headerName: "Edit Product",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete Product",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit" onClick={() => handleDelete(params.row.id)}>Delete</button>
          </>
        );
      },
    },
  ];

  return (
    <div className='productWrapper'>
      <div className="productList">
        <DataGrid
          rows={validProducts}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </div>

  );
}

export default ProductList;
