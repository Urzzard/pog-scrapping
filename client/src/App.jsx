import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useState } from 'react'
import { Inicio } from "./pages/Inicio"
import { Offers } from "./pages/Offers"
import { About } from "./pages/About"
import { Games } from "./pages/Games"
import { Sources } from "./pages/Sources"
import { Menu } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <Content/>
    </BrowserRouter>
  )
}

function Content(){
  const location = useLocation()
  const showNav = ["/","/offers","/games","/sources","/about"].includes(location.pathname)

  return(
    <>
    <Toaster/>
      {showNav && <Menu/>}
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/offers" element={<Offers/>} />
          <Route path="/games" element={<Games/>} />
          <Route path="/sources" element={<Sources/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
