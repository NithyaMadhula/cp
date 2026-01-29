import React, { useState } from 'react';

//Styles
import { MessagePopupContainer } from './styles';

//Custom Hooks
import useDidMountEffect from '../../../hooks/useDidMountEffect';

const MessagePopup = ({ filtersSelected, filteredData, message }) => {
  const [showNoResults, setShowNoResults] = useState(false);

  useDidMountEffect(() => {
    if (!filtersSelected && !filteredData) {
      setShowNoResults(false);
      return;
    }

    if (filtersSelected.length === 0 && !filteredData) {
      setShowNoResults(false);
      return;
    }

    if (filtersSelected.length >= 1 && filteredData) {
      setShowNoResults(false);
      return;
    }
  }, [filteredData]);

  return (
    <div>
      {showNoResults ? (
        <MessagePopupContainer>
          <p className="messageText">{message}</p>
        </MessagePopupContainer>
      ) : null}
    </div>
  );
};

export default MessagePopup;
