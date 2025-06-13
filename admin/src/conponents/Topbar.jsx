import React, { useState } from 'react';
import './css/topbar.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/apiCalls'; 
import { persistor } from '../redux/store';
import { useEffect } from "react";
import { getProduct } from "../redux/apiCalls"; // make sure this exists
import { useParams } from "react-router-dom";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);
  const firstName = currentUser?.firstName || 'User';
  const lastName = currentUser?.lastName || '';
const pathname = location.pathname;
const { productId } = useParams(); // works for route like /products/type/:productId
const [productTitle, setProductTitle] = useState("");

// Fetch product name if on edit page
useEffect(() => {
  const pathParts = location.pathname.split("/").filter(Boolean);
  if (pathParts[0] === "product" && pathParts.length === 2) {
    getProduct(pathParts[1])
      .then((data) => {
        setProductTitle(data?.title || "Unknown Product");
      })
      .catch(() => setProductTitle("Unknown Product"));
  }
}, [location.pathname]);

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getPageTitle = (pathname, productTitle = "") => {
  const parts = pathname.split("/").filter(Boolean);

  if (pathname === "/") return "Dashboard";
  if (pathname === "/login") return "Login";
  if (pathname === "/users") return "Users";
    if (pathname === "/users/new") return "Add New User";
  if (pathname === "/products") return "Products";
  if (pathname === "/orders") return "Orders";
  if (pathname === "/brands") return "Brands";
  if (pathname === "/headers") return "Headers";
  if (pathname === "/products-card") return "Product Cards";

  if (parts[0] === "users" && parts.length === 2) return "Edit User";
  if (parts[0] === "brands" && parts.length === 2) return "Edit Brand";
  if (parts[0] === "products" && parts.length === 2) return `${capitalize(parts[1])} Products`;
  if (parts[0] === "product" && parts.length === 2)
    return productTitle ? `Edit Product: ${productTitle}` : "Edit Product";
  if (parts[0] === "header" && parts[1] === "type") return `Update ${capitalize(parts[2])} Header`;
  if (parts[0] === "product-card") return `${capitalize(parts[1])} Product Card`;

  return "Admin Panel";
};
const pageTitle = getPageTitle(location.pathname, productTitle);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logoutUser(dispatch);
      persistor.purge();
      window.location.href = '/login';
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="pageTitle">{pageTitle}</span>
        </div>

        <div className="topRight">
          <div className="topProfile" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img 
              src="https://www.mustad.com/sites/mustad.com/files/logo/Mustad%E2%80%94logo.svg" 
              alt="avatar" 
              className="topAvatar" 
            />
            <span className="topUsername">{firstName} {lastName}</span>
            <ExpandMoreIcon className="topDropdownIcon" />
          </div>

          {dropdownOpen && (
            <div className="topDropdown">
              <ul>
                <li onClick={() => alert("Settings coming soon")}>Settings</li>
                <li onClick={() => window.open("https://www.mustad.com", "_blank")}>Visit Website</li>
                <li onClick={handleLogoutClick}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
