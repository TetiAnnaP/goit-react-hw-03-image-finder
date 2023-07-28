import Searchbar from './Searchbar/Searchbar';
import ImageGalery from './ImageGallery/ImageGallery';
import { GetImages } from './Servises/servises';
import styled, { createGlobalStyle } from 'styled-components';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
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
    page: 1,
    visible: false,
    showModal: false,
    dataUrl: '',
  };

  getUserValue = value => {
    this.setState({ value });
  };

  getNextImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      visible: true,
    }));
    const newValue = this.state.value;
    const page = this.state.page;

    GetImages(newValue, page)
      .then(resp => {
        this.setState(prevState => ({
          items: [...prevState.items, ...resp.hits],
          visible: false,
        }));
      })
      .catch(error => this.setState({ error }));
  };

  getLargeImage = dataUrl => {
    this.setState({ dataUrl, showModal: true });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  componentDidUpdate(prevProps, prevState) {
    const newValue = this.state.value;

    if (prevState.value !== newValue) {
      this.setState({ visible: true });
      const { page } = this.state;
      GetImages(newValue, page)
        .then(resp =>
          this.setState({
            items: resp.hits,
            visible: false,
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
        <Loader visible={this.state.visible} />
        <ImageGalery
          items={this.state.items}
          getLargeImage={this.getLargeImage}
        />
        {this.state.items.length > 0 && (
          <Button getNextImages={this.getNextImages} />
        )}
        {this.state.showModal && <Modal dataUrl={this.state.dataUrl} />}
      </StyledDiv>
    );
  }
}
