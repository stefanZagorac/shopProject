import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Cart from './pages/cart/Cart'
import SinglePage from './pages/singlePage/SinglePage'
import CartProvider from './pages/cart/CartContext'


export const MainState = React.createContext()

const App = () => {
  const [dataObj, setDataObj] = React.useState([]);

  React.useEffect(() => {
          localStorage.clear()
          fetch("https://30hills.com/api/products.json")
            .then(res => res.json())
            .then(data => setDataObj(data.products.data.items.map(obj => ({...obj, features: obj.features.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<span>","").replaceAll("</span>","").split('\n')}))))
  }, [])

  return (
    <BrowserRouter>
            <MainState.Provider value={dataObj}>
            <CartProvider>
            <Navbar />
            <Routes> 
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<SinglePage />} />
            </Routes>
            <Footer />
            </CartProvider>
            </MainState.Provider>
        </BrowserRouter>
  )
}

export default App