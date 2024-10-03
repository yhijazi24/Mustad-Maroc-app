import React, { useEffect, useMemo, useState } from 'react';
import './css/product.css';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../../requestMethods";
import { Publish } from '@mui/icons-material';
import Chart from "../conponents/Charts";
import { updateProduct } from "../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"

const Product = () => {
  const dispatch = useDispatch(); 
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [file, setFile] = useState(null); 

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  // State to hold product input fields
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    price: '',
  });

  const MONTHS = useMemo(() => [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",
  ], []);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/order/income");
        const list = res.data.sort((a, b) => a._id - b._id);
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle product update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("File upload failed:", error); // Better error logging
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedProduct = { ...inputs, img: downloadURL };
            updateProduct(productId, updatedProduct, dispatch);
          }).catch((error) => {
            console.error("Failed to get download URL:", error);
          });
        }
      );
    } else {
      // If no new image is uploaded, update the product without changing the image
      updateProduct(productId, inputs, dispatch);
    }
  };

  // Initialize inputs state once product is available
  useEffect(() => {
    if (product) {
      setInputs({
        title: product.title,
        desc: product.desc,
        price: product.price,
      });
    }
  }, [product]);

  // Show loading if product is not yet loaded
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              value={inputs.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={inputs.price}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="productButton" type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
