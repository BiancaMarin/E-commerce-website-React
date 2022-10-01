import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutUs } from './features/AboutUs/AboutUs';
import { Auth } from './features/Auth/Auth';
import { AuthContextProvider } from './features/Auth/AuthContext';
import { Cart } from './features/Cart/Cart';
import { Contact } from './features/Contact/Contact';
import { HomePage } from './features/Homepage/Homepage';
import { NotFound } from './features/NotFound/NotFound';
import { AddProduct } from './features/Products/AddProduct';
import { DashboardProducts } from './features/Products/DashboardProducts';
import { EditProduct } from './features/Products/EditProduct';
import { ProductDetails } from './features/Products/ProductDetails';
import { EditUserProfile } from './features/UserProfile/EditUserProfile';
import { MessageDetails } from './features/UserProfile/Messages/MessageDetails';
import { Messages } from './features/UserProfile/Messages/Messages';
import { UserProfile } from './features/UserProfile/UserProfile';
import { Wishlist } from './features/Wishlist/Wishlist';
import { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);
  console.log(cart);

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/products"
              element={<DashboardProducts cart={cart} setCart={setCart} />}
            />

            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />
            <Route path="/products/add/" element={<AddProduct />} />
            <Route
              path="/productDetails/:productId"
              element={<ProductDetails />}
            />
            <Route path="/products/edit/:productId" element={<EditProduct />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/userProfile/:userId" element={<UserProfile />} />
            <Route path="/userMessages/:userId" element={<Messages />} />
            <Route
              path="/messageDetails/:messageId"
              element={<MessageDetails />}
            />
            <Route
              path="/userProfile/edit/:userId"
              element={<EditUserProfile />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
