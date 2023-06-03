import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { AppDiv } from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handelForm = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handelForm} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} theme="colored" />
      </AppDiv>
    );
  }
}

export default App;
