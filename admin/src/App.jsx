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
        <Route exact path="/" element={<Home />} />
        <Route exact path='/products' element={<ProductList />} />
        <Route exact path='/product/:productId' element={<Product />} />
        <Route exact path='/newproduct' element={<NewProduct />} />
        <Route exact path='users' element={<UserList />} />
        <Route exact path='users/:userId' element={<User />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
