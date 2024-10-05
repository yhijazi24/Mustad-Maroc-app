import React, { useEffect, useState } from 'react'
import './css/productCard.css'
import { getOneProductCard, updateProductCard } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useParams } from 'react-router-dom';
import { Publish } from '@mui/icons-material';


const ProductCard = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [productCard, setProductCard] = useState(null);
  const [updatedProductCard, setUpdatedProductCard] = useState({}); 
  const [success, setSuccess] = useState(false); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [fetchedProductCardId, setFetchedProductCardId] = useState(null);

  useEffect(() => {
    const fetchProductCard = async () => {
      setLoading(true);
      try {
        const fetchedProductCard = await getOneProductCard(type);
        console.log("Fetched Product Card:", fetchedProductCard);
        setProductCard(fetchedProductCard);
        setUpdatedProductCard(fetchedProductCard);
        setFetchedProductCardId(fetchedProductCard._id);
      } catch (err) {
        setError("Failed to fetch Product Card.");
      } finally {
        setLoading(false);
      } 
    };
    fetchProductCard();
  }, [type]);

  if (loading) {
    return <div>Loading product card data...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storage = getStorage(app);

    try {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("File upload failed:", error);
            setError("File upload failed.");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const productCardToUpdate = { ...updatedProductCard, img: downloadURL };
              await updateProductCard(fetchedProductCardId, productCardToUpdate, dispatch); 
              setSuccess(true);
            } catch (error) {
              console.error("Failed to get download URL:", error);
              setError("Failed to retrieve image URL.");
            }
          }
        );
      } else {
        await updateProductCard(fetchedProductCardId, updatedProductCard, dispatch); 
        setSuccess(true);
      }
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Product Card update failed.");
    }
  };
  return (
    <div className="productCard">
    <div className="productCardTitleContainer">
      <h1 className="productCardTitle">Edit Product Card</h1>
    </div>
    <div className="productCardContainer">
      <div className="productCardShow">
        <div className="productCardShowTop">
          <img
            src={productCard.img || "https://via.placeholder.com/150"}
            alt={productCard.title || "Default Title"}
            className="productCardShowImg"
          />
          <div className="productCardShowTopTitle">
            <span className="productCardShowTitle">{productCard.title || "Default Title"}</span>
            <span className="productCardShowType">{productCard.type || "Default Type"}</span>
          </div>
        </div>
      </div>
      <div className="productCardUpdate">
        <span className="productCardUpdateTitle">Edit</span>
        <form className="productCardUpdateForm" onSubmit={handleSubmit}>
          <div className="productCardUpdateLeft">
            <div className="productCardUpdateItem">
              <label>Type</label>
              <input
                type="text"
                name="type"
                value={updatedProductCard.type || ''}
                onChange={handleInputChange}
                className="productCardUpdateInput"
              />
            </div>
            <div className="productCardUpdateItem">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={updatedProductCard.title || ''}
                onChange={handleInputChange}
                className="productCardUpdateInput"
              />
            </div>
            <div className="productCardUpdateItem">
              <label>Image URL</label>
              <input
                type="text"
                name="img"
                value={updatedProductCard.img || ''}
                onChange={handleInputChange}
                className="productCardUpdateInput"
              />
            </div>
          </div>
          <div className="productCardUpdateRight">
            <div className="productCardUpdateUpload">
              <img
                className="productCardUpdateImg"
                src={productCard.img || "https://via.placeholder.com/150"}
                alt="productCard Preview"
              />
              <label htmlFor="file">
                <Publish className="productCardUpdateIcon" />
              </label>
              <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
            </div>
            <button type="submit" className="productCardUpdateButton">Update</button>
          </div>
        </form>
        {success && <p className="successMessage">Header updated successfully!</p>}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  </div>
  )
}

export default ProductCard
