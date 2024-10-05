import React, { useEffect, useState } from 'react'
import './css/ProductCardList.css'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getProductCard } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';


const ProductCardList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchProductCard = async () => {
      const productCard = await getProductCard(dispatch); 
      setData(productCard || []);
    };

    fetchProductCard();
  }, [dispatch]); 

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, 
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
            <Link to={`/product-card/` + params.row.type}>
              <button className="productCardListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="productCardList">
    <DataGrid
      rows={data} // Use the state directly
      getRowId={(row) => row._id} 
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  </div>
  )
}

export default ProductCardList
