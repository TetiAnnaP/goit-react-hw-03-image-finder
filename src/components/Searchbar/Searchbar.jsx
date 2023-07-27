import { Component } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const StyledHeader = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
const StyledInput = styled.input`
  position: relative;
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 18px;
  border: none;
  outline: none;
  padding-left: 40px;
  padding-right: 4px;
  padding-bottom: 4px;

  &::placeholder {
    font: inherit;
    font-size: 16px;
  }
`;
const StyledBtn = styled.button`
  position: absolute;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 25px;
  border: 0;

  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;

export default class Searchbar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.input.value;
    this.props.getUserValue(value);
  };

  render() {
    return (
      <StyledHeader>
        <form onSubmit={this.handleSubmit}>
          <StyledBtn type="submit">
            <AiOutlineSearch />
          </StyledBtn>
          <label>
            <StyledInput
              name="input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </label>
        </form>
      </StyledHeader>
    );
  }
}
