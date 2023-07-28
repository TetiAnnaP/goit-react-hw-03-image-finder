import Searchbar from './Searchbar/Searchbar';
import ImageGalery from './ImageGallery/ImageGallery';
import { GetImages } from './Servises/servises';
import styled, { createGlobalStyle } from 'styled-components';
import Button from './Button/Button';
import { Component } from 'react';

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  color: #212121;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}`;
const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

export default class App extends Component {
  state = {
    items: [],
    value: '',
    error: '',
  };

  getUserValue = value => {
    this.setState({ value });
  };

  getNextImages = arr => {
    this.setState(prev => ({
      items: [...prev.items, ...arr],
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const newValue = this.state.value;

    if (prevState.value !== newValue) {
      const page = 1;
      GetImages(newValue, page)
        .then(resp =>
          this.setState({
            items: resp.hits,
          })
        )
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    return (
      <StyledDiv>
        <GlobalStyle />
        <Searchbar getUserValue={this.getUserValue} />
        <ImageGalery items={this.state.items} />
        {this.state.items.length > 0 && (
          <Button
            newValue={this.state.value}
            getNextImages={this.getNextImages}
          />
        )}
      </StyledDiv>
    );
  }
}
