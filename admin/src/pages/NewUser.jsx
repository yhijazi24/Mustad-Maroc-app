import React, { useState } from 'react';
import './css/user.css';
import { addUser } from '../redux/apiCalls'; // You’ll add this function below
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        industry: '',
        avatar: ''
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setUserData({ ...userData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(userData);
            setMessage({ type: 'success', text: 'User added successfully!' });
            setTimeout(() => navigate('/users'), 1500);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add user.' });
        }
    };

    return (
        <div className="user">
            <div className="userContainer">
                <div className="userUpdate">
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                        <div className="userUpdateLeft newUserUpdateLeft">
                            {["username", "email", "password", "firstName", "lastName", "phone", "industry"].map((field) => (
                                <div className="userUpdateItem" key={field}>
                                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                                        name={field}
                                        value={userData[field]}
                                        onChange={handleChange}
                                        className="userUpdateInput"
                                        required
                                    />
                                    {field === "password" && (
                                        <small className='showPassword'
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: "pointer", color: "#000022", marginTop: "5px" }}
                                        >
                                            {showPassword ? "Hide" : "Show"} password
                                        </small>
                                    )}
                                </div>
                            ))}

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={
                                        previewImage ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="Preview"
                                />
                                <label htmlFor="file" className="uploadButton">
                                    Upload Avatar
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            <button type="submit" className="userUpdateButton">Create</button>
                        </div>
                    </form>
                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewUser;
