import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #e0dcdc;
`;

// flex: 1 permite que toda a largura seja ocupar toda largura possivel,
// tirando a largura do proprio butão

// placeholderTextColor é um atributo assim como placeholder porem como faz
// da estilização faz mais sentido usar através de styled components
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #e0dcdc;
  border-radius: 4px;
  border: 1px solid #e0dcdc;
`;

// styled() servem para estilizar componentes que não estão de fato dentro
// styled
export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;
