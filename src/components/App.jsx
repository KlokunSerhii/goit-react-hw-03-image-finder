import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handelForm = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handelForm} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}

export default App;
