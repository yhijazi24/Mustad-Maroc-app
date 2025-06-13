import React, { useEffect, useState } from 'react';
import './css/user.css';
import { CalendarToday, MailOutline, Publish, Delete } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { getBrand, updateBrand } from '../redux/apiCalls';
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';

const Brand = () => {
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [updatedBrand, setUpdatedBrand] = useState({});
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const data = await getBrand(brandId);
        setBrand(data);
        setUpdatedBrand(data);
      } catch (error) {
        console.error("Error fetching brand:", error);
      }
    };

    if (brandId) fetchBrand();
  }, [brandId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDeleteImage = async () => {
    if (!brand.img.startsWith("https://firebasestorage")) {
      return setMessage({ type: 'error', text: "Cannot delete external image." });
    }

    const storage = getStorage(app);
    const imgRef = ref(storage, brand.img);

    try {
      await deleteObject(imgRef);
      const updated = { ...updatedBrand, img: "" };
      await updateBrand(brandId, updated, dispatch);
      setBrand(updated);
      setUpdatedBrand(updated);
      setMessage({ type: 'success', text: 'Image deleted successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete image.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(getStorage(app), fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", null, () => {
          setMessage({ type: 'error', text: "Upload failed." });
        }, async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const updated = { ...updatedBrand, img: downloadURL };
          await updateBrand(brandId, updated, dispatch);
          setBrand(updated);
          setUpdatedBrand(updated);
          setMessage({ type: 'success', text: 'Brand updated successfully!' });
        });
      } else {
        await updateBrand(brandId, updatedBrand, dispatch);
        setBrand(updatedBrand);
        setMessage({ type: 'success', text: 'Brand updated successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Brand update failed.' });
    }
  };

  if (!brand) return <div>Loading brand data...</div>;

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <img
                  className="brandUpdateImg"
                  src={updatedBrand.img || "https://via.placeholder.com/100"}
                  alt="brand"
                />
              <span className="userShowUsername">{brand.title}</span>
              <span className="userShowUserTitle">
                <a href={brand.website} target="_blank" rel="noreferrer">{brand.website}</a>
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Brand Details</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Created: {new Date(brand.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">Description: {brand.desc?.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Brand</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedBrand.title || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={updatedBrand.website || ""}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <textarea
                  className="large-textarea"
                  name="desc"
                  value={updatedBrand.desc?.join(", ") || ""}
                  onChange={(e) =>
                    setUpdatedBrand({ ...updatedBrand, desc: e.target.value.split(",").map(d => d.trim()) })
                  }
                />
              </div>
            </div>

            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="brandUpdateImg"
                  src={updatedBrand.img || "https://via.placeholder.com/100"}
                  alt="brand"
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <label htmlFor="file" className="uploadButton"> Upload
                  </label>
                  <button type="button" className="uploadButton" onClick={handleDeleteImage}>Delete
                  </button>
                </div>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
              <button type="submit" className="userUpdateButton">Update</button>
            </div>
          </form>
          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
