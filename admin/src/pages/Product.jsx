import React, { useEffect, useState } from 'react';
import './css/product.css';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Publish } from '@mui/icons-material';
import { updateProduct, getProduct } from "../redux/apiCalls";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const Product = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [inputs, setInputs] = useState({
        type: '',
        title: '',
        desc: '',
        availability: '',
        fullDesc: '',
        price: '',
        size: '',
        wheather: '',
        terrain: '',
        activity: '',
        img: [],
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const productData = await getProduct(productId);
                    if (!productData) throw new Error("Product not found");
                    setInputs({
                        ...productData,
                        size: Array.isArray(productData.size) ? productData.size.join(', ') : '',
                        wheather: Array.isArray(productData.wheather) ? productData.wheather.join(', ') : '',
                        terrain: Array.isArray(productData.terrain) ? productData.terrain.join(', ') : '',
                        activity: Array.isArray(productData.activity) ? productData.activity.join(', ') : '',
                    });

                } catch (error) {
                    console.error("Failed to fetch product:", error);
                }
            }
        };
        fetchProduct();
    }, [productId]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, `products/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            null,
            (error) => console.error("Upload failed:", error),
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Only update local state — no API call yet
                setInputs((prev) => ({
                    ...prev,
                    img: [...prev.img, downloadURL],
                }));
            }
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [name]: name === 'size' || name === 'wheather' || name === 'terrain' || name === 'activity'
                ? value.split(',').map(item => item.trim())
                : value,
        }));
    };

    const handleDeleteImage = (imageUrl) => {
        setInputs((prev) => ({
            ...prev,
            img: prev.img.filter((img) => img !== imageUrl),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                null,
                (error) => console.error("Upload failed:", error),
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    const updatedImages = [...inputs.img, downloadURL];
                    updateProduct(productId, { ...inputs, img: updatedImages }, dispatch);
                    setInputs((prev) => ({ ...prev, img: updatedImages }));
                }
            );
        } else {
            updateProduct(productId, inputs, dispatch);
        }
    };

    return (
        <div className="product">
            <div className="userContainer">
                {/* LEFT - Product Details */}
                <div className="userShow">
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">{inputs.title}</span>
                        <span className="userShowUserTitle">{inputs.type} Product</span>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Product Info</span>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><strong>Description: </strong>{inputs.desc}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">{inputs.fullDesc}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><strong>Availability:</strong> {inputs.availability}</span>
                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle"><strong>Price:</strong> ${inputs.price}</span>
                        </div>
                        <div className="userShowInfo"><span className="userShowInfoTitle">
                            <strong>Sizes:</strong> {Array.isArray(inputs.size) ? inputs.size.join(', ') : inputs.size}
                        </span>


                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">
                                <strong>Weather:</strong> {Array.isArray(inputs.wheather) ? inputs.wheather.join(', ') : inputs.wheather}
                            </span>                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">
                                <strong>Terrain:</strong> {Array.isArray(inputs.terrain) ? inputs.terrain.join(', ') : inputs.terrain}
                            </span>                        </div>
                        <div className="userShowInfo">
                            <span className="userShowInfoTitle">
                                <strong>Activity:</strong> {Array.isArray(inputs.activity) ? inputs.activity.join(', ') : inputs.activity}
                            </span>                        </div>
                    </div>
                </div>

                {/* RIGHT - Edit Form */}
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit Product</span>
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                        <div className="userUpdateLeft ProductUpdateLeft">
                            {/* repeat for each field */}
                            <div className="userUpdateItem">
                                <label>Title</label>
                                <input name="title" value={inputs.title} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Type</label>
                                <input name="type" value={inputs.type} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Availability</label>
                                <input name="availability" value={inputs.availability} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Price</label>
                                <input name="price" value={inputs.price} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Description</label>
                                <textarea name="desc" value={inputs.desc} onChange={handleChange} className="userUpdateInput productFullDescUpdate" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Description</label>
                                <textarea name="fullDesc" value={inputs.fullDesc} onChange={handleChange} className="userUpdateInput productFullDescUpdate" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Sizes</label>
                                <input name="size" value={inputs.size} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Weather</label>
                                <input name="wheather" value={inputs.wheather} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Terrain</label>
                                <input name="terrain" value={inputs.terrain} onChange={handleChange} className="userUpdateInput" />
                            </div>
                            <div className="userUpdateItem">
                                <label>Activity</label>
                                <input name="activity" value={inputs.activity} onChange={handleChange} className="userUpdateInput" />
                            </div>
                        </div>

                        <div className="userUpdateRight">
                            <div className="productUploadGallery">
                                {inputs.img.map((img, i) => (
                                    <div key={i} className="productImageContainer">
                                        <img src={img} alt={`preview-${i}`} className="productUploadImg" />
                                        <button type="button" onClick={() => handleDeleteImage(img)} className="deleteImageButton">Delete</button>
                                    </div>
                                ))}
                            </div>

                            <label htmlFor="file" className="uploadButton">Upload Image</label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={handleImageChange} />

                            <button type="submit" className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Product;
