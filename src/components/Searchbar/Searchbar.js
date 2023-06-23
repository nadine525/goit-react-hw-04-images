import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { iconSize } from '../constans';

const Searchbar = ({ getInputValue }) => {
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.target.value.toLowerCase().trim());
    console.log(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (input === '') {
      toast.warning(
        'Input is empty. Please, write the subject of your request.'
      );
      return;
    }

    getInputValue(input);
    setInput('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <FaSearch size={iconSize.md} />
        </Button>

        <Input
          name="input"
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
