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

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(userId); 
      setUser(fetchedUser);
      setUpdatedUser(fetchedUser); // Initialize updatedUser state
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value })); // Update state for inputs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateUser(userId, updatedUser); // Call updateUser with updated data
    if (result) {
      setSuccess(true); // Set success to true if update is successful
    }
  };

  return (
    <div>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
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
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{new Date(user.createdAt).toLocaleDateString()}</span>
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
                <span className="userShowInfoTitle">{user.address || "Address not provided"}</span>
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
                  <label>Address</label>
                  <input
                    type="text"
                    name="address" // Add name attribute
                    value={updatedUser.address || ''} // Set value from updatedUser state
                    onChange={handleInputChange} // Attach onChange
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.avatar || "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button type="submit" className="userUpdateButton">Update</button>
              </div>
            </form>
            {success && <p>User updated successfully!</p>} {/* Display success message */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
