import React from 'react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  return (
    <div className='productPage'>
      <Link to="/product/horseshoes">Horseshoes</Link>
      <Link to="/product/nails">Nails</Link>
      <Link to="/product/rasps">Rasps</Link>
      <Link to="/product/tools">Tools</Link>
      <Link to="/product/care">Care</Link>
    </div>
  );
}

export default ProductsPage;
