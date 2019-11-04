import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    repos: [],
    newRepo: '',
    loading: false,
  };

  // carregar os dados do localStorage
  componentDidMount() {
    const repos = localStorage.getItem('repos');

    if (repos) {
      this.setState({ repos: JSON.parse(repos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { repos } = this.state;

    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    const { newRepo, repos } = this.state;

    this.setState({ loading: true });

    // Previne o refresh na pagina
    e.preventDefault();
    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    // if (data) {
    this.setState({
      repos: [...repos, data],
      newRepo: '',
      loading: false,
    });
    // } else {
    // this.setState({ loading: false });
    // }
  };

  render() {
    const { newRepo, loading, repos } = this.state;

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

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
