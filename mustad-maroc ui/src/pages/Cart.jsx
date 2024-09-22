import { useState } from "react";
import { Add, Delete, Remove } from "@mui/icons-material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Maps from "../components/Maps";
import "./css/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct, updateProductQuantity } from "../redux/cartRedux"; 
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleQuantityChange = (product, type) => {
        if (type === "dec" && product.quantity > 1){
            dispatch(updateProductQuantity({id: product._id, quantity: product.quantity - 1}));
        }else if (type === "inc"){
            dispatch(updateProductQuantity({id: product._id, quantity: product.quantity + 1}));
        }
    };

    const handleRemoveProduct = (productId) =>{
        dispatch(removeProduct({id: productId}));
    };
    const navigate = useNavigate();
    const handleGoToProducts = () => {
        navigate('/', { state: { scrollToProducts: true } });
      };

    return (
        <div className="container">
            <Navbar />
            <div className="cart-wrapper">
                <h1 className="cart-title">YOUR BAG</h1>
                <div className="cart-top">
                    <button className="cart-topButton" onClick={handleGoToProducts}>CONTINUE SHOPPING</button>
                    <div className="cart-topTexts">
                        <span className="cart-topText">Shopping Bag</span>
                    </div>
                    <button className="cart-topButton filled">CHECKOUT NOW</button>
                </div>
                <div className="cart-bottom">
                    <div className="cart-info">
                        {cart.products.map(product => (
                            <div className="cart-product" key={product._id}>
                                <div className="cart-productDetail">
                                    <img className="cart-image" src={product.img} alt="product image" />
                                </div>
                                <div className="cart-priceDetail">
                                    <div className="cart-details">
                                        <span className="cart-productName">{product.title}</span>
                                        <span className="cart-productId">{product._id}</span>
                                    </div>
                                    <div className="cart-price-amount">
                                        <div className="cart-productAmountContainer">
                                            <Remove onClick={()=>handleQuantityChange(product, "dec")}/>
                                            <div className="cart-productAmount">{product.quantity}</div>
                                            <Add onClick={()=>handleQuantityChange(product, "inc")}/>
                                        </div>
                                        <div className="product-remove">
                                            <Delete onClick={()=> handleRemoveProduct(product._id)} />
                                        </div>
                                        <div className="product-cart-size"><span className="cart-size-title">Size : </span>{product.size}</div>
                                        <div className="cart-productPrice">${product.price * product.quantity}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h1 className="cart-summaryTitle">ORDER SUMMARY</h1>
                        <div className="cart-summaryItem">
                            <span className="cart-summaryItemText">Subtotal</span>
                            <span className="cart-summaryItemPrice">${cart.total}</span>
                        </div>
                        <div className="cart-summaryItem">
                            <span className="cart-summaryItemText">Estimated Shipping</span>
                            <span className="cart-summaryItemPrice">$5.92</span>
                        </div>
                        <div className="cart-summaryItem">
                            <span className="cart-summaryItemText">Shipping Discount</span>
                            <span className="cart-summaryItemPrice">$-5.92</span>
                        </div>
                        <div className="cart-summaryItem total">
                            <span className="cart-summaryItemText">Total</span>
                            <span className="cart-summaryItemPrice">${cart.total}</span>
                        </div>
                        <button className="cart-topButton filled">PLACE ORDER</button>
                    </div>
                </div>
            </div>
            <Maps />
            <Footer />
        </div>
    );
};

export default Cart;
