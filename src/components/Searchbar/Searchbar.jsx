import PropTypes from 'prop-types';
import { Header, Form, Button, Span, Input } from './Searchbar.styled';
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
    const { searchQuery } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handelSumbit}>
          <Button type="submit">
            <Span>
              <TfiSearch />
            </Span>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
            value={searchQuery}
            onChange={this.handelChanch}
          />
        </Form>
      </Header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
export default Searchbar;
