import React, { Component } from 'react';

class PostList extends Component {
  state = {
    post: [
      {
        id: 1,
        author: {
          name: 'Arthur Oliveira',
          avatar: 'http://url-da-imagem.com/imagem.jpg',
        },
        date: '04 Jun 2019',
        content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Diego Fernandes',
              avatar: 'http://url-da-imagem.com/imagem.jpg',
            },
            content:
              'A RocketSeat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp. Inclusive 80% do nosso time de devs é composto por lunos do Bootcamp.',
          },
        ],
      },
      {
        id: 2,
        author: {
          name: 'Gabriel',
          avatar: 'http',
        },
        date: '04 Jun 2019',
        content: 'Fala Galera, blz?',
        comments: [
          {
            id: 1,
            author: {
              name: 'Clara Lisboa',
              avatar: 'url da imagem',
            },
            content:
              'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e ja tenho uma API dos desafios construída!',
          },
          {
            id: 2,
            author: {
              name: 'Cézar Toledo',
              avatar: 'url da imagem',
            },
            content:
              'Que maaaaaassa! Estou pensando em inscrever na próxima turma para ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!',
          },
        ],
      },
      // Restante dos dados de um novo post
    ],
  };

  render() {
    return (
      <div className="PostList">
        {this.post.state.map(post => {
          <PostItem key={post.id} {...post} />;
        })}
      </div>
    );
  }
}

export default PostList;
