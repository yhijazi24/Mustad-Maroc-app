import React, { useEffect, useState } from 'react';
import './css/user.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";
import { useDispatch } from 'react-redux';
import { addHeader, getHeader } from '../redux/apiCalls';

const allHeaderTypes = ["horseshoes", "nails", "rasps", "care", "tools", "home"];

const NewHeader = () => {
  const dispatch = useDispatch();
  const [existingTypes, setExistingTypes] = useState([]);
  const [inputs, setInputs] = useState({ title: "", desc: "", type: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchExistingHeaders = async () => {
      const headers = await getHeader();
      const usedTypes = headers?.map(h => h.type.toLowerCase()) || [];
      setExistingTypes(usedTypes);
    };
    fetchExistingHeaders();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (existingTypes.length >= 6) {
      return setMessage({ type: "error", text: "Maximum of 6 headers allowed." });
    }

    if (!inputs.title || !inputs.desc || !inputs.type) {
      return setMessage({ type: "error", text: "All fields are required." });
    }

    if (existingTypes.includes(inputs.type.toLowerCase())) {
      return setMessage({ type: "error", text: `Type "${inputs.type}" is already used.` });
    }

    if (!file) {
      return setMessage({ type: "error", text: "Please upload an image." });
    }

    try {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(getStorage(app), fileName);
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
          const newHeader = {
            title: inputs.title,
            desc: inputs.desc,
            type: inputs.type.toLowerCase(),
            img: downloadURL,
          };

          await addHeader(newHeader, dispatch);
          setMessage({ type: "success", text: "Header added successfully!" });
          setTimeout(() => window.location.reload(), 1500);
        }
      );
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to add header." });
    }
  };

  const availableTypes = allHeaderTypes.filter(t => !existingTypes.includes(t));

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">New Header</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="newUserUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  name="title"
                  value={inputs.title}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                  type="text"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  name="desc"
                  value={inputs.desc}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                  type="text"
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                <select
                  name="type"
                  value={inputs.type}
                  onChange={handleInputChange}
                  className="userUpdateInput"
                  required
                >
                  <option value="">Select Type</option>
                  {availableTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {preview && <img src={preview} className="userUpdateImg" alt="Preview" />}
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
      </div>
    </div>
  );
};

export default NewHeader;
