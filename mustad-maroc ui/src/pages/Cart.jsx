import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./css/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux"; 

const Cart = () => {
    const cart = useSelector(state => state.cart);

    /* const [quantity, setQuantity] = useState(1);
  
  
  const handleQuantity = (type) =>{
    if(type == "dec"){
      quantity > 1 && setQuantity(quantity - 1);
    }else {
      setQuantity(quantity+1);
    }
  };



    // Calculate totals
   const calculateSubtotal = () => {
        return cart.products.reduce((total, product) => total + product.price * quantity[product._id], 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = 5.90;
    const shippingDiscount = -5.90;
    const total = subtotal + shipping + shippingDiscount;

    // Log products and their IDs for debugging*/
    console.log("Products in cart:", cart.products);

    return (
        <div className="container">
            <Navbar />
            <div className="cart-wrapper">
                <h1 className="cart-title">YOUR BAG</h1>
                <div className="cart-top">
                    <button className="cart-topButton">CONTINUE SHOPPING</button>
                    <div className="cart-topTexts">
                        <span className="cart-topText">Shopping Bag</span>
                        <span className="cart-topText">Your Wishlist</span>
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
                                            <Remove 
                                            />
                                            <div className="cart-productAmount">{product.quantity}</div>
                                            <Add 
                                            />
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
            <Footer />
        </div>
    );
};

export default Cart;
