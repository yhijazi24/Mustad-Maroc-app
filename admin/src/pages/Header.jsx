import React, { useEffect, useState } from 'react';
import './css/header.css';
import { Publish, Delete } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { getOneHeader, updateHeader } from '../redux/apiCalls';
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [header, setHeader] = useState(null);
  const [updatedHeader, setUpdatedHeader] = useState({
    title: '',
    desc: '',
    img: ''
  });
  const [previewImg, setPreviewImg] = useState(null); // for preview before updating

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [fetchedHeaderId, setFetchedHeaderId] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      setLoading(true);
      try {
        const fetchedHeader = await getOneHeader(type);
        console.log("Fetched header:", fetchedHeader);
        setHeader(fetchedHeader);
        setUpdatedHeader(fetchedHeader);
        setFetchedHeaderId(fetchedHeader.id);
      } catch (err) {
        console.error("Failed to fetch header:", err);
        setError("Failed to fetch header.");
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, [type]);

  if (loading) {
    return <div>Loading header data...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHeader((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleDeleteImage = async () => {
    const storage = getStorage(app);

    try {
      if (header.img) {
        const imageRef = ref(storage, header.img);
        await deleteObject(imageRef);
        console.log("Image deleted successfully");
        const headerToUpdate = { ...updatedHeader, img: "" };
        await updateHeader(fetchedHeaderId, headerToUpdate, dispatch);
        setUpdatedHeader(headerToUpdate);
        setHeader((prev) => ({ ...prev, img: "" }));
        setSuccess(true);
      } else {
        setError("No image to delete.");
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
      setError("Failed to delete image.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fetchedHeaderId) return;

    try {
      let imgURL = header.img;

      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(getStorage(app), fileName);
        await uploadBytesResumable(storageRef, file);
        imgURL = await getDownloadURL(storageRef);
      }

      const headerToUpdate = {
        ...updatedHeader,
        img: imgURL
      };

      await updateHeader(fetchedHeaderId, headerToUpdate, dispatch);
      setHeader(headerToUpdate);
      setSuccess(true);
      setPreviewImg(null);
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Update failed");
    }
  };


  return (
    <div className="header">
      <div className="headerContainer">
        <div className="userShow">
          <div className="headerShowTop">
            <img
              src={previewImg || header.img || "https://via.placeholder.com/150"}
              alt={header.title || "Header Preview"}
              className="headerShowImg"
            />
            <div className="headerShowTopTitle">
              <span className="headerShowTitle"><strong>Title :</strong> {header.title || "No Title"}</span>
              <span className="headerShowType"><strong>Sous-Titre :</strong>  {header.desc || "No Description"}</span>
            </div>
          </div>

        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Header</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className='userUpdateLeft'>

              <div className="headerUpdateItem userUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedHeader.title}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
              <div className="headerUpdateItem userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  value={updatedHeader.desc}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className='userUpdateRight headerUpdateRight'>


              <div className="headerUpdateUpload productImageContainer">
                <img
                  className="headerUpdateImg"
                  src={previewImg || header.img || "https://via.placeholder.com/150"}
                  alt="Preview"
                />
                <button
                  type="button"
                  className="headerDeleteButton"
                  onClick={handleDeleteImage}
                >Delete Image
                </button>
              </div>
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

              <button type="submit" className="headerUpdateButton">Update</button>
            </div>

          </form>
          {success && <p className="successMessage">Header updated successfully!</p>}
          {error && <p className="errorMessage">{error}</p>}

        </div>
      </div>
    </div>
  );
};

export default Header;
