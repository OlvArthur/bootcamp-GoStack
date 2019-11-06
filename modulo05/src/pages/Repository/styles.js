import styled from 'styled-components';

export const Loading = styled.div`
  color: #253;
  font-size: 30px;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

export const IssueList = styled.img`
  img {
    width: 30px;
  }
`;
