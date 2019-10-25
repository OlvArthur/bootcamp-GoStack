import React, { Component } from 'react';

import PostItem from './PostItem';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: 'Arthur Oliveira',
          avatar: 'https://avatars2.githubusercontent.com/u/35180035?v=4',
        },
        date: '04 Jun 2019',
        content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
        comments: [
          {
            id: 2,
            author: {
              name: 'Diego Fernandes',
              avatar: 'https://avatars2.githubusercontent.com/u/2254731?v=4',
            },
            content:
              'A RocketSeat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp. Inclusive 80% do nosso time de devs é composto por lunos do Bootcamp.',
          },
        ],
      },
      {
        id: 3,
        author: {
          name: 'Gabriel Lisboa',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        date: '04 Jun 2019',
        content:
          'Fala Galera, blz?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
        comments: [
          {
            id: 4,
            author: {
              name: 'Clara Lisboa',
              avatar: 'https://i.pravatar.cc/150?img=5',
            },
            content:
              'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e ja tenho uma API dos desafios construída!',
          },
          {
            id: 5,
            author: {
              name: 'Cézar Toledo',
              avatar: 'https://i.pravatar.cc/150?img=11',
            },
            content:
              'Que maaaaaassa! Estou pensando em inscrever na próxima turma para ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!',
          },
        ],
      },
      {
        id: 6,
        author: {
          name: 'Gabriel Lisboa',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        date: '04 Jun 2019',
        content:
          'Fala Galera, blz?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
        comments: [
          {
            id: 7,
            author: {
              name: 'Clara Lisboa',
              avatar: 'https://i.pravatar.cc/150?img=5',
            },
            content:
              'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e ja tenho uma API dos desafios construída!',
          },
          {
            id: 8,
            author: {
              name: 'Cézar Toledo',
              avatar: 'https://i.pravatar.cc/150?img=11',
            },
            content:
              'Que maaaaaassa! Estou pensando em inscrever na próxima turma para ver qual é desse Bootcamp GoStack, dizem que os devs saem de lá com super poderes!',
          },
        ],
      },
      {
        id: 8,
        author: {
          name: 'Gabriel Lisboa',
          avatar: 'https://i.pravatar.cc/150?img=8',
        },
        date: '04 Jun 2019',
        content:
          'Fala Galera, blz?\nEstou fazendo o Bootcamp GoStack e está sendo muito massa! Alguém mais aí fazendo? Comenta aí na publicação para trocarmos uma idéia',
        comments: [
          {
            id: 9,
            author: {
              name: 'Clara Lisboa',
              avatar: 'https://i.pravatar.cc/150?img=5',
            },
            content:
              'Também estou fazendo o Bootcamp e estou adorando! Estou no terceiro módulo sobre Node e ja tenho uma API dos desafios construída!',
          },
          {
            id: 10,
            author: {
              name: 'Cézar Toledo',
              avatar: 'https://i.pravatar.cc/150?img=11',
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
    const { posts } = this.state;

    return (
      <div className="postlist">
        {posts.map(post => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
    );
  }
}

export default PostList;
