import PropTypes from 'prop-types';
import '../styles.css';
import { TfiSearch } from 'react-icons/tfi';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  handelChanch = e => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  handelSumbit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Wow, Enter the text!');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handelSumbit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <TfiSearch />
            </span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
            value={this.state.searchQuery}
            onChange={this.handelChanch}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
