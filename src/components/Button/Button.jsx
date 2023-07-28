import { Component } from 'react';
import { GetImages } from '../Servises/servises';
import styled from 'styled-components';

const StyledLoadMoreBtn = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  width: 180px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background-color: #303f9f;
  }
  &:focus {
    background-color: #303f9f;
  }
`;

export default class Button extends Component {
  state = {
    page: 2,
  };

  handleLoadMoreBtn = () => {
    const { page } = this.state;
    const { newValue } = this.props;

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    GetImages(newValue, page)
      .then(resp => {
        this.props.getNextImages(resp.hits);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    return (
      <StyledLoadMoreBtn type="button" onClick={this.handleLoadMoreBtn}>
        Load more
      </StyledLoadMoreBtn>
    );
  }
}