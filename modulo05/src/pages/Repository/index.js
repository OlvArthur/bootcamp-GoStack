/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';
import Container from '../../Components/Container';
import { Loading, Owner, IssueList, Label, PageAction } from './styles';

// import { Container } from './styles';
// As props recebidas estão vindo do arquivo routes,
// portanto match.params.repository, faz menção ao :repository na rota

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
        page: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      param1: PropTypes.string,
    }).isRequired,
  };

  state = {
    repository: {},
    loading: true,
    issues: [],
    page: 1,
  };

  async componentDidMount() {
    const { match, location } = this.props;
    const { page } = this.state;

    const state = location.param1;
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
          state,
          page,
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

  /* componentDidUpdate(prevProps, prevState) {
    const { issueActualState } = this.state;

    if (prevState.issueActualState !== issueActualState) {
      localStorage.setItem(
        'issueActualState',
        JSON.stringify(issueActualState)
      );
    }
  }
*/

  loadIssues = async () => {
    const { match, location } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: location.param1,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'previous' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
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
        <PageAction>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('previous')}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button type="button" onClick={() => this.handlePage('next')}>
            Próximo
          </button>
        </PageAction>
      </Container>
    );
  }
}
