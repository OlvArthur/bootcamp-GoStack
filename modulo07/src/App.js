import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

/** É necessario importar o BrowserRouter apenas nessa pagina
 * que o componente Header tenha acesso a navaegação em outras paginas
 */

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes />
    </BrowserRouter>
  );
}

export default App;
