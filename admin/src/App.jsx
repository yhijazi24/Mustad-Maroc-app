import './App.css'
import Login from "./pages/Login"
import Home from "./pages/Home"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import UserList from './pages/UserList';
import User from './pages/User';
import Topbar from './conponents/Topbar';
import Sidebar from './conponents/Sidebar';
import HeadersList from './pages/HeadersList';
import Header from './pages/Header';
import ProductCardList from './pages/ProductCardList';
import ProductCard from './pages/ProductCard';
import ProductsPage from './pages/ProductsPage';

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={admin ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='users' element={<UserList />} />
            <Route exact path='users/:userId' element={<User />} />
            <Route exact path='/products' element={<ProductsPage />} />
            <Route exact path='/product/:type' element={<ProductList />} />
            <Route exact path='/product/:productId' element={<Product />} />
            <Route exact path='/newproduct' element={<NewProduct />} />
            <Route exact path='/headers' element={<HeadersList />} />
            <Route exact path='/header/type/:type' element={<Header />} />
            <Route exact path='/products-card' element={<ProductCardList />} />
            <Route exact path='/product-card/:type' element={<ProductCard />} />
          </Routes>
        </div>

      </Router>
    </div>

  )
}

export default App
