import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <Button type="submit">
          <FaSearch size={20} />
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleChange}
          value={inputValue}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
