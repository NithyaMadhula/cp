import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

//Styles
import {
  NoResultContainer,
  NoResultWindow,
  NoResultWindowClose
} from './styles';

const NoResults = () => {
  const [showWindow, setShowWindow] = useState(true);
  const [redirect, setRedirect] = useState(false);

  return (
    <div>
      {redirect ? <Redirect to="/advancedsearch" /> : null}
      {showWindow ? (
        <NoResultContainer>
          <NoResultWindow>
            <span>
              <FontAwesomeIcon icon={faFolderOpen} />
            </span>
            <p>No results matched the query. Try another keyword.</p>
            <NoResultWindowClose
              onClick={() => {
                setShowWindow(false);
                setRedirect(true);
              }}
            >
              Return To Search
            </NoResultWindowClose>
          </NoResultWindow>
        </NoResultContainer>
      ) : null}
    </div>
  );
};

export default NoResults;
