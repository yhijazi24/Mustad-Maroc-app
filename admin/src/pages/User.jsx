import React, { useEffect, useState } from 'react';
import './css/user.css';
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../redux/apiCalls'; // Import updateUser

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({}); // State for user updates
  const [success, setSuccess] = useState(false); // State to track update success
  const [previewImg, setPreviewImg] = useState(null); // for live preview
  const [message, setMessage] = useState({ type: '', text: '' }); // success or error

  useEffect(() => {
    console.log("userId from URL:", userId); // Debug

    const fetchUser = async () => {
      const fetchedUser = await getUser(userId);
      setUser(fetchedUser);
      setUpdatedUser(fetchedUser);
    };

    if (userId) fetchUser();
  }, [userId]);


  if (!user) {
    return <div>Loading user data...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value })); // Update state for inputs
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file)); // for preview
      setUpdatedUser((prev) => ({
        ...prev,
        avatar: file, // storing the File object
      }));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If there's a new file to upload, simulate image upload logic
      if (updatedUser.avatar && updatedUser.avatar instanceof File) {
        const formData = new FormData();
        formData.append('avatar', updatedUser.avatar);
        // You would POST this to an image upload endpoint
        // const uploadRes = await axios.post('/upload', formData);
        // updatedUser.avatar = uploadRes.data.url;

        // For demo purposes:
        updatedUser.avatar = previewImg;
      }

      const result = await updateUser(userId, updatedUser);
      if (result) {
        setMessage({ type: 'success', text: 'User updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Update failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong during update.' });
    }
  };


  return (
    <div>
      <div className="user">
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">{user.firstName} {user.lastName}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">Username : {user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">Created : {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.industry || "Address not provided"}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}> {/* Attach handleSubmit */}
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username" // Add name attribute
                    value={updatedUser.username} // Set value from updatedUser state
                    onChange={handleInputChange} // Attach onChange
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName" // Update the name to match your structure
                    value={`${updatedUser.firstName} ${updatedUser.lastName}`} // Set value accordingly
                    onChange={handleInputChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email" // Add name attribute
                    value={updatedUser.email} // Set value from updatedUser state
                    onChange={handleInputChange} // Attach onChange
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone" // Add name attribute
                    value={updatedUser.phone} // Set value from updatedUser state
                    onChange={handleInputChange} // Attach onChange
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Entreprise</label>
                  <input
                    type="text"
                    name="Entreprise" // Add name attribute
                    value={updatedUser.industry || ''} // Set value from updatedUser state
                    onChange={handleInputChange} // Attach onChange
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={previewImg || user.avatar || "https://via.placeholder.com/100?text=Avatar"}
                    alt="avatar"
                  />
                  <label htmlFor="file" className="uploadButton">
                    Upload Image
                  </label>
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
    </div>
  );
};

export default User;
