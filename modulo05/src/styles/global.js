import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {

  /*
  Customização padrão global sugerida
  */
  margin:0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}

html,body,#root {
  /*Permite que ocupema pagina inteira */
  min-height:100%;
}

body {
  background: #7159c1;
  /* Para melhor definição das letras na página*/
  -webkit-font-smoothing: antialiased !important;
}

body, input, button {
  color:#222;
  font-size: 14px;
  font-family:Arial, Helvetica, sans-serif;
}

button {
  cursor: pointer;
}
`;
