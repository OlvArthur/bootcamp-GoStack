import React, { Component } from 'react';

class TechList extends Component {
  state = {
    newTech: '',
    techs: ['NodeJS', 'ReactJS', 'React Native'],
  };

  //Funções criadas pelo desenvolvedor, precisam ser no formato arrow function
  //para que tenham acesso a variaveis do tipo this
  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    // Evista que a pagina recarregue ao clique do button
    e.preventDefault();

    //Não é possível modificar a estrutura de um array, portanto é necessário
    //refaze-lo, adicionando o(s) novo(s) elemento(s)
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
