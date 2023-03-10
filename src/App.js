import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="my-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:product_id" element={<ProductDetail />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
