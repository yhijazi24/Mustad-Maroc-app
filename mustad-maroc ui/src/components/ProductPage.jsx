import React, { useEffect, useState } from 'react';
import './css/productpage.css';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { Add, Remove } from '@mui/icons-material';

const ProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState(0);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");


const handleQuantity = (type) =>{
  if(type == "dec"){
    quantity > 1 && setQuantity(quantity - 1);
  }else {
    setQuantity(quantity+1);
  }
};

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
        setError(null);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load product details.');
      }
    };
    getProduct();
  }, [id]);

  const dispatch = useDispatch();

  const handleClick = () => {
      dispatch(addProduct({ ...product, quantity, size}));

  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className='product-page-container'>
      <div className='product-page-wrapper'>
        <div className='product-page-info-wrapper'>
          <div className='product-images-wrapper'>
            <div className='product-page-imgs'>
              <img
                src={Array.isArray(product.img) ? product.img[currentImage] : product.img || ''}
                className='product-page-img'
                alt='product'
              />
            </div>
            <div className='product-images-thumbnail'>
              {Array.isArray(product.img) && product.img.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`thumbnail-imgs ${currentImage === index ? 'selected' : ''}`}
                  alt="thumbnail"
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
          <div className='product-page-info'>
            <div className='product-page-title'>
              <h1 className='product-page-h1'>{product.title || 'Product Title'}</h1>
              <p className='product-page-soustitre'>{product.desc || 'Product Subtitle'}</p>
            </div>
            <p className='product-page-desc'>{product.fullDesc || 'Product Description'}</p>
            <div className='product-page-button-wrapper'>
              <div className='product-choice'>
              <p className='price'>{product.price}$</p>
              <div className='product-size'>
                <span className='size-title'>Size : </span>
                <select className='product-size-choice' onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <option className='product-size-option'key={s}>{s}</option>
                ))}
                </select>
              </div>
              <div className='product-amount'>
                <Remove onClick={()=>handleQuantity("dec")} />
                <p className='amount'>{quantity}</p>
                <Add onClick={()=>handleQuantity("inc")}/>
              </div>
              </div>
              
                <button className='product-page-button' onClick={handleClick}>ADD TO CART</button>
              
            </div>
          </div>
        </div>
        <div className='product-page-add'>
          <h3 className='product-page-add-info'>Additional information</h3>
          <p className='product-page-add-p'><span className="product-page-span">Weather: </span>{product.wheather && product.wheather.length > 0 
      ? product.wheather.join(' | ') 
      : 'All weather'}</p>
          <p className='product-page-add-p'><span className="product-page-span">Terrain: </span>{product.terrain && product.terrain.length > 0
      ? product.terrain.join(' | ') 
      : 'Various terrains'}</p>
          <p className='product-page-add-p'><span className="product-page-span">Activity: </span>{product.activity && product.activity.length > 0 
      ? product.activity.join(' | ') 
      : 'Various activities'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
