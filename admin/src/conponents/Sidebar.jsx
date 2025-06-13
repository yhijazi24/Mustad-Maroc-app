import './css/sidebar.css'
import {
  AttachMoney, ChatBubbleOutline, DashboardOutlined,
  DynamicFeed, LineStyle, MailOutline, PermIdentity,
  Storefront, TabUnselectedOutlined
} from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (targetPath) => path === targetPath;

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className='admin-name'>

          <Link to="/" className="link">

            <h2>Mustad Maroc</h2>
          </Link>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className={`sidebarListItem ${isActive('/') ? 'active' : ''}`}>
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className={`sidebarListItem ${isActive('/users') ? 'active' : ''}`}>
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>

            <Link to="/products" className="link">
              <li className={`sidebarListItem ${isActive('/products') ? 'active' : ''}`}>
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>

            <Link to="/headers" className="link">
              <li className={`sidebarListItem ${isActive('/headers') ? 'active' : ''}`}>
                <TabUnselectedOutlined className="sidebarIcon" />
                Headers
              </li>
            </Link>

            <Link to="/products-card" className="link">
              <li className={`sidebarListItem ${isActive('/products-card') ? 'active' : ''}`}>
                <DashboardOutlined className="sidebarIcon" />
                Product Cards
              </li>
            </Link>

            <Link to="/brands" className="link">
              <li className={`sidebarListItem ${isActive('/brands') ? 'active' : ''}`}>
                <AttachMoney className="sidebarIcon" />
                Brands
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
