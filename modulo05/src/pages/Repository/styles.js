import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    text-decoration: none;
    font-size: 16px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 5px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 20px;
    }

    img {
      width: 36px;
      height: 36px;
      border: 2px solid #eee;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-items: end;

        a {
          text-decoration: none;
          color: #333;
          justify-content: center;

          &:hover {
            color: #7159c1;
          }
        }
      }

      p {
        color: #999;
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
`;

export const Label = styled.div`
  background: ${props => `#${props.color}`};
  color: #333;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: max-content;
  padding: 3px 4px;
  margin-left: 10px;
  max-width: min-content;
`;
/** links para otras areas são estilizados com a {}  */

export const PageAction = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }
`;
