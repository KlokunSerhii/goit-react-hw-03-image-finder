import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { AppDiv, Spiner } from './App.styled';
import fetch from '../services/api';
import Button from './Button';

const statusCode = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  ERROR: 'error',
};
class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    page: 1,
    perPage: 12,
    totalHits: '',
    status: statusCode.IDLE,
  };

  componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page
      ) {
        this.setState({ status: statusCode.PENDING });

        fetch(this.state.searchQuery, this.state.page, this.state.perPage).then(
          ({ hits, totalHits }) =>
            this.setState(prevState => ({
              totalHits: totalHits,
              hits: [...prevState.hits, ...hits],
              status: statusCode.RESOLVED,
            }))
        );
      }
    } catch {
      this.setState({ status: statusCode.ERROR });
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handelForm = searchQuery => {
    this.setState({
      searchQuery,
      hits: [],
      page: 1,
      totalHits: '',
      status: statusCode.IDLE,
    });
  };

  render() {
    const { hits, totalHits, page, perPage, status } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handelForm} />
        {totalHits.length !== 0 && <ImageGallery hits={hits} />}

        {page < Math.ceil(totalHits / perPage) && (
          <Button onClick={this.onClick} />
        )}

        {status === statusCode.PENDING && (
          <Spiner>
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </Spiner>
        )}

        <ToastContainer autoClose={3000} theme="colored" />
      </AppDiv>
    );
  }
}

export default App;
