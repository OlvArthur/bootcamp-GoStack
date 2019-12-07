import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import GlobalStyle from './styles/global';

/** É necessario importar o BrowserRouter apenas nessa pagina
 * que o componente Header tenha acesso a navaegação em outras paginas
 */

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
