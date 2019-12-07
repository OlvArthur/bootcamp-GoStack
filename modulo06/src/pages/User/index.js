import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableHighlight } from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  ActivityView,
  TouchableView,
} from './styles';

export default class User extends Component {
  // para retornar um objeto a função deve ter ({}) chaves dentro de parenteses
  // Caso não haja chaves o conteudo dentro será o corpo da função
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    refreshing: false,
    page: 1,
  };

  async componentDidMount() {
    const { page } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    this.setState({
      loading: true,
    });

    const response = await api.get(`users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      stars: response.data,
      loading: false,
    });
  }

  handleEndReached = async () => {
    const { page } = this.state;

    await this.setState({
      page: page + 1,
    });

    this.loadStars();
  };

  loadStars = async () => {
    const { page } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    // Tentar implementar stars: [ ...stars, response.data]
    // Tentar fazer com que após carregar novos repos, o mostrador volte ao topo
    this.setState({
      stars: response.data,
    });
  };

  refreshList = async () => {
    const { page } = this.state;
    this.setState({
      refreshing: true,
    });

    if (page !== 1) {
      await this.setState({
        page: 1,
      });
      this.loadStars();
    }
    await this.setState({
      refreshing: false,
    });
  };

  handleNavigation = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityView>
            <ActivityIndicator size={80} color="#7159c1" />
          </ActivityView>
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.handleEndReached}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <TouchableView>
                <TouchableHighlight onPress={() => this.handleNavigation(item)}>
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />

                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                </TouchableHighlight>
              </TouchableView>
            )}
          />
        )}
      </Container>
    );
  }
}
