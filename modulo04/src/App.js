//Qualquer arquivo que precisa utilizar JSX, precisa importar o react
import React from 'react';

import './App.css';
import teste from './assets/teste.png';
import TechList from './components/TechList';

function App() {
  return <TechList />;
}

export default App;
