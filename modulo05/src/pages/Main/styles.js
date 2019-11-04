import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  /* Ajuda a ajustar o elemento interior  */
  padding: 30px;

  /* Ajuda a ajustar o elemento na página.
  * Primeiro elemento vertical, segundo horizontal */
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  /* As três caracteristicas garantem que os elementos, fiquem
  um ao lado do outro independente do tamanho */
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    /*Faz o elemento ocupar todo espaço disponível */
    flex: 1;

    border: 1px solid #eee;

    /* Mesma função do margin, porém entre os elementos e a borda interna */
    padding: 10px 15px;

    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

/* .attrs permite passar qualuqer tipo de atributo ao elemento através do css */

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0px 15px;
  margin-left: 10px;
  border-radius: 4px;

  /** garantem que o conteudo do botão sempre esteja alinhado ao centro */
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;