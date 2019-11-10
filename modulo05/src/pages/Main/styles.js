import styled, { css, keyframes } from 'styled-components';

export const Form = styled.form`
  /* As três caracteristicas garantem que os elementos, fiquem
  um ao lado do outro independente do tamanho */
  margin-top: 10px;
  display: flex;
  flex-direction: row;

  input {
    /*Faz o elemento ocupar todo espaço disponível */
    flex: 1;

    border: ${props => (props.error ? ' 1px solid red' : '1px solid #eee')};

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
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;

// & + li Serve para aplicar os efeitos apenas a um li seguido outro li.
// Por exemplo, em um sequencia de li, apenas o primeiro não terá efeito aplicado.
export const Wrapper = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  position: relative;
  font-size: 12px;
`;

export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 25%;
  left: 15px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #bebebe;
`;

export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 50%;
  width: 24px;
  height: 15px;
  margin: 15px;

  &:hover ~ ${RadioButtonLabel} {
    background: #bebebe;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      background: #eeeeee;
    }
  }

  &:checked + ${RadioButtonLabel} {
    background: #db7290;
    border: 1px solid #db7290;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 6px;
      box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
      background: white;
    }
  }
`;
