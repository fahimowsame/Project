import React from 'react';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Cart from './components/Cart';
import RequireAuth from './components/RequirAuth'; // Correct import path
import Checkout from './components/Checkout';
import Footer from './components/Footer';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/cart' element={<RequireAuth> <Cart /> </RequireAuth>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
