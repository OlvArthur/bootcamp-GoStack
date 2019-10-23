import React, { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  /* Conceito defaultProps (análogo ao propTypes)
     static defaultProps = {
    tech: 'oculto'
  }
*/

  state = {
    newTech: '',
    techs: [],
  };

  //Executado assim que o componente aparece em tela
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  //Executado sempre que houver alterações nas props ou estado
  componentDidUpdate(prevProps, prevState) {
    if (prevState.techs !== this.state.techs) {
      //local storage não aceita arrays, portanto transforma-se em JSON
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  //Executado sempre que o componente deixa de existir
  componentWillUnmount() {}

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

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              onDelete={() => this.handleDelete(tech)}
              tech={tech}
            />
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
