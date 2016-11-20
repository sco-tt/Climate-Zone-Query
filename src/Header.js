import React from 'react';

const Header = (props) => {
  return (
   <header className="header">
    <div className="header__title">
      <h1><a className="header__link" href="">What's My Climate Zone</a></h1>
    </div>
    <ul className="header__menu">
      <li className="header__menu-item">
        <a className="header__link header__link--menu" href="https://github.com/sco-tt/Climate-Zone-Query">Source Code</a></li>
      <li className="header__menu-item">
        <a className="header__link header__link--menu header__link--menu_last" href="https://en.wikipedia.org/wiki/K%C3%B6ppen_climate_classification">About the Köppen climate classification</a>
      </li>
    </ul>
    </header>
  )
}

export default Header;