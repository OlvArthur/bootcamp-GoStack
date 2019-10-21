//Qualquer arquivo que precisa utilizar JSX, precisa importar o react
import React from 'react';

import './App.css';
import teste from './assets/teste.png';

function App() {
  return <img width="1100" src={teste} />;
}

export default App;
