import React from 'react';

//Styles
import { NoFavoritesMessageContainer } from './styles';

const NoFavoritesWarning = ({ message }) => (
  <NoFavoritesMessageContainer>
    <h3>Your favorites are empty!</h3>
    <p>
      {message
        ? { message }
        : 'Once you add games to your favorites, you can view them here.'}
    </p>
  </NoFavoritesMessageContainer>
);

export default NoFavoritesWarning;
