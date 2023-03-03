import React from 'react'
import "./home.css"
import HomeLogo from "../../images/home-logo.png"
import {Link} from "react-router-dom"

const Home = () => {

  return (
    <section>
      <div className="container home__container">
        <div className="home__wrapper">
          
          <h1>Welcome to our Online Shop!</h1>
          <div className="home__logo__div">
            <Link to="/products">
            <img src={HomeLogo} alt="Logo" />
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Home