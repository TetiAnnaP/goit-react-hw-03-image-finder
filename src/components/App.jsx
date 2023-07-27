import Searchbar from './Searchbar/Searchbar';
import ImageGalery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
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

  componentDidUpdate(prevProps, prevState) {
    const newValue = this.state.value;

    if (prevState.value !== newValue) {
      console.log('Робимо запит на сервер');

      fetch(
        `https://pixabay.com/api/?q=${newValue}&page=1&key=37406470-f77473b8e435a1e7065d6e2d2&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('За цим запитом нічого немає!'));
        })
        .then(resp =>
          this.setState(
            {
              items: resp.hits,
            },
            () => {
              console.log(this.state);
            }
          )
        )
        .catch(error => this.setState({ error }));
    }
  }

  render() {
    return (
      <StyledDiv>
        <GlobalStyle />
        <Searchbar getUserValue={this.getUserValue} />
        <ImageGalery>
          <ImageGalleryItem />
        </ImageGalery>
        <Button />
      </StyledDiv>
    );
  }
}
