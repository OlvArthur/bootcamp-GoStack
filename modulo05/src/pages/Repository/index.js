import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

// import { Container } from './styles';
// As props recebidas estão vindo do arquivo routes,
// portanto match.params.repository, faz menção ao :repository na rota

export default class Repository extends Component {
  state = {
    repository: {},
    loading: true,
    issues: [],
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    // Promise permite que as duas chamadas a api ( no caso github) sejam feitas
    // simultaneamente, impedindo que uma seja executada apenas
    // após o fim da primeira
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        // Este objeto serve como req.params, ou seja, pode tbm ser
        // passado pela url eg.. /issues?state=open&per_page=5
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    return <h1>Repository</h1>;
  }
}
