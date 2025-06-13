import React, { useState } from 'react';
import './css/user.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/apiCalls";

const NewProduct = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    fullDesc: "",
    type: "",
    size: "",
    wheather: "",
    terrain: "",
    availability: "",
    activity: "",
    price: ""
  });
  const [images, setImages] = useState([]);
  const [uploadedURLs, setUploadedURLs] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    files.forEach((file) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, `products/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          setMessage({ type: "error", text: "Image upload failed." });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedURLs((prev) => [...prev, downloadURL]);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedURLs.length === 0) {
      setMessage({ type: "error", text: "Please upload at least one image." });
      return;
    }

    try {
      const finalData = {
        ...inputs,
        img: uploadedURLs,
        size: inputs.size.split(',').map(s => s.trim()),
        wheather: inputs.wheather.split(',').map(s => s.trim()),
        terrain: inputs.terrain.split(',').map(s => s.trim()),
        activity: inputs.activity.split(',').map(s => s.trim()),
      };

      await addProduct(finalData, dispatch);
      setMessage({ type: "success", text: "Product created successfully!" });
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error creating product. Check all fields." });
    }
  };

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userShow">
          <span className="userShowTitle">Uploaded Images</span>
          <div className="productUploadGallery">
            {uploadedURLs.map((url, idx) => (
              <div key={idx} className="productImageContainer">
                <img src={url} alt={`preview-${idx}`} className="userUpdateImg" />
                <button
                  type="button"
                  onClick={() =>
                    setUploadedURLs((prev) => prev.filter((img) => img !== url))
                  }
                  className="deleteImageButton"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">New Product</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="newUserUpdateLeft">
              {[
                ["title", "Title"],
                ["desc", "Description"],
                ["fullDesc", "Full Description"],
                ["type", "Type"],
                ["size", "Size (comma-separated)"],
                ["wheather", "Weather (comma-separated)"],
                ["terrain", "Terrain (comma-separated)"],
                ["availability", "Availability"],
                ["activity", "Activity (comma-separated)"],
                ["price", "Price"],
              ].map(([name, label]) => (
                <div className="userUpdateItem" key={name}>
                  <label>{label}</label>

                  {name === "type" ? (
                    <select
                      name="type"
                      value={inputs.type}
                      onChange={handleChange}
                      className="userUpdateInput"
                    >
                      <option value="">Select Type</option>
                      <option value="horseshoes">Horseshoes</option>
                      <option value="nails">Nails</option>
                      <option value="rasps">Rasps</option>
                      <option value="tools">Tools</option>
                      <option value="care">Care</option>
                    </select>
                  ) : name === "desc" || name === "fullDesc" ? (
                    <textarea
                      name={name}
                      value={inputs[name]}
                      onChange={handleChange}
                      className={`userUpdateInput ${name === "fullDesc" ? 'large-textarea' : ''}`}
                    />
                  ) : (
                    <input
                      type={name === "price" ? "number" : "text"}
                      name={name}
                      value={inputs[name]}
                      onChange={handleChange}
                      className="userUpdateInput"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <label htmlFor="file" className="uploadButton">Upload Images</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

              </div>
              <button className="userUpdateButton" type="submit">Create</button>
              {message.text && (
                <p className={`message ${message.type}`}>{message.text}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
