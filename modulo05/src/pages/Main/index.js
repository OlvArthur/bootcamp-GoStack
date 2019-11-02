import React from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
  return (
    /** Em casos de 2 ou mais chaveamentos, é recomendado
     * sempre criar um novo componente estilizado, ao invés de um html puro
     */

    /**
     * No caso do <Form> será necessário estlizar o componente de acordo com a
     * propriedade. Sempre que isso ocorrer, esse elemento precisa
     * obrigatoriamente virar um novo componente dentro do styled components
     */

    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar repositorio" />

        <SubmitButton>
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
