import React, { Component } from 'react';

function Header() {
  return (
    <header>
      <nav>
        <img src="https://i.imgur.com/KDIDiSE.png" />
      </nav>
      <div>
        <span>Meu perfil</span>
        <i className="material-icons">account_circle</i>
      </div>
    </header>
  );
}

export default Header;
