// src/pages/NewProductCard.jsx
import React, { useEffect, useState } from 'react';
import './css/user.css';
import { getProductCard, addProductCard } from '../redux/apiCalls';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useDispatch } from 'react-redux';
import app from '../firebase';

const allTypes = ["horseshoes", "nails", "rasps", "tools", "care"];

const NewProductCard = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({ title: "", type: "" });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [existingTypes, setExistingTypes] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetch = async () => {
            const cards = await getProductCard(dispatch);
            setExistingTypes(cards?.map(card => card.type) || []);
        };
        fetch();
    }, [dispatch]);

    const availableTypes = allTypes.filter(t => !existingTypes.includes(t));

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputs.title || !inputs.type || !file) {
            return setMessage({ type: "error", text: "All fields required." });
        }

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(getStorage(app), fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            null,
            (err) => {
                console.error(err);
                setMessage({ type: "error", text: "Upload failed." });
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                const newCard = { title: inputs.title, img: url, type: inputs.type };
                await addProductCard(newCard, dispatch);
                setMessage({ type: "success", text: "Product Card created!" });
                setTimeout(() => window.location.reload(), 1000);
            }
        );
    };

    return (
        <div className="user">
            <div className="userUpdate">
                <form className="userUpdateForm productCardForm" onSubmit={handleSubmit}>
                    <div className="newUserUpdateLeft newProductCardLeft">
                        <div className="userUpdateItem">
                            <label>Title</label>
                            <input type="text" name="title" value={inputs.title} onChange={handleChange} className="userUpdateInput" />
                        </div>
                        <div className="userUpdateItem">
                            <label>Type</label>
                            <select name="type" value={inputs.type} onChange={handleChange} className="userUpdateInput">
                                <option value="">Select type</option>
                                {availableTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        {preview && <img src={preview} alt="preview" className="userUpdateImg pcUpdateImg"  />}
                        <label htmlFor="file" className="uploadButton">Upload Image</label>
                        <input type="file" id="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                        <button type="submit" className="userUpdateButton">Create</button>
                        {message.text && <p className={`message ${message.type}`}>{message.text}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewProductCard;
