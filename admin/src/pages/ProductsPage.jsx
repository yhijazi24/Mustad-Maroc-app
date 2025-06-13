import React from 'react';
import { Link } from 'react-router-dom';
import './css/productsPage.css';
import WidgetLg from '../conponents/WidgetLg';

const categories = [
  {
    name: 'Horseshoes',
    image: 'https://www.stockmanssupplies.com/cdn/shop/files/hmlbf.png?v=1734330933',
    path: '/products/horseshoes'
  },
  {
    name: 'Nails',
    image: 'https://www.tackshack.co.za/web/image/product.template/53070/image_256',
    path: '/products/nails'
  },
  {
    name: 'Rasps',
    image: 'https://totalfootprotection.co.uk/wp-content/uploads/HELLER-EXCEL-ORIGINAL-SIDE-2-1000X1000.png',
    path: '/products/rasps'
  },
  {
    name: 'Tools',
    image: 'https://www.mustad.com/sites/mustad.com/files/images/premium_clincher_1600px_website.png',
    path: '/products/tools'
  },
  {
    name: 'Care',
    image: 'https://www.mustad.com/sites/mustad.com/files/styles/autox155/public/2023-03/pair3.png?itok=p1dlDBy7',
    path: '/products/care'
  },
];

const ProductsPage = () => {
  return (
    <div className='productWrapper'>

      <Link to="/newproduct">
        <button className="AddButton">Add New Product</button>
      </Link>
      <div className='productPage' style={{width: "100%"}}>
        {categories.map((category) => (
          <Link to={category.path} className='productCard' key={category.name}>
            <img src={category.image} alt={category.name} className='productCardImg' />
            <span className='productCardTitle'>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
