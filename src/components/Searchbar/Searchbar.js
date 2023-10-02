import { Component } from 'react';
import { Form, InputBtn, Input } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.reset();
  };

  handleInput = e => {
    const { value } = e.currentTarget;
    this.setState({ query: value });
  };

  reset = () => {
    this.setState({ query: '' });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input onChange={this.handleInput} value={this.state.query} />
        <InputBtn type="submit">Search</InputBtn>
      </Form>
    );
  }
}
