import React, { useEffect, useState } from 'react';
import './css/productCard.css';
import { getOneProductCard, updateProductCard } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import app from "../firebase";
import { useParams } from 'react-router-dom';
import { Publish, Delete } from '@mui/icons-material';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [productCard, setProductCard] = useState(null);
  const [updatedProductCard, setUpdatedProductCard] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fetchedProductCardId, setFetchedProductCardId] = useState(null);

  useEffect(() => {
    const fetchProductCard = async () => {
      try {
        const fetchedProductCard = await getOneProductCard(type);
        setProductCard(fetchedProductCard);
        setUpdatedProductCard(fetchedProductCard);
        setFetchedProductCardId(fetchedProductCard.id);
      } catch (err) {
        setError("Failed to fetch Product Card.");
      }
    };
    fetchProductCard();
  }, [type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteImage = async () => {
    if (!productCard?.img?.includes("firebasestorage")) return;

    try {
      const imgRef = ref(getStorage(app), productCard.img);
      await deleteObject(imgRef);
      setUpdatedProductCard((prev) => ({ ...prev, img: "" }));
      setProductCard((prev) => ({ ...prev, img: "" }));
    } catch {
      setError("Failed to delete image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = updatedProductCard.img;

      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(getStorage(app), fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const updatedData = {
        ...updatedProductCard,
        img: imageUrl,
      };

      await updateProductCard(fetchedProductCardId, updatedData, dispatch);
      setProductCard(updatedData);
      setSuccess(true);
    } catch (err) {
      setError("Product Card update failed.");
    }
  };

  if (!productCard) return <div>Loading product card...</div>;

  return (
    <div className=" user">
      <div className="userContainer">
        <div className="userShow">

          <span className="userShowTitle">Card Details</span>
          <div className='div-img'>
            <img
              src={productCard.img || "https://via.placeholder.com/150"}
              alt="Preview"
              className="brandUpdateImg"
            />
          </div>

          <div className='pcInfo'>
            <div className="userShowInfoTitle"><strong>Title:</strong> {productCard.title}</div>
            <div className="userShowInfoTitle"><strong>Type:</strong> {productCard.type}</div>
          </div>
        </div>

        {/* RIGHT SIDE: EDIT FORM */}
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Product Card</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className='userUpdateLeft'>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="title"
                  value={updatedProductCard.title || ""}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="type"
                  value={updatedProductCard.type || ""}
                  onChange={handleInputChange}
                  placeholder="Type"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <img
                src={updatedProductCard.img || "https://via.placeholder.com/150"}
                alt="Edit Preview"
                className="brandUpdateImg"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="uploadButton"
              >Delete Image
              </button>

              <label htmlFor="file" className="uploadButton">
          Upload Image
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <button type="submit" className="userUpdateButton">
                Update
              </button>
              {success && <p className="message success">Product Card updated successfully!</p>}
              {error && <p className="message error">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
