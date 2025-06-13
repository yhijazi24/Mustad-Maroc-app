import React from 'react';
import { Link } from 'react-router-dom';
import './css/actions.css';

const categories = [
  {
    name: 'Users',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    path: '/users'
  },
  {
    name: 'Products',
    image: 'https://www.stockmanssupplies.com/cdn/shop/files/hmlbf.png?v=1734330933',
    path: '/products'
  },
  {
    name: 'Headers',
    image: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png',
    path: '/headers'
  },
  {
    name: 'Product Cards',
    image: 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png',
    path: '/products-card'
  },
  {
    name: 'Brands',
    image: 'https://cdn-icons-png.flaticon.com/512/456/456212.png',
    path: '/brands'
  },
  {
    name: 'Mail',
    image: 'https://cdn-icons-png.flaticon.com/512/1828/1828933.png',
    path: '/actions/reports'
  },
];
const categoriesNotif = [
  {
    name: 'FeedBack',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    path: '/users'
  },
  {
    name: 'Messages',
    image: 'https://www.stockmanssupplies.com/cdn/shop/files/hmlbf.png?v=1734330933',
    path: '/products'
  },
  {
    name: 'Mail',
    image: 'https://cdn-icons-png.flaticon.com/512/1828/1828933.png',
    path: '/actions/reports'
  },
];


const ActionsPage = () => {
  return (
    <div className='actionsContainer'>
      <div className='actionWrapper aw1'>
        <h2 className='actionTitle'>Raccourci</h2>
        <div className='actionPage'>
          {categories.map((category) => (
            <Link to={category.path} className='actionCard' key={category.name}>
              <img src={category.image} alt={category.name} className='actionCardImg' />
              <span className='actionCardTitle'>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className='actionWrapper aw2'>
        <h2 className='actionTitle'>Notification</h2>
        <div className='actionPage'>
          {categoriesNotif.map((notif) => (
            <Link to={notif.path} className='actionCard' key={notif.name}>
              <img src={notif.image} alt={notif.name} className='actionCardImg' />
              <span className='actionCardTitle'>{notif.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

};

export default ActionsPage;
