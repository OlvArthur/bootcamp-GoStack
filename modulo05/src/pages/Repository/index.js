/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';
import Container from '../../Components/Container';
import { Loading, Owner, IssueList, Label } from './styles';

// import { Container } from './styles';
// As props recebidas estão vindo do arquivo routes,
// portanto match.params.repository, faz menção ao :repository na rota

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        handle: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.string,
    }).isRequired,
  };

  state = {
    repository: {},
    loading: true,
    issues: [],
  };

  async componentDidMount() {
    const { match, location } = this.props;

    const repoName = decodeURIComponent(match.params.handle);
    const { state } = location;

    // Promise permite que as duas chamadas a api ( no caso github) sejam feitas
    // simultaneamente, impedindo que uma seja executada apenas
    // após o fim da primeira
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        // Este objeto serve como req.params, ou seja, pode tbm ser
        // passado pela url eg.. /issues?state=open&per_page=5
        params: {
          state,
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

    if (loading) {
      return (
        <Container>
          <Loading>Carregando</Loading>;
        </Container>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <li>
            <a href="">Open</a>
            <a href="">Closed</a>
            <a href="">All</a>
          </li>
        </Owner>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <Label color={label.color} key={String(label.id)}>
                      {label.name}
                    </Label>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
