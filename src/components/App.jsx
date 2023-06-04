import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { AppDiv, Spiner } from './App.styled';
import { ApiService } from './services/api';
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
    api: null,
    page: 1,
    perPage: 12,
    totalHits: '',
    status: statusCode.IDLE,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page
      ) {
        const Api = new ApiService(this.state.searchQuery);
        await this.setState({
          api: Api,
          perPage: Api.per_page,
          page: Api.page,
          status: statusCode.PENDING,
        });

        Api.fetch().then(({ hits, totalHits }) =>
          this.setState(prevState => ({
            totalHits: totalHits,
            hits: [...prevState.hits, ...hits],
            status: statusCode.RESOLVED,
          }))
        );

        Api.resetPage();
        Api.incrementPage();
      }
    } catch {
      this.setState(statusCode.ERROR);
    }
  }

  onClick = async () => {
    const { page } = this.state.api;
    await this.setState({ page: page + 1 });
  };

  handelForm = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { hits, totalHits, page, perPage, status } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.handelForm} />

        {status === statusCode.RESOLVED && <ImageGallery hits={hits} />}

        {page < Math.floor(totalHits / perPage) && (
          <Button onClick={this.onClick} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />

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
      </AppDiv>
    );
  }
}

export default App;
