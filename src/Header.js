import React from 'react';

const Header = (props) => {
  return (
   <header className="nav">
    <a className="nav__title" href="">What's My Climate Zone</a>
    <ul className="nav__menu">
      <li className="nav__menu-item">
        <a href="https://github.com/sco-tt/What-s-My-Climate-Zone">Source Code</a></li>
      <li className="nav__menu-item">
        <a href="https://en.wikipedia.org/wiki/K%C3%B6ppen_climate_classification">About the Köppen climate classification</a>
      </li>
    </ul>
    </header>
  )
}

export default Header;