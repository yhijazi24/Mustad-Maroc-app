import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
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
import Brand from './pages/Brand';
import BrandsList from './pages/BrandsList';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useSelector } from "react-redux";
import NewUser from './pages/NewUser';
import NewHeader from './pages/newHeader';
import NewProductCard from './pages/NewProductCard';
import NewBrand from './pages/NewBrand';

function App() {
    const user = useSelector((state) => state.user.currentUser);
    const admin = user?.isAdmin;

    return (
        <Router>
            <div className='side-bar'>

                {admin && <Sidebar />}
            </div>
            <div className="container">
                {admin && <Topbar />}
                <Routes>
                    <Route path="/login" element={!admin ? <Login /> : <Navigate to="/" />} />
                    <Route path="/" element={admin ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/users" element={admin ? <UserList /> : <Navigate to="/login" />} />
                    <Route path="/users/:userId" element={admin ? <User /> : <Navigate to="/login" />} />
                    <Route path="/users/new" element={<NewUser />} />
                    <Route path="/products" element={admin ? <ProductsPage /> : <Navigate to="/login" />} />
                    <Route path="/products/:type" element={admin ? <ProductList /> : <Navigate to="/login" />} />
                    <Route path="/product/:productId" element={admin ? <Product /> : <Navigate to="/login" />} />
                    <Route path="/newproduct" element={admin ? <NewProduct /> : <Navigate to="/login" />} />
                    <Route path="/headers" element={admin ? <HeadersList /> : <Navigate to="/login" />} />
                    <Route path="/header/type/:type" element={admin ? <Header /> : <Navigate to="/login" />} />
                    <Route path="/header/new" element={<NewHeader />} />
                    <Route path="/products-card" element={admin ? <ProductCardList /> : <Navigate to="/login" />} />
                    <Route path="/product-card/:type" element={admin ? <ProductCard /> : <Navigate to="/login" />} />
                    <Route path="/product-card/new" element={<NewProductCard />} />
                    <Route path="/brands" element={admin ? <BrandsList /> : <Navigate to="/login" />} />
                    <Route path="/brands/:brandId" element={<Brand />} />
                    <Route path="/new-brand" element={<NewBrand />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
