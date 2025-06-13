import React, { useState } from 'react';
import './css/newBrand.css';
import { useDispatch } from 'react-redux';
import { addBrand } from '../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";

const NewBrand = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
    const [website, setWebsite] = useState("");

  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreview(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !title || !website || !desc) return;

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.error(error);
        setMessage({ text: "Upload failed.", type: "error" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const brand = {
            title,
            desc,
            img: downloadURL
          };
          addBrand(brand, dispatch);
          setMessage({ text: "Brand created successfully!", type: "success" });
          setTitle("");
          setWebsite("");
          setDesc("");
          setFile(null);
          setPreview(null);
        });
      }
    );
  };

  return (
    <div className="newBrand userUpdate">
      <form onSubmit={handleSubmit} className="userUpdateForm">
        <div className='newProductCardLeft'>
        <div className="userUpdateItem">
          <label>Title</label>
          <input
            className="userUpdateInput"
            type="text"
            placeholder="Brand Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
                <div className="userUpdateItem">
          <label>Website Link</label>
          <input
            className="userUpdateInput"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            rows={4}
            required
          />
        </div>
        <div className="userUpdateItem">
          <label>Description</label>
          <textarea
            className="userUpdateInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            required
          />
        </div>
        </div>

        <div className="userUpdateRight">
          <div className="userUpdateUpload">
            {preview && <img src={preview} className="brandUpdateImg " alt="Preview" />}
            <label htmlFor="file" className="uploadButton">Upload Image</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="userUpdateButton">Create</button>
          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewBrand;
