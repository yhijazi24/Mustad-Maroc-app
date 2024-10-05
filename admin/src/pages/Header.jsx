import React, { useEffect, useState } from 'react';
import './css/header.css';
import { Publish } from '@mui/icons-material'; 
import { Link, useParams } from 'react-router-dom';
import { getOneHeader, updateHeader } from '../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const [header, setHeader] = useState(null);
  const [updatedHeader, setUpdatedHeader] = useState({}); 
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
        setFetchedHeaderId(fetchedHeader._id); 
      } catch (err) {
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
              const headerToUpdate = { ...updatedHeader, img: downloadURL };
              await updateHeader(fetchedHeaderId, headerToUpdate, dispatch); 
              setSuccess(true);
            } catch (error) {
              console.error("Failed to get download URL:", error);
              setError("Failed to retrieve image URL.");
            }
          }
        );
      } else {
        await updateHeader(fetchedHeaderId, updatedHeader, dispatch);
        setSuccess(true);
      }
    } catch (updateError) {
      console.error("Update failed:", updateError);
      setError("Header update failed.");
    }
  };

  return (
    <div className="header">
      <div className="headerTitleContainer">
        <h1 className="headerTitle">Edit Header</h1>
      </div>
      <div className="headerContainer">
        <div className="headerShow">
          <div className="headerShowTop">
            <img
              src={header.img || "https://via.placeholder.com/150"}
              alt={header.title || "Default Title"}
              className="headerShowImg"
            />
            <div className="headerShowTopTitle">
              <span className="headerShowTitle">{header.title || "Default Title"}</span>
              <span className="headerShowType">{header.type || "Default Type"}</span>
            </div>
          </div>
        </div>
        <div className="headerUpdate">
          <span className="headerUpdateTitle">Edit</span>
          <form className="headerUpdateForm" onSubmit={handleSubmit}>
            <div className="headerUpdateLeft">
              <div className="headerUpdateItem">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={updatedHeader.type || ''}
                  onChange={handleInputChange}
                  className="headerUpdateInput"
                />
              </div>
              <div className="headerUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedHeader.title || ''}
                  onChange={handleInputChange}
                  className="headerUpdateInput"
                />
              </div>
              <div className="headerUpdateItem">
                <label>Image URL</label>
                <input
                  type="text"
                  name="img"
                  value={updatedHeader.img || ''}
                  onChange={handleInputChange}
                  className="headerUpdateInput"
                />
              </div>
            </div>
            <div className="headerUpdateRight">
              <div className="headerUpdateUpload">
                <img
                  className="headerUpdateImg"
                  src={header?.img || "https://via.placeholder.com/150"}
                  alt="Header Preview"
                />
                <label htmlFor="file">
                  <Publish className="headerUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
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
